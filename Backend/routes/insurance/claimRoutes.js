const express = require('express');
const router = express.Router();
const claimController = require('../../controllers/insurance/claimController');

// @route   POST /api/insurance/claims
// @desc    Create new claim
router.post('/', claimController.createClaim);

// @route   GET /api/insurance/claims
// @desc    List all claims
router.get('/', claimController.listClaims);

// @route   GET /api/insurance/claims/dashboard-stats
// @desc    Get dashboard statistics
router.get('/dashboard-stats', claimController.getDashboardStats);

// @route   GET /api/insurance/claims/:id
// @desc    Get single claim detail
router.get('/:id', claimController.getClaimDetail);

// @route   PATCH /api/insurance/claims/:id/status
// @desc    Update claim status
router.patch('/:id/status', claimController.updateClaimStatus);

// @route   PATCH /api/insurance/claims/:id/settlement
// @desc    Record settlement details
router.patch('/:id/settlement', claimController.recordSettlement);

module.exports = router;
