



// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema(
//   {
//     // ======================
//     // Basic Patient Details
//     // ======================

//     uhid: {
//       type: String,
//       unique: true,
//     },

//     name: String,

//     age: Number,

//     gender: String,

//     mobile: String,

//     email: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     address: String,

//     // ======================
//     // Medical / Doctor
//     // ======================

//     disease: String,

//     doctorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Doctor",
//     },

//     doctor: {
//       type: String,
//       default: "",
//     },

//     referralDoctor: {
//       id: {
//         type: String,
//         default: "",
//       },

//       name: {
//         type: String,
//         default: "",
//       },

//       specialization: {
//         type: String,
//         default: "",
//       },
//     },

//     diagnosis: {
//       type: String,
//       default: "",
//     },

//     prescription: {
//       type: String,
//       default: "",
//     },

//     advice: {
//       type: String,
//       default: "",
//     },

//     notes: {
//       type: String,
//       default: "",
//     },

//     // ======================
//     // Prescription History
//     // ======================

//     prescriptionHistory: [
//       {
//         diagnosis: {
//           type: String,
//           default: "",
//         },

//         prescription: {
//           type: String,
//           default: "",
//         },

//         advice: {
//           type: String,
//           default: "",
//         },

//         notes: {
//           type: String,
//           default: "",
//         },

//         signature: {
//           type: String,
//           default: "",
//         },

//         referralDoctor: {
//           id: {
//             type: String,
//             default: "",
//           },

//           name: {
//             type: String,
//             default: "",
//           },

//           specialization: {
//             type: String,
//             default: "",
//           },
//         },

//         visitDate: {
//           type: Date,
//           default: Date.now,
//         },

//         medicines: [
//           {
//             medicineName: {
//               type: String,
//               default: "",
//             },

//             quantity: {
//               type: Number,
//               default: 0,
//             },

//             price: {
//               type: Number,
//               default: 0,
//             },

//             amount: {
//               type: Number,
//               default: 0,
//             },

//             timing: {
//               type: String,
//               default: "",
//             },

//             dose: {
//               type: String,
//               default: "",
//             },

//             status: {
//               type: String,
//               enum: ["Pending", "Given"],
//               default: "Pending",
//             },
//           },
//         ],

//         billId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "PharmacyBill",
//           default: null,
//         },

//         paymentStatus: {
//           type: String,
//           default: "Pending",
//         },

//         paymentMode: {
//           type: String,
//           default: "",
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     // ======================
//     // Lab
//     // ======================

//     labReport: {
//       type: String,
//       default: "",
//     },

//     // ======================
//     // Pharmacy
//     // ======================

//     medicineHistory: [
//       {
//         billId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "PharmacyBill",
//         },

//         medicines: [
//           {
//             medicineName: String,
//             quantity: Number,
//             price: Number,
//             amount: Number,
//           },
//         ],

//         totalAmount: Number,

//         paymentMode: String,

//         paymentStatus: String,

//         issuedAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     // Kept for compatibility with existing pharmacy data
//     medicinesIssued: [
//       {
//         name: String,
//         quantity: Number,
//       },
//     ],

//     // ======================
//     // Nurse
//     // ======================

//     nurseNotes: {
//       type: String,
//       default: "",
//     },

//     vitals: {
//       type: String,
//       default: "",
//     },

//     nursingReports: [
//       {
//         bp: {
//           type: String,
//           default: "",
//         },

//         pulse: {
//           type: String,
//           default: "",
//         },

//         temperature: {
//           type: String,
//           default: "",
//         },

//         spo2: {
//           type: String,
//           default: "",
//         },

//         sugar: {
//           type: String,
//           default: "",
//         },

//         intake: {
//           type: String,
//           default: "",
//         },

//         output: {
//           type: String,
//           default: "",
//         },

//         notes: {
//           type: String,
//           default: "",
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     handoverNotes: [
//       {
//         text: {
//           type: String,
//           required: true,
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     // ======================
//     // Discharge
//     // ======================

//     dischargeDate: {
//       type: String,
//       default: "",
//     },

//     // ======================
//     // Insurance
//     // ======================

//     insuranceYesOrNot: {
//       type: Boolean,
//       default: false,
//     },

//     insuranceStatus: {
//       type: String,
//       default: "",
//     },

//     claimNumber: {
//       type: String,
//       default: "",
//     },

//     // ======================
//     // Appointment
//     // ======================

//     appointmentDate: String,

//     appointmentTime: String,

//     appointmentHistory: [
//       {
//         appointmentDate: String,

//         appointmentTime: String,

//         doctor: String,

//         disease: String,

//         fee: {
//           type: Number,
//           default: 500,
//         },

//         paymentStatus: {
//           type: String,
//           default: "Pending",
//         },

//         paymentMode: {
//           type: String,
//           default: "Cash",
//         },

//         status: {
//           type: String,
//           default: "Waiting Doctor",
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     // ======================
//     // OPD / IPD
//     // ======================

//     role: {
//       type: String,

//       enum: [
//         "OPD",
//         "IPD",
//         "ICU",
//         "OT",
//         "General Ward",
//         "Casualty",
//         "Emergency",
//       ],

//       default: "OPD",
//     },

//     // ======================
//     // Billing
//     // ======================

//     fee: {
//       type: Number,
//       default: 0,
//     },

//     paymentStatus: {
//       type: String,
//       default: "Pending",
//     },

//     paymentMode: {
//       type: String,
//       default: "Cash",
//     },

//     // ======================
//     // Admission
//     // ======================

//     ipdNo: String,

//     admissionDate: String,

//     roomNo: String,

//     bedNo: String,

//     roomType: String,

//     // ======================
//     // Patient Status
//     // ======================

//     status: {
//       type: String,
//       default: "Waiting",
//     },

//     // ======================
//     // Patient Flow
//     // ======================

//     // <<<<<<< HEAD
//     // <<<<<<< HEAD
//     // =======
//     // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },

//     prescriptionHistory: [
//       {
//         diagnosis: {
//           type: String,
//           default: "",
//         },

//         prescription: {
//           type: String,
//           default: "",
//         },

//         advice: {
//           type: String,
//           default: "",
//         },

//         notes: {
//           type: String,
//           default: "",
//         },

//         signature: {
//           type: String,
//           default: "",
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],

//     // Lab
//     labReport: {
//       type: String,
//       default: "",
//     },

//     // Pharmacy
//     medicinesIssued: [
//       {
//         name: String,
//         quantity: Number,
//       },
//     ],

//     // Nurse
//     nurseNotes: {
//       type: String,
//       default: "",
//     },

//     vitals: {
//       type: String,
//       default: "",
//     },

//     // Insurance
//     insuranceStatus: {
//       type: String,
//       default: "",
//     },

//     claimNumber: {
//       type: String,
//       default: "",
//     },

//     // Appointment
//     appointmentDate: String,

//     appointmentTime: String,

//     // Billing
//     fee: {
//       type: Number,
//       default: 0,
//     },

//     paymentStatus: {
//       type: String,
//       default: "Pending",
//     },

//     // <<<<<<< HEAD
//     // =======
//     // >>>>>>> origin/main
//     // =======
//     // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//     currentDepartment: {
//       type: String,
//       default: "Reception",
//     },

//     flowStatus: {
//       type: String,
//       default: "Registered",
//     },
// <<<<<<< HEAD

//     // ======================
//     // Created At
//     // ======================

//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
// =======
//     // <<<<<<< HEAD
//     // <<<<<<< HEAD
//     // =======
//     // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
// >>>>>>> origin/main
//   },

//   {
//     timestamps: true,
// <<<<<<< HEAD
//   }
// =======
//   },

//   //     appointmentHistory[
//   // <<<<<<< HEAD
//   // =======

//   //     appointmentHistory: [
//   // >>>>>>> origin/main
//   // =======
//   // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//   {
//     appointmentDate: String,

//     appointmentTime: String,

//     doctor: String,

//     disease: String,

//     fee: {
//       type: Number,
//       default: 500,
//     },

//     paymentStatus: {
//       type: String,
//       default: "Pending",
//     },

//     paymentMode: {
//       type: String,
//       default: "Cash",
//     },

//     status: {
//       type: String,
//       default: "Waiting Doctor",
//     },

//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     // <<<<<<< HEAD
//     // <<<<<<< HEAD
//     // =======
//     // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//   },
//   //     ]

//   // <<<<<<< HEAD
//   // =======
//   // =======
//   // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     timestamps: true,
//   //   },
//   // <<<<<<< HEAD
//   // >>>>>>> origin/main
//   // =======
//   // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
// >>>>>>> origin/main
// );

// // ======================
// // Indexes
// // ======================

// patientSchema.index({
//   doctorId: 1,
// });

// patientSchema.index({
//   doctorId: 1,
//   appointmentDate: 1,
// });

// module.exports = mongoose.model("Patient", patientSchema);


const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // =====================================================
    // Basic Patient Details
    // =====================================================

    uhid: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: 0,
    },

    gender: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    // =====================================================
    // Medical / Doctor Details
    // =====================================================

    disease: {
      type: String,
      default: "",
    },

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

    // =====================================================
    // Prescription History
    // =====================================================

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

    // =====================================================
    // Lab
    // =====================================================

    labReport: {
      type: String,
      default: "",
    },

    // =====================================================
    // Pharmacy
    // =====================================================

    medicineHistory: [
      {
        billId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PharmacyBill",
          default: null,
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

    // Kept for compatibility with existing pharmacy data
    medicinesIssued: [
      {
        name: {
          type: String,
          default: "",
        },

        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],

    // =====================================================
    // Nurse
    // =====================================================

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

    // =====================================================
    // Discharge
    // =====================================================

    dischargeDate: {
      type: String,
      default: "",
    },

    // =====================================================
    // Insurance
    // =====================================================

    insuranceYesOrNot: {
      type: Boolean,
      default: false,
    },

    insuranceStatus: {
      type: String,
      default: "",
    },

    claimNumber: {
      type: String,
      default: "",
    },

    // =====================================================
    // Appointment
    // =====================================================

    appointmentDate: {
      type: String,
      default: "",
    },

    appointmentTime: {
      type: String,
      default: "",
    },

    appointmentHistory: [
      {
        appointmentDate: {
          type: String,
          default: "",
        },

        appointmentTime: {
          type: String,
          default: "",
        },

        doctor: {
          type: String,
          default: "",
        },

        disease: {
          type: String,
          default: "",
        },

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

    // =====================================================
    // OPD / IPD / ICU / OT / Ward
    // =====================================================

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

    // =====================================================
    // Billing
    // =====================================================

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

    // =====================================================
    // Admission / IPD Details
    // =====================================================

    ipdNo: {
      type: String,
      default: "",
    },

    admissionDate: {
      type: String,
      default: "",
    },

    roomNo: {
      type: String,
      default: "",
    },

    bedNo: {
      type: String,
      default: "",
    },

    roomType: {
      type: String,
      default: "",
    },

    // =====================================================
    // Patient Status
    // =====================================================

    status: {
      type: String,
      default: "Waiting",
    },

    // =====================================================
    // Patient Flow
    // =====================================================

    currentDepartment: {
      type: String,
      default: "Reception",
    },

    flowStatus: {
      type: String,
      default: "Registered",
    },

    // =====================================================
    // Created At
    // =====================================================

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

// =========================================================
// Indexes
// =========================================================

patientSchema.index({
  doctorId: 1,
});

patientSchema.index({
  doctorId: 1,
  appointmentDate: 1,
});

// =========================================================
// Export Model
// =========================================================

module.exports = mongoose.model("Patient", patientSchema);