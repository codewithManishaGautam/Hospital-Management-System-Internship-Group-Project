const mongoose = require('mongoose');

const PreAuthCommunicationLogSchema = new mongoose.Schema({
  preAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest', required: true },
  communicationType: { type: String, enum: ['Phone', 'Portal', 'Email', 'Fax'], required: true },
  tpaRepresentativeName: { type: String },
  direction: { type: String, enum: ['Incoming', 'Outgoing'], required: true },
  summary: { type: String, required: true }, // Text of communication
  outcome: { type: String }, // Auth number, Query raised, etc.
  tpaReferenceNumber: { type: String },
  loggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachedDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }
}, { timestamps: true });

module.exports = mongoose.model('PreAuthCommunicationLog', PreAuthCommunicationLogSchema);
