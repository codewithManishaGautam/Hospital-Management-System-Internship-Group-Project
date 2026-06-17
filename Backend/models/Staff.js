const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  aadhaar: String,
  phone: String,
  role: String,
  salary: String,
  status: String,
  joining: String,
});

module.exports = mongoose.model("Staff", staffSchema);