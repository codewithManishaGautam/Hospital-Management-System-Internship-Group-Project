const mongoose = require('mongoose');

// Auto-generate case number
const generateCaseNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `IC-${year}-${random}`;
};

const InsuranceCaseSchema = new mongoose.Schema({
  // Identity
  caseNumber: { type: String, unique: true, default: generateCaseNumber },

  // Core References
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientInsurancePolicy' },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme' },
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },
  claimId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceClaim' },
  insuranceCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany' },
  tpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },

  // Workflow Status
  status: {
    type: String,
    enum: [
      'OPEN',
      'VERIFICATION_PENDING',
      'VERIFICATION_COMPLETE',
      'FORMS_PENDING',
      'FORMS_COMPLETE',
      'PREAUTH_SUBMITTED',
      'PREAUTH_APPROVED',
      'TREATMENT_IN_PROGRESS',
      'DISCHARGE_PENDING',
      'CLAIM_SUBMITTED',
      'CLAIM_UNDER_REVIEW',
      'CLAIM_APPROVED',
      'CLAIM_SETTLED',
      'CLOSED',
      'CANCELLED'
    ],
    default: 'OPEN'
  },

  // Insurance Verification Result (BRD §3 Step 2)
  verificationResult: {
    policyValid: { type: Boolean },
    policyStatus: { type: String },
    sumInsured: { type: Number },
    remainingBalance: { type: Number },
    cashlessEligible: { type: Boolean },
    networkHospital: { type: Boolean },
    roomEligibility: { type: String },
    coPay: { type: Number, default: 0 },
    deductible: { type: Number, default: 0 },
    exclusions: [{ type: String }],
    waitingPeriodCleared: { type: Boolean },
    diseaseCoverage: { type: Boolean },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    notes: { type: String }
  },

  // Required Forms (BRD §3 Steps 3-5)
  requiredForms: [{
    formRegistryId: { type: mongoose.Schema.Types.ObjectId, ref: 'OfficialFormsRegistry' },
    formName: { type: String },
    formCategory: { type: String },
    isMandatory: { type: Boolean, default: false },
    templateId: { type: String }, // Maps to frontend FORM_TEMPLATES key
    status: {
      type: String,
      enum: ['Pending', 'Filled', 'Generated', 'Submitted'],
      default: 'Pending'
    },
    filledData: { type: Map, of: mongoose.Schema.Types.Mixed }, // Stores filled form data
    generatedPdfPath: { type: String },
    generatedAt: { type: Date },
    submittedAt: { type: Date }
  }],

  // Documents from all departments (BRD §5)
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }],

  // Communication Log (BRD §4)
  communicationLog: [{
    type: { type: String, enum: ['Email', 'Phone', 'Portal', 'Letter', 'Internal Note'] },
    direction: { type: String, enum: ['Incoming', 'Outgoing'] },
    from: { type: String },
    to: { type: String },
    subject: { type: String },
    body: { type: String },
    attachments: [{ type: String }], // File paths
    timestamp: { type: Date, default: Date.now },
    loggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],

  // Query Log (Insurance Company/TPA queries)
  queryLog: [{
    queryText: { type: String, required: true },
    raisedAt: { type: Date, default: Date.now },
    raisedBy: { type: String }, // TPA name or user ref
    responseText: { type: String },
    respondedAt: { type: Date },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['Open', 'Responded', 'Closed'],
      default: 'Open'
    }
  }],

  // Enhancement Requests
  enhancementRequests: [{
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['Submitted', 'Approved', 'Partially Approved', 'Rejected'],
      default: 'Submitted'
    },
    approvedAmount: { type: Number },
    respondedAt: { type: Date },
    notes: { type: String }
  }],

  // Financial Summary
  financials: {
    estimatedCost: { type: Number, default: 0 },
    totalBilled: { type: Number, default: 0 },
    approvedAmount: { type: Number, default: 0 },
    settledAmount: { type: Number, default: 0 },
    patientPayable: { type: Number, default: 0 },
    shortfall: { type: Number, default: 0 }
  },

  // Final Claim Package
  claimPackagePath: { type: String }, // Path to merged final PDF
  claimPackageGeneratedAt: { type: Date },

  // Audit Trail (BRD §4)
  auditTrail: [{
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    performedByName: { type: String },
    timestamp: { type: Date, default: Date.now },
    details: { type: String },
    ipAddress: { type: String }
  }],

  // Status History
  statusHistory: [{
    status: { type: String },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String }
  }],

  // Metadata
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Insurance executive
  expectedDischargeDate: { type: Date },
  actualDischargeDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

// Indexes for dashboard queries
InsuranceCaseSchema.index({ status: 1, createdAt: -1 });
InsuranceCaseSchema.index({ patientId: 1 });
InsuranceCaseSchema.index({ insuranceCompanyId: 1, status: 1 });
InsuranceCaseSchema.index({ caseNumber: 1 });

module.exports = mongoose.model('InsuranceCase', InsuranceCaseSchema);
