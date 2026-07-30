const InsuranceClaim = require('../../models/insurance/InsuranceClaim');

// 1. POST /api/insurance/claims - Create a new claim (Manual or from PreAuth)
exports.createClaim = async (req, res, next) => {
  try {
    const claim = new InsuranceClaim({
      ...req.body,
      status: 'INITIATED'
    });
    
    claim.statusHistory.push({
      status: 'INITIATED',
      notes: 'Claim created.',
      changedAt: new Date()
    });

    await claim.save();
    res.status(201).json({ success: true, message: 'Claim initiated', data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /api/insurance/claims - List claims
exports.listClaims = async (req, res, next) => {
  try {
    const claims = await InsuranceClaim.find(req.query)
      .populate('patientId')
      .populate('policyId')
      .populate('preAuthId')
      .sort('-createdAt');
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. GET /api/insurance/claims/:id - Get single claim
exports.getClaimDetail = async (req, res, next) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id)
      .populate('patientId')
      .populate('policyId')
      .populate('preAuthId')
      .populate('documents');
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. PATCH /api/insurance/claims/:id/status - Update Status with State Machine
exports.updateClaimStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    
    // Valid status transitions per PRD (simplified for demonstration)
    const validTransitions = {
      'INITIATED': ['DRAFT', 'CANCELLED'],
      'DRAFT': ['DOCS_PENDING', 'DOCS_COMPLETE', 'INTERNAL_REVIEW', 'CANCELLED'],
      'DOCS_PENDING': ['DOCS_COMPLETE', 'CANCELLED'],
      'DOCS_COMPLETE': ['INTERNAL_REVIEW', 'SUBMITTED'],
      'INTERNAL_REVIEW': ['SUBMITTED', 'DRAFT', 'DEFICIENCY_RAISED'],
      'SUBMITTED': ['ACKNOWLEDGED', 'QUERY_RAISED', 'REJECTED', 'SETTLED', 'PARTIALLY_SETTLED'],
      'ACKNOWLEDGED': ['QUERY_RAISED', 'UNDER_REVIEW', 'SETTLED', 'PARTIALLY_SETTLED', 'REJECTED'],
      'QUERY_RAISED': ['RESPONDED'],
      'RESPONDED': ['UNDER_REVIEW', 'SETTLED', 'PARTIALLY_SETTLED', 'REJECTED'],
      'UNDER_REVIEW': ['APPROVED', 'PARTIALLY_APPROVED', 'REJECTED', 'SETTLED', 'PARTIALLY_SETTLED'],
      'APPROVED': ['SETTLED'],
      'PARTIALLY_APPROVED': ['PARTIALLY_SETTLED', 'SHORTFALL_PENDING'],
      'SETTLED': ['CLOSED'],
      'PARTIALLY_SETTLED': ['SHORTFALL_PENDING', 'CLOSED', 'WRITTEN_OFF'],
      'SHORTFALL_PENDING': ['WRITTEN_OFF', 'APPEAL_FILED'],
      'APPEAL_FILED': ['APPEAL_SETTLED', 'APPEAL_REJECTED'],
      'APPEAL_SETTLED': ['CLOSED'],
      'APPEAL_REJECTED': ['WRITTEN_OFF', 'CLOSED'],
      'WRITTEN_OFF': ['CLOSED'],
      'CLOSED': [],
      'CANCELLED': [],
      'REJECTED': ['APPEAL_FILED', 'WRITTEN_OFF', 'CLOSED']
    };

    if (!validTransitions[claim.status] || !validTransitions[claim.status].includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid state transition from ${claim.status} to ${status}` });
    }
    
    claim.status = status;
    claim.statusHistory.push({
      status,
      notes,
      changedAt: new Date()
    });
    
    await claim.save();
    res.status(200).json({ success: true, message: 'Claim status updated', data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. PATCH /api/insurance/claims/:id/settlement - Record financial settlement
exports.recordSettlement = async (req, res, next) => {
  try {
    const { settledAmount, utrNumber, bankReference, partialReason } = req.body;
    
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    
    claim.settledAmount = (claim.settledAmount || 0) + settledAmount;
    claim.settlementDetails = {
      utrNumber,
      bankReference,
      partialReason,
      settlementDate: new Date()
    };
    
    if (claim.settledAmount >= claim.totalApproved) {
      claim.status = 'SETTLED';
    } else {
      claim.status = 'PARTIALLY_SETTLED';
    }

    claim.statusHistory.push({
      status: claim.status,
      notes: `Settlement of ${settledAmount} recorded via UTR: ${utrNumber}`,
      changedAt: new Date()
    });

    await claim.save();
    res.status(200).json({ success: true, message: 'Settlement recorded successfully', data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. GET /api/insurance/claims/dashboard-stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const stats = {
      totalClaims: await InsuranceClaim.countDocuments(),
      approvedClaims: await InsuranceClaim.countDocuments({ status: { $in: ['APPROVED', 'PARTIALLY_APPROVED', 'SETTLED', 'PARTIALLY_SETTLED'] } }),
      pendingClaims: await InsuranceClaim.countDocuments({ status: { $in: ['SUBMITTED', 'ACKNOWLEDGED', 'UNDER_REVIEW', 'QUERY_RAISED', 'RESPONDED'] } }),
      totalSettledAmount: 0 // Simplification for mock
    };
    
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
