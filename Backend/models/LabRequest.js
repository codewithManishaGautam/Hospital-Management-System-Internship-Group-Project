const mongoose = require("mongoose");

const LabRequestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  uhid: {
    type: String,
    required: true,
  },

  patientName: {
    type: String,
    required: true,
  },

  doctorName: {
    type: String,
    required: true,
  },

  ward: {
    type: String,

    enum: ["OPD", "IPD", "ICU", "OT", "General Ward", "Emergency", "Casualty"],

    required: true,
  },

  department: {
    type: String,
    enum: ["Lab", "Diagnostic"],
    required: true,
  },

  testCategory: {
    type: String,
    required: true,
  },

  testName: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    enum: ["Normal", "Urgent", "Emergency", "STAT"],
    default: "Normal",
  },

  tests: [
    {
      type: String,
    },
  ],

  clinicalNotes: {
    type: String,
    default: "",
  },

  status: {
    type: String,

    enum: ["Pending", "Processing", "Completed"],

    default: "Pending",
  },

  reportPdfs: [
    {
      fileName: {
        type: String,
        required: true,
      },
      testName: {
        type: String,
        default: "",
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  billing: {
    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      default: "",
    },

    billNumber: {
      type: String,
      default: "",
    },

    paymentId: {
      type: String,
      default: "",
    },

    orderId: {
      type: String,
      default: "",
    },

    billedAt: {
      type: Date,
      default: null,
    },
  },

  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LabRequest", LabRequestSchema);
