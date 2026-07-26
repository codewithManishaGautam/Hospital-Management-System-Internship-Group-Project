const mongoose = require('mongoose');

const InsurancePlanSchema = new mongoose.Schema({
  insuranceCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
  tpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },
  planName: { type: String, required: true },
  planCode: { type: String, required: true },
  policyTypeCode: { type: String, required: true },
  sumInsured: { type: Number, required: true },
  roomRentLimitPerDay: { type: Number },
  roomTypeAllowed: { type: String },
  icuLimitPerDay: { type: Number },
  copayPercentage: { type: Number, default: 0 },
  copayAppliesTo: { type: String },
  deductibleAmount: { type: Number, default: 0 },
  preHospitalizationDays: { type: Number, default: 30 },
  postHospitalizationDays: { type: Number, default: 60 },
  waitingPeriodInitialDays: { type: Number, default: 30 },
  waitingPeriodPvdYears: { type: Number, default: 1 },
  daycareCovered: { type: Boolean, default: true },
  opdCovered: { type: Boolean, default: false },
  maternityCovered: { type: Boolean, default: false },
  dentalCovered: { type: Boolean, default: false },
  visionCovered: { type: Boolean, default: false },
  mentalHealthCovered: { type: Boolean, default: false },
  ayushCovered: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  effectiveFrom: { type: Date },
  effectiveTo: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('InsurancePlan', InsurancePlanSchema);
