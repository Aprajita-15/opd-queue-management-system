const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);