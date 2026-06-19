const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String },
  mobile: { type: String, required: true },
  address: { type: String },
  aadhar: { type: String }, 
  adhaar: { type: String, sparse: true }, // Keep for compatibility
  disease: { type: String },
  type: { type: String }, // OPD / IPD
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
