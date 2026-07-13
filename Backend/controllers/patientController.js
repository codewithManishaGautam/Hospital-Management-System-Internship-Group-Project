const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const Room = require("../models/Room");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Add Patient
const addPatient = async (req, res) => {
  try {
    // VALIDATION

    const { uhid, name, age, gender, mobile, address, doctor, disease, role } =
      req.body;

    // Name
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Patient name must be at least 3 characters.",
      });
    }

    // Mobile
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number.",
      });
    }

    // Age
    if (!age || age < 1 || age > 120) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 1 and 120.",
      });
    }

    // Gender
    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Please select gender.",
      });
    }

    // Address
    if (!address || address.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid address.",
      });
    }

    // Disease
    if (!disease || disease.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter disease/complaint.",
      });
    }

    // Doctor
    if (!doctor || doctor.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Please enter doctor name.",
      });
    }

    // UHID
    if (!uhid) {
      return res.status(400).json({
        success: false,
        message: "UHID is required.",
      });
    }

    // Patient Type
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Please select patient type.",
      });
    }

    // duplicate phone
    const existingPatient = await Patient.findOne({ mobile });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "Patient already registered with this mobile number.",
      });
    }

    // duplicate UHID
    const existingUHID = await Patient.findOne({ uhid });

    if (existingUHID) {
      return res.status(400).json({
        success: false,
        message: "UHID already exists.",
      });
    }

    const patient = new Patient(req.body);

    console.log(req.body.signature);
    console.log(req.body.diagnosis);
    console.log(req.body.prescription);

    await patient.save();

    if (patient.status === "Admitted" && patient.bedNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Occupied",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    res.status(201).json({
      success: true,
      message: "Patient Added Successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 }).lean();

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Patient
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Patient
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    const oldRoom = patient.roomNo;
    const oldBed = patient.bedNo;
    const oldStatus = patient.status;

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const { uhid, name, age, gender, mobile, address, doctor, disease, role } =
      req.body;

    const isPrescriptionUpdate =
      req.body.diagnosis !== undefined ||
      req.body.prescription !== undefined ||
      req.body.advice !== undefined ||
      req.body.notes !== undefined ||
      req.body.signature !== undefined;

    if (!isPrescriptionUpdate) {
      // validation

      // name
      if (!name || name.trim().length < 3) {
        return res.status(400).json({
          success: false,
          message: "Patient name must be at least 3 characters.",
        });
      }

      // mobile
      // Mobile
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({
          success: false,
          message: "Invalid mobile number.",
        });
      }

      // duplicate mobile
      const existingPatient = await Patient.findOne({
        mobile,
        _id: { $ne: req.params.id },
      });

      if (existingPatient) {
        return res.status(400).json({
          success: false,
          message: "Mobile number already exists.",
        });
      }

      // duplicate UHID
      const existingUHID = await Patient.findOne({
        uhid,
        _id: { $ne: req.params.id },
      });

      if (existingUHID) {
        return res.status(400).json({
          success: false,
          message: "UHID already exists.",
        });
      }

      // Age
      if (!age || age < 1 || age > 120) {
        return res.status(400).json({
          success: false,
          message: "Age must be between 1 and 120.",
        });
      }

      // Address
      if (!address || address.trim().length < 5) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid address.",
        });
      }

      // Doctor
      if (!doctor || doctor.trim().length < 3) {
        return res.status(400).json({
          success: false,
          message: "Please enter doctor name.",
        });
      }

      // Disease
      if (!disease || disease.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Please enter disease/complaint.",
        });
      }

      // Gender
      if (!gender) {
        return res.status(400).json({
          success: false,
          message: "Please select gender.",
        });
      }

      // Role
      if (!role) {
        return res.status(400).json({
          success: false,
          message: "Please select patient type.",
        });
      }
    }

    Object.keys(req.body).forEach((key) => {
      patient[key] = req.body[key];
    });

    if (req.body.newAppointment) {
      patient.appointmentHistory.push({
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        doctor: req.body.doctor,
        disease: req.body.disease,
        fee: req.body.fee || 500,
        paymentStatus: "Pending",
        paymentMode: "Cash",
        status: "Waiting Doctor",
      });
    }

    if (
      req.body.diagnosis ||
      req.body.prescription ||
      req.body.advice ||
      req.body.notes ||
      req.body.signature
    ) {
      patient.prescriptionHistory.push({
        diagnosis: req.body.diagnosis || "",
        prescription: req.body.prescription || "",
        advice: req.body.advice || "",
        notes: req.body.notes || "",
        signature: req.body.signature || "",
      });
    }

    console.log("Diagnosis:", patient.diagnosis);
    console.log("Prescription:", patient.prescription);
    console.log("Advice:", patient.advice);
    console.log("Notes:", patient.notes);

    console.log(patient.prescriptionHistory);

    // Patient Shift
    if (oldBed && (oldBed !== patient.bedNo || oldRoom !== patient.roomNo)) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: oldRoom,
          bedNo: oldBed,
        },
        {
          status: "Available",
        },
      );

      await updateRoomStatus(oldRoom);
    }

    // Admit
    if (patient.status === "Admitted" && patient.bedNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Occupied",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    // Discharge
    if (oldStatus !== "Discharged" && patient.status === "Discharged") {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Available",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    await patient.save();

    console.log("After Save");

    const updatedPatient = await Patient.findById(req.params.id);

    console.log(updatedPatient.prescriptionHistory);

    res.json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (patient.status === "Admitted") {
      return res.status(400).json({
        success: false,
        message:
          "Admitted patient cannot be deleted. Please discharge the patient first.",
      });
    }

    // Free bed if patient was admitted
    if (patient.bedNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Available",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    await Patient.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Patient Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generatePrescriptionPDF = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    if (!patient.prescriptionHistory.length) {
      return res.status(400).json({
        message: "No prescription found",
      });
    }

    const latest =
      patient.prescriptionHistory[patient.prescriptionHistory.length - 1];

    const pdfName = `Prescription_${patient.uhid}.pdf`;
    const pdfPath = path.join(__dirname, "../generated", pdfName);

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    // ==========================
    // HOSPITAL HEADER
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#0d6efd")
      .text("Shraddha Hospital", {
        align: "center",
      });

    doc.font("Helvetica").fontSize(11).fillColor("black").text("Daund", {
      align: "center",
    });

    doc.text("Phone : 9999999999", {
      align: "center",
    });

    doc.text("Email : shraddhahospital@gmail.com", {
      align: "center",
    });

    doc.moveDown(0.5);

    doc
      .moveTo(40, doc.y)
      .lineTo(555, doc.y)
      .lineWidth(2)
      .strokeColor("#0d6efd")
      .stroke();

    doc.moveDown();

    // ==========================
    // PATIENT DETAILS
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#0d6efd")
      .text("Patient Details");

    doc.moveDown(0.4);

    const startY = doc.y;

    doc.rect(40, startY, 515, 150).lineWidth(1).strokeColor("#0d6efd").stroke();

    doc.y = startY + 10;
    doc.x = 50;

    doc.fillColor("black");

    doc.font("Helvetica-Bold").text("Patient Name : ", {
      continued: true,
    });
    doc.font("Helvetica").text(patient.name);

    doc.font("Helvetica-Bold").text("UHID : ", {
      continued: true,
    });
    doc.font("Helvetica").text(patient.uhid);

    doc.font("Helvetica-Bold").text("Age : ", {
      continued: true,
    });
    doc.font("Helvetica").text(String(patient.age));

    doc.font("Helvetica-Bold").text("Gender : ", {
      continued: true,
    });
    doc.font("Helvetica").text(patient.gender);

    doc.font("Helvetica-Bold").text("Doctor : ", {
      continued: true,
    });
    doc.font("Helvetica").text(patient.doctor);

    // Date
    doc.font("Helvetica-Bold").text("Date : ", {
      continued: true,
    });
    doc.font("Helvetica").text(new Date().toLocaleDateString("en-IN"));

    doc.y = startY + 165;

    // ==========================
    // Diagnosis
    // ==========================

    doc.rect(40, doc.y, 515, 22).fill("#0d6efd");

    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Diagnosis", 50, doc.y - 18);

    doc.moveDown();

    doc.fillColor("black");
    doc.font("Helvetica");
    doc.moveDown(0.3);

    doc.fillColor("black").font("Helvetica").fontSize(12);

    if (latest.diagnosis && latest.diagnosis.startsWith("data:image")) {
      const base64 = latest.diagnosis.replace(/^data:image\/\w+;base64,/, "");

      doc.image(Buffer.from(base64, "base64"), {
        fit: [300, 120],
        align: "left",
      });
    } else {
      doc.text(latest.diagnosis || "N/A");
    }

    doc.moveDown();

    // ==========================
    // Prescription
    // ==========================

    doc.rect(40, doc.y, 515, 22).fill("#0d6efd");

    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Prescription", 50, doc.y - 18);

    doc.moveDown();

    doc.fillColor("black");
    doc.font("Helvetica");

    doc.moveDown();

    doc.fillColor("black");
    doc.font("Helvetica");

    doc.moveDown(0.3);

    doc.fillColor("black").font("Helvetica").fontSize(12);

    if (latest.prescription && latest.prescription.startsWith("data:image")) {
      const base64 = latest.prescription.replace(
        /^data:image\/\w+;base64,/,
        "",
      );

      doc.image(Buffer.from(base64, "base64"), {
        fit: [300, 120],
        align: "left",
      });
    } else {
      doc.text(latest.prescription || "N/A");
    }

    doc.moveDown();

    // ==========================
    // Advice
    // ==========================

    doc.rect(40, doc.y, 515, 22).fill("#0d6efd");

    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Advice", 50, doc.y - 18);

    doc.moveDown();

    doc.fillColor("black");
    doc.font("Helvetica");

    doc.moveDown(0.3);

    doc.fillColor("black").font("Helvetica").fontSize(12);

    if (latest.advice && latest.advice.startsWith("data:image")) {
      const base64 = latest.advice.replace(/^data:image\/\w+;base64,/, "");

      doc.image(Buffer.from(base64, "base64"), {
        fit: [300, 120],
        align: "left",
      });
    } else {
      doc.text(latest.advice || "N/A");
    }

    doc.moveDown();

    // ==========================
    // Doctor Notes
    // ==========================

    doc.rect(40, doc.y, 515, 22).fill("#0d6efd");
    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Doctor Notes", 50, doc.y - 18);

    doc.moveDown();

    doc.fillColor("black");
    doc.font("Helvetica");

    doc.moveDown(0.3);

    doc.fillColor("black").font("Helvetica").fontSize(12);

    if (latest.notes && latest.notes.startsWith("data:image")) {
      const base64 = latest.notes.replace(/^data:image\/\w+;base64,/, "");

      doc.image(Buffer.from(base64, "base64"), {
        fit: [300, 120],
        align: "left",
      });
    } else {
      doc.text(latest.notes || "N/A");
    }

    doc.moveDown();

    // ==========================
    // Signature
    // ==========================

    doc.rect(40, doc.y, 515, 22).fill("#0d6efd");

    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Doctor Signature", 50, doc.y - 18);

    doc.moveDown();

    doc.fillColor("black");

    doc.moveDown(0.5);

    if (latest.signature) {
      const base64 = latest.signature.replace(/^data:image\/\w+;base64,/, "");

      doc.image(Buffer.from(base64, "base64"), 380, doc.y, {
        fit: [140, 60],
      });
    }

    doc.moveDown(2);

    doc.moveDown(2);

    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#cccccc").stroke();

    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("gray")
      .text("Shraddha Hospital | Daund | Phone : 9999999999", {
        align: "center",
      });

    doc.text("Email : shraddhahospital@gmail.com", {
      align: "center",
    });

    doc.moveDown(0.3);

    doc
      .font("Helvetica-Oblique")
      .text("Generated by Hospital Management System", {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => {
      res.download(pdfPath);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateRoomStatus = async (roomNumber) => {
  if (!roomNumber) return;

  const beds = await Bed.find({ roomNumber });

  const hasAvailable = beds.some((bed) => bed.status === "Available");

  await Room.findOneAndUpdate(
    { roomNumber },
    {
      status: hasAvailable ? "Available" : "Occupied",
    },
  );
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  generatePrescriptionPDF,
};
