const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // ======================
    // Basic Patient Details
    // ======================

    uhid: {
      type: String,
      unique: true,
    },

    name: String,

    age: Number,

    gender: String,

    mobile: String,

    email: {
      type: String,
      default: "",
      trim: true,
    },

    address: String,

    // ======================
    // Medical / Doctor
    // ======================

    disease: String,

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },

    doctor: {
      type: String,
      default: "",
    },

    referralDoctor: {
      id: {
        type: String,
        default: "",
      },

      name: {
        type: String,
        default: "",
      },

      specialization: {
        type: String,
        default: "",
      },
    },

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

    // ======================
    // Prescription History
    // ======================

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

        referralDoctor: {
          id: {
            type: String,
            default: "",
          },

          name: {
            type: String,
            default: "",
          },

          specialization: {
            type: String,
            default: "",
          },
        },

        visitDate: {
          type: Date,
          default: Date.now,
        },

        medicines: [
          {
            medicineName: {
              type: String,
              default: "",
            },

            quantity: {
              type: Number,
              default: 0,
            },

            price: {
              type: Number,
              default: 0,
            },

            amount: {
              type: Number,
              default: 0,
            },

            timing: {
              type: String,
              default: "",
            },

            dose: {
              type: String,
              default: "",
            },

            status: {
              type: String,
              enum: ["Pending", "Given"],
              default: "Pending",
            },
          },
        ],

        billId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PharmacyBill",
          default: null,
        },

        paymentStatus: {
          type: String,
          default: "Pending",
        },

        paymentMode: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ======================
    // Lab
    // ======================

    labReport: {
      type: String,
      default: "",
    },

    // ======================
    // Pharmacy
    // ======================

    medicineHistory: [
      {
        billId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PharmacyBill",
          default: null,
        },

        medicines: [
          {
            medicineName: String,
            quantity: Number,
            price: Number,
            amount: Number,
          },
        ],

        totalAmount: {
          type: Number,
          default: 0,
        },

        paymentMode: {
          type: String,
          default: "",
        },

        paymentStatus: {
          type: String,
          default: "Pending",
        },

        issuedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    medicinesIssued: [
      {
        name: String,
        quantity: Number,
      },
    ],

    // ======================
    // Nurse
    // ======================

    nurseNotes: {
      type: String,
      default: "",
    },

    vitals: {
      type: String,
      default: "",
    },

    nursingReports: [
      {
        bp: {
          type: String,
          default: "",
        },

        pulse: {
          type: String,
          default: "",
        },

        temperature: {
          type: String,
          default: "",
        },

        spo2: {
          type: String,
          default: "",
        },

        sugar: {
          type: String,
          default: "",
        },

        intake: {
          type: String,
          default: "",
        },

        output: {
          type: String,
          default: "",
        },

        notes: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    handoverNotes: [
      {
        text: {
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ======================
    // Discharge
    // ======================

    dischargeDate: {
      type: String,
      default: "",
    },

    // ======================
    // Insurance
    // ======================

    insuranceStatus: {
      type: String,
      default: "",
    },

    claimNumber: {
      type: String,
      default: "",
    },

    // ======================
    // Appointment
    // ======================

    appointmentDate: String,

    appointmentTime: String,

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

    // ======================
    // OPD / IPD
    // ======================

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

    // ======================
    // Billing
    // ======================

    fee: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    paymentMode: {
      type: String,
      default: "Cash",
    },

    // ======================
    // Admission
    // ======================

    ipdNo: String,

    admissionDate: String,

    roomNo: String,

    bedNo: String,

    roomType: String,

    // ======================
    // Patient Status
    // ======================

    status: {
      type: String,
      default: "Waiting",
    },

    // ======================
    // Hospital Flow
    // ======================

    currentDepartment: {
      type: String,
      default: "Reception",
    },

    flowStatus: {
      type: String,
      default: "Registered",
    },
  },

  {
    timestamps: true,
  },
);

// ======================
// Indexes
// ======================

patientSchema.index({
  doctorId: 1,
});

patientSchema.index({
  doctorId: 1,
  appointmentDate: 1,
});

module.exports = mongoose.model("Patient", patientSchema);