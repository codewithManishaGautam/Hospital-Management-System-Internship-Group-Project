const express = require("express");

const router = express.Router();

const {
  getAllBeds,
  getAvailableBeds,
  addBed,
  updateBed,
  deleteBed,
} = require("../controllers/bedController");

router.get("/", getAllBeds);

router.get("/available", getAvailableBeds);

router.post("/", addBed);

router.put("/:id", updateBed);

router.delete("/:id", deleteBed);

module.exports = router;
