const express = require('express');
const router = express.Router();
const { validatePolicyRegistration } = require('../../middleware/insuranceValidation');
const policyController = require('../../controllers/insurance/policyController');

// @route   POST /api/insurance/policies
// @desc    Register a new insurance policy for a patient
router.post('/', validatePolicyRegistration, policyController.registerPolicy);

// @route   GET /api/insurance/policies/:patientId
// @desc    Get all policies for a patient
router.get('/:patientId', policyController.getPatientPolicies);

// @route   GET /api/insurance/policies/detail/:policyId
// @desc    Get single policy details
router.get('/detail/:policyId', policyController.getPolicyDetail);

// @route   PUT /api/insurance/policies/:policyId
// @desc    Update policy details
router.put('/:policyId', validatePolicyRegistration, policyController.updatePolicy);

// @route   PATCH /api/insurance/policies/:policyId/verify
// @desc    Update verification status
router.patch('/:policyId/verify', policyController.updatePolicyVerificationStatus);

// @route   DELETE /api/insurance/policies/:policyId
// @desc    Soft-delete a policy
router.delete('/:policyId', policyController.deletePolicy);

module.exports = router;
