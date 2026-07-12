const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  roomType: String,
  floor: String,
  chargesPerDay: Number,

  totalBeds: {
    type: Number,
    default: 1,
  },

  status: {
    type: String,
    default: "Available",
  },
});

module.exports = mongoose.model("Room", roomSchema);