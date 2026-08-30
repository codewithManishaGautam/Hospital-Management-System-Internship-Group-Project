const Patient = require("../models/Patient");
const PharmacyBill = require("../models/PharmacyBill");
const InsuranceClaim = require("../models/insurance/InsuranceClaim");

const getPatientPdfData = async (req, res) => {
  try {
    const { patientId } = req.params;

    // =========================
    // Patient
    // =========================

    const patient = await Patient.findById(patientId).lean();

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // =========================
    // Pharmacy
    // =========================

    const pharmacyBills = await PharmacyBill.find({
      patientId: patient._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    // =========================
    // Doctor
    // =========================

    const prescriptionHistory = patient.prescriptionHistory || [];

    // =========================
    // Nurse
    // =========================

    const nurseData = {
      nurseNotes: patient.nurseNotes || "",
      vitals: patient.vitals || "",
    };

    // =========================
    // Insurance
    // =========================

    const insuranceClaims = await InsuranceClaim.find({
      patientId: patient._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,

      patient: {
        _id: patient._id,
        uhid: patient.uhid,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        mobile: patient.mobile,
        address: patient.address,
        disease: patient.disease,
      },

      pharmacy: {
        bills: pharmacyBills,
      },

      doctor: {
        prescriptionHistory,
      },

      nurse: nurseData,

      insurance: {
        status: patient.insuranceStatus || "",
        claimNumber: patient.claimNumber || "",
        claims: insuranceClaims,
      },
    });
  } catch (error) {
    console.error("Patient PDF Data Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPatientPdfData,
};
