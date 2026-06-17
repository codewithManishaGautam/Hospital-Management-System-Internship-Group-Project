const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  
  gender: String, // OPD / IPD
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  mobile:Number,
  aadhar:Number,
  disease: String,
  type: String, // OPD / IPD
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Patient", patientSchema);