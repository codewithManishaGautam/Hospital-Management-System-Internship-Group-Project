const express = require("express");

const router = express.Router();

const { 
  addDoctorPrescription,
  sendPrescription,
  getAllDoctors,
  getDoctorById
} = require("../controllers/doctorController");

// Get all doctors
router.get("/doctors", getAllDoctors);

// Get single doctor by ID
router.get("/doctors/:doctorId", getDoctorById);

// Doctor prescription save
router.post("/doctor/prescriptions", addDoctorPrescription);

// Send prescription to lab/pharmacy/nurse
router.post("/doctor/send-prescription", sendPrescription);
// Admin: fetch sent prescriptions (DB or in-memory)
router.get("/doctor/sent-prescriptions", (req, res) => {
  try {
    const SentPrescription = (() => {
      try { return require("../models/SentPrescription"); } catch (e) { return null; }
    })();

    if (SentPrescription) {
      SentPrescription.find().sort({ createdAt: -1 }).limit(200).then(docs => res.json({ data: docs })).catch(err => res.status(500).json({ message: err.message }));
      return;
    }

    res.json({ data: global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [], referralDoctor: [] } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

