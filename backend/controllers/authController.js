// const User = require('../models/User');
// const Patient = require('../models/Patient');
// const Doctor = require('../models/Doctor');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   try {
//     const { email, password, role, name, age, phone, specialization } = req.body;
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     let refId = null;
    
//     if (role === 'patient') {
//       if (!name || !age || !phone) {
//         return res.status(400).json({ error: 'Name, age, and phone are required for patients' });
//       }
//       const patient = await Patient.create({ name, age, phone });
//       refId = patient._id;
//     } else if (role === 'doctor') {
//       if (!name || !specialization) {
//         return res.status(400).json({ error: 'Name and specialization are required for doctors' });
//       }
//       const doctor = await Doctor.create({ name, specialization, departmentId: null });
//       refId = doctor._id;
//     } else if (role === 'hospital') {
//       // For hospital role, refId can be null initially
//       refId = null;
//     }

//     const user = await User.create({ email, password, role, refId });
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//     res.status(201).json({ 
//       token, 
//       user: { 
//         id: user._id, 
//         email: user.email, 
//         role: user.role, 
//         refId: user.refId 
//       } 
//     });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
    
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//     res.json({ 
//       token, 
//       user: { 
//         id: user._id, 
//         email: user.email, 
//         role: user.role, 
//         refId: user.refId 
//       } 
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =====================================
// NORMAL SIGNUP
// =====================================
exports.signup = async (req, res) => {
  try {
    const { email, password, role, name, age, phone, specialization } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    let refId = null;

    if (role === 'patient') {
      const patient = await Patient.create({ name, age, phone });
      refId = patient._id;
    } 
    else if (role === 'doctor') {
      const doctor = await Doctor.create({ name, specialization, departmentId: null });
      refId = doctor._id;
    } 
    else if (role === 'hospital') {
      refId = null;
    }

    const user = await User.create({ email, password, role, refId });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        refId: user.refId
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
};

// =====================================
// NORMAL LOGIN
// =====================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        refId: user.refId
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

// =====================================
// GOOGLE LOGIN / SIGNUP
// =====================================
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    console.log("Received Google credential");

    if (!credential) {
      return res.status(400).json({ error: "Google credential missing" });
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    console.log("Google payload received for:", email);

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      console.log("Creating new user for:", email);
      
      // Check if user exists with googleId
      user = await User.findOne({ googleId: sub });
      
      if (!user) {
        // Create patient profile
        const patient = await Patient.create({
          name: name || "Google User",
          age: null,
          phone: null
        });

        // Create user
        user = await User.create({
          email,
          role: "patient",
          googleId: sub,
          picture: picture,
          name: name,
          refId: patient._id,
          password: null
        });

        isNewUser = true;
      }
    } else {
      // Update existing user with Google ID if not present
      if (!user.googleId) {
        user.googleId = sub;
        user.picture = picture;
        user.name = name;
        await user.save();
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: isNewUser ? "Google signup successful" : "Google login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        refId: user.refId,
        picture: user.picture,
        name: user.name
      }
    });

  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ error: "Google login failed: " + err.message });
  }
};