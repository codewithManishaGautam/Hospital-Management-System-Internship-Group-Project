const mongoose = require('mongoose');

const activityChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    days: [{ type: String }],
    gridData: {
        type: Map,
        of: [Boolean]
    }
}, { timestamps: true });

module.exports = mongoose.model('ActivityChart', activityChartSchema);