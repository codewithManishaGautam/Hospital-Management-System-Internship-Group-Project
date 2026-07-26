const express = require("express");

const router = express.Router();

const {

    saveConsent,

    getPatientConsents,

    deleteConsent

} = require("../controllers/consentController");

// Save Consent

router.post(

    "/save",

    saveConsent

);

// Get All Consents of Patient

router.get(

    "/patient/:patientId",

    getPatientConsents

);

// Delete Consent

router.delete(

    "/delete/:id",

    deleteConsent

);

module.exports = router;