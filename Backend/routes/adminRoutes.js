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
  getUsers,
  updatePassword,
  addUser,
} = require("../controllers/adminController");

// DASHBOARD
router.get("/dashboard", getDashboardStats);

// DOCTORS
router.get("/doctors", getDoctors);
router.post("/doctor/add", addDoctor);
router.put("/doctor/edit/:id", editDoctor);
router.delete("/doctor/delete/:id", deleteDoctor);

// STAFF
router.get("/staff", getStaff);
router.post("/staff/add", addStaff);
router.put("/staff/edit/:id", editStaff);
router.delete("/staff/delete/:id", deleteStaff);
router.post("/user/add", addUser);

// PATIENTS
router.get("/patients", getPatients);
router.post("/patient/add", addPatient);
router.put("/patient/edit/:id", editPatient);
router.delete("/patient/delete/:id", deletePatient);

router.get("/users", getUsers);
router.put("/user/password/:id", updatePassword);

module.exports = router;
