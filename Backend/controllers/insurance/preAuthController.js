const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const { notify } = require('../../utils/notificationHelper');

// 1. POST /pre-auth - Create new pre-auth request
exports.createPreAuth = async (req, res, next) => {
  try {
    const preAuth = new PreAuthRequest(req.body);
    await preAuth.save();
    
    await notify({
      message: `New pre-auth request submitted for diagnosis: ${preAuth.diagnosis}`,
      type: 'pre_auth',
      referenceId: preAuth._id,
      referenceModel: 'PreAuthRequest'
    });
    
    res.status(201).json({ success: true, message: 'Pre-auth request created', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /pre-auth - List all pre-auths
exports.listPreAuths = async (req, res, next) => {
  try {
    const preAuths = await PreAuthRequest.find()
      .populate('patientId', 'name mobile adhaar')
      .populate('policyId')
      .populate('schemeId');
    res.status(200).json({ success: true, data: preAuths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. GET /pre-auth/:id - Get single pre-auth
exports.getPreAuthDetail = async (req, res, next) => {
  try {
    const preAuth = await PreAuthRequest.findById(req.params.id)
      .populate('patientId')
      .populate('policyId')
      .populate('schemeId')
      .populate('documents');
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    res.status(200).json({ success: true, data: preAuth });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. PATCH /pre-auth/:id/status - Update pre-auth status
exports.updatePreAuthStatus = async (req, res, next) => {
  try {
    const { status, approvedAmount, authorizationNumber, validityDate, notes } = req.body;
    
    const preAuth = await PreAuthRequest.findById(req.params.id);
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    
    preAuth.status = status;
    if (approvedAmount) preAuth.approvedAmount = approvedAmount;
    if (authorizationNumber) preAuth.authorizationNumber = authorizationNumber;
    if (validityDate) preAuth.validityDate = validityDate;
    
    // Add to history
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

// 5. POST /pre-auth/:id/query-response - Respond to query
exports.respondToQuery = async (req, res, next) => {
  try {
    const { queryText, responseText } = req.body;
    const preAuth = await PreAuthRequest.findById(req.params.id);
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    
    preAuth.queryDetails.push({
      queryText,
      queryDate: new Date(),
      responseText,
      responseDate: new Date()
    });
    
    preAuth.status = 'Under Review'; // Reset status after responding to query
    preAuth.statusHistory.push({
      status: 'Under Review',
      changedAt: new Date(),
      notes: 'Responded to query'
    });
    
    await preAuth.save();
    res.status(200).json({ success: true, message: 'Query response submitted', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. POST /pre-auth/:id/enhance - Submit enhancement
exports.enhancePreAuth = async (req, res, next) => {
  try {
    const { additionalCost, reason } = req.body;
    const preAuth = await PreAuthRequest.findById(req.params.id);
    if (!preAuth) return res.status(404).json({ success: false, message: 'Pre-auth not found' });
    
    preAuth.estimatedCost += Number(additionalCost);
    preAuth.status = 'Enhancement Requested';
    
    preAuth.statusHistory.push({
      status: 'Enhancement Requested',
      changedAt: new Date(),
      notes: `Requested additional ${additionalCost} for: ${reason}`
    });
    
    await preAuth.save();
    res.status(200).json({ success: true, message: 'Enhancement requested', data: preAuth });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
