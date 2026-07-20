const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
let SentPrescription;
try {
  SentPrescription = require("../models/SentPrescription");
} catch (e) {
  // model may not exist in some environments; fallback handled below
}

const normalizePrescriptionPayload = (payload = {}) => {
  // Frontend can send:
  // - lab: {required, tests, testType}
  // - scan: {required, scans, scanType}
  // Older code may send different shapes.
  const prescriptionText =
    payload.prescription ||
    payload.prescriptionText ||
    payload.medicines ||
    "";

  const rawLab = payload.lab || {};
  const rawScan = payload.scan || {};

  const normalizedLab = {
    required: Boolean(rawLab.required ?? rawLab.testType ?? rawLab.tests),
    tests: Array.isArray(rawLab.tests) ? rawLab.tests : Array.isArray(rawLab.testList) ? rawLab.testList : (rawLab.testType ? [rawLab.testType] : []),
    testType: rawLab.testType || (Array.isArray(rawLab.tests) ? rawLab.tests.join(", ") : rawLab.testType) || null,
  };

  const normalizedScan = {
    required: Boolean(rawScan.required ?? rawScan.scanType ?? rawScan.scans),
    scans: Array.isArray(rawScan.scans) ? rawScan.scans : Array.isArray(rawScan.scanList) ? rawScan.scanList : (rawScan.scanType ? [rawScan.scanType] : []),
    scanType: rawScan.scanType || (Array.isArray(rawScan.scans) ? rawScan.scans.join(", ") : rawScan.scanType) || null,
  };

  return {
    diagnosis: payload.diagnosis || payload.diagnosisText || "",
    // Ensure string for storage/printing
    prescription:
      typeof prescriptionText === "string"
        ? prescriptionText
        : JSON.stringify(prescriptionText || {}),
    advice: payload.advice || payload.instructions || "",
    notes: payload.notes || "",
    signature: payload.signature || "",
    patientUHID: payload.patientUHID || payload.uhid || payload.patientId || "",
    doctorId: payload.doctorId || "",
    doctorName: payload.doctorName || payload.doctor || "",
    lab: normalizedLab,
    scan: normalizedScan,
    createdAt: payload.createdAt || new Date().toISOString(),
    ...payload,
  };
};

const attachPrescriptionToPatient = async (payload) => {
  const patientUHID = payload.patientUHID || payload.uhid || payload.patientId || "";
  if (!patientUHID) return null;

  try {
    const patient = await Patient.findOne({ uhid: patientUHID });
    if (!patient) return null;

    patient.prescriptionHistory.push({
      diagnosis: payload.diagnosis || "",
      prescription: payload.prescription || "",
      advice: payload.advice || "",
      notes: payload.notes || "",
      signature: payload.signature || "",
      doctorId: payload.doctorId || "",
      doctorName: payload.doctorName || "",
      lab: payload.lab || { required: false, testType: null },
      scan: payload.scan || { required: false, scanType: null },
      createdAt: new Date(),
    });

    await patient.save();
    return patient;
  } catch (error) {
    console.warn("Doctor prescription patient update failed:", error.message);
    return null;
  }
};

// Get all doctors for profile dashboard
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("name specialization qualification experience phone");
    return res.status(200).json({
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};

// Get single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      message: "Doctor fetched successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching doctor",
      error: error.message,
    });
  }
};

const addDoctorPrescription = async (req, res) => {
  // Payload from frontend PrescriptionForm.jsx
  // { patientUHID, diagnosis, prescription, advice, notes, signature, doctorId, lab{required,testType}, scan{required,scanType}, createdAt }
  const payload = normalizePrescriptionPayload(req.body || {});

  global.__doctorPrescriptions = global.__doctorPrescriptions || [];

  const saved = {
    id: String(Date.now()),
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  global.__doctorPrescriptions.push(saved);

  let patientRecord = null;
  if (payload.patientUHID) {
    patientRecord = await attachPrescriptionToPatient(payload);
  }

  return res.status(201).json({
    message: "Prescription saved successfully",
    data: saved,
    patientUpdated: Boolean(patientRecord),
  });
};

// Send prescription to another department or referral doctor.
const sendPrescription = (req, res) => {
  const { target, prescription } = req.body || {};
  const basePrescription = prescription || {};
  const normalizedPrescription = {
    ...basePrescription,
    ...req.body,
    diagnosis: basePrescription.diagnosis || req.body.diagnosis || "",
    prescription: basePrescription.prescription || req.body.prescription || basePrescription.medicines || "",
    advice: basePrescription.advice || req.body.advice || basePrescription.instructions || req.body.instructions || "",
    notes: basePrescription.notes || req.body.notes || "",
    signature: basePrescription.signature || req.body.signature || "",
    patientUHID: basePrescription.patientUHID || req.body.patientUHID || req.body.uhid || "",
    doctorId: basePrescription.doctorId || req.body.doctorId || "",
    doctorName: basePrescription.doctorName || req.body.doctorName || "",
    createdAt: basePrescription.createdAt || req.body.createdAt || new Date().toISOString(),
    medicines: basePrescription.medicines || req.body.medicines || [],
    lab: basePrescription.lab || req.body.lab || {},
    scan: basePrescription.scan || req.body.scan || {},
    referralDoctor: basePrescription.referralDoctor || req.body.referralDoctor || {
      id: req.body.referralDoctorId || "",
      name: req.body.referralDoctorName || "",
    },
  };

  const allowed = ["lab", "pharmacy", "nurse", "referralDoctor"];
  if (!target || !allowed.includes(target)) {
    return res.status(400).json({ message: "Invalid send target" });
  }

  // Attempt to persist to MongoDB if model available
  if (SentPrescription) {
    SentPrescription.create({ target, prescription: normalizedPrescription })
      .then((doc) => {
        // Send notification email (if configured)
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
          });

          const targetEmails = {
            lab: process.env.LAB_EMAIL,
            pharmacy: process.env.PHARMACY_EMAIL,
            nurse: process.env.NURSE_EMAIL,
          };

          const to = targetEmails[target];
          if (to) {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to,
              subject: `New Prescription sent to ${target}`,
              text: `A new prescription was sent to ${target} at ${new Date().toLocaleString()}\n\nSummary:\n${JSON.stringify(normalizedPrescription, null, 2)}`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) console.warn('Email send failed:', err.message);
            });
          }
        } catch (err) {
          // ignore email errors
          console.warn('Notification send error', err.message);
        }

        return res.status(200).json({ message: `Prescription sent to ${target}`, data: doc });
      })
      .catch((err) => {
        console.error('DB save failed, falling back to memory:', err.message);
    global.__sentPrescriptions = global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [], referralDoctor: [] };
    global.__sentPrescriptions[target] = global.__sentPrescriptions[target] || [];

        const entry = {
          id: String(Date.now()),
          target,
          prescription: normalizedPrescription || {},
          receivedAt: new Date().toISOString(),
        };

        global.__sentPrescriptions[target].push(entry);

        return res.status(200).json({ message: `Prescription queued (in-memory) for ${target}`, data: entry });
      });
  }

  // Fallback: in-memory queue if DB/model not available
  global.__sentPrescriptions = global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [], referralDoctor: [] };
  global.__sentPrescriptions[target] = global.__sentPrescriptions[target] || [];

  const entry = {
    id: String(Date.now()),
    target,
    prescription: normalizedPrescription || {},
    receivedAt: new Date().toISOString(),
  };

  global.__sentPrescriptions[target].push(entry);

  return res.status(200).json({ message: `Prescription queued (in-memory) for ${target}`, data: entry });
};

module.exports = {
  addDoctorPrescription,
  sendPrescription,
  getAllDoctors,
  getDoctorById,
};

