const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password, role, name, age, phone, specialization, address } = req.body;
    
    let refId;
    if (role === 'patient') {
      const patient = await Patient.create({ name, age, phone });
      refId = patient._id;
    } else if (role === 'doctor') {
      const doctor = await Doctor.create({ name, specialization, departmentId: null });
      refId = doctor._id;
    } else if (role === 'hospital') {
      const hospital = await Hospital.create({ name, address });
      refId = hospital._id;
    }

    const user = await User.create({ email, password, role, refId });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ token, user: { id: user._id, email, role, refId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role, refId: user.refId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};