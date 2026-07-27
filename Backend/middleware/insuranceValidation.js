const { body, param, validationResult } = require('express-validator');

// Reusable middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Validation rules for registering a new Private Policy
const validatePolicyRegistration = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID format'),
  body('insuranceType').equals('Private').withMessage('insuranceType must be Private for this endpoint'),
  body('providerName').notEmpty().withMessage('Provider Name is required'),
  body('policyNumber').notEmpty().withMessage('Policy Number is required'),
  body('sumInsured').isNumeric().withMessage('Sum Insured must be a number').custom(value => value > 0).withMessage('Sum Insured must be greater than 0'),
  body('policyStartDate').isISO8601().withMessage('Valid Start Date is required'),
  body('policyEndDate').isISO8601().withMessage('Valid End Date is required'),
  validate
];

// Validation rules for enrolling in a Government Scheme
const validateSchemeEnrollment = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID format'),
  body('schemeName').isIn(['PM-JAY', 'CGHS', 'ESIC', 'MJPJAY', 'Other']).withMessage('Invalid Scheme Name'),
  validate
];

module.exports = {
  validatePolicyRegistration,
  validateSchemeEnrollment,
  validate
};
