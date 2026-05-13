const express = require('express');
const router = express.Router();
const InsuranceBillingMapping = require('../../models/insurance/InsuranceBillingMapping');

// @route   GET /api/insurance/billing-summary/:patientId
// @desc    Get insurance deduction details for billing module
router.get('/summary/:patientId', async (req, res) => {
  try {
    const mapping = await InsuranceBillingMapping.findOne({ patientId: req.params.patientId })
      .populate('claimId', 'claimNumber status approvedAmount')
      .populate('policyId', 'policyNumber providerName');

    if (!mapping) {
      return res.status(404).json({ success: false, error: 'No billing mapping found for this patient' });
    }

    res.status(200).json({
      success: true,
      data: {
        totalBillAmount: mapping.totalBillAmount,
        approvedAmount: mapping.approvedAmount,
        coPayAmount: mapping.coPayAmount,
        deductibleAmount: mapping.deductibleAmount,
        insuranceDeduction: mapping.insuranceDeduction,
        patientPayable: mapping.patientPayable,
        isManualOverride: mapping.isManualOverride,
        claimDetails: mapping.claimId,
        policyDetails: mapping.policyId
      }
    });
  } catch (error) {
    console.error('Error fetching billing summary:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/billing-mapping
// @desc    Create billing-insurance mapping
router.post('/mapping', async (req, res) => {
  try {
    const newMapping = new InsuranceBillingMapping(req.body);
    await newMapping.save();

    res.status(201).json({
      success: true,
      message: 'Billing mapping created successfully',
      data: newMapping
    });
  } catch (error) {
    console.error('Error creating billing mapping:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
