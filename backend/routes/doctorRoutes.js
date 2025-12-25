const express = require('express');
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Add doctor - protected
router.post('/add', protect, doctorController.addDoctor);

// ALTERNATIVE: Also support /api/doctors endpoint for backward compatibility
router.post('/', protect, doctorController.addDoctor);

// Get doctors by department - public or protected (your choice)
router.get('/department/:departmentId', doctorController.listDoctors);

// Get single doctor details (optional)
router.get('/:id', doctorController.getDoctorDetails);

// Delete doctor - protected
router.delete('/:id', protect, doctorController.deleteDoctor);

// Update routes - protected (only hospital owner can update)
router.put('/:id/availability', protect, doctorController.updateAvailability);
router.put('/:id/working-hours', protect, doctorController.updateWorkingHours);
router.put('/:id/delay', protect, doctorController.updateDelay);

module.exports = router;