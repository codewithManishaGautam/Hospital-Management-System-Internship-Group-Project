const express = require("express");

const router = express.Router();

const {
  getAllBeds,
  getAvailableBeds,
  getAvailableBedsByRoom,
  addBed,
  updateBed,
  deleteBed,
} = require("../controllers/bedController");

router.get("/", getAllBeds);

router.get("/available", getAvailableBeds);

router.get("/available/room/:roomNumber", getAvailableBedsByRoom);

router.post("/", addBed);

router.put("/:id", updateBed);

router.delete("/:id", deleteBed);

module.exports = router;
