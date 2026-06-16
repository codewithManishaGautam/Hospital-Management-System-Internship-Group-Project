const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientId: String,
  amount: Number,
  status: String,
});

module.exports = mongoose.model("Billing", billingSchema);
