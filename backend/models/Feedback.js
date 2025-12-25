const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  hospitalId: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  userName: {
    type: String,
    default: 'Anonymous'
  },
  userEmail: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  waitTimeRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  staffRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  facilitiesRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  comments: {
    type: String,
    default: ''
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  visitType: {
    type: String,
    default: 'OPD'
  },
  recommend: {
    type: Boolean,
    default: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);