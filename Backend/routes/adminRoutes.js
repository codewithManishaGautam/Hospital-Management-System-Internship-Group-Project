const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getDoctors,
  getStaff,
  getPatients,
  addStaff,
  deleteStaff,
  editStaff,
  editPatient,
  addDoctor,
  deleteDoctor,
  editDoctor,
  addPatient,
  deletePatient,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);

router.get("/doctors", getDoctors);

router.get("/staff", getStaff);

router.get("/patients", getPatients);

router.post("/staff/add", addStaff);

router.delete("/staff/delete/:id", deleteStaff);

router.put("/staff/edit/:id", editStaff);

router.put("/patient/edit/:id", editPatient);

router.post("/doctor/add", addDoctor);

router.delete("/doctor/delete/:id", deleteDoctor);

router.put("/doctor/edit/:id", editDoctor);

router.post("/patient/add", addPatient);

router.delete("/patient/delete/:id", deletePatient);

module.exports = router;
