const Department = require('../models/Department');
const Hospital = require('../models/Hospital');

exports.addDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    await Hospital.findByIdAndUpdate(req.body.hospitalId, { $push: { departments: department._id } });
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByHospital = async (req, res) => {
  try {
    const departments = await Department.find({ hospitalId: req.params.hospitalId }).populate('doctors');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};