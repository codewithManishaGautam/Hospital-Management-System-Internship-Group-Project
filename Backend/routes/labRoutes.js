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
        dashboardSummary,
        generateLabBill,
        getLabBill,
        generateLabBillPDF,
        updateLabPayment
    } = require("../controllers/labController");

    const {
        getAllLabTests
    } = require("../controllers/labTestController");


    // ==========================================
    // Get All Patients
    // ==========================================

    router.get(

        "/patients",

        getAllPatients

    );

    // ==========================================
    // Get All Lab Tests
    // ==========================================

    router.get(
        "/tests",
        getAllLabTests
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
    // Generate Lab Bill
    // ==========================================

    router.post(
        "/bill",
        generateLabBill
    );

    // ==========================================
    // Get Lab Bill
    // ==========================================

    router.get(
        "/bill/:patientId",
        getLabBill
    );

// ==========================================
// Generate Lab Bill PDF
// ==========================================

router.get(
    "/bill/:patientId/pdf",
    generateLabBillPDF
);

    // ==========================================
    // Update Lab Payment
    // ==========================================

    router.put(
        "/bill/payment/:id",
        updateLabPayment
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