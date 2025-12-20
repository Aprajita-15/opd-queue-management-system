const express = require('express');
const { addDepartment, listByHospital } = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addDepartment);
router.get('/hospital/:hospitalId', listByHospital);
module.exports = router;