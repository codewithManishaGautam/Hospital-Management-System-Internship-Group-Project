const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
// const User = require("../models/User");
const Staff = require("../models/Staff");
const Room = require("../models/Room");
const Bed = require("../models/Bed");
const Inventory = require("../models/Inventory");
const Charge = require("../models/Charges");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Activity = require("../models/Activity");
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

const addStaff = async (req, res) => {
  try {
    const { name, aadhaar, mobile, email, role, salary, status, joining } =
      req.body;

    // Duplicate Email
    const existing = await Staff.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Name
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Staff name must be at least 3 characters.",
      });
    }

    // Aadhaar
    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar must be 12 digits.",
      });
    }

    // Mobile
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number.",
      });
    }

    // Role
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Please select role.",
      });
    }

    // Salary
    if (!salary || Number(salary) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter valid salary.",
      });
    }

    // Status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please select status.",
      });
    }

    // Joining
    if (!joining) {
      return res.status(400).json({
        success: false,
        message: "Joining date is required.",
      });
    }

    // Duplicate Aadhaar
    const aadhaarExists = await Staff.findOne({ aadhaar });

    if (aadhaarExists) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar already exists.",
      });
    }

    // Duplicate Mobile
    const mobileExists = await Staff.findOne({ mobile });

    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists.",
      });
    }

    const staff = await Staff.create({
      name,
      aadhaar,
      mobile,
      email,
      password: "",
      role,
      salary,
      status,
      joining,
      otp: "",
      isVerified: false,
    });

    await Activity.create({
      message: `New Staff Added : ${staff.name}`,
    });

    res.status(201).json({
      success: true,
      message: "Staff Added Successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found.",
      });
    }

    await Staff.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Staff Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editStaff = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    await Activity.create({
      message: `Doctor Added : ${doctor.name}`,
    });

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { name, specialization, qualification, experience, mobile } =
      req.body;

    // Name
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Doctor name must be at least 3 characters.",
      });
    }

    // Specialization
    if (!specialization) {
      return res.status(400).json({
        success: false,
        message: "Specialization is required.",
      });
    }

    // Qualification
    if (!qualification) {
      return res.status(400).json({
        success: false,
        message: "Qualification is required.",
      });
    }

    // Experience
    if (!experience) {
      return res.status(400).json({
        success: false,
        message: "Experience is required.",
      });
    }

    // Mobile
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number.",
      });
    }

    const existingDoctor = await Doctor.findOne({
      mobile,
      _id: { $ne: req.params.id },
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists.",
      });
    }

    // const oldDoctor = await Doctor.findById(req.params.id);

    const doctor = await Doctor.create(req.body);

    await Activity.create({
      message: `Doctor Added : ${doctor.name}`,
    });

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const patientExists = await Patient.findOne({
      doctor: doctor.name,
    });

    if (patientExists) {
      return res.status(400).json({
        success: false,
        message: "Doctor has assigned patients. Cannot delete.",
      });
    }

    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editDoctor = async (req, res) => {
  try {
    const { name, specialization, qualification, experience, mobile } =
      req.body;

    if (!name || name.trim().length < 3 || !/^[A-Za-z ]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Doctor name must be at least 3 characters.",
      });
    }

    if (!specialization || specialization.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Please enter specialization.",
      });
    }

    if (!qualification || qualification.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter qualification.",
      });
    }

    if (!experience || experience.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please enter experience.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number.",
      });
    }

    const existingDoctor = await Doctor.findOne({
      mobile,
      _id: { $ne: req.params.id },
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists.",
      });
    }

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
      {
        new: true,
      },
    );

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
    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // await Patient.updateMany(
  //   {
  //     doctorId: doctor._id,
  //   },
  //   {
  //     $set: {
  //       doctor: `Dr. ${doctor.name}`,
  //     },
  //   },
  // );
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

    const totalBeds = Number(req.body.totalBeds) || 1;

    const beds = [];

    for (let i = 1; i <= totalBeds; i++) {
      beds.push({
        roomNumber: room.roomNumber,
        bedNo: `${room.roomNumber}-B${i}`,
        status: "Available",
      });
    }

    await Bed.insertMany(beds);

    await Activity.create({
      message: `Room Added : ${room.roomNumber}`,
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

    try {
      SentPrescription = require("../models/SentPrescription");
    } catch (e) {
      SentPrescription = null;
    }

    if (SentPrescription) {
      const docs = await SentPrescription.find()
        .sort({ createdAt: -1 })
        .limit(200);

      return res.status(200).json({ data: docs });
    }

    return res.status(200).json({
      data: global.__sentPrescriptions || {
        lab: [],
        pharmacy: [],
        nurse: [],
      },
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
  // getPatients,
  addStaff,
  deleteStaff,
  editStaff,
  // editPatient,
  addDoctor,
  deleteDoctor,
  editDoctor,
  // addPatient,
  // deletePatient,
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
  getSentPrescriptions,
};
