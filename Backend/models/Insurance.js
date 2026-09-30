const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        insuranceCompany: {
            type: String,
            required: true
        },

        insuranceData: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        pdfPath: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);