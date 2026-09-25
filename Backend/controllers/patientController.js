const Patient = require("../models/Patient");

const Bed = require("../models/Bed");
const Room = require("../models/Room");
const Doctor = require("../models/Doctor");
const Staff = require("../models/Staff");
const Charge = require("../models/Charges");

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

    // ==============================
    // Create Patient
    // ==============================

    const patient = new Patient(req.body);

    await patient.save();

    console.log("Patient Created:", patient._id);
    console.log("Patient Room:", patient.roomNo);
    console.log("Patient Bed:", patient.bedNo);
    console.log("Patient Status:", patient.status);

    // ==============================
    // Mark Selected Bed Occupied
    // ==============================

    if (
      (patient.role === "IPD" || patient.role === "ICU") &&
      patient.status === "Admitted" &&
      patient.roomNo &&
      patient.bedNo
    ) {
      console.log("========== BED OCCUPATION STARTED ==========");
      console.log("Searching Room:", patient.roomNo);
      console.log("Searching Bed:", patient.bedNo);

      const occupiedBed = await Bed.findOneAndUpdate(
        {
          roomNumber: String(patient.roomNo).trim(),
          bedNo: String(patient.bedNo).trim(),
          status: "Available",
        },
        {
          $set: {
            status: "Occupied",
          },
        },
        {
          new: true,
        }
      );

      console.log("Occupied Bed Result:", occupiedBed);

      if (!occupiedBed) {
        await Patient.findByIdAndDelete(patient._id);

        return res.status(400).json({
          success: false,
          message:
            "Selected bed is no longer available or room/bed number does not match.",
        });
      }

      console.log("✅ BED SUCCESSFULLY MARKED OCCUPIED");

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

// Get Nurse Patients
// Get Nurse Patients
const getNursePatients = async (req, res) => {
  try {
    const patients = await Patient.find({
      role: { $ne: "OPD" },
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    console.error("GET NURSE PATIENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Nursing Report
const addNursingReport = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const report = {
      day: `Day ${patient.nursingReports.length + 1}`,

      bp: req.body.bp || "",

      pulse: req.body.pulse || "",

      temperature: req.body.temperature || "",

      spo2: req.body.spo2 || "",

      sugar: req.body.sugar || "",

      intake: req.body.intake || "",

      output: req.body.output || "",

      notes: req.body.notes || "",

      createdAt: new Date(),
    };

    patient.nursingReports.push(report);

    await patient.save();

    const savedReport =
      patient.nursingReports[patient.nursingReports.length - 1];

    res.status(201).json({
      success: true,
      message: "Daily nursing report saved successfully",
      data: savedReport,
    });
  } catch (error) {
    console.error("ADD NURSING REPORT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Nurse Handover Note
const addHandoverNote = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (!req.body.text || !req.body.text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Handover note is required",
      });
    }

    patient.handoverNotes.unshift({
      text: req.body.text.trim(),
    });

    await patient.save();

    res.status(201).json({
      success: true,
      message: "Handover note saved successfully",
      data: patient.handoverNotes[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Nurse Medicine Status
const updateNurseMedicineStatus = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const prescription =
      patient.prescriptionHistory[patient.prescriptionHistory.length - 1];

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    const medicine = prescription.medicines.id(req.params.medicineId);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    medicine.status = req.body.status;

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Medicine status updated successfully",
      data: medicine,
    });
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

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const oldRoom = patient.roomNo;
    const oldBed = patient.bedNo;
    const oldStatus = patient.status;

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
      req.body.doctor = doctor;

      if (req.body.doctorId) {
        req.body.doctorId = req.body.doctorId;
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
      req.body.diagnosis !== undefined ||
      req.body.prescription !== undefined ||
      req.body.advice !== undefined ||
      req.body.notes !== undefined ||
      req.body.signature !== undefined
    ) {
      patient.prescriptionHistory.push({
        diagnosis: req.body.diagnosis || "",
        prescription: req.body.prescription || "",
        advice: req.body.advice || "",
        notes: req.body.notes || "",
        signature: req.body.signature || "",

        referralDoctor:
          req.body.referralDoctor || {
            id: "",
            name: "",
            specialization: "",
          },

        visitDate: new Date(),

        medicines: req.body.medicines || [],

        labTests: req.body.labTests || [],

        paymentStatus: "Pending",
        paymentMode: "",
        billId: null,
        createdAt: new Date(),
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

    // ==============================
    // Occupy Assigned Bed
    // ==============================

    if (
      (patient.role === "IPD" || patient.role === "ICU") &&
      patient.status === "Admitted" &&
      patient.roomNo &&
      patient.bedNo
    ) {
      const occupiedBed = await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
          status: "Available",
        },
        {
          $set: {
            status: "Occupied",
          },
        },
        {
          new: true,
        },
      );


      if (
        !occupiedBed &&
        !(oldRoom === patient.roomNo && oldBed === patient.bedNo)
      ) {
        return res.status(400).json({
          success: false,
          message: "Selected bed is no longer available.",
        });
      }

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

    const latestPrescription =
      patient.prescriptionHistory[patient.prescriptionHistory.length - 1];

    console.log("Latest Prescription ID:", latestPrescription?._id);

    res.json({
      success: true,
      data: patient,
      prescriptionHistoryId: latestPrescription?._id || null,
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

    const { prescriptionHistoryId } = req.query;

    let prescription;

    if (prescriptionHistoryId) {
      prescription = patient.prescriptionHistory.id(prescriptionHistoryId);

      if (!prescription) {
        return res.status(404).json({
          message: "Prescription visit not found",
        });
      }
    } else {
      prescription =
        patient.prescriptionHistory[
        patient.prescriptionHistory.length - 1
        ];
    }

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
    drawContent(prescription.diagnosis);

    // ========================================
    // PRESCRIPTION
    // ========================================

    drawHeading("Prescription");
    drawContent(prescription.prescription);

    // ========================================
    // PRESCRIBED MEDICINES
    // ========================================

    drawHeading("Prescribed Medicines");

    if (
      prescription.medicines &&
      prescription.medicines.length > 0
    ) {
      prescription.medicines.forEach((medicine, index) => {
        doc
          .font("Helvetica-Bold")
          .fontSize(11)
          .fillColor(TEXT)
          .text(`${index + 1}. ${medicine.medicineName || "N/A"}`);

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(
            `Quantity: ${medicine.quantity || 0} | ` +
            `Price: ₹${medicine.price || 0} | ` +
            `Amount: ₹${medicine.amount || 0}`
          );

        if (medicine.timing) {
          doc.text(`Timing: ${medicine.timing}`);
        }

        if (medicine.dose) {
          doc.text(`Dose: ${medicine.dose}`);
        }

        doc.moveDown(0.7);
      });
    } else {
      drawContent("No medicines prescribed");
    }

    // ========================================
    // LAB TESTS
    // ========================================

    drawHeading("Prescribed Lab Tests");

    if (
      prescription.labTests &&
      prescription.labTests.length > 0
    ) {
      prescription.labTests.forEach((test, index) => {
        drawContent(`${index + 1}. ${test}`);
      });
    } else {
      drawContent("No lab tests prescribed");
    }

    // ========================================
    // ADVICE
    // ========================================

    drawHeading("Advice");
    drawContent(prescription.advice);

    // ========================================
    // DOCTOR NOTES
    // ========================================

    drawHeading("Doctor Notes");
    drawContent(prescription.notes);

    if (prescription.referralDoctor?.name) {
      drawHeading("Referred Doctor");

      drawContent(
        `Dr. ${prescription.referralDoctor.name}
Specialization : ${prescription.referralDoctor.specialization}`,
      );
    }

    // ========================================
    // DOCTOR SIGNATURE
    // ========================================

    drawHeading("Doctor Signature");

    doc.fillColor(TEXT);

    if (
      prescription.signature &&
      prescription.signature.startsWith("data:image")
    ) {
      const base64 = prescription.signature.replace(/^data:image\/\w+;base64,/, "");

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
        fs.unlink(pdfPath, () => { });
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateHospitalCharges = async (req, res) => {
  try {
    const { id } = req.params;
    const { chargeIds = [] } = req.body;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const charges = await Charge.find({
      _id: { $in: chargeIds },
    }).lean();

    patient.hospitalCharges = charges.map((charge) => ({
      chargeId: charge._id,
      chargeName: charge.chargeName,
      category: charge.category,
      amount: Number(charge.amount || 0),
    }));

    await patient.save();

    res.json({
      success: true,
      message: "Hospital charges updated successfully",
      hospitalCharges: patient.hospitalCharges,
    });
  } catch (error) {
    console.error("UPDATE HOSPITAL CHARGES ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Final Hospital Bill
// ==============================

const getFinalHospitalBill = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const dischargeDate =
      req.query.dischargeDate || patient.dischargeDate;

    const dischargeTime =
      req.query.dischargeTime || patient.dischargeTime || "23:59";

    if (!patient.admissionDate) {
      return res.status(400).json({
        success: false,
        message: "Admission date not available",
      });
    }

    if (!dischargeDate) {
      return res.status(400).json({
        success: false,
        message: "Discharge date is required",
      });
    }

    // -----------------------------
    // Calculate stay days
    // -----------------------------

    const admissionDateTime = new Date(
      `${patient.admissionDate}T${patient.admissionTime || "00:00"}`
    );

    const dischargeDateTime = new Date(
      `${dischargeDate}T${dischargeTime}`
    );

    if (isNaN(admissionDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid admission date/time",
      });
    }

    if (isNaN(dischargeDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid discharge date/time",
      });
    }

    if (dischargeDateTime < admissionDateTime) {
      return res.status(400).json({
        success: false,
        message: "Discharge date/time cannot be before admission date/time",
      });
    }

    const diffMs =
      dischargeDateTime.getTime() -
      admissionDateTime.getTime();

    const stayDays = Math.max(
      1,
      Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    );

    // -----------------------------
    // Room
    // -----------------------------

    const room = patient.roomNo
      ? await Room.findOne({
        roomNumber: patient.roomNo,
      })
      : null;

    const roomChargePerDay = Number(
      room?.chargesPerDay || 0
    );

    const roomTotal = roomChargePerDay * stayDays;

    // -----------------------------
    // Doctor
    // -----------------------------

    let doctor = null;

    if (patient.doctorId) {
      doctor = await Doctor.findById(patient.doctorId);
    }

    if (!doctor && patient.doctor) {
      doctor = await Doctor.findOne({
        name: patient.doctor,
      });
    }

    const doctorFee = Number(
      doctor?.fee || 0
    );

    const doctorTotal = doctorFee * stayDays;

    // -----------------------------
    // Hospital Charges
    // -----------------------------

    const allCharges = (patient.hospitalCharges || []).map(
      (charge) => ({
        _id: charge.chargeId,
        chargeId: charge.chargeId,
        chargeName: charge.chargeName || "",
        category: charge.category || "",
        amount: Number(charge.amount || 0),
      })
    );

    // Room / Bed / Doctor / Lab / Diagnostic / Pharmacy
    // are calculated or paid separately.
    // Therefore they must not be added again here.

    const charges = allCharges.filter((charge) => {
      const category = String(charge.category || "")
        .trim()
        .toLowerCase();

      return ![
        "room",
        "bed",
        "doctor",
        "consultation",
        "lab",
        "diagnostic",
        "pharmacy",
      ].includes(category);
    });

    const otherCharges = charges.reduce(
      (total, charge) =>
        total + Number(charge.amount || 0),
      0
    );

    // -----------------------------
    // Final Amount
    // -----------------------------

    const finalAmount =
      roomTotal +
      doctorTotal +
      otherCharges;

    return res.json({
      success: true,

      patient: {
        _id: patient._id,
        uhid: patient.uhid,
        name: patient.name,
        role: patient.role,
        roomNo: patient.roomNo,
        bedNo: patient.bedNo,
roomType: room?.roomType || patient.roomType || "N/A",
        doctor: patient.doctor,
        paymentStatus: patient.paymentStatus,
        status: patient.status,
      },

      admissionDate: patient.admissionDate,
      dischargeDate,
      dischargeTime,

      stayDays,

      room: room
        ? {
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          chargesPerDay: Number(room.chargesPerDay || 0),
        }
        : null,

      doctor,

      roomTotal,

      doctorFee,
      doctorTotal,

      charges,
      otherCharges,

      finalAmount,
    });

  } catch (error) {
    console.error(
      "Get Final Hospital Bill Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to calculate final hospital bill",
      error: error.message,
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



const updateInsuranceConfirm = async (req, res) => {
    try {
        const { id } = req.params;
        const { insuranceYesOrNot } = req.body;

        const patient = await Patient.findByIdAndUpdate(
            id,
            { insuranceYesOrNot },
            { new: true }
        );

        console.log(patient.insuranceYesOrNot)
        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json({
            message: "Insurance status updated successfully",
            patient
        });

    } catch (error) {
        console.error("Insurance update error:", error);

        res.status(500).json({
            message: "Failed to update insurance status",
            error: error.message
        });
    }
};


module.exports = {
  addPatient,
  getPatients,
  getNursePatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addNursingReport,
  addHandoverNote,
  updateNurseMedicineStatus,
  generatePrescriptionPDF,
  getFinalHospitalBill,
  updateHospitalCharges,
  updateInsuranceConfirm,
};