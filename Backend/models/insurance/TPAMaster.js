const mongoose = require('mongoose');

const TPAMasterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  irdaiLicenseNumber: { type: String },
  portalUrl: { type: String },
  helpdeskPhone: { type: String },
  helpdeskEmail: { type: String },
  preAuthTAT: { type: String },
  claimTAT: { type: String },
  linkedInsurers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TPAMaster', TPAMasterSchema);
