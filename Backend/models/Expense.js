const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
{
  expenseName: String,
  category: String,
  amount: Number,
  description: String,
},
{
  timestamps: true,
}
);

module.exports = mongoose.model(
  "Expense",
  expenseSchema
);