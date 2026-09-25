const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    patientName: {
      type: String,
    },

    email: {
      type: String,
      default: "",
    },

    uhid: {
      type: String,
      default: "",
    },

    billType: {
      type: String,
      default: "",
    },

    roomNo: {
      type: String,
      default: "",
    },

    roomType: {
      type: String,
      default: "",
    },

    admissionDate: {
      type: Date,
      default: null,
    },

    dischargeDate: {
      type: Date,
      default: null,
    },

    stayDays: {
      type: Number,
      default: 0,
    },

    roomCharge: { type: Number, default: 0 },

    bedCharge: { type: Number, default: 0 },

    doctorConsultancyFee: { type: Number, default: 0 },

    otherCharges: { type: Number, default: 0 },

    totalAmount: { type: Number, default: 0 },

    paymentMode: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    pdfPath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bill", billSchema);