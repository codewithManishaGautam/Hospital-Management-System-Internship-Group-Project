const InsuranceClaim = require('../../models/insurance/InsuranceClaim');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const InsuranceBillingMapping = require('../../models/insurance/InsuranceBillingMapping');
const { notify } = require('../../utils/notificationHelper');

// 1. POST /claims - Create new claim (with auto-populate from pre-auth)
exports.createClaim = async (req, res, next) => {
  try {
    const claimData = { ...req.body };

    // Normalize frontend field names to model field names
    if (claimData.hospitalizationDate) {
      claimData.admissionDate = claimData.hospitalizationDate;
      delete claimData.hospitalizationDate;
    }
    if (claimData.totalBilledAmount !== undefined) {
      claimData.totalBillAmount = claimData.totalBilledAmount;
      claimData.claimedAmount = claimData.totalBilledAmount;
      delete claimData.totalBilledAmount;
    }

    // Auto-populate from linked pre-auth
    if (claimData.preAuthId) {
      const preAuth = await PreAuthRequest.findById(claimData.preAuthId);
      if (preAuth) {
        if (!claimData.patientId) claimData.patientId = preAuth.patientId;
        if (!claimData.policyId) claimData.policyId = preAuth.policyId;
        if (!claimData.schemeId) claimData.schemeId = preAuth.schemeId;
        if (!claimData.diagnosis) claimData.diagnosis = preAuth.diagnosis;
        if (!claimData.treatingDoctor) claimData.treatingDoctor = preAuth.admittingDoctor;
        if (!claimData.claimedAmount && preAuth.approvedAmount) claimData.claimedAmount = preAuth.approvedAmount;
        if (!claimData.totalBillAmount && preAuth.estimatedCost) claimData.totalBillAmount = preAuth.estimatedCost;
        if (!claimData.providerTemplateUsed) claimData.providerTemplateUsed = preAuth.providerTemplateUsed;
        if (!claimData.providerSpecificData) claimData.providerSpecificData = preAuth.providerSpecificData;
      }
    }

    const claim = new InsuranceClaim(claimData);

    // Generate claim number
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const count = await InsuranceClaim.countDocuments({ claimNumber: { $regex: dateStr } });
    claim.claimNumber = `CLM-${dateStr}-${String(count + 1).padStart(4, '0')}`;

    await claim.save();
    
    await notify({
      message: `New claim ${claim.claimNumber} created for amount ₹${claim.totalBillAmount || claim.claimedAmount || 0}`,
      type: 'claim',
      referenceId: claim._id,
      referenceModel: 'InsuranceClaim'
    });
    
    res.status(201).json({ success: true, message: 'Claim created', data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /claims - List all claims
exports.listClaims = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const claims = await InsuranceClaim.find(query)
      .populate('patientId', 'name mobile adhaar')
      .populate('policyId')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
      
    const total = await InsuranceClaim.countDocuments(query);
    
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. GET /claims/:id - Get single claim
exports.getClaimDetail = async (req, res, next) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id)
      .populate('patientId')
      .populate('policyId')
      .populate('schemeId')
      .populate('preAuthId')
      .populate('documents');
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. PATCH /claims/:id/status - Update claim status
exports.updateClaimStatus = async (req, res, next) => {
  try {
    const { status, notes, rejectionReason } = req.body;
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    
    claim.status = status;
    if (rejectionReason) claim.rejectionReason = rejectionReason;
    
    claim.statusHistory.push({
      status,
      changedAt: new Date(),
      notes
    });
    
    await claim.save();
    
    await notify({
      message: `Claim ${claim.claimNumber} status updated to ${status}`,
      type: 'claim',
      referenceId: claim._id,
      referenceModel: 'InsuranceClaim'
    });

    // Auto-create billing mapping on approval
    if (status === 'Approved') {
      const existingMapping = await InsuranceBillingMapping.findOne({ claimId: claim._id });
      if (!existingMapping) {
        const approvedAmt = req.body.approvedAmount || claim.approvedAmount || claim.claimedAmount || 0;
        const totalBill = claim.totalBillAmount || claim.claimedAmount || approvedAmt;
        await InsuranceBillingMapping.create({
          patientId: claim.patientId,
          claimId: claim._id,
          policyId: claim.policyId,
          totalBillAmount: totalBill,
          approvedAmount: approvedAmt,
          insuranceDeduction: approvedAmt,
          patientPayable: totalBill - approvedAmt,
          coPayAmount: claim.coPayAmount || 0,
          deductibleAmount: claim.deductibleAmount || 0
        });
        
        await notify({
          message: `Billing mapping auto-created for approved claim ${claim.claimNumber}`,
          type: 'billing',
          referenceId: claim._id,
          referenceModel: 'InsuranceClaim'
        });
      }
    }
    
    res.status(200).json({ success: true, message: `Claim status updated to ${status}`, data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. PATCH /claims/:id/settlement - Record settlement details
exports.recordSettlement = async (req, res, next) => {
  try {
    const { settledAmount, utrNumber, bankReference, partialReason } = req.body;
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    
    claim.settledAmount = settledAmount;
    claim.settlementDetails = {
      utrNumber,
      settlementDate: new Date(),
      bankReference,
      partialReason
    };
    
    claim.status = claim.settledAmount >= claim.claimedAmount ? 'Settled' : 'Partially Settled';
    claim.statusHistory.push({
      status: claim.status,
      changedAt: new Date(),
      notes: `Settled amount: ${settledAmount}`
    });
    
    await claim.save();
    res.status(200).json({ success: true, message: 'Settlement recorded', data: claim });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. GET /claims/dashboard-stats - Get dashboard statistics
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalClaims = await InsuranceClaim.countDocuments();
    const approvedClaims = await InsuranceClaim.countDocuments({ status: 'Approved' });
    const pendingClaims = await InsuranceClaim.countDocuments({ status: { $in: ['Draft', 'Documents Pending', 'Ready for Submission', 'Submitted', 'Under Process', 'Query'] } });
    
    const settledStats = await InsuranceClaim.aggregate([
      { $match: { status: { $in: ['Settled', 'Partially Settled'] } } },
      { $group: { _id: null, totalSettledAmount: { $sum: "$settledAmount" } } }
    ]);
    
    const totalSettledAmount = settledStats.length > 0 ? settledStats[0].totalSettledAmount : 0;
    
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
    res.status(500).json({ success: false, message: error.message });
  }
};
