const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,

  aadhaar: String,

  mobile: String,

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: String,

  role: {
    type: String,
    lowercase: true,
    trim: true,
  },

  salary: String,

  status: String,

  joining: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: String,
});

module.exports = mongoose.model("Staff", staffSchema);