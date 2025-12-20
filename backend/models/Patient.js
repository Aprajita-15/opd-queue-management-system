const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  symptoms: { type: String },
  appointmentTime: { type: Date },
  status: { 
    type: String, 
    enum: ['waiting', 'in-consultation', 'completed', 'absent'], 
    default: 'waiting' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);