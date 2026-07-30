const mongoose = require('mongoose');

const handoverSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Handover', handoverSchema);