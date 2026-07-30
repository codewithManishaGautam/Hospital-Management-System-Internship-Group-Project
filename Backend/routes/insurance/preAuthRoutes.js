const express = require('express');
const router = express.Router();
const preauthController = require('../../controllers/insurance/preauthController');

// @route   POST /api/insurance/pre-auth
// @desc    Create a new pre-auth request
router.post('/', preauthController.createPreAuth);

// @route   GET /api/insurance/pre-auth
// @desc    List all pre-auth requests
router.get('/', preauthController.listPreAuths);

// @route   GET /api/insurance/pre-auth/:id
// @desc    Get single pre-auth detail
router.get('/:id', preauthController.getPreAuthDetail);

// @route   PATCH /api/insurance/pre-auth/:id/status
// @desc    Update pre-auth status (State Machine logic)
router.patch('/:id/status', preauthController.updatePreAuthStatus);

// @route   POST /api/insurance/pre-auth/:id/communication
// @desc    Log TPA communication or Query Response
router.post('/:id/communication', preauthController.logCommunication);

// @route   POST /api/insurance/pre-auth/:id/enhancement
// @desc    Submit an enhancement request
router.post('/:id/enhancement', preauthController.submitEnhancement);

module.exports = router;
