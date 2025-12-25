const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  specialization: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  workingDays: [{ type: String }],
  workingHours: {
    start: String,
    end: String
  },
  absentDates: [{ type: Date }],
  queue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Queue' }],
  currentDelay: { type: Number, default: 0 },
  
  // NEW FIELD - Track who created this doctor (hospital owner)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);