const express = require("express");

const router = express.Router();

const {
  getAllBeds,
  getAvailableBeds,
} = require("../controllers/bedController");

router.get("/", getAllBeds);

router.get("/available", getAvailableBeds);

module.exports = router;
