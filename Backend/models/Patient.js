const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  adhaar: { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
