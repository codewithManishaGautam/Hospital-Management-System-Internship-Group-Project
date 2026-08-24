const express = require("express");

const router = express.Router();

const {
  getTodayPrescriptions,

  searchPatient,

  getPrescriptionByUHID,

  createBill,

  updatePayment,

  updatePrescription,

  getMedicines,

  getPayments,

  getBills,
} = require("../controllers/pharmacyController");

router.get("/pharmacy/prescriptions", getTodayPrescriptions);

router.get("/pharmacy/medicines", getMedicines);

router.get("/pharmacy/payments", getPayments);

router.get("/pharmacy/bills", getBills);

router.get("/pharmacy/search", searchPatient);

router.get("/pharmacy/:uhid", getPrescriptionByUHID);

router.post("/pharmacy/bill", createBill);

router.put("/pharmacy/payment/:id", updatePayment);

router.put("/pharmacy/prescription/:id", updatePrescription);

module.exports = router;
