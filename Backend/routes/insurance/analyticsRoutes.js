const express = require('express');
const router = express.Router();
const analyticsController = require('../../controllers/insurance/analyticsController');
// const { authenticate } = require('../../middleware/auth');
// const { authorize } = require('../../middleware/roleMiddleware');

// Get analytics dashboard
// TODO: uncomment auth when RBAC is implemented
router.get('/', /* authenticate, authorize(['Admin', 'Insurance Admin']), */ analyticsController.getAnalyticsDashboard);

module.exports = router;
