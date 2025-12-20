const express = require('express');
const {  
  listHospitals, 
  getHospitalDetails, 
  newHospital, 
  deleteHospital
} = require('../controllers/hospitalController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Add hospital (new API)
router.post('/add', newHospital);

// Old add hospital (if still needed)
//router.post('/', protect, authorize('hospital'), addHospital);

// List all hospitals
router.get('/', listHospitals);

// Delete hospital
router.delete('/:id', deleteHospital);

// Get hospital by ID (must come LAST)
router.get('/:id', getHospitalDetails);

module.exports = router;
