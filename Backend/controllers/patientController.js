const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const Room = require("../models/Room");
const Doctor = require("../models/Doctor");
const Staff = require("../models/Staff");

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

    const doctorData = await Doctor.findOne({
      name: doctor.replace(/^Dr\.\s*/i, "").trim(),
    });

    if (!doctorData) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    req.body.doctorId = doctorData._id;
    req.body.doctor = `Dr. ${doctorData.name}`;

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

    if (doctor) {
      const doctorData = await Doctor.findOne({
        name: doctor.replace(/^Dr\.\s*/i, "").trim(),
      });

      if (doctorData) {
        req.body.doctorId = doctorData._id;
        req.body.doctor = `Dr. ${doctorData.name}`;
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

        referralDoctor: req.body.referralDoctor || {
          id: "",
          name: "",
          specialization: "",
        },
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
      size: "A4",
      margin: 40,
    });

    const outputDir = path.join(__dirname, "../generated");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    const PRIMARY = "#1565C0";
    const LIGHT = "#EEF6FF";
    const BORDER = "#C7D9EC";
    const TEXT = "#222222";

    function drawHeading(title) {
      if (doc.y > 700) {
        doc.addPage();
        doc.y = 40;
      }

      const y = doc.y;

      doc.roundedRect(40, y, 515, 26, 6).fill(PRIMARY);

      doc
        .fillColor("white")
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(title, 55, y + 7);

      doc.y = y + 35;

      doc.fillColor(TEXT);
    }

    function drawContent(value) {
      doc.fillColor(TEXT);
      doc.font("Helvetica");
      doc.fontSize(12);

      if (
        value &&
        typeof value === "string" &&
        value.startsWith("data:image")
      ) {
        const base64 = value.replace(/^data:image\/\w+;base64,/, "");

        const imageBuffer = Buffer.from(base64, "base64");

        doc.image(imageBuffer, {
          fit: [300, 120],
          align: "left",
        });

        doc.moveDown(1);
      } else {
        doc.text(value || "N/A", {
          width: 500,
          align: "left",
        });

        doc.moveDown(1);
      }

      if (doc.y > 650) {
        doc.addPage();
        doc.y = 40;
      }
    }

    doc

      .font("Helvetica-Bold")

      .fontSize(24)

      .fillColor(PRIMARY)

      .text("SHRADDHA HOSPITAL", {
        align: "center",
      });

    doc

      .font("Helvetica")

      .fontSize(11)

      .fillColor(TEXT)

      .text("Daund", {
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

      .strokeColor(PRIMARY)

      .stroke();

    doc.moveDown();
    doc

      .font("Helvetica-Bold")

      .fontSize(15)

      .fillColor(PRIMARY)

      .text("Patient Details");

    doc.moveDown(0.4);

    const startY = doc.y;

    doc

      .rect(40, startY, 515, 180)

      .fillAndStroke(LIGHT, BORDER);

    doc.y = startY + 12;

    doc.x = 55;

    doc.fillColor(TEXT);

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

    doc.font("Helvetica").text(patient.doctor || "N/A");

    // doc.font("Helvetica-Bold").text("Date : ", {

    // continued: true,

    // });

    // doc.font("Helvetica-Bold").text("Doctor : ", {
    //   continued: true,
    // });

    // doc.font("Helvetica").text(patient.doctor || "N/A");

    // ADD THIS
    doc.font("Helvetica-Bold").text("Disease : ", {
      continued: true,
    });

    doc.font("Helvetica").text(patient.disease || "N/A");

    // Date
    doc.font("Helvetica-Bold").text("Date : ", {
      continued: true,
    });

    doc

      .font("Helvetica")

      .text(new Date().toLocaleDateString("en-IN"));

    doc.y = startY + 195;

    // ========================================
    // DIAGNOSIS
    // ========================================

    drawHeading("Diagnosis");
    drawContent(latest.diagnosis);

    // ========================================
    // PRESCRIPTION
    // ========================================

    drawHeading("Prescription");
    drawContent(latest.prescription);

    // ========================================
    // ADVICE
    // ========================================

    drawHeading("Advice");
    drawContent(latest.advice);

    // ========================================
    // DOCTOR NOTES
    // ========================================

    drawHeading("Doctor Notes");
    drawContent(latest.notes);

    if (latest.referralDoctor?.name) {
      drawHeading("Referred Doctor");

      drawContent(
        `Dr. ${latest.referralDoctor.name}
Specialization : ${latest.referralDoctor.specialization}`,
      );
    }

    // ========================================
    // DOCTOR SIGNATURE
    // ========================================

    drawHeading("Doctor Signature");

    doc.fillColor(TEXT);

    if (latest.signature && latest.signature.startsWith("data:image")) {
      const base64 = latest.signature.replace(/^data:image\/\w+;base64,/, "");

      const imageBuffer = Buffer.from(base64, "base64");

      doc.image(imageBuffer, {
        fit: [140, 60],
        align: "right",
      });

      doc.moveDown(4);
    } else {
      doc.font("Helvetica").fontSize(12).text("No Signature");

      doc.moveDown(2);
    }

    // ========================================
    // FOOTER
    // ========================================

    doc.moveDown();

    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#cccccc").stroke();

    doc.moveDown(0.6);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#666666")
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
      res.download(pdfPath, () => {
        fs.unlink(pdfPath, () => {});
      });
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
