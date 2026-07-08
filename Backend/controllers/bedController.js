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

module.exports = {
  getAllBeds,
  getAvailableBeds,
};
