const mongoose = require('mongoose');

const ClaimDocumentSchema = new mongoose.Schema({
  claimId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceClaim' },
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },
  category: {
    type: String,
    enum: ['Admission Form', 'Discharge Summary', 'Investigation Reports', 'Prescription', 'Doctor Notes', 'Pre-Auth Form', 'Bill/Invoice', 'Consent Form', 'Insurance Card Copy', 'ID Proof', 'Other'],
    required: true
  },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number },
  mimeType: { type: String, enum: ['application/pdf', 'image/jpeg', 'image/png'] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('ClaimDocument', ClaimDocumentSchema);
