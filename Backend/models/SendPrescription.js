const mongoose = require("mongoose");

const SentPrescriptionSchema = new mongoose.Schema(
  {
    // Kis department ko prescription bheja gaya
    target: {
      type: String,
      enum: ["lab", "pharmacy", "nurse"],
      required: true,
    },

    // Doctor ka complete prescription object
    prescription: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Receive time
    receivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SentPrescription",
  SentPrescriptionSchema
);