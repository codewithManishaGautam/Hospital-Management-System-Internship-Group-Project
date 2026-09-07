// // const Patient = require("../models/Patient");
// // const LabReport = require("../models/LabReport");

// // // ==========================================
// // // Get All Patients
// // // ==========================================
// // const getAllPatients = async (req, res) => {

// //     try {

// //         const search = req.query.search || "";

// //         const patients = await Patient.find({

// //             name: {

// //                 $regex: search,

// //                 $options: "i"

// //             }

// //         }).sort({

// //             createdAt: -1

// //         });

// //         res.status(200).json(patients);

// //     }

// //     catch (err) {

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // // ==========================================
// // // Upload Lab Report
// // // ==========================================
// // const uploadLabReport = async (req, res) => {

// //     console.log("========== LAB UPLOAD ==========");
// //     console.log("BODY =", req.body);
// //     console.log("FILE =", req.file);

// //     try {

// //         if (!req.file) {

// //             return res.status(400).json({

// //                 message: "PDF file not received"

// //             });

// //         }

// //         const {

// //             patientId,
// //             uhid,
// //             patientName,
// //             age,
// //             gender,
// //             mobile,
// //             testCategory,
// //             testName,
// //             priority

// //         } = req.body;

// //         if (!testName) {

// //             return res.status(400).json({

// //                 message: "Test Name is Required"

// //             });

// //         }

// //         const report = new LabReport({

// //             patientId,

// //             uhid,

// //             patientName,

// //             age,

// //             gender,

// //             mobile,

// //             testCategory,

// //             testName,

// //             priority,

// //             reportPdf: `/uploads/reports/${req.file.filename}`,

            

// //             reportStatus: "Uploaded"

// //         });

// //         await report.save();

// //         res.status(201).json({

// //             message: "Lab Report Uploaded Successfully",

// //             report

// //         });

// //     }

// //     catch (err) {

// //         console.log(err);

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // // ==========================================
// // // Get Patient Reports
// // // ==========================================
// // const getPatientReports = async (req, res) => {

// //     try {

// //         const reports = await LabReport.find({

// //             patientId: req.params.patientId

// //         }).sort({

// //             uploadedAt: -1

// //         });

// //         res.status(200).json(reports);

// //     }

// //     catch (err) {

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // // ==========================================
// // // Update Report
// // // ==========================================
// // const updateLabReport = async (req, res) => {

// //     try {

// //         const report = await LabReport.findByIdAndUpdate(

// //             req.params.id,

// //             req.body,

// //             {

// //                 new: true

// //             }

// //         );

// //         res.status(200).json(report);

// //     }

// //     catch (err) {

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // // ==========================================
// // // Delete Report
// // // ==========================================
// // const deleteLabReport = async (req, res) => {

// //     try {

// //         await LabReport.findByIdAndDelete(

// //             req.params.id

// //         );

// //         res.status(200).json({

// //             message: "Report Deleted"

// //         });

// //     }

// //     catch (err) {

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // // ==========================================
// // // Dashboard Summary
// // // ==========================================
// // const dashboardSummary = async (req, res) => {

// //     try {

// //         const totalPatients = await Patient.countDocuments();

// //         const pendingReports = await LabReport.countDocuments({

// //             reportStatus: "Pending"

// //         });

// //         const uploadedReports = await LabReport.countDocuments({

// //             reportStatus: "Uploaded"

// //         });

// //         const emergencyReports = await LabReport.countDocuments({

// //             priority: "Emergency"

// //         });

// //         res.json({

// //             totalPatients,

// //             pendingReports,

// //             uploadedReports,

// //             emergencyReports

// //         });

// //     }

// //     catch (err) {

// //         res.status(500).json({

// //             message: err.message

// //         });

// //     }

// // };

// // module.exports = {

// //     getAllPatients,

// //     uploadLabReport,

// //     getPatientReports,

// //     updateLabReport,

// //     deleteLabReport,

// //     dashboardSummary

// // };



// const Patient = require("../models/Patient");
// const LabReport = require("../models/LabReport");

// // ==========================================
// // Get All Patients
// // ==========================================

// const getAllPatients = async (req, res) => {

//     try {

//         const search = req.query.search || "";

//         const patients = await Patient.find({

//             name: {

//                 $regex: search,

//                 $options: "i"

//             }

//         }).sort({

//             createdAt: -1

//         });

//         res.status(200).json(patients);

//     }

//     catch (err) {

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// // ==========================================
// // Upload Report (Lab + Diagnostic)
// // ==========================================

// const uploadLabReport = async (req, res) => {

//     console.log("========== LAB UPLOAD ==========");
//     console.log("BODY =", req.body);
//     console.log("FILE =", req.file);

//     try {

//         if (!req.file) {

//             return res.status(400).json({

//                 message: "PDF file not received"

//             });

//         }

//         const {

//             patientId,
//             uhid,
//             patientName,
//             age,
//             gender,
//             mobile,

//             department,

//             testCategory,

//             machineType,

//             testName,

//             priority

//         } = req.body;

//         if (!testName) {

//             return res.status(400).json({

//                 message: "Test Name is Required"

//             });

//         }

//         const report = new LabReport({

//             patientId,

//             uhid,

//             patientName,

//             age,

//             gender,

//             mobile,

//             department,

//             testCategory,

//             machineType,

//             testName,

//             priority,

//             reportPdf: `/uploadLabReport/uploadLab/${req.file.filename}`,

//             reportStatus: "Uploaded"

//         });

//         await report.save();

//         res.status(201).json({

//             message: "Report Uploaded Successfully",

//             report

//         });

//     }

//     catch (err) {

//         console.log(err);

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// // ==========================================
// // Get Patient Reports
// // ==========================================

// const getPatientReports = async (req, res) => {

//     try {

//         const reports = await LabReport.find({

//             patientId: req.params.patientId

//         }).sort({

//             uploadedAt: -1

//         });

//         res.status(200).json(reports);

//     }

//     catch (err) {

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// // ==========================================
// // Update Report
// // ==========================================

// const updateLabReport = async (req, res) => {

//     try {

//         const report = await LabReport.findByIdAndUpdate(

//             req.params.id,

//             req.body,

//             {

//                 new: true

//             }

//         );

//         res.status(200).json(report);

//     }

//     catch (err) {

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// // ==========================================
// // Delete Report
// // ==========================================

// const deleteLabReport = async (req, res) => {

//     try {

//         await LabReport.findByIdAndDelete(

//             req.params.id

//         );

//         res.status(200).json({

//             message: "Report Deleted"

//         });

//     }

//     catch (err) {

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// // ==========================================
// // Dashboard Summary
// // ==========================================

// const dashboardSummary = async (req, res) => {

//     try {

//         const totalPatients = await Patient.countDocuments();

//         const pendingReports = await LabReport.countDocuments({

//             reportStatus: "Pending"

//         });

//         const uploadedReports = await LabReport.countDocuments({

//             reportStatus: "Uploaded"

//         });

//         const emergencyReports = await LabReport.countDocuments({

//             priority: "Emergency"

//         });

//         const labReports = await LabReport.countDocuments({

//             department: "Lab"

//         });

//         const diagnosticReports = await LabReport.countDocuments({

//             department: "Diagnostic"

//         });

//         res.json({

//             totalPatients,

//             pendingReports,

//             uploadedReports,

//             emergencyReports,

//             labReports,

//             diagnosticReports

//         });

//     }

//     catch (err) {

//         res.status(500).json({

//             message: err.message

//         });

//     }

// };

// module.exports = {

//     getAllPatients,

//     uploadLabReport,

//     getPatientReports,

//     updateLabReport,

//     deleteLabReport,

//     dashboardSummary

// };




const Patient = require("../models/Patient");
const LabReport = require("../models/LabReport");


// ==========================================
// Get All Patients
// ==========================================

const getAllPatients = async (req, res) => {

    try {

        const search = req.query.search || "";

        const patients = await Patient.find({

            name: {

                $regex: search,

                $options: "i"

            }

        }).sort({

            createdAt: -1

        });

        res.status(200).json(patients);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Upload Lab Report
// ==========================================

const uploadLabReport = async (req, res) => {

    console.log("========== LAB UPLOAD ==========");

    console.log("BODY =", req.body);

    console.log("FILE =", req.file);


    try {

        // Check file

        if (!req.file) {

            return res.status(400).json({

                message: "PDF file not received"

            });

        }


        const {

            patientId,
            uhid,
            patientName,
            age,
            gender,
            mobile,
            department,
            testCategory,
            machineType,
            testName,
            priority

        } = req.body;


        // Test name validation

        if (!testName) {

            return res.status(400).json({

                message: "Test Name is Required"

            });

        }


        // ==========================================
        // File URL
        // ==========================================

        const reportPdf =
            `/uploadLabReport/uploadLab/${req.file.filename}`;


        console.log(
            "REPORT URL =",
            reportPdf
        );


        // ==========================================
        // Save Report
        // ==========================================

        const report = new LabReport({

            patientId,

            uhid,

            patientName,

            age,

            gender,

            mobile,

            department,

            testCategory,

            machineType,

            testName,

            priority,

            reportPdf,

            reportStatus: "Uploaded"

        });


        await report.save();


        // ==========================================
        // Response
        // ==========================================

        res.status(201).json({

            message:
                "Report Uploaded Successfully",

            report

        });

    }

    catch (err) {

        console.log(
            "LAB UPLOAD ERROR:",
            err
        );

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Get Patient Reports
// ==========================================

const getPatientReports = async (req, res) => {

    try {

        const reports = await LabReport.find({

            patientId:
                req.params.patientId

        }).sort({

            uploadedAt: -1

        });


        res.status(200).json(reports);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Update Report
// ==========================================

const updateLabReport = async (req, res) => {

    try {

        const report =
            await LabReport.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );


        res.status(200).json(report);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Delete Report
// ==========================================

const deleteLabReport = async (req, res) => {

    try {

        await LabReport.findByIdAndDelete(

            req.params.id

        );


        res.status(200).json({

            message:
                "Report Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Dashboard Summary
// ==========================================

const dashboardSummary = async (req, res) => {

    try {

        const totalPatients =
            await Patient.countDocuments();


        const pendingReports =
            await LabReport.countDocuments({

                reportStatus: "Pending"

            });


        const uploadedReports =
            await LabReport.countDocuments({

                reportStatus: "Uploaded"

            });


        const emergencyReports =
            await LabReport.countDocuments({

                priority: "Emergency"

            });


        const labReports =
            await LabReport.countDocuments({

                department: "Lab"

            });


        const diagnosticReports =
            await LabReport.countDocuments({

                department: "Diagnostic"

            });


        res.json({

            totalPatients,

            pendingReports,

            uploadedReports,

            emergencyReports,

            labReports,

            diagnosticReports

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};


// ==========================================
// Export
// ==========================================

module.exports = {

    getAllPatients,

    uploadLabReport,

    getPatientReports,

    updateLabReport,

    deleteLabReport,

    dashboardSummary

};