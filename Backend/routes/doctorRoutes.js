const express = require("express");

const router = express.Router();

const {
  getDoctorPatients,
  getTodayPatients,
  getHistoryPatients,
  getDoctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorController");

router.get("/doctor/patients/:doctor", getDoctorPatients);

router.get("/doctor/today-patients/:doctor", getTodayPatients);

router.get("/doctor/history-patients/:doctor", getHistoryPatients);

router.get("/doctor/profile/:name", getDoctorProfile);

router.put("/doctor/profile/:id", updateDoctorProfile);
module.exports = router;
