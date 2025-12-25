const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },

  address: {
    city: String,
    state: String,
    pincode: String
  },

  contact: { type: String, default: 'Not Available' },
  type: { type: String, default: 'Multi-Speciality' },
  status: { type: String, default: 'active' },
  bedAvailability: { type: Number, default: 0 },

  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],

  // NEW FIELD
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Hospital', HospitalSchema);