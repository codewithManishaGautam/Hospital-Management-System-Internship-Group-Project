const mongoose = require("mongoose");

const consentSchema = new mongoose.Schema({

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

    consentType: {

        type: String,

        required: true

    },

    pdfPath: {

        type: String,

        required: true

    },

    consentData: {

        type: Object,

        default: {}

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    "ConsentReport",

    consentSchema

);