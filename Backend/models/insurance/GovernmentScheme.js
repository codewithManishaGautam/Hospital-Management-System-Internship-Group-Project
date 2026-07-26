const mongoose = require('mongoose');

const GovernmentSchemeSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  schemeName: {
    type: String,
    enum: ['PM-JAY', 'CGHS', 'ESIC', 'MJPJAY', 'Other'],
    required: true
  },
  schemeSpecificData: {
    abhaNumber: { type: String },
    ayushmanCardNumber: { type: String },
    familyId: { type: String },
    hbpCode: { type: String },
    cghsBeneficiaryId: { type: String },
    cghsCardType: { type: String, enum: ['Serving', 'Pensioner', 'Dependent'] },
    referralReference: { type: String },
    esicIpNumber: { type: String },
    employerName: { type: String },
    dispensaryName: { type: String },
    rationCardNumber: { type: String },
    rationCardCategory: { type: String, enum: ['Yellow', 'Orange', "AAY", 'Annapurna'] },
    sevenTwelveExtract: { type: String },
    arogyamitraVerified: { type: Boolean, default: false }
  },
  verificationStatus: {
    type: String,
    enum: ['Not Verified', 'Verified — Active', 'Verified — Expired', 'Verification Failed'],
    default: 'Not Verified'
  },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  primaryScheme: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GovernmentScheme', GovernmentSchemeSchema);
