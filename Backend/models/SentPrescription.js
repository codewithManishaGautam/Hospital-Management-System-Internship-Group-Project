const mongoose = require('mongoose');

const SentPrescriptionSchema = new mongoose.Schema({
  target: { type: String, enum: ['lab','pharmacy','nurse'], required: true },
  prescription: { type: mongoose.Schema.Types.Mixed, required: true },
  receivedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('SentPrescription', SentPrescriptionSchema);
