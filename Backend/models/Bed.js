const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    roomNumber: String,

    bedNo: String,

    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bed", bedSchema);