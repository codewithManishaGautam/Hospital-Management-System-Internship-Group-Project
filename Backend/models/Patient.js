const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    uhid: {
      type: String,
      unique: true,
    },

    name: String,

    age: Number,

    gender: String,

    mobile: String,

    address: String,

    // Medical
    disease: String,

    doctor: String,

    diagnosis: {
      type: String,
      default: "",
    },

    prescription: {
      type: String,
      default: "",
    },

    advice: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    prescriptionHistory: [
      {
        diagnosis: {
          type: String,
          default: "",
        },

        prescription: {
          type: String,
          default: "",
        },

        advice: {
          type: String,
          default: "",
        },

        notes: {
          type: String,
          default: "",
        },

        signature: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Lab
    labReport: {
      type: String,
      default: "",
    },

    // Pharmacy
    medicinesIssued: [
      {
        name: String,
        quantity: Number,
      },
    ],

    // Nurse
    nurseNotes: {
      type: String,
      default: "",
    },

    vitals: {
      type: String,
      default: "",
    },

    dischargeDate: {
      type: String,
      default: "",
    },

    // Insurance
    insuranceStatus: {
      type: String,
      default: "",
    },

    claimNumber: {
      type: String,
      default: "",
    },

    // Appointment
    appointmentDate: String,

    appointmentTime: String,

    // OPD / IPD
    role: {
      type: String,
      enum: [
        "OPD",
        "IPD",
        "ICU",
        "OT",
        "General Ward",
        "Casualty",
        "Emergency",
      ],
      default: "OPD",
    },

    // Billing
    fee: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    paymentMode: {
      type: String,
      default: "Cash",
    },

    // Admission
    ipdNo: String,

    admissionDate: String,

    roomNo: String,

    bedNo: String,

    roomType: String,

    // Patient Status
    status: {
      type: String,
      default: "Waiting",
    },

    currentDepartment: {
      type: String,
      default: "Reception",
    },

    flowStatus: {
      type: String,
      default: "Registered",
    },

    appointmentHistory: [
      {
        appointmentDate: String,
        appointmentTime: String,

        doctor: String,
        disease: String,

        fee: {
          type: Number,
          default: 500,
        },

        paymentStatus: {
          type: String,
          default: "Pending",
        },

        paymentMode: {
          type: String,
          default: "Cash",
        },

        status: {
          type: String,
          default: "Waiting Doctor",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Patient", patientSchema);
