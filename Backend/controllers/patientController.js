const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const Room = require("../models/Room");

// Add Patient
const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);

    console.log(req.body.signature);
    console.log(req.body.diagnosis);
    console.log(req.body.prescription);

    await patient.save();

    if (patient.status === "Admitted" && patient.bedNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Occupied",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

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
    const patients = await Patient.find().sort({ createdAt: -1 }).lean();

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
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    const oldRoom = patient.roomNo;
    const oldBed = patient.bedNo;
    const oldStatus = patient.status;

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    Object.keys(req.body).forEach((key) => {
      patient[key] = req.body[key];
    });

    if (req.body.newAppointment) {
      patient.appointmentHistory.push({
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        doctor: req.body.doctor,
        disease: req.body.disease,
        fee: req.body.fee || 500,
        paymentStatus: "Pending",
        paymentMode: "Cash",
        status: "Waiting Doctor",
      });
    }

    if (
      req.body.diagnosis ||
      req.body.prescription ||
      req.body.advice ||
      req.body.notes ||
      req.body.signature
    ) {
      patient.prescriptionHistory.push({
        diagnosis: req.body.diagnosis || "",
        prescription: req.body.prescription || "",
        advice: req.body.advice || "",
        notes: req.body.notes || "",
        signature: req.body.signature || "",
      });
    }

    console.log("Diagnosis:", patient.diagnosis);
    console.log("Prescription:", patient.prescription);
    console.log("Advice:", patient.advice);
    console.log("Notes:", patient.notes);

    console.log(patient.prescriptionHistory);

    // Patient Shift
    if (oldBed && (oldBed !== patient.bedNo || oldRoom !== patient.roomNo)) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: oldRoom,
          bedNo: oldBed,
        },
        {
          status: "Available",
        },
      );

      await updateRoomStatus(oldRoom);
    }

    // Admit
    if (patient.status === "Admitted" && patient.bedNo) {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Occupied",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    // Discharge
    if (oldStatus !== "Discharged" && patient.status === "Discharged") {
      await Bed.findOneAndUpdate(
        {
          roomNumber: patient.roomNo,
          bedNo: patient.bedNo,
        },
        {
          status: "Available",
        },
      );

      await updateRoomStatus(patient.roomNo);
    }

    await patient.save();

    console.log("After Save");

    const updatedPatient = await Patient.findById(req.params.id);

    console.log(updatedPatient.prescriptionHistory);

    res.json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      message: "Patient Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRoomStatus = async (roomNumber) => {
  if (!roomNumber) return;

  const beds = await Bed.find({ roomNumber });

  const hasAvailable = beds.some((bed) => bed.status === "Available");

  await Room.findOneAndUpdate(
    { roomNumber },
    {
      status: hasAvailable ? "Available" : "Occupied",
    },
  );
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
