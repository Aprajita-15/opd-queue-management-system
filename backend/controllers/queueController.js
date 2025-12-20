const Queue = require('../models/Queue');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.addToQueue = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    const queueCount = await Queue.countDocuments({ doctorId });
    
    const queue = await Queue.create({
      doctorId,
      patientId,
      position: queueCount + 1,
      estimatedTime: (queueCount + 1) * 15
    });

    await Doctor.findByIdAndUpdate(doctorId, { $push: { queue: queue._id } });
    res.status(201).json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromQueue = async (req, res) => {
  try {
    const queue = await Queue.findByIdAndDelete(req.params.id);
    await Doctor.findByIdAndUpdate(queue.doctorId, { $pull: { queue: queue._id } });
    
    await Queue.updateMany(
      { doctorId: queue.doctorId, position: { $gt: queue.position } },
      { $inc: { position: -1, estimatedTime: -15 } }
    );

    res.json({ message: 'Removed from queue' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueue = async (req, res) => {
  try {
    const queue = await Queue.find({ doctorId: req.params.doctorId })
      .populate('patientId')
      .sort({ position: 1 });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startConsultation = async (req, res) => {
  try {
    const queue = await Queue.findOne({ doctorId: req.params.doctorId, position: 1 });
    if (queue) {
      await Patient.findByIdAndUpdate(queue.patientId, { status: 'in-consultation' });
      res.json({ message: 'Consultation started' });
    } else {
      res.status(404).json({ error: 'No patient in queue' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.endConsultation = async (req, res) => {
  try {
    const queue = await Queue.findOne({ doctorId: req.params.doctorId, position: 1 });
    if (queue) {
      await Patient.findByIdAndUpdate(queue.patientId, { status: 'completed' });
      await Queue.findByIdAndDelete(queue._id);
      await Doctor.findByIdAndUpdate(queue.doctorId, { $pull: { queue: queue._id } });
      
      await Queue.updateMany(
        { doctorId: queue.doctorId },
        { $inc: { position: -1, estimatedTime: -15 } }
      );

      res.json({ message: 'Consultation ended' });
    } else {
      res.status(404).json({ error: 'No patient in consultation' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};