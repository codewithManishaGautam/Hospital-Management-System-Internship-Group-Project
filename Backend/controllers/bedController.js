const Bed = require("../models/Bed");

// Get All Beds
const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find();

    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Available Beds
const getAvailableBeds = async (req, res) => {
  try {
    const beds = await Bed.find({
      status: "Available",
    });

    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Bed
const addBed = async (req, res) => {
  try {
    const bed = await Bed.create(req.body);

    res.status(201).json({
      message: "Bed Added Successfully",
      bed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Bed
const updateBed = async (req, res) => {
  try {
    const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Bed Updated Successfully",
      bed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Bed
const deleteBed = async (req, res) => {
  try {
    await Bed.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Bed Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBeds,
  getAvailableBeds,
  addBed,
  updateBed,
  deleteBed,
};
