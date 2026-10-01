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

  paymentMode: {
  type: String,
  default: "",
},

paymentStatus: {
  type: String,
  enum: ["Pending", "Paid"],
  default: "Pending",
},

paidAt: {
  type: Date,
  default: null,
},

  },
  {
    timestamps: true,
  },
);

PharmacyBillSchema.index({
  createdAt: -1,
});

PharmacyBillSchema.index({
  prescriptionId: 1,
});

module.exports = mongoose.model("PharmacyBill", PharmacyBillSchema);
