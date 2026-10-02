const LabTest = require("../models/LabTest");

// ==========================================
// Get All Active Lab Tests
// ==========================================

const getAllLabTests = async (req, res) => {

    try {

        const tests = await LabTest.find({
            active: true
        }).sort({
            department: 1,
            category: 1,
            testName: 1
        });

        res.status(200).json(tests);

    } catch (err) {

        console.log("GET LAB TESTS ERROR:", err);

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    getAllLabTests
};