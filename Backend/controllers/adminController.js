const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const User = require("../models/User");
const Staff = require("../models/Staff");

const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();

    const totalStaff = await Staff.countDocuments();

    const totalPatients = await Patient.countDocuments();

    const admittedPatients = await Patient.countDocuments({
      status: "Admitted",
    });

    const dischargedPatients = await Patient.countDocuments({
      status: "Discharged",
    });

    res.status(200).json({
      totalDoctors,
      totalStaff,
      totalPatients,
      admittedPatients,
      dischargedPatients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// let doctors = [
//   {
//     id: 1,
//     name: "Dr. Sharma",
//     specialization: "Cardiologist",
//     qualification: "MBBS, MD",
//     experience: "10 years",
//     phone: "1111111111",
//   },

//   {
//     id: 2,
//     name: "Dr. Mehta",
//     specialization: "Neurologist",
//     qualification: "MBBS, MD",
//     experience: "5 years",
//     phone: "2222222222",
//   },
// ];

// let staff = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     aadhaar: "4587 9632 1452",
//     phone: "9876543210",
//     role: "Receptionist",
//     salary: "15000",
//     status: "Active",
//     joining: "12 Jan 2025",
//   },

//   {
//     id: 2,
//     name: "Priya Mehta",
//     aadhaar: "7412 8523 9631",
//     phone: "9876501234",
//     role: "Nurse",
//     salary: "20000",
//     status: "Leave",
//     joining: "05 Mar 2025",
//   },
// ];

// let patients = [
//   {
//     id: 1,
//     name: "Amit",
//     age: 19,
//     gender: "Male",
//     phone: "1010101010",
//     disease: "Fever",
//     doctor: "Dr. Patel",
//     admission: "12 Jan 2026",
//     status: "Admitted",

//     prescription: "Paracetamol twice a day",

//     tests: ["Blood Test", "X-Ray"],

//     insurance: "Star Health",

//     reports: ["Blood Report", "X-Ray Report"],

//     bill: "15000",
//   },

//   {
//     id: 2,
//     name: "Sneha",
//     age: 40,
//     gender: "Female",
//     phone: "2020202020",
//     disease: "Weakness",
//     doctor: "Dr. Sharma",
//     admission: "1 April 2026",
//     status: "Discharged",

//     prescription: "Vitamin Tablets",

//     tests: ["Sugar Test", "MRI"],

//     insurance: "HDFC Ergo",

//     reports: ["MRI Report", "Sugar Report"],

//     bill: "25000",
//   },
// ];

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);

    res.status(201).json({
      message: "Staff Added Successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Staff Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Staff Updated Successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD PATIENT
const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      message: "Patient Added Successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PATIENT
const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Patient Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editPatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Patient Updated Successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Doctor Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Doctor Updated Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getDoctors,
  getStaff,
  getPatients,
  addStaff,
  deleteStaff,
  editStaff,
  editPatient,
  addDoctor,
  deleteDoctor,
  editDoctor,
  addPatient,
  deletePatient,
};
