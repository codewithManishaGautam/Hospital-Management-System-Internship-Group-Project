const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        prescriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SentPrescription",
            default: null
        },

        prescriptionHistoryId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
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

        testName: {
            type: String,
            required: true
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
                "Uploaded"
            ],
            default: "Uploaded"
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
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "LabReport",
    labReportSchema
);