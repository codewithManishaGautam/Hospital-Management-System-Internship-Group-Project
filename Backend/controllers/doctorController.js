const Doctor = require("../models/Doctor");
let SentPrescription;
try {
  SentPrescription = require("../models/SentPrescription");
} catch (e) {
  // model may not exist in some environments; fallback handled below
}

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

const addDoctorPrescription = (req, res) => {
  // Payload from frontend PrescriptionForm.jsx
  // { patientUHID, medicines, instructions, doctorId, lab{required,testType}, scan{required,scanType}, createdAt }
  const payload = req.body || {};

  // Simple in-memory store (backend models are not wired in this project yet)
  global.__doctorPrescriptions = global.__doctorPrescriptions || [];

  const saved = {
    id: String(Date.now()),
    ...payload,
  };

  global.__doctorPrescriptions.push(saved);

  return res.status(201).json({
    message: "Prescription saved successfully",
    data: saved,
  });
};

// Send prescription to another department (lab/pharmacy/nurse)
const sendPrescription = (req, res) => {
  const { target, prescription } = req.body || {};

  const allowed = ["lab", "pharmacy", "nurse"];
  if (!target || !allowed.includes(target)) {
    return res.status(400).json({ message: "Invalid send target" });
  }

  // Attempt to persist to MongoDB if model available
  if (SentPrescription) {
    SentPrescription.create({ target, prescription })
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
              text: `A new prescription was sent to ${target} at ${new Date().toLocaleString()}\n\nSummary:\n${JSON.stringify(prescription, null, 2)}`,
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
        global.__sentPrescriptions = global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [] };

        const entry = {
          id: String(Date.now()),
          target,
          prescription: prescription || {},
          receivedAt: new Date().toISOString(),
        };

        global.__sentPrescriptions[target].push(entry);

        return res.status(200).json({ message: `Prescription queued (in-memory) for ${target}`, data: entry });
      });
  }

  // Fallback: in-memory queue if DB/model not available
  global.__sentPrescriptions = global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [] };

  const entry = {
    id: String(Date.now()),
    target,
    prescription: prescription || {},
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

