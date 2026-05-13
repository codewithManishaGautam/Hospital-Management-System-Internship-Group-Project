const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const GovernmentScheme = require('../../models/insurance/GovernmentScheme');

// Validation Middleware
const schemeValidationRules = () => {
  return [
    body('patientId').isMongoId().withMessage('Valid Patient ID is required'),
    body('schemeName').isIn(['PM-JAY', 'CGHS', 'ESIC', 'MJPJAY', 'Other']).withMessage('Invalid scheme name')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ success: false, errors: errors.array() });
};

// @route   POST /api/insurance/schemes
// @desc    Enroll a patient under a government scheme
router.post('/', schemeValidationRules(), validate, async (req, res) => {
  try {
    const newScheme = new GovernmentScheme(req.body);
    await newScheme.save();

    res.status(201).json({
      success: true,
      message: 'Scheme enrolled successfully',
      data: newScheme
    });
  } catch (error) {
    console.error('Error enrolling scheme:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/schemes/:patientId
// @desc    Get all scheme enrollments for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const schemes = await GovernmentScheme.find({ patientId: req.params.patientId });
    res.status(200).json({ success: true, data: schemes });
  } catch (error) {
    console.error('Error fetching patient schemes:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PUT /api/insurance/schemes/:schemeId
// @desc    Update scheme details
router.put('/:schemeId', schemeValidationRules(), validate, async (req, res) => {
  try {
    const updatedScheme = await GovernmentScheme.findByIdAndUpdate(
      req.params.schemeId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedScheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Scheme updated successfully',
      data: updatedScheme
    });
  } catch (error) {
    console.error('Error updating scheme:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PATCH /api/insurance/schemes/:schemeId/verify
// @desc    Update verification status
router.patch('/:schemeId/verify', async (req, res) => {
  try {
    const { verificationStatus, verifiedBy } = req.body;
    
    if (!['Verified — Active', 'Verified — Expired', 'Verification Failed'].includes(verificationStatus)) {
      return res.status(400).json({ success: false, error: 'Invalid verification status' });
    }

    const updatedScheme = await GovernmentScheme.findByIdAndUpdate(
      req.params.schemeId,
      { 
        $set: { 
          verificationStatus,
          verifiedBy,
          verifiedAt: new Date()
        } 
      },
      { new: true }
    );

    if (!updatedScheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }

    res.status(200).json({
      success: true,
      message: `Scheme status updated to ${verificationStatus}`,
      data: updatedScheme
    });
  } catch (error) {
    console.error('Error verifying scheme:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
