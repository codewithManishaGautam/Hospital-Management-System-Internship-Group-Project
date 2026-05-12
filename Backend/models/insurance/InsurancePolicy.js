const mongoose = require('mongoose');

const InsurancePolicySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  insuranceType: { type: String, enum: ['Private', 'Government'], required: true },
  providerName: { type: String, required: true },
  policyNumber: { type: String, required: true, unique: true },
  planType: { type: String, enum: ['Individual', 'Family Floater', 'Group'], default: 'Individual' },
  sumInsured: { type: Number, required: true },
  subLimits: {
    roomRentCap: { type: Number, default: 0 },
    icuCap: { type: Number, default: 0 },
    procedureCap: { type: Number, default: 0 }
  },
  coPayPercentage: { type: Number, default: 0 },
  deductible: { type: Number, default: 0 },
  tpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },
  insurerCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany' },
  policyStartDate: { type: Date, required: true },
  policyEndDate: { type: Date, required: true },
  isNetworkHospital: { type: Boolean, default: true },
  waitingPeriodNotes: { type: String },
  verificationStatus: {
    type: String,
    enum: ['Not Verified', 'Verified — Active', 'Verified — Expired', 'Verification Failed'],
    default: 'Not Verified'
  },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('InsurancePolicy', InsurancePolicySchema);
