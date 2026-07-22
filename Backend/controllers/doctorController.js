const Patient = require("../models/Patient");

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

module.exports = {
  getDoctorPatients,
};
