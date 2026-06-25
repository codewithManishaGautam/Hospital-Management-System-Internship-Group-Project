const Doctor = require("../models/Doctor");

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

module.exports = {
  addDoctorPrescription,
  getAllDoctors,
  getDoctorById,
};

