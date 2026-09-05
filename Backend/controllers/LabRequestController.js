const LabRequest = require("../models/LabRequest");
const Patient = require("../models/Patient");
const path = require("path");

// ==========================================
// Create Lab Request
// ==========================================

exports.createLabRequest = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      uhid,
      patientName,
      doctorName,
      ward,
      department,
      testCategory,
      testName,
      tests,
      priority,
      clinicalNotes,
    } = req.body;

    const request = new LabRequest({
      patientId,
      doctorId,
      uhid,
      patientName,
      doctorName,
      ward,
      department,
      testCategory,
      testName,
      tests: Array.isArray(tests) ? tests : [],
      priority: priority || "Normal",
      clinicalNotes: clinicalNotes || "",
      status: "Pending",
    });

    await request.save();

    res.status(201).json({
      success: true,

      message: "Lab Request Created Successfully",

      data: request,
    });
  } catch (error) {
    console.log("Create Lab Request Error:", error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Get All Lab Requests
// ==========================================

exports.getAllLabRequests = async (req, res) => {
  try {
    const requests = await LabRequest.find()

      .sort({
        requestedAt: -1,
      });

    res.status(200).json({
      success: true,

      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Get Pending Requests
// ==========================================

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await LabRequest.find({
      status: "Pending",
    });

    res.status(200).json({
      success: true,

      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Get Processing Requests
// ==========================================

exports.getProcessingRequests = async (req, res) => {
  try {
    const requests = await LabRequest.find({
      status: "Processing",
    });

    res.status(200).json({
      success: true,

      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Get Lab History
// Reports uploaded but payment is pending
// ==========================================

exports.getCompletedRequests = async (req, res) => {
  try {
    const requests = await LabRequest.find({
      reportPdfs: { $exists: true, $not: { $size: 0 } },
      "billing.paymentStatus": { $ne: "Paid" },
    }).sort({
      requestedAt: -1,
    });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.log("Get Lab History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Single Patient Request
// ==========================================

exports.getSingleRequest = async (req, res) => {
  try {
    const request = await LabRequest.findById(req.params.id);

    res.status(200).json({
      success: true,

      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Change Status
// ==========================================

exports.updateStatus = async (req, res) => {
  try {
    const request = await LabRequest.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,

      message: "Status Updated",

      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// Upload Multiple PDF Reports
// ==========================================

exports.uploadReport = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one PDF report",
      });
    }

    const request = await LabRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Lab Request not found",
      });
    }

    // ==========================================
    // Prepare Uploaded PDF Reports
    // ==========================================

    console.log("LAB UPLOADED FILES:", req.files);

    const uploadedReports = req.files.map((file, index) => {
      const savedFileName =
        file.filename ||
        (file.path ? path.basename(file.path) : null) ||
        file.originalname;

      return {
        fileName: savedFileName,
        testName: request.tests[index] || request.testName,
        uploadedAt: new Date(),
      };
    });

    console.log("LAB REPORTS TO SAVE:", uploadedReports);

    // Remove any old invalid report entries
    request.reportPdfs = request.reportPdfs.filter((report) => report.fileName);

    // Add newly uploaded reports
    request.reportPdfs.push(...uploadedReports);

    // Report uploaded → Processing
    request.status = "Processing";

    await request.save();

    request.status = "Processing";

    await request.save();

    const patient = await Patient.findById(request.patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (!patient.labReportHistory) {
      patient.labReportHistory = [];
    }

    uploadedReports.forEach((report) => {
      patient.labReportHistory.push({
        labRequestId: request._id,
        testName: report.testName,
        reportPdf: report.fileName,
        reportDate: report.uploadedAt,
      });
    });

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Reports Uploaded Successfully",
      data: request,
    });
  } catch (error) {
    console.log("Upload Reports Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Complete Lab Payment
// ==========================================

exports.completeLabPayment = async (req, res) => {
  try {
    const { paymentMode, paymentId, orderId, totalAmount } = req.body;

    const request = await LabRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Lab Request not found",
      });
    }

    request.billing = {
      totalAmount: Number(totalAmount || 0),
      paymentStatus: "Paid",
      paymentMode: paymentMode || "",
      billNumber: `LAB-${Date.now()}`,
      paymentId: paymentId || "",
      orderId: orderId || "",
      billedAt: new Date(),
    };

    // Payment successful → request completed
    request.status = "Completed";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Lab Payment Successful and Bill Generated",
      data: request,
    });
  } catch (error) {
    console.log("Complete Lab Payment Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Lab Payment History
// ==========================================

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await LabRequest.find({
      "billing.paymentStatus": "Paid",
    }).sort({
      "billing.billedAt": -1,
    });

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.log("Get Lab Payment History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
