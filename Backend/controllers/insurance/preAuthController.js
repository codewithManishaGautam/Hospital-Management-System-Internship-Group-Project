const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const PreAuthCommunicationLog = require('../../models/insurance/PreAuthCommunicationLog');

// 1. POST /api/insurance/pre-auth - Create new pre-auth request in DRAFT
exports.createPreAuth = async (req, res, next) => {
  try {
    const preAuth = new PreAuthRequest({
      ...req.body,
      status: 'DRAFT',
      submittedAt: null
    });
    
    preAuth.statusHistory.push({
      status: 'DRAFT',
      notes: 'Initial pre-auth draft created.'
    });

    await preAuth.save();
    res.status(201).json({ success: true, message: 'Pre-auth request created', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /api/insurance/pre-auth - List all pre-auths
exports.listPreAuths = async (req, res, next) => {
  try {
    const preAuths = await PreAuthRequest.find(req.query)
      .populate('patientId')
      .populate({
        path: 'policyId',
        populate: { path: 'insuranceCompanyId tpaId' }
      })
      .sort('-createdAt');
    res.status(200).json({ success: true, data: preAuths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. GET /api/insurance/pre-auth/:id - Get single pre-auth
exports.getPreAuthDetail = async (req, res, next) => {
  try {
    const preAuth = await PreAuthRequest.findById(req.params.id)
      .populate('patientId')
      .populate({
        path: 'policyId',
        populate: { path: 'insuranceCompanyId tpaId' }
      })
      .populate('documents');
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    res.status(200).json({ success: true, data: preAuth });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. PATCH /api/insurance/pre-auth/:id/status - Update pre-auth status (State Machine)
exports.updatePreAuthStatus = async (req, res, next) => {
  try {
    const { status, notes, approvedAmount, authorizationNumber, rejectionReason } = req.body;
    
    const preAuth = await PreAuthRequest.findById(req.params.id);
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    
    // State machine logic
    const validTransitions = {
      'DRAFT': ['SUBMITTED'],
      'SUBMITTED': ['APPROVED', 'PARTIALLY_APPROVED', 'QUERY_RAISED', 'REJECTED'],
      'QUERY_RAISED': ['RESPONDED'],
      'RESPONDED': ['APPROVED', 'PARTIALLY_APPROVED', 'QUERY_RAISED', 'REJECTED'],
      'APPROVED': ['ENHANCEMENT_SUBMITTED', 'CLAIM_INITIATED'],
      'PARTIALLY_APPROVED': ['ENHANCEMENT_SUBMITTED', 'CLAIM_INITIATED'],
      'ENHANCEMENT_SUBMITTED': ['ENHANCEMENT_APPROVED', 'ENHANCEMENT_REJECTED'],
      'REJECTED': [], 
      'CLAIM_INITIATED': []
    };

    if (!validTransitions[preAuth.status].includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid transition from ${preAuth.status} to ${status}` });
    }
    
    preAuth.status = status;
    if (status === 'SUBMITTED') preAuth.submittedAt = Date.now();
    if (approvedAmount !== undefined) preAuth.approvedAmount = approvedAmount;
    if (authorizationNumber) preAuth.authorizationNumber = authorizationNumber;
    if (rejectionReason) preAuth.rejectionReason = rejectionReason;
    
    preAuth.statusHistory.push({
      status,
      changedAt: new Date(),
      notes
    });
    
    await preAuth.save();
    res.status(200).json({ success: true, message: 'Pre-auth status updated', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. POST /api/insurance/pre-auth/:id/communication - Log TPA communication
exports.logCommunication = async (req, res, next) => {
  try {
    const preAuth = await PreAuthRequest.findById(req.params.id);
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });

    const log = new PreAuthCommunicationLog({
      preAuthId: preAuth._id,
      ...req.body
    });
    await log.save();
    
    res.status(201).json({ success: true, message: 'Communication logged', data: log });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. POST /api/insurance/pre-auth/:id/enhancement - Submit enhancement request
exports.submitEnhancement = async (req, res, next) => {
  try {
    const { additionalAmount, reason } = req.body;
    const preAuth = await PreAuthRequest.findById(req.params.id);
    
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    
    if (preAuth.status !== 'APPROVED' && preAuth.status !== 'PARTIALLY_APPROVED') {
      return res.status(400).json({ success: false, message: 'Enhancement can only be requested for approved pre-auths' });
    }

    preAuth.enhancementRequests.push({
      additionalAmount,
      reason,
      submittedAt: new Date(),
      status: 'ENHANCEMENT_SUBMITTED'
    });
    
    preAuth.status = 'ENHANCEMENT_SUBMITTED';
    preAuth.statusHistory.push({
      status: 'ENHANCEMENT_SUBMITTED',
      notes: `Requested enhancement of ${additionalAmount} for: ${reason}`
    });
    
    await preAuth.save();
    res.status(200).json({ success: true, message: 'Enhancement requested', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
