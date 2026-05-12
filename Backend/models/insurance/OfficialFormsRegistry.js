const mongoose = require('mongoose');

const OfficialFormsRegistrySchema = new mongoose.Schema({
  insurerOrTpaName: { type: String, required: true },
  formName: { type: String, required: true },
  formType: { type: String, enum: ['Pre-Auth', 'Claim', 'Reimbursement', 'Discharge', 'Other'] },
  downloadUrl: { type: String, required: true },
  formVersion: { type: String },
  lastVerifiedDate: { type: Date },
  lastVerifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeprecated: { type: Boolean, default: false },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('OfficialFormsRegistry', OfficialFormsRegistrySchema);
