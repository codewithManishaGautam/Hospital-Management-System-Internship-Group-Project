const InsurancePolicy = require('../../models/insurance/InsurancePolicy');

// 1. POST /policies - Register new policy
exports.registerPolicy = async (req, res, next) => {
  try {
    const policy = new InsurancePolicy(req.body);
    await policy.save();
    res.status(201).json({
      success: true,
      message: 'Policy registered successfully',
      data: policy
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Policy number already exists' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /policies/:patientId - Get policies for patient
exports.getPatientPolicies = async (req, res, next) => {
  try {
    const policies = await InsurancePolicy.find({ patientId: req.params.patientId })
      .populate('tpaId', 'name helpdeskPhone')
      .populate('insurerCompanyId', 'name type');
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. GET /policies/detail/:policyId - Get single policy details
exports.getPolicyDetail = async (req, res, next) => {
  try {
    const policy = await InsurancePolicy.findById(req.params.policyId)
      .populate('tpaId')
      .populate('insurerCompanyId');
    if (!policy) {
      return res.status(404).json({ success: false, message: 'Policy not found' });
    }
    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. PUT /policies/:policyId - Update policy details
exports.updatePolicy = async (req, res, next) => {
  try {
    const policy = await InsurancePolicy.findByIdAndUpdate(req.params.policyId, req.body, { new: true, runValidators: true });
    if (!policy) {
      return res.status(404).json({ success: false, message: 'Policy not found' });
    }
    res.status(200).json({ success: true, message: 'Policy updated successfully', data: policy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. PATCH /policies/:policyId/verify - Update verification status
exports.updatePolicyVerificationStatus = async (req, res, next) => {
  try {
    const { verificationStatus } = req.body;
    // In a real app, verifiedBy would come from req.user._id (from JWT auth middleware)
    const policy = await InsurancePolicy.findByIdAndUpdate(
      req.params.policyId, 
      { verificationStatus, verifiedAt: new Date() }, 
      { new: true }
    );
    if (!policy) {
      return res.status(404).json({ success: false, message: 'Policy not found' });
    }
    res.status(200).json({ success: true, message: 'Verification status updated', data: policy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. DELETE /policies/:policyId - Soft-delete policy
exports.deletePolicy = async (req, res, next) => {
  try {
    const policy = await InsurancePolicy.findByIdAndUpdate(req.params.policyId, { isActive: false }, { new: true });
    if (!policy) {
      return res.status(404).json({ success: false, message: 'Policy not found' });
    }
    res.status(200).json({ success: true, message: 'Policy soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
