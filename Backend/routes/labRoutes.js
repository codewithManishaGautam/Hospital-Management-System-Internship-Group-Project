const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {

    uploadLabReport,
    getAllPatients,
    getPatientReports,
    updateLabReport,
    deleteLabReport,
    dashboardSummary

} = require("../controllers/labController");


// ===================== Patients =====================

router.get(

    "/patients",

    getAllPatients

);


// ===================== Upload PDF =====================

router.post(

    "/upload-report",

    upload.single("reportPdf"),

    uploadLabReport

);


// ===================== Patient Reports =====================

router.get(

    "/report/:patientId",

    getPatientReports

);


// ===================== Update Report =====================

router.put(

    "/report/:id",

    updateLabReport

);


// ===================== Delete Report =====================

router.delete(

    "/report/:id",

    deleteLabReport

);


router.get(

    "/dashboard-summary",

    dashboardSummary

);

module.exports = router;