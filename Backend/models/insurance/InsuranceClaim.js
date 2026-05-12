const mongoose = require('mongoose');

const InsuranceClaimSchema = new mongoose.Schema({
  claimNumber: { type: String, unique: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsurancePolicy' },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme' },
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },
  claimType: { type: String, enum: ['Cashless', 'Reimbursement'], required: true },
  admissionDate: { type: Date, required: true },
  dischargeDate: { type: Date },
  diagnosis: { type: String, required: true },
  icd10Code: { type: String },
  proceduresPerformed: { type: String },
  treatingDoctor: { type: String },
  totalBillAmount: { type: Number },
  claimedAmount: { type: Number },
  approvedAmount: { type: Number },
  settledAmount: { type: Number },
  coPayAmount: { type: Number },
  deductibleAmount: { type: Number },
  nonCoveredAmount: { type: Number },
  patientPayable: { type: Number },
  status: {
    type: String,
    enum: ['Draft', 'Documents Pending', 'Ready for Submission', 'Submitted', 'Under Process', 'Query', 'Approved', 'Settled', 'Partially Settled', 'Rejected', 'Appeal Filed'],
    default: 'Draft'
  },
  settlementDetails: {
    utrNumber: String,
    settlementDate: Date,
    bankReference: String,
    partialReason: String
  },
  rejectionReason: { type: String },
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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceClaim', InsuranceClaimSchema);
