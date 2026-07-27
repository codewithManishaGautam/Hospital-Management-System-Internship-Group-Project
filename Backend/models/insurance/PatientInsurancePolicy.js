const mongoose = require('mongoose');

const PatientInsurancePolicySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  insuranceCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
  tpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsurancePlan' },
  policyNumber: { type: String, required: true },
  groupNumber: { type: String },
  memberId: { type: String },
  policyholderName: { type: String, required: true },
  relationshipToPatient: { type: String, required: true },
  policyType: { type: String, required: true },
  policyStartDate: { type: Date, required: true },
  policyEndDate: { type: Date, required: true },
  sumInsured: { type: Number, required: true },
  utilizedAmount: { type: Number, default: 0 },
  availableBalance: { type: Number },
  copayPercentage: { type: Number, default: 0 },
  roomTypeEntitlement: { type: String },
  isPrimaryPolicy: { type: Boolean, default: true },
  eligibilityVerified: { type: Boolean, default: false },
  eligibilityVerifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eligibilityVerifiedAt: { type: Date },
  tpaReferenceNumber: { type: String },
  isActive: { type: Boolean, default: true },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

PatientInsurancePolicySchema.pre('save', function(next) {
  if (this.sumInsured !== undefined && this.utilizedAmount !== undefined) {
    this.availableBalance = this.sumInsured - this.utilizedAmount;
  }
  next();
});

module.exports = mongoose.model('PatientInsurancePolicy', PatientInsurancePolicySchema);
