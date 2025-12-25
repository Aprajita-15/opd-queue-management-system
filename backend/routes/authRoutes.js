// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;
// const express = require('express');


// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Normal login + signup routes
// const { signup, login } = require('../controllers/authController');
// router.post('/signup', signup);
// router.post('/login', login);

// // GOOGLE AUTH ROUTES
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   (req, res) => {
//     res.redirect("http://localhost:5173/dashboard");
//   }
// );

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import all auth controller functions
const { signup, login, googleLogin } = require('../controllers/authController');

// Normal login + signup routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth route (using OAuth2Client method)
router.post('/google', googleLogin);

module.exports = router;