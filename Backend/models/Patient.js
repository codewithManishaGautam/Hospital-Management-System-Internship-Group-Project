const mongoose = require("mongoose");

const appointmentHistory = [];
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

    // Lab
    labReport: {
      type: String,
      default: "",
    },

    // Pharmacy
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

<<<<<<< HEAD
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



=======
>>>>>>> origin/main
    currentDepartment: {
      type: String,
      default: "Reception",
    },

    flowStatus: {
      type: String,
      default: "Registered",
    },
<<<<<<< HEAD
  },

  {
    timestamps: true,
  },



    appointmentHistory[
=======

    appointmentHistory: [
>>>>>>> origin/main
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
<<<<<<< HEAD
      }
    ]
  
  
=======
      },
    ],
  },
  {
    timestamps: true,
  },
>>>>>>> origin/main
);

patientSchema.index({
  doctorId: 1,
});

patientSchema.index({
  doctorId: 1,
  appointmentDate: 1,
});

module.exports = mongoose.model("Patient", patientSchema);