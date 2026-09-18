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
const insuranceRoutes = require("./routes/insurance/insuranceCaseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const consentRoutes = require("./routes/consentRoutes");
const uploadRoutes = require("./routes/upload");
const labRoutes = require("./routes/labRoutes");
const billingRoutes = require("./routes/billingRoutes");
const insurancePatientRoutes = require("./routes/InsuranceRoutes");


const app = express();

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
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
// DIAGNOSTIC MULTER
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

// Billing
// IMPORTANT: Keep billing before generic /api routes
app.use("/api/billing", billingRoutes);

// Doctor
app.use("/api", doctorRoutes);

// Pharmacy
app.use("/api", pharmacyRoutes);

// Insurance
app.use("/insurance", insurancePatientRoutes);

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

const uploadLabStorage =
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadLabDir);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

const uploadLab = multer({
  storage: uploadLabStorage,
});

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



// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const nodemailer = require("nodemailer");
// const PDFDocument = require("pdfkit");
// const puppeteer = require("puppeteer");

// const connectDB = require("./config/db");
// const Patient = require("./models/Patient");
// const Diagnostic = require("./models/Diagnostic");
// const mergePDFs = require("./mergePdf");

// const authRoutes = require("./routes/authRoutes");
// const patientRoutes = require("./routes/patientRoutes");
// const roomRoutes = require("./routes/roomRoutes");
// const bedRoutes = require("./routes/bedRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const doctorRoutes = require("./routes/doctorRoutes");
// const pharmacyRoutes = require("./routes/pharmacyRoutes");
// const insuranceRoutes = require("./routes/insurance/insuranceCaseRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const consentRoutes = require("./routes/consentRoutes");
// const uploadRoutes = require("./routes/upload");
// const labRoutes = require("./routes/labRoutes");
// const billingRoutes = require("./routes/billingRoutes");
// const insurancePatientRoutes = require("./routes/InsuranceRoutes");

// const app = express();

// connectDB();


// // =====================================================
// // DIRECTORIES
// // =====================================================

// const uploadsDir = path.join(__dirname, "uploads");
// const generatedDir = path.join(__dirname, "generated");
// const uploadLabDir = path.join(__dirname, "uploadLabReport");

// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// if (!fs.existsSync(generatedDir)) {
//     fs.mkdirSync(generatedDir, { recursive: true });
// }

// if (!fs.existsSync(uploadLabDir)) {
//     fs.mkdirSync(uploadLabDir, { recursive: true });
// }


// // =====================================================
// // MIDDLEWARE
// // =====================================================

// app.use(
//     cors({
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
//     })
// );

// app.use(
//     express.json({
//         limit: "50mb"
//     })
// );

// app.use(
//     express.urlencoded({
//         extended: true,
//         limit: "50mb"
//     })
// );


// // =====================================================
// // STATIC FOLDERS
// // =====================================================

// app.use("/uploads", express.static(uploadsDir));

// app.use("/generated", express.static(generatedDir));

// app.use(
//     "/uploadLabReport",
//     express.static(uploadLabDir)
// );


// // =====================================================
// // EMAIL
// // =====================================================

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// transporter.verify((error, success) => {
//     if (error) {
//         console.log("Email transporter error:", error);
//     } else {
//         console.log("Email Server Ready");
//     }
// });


// // =====================================================
// // DIAGNOSTIC UPLOAD
// // =====================================================

// const diagnosticStorage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, uploadsDir);
//     },

//     filename: (req, file, cb) => {
//         cb(
//             null,
//             Date.now() + "-" + file.originalname
//         );
//     }

// });

// const upload = multer({
//     storage: diagnosticStorage
// });


// // =====================================================
// // INSURANCE PDF GENERATION - PUPPETEER
// // =====================================================

// app.post("/insurance/generate-pdf", async (req, res) => {

//     let browser = null;

//     try {

//         const {
//             html,
//             css,
//             fileName
//         } = req.body;


//         // -------------------------------------------------
//         // VALIDATION
//         // -------------------------------------------------

//         if (!html) {

//             return res.status(400).json({
//                 success: false,
//                 message: "HTML is required"
//             });

//         }


//         // -------------------------------------------------
//         // FILE NAME
//         // -------------------------------------------------

//         let safeFileName =
//             fileName ||
//             `insurance-${Date.now()}`;

//         safeFileName = safeFileName
//             .replace(/[^a-zA-Z0-9-_]/g, "_");

//         if (!safeFileName.toLowerCase().endsWith(".pdf")) {
//             safeFileName += ".pdf";
//         }


//         const outputPath = path.join(
//             generatedDir,
//             safeFileName
//         );


//         // -------------------------------------------------
//         // LAUNCH PUPPETEER
//         // -------------------------------------------------

//         browser = await puppeteer.launch({

//             headless: true,

//             args: [
//                 "--no-sandbox",
//                 "--disable-setuid-sandbox",
//                 "--disable-dev-shm-usage"
//             ]

//         });


//         const page = await browser.newPage();


//         // -------------------------------------------------
//         // VIEWPORT
//         // -------------------------------------------------

//         await page.setViewport({

//             width: 1100,
//             height: 900,

//             deviceScaleFactor: 1

//         });


//         // -------------------------------------------------
//         // HTML DOCUMENT
//         // -------------------------------------------------

//         const fullHtml = `
// <!DOCTYPE html>

// <html>

// <head>

// <meta charset="UTF-8">

// <style>

// ${css || ""}


// /* =========================================
//    PDF BASE
// ========================================= */

// html,
// body {

//     margin: 0;
//     padding: 0;

//     width: 100%;

// }


// /* =========================================
//    BOX SIZING
// ========================================= */

// * {

//     box-sizing: border-box;

// }


// /* =========================================
//    PRINT SETTINGS
// ========================================= */

// @page {

//     size: A4;

//     margin: 0;

// }


// @media print {

//     html,
//     body {

//         margin: 0 !important;
//         padding: 0 !important;

//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;

//     }


//     /* -------------------------------------
//        SBI PAGE
//     ------------------------------------- */

//     .sbi-page {

//         width: 1100px !important;

//         min-height: auto !important;

//         background: #eef2f7 !important;

//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;

//     }


//     /* -------------------------------------
//        FORM
//     ------------------------------------- */

//     .sbi-form {

//         width: 100% !important;

//         max-width: 1100px !important;

//         margin: 0 auto !important;

//         background: #ffffff !important;

//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;

//     }


//     /* -------------------------------------
//        TWO COLUMN GRID
//     ------------------------------------- */

//     .sbi-grid {

//         grid-template-columns:
//             repeat(2, minmax(0, 1fr)) !important;

//     }


//     /* -------------------------------------
//        CHECKBOX
//     ------------------------------------- */

//     .checkbox-grid {

//         grid-template-columns:
//             repeat(2, minmax(0, 1fr)) !important;

//     }


//     /* -------------------------------------
//        SIGNATURE
//     ------------------------------------- */

//     .signature-section {

//         grid-template-columns:
//             1fr 1fr !important;

//     }


//     /* -------------------------------------
//        STATIC ROW
//     ------------------------------------- */

//     .static-row {

//         grid-template-columns:
//             300px 1fr !important;

//     }


//     /* -------------------------------------
//        CHRONIC
//     ------------------------------------- */

//     .chronic-header,
//     .chronic-row {

//         grid-template-columns:
//             1fr 220px !important;

//     }


//     /* -------------------------------------
//        COST
//     ------------------------------------- */

//     .cost-row {

//         grid-template-columns:
//             1fr 200px !important;

//     }


//     /* -------------------------------------
//        MATERNITY
//     ------------------------------------- */

//     .maternity-row {

//         grid-template-columns:
//             repeat(4, 1fr) !important;

//     }


//     /* -------------------------------------
//        FORM VALUES
//     ------------------------------------- */

//     input,
//     textarea,
//     select {

//         color: #222 !important;

//         -webkit-print-color-adjust: exact !important;

//         print-color-adjust: exact !important;

//     }


//     /* -------------------------------------
//        BACKGROUND
//     ------------------------------------- */

//     .sbi-page,
//     .sbi-form,
//     input,
//     textarea,
//     select {

//         -webkit-print-color-adjust: exact !important;

//         print-color-adjust: exact !important;

//     }

// }

// </style>

// </head>


// <body>

// ${html}

// </body>

// </html>
// `;


//         // -------------------------------------------------
//         // SET PAGE CONTENT
//         // -------------------------------------------------

//         await page.setContent(
//             fullHtml,
//             {
//                 waitUntil: "networkidle0"
//             }
//         );


//         // -------------------------------------------------
//         // WAIT FOR FONTS + IMAGES
//         // -------------------------------------------------

//         await page.evaluate(async () => {

//             if (document.fonts) {

//                 await document.fonts.ready;

//             }


//             const images =
//                 Array.from(
//                     document.images
//                 );


//             await Promise.all(

//                 images.map((img) => {

//                     if (img.complete) {

//                         return Promise.resolve();

//                     }


//                     return new Promise(
//                         (resolve) => {

//                             img.onload = resolve;

//                             img.onerror = resolve;

//                         }
//                     );

//                 })

//             );

//         });


//         // -------------------------------------------------
//         // GENERATE PDF
//         // -------------------------------------------------

//         await page.pdf({

//             path: outputPath,

//             format: "A4",

//             printBackground: true,

//             preferCSSPageSize: false,

//             margin: {

//                 top: "0",
//                 right: "0",
//                 bottom: "0",
//                 left: "0"

//             }

//         });


//         // -------------------------------------------------
//         // CLOSE BROWSER
//         // -------------------------------------------------

//         await browser.close();

//         browser = null;


//         // -------------------------------------------------
//         // RESPONSE
//         // -------------------------------------------------

//         return res.status(200).json({

//             success: true,

//             message:
//                 "Insurance PDF generated successfully",

//             fileName:
//                 safeFileName,

//             filePath:
//                 `/generated/${safeFileName}`

//         });


//     } catch (error) {

//         console.error(
//             "Insurance PDF generation error:",
//             error
//         );


//         // -------------------------------------------------
//         // CLOSE BROWSER ON ERROR
//         // -------------------------------------------------

//         if (browser) {

//             try {

//                 await browser.close();

//             } catch (closeError) {

//                 console.error(
//                     closeError
//                 );

//             }

//         }


//         return res.status(500).json({

//             success: false,

//             message:
//                 "Failed to generate insurance PDF",

//             error:
//                 error.message

//         });

//     }

// });


// // =====================================================
// // EXISTING ROUTES
// // =====================================================

// app.use(
//     "/api/auth",
//     authRoutes
// );

// app.use(
//     "/api/patient",
//     patientRoutes
// );

// app.use(
//     "/api/rooms",
//     roomRoutes
// );

// app.use(
//     "/api/beds",
//     bedRoutes
// );

// app.use(
//     "/api/admin",
//     adminRoutes
// );

// app.use(
//     "/api/billing",
//     billingRoutes
// );

// app.use(
//     "/api",
//     doctorRoutes
// );

// app.use(
//     "/api",
//     pharmacyRoutes
// );

// app.use(
//     "/insurance",
//     insurancePatientRoutes
// );

// app.use(
//     "/consent",
//     consentRoutes
// );

// app.use(
//     "/upload",
//     uploadRoutes
// );

// app.use(
//     "/api/payment",
//     paymentRoutes
// );


// // =====================================================
// // LAB ROUTES
// // =====================================================

// app.use(
//     "/api",
//     labRoutes
// );


// // =====================================================
// // PORT
// // =====================================================

// const PORT =
//     process.env.PORT || 5000;


// app.listen(
//     PORT,
//     () => {

//         console.log(
//             `Server running on port ${PORT}`
//         );

//     }
// );