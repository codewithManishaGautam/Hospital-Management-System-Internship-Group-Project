const mongoose = require("mongoose");

const chargeSchema = new mongoose.Schema(
{
  chargeName: String,
  category: String,
  amount: Number,
  description: String,
},
{
  timestamps: true,
}
);

module.exports = mongoose.model(
  "Charge",
  chargeSchema
);