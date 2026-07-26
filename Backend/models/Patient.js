// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema({
//   name: 
//   {
//     type:String
//   },
//   age: 
//   {
//     type:Number
//   },
//   gender: 
//   {
//     type:String
//   },
//   phone: 
//   {
//     type:String
//   },
//   disease: 
//   {
//     type:String
//   },
//   doctor: 
//   {
//     type:String
//   },
//   admission: 
//   {
//     type:String
//   },
 
//   status:
//   {
//     type:String
//   },
//   role: 
//     {
//         type: String,
//         enum: ["OPD","IPD","ICU","OT","General Ward","Casulty","Emergency"]
//     },


//   createdAt: 
//   {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Patient", patientSchema);




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
  }

);




module.exports = mongoose.model("Patient", patientSchema);