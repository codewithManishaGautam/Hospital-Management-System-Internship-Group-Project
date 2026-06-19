const express = require("express");

const router = express.Router();

const { addPatient } = require("../controllers/patientController");

router.post("/add", addPatient);

module.exports = router;
