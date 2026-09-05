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

    labReportHistory: [
      {
        labRequestId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LabRequest",
        },

        testName: {
          type: String,
          default: "",
        },

        reportPdf: {
          type: String,
          default: "",
        },

        reportDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // ======================
    // Pharmacy
    // ======================

    medicineHistory: [
      {
        billId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PharmacyBill",
        },

        medicines: [
          {
            medicineName: String,
            quantity: Number,
            price: Number,
            amount: Number,
          },
        ],

        totalAmount: Number,

        paymentMode: String,

        paymentStatus: String,

        issuedAt: {
          type: Date,
          default: Date.now,
        },
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

// <<<<<<< HEAD
// <<<<<<< HEAD
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
    createdAt: {
        type: Date,
        default: Date.now
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
    
    // Billing
    fee: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },



// <<<<<<< HEAD
// =======
// >>>>>>> origin/main
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
    currentDepartment: {
      type: String,
      default: "Reception",
    },

    flowStatus: {
      type: String,
      default: "Registered",
    },
// <<<<<<< HEAD
// <<<<<<< HEAD
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
  },

  {
    timestamps: true,
  },



//     appointmentHistory[
// <<<<<<< HEAD
// =======

//     appointmentHistory: [
// >>>>>>> origin/main
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
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
// <<<<<<< HEAD
// <<<<<<< HEAD
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
      }
//     ]
  
  
// <<<<<<< HEAD
// =======
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   },
// <<<<<<< HEAD
// >>>>>>> origin/main
// =======
// >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
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
