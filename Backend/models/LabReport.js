const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    uhid: {
        type: String,
        required: true
    },

    patientName: {
        type: String,
        required: true
    },

    age: Number,

    gender: String,

    mobile: String,

    // NEW
    department: {
        type: String,
        enum: ["Lab", "Diagnostic"],
        default: "Lab"
    },

    // NEW
    testCategory: {
        type: String,
        default: ""
    },

    testName: {
        type: String,
        required: true
    },

    // NEW
    machineType: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        enum: [
            "Normal",
            "Urgent",
            "Emergency"
        ],
        default: "Normal"
    },

    reportPdf: {
        type: String,
        required: true
    },

    reportStatus: {
        type: String,
        enum: [
            "Pending",
            "Uploaded"
        ],
        default: "Pending"
    },

    billStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid"
        ],
        default: "Pending"
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "LabReport",
    labReportSchema
);