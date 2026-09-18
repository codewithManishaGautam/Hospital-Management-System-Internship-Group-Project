const express = require("express");

const router = express.Router();

const {
    saveInsurance,
    getInsuranceByPatient,
} = require("../controllers/InsuranceController");

router.post("/save", saveInsurance);

router.get(
    "/patient/:patientId",
    getInsuranceByPatient
);


module.exports = router;