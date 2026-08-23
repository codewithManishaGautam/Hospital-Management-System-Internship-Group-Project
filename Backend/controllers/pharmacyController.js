//1. Imports
const SentPrescription = require("../models/SentPrescription");
const PharmacyBill = require("../models/PharmacyBill");
const Patient = require("../models/Patient");
const Inventory = require("../models/Inventory");

//2.  Get Today's prescription
const getTodayPrescriptions = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const prescriptions = await SentPrescription.find({
      target: "pharmacy",
      status: "Pending",

      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//3. Search Patient
const searchPatient = async (req, res) => {
  const name = req.query.name || "";

  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const data = await SentPrescription.find({
      target: "pharmacy",
      status: "Pending",

      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },

      "prescription.patientName": {
        $regex: name,
        $options: "i",
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//4.  Get Prescription By UHID
const getPrescriptionByUHID = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const data = await SentPrescription.findOne({
      target: "pharmacy",
      status: "Pending",

      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },

      "prescription.patientUHID": req.params.uhid,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 5. Create Bill
const createBill = async (req, res) => {
  try {
    const {
      patientId,
      prescriptionId,
      medicines,
      totalAmount,
      paymentMode,
      paymentStatus,
    } = req.body;

    // Basic validation
    if (!patientId || !prescriptionId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID or Prescription ID missing",
      });
    }

    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines selected",
      });
    }

    // Check patient
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Check prescription
    const sentPrescription = await SentPrescription.findById(prescriptionId);

    if (!sentPrescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    const existingBill = await PharmacyBill.findOne({
      prescriptionId,
    });

    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: "Bill already generated for this prescription.",
      });
    }

    // =========================
    // CHECK INVENTORY STOCK
    // =========================

    for (const medicine of medicines) {
      const medicineName =
        medicine.medicineName || medicine.itemName || medicine.name;
      const requiredQuantity = Number(medicine.quantity);

      if (!medicineName || !requiredQuantity || requiredQuantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid medicine or quantity",
        });
      }

    const inventoryItem = await Inventory.findOne({
  itemName: {
    $regex: `^${medicineName.trim()}$`,
    $options: "i",
  },
});

      if (!inventoryItem) {
        return res.status(404).json({
          success: false,
          message: `${medicineName} not available in inventory`,
        });
      }

      if (inventoryItem.quantity < requiredQuantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${medicineName}. Available: ${inventoryItem.quantity}`,
        });
      }
    }

    // =========================
    // REDUCE INVENTORY
    // =========================

    for (const medicine of medicines) {
      const medicineName =
        medicine.medicineName || medicine.itemName || medicine.name;
      const requiredQuantity = Number(medicine.quantity);

  await Inventory.findOneAndUpdate(
  {
    itemName: {
      $regex: `^${medicineName.trim()}$`,
      $options: "i",
    },
  },
  {
    $inc: {
      quantity: -requiredQuantity,
    },
  },
  {
    new: true,
  },
);
    }

    // =========================
    // CREATE PHARMACY BILL
    // =========================

    const bill = new PharmacyBill({
      ...req.body,
      patientId,
      prescriptionId,
      medicines,
      totalAmount,
      paymentMode,
      paymentStatus,
    });

    await bill.save();

    // =========================
    // PATIENT MEDICINE HISTORY
    // =========================

    await Patient.findByIdAndUpdate(patientId, {
      $push: {
        medicineHistory: {
          billId: bill._id,
          medicines: bill.medicines,
          totalAmount: bill.totalAmount,
          paymentMode: bill.paymentMode,
          paymentStatus: bill.paymentStatus,
        },
      },
    });

    // =========================
    // UPDATE PRESCRIPTION HISTORY
    // =========================

    const updatedPatient = await Patient.findById(patientId);

    if (updatedPatient && sentPrescription.prescriptionHistoryId) {
      const prescriptionHistory = updatedPatient.prescriptionHistory.id(
        sentPrescription.prescriptionHistoryId,
      );

      if (prescriptionHistory) {
        prescriptionHistory.medicines = bill.medicines;
        prescriptionHistory.billId = bill._id;
        prescriptionHistory.paymentMode = bill.paymentMode;
        prescriptionHistory.paymentStatus = bill.paymentStatus;

        await updatedPatient.save();
      }
    }
    // =========================
    // COMPLETE SENT PRESCRIPTIONf
    // =========================

    await SentPrescription.findByIdAndUpdate(
      prescriptionId,
      {
        status: "Completed",
      },
      {
        new: true,
      },
    );

    res.status(201).json({
      success: true,
      message: "Bill Generated Successfully",
      bill,
    });
  } catch (err) {
    console.log("CREATE BILL ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMedicines = async (req, res) => {
  try {
 const medicines = await Inventory.find(
  {
    quantity: { $gt: 0 },
  },
  {
    itemName: 1,
    unitPrice: 1,
    quantity: 1,
    supplier: 1,
    category: 1,
  },
).sort({ itemName: 1 });

    console.log("PHARMACY MEDICINES =", medicines);

    res.status(200).json({
      success: true,
      data: medicines,
    });
  } catch (err) {
    console.log("Get Medicines Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Pharmacy Bills / Payments
const getPayments = async (req, res) => {
  try {
    const bills = await PharmacyBill.find()
      .populate("patientId", "name mobile uhid")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bills,
    });
  } catch (err) {
    console.log("Get Payments Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Pharmacy Bills / Payments
const getBills = async (req, res) => {
  try {
    const bills = await PharmacyBill.find()
      .populate("patientId", "name mobile uhid")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (err) {
    console.log("Get Bills Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescription = await SentPrescription.findByIdAndUpdate(
      req.params.id,

      {
        prescription: req.body.prescription,
      },

      {
        new: true,
      },
    );

    res.json({
      success: true,
      data: prescription,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// 6. Update Payment
const updatePayment = async (req, res) => {
  try {
    const bill = await PharmacyBill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    bill.paymentMode = req.body.paymentMode;
    bill.paymentStatus = req.body.paymentStatus;

    await bill.save();

    const patient = await Patient.findById(bill.patientId);

    if (patient) {
      // Update latest medicine history
      const medicineHistory = patient.medicineHistory.find(
        (item) => item.billId && item.billId.toString() === bill._id.toString(),
      );

      if (medicineHistory) {
        medicineHistory.paymentMode = bill.paymentMode;
        medicineHistory.paymentStatus = bill.paymentStatus;
      }

      // Update prescription history
      const prescriptionHistory = patient.prescriptionHistory.find(
        (item) => item.billId && item.billId.toString() === bill._id.toString(),
      );

      if (prescriptionHistory) {
        prescriptionHistory.paymentMode = bill.paymentMode;
        prescriptionHistory.paymentStatus = bill.paymentStatus;
      }

      await patient.save();
    }

    res.json({
      success: true,
      message: "Payment Updated Successfully",
      bill,
    });
  } catch (err) {
    console.log("Update Payment Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 7. Export
module.exports = {
  getTodayPrescriptions,

  searchPatient,

  getPrescriptionByUHID,

  createBill,

  updatePayment,

  updatePrescription,

  getMedicines,

  getPayments,

  getBills,
};
