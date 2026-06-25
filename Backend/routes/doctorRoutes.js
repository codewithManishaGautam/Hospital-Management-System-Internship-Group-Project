const express = require("express");

const router = express.Router();

const { 
  addDoctorPrescription,
  getAllDoctors,
  getDoctorById
} = require("../controllers/doctorController");

// Get all doctors
router.get("/doctors", getAllDoctors);

// Get single doctor by ID
router.get("/doctors/:doctorId", getDoctorById);

// Doctor prescription save
router.post("/doctor/prescriptions", addDoctorPrescription);

module.exports = router;

