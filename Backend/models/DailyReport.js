const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    bp: { type: String, default: "" },
    pulse: { type: String, default: "" },
    temp: { type: String, default: "" },
    spo2: { type: String, default: "" },
    sugar: { type: String, default: "" },
    intake: { type: String, default: "" },
    output: { type: String, default: "" },
    notes: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('DailyReport', dailyReportSchema);;p