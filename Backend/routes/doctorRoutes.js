const express = require("express");

const router = express.Router();

const {
  getDoctors,
  getDoctorPatients,
  getTodayPatients,
  getHistoryPatients,
  getPatientNursingReports,
  getDoctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorController");

router.get("/doctors", getDoctors);

router.get("/doctor/patients/:doctorId", getDoctorPatients);

router.get("/doctor/today-patients/:doctorId", getTodayPatients);

router.get("/doctor/history-patients/:doctorId", getHistoryPatients);

router.get(
  "/doctor/:doctorId/patient/:patientId/nursing-reports",
  getPatientNursingReports,
);

router.get("/doctor/profile/:id", getDoctorProfile);

router.put("/doctor/profile/:id", updateDoctorProfile);

module.exports = router;
