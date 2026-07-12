const mongoose =
require("mongoose");

const DiagnosticSchema =
new mongoose.Schema({

 patientId: {

  type: String

 },

 patientName: {

  type: String

 },

 age: {

  type: Number

 },

 gender: {

  type: String

 },

 doctorName: {

  type: String

 },

 scanName: {

  type: String

 },

 findings: {

  type: String

 },

 impression: {

  type: String

 },

 amount: {

  type: Number

 },

 paymentStatus: {

  type: String

 },

 imagePath: {

  type: String

 },

 pdfPath: {

  type: String

 }

});

module.exports =

mongoose.model(

 "Diagnostic",

 DiagnosticSchema

);