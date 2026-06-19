const InsuranceClaim = require('../../models/insurance/InsuranceClaim');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const InsurancePolicy = require('../../models/insurance/InsurancePolicy');
const InsuranceBillingMapping = require('../../models/insurance/InsuranceBillingMapping');

// GET /billing-summary/:patientId
exports.getBillingSummary = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    
    // Find active policies
    const activePolicies = await InsurancePolicy.find({ patientId, isActive: true, verificationStatus: 'Verified — Active' });
    
    // Find approved pre-auths
    const approvedPreAuths = await PreAuthRequest.find({ patientId, status: { $in: ['Approved', 'Partially Approved'] } });
    
    // Calculate total approved pre-auth amount
    const totalApprovedPreAuthAmount = approvedPreAuths.reduce((sum, preAuth) => sum + (preAuth.approvedAmount || 0), 0);
    
    // Build the billing summary response
    const summary = {
      patientId,
      hasActiveInsurance: activePolicies.length > 0,
      activePolicies: activePolicies.map(p => ({
        policyId: p._id,
        policyNumber: p.policyNumber,
        insuranceType: p.insuranceType,
        providerName: p.providerName
      })),
      totalApprovedPreAuthAmount,
      approvedPreAuths: approvedPreAuths.map(pa => ({
        preAuthId: pa._id,
        authorizationNumber: pa.authorizationNumber,
        approvedAmount: pa.approvedAmount,
        status: pa.status
      }))
    };
    
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /billing/mapping - Create billing mapping after claim approval
exports.createBillingMapping = async (req, res, next) => {
  try {
    const mapping = new InsuranceBillingMapping({
      patientId: req.body.patientId,
      billId: req.body.billId || null,
      claimId: req.body.claimId || null,
      policyId: req.body.policyId || null,
      totalBillAmount: req.body.totalBillAmount,
      approvedAmount: req.body.approvedAmount || 0,
      coPayAmount: req.body.coPayAmount || 0,
      deductibleAmount: req.body.deductibleAmount || 0,
      nonCoveredItems: req.body.nonCoveredItems || [],
      insuranceDeduction: req.body.insuranceDeduction,
      patientPayable: req.body.patientPayable,
      isManualOverride: req.body.isManualOverride || false,
      overrideReason: req.body.overrideReason || null,
      overrideBy: req.body.overrideBy || null
    });

    await mapping.save();
    res.status(201).json({ success: true, message: 'Billing mapping created successfully', data: mapping });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
