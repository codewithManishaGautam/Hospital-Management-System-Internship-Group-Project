const Insurance = require("../models/Insurance");

const saveInsurance = async (req, res) => {
    try {
        const {
            patientId,
            insuranceCompany,
            insuranceData,
            pdfPath
        } = req.body;

        // Patient ID check
        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required"
            });
        }

        // Form data check
        if (!insuranceData) {
            return res.status(400).json({
                message: "Insurance form data is required"
            });
        }

        // PDF path check
        if (!pdfPath) {
            return res.status(400).json({
                message: "PDF path is required"
            });
        }

        const insurance = new Insurance({
            patientId,
            insuranceCompany: insuranceCompany || "SBI General Insurance",
            insuranceData,
            pdfPath
        });

        const savedInsurance = await insurance.save();

        res.status(201).json({
            message: "Insurance form saved successfully",
            insurance: savedInsurance
        });

    } catch (error) {
        console.error("Insurance Save Error:", error);

        res.status(500).json({
            message: "Failed to save insurance form",
            error: error.message
        });
    }
};


const getInsuranceByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const insurance = await Insurance.findOne({
            patientId: patientId
        }).sort({ createdAt: -1 });

        if (!insurance) {
            return res.status(404).json({
                message: "Insurance record not found"
            });
        }

        res.status(200).json(insurance);

    } catch (error) {
        console.error("Get Insurance Error:", error);

        res.status(500).json({
            message: "Failed to get insurance record",
            error: error.message
        });
    }
};

module.exports = {
    saveInsurance,
    getInsuranceByPatient
};