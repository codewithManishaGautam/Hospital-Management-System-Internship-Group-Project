const express = require("express");

const router = express.Router();

const {
  
  getDoctorPatients,
} = require("../controllers/doctorController");

router.get("/doctor/patients/:doctor", getDoctorPatients);

module.exports = router;
