const Patient = require("../models/Patient");

// Add Patient
const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);

    console.log(req.body.signature);
    console.log(req.body.diagnosis);
    console.log(req.body.prescription);

    await patient.save();

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
    const patients = await Patient.find().sort({ createdAt: -1 });

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
// Update Patient
const updatePatient = async (req, res) => {

  console.log("===============");
  console.log("UPDATE API CALLED");
  console.log(req.body);
  console.log("===============");

  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    console.log("Diagnosis =", req.body.diagnosis);
console.log("Prescription =", req.body.prescription);
console.log("Advice =", req.body.advice);
console.log("Notes =", req.body.notes);
console.log("Signature =", req.body.signature);

    // New prescription history entry
    patient.prescriptionHistory.push({
      diagnosis: req.body.diagnosis || "",
      prescription: req.body.prescription || "",
      advice: req.body.advice || "",
      notes: req.body.notes || "",
      signature: req.body.signature || "",
      createdAt: new Date(),
    });

    await patient.save();

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Patient Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
