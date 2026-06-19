const express = require('express');
const router = express.Router();
const { validateSchemeEnrollment } = require('../../middleware/insuranceValidation');
const schemeController = require('../../controllers/insurance/schemeController');

// @route   POST /api/insurance/schemes
// @desc    Enroll a patient under a government scheme
router.post('/', validateSchemeEnrollment, schemeController.enrollScheme);

// @route   GET /api/insurance/schemes/:patientId
// @desc    Get all scheme enrollments for a patient
router.get('/:patientId', schemeController.getPatientSchemes);

// @route   PUT /api/insurance/schemes/:schemeId
// @desc    Update scheme details
router.put('/:schemeId', validateSchemeEnrollment, schemeController.updateScheme);

// @route   PATCH /api/insurance/schemes/:schemeId/verify
// @desc    Update verification status
router.patch('/:schemeId/verify', schemeController.updateSchemeVerificationStatus);

module.exports = router;
