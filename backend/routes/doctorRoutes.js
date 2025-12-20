const express = require('express');
const { addDoctor, listDoctors, updateAvailability, updateWorkingHours, updateDelay, deleteDoctor } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addDoctor);
router.get('/department/:departmentId', listDoctors);
router.put('/:id/availability', protect, authorize('doctor'), updateAvailability);
router.put('/:id/hours', protect, authorize('doctor'), updateWorkingHours);
router.put('/:id/delay', protect, authorize('doctor'), updateDelay);
router.delete('/:id', protect, deleteDoctor);

module.exports = router;