const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const Hospital = require('../models/Hospital');

// Add doctor with createdBy from authenticated user
exports.addDoctor = async (req, res) => {
  try {
    console.log('Add Doctor Request Body:', req.body);
    console.log('Authenticated User:', req.user);

    // Validate required fields
    if (!req.body.name || !req.body.specialization || !req.body.departmentId) {
      return res.status(400).json({ 
        message: "Name, specialization, and departmentId are required" 
      });
    }

    // Add createdBy from authenticated user
    const doctorData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const doctor = await Doctor.create(doctorData);
    console.log('Doctor created:', doctor);
    
    // Add doctor to department
    await Department.findByIdAndUpdate(
      req.body.departmentId, 
      { $push: { doctors: doctor._id } }
    );
    
    res.status(201).json(doctor);
  } catch (err) {
    console.error('Add Doctor Error:', err);
    res.status(500).json({ 
      error: err.message,
      details: err.errors ? Object.values(err.errors).map(e => e.message) : []
    });
  }
};

// Get single doctor details
exports.getDoctorDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('departmentId')
      .populate('queue')
      .populate('createdBy', 'email role');
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error('Get Doctor Details Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete doctor with authorization check
exports.deleteDoctor = async (req, res) => {
  try {
    console.log('Delete doctor request:', req.params.id);
    console.log('Requesting user:', req.user);

    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'departmentId',
      populate: {
        path: 'hospitalId',
        select: 'createdBy'
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if user is the hospital creator
    const hospitalCreatorId = doctor.departmentId?.hospitalId?.createdBy?.toString();
    
    console.log('Hospital creator ID:', hospitalCreatorId);
    console.log('Current user ID:', req.user.id);
    console.log('Match:', hospitalCreatorId === req.user.id);

    if (hospitalCreatorId !== req.user.id) {
      return res.status(403).json({ 
        message: "Not authorized to delete this doctor. Only hospital creator can delete doctors." 
      });
    }

    // Remove doctor from department
    await Department.findByIdAndUpdate(
      doctor.departmentId,
      { $pull: { doctors: doctor._id } }
    );

    await Doctor.findByIdAndDelete(doctor._id);
    
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error('Delete Doctor Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// List doctors by department
exports.listDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ departmentId: req.params.departmentId })
      .populate('queue')
      .populate('createdBy', 'email role');
    
    res.json(doctors);
  } catch (err) {
    console.error('List Doctors Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update doctor availability
exports.updateAvailability = async (req, res) => {
  try {
    const { absentDates } = req.body;
    
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'departmentId',
      populate: {
        path: 'hospitalId',
        select: 'createdBy'
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check authorization
    const hospitalCreatorId = doctor.departmentId?.hospitalId?.createdBy?.toString();
    if (hospitalCreatorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    doctor.absentDates = absentDates;
    await doctor.save();
    
    res.json(doctor);
  } catch (err) {
    console.error('Update Availability Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update working hours
exports.updateWorkingHours = async (req, res) => {
  try {
    const { workingDays, workingHours } = req.body;
    
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'departmentId',
      populate: {
        path: 'hospitalId',
        select: 'createdBy'
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check authorization
    const hospitalCreatorId = doctor.departmentId?.hospitalId?.createdBy?.toString();
    if (hospitalCreatorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    doctor.workingDays = workingDays;
    doctor.workingHours = workingHours;
    await doctor.save();
    
    res.json(doctor);
  } catch (err) {
    console.error('Update Working Hours Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update delay
exports.updateDelay = async (req, res) => {
  try {
    const { delay } = req.body;
    
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'departmentId',
      populate: {
        path: 'hospitalId',
        select: 'createdBy'
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check authorization
    const hospitalCreatorId = doctor.departmentId?.hospitalId?.createdBy?.toString();
    if (hospitalCreatorId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    doctor.currentDelay = delay;
    await doctor.save();
    
    res.json(doctor);
  } catch (err) {
    console.error('Update Delay Error:', err);
    res.status(500).json({ error: err.message });
  }
};