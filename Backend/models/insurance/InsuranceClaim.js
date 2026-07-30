const mongoose = require('mongoose');

const InsuranceClaimSchema = new mongoose.Schema({
  claimNumber: { type: String, unique: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientInsurancePolicy' },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme' },
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },
  admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' }, // Added admission linkage
  
  claimType: { type: String, enum: ['Cashless', 'Reimbursement', 'TPA Claim', 'Corporate'], required: true },
  admissionDate: { type: Date, required: true },
  dischargeDate: { type: Date },
  diagnosis: { type: String, required: true },
  icd10Code: { type: String },
  proceduresPerformed: { type: String },
  treatingDoctor: { type: String },
  
  // Financial Tracking per Claim (per PRD)
  estimatedAmount: { type: Number, default: 0 },
  totalBillAmount: { type: Number, default: 0 }, // Billed Amount
  nonPayableAmount: { type: Number, default: 0 },
  payableAmount: { type: Number, default: 0 },
  coPayAmount: { type: Number, default: 0 },
  deductibleAmount: { type: Number, default: 0 },
  
  approvedAmount: { type: Number, default: 0 },
  enhancedAmount: { type: Number, default: 0 },
  totalApproved: { type: Number, default: 0 }, // Approved + Enhanced
  
  settledAmount: { type: Number, default: 0 },
  shortfallAmount: { type: Number, default: 0 }, // Total Approved - Settled
  writtenOffAmount: { type: Number, default: 0 },
  patientPayable: { type: Number, default: 0 },
  
  status: {
    type: String,
    enum: [
      'INITIATED', 'DRAFT', 'DOCS_PENDING', 'DOCS_COMPLETE', 'INTERNAL_REVIEW', 
      'SUBMITTED', 'ACKNOWLEDGED', 'QUERY_RAISED', 'RESPONDED', 'UNDER_REVIEW', 
      'APPROVED', 'PARTIALLY_APPROVED', 'REJECTED', 'CLAIM_CREATED', 
      'INTERIM_SUBMITTED', 'FINAL_SUBMITTED', 'DEFICIENCY_RAISED', 'DEFICIENCY_RESPONDED', 
      'SETTLED', 'PARTIALLY_SETTLED', 'SHORTFALL_PENDING', 'APPEAL_FILED', 
      'APPEAL_SETTLED', 'APPEAL_REJECTED', 'WRITTEN_OFF', 'CLOSED', 'CANCELLED'
    ],
    default: 'DRAFT'
  },
  
  settlementDetails: {
    utrNumber: String,
    settlementDate: Date,
    bankReference: String,
    partialReason: String
  },
  rejectionReason: { type: String },
  
  // Audit trailing
  statusHistory: [{
    status: String,
    changedAt: Date,
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
  }],
  
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }],
  documentChecklist: {
    admissionForm: { type: Boolean, default: false },
    dischargeSummary: { type: Boolean, default: false },
    investigationReports: { type: Boolean, default: false },
    prescription: { type: Boolean, default: false },
    doctorNotes: { type: Boolean, default: false },
    billInvoice: { type: Boolean, default: false },
    consentForm: { type: Boolean, default: false },
    insuranceCardCopy: { type: Boolean, default: false },
    idProof: { type: Boolean, default: false }
  },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  providerTemplateUsed: { type: String },
  providerSpecificData: { type: Map, of: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// Auto-calculate derived fields on save
InsuranceClaimSchema.pre('save', function(next) {
  this.totalApproved = (this.approvedAmount || 0) + (this.enhancedAmount || 0);
  this.payableAmount = (this.totalBillAmount || 0) - (this.nonPayableAmount || 0);
  this.shortfallAmount = (this.totalApproved || 0) - (this.settledAmount || 0);
  next();
});

module.exports = mongoose.model('InsuranceClaim', InsuranceClaimSchema);
