const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const getDoctorPatients = async (req, res) => {
  try {
    const doctor = req.params.doctor;

    console.log("Doctor Param :", doctor);

    const patients = await Patient.find({
      doctor: {
        $regex: new RegExp(`^${doctor}$`, "i"),
      },
    });

    console.log("Patients Found :", patients.length);
    console.log(patients);

    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Today's Patients
const getTodayPatients = async (req, res) => {
  try {
    const doctor = req.params.doctor;

    const today = new Date().toLocaleDateString("en-CA");

    const patients = await Patient.find({
      doctor: {
        $regex: new RegExp(`^${doctor}$`, "i"),
      },
      appointmentDate: today,
    });

    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Previous / History Patients
const getHistoryPatients = async (req, res) => {
  try {
    const doctor = req.params.doctor;

    const today = new Date().toLocaleDateString("en-CA");

    const patients = await Patient.find({
      doctor: {
        $regex: new RegExp(`^${doctor}$`, "i"),
      },
      appointmentDate: { $lt: today },
      paymentStatus: "Paid",
    });

    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      name: req.params.name,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      doctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDoctorPatients,
  getTodayPatients,
  getHistoryPatients,
  getDoctorProfile,
  updateDoctorProfile,
};
