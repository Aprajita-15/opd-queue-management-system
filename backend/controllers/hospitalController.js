const Hospital = require('../models/Hospital');
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");

// Create a new hospital (ONLY hospital, no dept or doctors)
exports.newHospital = async (req, res) => {
  try {
    const { name, image, address, bedAvailability, type, status } = req.body;

    if (!name || !address || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hospital = await Hospital.create({
      name,
      image: image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      address,
      bedAvailability: bedAvailability || 0,
      type: type || 'General',
      status: status || 'active',
      departments: [],
      createdBy: req.user.id
    });

    return res.status(201).json({
      message: "Hospital added successfully",
      hospital
    });

  } catch (err) {
    console.error("Add Hospital Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // IMPORTANT: Check if user is the creator
    if (hospital.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "Not authorized to delete this hospital" 
      });
    }

    await Hospital.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    console.error("Delete Hospital Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Alternative add hospital (legacy support)
exports.addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(hospital);
  } catch (err) {
    console.error("Add Hospital Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.listHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .populate('departments')
      .populate('createdBy', 'email role');

    res.json(hospitals);
  } catch (err) {
    console.error("List Hospitals Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getHospitalDetails = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id)
      .populate({
        path: 'departments',
        populate: { path: 'doctors' }
      })
      .populate('createdBy', 'email role');

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json(hospital);
  } catch (err) {
    console.error("Get Hospital Details Error:", err);
    res.status(500).json({ error: err.message });
  }
};