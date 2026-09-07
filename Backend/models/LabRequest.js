const mongoose = require("mongoose");

const LabRequestSchema = new mongoose.Schema(
{
    patientId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    doctorId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    uhid:
    {
        type: String,
        required: true
    },

    patientName:
    {
        type: String,
        required: true
    },

    doctorName:
    {
        type: String,
        required: true
    },

    ward:
    {
        type: String,

        enum:
        [
            "OPD",
            "IPD",
            "ICU",
            "OT",
            "General Ward",
            "Emergency",
            "Casualty"
        ],

        required: true
    },

    priority:
    {
        type: String,

        enum:
        [
            "Normal",
            "Urgent",
            "STAT"
        ],

        default: "Normal"
    },

    tests:
    [
        {
            type: String
        }
    ],

    clinicalNotes:
    {
        type: String,
        default: ""
    },

    status:
    {
        type: String,

        enum:
        [
            "Pending",
            "Processing",
            "Completed"
        ],

        default: "Pending"
    },

    reportPdf:
    {
        type: String,
        default: ""
    },

    requestedAt:
    {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "LabRequest",
    LabRequestSchema
);