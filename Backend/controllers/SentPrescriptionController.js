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

module.exports = {
  sendPrescription,
};
