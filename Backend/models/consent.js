const mongoose = require("mongoose");

const consentSchema = new mongoose.Schema(

    {

        patientId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Patient",

            required: true

        },

        patientName: {

            type: String,

            required: true

        },

        uhid: {

            type: String,

            required: true

        },

        consentType: {

            type: String,

            required: true

        },

        consentData: {

            type: Object,

            default: {}

        },

        pdfPath: {

            type: String,

            default: ""

        },

        createdAt: {

            type: Date,

            default: Date.now

        }

    }

);

module.exports = mongoose.model(

    "Consent",

    consentSchema

);