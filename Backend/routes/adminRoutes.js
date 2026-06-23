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
  getRooms,
  addRoom,
  deleteRoom,
  getInventory,
  addInventory,
  deleteInventory,
  getCharges,
  addCharge,
  deleteCharge,
  getExpenses,
  addExpense,
  deleteExpense,

  getIncome,
  addIncome,
  deleteIncome,
  getFinanceStats,
  getAnalytics,
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

// PATIENTS
router.get("/patients", getPatients);
router.post("/patient/add", addPatient);
router.put("/patient/edit/:id", editPatient);
router.delete("/patient/delete/:id", deletePatient);

// ROOMS
router.get("/rooms", getRooms);
router.post("/room/add", addRoom);
router.delete("/room/delete/:id", deleteRoom);

//INVENTORY
router.get("/inventory", getInventory);
router.post("/inventory/add", addInventory);
router.delete("/inventory/delete/:id", deleteInventory);

//CHARGES
router.get("/charges", getCharges);
router.post("/charge/add", addCharge);
router.delete("/charge/delete/:id", deleteCharge);

//EXPENSES
router.get("/expenses", getExpenses);
router.post("/expense/add", addExpense);
router.delete("/expense/delete/:id", deleteExpense);

//INCOME
router.get("/income", getIncome);
router.post("/income/add", addIncome);
router.delete("/income/delete/:id", deleteIncome);

//FINANCE
// router.get("/finance", getFinanceStats);

//ROUTES
// router.get("/analytics", getAnalytics);

module.exports = router;
