const mongoose = require("mongoose");
const SentPrescription = require("../models/SentPrescription");
const Patient = require("../models/Patient");

const sendPrescription = async (req, res) => {
  try {
    const { target, prescription, prescriptionHistoryId } = req.body;

    const patientId = prescription?.patientId;

    if (!patientId || !target || !prescriptionHistoryId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Target or Prescription History ID missing",
      });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const prescriptionHistory = patient.prescriptionHistory.id(
      prescriptionHistoryId,
    );

    if (!prescriptionHistory) {
      return res.status(404).json({
        success: false,
        message: "Prescription history not found",
      });
    }

    if (target === "pharmacy") {
      const medicines = prescriptionHistory.medicines || [];

      if (!Array.isArray(medicines) || medicines.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No medicines selected. Prescription not sent to pharmacy.",
        });
      }
    }

    const data = new SentPrescription({
      target,
      patientId: patient._id,
      prescriptionHistoryId,
      prescription: {
        patientId: patient._id,
        patientUHID: patient.uhid,
        patientName: patient.name,
        age: patient.age,
        gender: patient.gender,
        doctor: patient.doctor,

        diagnosis: prescriptionHistory.diagnosis,
        prescription: prescriptionHistory.prescription,
        advice: prescriptionHistory.advice,
        notes: prescriptionHistory.notes,
        signature: prescriptionHistory.signature,

        referralDoctor: prescriptionHistory.referralDoctor,

        visitDate: prescriptionHistory.visitDate,

        medicines: prescriptionHistory.medicines || [],
      },
      status: "Pending",
    });

    await data.save();

    res.json({
      success: true,
      message: "Prescription Sent Successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLatestPatientPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).lean();

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (
      !patient.prescriptionHistory ||
      patient.prescriptionHistory.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found for this patient",
      });
    }

    const latestPrescription =
      patient.prescriptionHistory[patient.prescriptionHistory.length - 1];

    res.status(200).json({
      success: true,
      data: {
        patientId: patient._id,
        patientUHID: patient.uhid,
        patientName: patient.name,
        age: patient.age,
        gender: patient.gender,
        mobile: patient.mobile,
        address: patient.address,
        doctor: patient.doctor,

        ...latestPrescription,
      },
    });
  } catch (error) {
    console.log("Get Latest Prescription Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendPrescription,
  getLatestPatientPrescription,
};
