const mongoose = require('mongoose');

const ClaimDocumentSchema = new mongoose.Schema({
  // Core Links
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  claimId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceClaim' },
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },
  insuranceCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCase' },

  // Department Origin
  department: {
    type: String,
    enum: ['Lab', 'Radiology', 'Pharmacy', 'OT', 'ICU', 'Blood Bank', 'Nursing', 'Doctor', 'Ward', 'Insurance', 'Admin', 'Patient'],
    default: 'Insurance'
  },

  documentName: { type: String, required: true },
  documentUrl: { type: String, required: true }, // File path
  
  category: { 
    type: String, 
    enum: [
      'ID Proof', 
      'Insurance Card', 
      'Pre-Auth Form', 
      'Claim Form', 
      'Medical Record', 
      'Lab Report', 
      'Radiology Report',
      'Pharmacy Bill',
      'Discharge Summary',
      'Final Bill',
      'Payment Receipt',
      'Other'
    ],
    required: true 
  },
  
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  notes: { type: String },

  // Version Control
  documentVersion: { type: Number, default: 1 },
  previousVersionId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' },
  isLatest: { type: Boolean, default: true },

  // Tracking
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
  
  accessLog: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    action: { type: String, enum: ['Viewed', 'Downloaded'] },
    timestamp: { type: Date, default: Date.now }
  }],

  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

ClaimDocumentSchema.index({ insuranceCaseId: 1, isDeleted: 1 });
ClaimDocumentSchema.index({ department: 1 });
ClaimDocumentSchema.index({ claimId: 1 });
ClaimDocumentSchema.index({ preAuthId: 1 });

module.exports = mongoose.model('ClaimDocument', ClaimDocumentSchema);
