const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  qualification: String,
  experience: String,
  phone: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
