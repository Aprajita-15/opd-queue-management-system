const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  position: { type: Number, required: true },
  estimatedTime: { type: Number },
  isEmergency: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Queue', QueueSchema);