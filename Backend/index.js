require("dotenv").config();

const connectDB = require("./config/db");
const Patient = require("./models/Patient");

console.log("ENV URL =", process.env.MONGO_URL);
connectDB();

// mongoose.connection.once("open", () => {
//   console.log("Connected DB:", mongoose.connection.db.databaseName);
// });

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const multer = require("multer");

const nodemailer = require("nodemailer");

const fs = require("fs");

const path = require("path");

const PDFDocument = require("pdfkit");

const mergePDFs = require("./mergePdf");

const Diagnostic = require("./models/Diagnostic");

const Bill = require("./models/Bill");

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);

// app.get("/", (req, res) => {
//   res.send("Hospital Management Backend Running");
// });

// const PORT = 5000;

const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patient", patientRoutes);

const roomRoutes = require("./routes/roomRoutes");
const bedRoutes = require("./routes/bedRoutes");

app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// ======================
// Doctor routes (lazy loaded)
// ======================
// Route modules ko require karne ko deferred rakha gaya hai
// (Doctor module related file ke andar hi isolate rehta hai)
app.use((req, res, next) => {
  // Only doctor-related module routes ko deferred require karke lazy-load mindset
  // rakha gaya hai.
  if (req.path.startsWith("/doctor") && process.env.NODE_ENV !== "test") {
    try {
      // eslint-disable-next-line global-require
      const doctorRoutes = require("./routes/doctorRoutes");
      return doctorRoutes(req, res, next);
    } catch (e) {
      return next(e);
    }
  }
  return next();
});

// ======================
// MongoDB
// ======================

// connectDB();

// ======================
// Patient Schema
// ======================

// const PatientSchema = new mongoose.Schema({
//   name: String,

//   age: Number,

//   gender: String,
// });

// const Patient = mongoose.model(
//   "Patient",

//   PatientSchema,
// );

// ======================
// Create Folders
// ======================

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

if (!fs.existsSync("generated")) {
  fs.mkdirSync("generated");
}

// ======================
// Static Folders
// ======================

app.use(
  "/uploads",

  express.static(path.join(__dirname, "uploads")),
);

app.use(
  "/generated",

  express.static(path.join(__dirname, "generated")),
);

// ======================
// Multer
// ======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,

      Date.now() + "_" + file.originalname,
    );
  },
});

const upload = multer({ storage });

// ======================
// Nodemailer
// ======================

// const transporter = nodemailer.createTransport({
//   service: "gmail",

//   auth: {
//     user: process.env.EMAIL_USER,

//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ======================
// // Verify Email
// // ======================

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email Server Ready");
//   }
// });

// ======================
// Add Patient
// ======================

// // Before Change Code :

// app.post(
//   "/add",

//   async (req, res) => {
//     try {
//       const patient = new Patient(req.body);

//       await patient.save();

//       res.json({
//         success: true,

//         message: "Patient Added",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

app.post("/add", async (req, res) => {
  try {
    const patient = new Patient({
      uhid: req.body.uhid,

      name: req.body.name,

      age: req.body.age,

      gender: req.body.gender,

      mobile: req.body.mobile,

      address: req.body.address,

      disease: req.body.disease,

      doctor: req.body.doctor,

      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,

      role: req.body.role,

      admissionDate: req.body.admissionDate,

      roomNo: req.body.roomNo,

      bedNo: req.body.bedNo,

      status: req.body.status,
    });

    await patient.save();

    res.json({
      success: true,

      message: "Patient Registered Successfully",

      patient,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,

      message: "Registration Failed",
    });
  }
});

// ======================
// Get All Patients
// ======================

// // Before Change The Code :

// app.get(
//   "/patients",

//   async (req, res) => {
//     const data = await Patient.find();

//     res.json(data);
//   },
// );

app.get("/patients", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      role: { $ne: "OPD" },

      name: {
        $regex: search,
        $options: "i",
      },
    };

    const patients = await Patient.find(query).skip(skip).limit(limit);

    const total = await Patient.countDocuments(query);

    res.json({
      patients,

      total,

      hasMore: skip + patients.length < total,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ======================
// Get Single Patient
// ======================

app.get(
  "/patient/:id",

  async (req, res) => {
    const data = await Patient.findById(req.params.id);

    res.json(data);
  },
);

// ======================
// Delete Patient
// ======================

app.delete(
  "/delete-patient/:id",

  async (req, res) => {
    try {
      await Patient.findByIdAndDelete(req.params.id);

      res.json({
        success: true,

        message: "Patient Deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },
);

// ======================
// Add Diagnostic
// ======================

app.post(
  "/add-diagnostic",

  upload.single("image"),

  async (req, res) => {
    try {
      const {
        patientId,

        patientName,

        age,

        gender,

        doctorName,

        scanName,

        findings,

        impression,

        amount,

        paymentStatus,

        email,
      } = req.body;

      // Image Path
      const imagePath = req.file.path.replace(
        /\\/g,

        "/",
      );

      // PDF Name
      const pdfName = `Diagnostic_${Date.now()}.pdf`;

      const pdfPath = `generated/${pdfName}`;

      // Create PDF
      const doc = new PDFDocument({
        margin: 50,
      });

      doc.pipe(fs.createWriteStream(pdfPath));

      // PDF Title
      doc

        .fontSize(22)

        .text(
          "Diagnostic Report",

          {
            align: "center",
          },
        );

      doc.moveDown();

      //       require("dotenv").config();

      // console.log("ENV URL =", process.env.MONGO_URL);
      // connectDB();

      // // mongoose.connection.once("open", () => {
      // //   console.log("Connected DB:", mongoose.connection.db.databaseName);
      // // });

      // Patient Details
      doc.fontSize(14);

      doc.text(`Patient Name: ${patientName}`);

      doc.text(`Age: ${age}`);

      doc.text(`Gender: ${gender}`);

      doc.text(`Doctor Name: ${doctorName}`);

      doc.text(`Scan Name: ${scanName}`);

      doc.moveDown();

      // Findings
      doc.fontSize(16).text("Findings");

      doc.fontSize(12).text(findings);

      doc.moveDown();

      // Impression
      doc.fontSize(16).text("Impression");

      doc.fontSize(12).text(impression);

      doc.moveDown();

      // Billing
      doc.text(`Amount: ₹${amount}`);

      doc.text(`Payment Status: ${paymentStatus}`);

      doc.moveDown();

      // Image
      doc.fontSize(16).text("Diagnostic Image");

      doc.moveDown();

      doc.image(
        imagePath,

        {
          width: 300,

          align: "center",
        },
      );

      // Footer
      doc.moveDown();

      doc
        .fontSize(10)

        .text(
          "Generated By HMS",

          {
            align: "center",
          },
        );

      // End PDF
      doc.end();

      // Save MongoDB
      const diagnostic = new Diagnostic({
        patientId,

        patientName,

        age,

        gender,

        doctorName,

        scanName,

        findings,

        impression,

        amount,

        paymentStatus,

        imagePath,

        pdfPath,
      });

      await diagnostic.save();

      // Send Email
      const mailOptions = {
        from: process.env.EMAIL_USER,

        to: email,

        subject: "Diagnostic Report",

        text: "Your diagnostic report attached.",

        attachments: [
          {
            filename: pdfName,

            path: path.join(__dirname, pdfPath),
          },
        ],
      };

      transporter.sendMail(
        mailOptions,

        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
          }
        },
      );

      // Response
      res.json({
        success: true,

        message: "Diagnostic Added",

        pdfUrl: `http://localhost:5000/${pdfPath}`,
      });
    } catch (error) {
      console.log(error);
    }
  },
);

// ======================
// Get Diagnostics
// ======================

app.get(
  "/diagnostics",

  async (req, res) => {
    const data = await Diagnostic.find();

    res.json(data);
  },
);

// ======================
// Delete Diagnostic
// ======================

app.delete(
  "/delete-diagnostic/:id",

  async (req, res) => {
    try {
      await Diagnostic.findByIdAndDelete(req.params.id);

      res.json({
        success: true,

        message: "Diagnostic Deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },
);

// ======================
// Merge PDFs
// ======================

app.post(
  "/send-email",

  upload.array("pdfs", 10),

  async (req, res) => {
    try {
      const {
        patientName,

        email,
      } = req.body;

      const uploadedFiles = req.files.map((file) => file.path);

      const mergedPath = `generated/merged_${Date.now()}.pdf`;

      await mergePDFs(
        uploadedFiles,

        mergedPath,
      );

      const bill = new Bill({
        patientName,

        email,

        pdfPath: mergedPath,
      });

      await bill.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,

        to: email,

        subject: "Merged Hospital Documents",

        text: "Your merged hospital documents attached.",

        attachments: [
          {
            filename: "Hospital_Report.pdf",

            path: path.join(__dirname, mergedPath),
          },
        ],
      };

      transporter.sendMail(
        mailOptions,

        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
          }
        },
      );

      res.json({
        success: true,

        message: "Merged PDF Sent",

        pdfUrl: `http://localhost:5000/${mergedPath}`,
      });
    } catch (error) {
      console.log(error);
    }
  },
);

// ======================
// Server
// ======================

app.listen(
  5000,

  () => {
    console.log("Server Running");
  },
);
