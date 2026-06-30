const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
// const User = require("../models/User");
const Room = require("../models/Room");
const Inventory = require("../models/Inventory");
const Charge = require("../models/Charges");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Activity = require("../models/Activity");
const Staff = require("../models/Staff");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

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

    const incomes = await Income.find();
    const expenses = await Expense.find();

    const totalIncome = incomes.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const netProfit = totalIncome - totalExpense;

    res.status(200).json({
      totalDoctors,
      totalStaff,
      totalPatients,
      admittedPatients,
      dischargedPatients,

      totalIncome,
      totalExpense,
      netProfit,
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
    const existing = await Staff.findOne({
      email: req.body.email,
    });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const staff = await Staff.create({
      name: req.body.name,
      aadhaar: req.body.aadhaar,
      phone: req.body.phone,
      email: req.body.email,
      password: "",
      role: req.body.role,
      salary: req.body.salary,
      status: req.body.status,
      joining: req.body.joining,
      otp: "",
      isVerified: false,
    });

    //     await sendEmail(
    //       staff.email,
    //       "Shraddha Hospital Registration",
    //       `Welcome to Shraddha Hospital.

    // Your OTP is : ${otp}

    // Use this OTP to verify your account and create your password.`,
    //     );

    await Activity.create({
      message: `New Staff Added : ${staff.name}`,
    });

    res.status(201).json({
      success: true,
      message: "Staff Added Successfully.",
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
    const updateData = { ...req.body };

    if (updateData.password && !updateData.password.startsWith("$2")) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const staff = await Staff.findByIdAndUpdate(req.params.id, updateData, {
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

    await Activity.create({
      message: `New Patient Registered : ${patient.name}`,
    });

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

    await Activity.create({
      message: `Doctor Added : ${doctor.name}`,
    });

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

// GET ROOMS
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD ROOM
const addRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    await Activity.create({
      message: `Room Allocated : ${room.roomNumber}`,
    });

    res.status(201).json({
      message: "Room Added Successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ROOM
const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Room Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addInventory = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.json({
      message: "Inventory Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CHARGES
const getCharges = async (req, res) => {
  try {
    const charges = await Charge.find();

    res.json(charges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD CHARGE
const addCharge = async (req, res) => {
  try {
    const charge = await Charge.create(req.body);

    res.json(charge);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CHARGE
const deleteCharge = async (req, res) => {
  try {
    await Charge.findByIdAndDelete(req.params.id);

    res.json({
      message: "Charge Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET EXPENSES
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Expense Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET INCOME
const getIncome = async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD INCOME
const addIncome = async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE INCOME
const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.json({
      message: "Income Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FINANCE DASHBOARD
const getFinanceStats = async (req, res) => {
  try {
    const incomes = await Income.find();
    const expenses = await Expense.find();

    const totalIncome = incomes.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    const netProfit = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netProfit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income = totalIncome[0]?.total || 0;
    const expense = totalExpense[0]?.total || 0;

    res.json({
      totalIncome: income,
      totalExpense: expense,
      profit: income - expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSentPrescriptions = async (req, res) => {
  try {
    let SentPrescription;
    try { SentPrescription = require('../models/SentPrescription'); } catch (e) { SentPrescription = null; }

    if (SentPrescription) {
      const docs = await SentPrescription.find().sort({ createdAt: -1 }).limit(200);
      return res.status(200).json({ data: docs });
    }

    return res.status(200).json({ data: global.__sentPrescriptions || { lab: [], pharmacy: [], nurse: [] } });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getRooms,
  addRoom,
  deleteRoom,
  getInventory,
  addInventory,
  deleteInventory,
  getCharges,
  addCharge,
  deleteCharge,
  getExpenses,
  addExpense,
  deleteExpense,
  getIncome,
  addIncome,
  deleteIncome,
  getFinanceStats,
  getAnalytics,
  getActivities,
};
