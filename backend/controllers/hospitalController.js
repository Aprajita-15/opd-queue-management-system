const Hospital = require('../models/Hospital');

const Department = require("../models/Department");
const Doctor = require("../models/Doctor");

// Create a new hospital (ONLY hospital, no dept or doctors)
exports.newHospital = async (req, res) => {
  try {
    const { name, image, address, bedAvailability } = req.body;

    if (!name || !address || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hospital = await Hospital.create({
      name,
      image,
      address,
      bedAvailability,
      departments: [] 
    });

    return res.status(201).json({
      message: "Hospital added successfully",
      hospital
    });

  } catch (err) {
    console.error("Add Hospital Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    console.error("Delete Hospital Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate('departments');
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHospitalDetails = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate({
      path: 'departments',
      populate: { path: 'doctors' }
    });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};