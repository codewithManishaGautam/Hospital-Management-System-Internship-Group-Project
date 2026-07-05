const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    uhid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    aadhar: { 
        type: String 
    }, 
    adhaar: { 
        type: String, 
        sparse: true 
    },
    disease: {
        type: String
    },
    doctor: {
        type: String
    },
    appointmentType: {
        type: String
    },
    role: {
        type: String,
        enum: [
            "OPD",
            "IPD",
            "ICU",
            "OT",
            "General Ward",
            "Casualty",
            "Emergency"
        ],
        default: "OPD"
    },
    type: { 
        type: String 
    }, // OPD / IPD (from HEAD)
    admissionDate: {
        type: String
    },
    dischargeDate: {
        type: String
    },
    roomNo: {
        type: String
    },
    bedNo: {
        type: String
    },
    status: {
        type: String,
        default: "Waiting"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);
