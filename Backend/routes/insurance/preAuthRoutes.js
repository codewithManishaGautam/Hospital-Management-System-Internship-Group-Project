const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ success: false, errors: errors.array() });
};

// @route   POST /api/insurance/pre-auth
// @desc    Create a new pre-auth request
router.post('/', [
  body('patientId').isMongoId().withMessage('Valid Patient ID is required'),
  body('admittingDoctor').notEmpty().withMessage('Admitting doctor is required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('proposedTreatment').notEmpty().withMessage('Proposed treatment is required'),
  body('estimatedCost').isNumeric().withMessage('Estimated cost must be a number')
], validate, async (req, res) => {
  try {
    const newPreAuth = new PreAuthRequest(req.body);
    await newPreAuth.save();

    res.status(201).json({
      success: true,
      message: 'Pre-auth request submitted',
      data: newPreAuth
    });
  } catch (error) {
    console.error('Error creating pre-auth:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/pre-auth
// @desc    List all pre-auth requests
router.get('/', async (req, res) => {
  try {
    const preAuths = await PreAuthRequest.find()
      .populate('patientId', 'name mobile')
      .populate('policyId', 'policyNumber providerName');
    res.status(200).json({ success: true, data: preAuths });
  } catch (error) {
    console.error('Error fetching pre-auths:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/pre-auth/:id
// @desc    Get single pre-auth detail
router.get('/:id', async (req, res) => {
  try {
    const preAuth = await PreAuthRequest.findById(req.params.id)
      .populate('patientId')
      .populate('policyId')
      .populate('schemeId');
      
    if (!preAuth) {
      return res.status(404).json({ success: false, error: 'Pre-auth not found' });
    }
    
    res.status(200).json({ success: true, data: preAuth });
  } catch (error) {
    console.error('Error fetching pre-auth details:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PATCH /api/insurance/pre-auth/:id/status
// @desc    Update pre-auth status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, approvedAmount, authorizationNumber, validityDate, notes, changedBy } = req.body;
    
    const statusHistoryUpdate = {
      status,
      changedAt: new Date(),
      changedBy,
      notes
    };

    const updateFields = { status };
    if (approvedAmount !== undefined) updateFields.approvedAmount = approvedAmount;
    if (authorizationNumber) updateFields.authorizationNumber = authorizationNumber;
    if (validityDate) updateFields.validityDate = new Date(validityDate);

    const updatedPreAuth = await PreAuthRequest.findByIdAndUpdate(
      req.params.id,
      { 
        $set: updateFields,
        $push: { statusHistory: statusHistoryUpdate }
      },
      { new: true }
    );

    if (!updatedPreAuth) {
      return res.status(404).json({ success: false, error: 'Pre-auth not found' });
    }

    res.status(200).json({
      success: true,
      message: `Pre-auth status updated to ${status}`,
      data: updatedPreAuth
    });
  } catch (error) {
    console.error('Error updating pre-auth status:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
