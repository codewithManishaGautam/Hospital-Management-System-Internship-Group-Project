const mongoose = require('mongoose');

const PreAuthRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsurancePolicy' },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentScheme' },
  admittingDoctor: { type: String, required: true },
  expectedAdmissionDate: { type: Date },
  expectedDischargeDate: { type: Date },
  diagnosis: { type: String, required: true },
  icd10Code: { type: String },
  proposedTreatment: { type: String, required: true },
  estimatedCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Query Raised', 'Approved', 'Enhancement Requested', 'Rejected', 'Expired'],
    default: 'Draft'
  },
  approvedAmount: { type: Number },
  authorizationNumber: { type: String },
  validityDate: { type: Date },
  queryDetails: [{
    queryText: String,
    queryDate: Date,
    responseText: String,
    responseDate: Date,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  statusHistory: [{
    status: String,
    changedAt: Date,
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
  }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }],
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  providerTemplateUsed: { type: String }, // e.g., "IRDAI_STANDARD", "PM_JAY"
  providerSpecificData: { type: Map, of: mongoose.Schema.Types.Mixed } // Flexible schema for dynamic form fields
}, { timestamps: true });

module.exports = mongoose.model('PreAuthRequest', PreAuthRequestSchema);
