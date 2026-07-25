const express = require('express');
const router = express.Router();
const { 
    getAllPatients, 
    searchPatientByUHID, 
    getPatientDetailsByUHID, 
    updatePatientAdmissionDate,
    saveBedStatus, 
    getBedStatus, 
    saveDailyReport, 
    saveHandoverNote, 
    getHandoverHistory,
    updateMedicationStatus, 
    saveActivityChart, 
    getActivityChart 
} = require('../controllers/nurseController');

// --- Patients Routes ---
router.get('/patients', getAllPatients);
router.get('/patients/search', searchPatientByUHID);
router.get('/patients/:uhid', getPatientDetailsByUHID);
router.put('/patients/:uhid/admission', updatePatientAdmissionDate);

// --- Beds Routes ---
router.post('/beds', saveBedStatus);
router.get('/beds', getBedStatus);

// --- Daily Reports Route ---
router.post('/daily-report', saveDailyReport);

// --- Handover Routes ---
router.post('/handover', saveHandoverNote);
router.get('/handover/:patientId', getHandoverHistory);

// --- Medication Route ---
router.put('/patients/:uhid/medication', updateMedicationStatus);

// --- Activity Chart Routes ---
router.post('/activity-chart', saveActivityChart);
router.get('/activity-chart/:patientId', getActivityChart);

module.exports = router;