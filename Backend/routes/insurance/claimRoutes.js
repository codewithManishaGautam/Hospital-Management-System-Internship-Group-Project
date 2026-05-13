const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const InsuranceClaim = require('../../models/insurance/InsuranceClaim');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ success: false, errors: errors.array() });
};

// @route   POST /api/insurance/claims
// @desc    Create a new claim
router.post('/', [
  body('patientId').isMongoId().withMessage('Valid Patient ID is required'),
  body('claimType').isIn(['Cashless', 'Reimbursement']).withMessage('Invalid claim type'),
  body('admissionDate').isISO8601().toDate().withMessage('Valid admission date required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required')
], validate, async (req, res) => {
  try {
    const claimCount = await InsuranceClaim.countDocuments();
    const claimNumber = `CLM-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${(claimCount + 1).toString().padStart(4, '0')}`;
    
    const newClaim = new InsuranceClaim({
      ...req.body,
      claimNumber
    });
    await newClaim.save();

    res.status(201).json({
      success: true,
      message: 'Claim created successfully',
      data: newClaim
    });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/claims
// @desc    List all claims
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    
    const claims = await InsuranceClaim.find(filter)
      .populate('patientId', 'name mobile')
      .populate('policyId', 'policyNumber providerName')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
      
    const total = await InsuranceClaim.countDocuments(filter);

    res.status(200).json({ 
      success: true, 
      data: claims,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/claims/dashboard-stats
// @desc    Get dashboard statistics
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalClaims = await InsuranceClaim.countDocuments();
    const approvedClaims = await InsuranceClaim.countDocuments({ status: 'Approved' });
    const pendingClaims = await InsuranceClaim.countDocuments({ status: { $in: ['Under Process', 'Query', 'Submitted'] } });
    
    const settledAggregation = await InsuranceClaim.aggregate([
      { $match: { status: 'Settled' } },
      { $group: { _id: null, totalSettledAmount: { $sum: '$settledAmount' } } }
    ]);
    
    const totalSettledAmount = settledAggregation.length > 0 ? settledAggregation[0].totalSettledAmount : 0;

    res.status(200).json({
      success: true,
      data: {
        totalClaims,
        approvedClaims,
        pendingClaims,
        totalSettledAmount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/claims/:id
// @desc    Get single claim detail
router.get('/:id', async (req, res) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id)
      .populate('patientId')
      .populate('policyId')
      .populate('schemeId')
      .populate('documents');
      
    if (!claim) {
      return res.status(404).json({ success: false, error: 'Claim not found' });
    }
    
    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    console.error('Error fetching claim details:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   PATCH /api/insurance/claims/:id/status
// @desc    Update claim status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes, changedBy } = req.body;
    
    const statusHistoryUpdate = {
      status,
      changedAt: new Date(),
      changedBy,
      notes
    };

    const updatedClaim = await InsuranceClaim.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { status },
        $push: { statusHistory: statusHistoryUpdate }
      },
      { new: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({ success: false, error: 'Claim not found' });
    }

    res.status(200).json({
      success: true,
      message: `Claim status updated to ${status}`,
      data: updatedClaim
    });
  } catch (error) {
    console.error('Error updating claim status:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
