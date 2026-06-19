const express = require('express');
const router = express.Router();
const preAuthController = require('../../controllers/insurance/preAuthController');

// @route   POST /api/insurance/pre-auth
// @desc    Create a new pre-auth request
router.post('/', preAuthController.createPreAuth);

// @route   GET /api/insurance/pre-auth
// @desc    List all pre-auth requests
router.get('/', preAuthController.listPreAuths);

// @route   GET /api/insurance/pre-auth/:id
// @desc    Get single pre-auth detail
router.get('/:id', preAuthController.getPreAuthDetail);

// @route   PATCH /api/insurance/pre-auth/:id/status
// @desc    Update pre-auth status
router.patch('/:id/status', preAuthController.updatePreAuthStatus);

// @route   POST /api/insurance/pre-auth/:id/query-response
// @desc    Respond to query
router.post('/:id/query-response', preAuthController.respondToQuery);

// @route   POST /api/insurance/pre-auth/:id/enhance
// @desc    Submit enhancement
router.post('/:id/enhance', preAuthController.enhancePreAuth);

module.exports = router;
