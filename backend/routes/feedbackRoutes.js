const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/submit', async (req, res) => {
  try {
    console.log('📝 Feedback received:', req.body);
    
    // Validation - ADD THIS
    if (!req.body.hospitalId || !req.body.rating) {
      return res.status(400).json({ 
        success: false,  // ADD THIS
        message: 'hospitalId and rating are required'
      });
    }
    
    // Check if feedback model exists
    if (!Feedback) {
      console.error('Feedback model not found');
      return res.status(200).json({ 
        success: false,  // ADD THIS
        message: 'Feedback received (demo mode - database not configured)',
        demo: true,
        data: req.body
      });
    }
    
    const feedback = new Feedback({
      ...req.body,
      submittedAt: new Date()
    });

    await feedback.save();
    
    console.log('✅ Feedback saved:', feedback._id);
    
    // Calculate average rating - ADD THIS
    const allFeedbacks = await Feedback.find({ hospitalId: req.body.hospitalId });
    const totalRating = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = allFeedbacks.length > 0 ? totalRating / allFeedbacks.length : 0;
    
    res.status(201).json({ 
      success: true,  // ADD THIS - MOST IMPORTANT!
      message: 'Feedback submitted successfully',
      feedbackId: feedback._id,
      averageRating: parseFloat(averageRating.toFixed(1)),  // ADD THIS
      ratingCount: allFeedbacks.length  // ADD THIS
    });
  } catch (error) {
    console.error('❌ Error submitting feedback:', error);
    res.status(500).json({ 
      success: false,  // ADD THIS
      message: 'Server error', 
      error: error.message,
      demo: 'Try in demo mode below'
    });
  }
});

// Get hospital ratings
router.get('/hospital/:hospitalId', async (req, res) => {
  try {
    console.log('📊 Fetching ratings for hospital:', req.params.hospitalId);
    
    if (!Feedback) {
      return res.json({
        success: false,  // ADD THIS
        averageRating: 0,
        ratingCount: 0,
        feedbacks: [],
        demo: true
      });
    }
    
    const feedbacks = await Feedback.find({ 
      hospitalId: req.params.hospitalId 
    });

    if (feedbacks.length === 0) {
      return res.json({
        success: true,  // ADD THIS (still success, just no data)
        averageRating: 0,
        ratingCount: 0,
        feedbacks: [],
        demo: false
      });
    }

    const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / feedbacks.length;
    
    res.json({
      success: true,  // ADD THIS
      averageRating: parseFloat(averageRating.toFixed(1)),
      ratingCount: feedbacks.length,
      feedbacks: feedbacks.slice(0, 5),
      demo: false
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.json({
      success: false,  // ADD THIS
      averageRating: 0,
      ratingCount: 0,
      feedbacks: [],
      demo: true
    });
  }
});

module.exports = router;