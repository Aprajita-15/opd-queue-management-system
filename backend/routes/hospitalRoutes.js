// routes/hospitalRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const hospitalController = require('../controllers/hospitalController');

// List all hospitals (public or protected)
router.get('/', hospitalController.listHospitals);

// Get hospital details
router.get('/:id', hospitalController.getHospitalDetails);

// Create new hospital - MUST be protected
router.post('/new', protect, hospitalController.newHospital);

// Alternative endpoint (for backward compatibility)
router.post('/add', protect, hospitalController.addHospital);

// Delete hospital - MUST be protected
router.delete('/:id', protect, hospitalController.deleteHospital);

module.exports = router;