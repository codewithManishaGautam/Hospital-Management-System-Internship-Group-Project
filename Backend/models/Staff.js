const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  aadhaar: String,
  mobile: String,
  role: String,
  salary: String,
  status: String,
  joining: String,
});

module.exports = mongoose.model("Staff", staffSchema);
