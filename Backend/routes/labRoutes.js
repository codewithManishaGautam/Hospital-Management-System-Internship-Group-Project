const express = require("express");

const router = express.Router();

module.exports = (uploadLab) => {
  const {
    createLabRequest,
    getAllLabRequests,
    getPendingRequests,
    getProcessingRequests,
    getCompletedRequests,
    getSingleRequest,
    updateStatus,
    uploadReport,
    completeLabPayment,
    getPaymentHistory,
  } = require("../controllers/labRequestController");

  // ==============================
  // LAB REQUESTS
  // ==============================

  // Create request from Doctor
  router.post("/requests", createLabRequest);

  // Get all requests
  router.get("/requests", getAllLabRequests);

  // Pending requests
  router.get("/requests/pending", getPendingRequests);

  // Processing requests
  router.get("/requests/processing", getProcessingRequests);

  // Completed requests
  router.get("/requests/completed", getCompletedRequests);

  // Payment History
  router.get("/requests/payment-history", getPaymentHistory);

  // Single request
  router.get("/requests/:id", getSingleRequest);

  // Update status
  router.put("/requests/:id/status", updateStatus);

  // Complete Lab Payment
  router.put("/requests/:id/payment", completeLabPayment);

  // Upload report
  router.post(
    "/requests/:id/report",
    uploadLab.array("reportPdfs", 10),
    uploadReport,
  );
  return router;
};
