


const ConsentReport = require("../models/ConsentReport");

// =========================================
// Save Consent
// =========================================

const saveConsent = async (req, res) => {

     console.log("BODY =", req.body);
    try {

        const {

            patientId,

            patientName,

            uhid,

            consentType,

            consentData,

            pdfPath

        } = req.body;

        if (

            !patientId ||

            !consentType

        ) {

            return res.status(400).json({

                message: "Required Fields Missing"

            });

        }

        const consent = new ConsentReport({

            patientId,

            patientName,

            uhid,

            consentType,

            pdfPath,

            consentData

        });

        await consent.save();

        res.status(201).json({

            message: "Consent Saved Successfully",

            consent

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// =========================================
// Get Patient Consents
// =========================================

const getPatientConsents = async (req, res) => {

    try {

        const consents = await ConsentReport.find({

            patientId: req.params.patientId

        })

        .sort({

            createdAt: -1

        });

        res.status(200).json(consents);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// =========================================
// Delete Consent
// =========================================

const deleteConsent = async (req, res) => {

    try {

        await ConsentReport.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            message: "Consent Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    saveConsent,

    getPatientConsents,

    deleteConsent

};