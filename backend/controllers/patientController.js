const Patient = require('../models/Patient');

exports.registerPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAbsent = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, { status: 'absent' }, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};