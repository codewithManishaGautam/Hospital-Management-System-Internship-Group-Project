

const mongoose =
require("mongoose");

const billSchema =
new mongoose.Schema({

  patientName: {

    type: String

  },

  email: {

    type: String

  },

  pdfPath: {

    type: String

  }

});

module.exports =
mongoose.model(
  "Bill",
  billSchema
);