const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const InsurancePolicy = require('../../models/insurance/InsurancePolicy');

// Validation Middleware
const policyValidationRules = () => {
  return [
    body('patientId').isMongoId().withMessage('Valid Patient ID is required'),
    body('insuranceType').isIn(['Private', 'Government']).withMessage('Invalid insurance type'),
    body('providerName').notEmpty().withMessage('Provider name is required'),
    body('policyNumber').notEmpty().withMessage('Policy number is required'),
    body('sumInsured').isNumeric().withMessage('Sum insured must be a number'),
    body('policyStartDate').isISO8601().toDate().withMessage('Valid start date is required'),
    body('policyEndDate').isISO8601().toDate().withMessage('Valid end date is required')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ success: false, errors: errors.array() });
};

// @route   POST /api/insurance/policies
// @desc    Register a new insurance policy for a patient
router.post('/', policyValidationRules(), validate, async (req, res) => {
  try {
    const existingPolicy = await InsurancePolicy.findOne({ policyNumber: req.body.policyNumber });
    if (existingPolicy) {
      return res.status(409).json({ success: false, error: 'Policy number already exists' });
    }

    const newPolicy = new InsurancePolicy(req.body);
    await newPolicy.save();

    res.status(201).json({
      success: true,
      message: 'Policy registered successfully',
      data: newPolicy
    });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/policies/:patientId
// @desc    Get all policies for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const policies = await InsurancePolicy.find({ patientId: req.params.patientId })
      .populate('tpaId', 'name helpdeskPhone')
      .populate('insurerCompanyId', 'name contactPhone');
    
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    console.error('Error fetching patient policies:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/policies/detail/:policyId
// @desc    Get single policy details
router.get('/detail/:policyId', async (req, res) => {
  try {
    const policy = await InsurancePolicy.findById(req.params.policyId)
      .populate('tpaId', 'name portalUrl helpdeskPhone helpdeskEmail preAuthTAT claimTAT')
      .populate('insurerCompanyId', 'name type contactPhone claimPortalUrl');
    
    if (!policy) {
      return res.status(404).json({ success: false, error: 'Policy not found' });
    }
    
    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    console.error('Error fetching policy detail:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PUT /api/insurance/policies/:policyId
// @desc    Update policy details
router.put('/:policyId', policyValidationRules(), validate, async (req, res) => {
  try {
    const updatedPolicy = await InsurancePolicy.findByIdAndUpdate(
      req.params.policyId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ success: false, error: 'Policy not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Policy updated successfully',
      data: updatedPolicy
    });
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PATCH /api/insurance/policies/:policyId/verify
// @desc    Update verification status
router.patch('/:policyId/verify', async (req, res) => {
  try {
    const { verificationStatus, verifiedBy } = req.body;
    
    if (!['Verified — Active', 'Verified — Expired', 'Verification Failed'].includes(verificationStatus)) {
      return res.status(400).json({ success: false, error: 'Invalid verification status' });
    }

    const updatedPolicy = await InsurancePolicy.findByIdAndUpdate(
      req.params.policyId,
      { 
        $set: { 
          verificationStatus,
          verifiedBy,
          verifiedAt: new Date()
        } 
      },
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ success: false, error: 'Policy not found' });
    }

    res.status(200).json({
      success: true,
      message: `Policy status updated to ${verificationStatus}`,
      data: updatedPolicy
    });
  } catch (error) {
    console.error('Error verifying policy:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   DELETE /api/insurance/policies/:policyId
// @desc    Soft-delete a policy
router.delete('/:policyId', async (req, res) => {
  try {
    const deletedPolicy = await InsurancePolicy.findByIdAndUpdate(
      req.params.policyId,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!deletedPolicy) {
      return res.status(404).json({ success: false, error: 'Policy not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Policy deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
