const mongoose = require('mongoose');

const OfficialFormsRegistrySchema = new mongoose.Schema({
  // Identity & Naming
  formName: { type: String, required: true },
  formCode: { type: String }, // Short internal code e.g. "HDFC-PA-01"
  description: { type: String },

  // Mapping to Insurance Provider
  insuranceCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany' },
  tpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },
  insurerOrTpaName: { type: String, required: true }, // Fallback display name

  // Classification
  formCategory: {
    type: String,
    enum: [
      'Pre-Auth', 'Claim', 'Reimbursement', 'Discharge', 'Declaration',
      'Consent', 'Certificate', 'Enhancement', 'Query Response',
      'Admission', 'Cost Estimate', 'Death Claim', 'Accident Claim',
      'Medicolegal', 'Other'
    ],
    required: true
  },
  claimType: {
    type: String,
    enum: ['Cashless', 'Reimbursement', 'Both'],
    default: 'Both'
  },
  department: { type: String }, // Optional: Lab, Radiology, etc.
  applicableTreatmentType: { type: String }, // Optional: Surgical, Day Care, etc.

  // Version Control
  versionNumber: { type: String, default: '1.0' },
  effectiveDate: { type: Date, default: Date.now },
  expiryDate: { type: Date }, // null = no expiry
  isMandatory: { type: Boolean, default: false },

  // File Storage
  fileFormat: {
    type: String,
    enum: ['PDF', 'DOCX', 'Excel', 'Fillable PDF', 'Digital Template'],
    default: 'Digital Template'
  },
  filePath: { type: String }, // Path to uploaded physical file (PDF/DOCX)
  downloadUrl: { type: String }, // External URL if applicable

  // Digital Template Mapping
  templateId: { type: String }, // Maps to frontend FORM_TEMPLATES key (e.g., "STAR_HEALTH")

  // Audit
  isDeprecated: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastVerifiedDate: { type: Date },
  lastVerifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String }
}, { timestamps: true });

// Compound index for efficient lookups by company
OfficialFormsRegistrySchema.index({ insuranceCompanyId: 1, isActive: 1 });
OfficialFormsRegistrySchema.index({ tpaId: 1, isActive: 1 });
OfficialFormsRegistrySchema.index({ insurerOrTpaName: 1, formCategory: 1 });

module.exports = mongoose.model('OfficialFormsRegistry', OfficialFormsRegistrySchema);
