const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  description: String,
});

module.exports = mongoose.model(
  "Income",
  incomeSchema
);