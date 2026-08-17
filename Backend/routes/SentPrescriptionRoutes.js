const express = require("express");
const router = express.Router();

const {
  sendPrescription,
} = require("../controllers/sentPrescriptionController");

router.post("/doctor/send-prescription", sendPrescription);

module.exports = router;