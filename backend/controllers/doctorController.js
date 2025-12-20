const Doctor = require('../models/Doctor');
const Department = require('../models/Department');

exports.addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    await Department.findByIdAndUpdate(req.body.departmentId, { $push: { doctors: doctor._id } });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // remove doctor from department
    await Department.findByIdAndUpdate(
      doctor.departmentId,
      { $pull: { doctors: doctor._id } }
    );

    await doctor.deleteOne();
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ departmentId: req.params.departmentId }).populate('queue');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { absentDates } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { absentDates }, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWorkingHours = async (req, res) => {
  try {
    const { workingDays, workingHours } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { workingDays, workingHours }, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDelay = async (req, res) => {
  try {
    const { delay } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { currentDelay: delay }, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};