const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
{
  roomNumber: String,
  roomType: String,
  floor: String,
  chargesPerDay: Number,
  status: {
    type: String,
    default: "Available",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Room", roomSchema);