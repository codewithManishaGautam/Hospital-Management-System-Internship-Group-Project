const express = require("express");

const router = express.Router();

const {
  sendPrescription,
  getLatestPatientPrescription,
} = require("../controllers/sentPrescriptionController");

router.post("/doctor/send-prescription", sendPrescription);

router.get(
  "/doctor/prescription/latest/:patientId",
  getLatestPatientPrescription,
);

module.exports = router;
