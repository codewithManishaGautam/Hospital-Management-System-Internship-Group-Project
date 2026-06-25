const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
{
  itemName: String,
  category: String,
  quantity: Number,
  unitPrice: Number,
  supplier: String,
},
{
  timestamps: true,
}
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);