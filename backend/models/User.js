// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['patient', 'doctor', 'hospital'], required: true },
//   refId: { type: mongoose.Schema.Types.ObjectId }
// }, { timestamps: true });

// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// UserSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  // ⬇ optional for Google login
  password: { type: String, required: false, default: null },

  // user type for your existing logic
  role: { type: String, enum: ['patient', 'doctor', 'hospital'], default: 'patient' },

  refId: { type: mongoose.Schema.Types.ObjectId },

  // ⬇ google specific
  googleId: { type: String, default: null },
  name: { type: String },
  picture: { type: String },

}, { timestamps: true });

// Hash password only if exists
UserSchema.pre('save', async function(next) {
  if (!this.password || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  if (!this.password) return false; // google user has no password
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);