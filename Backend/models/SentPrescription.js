const mongoose = require("mongoose");

const SentPrescriptionSchema = new mongoose.Schema(
  {
    target: {
      type: String,
      enum: ["lab", "pharmacy", "nurse", "doctor", "referralDoctor"],
      required: true,
    },

    prescription: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    prescriptionHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    receivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SentPrescription", SentPrescriptionSchema);
