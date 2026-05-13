const express = require('express');
const router = express.Router();

// Import sub-routes (will be populated over the coming weeks)
const policyRoutes = require('./policyRoutes');
const schemeRoutes = require('./schemeRoutes');
const preAuthRoutes = require('./preAuthRoutes');
const claimRoutes = require('./claimRoutes');
const documentRoutes = require('./documentRoutes');
const billingIntegrationRoutes = require('./billingIntegrationRoutes');
// const masterDataRoutes = require('./masterDataRoutes');

// Mount sub-routes
router.use('/policies', policyRoutes);
router.use('/schemes', schemeRoutes);
router.use('/pre-auth', preAuthRoutes);
router.use('/claims', claimRoutes);
router.use('/documents', documentRoutes);
router.use('/billing', billingIntegrationRoutes);
// router.use('/master-data', masterDataRoutes);

// @route   GET /api/insurance/health
// @desc    Health check endpoint for Insurance Module
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Insurance Module API is running successfully',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
