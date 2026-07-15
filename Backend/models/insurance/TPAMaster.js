const mongoose = require('mongoose');

const TPAMasterSchema = new mongoose.Schema({
  tpaName: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  irdaiTpaCode: { type: String, required: true, unique: true },
  headquarters: { type: String },
  preAuthEmail: { type: String, required: true },
  claimsEmail: { type: String, required: true },
  portalUrl: { type: String },
  helpline: { type: String },
  empanelmentNo: { type: String },
  standardTatHours: { type: Number },
  claimTatDays: { type: Number },
  isActive: { type: Boolean, default: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TPAMaster', TPAMasterSchema);
