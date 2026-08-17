const mongoose = require("mongoose");

const PharmacyBillSchema = new mongoose.Schema(
  {
    patientUHID: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SentPrescription",
    },

    doctorName: String,

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

    paymentStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PharmacyBill", PharmacyBillSchema);
