const express = require("express");

const router = express.Router();

const { addDoctorPrescription } = require("../controllers/doctorController");

// Doctor prescription save
router.post("/doctor/prescriptions", addDoctorPrescription);

module.exports = router;

