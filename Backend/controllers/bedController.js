const Bed = require("../models/Bed");
const Room = require("../models/Room");

// Get All Beds
const getAllBeds = async (req, res) => {
  try {
    const rooms = await Room.find().select("roomNumber").lean();

    const roomNumbers = rooms.map((room) =>
      String(room.roomNumber).trim()
    );

    const beds = await Bed.find({
      roomNumber: { $in: roomNumbers },
    });

    res.status(200).json(beds);
  } catch (error) {
    console.error("GET ALL BEDS ERROR:", error);

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

// Get Available Beds By Room
const getAvailableBedsByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;

const beds = await Bed.find({
  roomNumber: String(roomNumber).trim(),
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
    const { status } = req.body;

    const bed = await Bed.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    );

    if (!bed) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

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
  getAvailableBedsByRoom,
  addBed,
  updateBed,
  deleteBed,
};