const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  disease: String,
  doctor: String,
  admission: String,
  status: String,

  prescription: String,

  tests: [String],

  insurance: String,

  reports: [String],

  bill: String,
});

module.exports = mongoose.model("Patient", patientSchema);
