const Admission = require('../../models/insurance/Admission');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const InsuranceBillingMapping = require('../../models/insurance/InsuranceBillingMapping');
const InsuranceClaim = require('../../models/insurance/InsuranceClaim');

// 1. GET /api/insurance/billing/admissions/:admissionId/coverage
exports.getCoverageForAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.admissionId)
      .populate('activePolicyId')
      .populate('activePreAuthId');
      
    if (!admission) return res.status(404).json({ success: false, message: 'Admission not found' });

    let coverageData = { admission_id: admission._id, patient_id: admission.patientId };

    if (admission.activePreAuthId && admission.activePreAuthId.status === 'APPROVED') {
      const preAuth = admission.activePreAuthId;
      coverageData = {
        ...coverageData,
        preauth_id: preAuth._id,
        preauth_status: preAuth.status,
        approved_amount: preAuth.approvedAmount || 0,
        authorization_number: preAuth.authorizationNumber
      };
    } else {
      coverageData.message = "No approved pre-auth found for this admission.";
    }

    res.status(200).json({ success: true, data: coverageData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. POST /api/insurance/billing/admissions/:admissionId/calculate-deduction
exports.calculateDeduction = async (req, res, next) => {
  try {
    const { total_bill_amount, bill_items, co_payment_percentage = 0, deductible_amount = 0 } = req.body;
    
    // In a real system, we'd check exclusions against the policy. 
    // Here we do a simple mock: mark 10% of total as disallowed for simplicity if no specific logic is given.
    let disallowed_amount = total_bill_amount * 0.10; 
    let insurance_eligible = total_bill_amount - disallowed_amount;

    let co_payment_amount = insurance_eligible * (co_payment_percentage / 100);
    
    let insurance_pays = insurance_eligible - co_payment_amount;
    let patient_pays_deductible = 0;

    if (deductible_amount > 0) {
      if (insurance_pays > deductible_amount) {
        insurance_pays -= deductible_amount;
        patient_pays_deductible = deductible_amount;
      } else {
        patient_pays_deductible = insurance_pays;
        insurance_pays = 0;
      }
    }

    let patient_payable_amount = disallowed_amount + co_payment_amount + patient_pays_deductible;

    // Persist to InsuranceBillingMapping as requested
    const mapping = new InsuranceBillingMapping({
      patientId: req.body.patientId || '000000000000000000000000', // Need patient ID from admission ideally
      admissionId: req.params.admissionId,
      totalBillAmount: total_bill_amount,
      insuranceDeduction: insurance_pays,
      patientPayable: patient_payable_amount,
      coPayAmount: co_payment_amount,
      deductibleAmount: patient_pays_deductible,
      nonCoveredItems: [{ itemName: "General Disallowed", amount: disallowed_amount }]
    });
    
    // Resolve patient ID from admission if exists
    const admission = await Admission.findById(req.params.admissionId);
    if(admission) mapping.patientId = admission.patientId;

    await mapping.save();

    res.status(200).json({
      success: true,
      data: {
        total_bill_amount,
        insurance_eligible_amount: insurance_eligible,
        disallowed_amount,
        co_payment_amount,
        deductible_amount: patient_pays_deductible,
        patient_payable_amount,
        insurance_payable: insurance_pays,
        mappingId: mapping._id
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. POST /api/insurance/billing/admissions/:admissionId/bill-finalized
exports.billFinalized = async (req, res, next) => {
  try {
    const { final_bill_amount, finalized_at } = req.body;
    
    const admission = await Admission.findById(req.params.admissionId);
    if (!admission) return res.status(404).json({ success: false, message: 'Admission not found' });
    
    // Auto-create Claim Draft
    const claim = new InsuranceClaim({
      patientId: admission.patientId,
      admissionId: admission._id,
      policyId: admission.activePolicyId,
      preAuthId: admission.activePreAuthId,
      claimType: 'Cashless',
      admissionDate: admission.admissionDate,
      dischargeDate: finalized_at || new Date(),
      diagnosis: admission.diagnosis || 'Pending Diagnosis',
      totalBillAmount: final_bill_amount,
      status: 'DRAFT',
      statusHistory: [{ status: 'DRAFT', changedAt: new Date(), notes: 'Auto-created from bill finalization' }]
    });

    await claim.save();

    res.status(200).json({ success: true, message: 'Bill finalized, Claim draft created', data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. GET /api/insurance/billing/admissions/:admissionId/settlement-status
exports.getSettlementStatus = async (req, res, next) => {
  try {
    const claim = await InsuranceClaim.findOne({ admissionId: req.params.admissionId });
    if (!claim) return res.status(404).json({ success: false, message: 'No claim found for this admission' });

    res.status(200).json({
      success: true,
      data: {
        claim_number: claim.claimNumber || claim._id,
        claim_status: claim.status,
        settled_amount: claim.settledAmount,
        shortfall_amount: claim.shortfallAmount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
