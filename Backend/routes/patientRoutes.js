const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  getNursePatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addNursingReport,
  addHandoverNote,
  updateNurseMedicineStatus,
  generatePrescriptionPDF,
} = require("../controllers/patientController");

router.post("/", addPatient);

router.get("/", getPatients);

// Nurse
router.get("/nurse/patients", getNursePatients);

router.post("/:id/nursing-report", addNursingReport);

router.post("/:id/handover", addHandoverNote);

router.put(
  "/:patientId/medicine/:medicineId/status",
  updateNurseMedicineStatus,
);

router.get("/:id/pdf", generatePrescriptionPDF);

router.get("/:id", getPatientById);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

module.exports = router;
