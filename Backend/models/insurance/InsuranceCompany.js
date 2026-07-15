const mongoose = require('mongoose');

const InsuranceCompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  irdaiRegistrationNo: { type: String, required: true, unique: true },
  companyType: { type: String, enum: ['PUBLIC', 'PRIVATE', 'GOVERNMENT'], required: true },
  headquarters: { type: String },
  claimEmail: { type: String, required: true },
  preAuthEmail: { type: String },
  portalUrl: { type: String },
  helplineNumber: { type: String },
  claimDepartmentPhone: { type: String, required: true },
  empanelmentDate: { type: Date },
  empanelmentExpiry: { type: Date },
  isCashless: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceCompany', InsuranceCompanySchema);
