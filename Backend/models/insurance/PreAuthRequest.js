const mongoose = require('mongoose');

const PreAuthRequestSchema = new mongoose.Schema({
  // Section A: Patient Information
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientInsurancePolicy' },
  
  // Section B & C: Clinical Information
  admittingDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Or String if no Doctor model exists
  admissionDate: { type: Date },
  admissionType: { type: String, enum: ['Planned', 'Emergency', 'Day Care'] },
  presentingComplaints: { type: String },
  durationOfIllness: { type: String },
  pastMedicalHistory: { type: String },
  diagnosis: { type: String, required: true },
  icd10Code: { type: String, required: true }, // Enforced per PRD
  proposedTreatment: { type: String },
  icd10PcsCode: { type: String },
  expectedLengthOfStay: { type: Number }, // in days
  wardTypeRequested: { type: String, enum: ['General', 'Semi-Private', 'Private', 'ICU'] },

  // Section D: Estimated Cost Breakdown
  estimatedCost: {
    roomCharges: { type: Number, default: 0 },
    icuCharges: { type: Number, default: 0 },
    surgeonFee: { type: Number, default: 0 },
    anesthetistFee: { type: Number, default: 0 },
    investigationsLab: { type: Number, default: 0 },
    investigationsRadiology: { type: Number, default: 0 },
    medicine: { type: Number, default: 0 },
    bloodProducts: { type: Number, default: 0 },
    implants: { type: Number, default: 0 },
    otherCharges: { type: Number, default: 0 },
    total: { type: Number, default: 0, required: true }
  },

  // State Machine Enums (Matching 08_Cashless_Workflow.md & 10_PreAuthorization_Workflow.md)
  status: {
    type: String,
    enum: [
      'DRAFT', 
      'SUBMITTED', 
      'QUERY_RAISED', 
      'RESPONDED', 
      'APPROVED', 
      'PARTIALLY_APPROVED', 
      'REJECTED', 
      'ENHANCEMENT_SUBMITTED',
      'CLAIM_INITIATED' // Transition to Claims Workflow
    ],
    default: 'DRAFT'
  },
  
  // TPA Response Data
  approvedAmount: { type: Number, default: 0 },
  authorizationNumber: { type: String },
  rejectionReason: { type: String },
  
  // Enhancements
  enhancementRequests: [{
    additionalAmount: Number,
    reason: String,
    submittedAt: Date,
    status: { type: String, enum: ['ENHANCEMENT_SUBMITTED', 'ENHANCEMENT_APPROVED', 'ENHANCEMENT_REJECTED'] },
    tpaResponseAmount: Number,
    responseDate: Date
  }],

  // Timestamps and Tracking
  submittedAt: { type: Date },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
  }],
  
  // Documents
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }],
  
  // Custom Dynamic Forms Data
  providerTemplateUsed: { type: String },
  providerSpecificData: { type: Map, of: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// Pre-save hook to calculate total estimated cost
PreAuthRequestSchema.pre('save', function(next) {
  if (this.estimatedCost) {
    this.estimatedCost.total = 
      (this.estimatedCost.roomCharges || 0) +
      (this.estimatedCost.icuCharges || 0) +
      (this.estimatedCost.surgeonFee || 0) +
      (this.estimatedCost.anesthetistFee || 0) +
      (this.estimatedCost.investigationsLab || 0) +
      (this.estimatedCost.investigationsRadiology || 0) +
      (this.estimatedCost.medicine || 0) +
      (this.estimatedCost.bloodProducts || 0) +
      (this.estimatedCost.implants || 0) +
      (this.estimatedCost.otherCharges || 0);
  }
  next();
});

module.exports = mongoose.model('PreAuthRequest', PreAuthRequestSchema);
