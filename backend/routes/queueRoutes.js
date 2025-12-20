const express = require('express');
const { addToQueue, removeFromQueue, getQueue, startConsultation, endConsultation } = require('../controllers/queueController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addToQueue);
router.delete('/:id', protect, removeFromQueue);
router.get('/doctor/:doctorId', getQueue);
router.post('/doctor/:doctorId/start', protect, startConsultation);
router.post('/doctor/:doctorId/end', protect, endConsultation);

module.exports = router;