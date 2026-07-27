const express = require('express');
const router = express.Router();
const billingIntegrationController = require('../../controllers/insurance/billingIntegrationController');

// @route   GET /api/insurance/billing/admissions/:admissionId/coverage
// @desc    Get insurance coverage for an admission
router.get('/admissions/:admissionId/coverage', billingIntegrationController.getCoverageForAdmission);

// @route   POST /api/insurance/billing/admissions/:admissionId/calculate-deduction
// @desc    Calculate patient payable vs insurance deduction
router.post('/admissions/:admissionId/calculate-deduction', billingIntegrationController.calculateDeduction);

// @route   POST /api/insurance/billing/admissions/:admissionId/bill-finalized
// @desc    Notify insurance module that bill is finalized
router.post('/admissions/:admissionId/bill-finalized', billingIntegrationController.billFinalized);

// @route   GET /api/insurance/billing/admissions/:admissionId/settlement-status
// @desc    Get settlement status for AR
router.get('/admissions/:admissionId/settlement-status', billingIntegrationController.getSettlementStatus);

module.exports = router;
