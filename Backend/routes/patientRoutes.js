const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  generatePrescriptionPDF,
  // updatePrescription,
} = require("../controllers/patientController");

router.post("/", addPatient);

router.get("/", getPatients);

router.get("/:id/pdf", generatePrescriptionPDF);

router.get("/:id", getPatientById);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

// router.put("/pharmacy/prescription/:id", updatePrescription);

module.exports = router;
