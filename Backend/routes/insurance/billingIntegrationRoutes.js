const express = require('express');
const router = express.Router();
const billingIntegrationController = require('../../controllers/insurance/billingIntegrationController');

// @route   POST /api/insurance/billing/mapping
// @desc    Create billing mapping after claim approval
router.post('/mapping', billingIntegrationController.createBillingMapping);

// @route   GET /api/insurance/billing/:patientId
// @desc    Get billing summary for a patient
router.get('/:patientId', billingIntegrationController.getBillingSummary);

module.exports = router;
