const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Staff = require("../models/Staff");

const getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const patients = await Patient.find({
      doctorId,
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

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ name: 1 });

    res.json({
      success: true,
      doctors,
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
    const doctorId = req.params.doctorId;

    const today = new Date().toISOString().split("T")[0];

    const patients = await Patient.find({
      doctorId,
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
    const doctorId = req.params.doctorId;

    const today = new Date().toISOString().split("T")[0];

    const patients = await Patient.find({
      doctorId,
      appointmentDate: { $lt: today },
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
    console.log("Doctor Name =", req.params.name);

    const doctor = await Doctor.findById(req.params.id);

    console.log("Doctor Found =", doctor);

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
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const oldDoctor = await Doctor.findById(req.params.id);

    if (!oldDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Update all patients
    await Patient.updateMany(
      {
        doctorId: doctor._id,
      },
      {
        $set: {
          doctor: `Dr. ${doctor.name}`,
        },
      },
    );

    // Update Staff
    await Staff.findOneAndUpdate(
      {
        role: "doctor",
        mobile: oldDoctor.mobile,
      },
      {
        $set: {
          name: doctor.name,
          mobile: doctor.mobile,
        },
      },
    );

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
  getDoctors,
  getDoctorPatients,
  getTodayPatients,
  getHistoryPatients,
  getDoctorProfile,
  updateDoctorProfile,
};
