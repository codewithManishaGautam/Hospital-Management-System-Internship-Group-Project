// const express = require("express");

// const router = express.Router();


// const {

//     uploadLabReport,
//     getAllPatients,
//     getPatientReports,
//     updateLabReport,
//     deleteLabReport,
//     dashboardSummary

// } = require("../controllers/labController");


// // ===================== Patients =====================

// router.get(

//     "/patients",

//     getAllPatients

// );


// // ===================== Upload PDF =====================

// router.post(

//     "/upload-report",

//     upload.single("reportPdf"),

//     uploadLabReport

// );


// // ===================== Patient Reports =====================

// router.get(

//     "/reports/:patientId",

//     getPatientReports

// );


// // ===================== Update Report =====================

// router.put(

//     "/report/:id",

//     updateLabReport

// );


// // ===================== Delete Report =====================

// router.delete(

//     "/report/:id",

//     deleteLabReport

// );


// router.get(

//     "/dashboard-summary",

//     dashboardSummary

// );

// module.exports = router;






const express = require("express");

const router = express.Router();


// ==========================================
// Lab Routes
// ==========================================

module.exports = (uploadLab) => {


    const {

        uploadLabReport,
        getAllPatients,
        getPatientReports,
        updateLabReport,
        deleteLabReport,
        dashboardSummary

    } = require("../controllers/labController");


    // ==========================================
    // Get All Patients
    // ==========================================

    router.get(

        "/patients",

        getAllPatients

    );


    // ==========================================
    // Upload Lab Report
    // ==========================================

    router.post(

        "/upload-report",

        uploadLab.single("reportPdf"),

        uploadLabReport

    );


    // ==========================================
    // Get Patient Reports
    // ==========================================

    router.get(

        "/reports/:patientId",

        getPatientReports

    );


    // ==========================================
    // Update Report
    // ==========================================

    router.put(

        "/report/:id",

        updateLabReport

    );


    // ==========================================
    // Delete Report
    // ==========================================

    router.delete(

        "/report/:id",

        deleteLabReport

    );


    // ==========================================
    // Dashboard Summary
    // ==========================================

    router.get(

        "/dashboard-summary",

        dashboardSummary

    );


    return router;

};