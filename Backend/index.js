require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

// Database
const connectDB = require("./config/db");

// Models
const Patient = require("./models/Patient");
const Diagnostic = require("./models/Diagnostic");
const Bill = require("./models/Bill");
const Bed = require("./models/Bed");

// PDF
const mergePDFs = require("./mergePdf");

// Routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bedRoutes = require("./routes/bedRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const sendPrescriptionRoutes = require("./routes/SentPrescriptionRoutes");

const insuranceRoutes = require("./routes/insurance/insuranceCaseRoutes");
const insurancePatientRoutes = require("./routes/InsuranceRoutes");

const paymentRoutes = require("./routes/paymentRoutes");
const consentRoutes = require("./routes/consentRoutes");
const uploadRoutes = require("./routes/upload");

const labRoutes = require("./routes/labRoutes");
const billingRoutes = require("./routes/billingRoutes");

const app = express();

console.log("ENV URL =", process.env.MONGO_URL);

// ======================================================
// DATABASE
// ======================================================

connectDB();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// ======================================================
// DIRECTORIES
// ======================================================

const uploadsDir = path.join(__dirname, "uploads");
const generatedDir = path.join(__dirname, "generated");
const uploadLabDir = path.join(__dirname, "uploadLabReport");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

if (!fs.existsSync(uploadLabDir)) {
  fs.mkdirSync(uploadLabDir, { recursive: true });
}

// ======================================================
// STATIC FILES
// ======================================================

app.use("/uploads", express.static(uploadsDir));
app.use("/generated", express.static(generatedDir));
app.use("/uploadLabReport", express.static(uploadLabDir));

// ======================================================
// EMAIL CONFIGURATION
// ======================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  tls: {
    rejectUnauthorized: true,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email Server Error:");
    console.log(error.message);
  } else {
    console.log("✅ Email Server Ready");
  }
});

// ======================================================
// DIAGNOSTIC UPLOAD
// ======================================================

const diagnosticStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: diagnosticStorage,
});

// ======================================================
// ROUTES
// ======================================================

// Authentication
app.use("/api/auth", authRoutes);

// Patient
app.use("/api/patient", patientRoutes);

// Rooms
app.use("/api/rooms", roomRoutes);

// Beds
app.use("/api/beds", bedRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// ======================
// NON-OPD BILLING PATIENTS
// ======================

app.get("/api/billing/patients", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();

const query = {
  role: "IPD",
};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { uhid: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments(query);

    res.status(200).json({
      success: true,
      patients,
      total,
      hasMore: skip + patients.length < total,
    });
  } catch (error) {
    console.error("BILLING PATIENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch billing patients",
      error: error.message,
    });
  }
});

// ======================
// Billing
// ======================

app.use("/api/billing", billingRoutes);

// ======================
// SAVE FINAL CASH BILL
// ======================

app.post("/api/billing/final/cash", async (req, res) => {
  try {
    const {
      patientId,
      dischargeDate,
      dischargeTime,
      stayDays,
      roomCharge,
      bedCharge,
      doctorConsultancyFee,
      otherCharges,
      totalAmount,
      paymentMode,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    // -----------------------------
    // Find patient
    // -----------------------------

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // -----------------------------
    // Prevent duplicate final payment
    // -----------------------------

    if (patient.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Final payment is already completed for this patient",
      });
    }

    // -----------------------------
    // Create final Bill
    // -----------------------------

    const bill = new Bill({
      patientId: patient._id,

      patientName: patient.name,

      email: patient.email || "",

      uhid: patient.uhid || "",

      billType: patient.role || "",

      roomNo: patient.roomNo || "",

      roomType: patient.roomType || "",

      admissionDate: patient.admissionDate
        ? new Date(patient.admissionDate)
        : null,

      dischargeDate: dischargeDate
        ? new Date(dischargeDate)
        : null,

      stayDays: Number(stayDays || 0),

      roomCharge: Number(roomCharge || 0),

      bedCharge: Number(bedCharge || 0),

      doctorConsultancyFee: Number(
        doctorConsultancyFee || 0
      ),

      otherCharges: Number(
        otherCharges || 0
      ),

      totalAmount: Number(
        totalAmount || 0
      ),

      paymentMode: paymentMode || "Cash",

      paymentStatus: "Paid",

      paidAt: new Date(),

      razorpayOrderId:
        razorpayOrderId || "",

      razorpayPaymentId:
        razorpayPaymentId || "",
    });

    await bill.save();

    // -----------------------------
    // Free patient bed
    // -----------------------------

    if (patient.bedNo && patient.roomNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Available",
        }
      );
    }

    // -----------------------------
    // Update Room status
    // -----------------------------

    if (patient.roomNo) {
      const Room = require("./models/Room");

      const availableBeds = await Bed.countDocuments({
        roomNumber: patient.roomNo,
        status: "Available",
      });

      const room = await Room.findOne({
        roomNumber: patient.roomNo,
      });

      if (room) {
        room.status =
          availableBeds > 0
            ? "Available"
            : "Occupied";

        await room.save();
      }
    }

    // -----------------------------
    // Update Patient
    // -----------------------------

    patient.dischargeDate =
      dischargeDate || "";

    patient.dischargeTime =
      dischargeTime || "";

    patient.status =
      "Discharged";

    patient.paymentStatus =
      "Paid";

    patient.paidAt =
      new Date();

    patient.paymentMode =
      paymentMode || "Cash";

    patient.currentDepartment =
      "Billing";

    patient.flowStatus =
      "Completed";

    await patient.save();

    // -----------------------------
    // Response
    // -----------------------------

    return res.json({
      success: true,

      message:
        "Final bill saved successfully",

      bill,

      patient: {
        _id: patient._id,
        uhid: patient.uhid,
        name: patient.name,
        status: patient.status,
        paymentStatus:
          patient.paymentStatus,
        paymentMode:
          patient.paymentMode,
        flowStatus:
          patient.flowStatus,
      },
    });

  } catch (error) {
    console.error(
      "FINAL CASH BILL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save final cash payment",
      error: error.message,
    });
  }
});

// Doctor
app.use("/api", doctorRoutes);

// Upcoming Appointments
app.get("/api/doctor/upcoming-appointments", (req, res) => {
  return res.json({
    message: "Upcoming appointments",
    data: global.__receptionistAppointments || [],
  });
});

// Sent Prescription
app.use("/api", sendPrescriptionRoutes);

// Pharmacy
app.use("/api", pharmacyRoutes);

// Insurance
app.use("/insurance", insurancePatientRoutes);
app.use("/api/insurance", insuranceRoutes);

// Consent
app.use("/consent", consentRoutes);

// Upload
app.use("/upload", uploadRoutes);

// Payment
app.use("/api/payment", paymentRoutes);

// ======================================================
// OLD / LEGACY PATIENT API
// ======================================================

// Add Patient
app.post("/add", async (req, res) => {
  try {
    const patient = new Patient(req.body);

    await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    console.error("ADD PATIENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add patient",
      error: error.message,
    });
  }
});

// Get Patients
app.get("/patients", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            {
              patientName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              patientId: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const patients = await Patient.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Patient.countDocuments(query);

    res.status(200).json({
      success: true,
      patients,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      hasMore: skip + patients.length < total,
    });
  } catch (error) {
    console.error("GET PATIENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
});

// Delete Patient
app.delete("/delete-patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PATIENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete patient",
      error: error.message,
    });
  }
});

// ======================================================
// DIAGNOSTIC REPORT
// ======================================================

app.post(
  "/add-diagnostic",
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("========== ADD DIAGNOSTIC ==========");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const {
        patientId,
        patientName,
        testName,
        doctor,
        result,
        email,
      } = req.body;

      if (!patientId || !patientName || !testName) {
        return res.status(400).json({
          success: false,
          message:
            "Patient ID, patient name and test name are required",
        });
      }

      // --------------------------------------------------
      // Create PDF
      // --------------------------------------------------

      const pdfFileName =
        `diagnostic_${Date.now()}.pdf`;

      const pdfPath = path.join(
        generatedDir,
        pdfFileName
      );

      const doc = new PDFDocument();

      const writeStream =
        fs.createWriteStream(pdfPath);

      doc.pipe(writeStream);

      doc.fontSize(20).text(
        "Shradha Hospital",
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.fontSize(16).text(
        "Diagnostic Report",
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.fontSize(12);

      doc.text(`Patient ID: ${patientId}`);
      doc.text(`Patient Name: ${patientName}`);
      doc.text(`Test Name: ${testName}`);
      doc.text(`Doctor: ${doctor || "N/A"}`);
      doc.text(`Result: ${result || "N/A"}`);

      doc.moveDown();

      doc.text(
        `Generated Date: ${new Date().toLocaleString()}`
      );

      doc.end();

      // --------------------------------------------------
      // Wait until PDF is created
      // --------------------------------------------------

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      // --------------------------------------------------
      // Save Diagnostic
      // --------------------------------------------------

      const diagnostic = new Diagnostic({
        patientId,
        patientName,
        testName,
        doctor,
        result,
        image: req.file
          ? req.file.path
          : null,
        pdfPath,
      });

      await diagnostic.save();

      // --------------------------------------------------
      // Send Diagnostic Email
      // --------------------------------------------------

      if (email) {
        try {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject:
              "Shradha Hospital - Diagnostic Report",

            text: `Hello ${patientName},

Your diagnostic report has been generated successfully.

Regards,
Shradha Hospital`,

            attachments: [
              {
                filename: "Diagnostic_Report.pdf",
                path: pdfPath,
              },
            ],
          };

          const info =
            await transporter.sendMail(
              mailOptions
            );

          console.log(
            "✅ Diagnostic Email Sent"
          );

          console.log(
            "Message ID:",
            info.messageId
          );
        } catch (emailError) {
          console.error(
            "❌ Diagnostic Email Error:",
            emailError.message
          );
        }
      }

      // --------------------------------------------------
      // Response
      // --------------------------------------------------

      res.status(201).json({
        success: true,
        message:
          "Diagnostic report created successfully",

        diagnostic,

        pdfUrl:
          `http://localhost:${process.env.PORT || 5000}` +
          `/generated/${pdfFileName}`,
      });
    } catch (error) {
      console.error(
        "DIAGNOSTIC ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to create diagnostic report",
        error: error.message,
      });
    }
  }
);

// ======================================================
// GET DIAGNOSTICS
// ======================================================

app.get("/diagnostics", async (req, res) => {
  try {
    const diagnostics =
      await Diagnostic.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      diagnostics,
    });
  } catch (error) {
    console.error(
      "GET DIAGNOSTICS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch diagnostic reports",
      error: error.message,
    });
  }
});

// ======================================================
// SEND EMAIL
// ======================================================

app.post(
  "/send-email",
  upload.array("pdfs", 10),
  async (req, res) => {
    try {
      console.log("========== SEND EMAIL ==========");

      console.log("BODY:", req.body);

      console.log("FILES:", req.files);

      // ==========================
      // Check PDF files
      // ==========================

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No PDF files uploaded",
        });
      }

      // ==========================
      // Patient details
      // ==========================

      const { patientName, email } = req.body;

      if (!patientName || !email) {
        return res.status(400).json({
          success: false,
          message: "Patient name and email are required",
        });
      }

      // ==========================
      // Uploaded files
      // ==========================

      const uploadedFiles = req.files;

      console.log(
        "Uploaded Files:",
        uploadedFiles.length
      );

      // ==========================
      // Generated directory
      // ==========================

      const generatedDir = path.join(
        __dirname,
        "uploads"
      );

      if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, {
          recursive: true,
        });
      }

      // ==========================
      // Merged PDF path
      // ==========================

      const mergedPath = path.join(
        generatedDir,
        `merged_${Date.now()}.pdf`
      );

      console.log(
        "Merged Path:",
        mergedPath
      );

      // ==========================
      // Merge PDFs
      // ==========================

      await mergePDFs(
        uploadedFiles,
        mergedPath
      );

      console.log(
        "PDF MERGED SUCCESSFULLY"
      );

      // ==========================
      // Save Bill
      // ==========================

      const bill = new Bill({
        patientName,

        email,

        pdfPath: mergedPath,
      });

      await bill.save();

      console.log(
        "Bill Saved Successfully"
      );

      // ==========================
      // Email
      // ==========================

      const mailOptions = {
        from: process.env.EMAIL_USER,

        to: email,

        subject:
          "Merged Hospital Documents",

        text:
          "Your merged hospital documents are attached.",

        attachments: [
          {
            filename:
              "Hospital_Report.pdf",

            path: mergedPath,
          },
        ],
      };

      // ==========================
      // Send Email
      // ==========================

      const info =
        await transporter.sendMail(
          mailOptions
        );

      console.log(
        "EMAIL SENT:",
        info.response
      );

      // ==========================
      // Response
      // ==========================

      res.json({
        success: true,

        message:
          "Merged PDF Sent Successfully",

        pdfUrl:
          `http://localhost:5000/uploads/${path.basename(
            mergedPath
          )}`,
      });
    } catch (error) {
      console.error(
        "SEND EMAIL ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message: error.message,

        error: error.stack,
      });
    }
  }
);

// ======================================================
// LAB MODULE
// ======================================================

const labUploadPath = path.join(
  __dirname,
  "uploadLabReport"
);

const labStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, labUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadLab = multer({
  storage: labStorage,
});

if (!fs.existsSync(labUploadPath)) {
  fs.mkdirSync(labUploadPath, {
    recursive: true,
  });
}

// ======================================================
// DELETE DIAGNOSTIC
// ======================================================

app.delete(
  "/delete-diagnostic/:id",
  async (req, res) => {
    try {
      const diagnostic =
        await Diagnostic.findById(
          req.params.id
        );

      if (!diagnostic) {
        return res.status(404).json({
          success: false,
          message:
            "Diagnostic report not found",
        });
      }

      // Delete PDF
      if (
        diagnostic.pdfPath &&
        fs.existsSync(
          diagnostic.pdfPath
        )
      ) {
        fs.unlinkSync(
          diagnostic.pdfPath
        );
      }

      // Delete uploaded image
      if (
        diagnostic.image &&
        fs.existsSync(
          diagnostic.image
        )
      ) {
        fs.unlinkSync(
          diagnostic.image
        );
      }

      await Diagnostic.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Diagnostic report deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE DIAGNOSTIC ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete diagnostic report",
        error: error.message,
      });
    }
  }
);

// ======================================================
// LAB ROUTES
// ======================================================

app.use(
  "/lab",
  labRoutes(uploadLab)
);

// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Shradha Hospital Management System Backend is running",
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "GLOBAL ERROR:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);


app.use("/", patientRoutes);


// ======================================================
// SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );

  console.log(
    `📁 Uploads: http://localhost:${PORT}/uploads`
  );

  console.log(
    `📁 Generated: http://localhost:${PORT}/generated`
  );

  console.log(
    `💳 Billing API: http://localhost:${PORT}/api/billing`
  );
});

