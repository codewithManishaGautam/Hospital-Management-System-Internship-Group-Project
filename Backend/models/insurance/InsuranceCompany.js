const mongoose = require('mongoose');

const InsuranceCompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Private', 'PSU', 'Government'], required: true },
  irdaiRegistrationNumber: { type: String },
  claimPortalUrl: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  networkHospitalStatus: { type: Boolean, default: false },
  defaultTpaId: { type: mongoose.Schema.Types.ObjectId, ref: 'TPAMaster' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceCompany', InsuranceCompanySchema);
