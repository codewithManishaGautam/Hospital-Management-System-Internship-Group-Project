const express = require('express');
const router = express.Router();
const InsuranceClaim = require('../models/InsuranceClaim');

// @route   POST /api/insurance/verify-patient
// @desc    Verify patient insurance details (Mock Implementation)
router.post('/verify-patient', async (req, res) => {
  try {
    const { patientId, insuranceProvider, policyNumber } = req.body;
    
    if (!patientId || !insuranceProvider || !policyNumber) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // MOCK VERIFICATION LOGIC
    // In production, this would call external API (Ayushman Bharat, TPA, etc.)
    const isValid = policyNumber.length > 5; // Simple mock validation
    
    if (isValid) {
      res.status(200).json({
        success: true,
        message: 'Insurance verified successfully',
        data: {
          status: 'active',
          coverageLimit: 500000,
          validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
      });
    } else {
      res.status(404).json({ success: false, error: 'Policy details invalid or expired' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/pre-auth
// @desc    Submit a pre-auth request for a patient
router.post('/pre-auth', async (req, res) => {
  try {
    const { patientId, insuranceProvider, policyNumber, estimatedCost, diagnosis } = req.body;

    // Create a new claim record in Pending state
    const newClaim = new InsuranceClaim({
      patientId,
      insuranceProvider,
      policyNumber,
      claimType: 'Cashless',
      status: 'Pending Pre-Auth',
      estimatedCost,
      diagnosis
    });

    await newClaim.save();

    res.status(201).json({
      success: true,
      message: 'Pre-auth request submitted',
      data: newClaim
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/claims
// @desc    Get all claims
router.get('/claims', async (req, res) => {
  try {
    const claims = await InsuranceClaim.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: claims });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
