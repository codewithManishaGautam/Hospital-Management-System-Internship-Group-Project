require("dotenv").config();

const mongoose = require("mongoose");
const LabTest = require("./models/LabTest");

const labTests = [

    // =========================
    // LAB - HEMATOLOGY
    // =========================

    {
        testName: "CBC",
        department: "Lab",
        category: "Hematology",
        price: 200,
        active: true,
    },

    {
        testName: "ESR",
        department: "Lab",
        category: "Hematology",
        price: 150,
        active: true,
    },

    {
        testName: "Hemoglobin",
        department: "Lab",
        category: "Hematology",
        price: 100,
        active: true,
    },

    {
        testName: "Platelet Count",
        department: "Lab",
        category: "Hematology",
        price: 150,
        active: true,
    },


    // =========================
    // LAB - BIOCHEMISTRY
    // =========================

    {
        testName: "LFT",
        department: "Lab",
        category: "Biochemistry",
        price: 500,
        active: true,
    },

    {
        testName: "KFT",
        department: "Lab",
        category: "Biochemistry",
        price: 500,
        active: true,
    },

    {
        testName: "Blood Sugar",
        department: "Lab",
        category: "Biochemistry",
        price: 100,
        active: true,
    },

    {
        testName: "Lipid Profile",
        department: "Lab",
        category: "Biochemistry",
        price: 400,
        active: true,
    },


    // =========================
    // LAB - SEROLOGY
    // =========================

    {
        testName: "HIV",
        department: "Lab",
        category: "Serology",
        price: 400,
        active: true,
    },

    {
        testName: "HBsAg",
        department: "Lab",
        category: "Serology",
        price: 300,
        active: true,
    },

    {
        testName: "VDRL",
        department: "Lab",
        category: "Serology",
        price: 250,
        active: true,
    },


    // =========================
    // LAB - MICROBIOLOGY
    // =========================

    {
        testName: "Culture",
        department: "Lab",
        category: "Microbiology",
        price: 500,
        active: true,
    },

    {
        testName: "Sensitivity",
        department: "Lab",
        category: "Microbiology",
        price: 500,
        active: true,
    },


    // =========================
    // LAB - CLINICAL PATHOLOGY
    // =========================

    {
        testName: "Urine Routine",
        department: "Lab",
        category: "Clinical Pathology",
        price: 150,
        active: true,
    },

    {
        testName: "Stool Routine",
        department: "Lab",
        category: "Clinical Pathology",
        price: 150,
        active: true,
    },


    // =========================
    // LAB - HORMONE
    // =========================

    {
        testName: "TSH",
        department: "Lab",
        category: "Hormone",
        price: 300,
        active: true,
    },

    {
        testName: "T3",
        department: "Lab",
        category: "Hormone",
        price: 300,
        active: true,
    },

    {
        testName: "T4",
        department: "Lab",
        category: "Hormone",
        price: 300,
        active: true,
    },


    // =========================
    // DIAGNOSTIC - RADIOLOGY
    // =========================

    {
        testName: "X-Ray",
        department: "Diagnostic",
        category: "Radiology",
        price: 500,
        active: true,
    },

    {
        testName: "CT Scan",
        department: "Diagnostic",
        category: "Radiology",
        price: 3000,
        active: true,
    },

    {
        testName: "MRI",
        department: "Diagnostic",
        category: "Radiology",
        price: 5000,
        active: true,
    },

    {
        testName: "USG",
        department: "Diagnostic",
        category: "Radiology",
        price: 1000,
        active: true,
    },


    // =========================
    // DIAGNOSTIC - CARDIOLOGY
    // =========================

    {
        testName: "ECG",
        department: "Diagnostic",
        category: "Cardiology",
        price: 300,
        active: true,
    },

    {
        testName: "2D Echo",
        department: "Diagnostic",
        category: "Cardiology",
        price: 1500,
        active: true,
    },

    {
        testName: "TMT",
        department: "Diagnostic",
        category: "Cardiology",
        price: 1200,
        active: true,
    },


    // =========================
    // DIAGNOSTIC - NEUROLOGY
    // =========================

    {
        testName: "EEG",
        department: "Diagnostic",
        category: "Neurology",
        price: 1000,
        active: true,
    },

    {
        testName: "NCV",
        department: "Diagnostic",
        category: "Neurology",
        price: 1500,
        active: true,
    },


    // =========================
    // DIAGNOSTIC - PULMONOLOGY
    // =========================

    {
        testName: "PFT",
        department: "Diagnostic",
        category: "Pulmonology",
        price: 800,
        active: true,
    },


    // =========================
    // DIAGNOSTIC - ORTHOPEDIC
    // =========================

    {
        testName: "Bone Density",
        department: "Diagnostic",
        category: "Orthopedic",
        price: 1200,
        active: true,
    }
];
const seedLabTests = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected");

        /*
         * Upsert instead of deleteMany().
         * This prevents accidentally deleting existing LabTest data.
         */
        for (const test of labTests) {
            await LabTest.updateOne(
                { testName: test.testName },
                { $set: test },
                { upsert: true }
            );
        }

        console.log(
            `Lab tests seeded successfully: ${labTests.length}`
        );

        await mongoose.disconnect();

        console.log("MongoDB disconnected");
    } catch (error) {
        console.error("SEED LAB TESTS ERROR:", error);

        await mongoose.disconnect();

        process.exit(1);
    }
};

seedLabTests();