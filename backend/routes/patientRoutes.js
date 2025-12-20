const express = require('express');
const { registerPatient, updateAppointment, markAbsent } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerPatient);
router.put('/:id', protect, updateAppointment);
router.put('/:id/absent', protect, markAbsent);

module.exports = router;