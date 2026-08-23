const express = require("express");

const router = express.Router();

const {
  getDoctorPatients,
  getTodayPatients,
  getHistoryPatients,
  getDoctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorController");

const {
  sendPrescription,
} = require("../controllers/sentPrescriptionController");

router.get("/doctor/patients/:doctorId", getDoctorPatients);

router.get("/doctor/today-patients/:doctorId", getTodayPatients);

router.get("/doctor/history-patients/:doctorId", getHistoryPatients);

router.get("/doctor/profile/:id", getDoctorProfile);

router.put("/doctor/profile/:id", updateDoctorProfile);

router.post("/doctor/send-prescription", sendPrescription);

module.exports = router;
