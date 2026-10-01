const mongoose = require("mongoose");

const labBillSchema = new mongoose.Schema(
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

        uhid: {
            type: String,
            required: true
        },

        patientName: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            default: ""
        },

        doctorName: {
            type: String,
            default: ""
        },

        tests: [
            {
                testName: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },

        paymentMode: {
            type: String,
            enum: [
                "Cash",
                "Card",
                "UPI",
                "Razorpay"
            ],
            default: "Cash"
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid"
            ],
            default: "Pending"
        },

        razorpayOrderId: {
            type: String,
            default: ""
        },

        razorpayPaymentId: {
            type: String,
            default: ""
        },

        billStatus: {
            type: String,
            enum: [
                "Generated",
                "Paid"
            ],
            default: "Generated"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "LabBill",
    labBillSchema
);