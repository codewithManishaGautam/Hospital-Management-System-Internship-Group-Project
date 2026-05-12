const mongoose = require('mongoose');

const InsuranceBillingMappingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' },
  claimId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceClaim' },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsurancePolicy' },
  totalBillAmount: { type: Number, required: true },
  approvedAmount: { type: Number },
  coPayAmount: { type: Number, default: 0 },
  deductibleAmount: { type: Number, default: 0 },
  nonCoveredItems: [{
    itemName: String,
    amount: Number
  }],
  insuranceDeduction: { type: Number, required: true },
  patientPayable: { type: Number, required: true },
  isManualOverride: { type: Boolean, default: false },
  overrideReason: { type: String },
  overrideBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceBillingMapping', InsuranceBillingMappingSchema);
