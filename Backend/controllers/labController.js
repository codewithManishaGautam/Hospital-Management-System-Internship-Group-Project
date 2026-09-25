const Patient = require("../models/Patient");
const LabReport = require("../models/LabReport");
const SentPrescription = require("../models/SentPrescription");
const LabTest = require("../models/LabTest");
const LabBill = require("../models/LabBill");

// ==========================================
// Get All Patients
// ==========================================

const getAllPatients = async (req, res) => {
    try {
        const search = req.query.search || "";

        const sentPrescriptions = await SentPrescription.find({
            target: "lab"
        })
            .sort({ createdAt: -1 })
            .lean();

        // Get prescription IDs
        const prescriptionIds = sentPrescriptions.map(
            (item) => item._id
        );

        const patientIds = sentPrescriptions
            .map((item) => item.patientId)
            .filter(Boolean);

        // Get lab bills for these prescriptions OR patients
        const labBills = await LabBill.find({
            $or: [
                {
                    prescriptionId: { $in: prescriptionIds }
                },
                {
                    patientId: { $in: patientIds }
                }
            ]
        })
            .sort({ createdAt: -1 })
            .lean();

        const patients = sentPrescriptions
            .filter((item) => {
                const patient = item.prescription || {};

                return (
                    patient.patientName
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    patient.patientUHID
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                );
            })
            .map((item) => {

                // Find bill for this prescription
                const bill =
                    labBills.find(
                        (b) =>
                            String(b.prescriptionId) ===
                            String(item._id)
                    ) ||
                    labBills.find(
                        (b) =>
                            String(b.patientId) ===
                            String(item.patientId)
                    );

                return {
                    _id: item.patientId,
                    uhid: item.prescription?.patientUHID || "",
                    name: item.prescription?.patientName || "",
                    age: item.prescription?.age || "",
                    gender: item.prescription?.gender || "",
                    mobile: item.prescription?.mobile || "",
                    role: item.prescription?.role || "",
                    doctor: item.prescription?.doctor || {},
                    labTests: item.prescription?.labTests || [],
                    prescriptionId: item._id,
                    prescriptionHistoryId: item.prescriptionHistoryId,

                    // Lab prescription status
                    status: item.status,

                    // Payment status
                    paymentStatus: bill?.paymentStatus || "Pending"
                };
            });

        res.status(200).json(patients);

    } catch (err) {

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

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file not received"
            });
        }

        const {
            patientId,
            prescriptionId,
            uhid,
            patientName,
            age,
            gender,
            mobile,
            testName,
            priority
        } = req.body;


        // ==========================================
        // Required Fields
        // ==========================================

        if (!patientId || !prescriptionId || !testName) {
            return res.status(400).json({
                success: false,
                message: "Patient, Prescription or Test information missing"
            });
        }


        // ==========================================
        // File URL
        // ==========================================

        const reportPdf =
            `/uploadLabReport/uploadLab/${req.file.filename}`;


        // ==========================================
        // Get Sent Prescription
        // ==========================================

        const sentPrescription =
            await SentPrescription.findById(
                prescriptionId
            );


        if (!sentPrescription) {

            return res.status(404).json({

                success: false,

                message: "Sent prescription not found"

            });

        }


        // ==========================================
        // Get Prescription History ID
        // ==========================================

        const prescriptionHistoryId =
            sentPrescription.prescriptionHistoryId;


        // ==========================================
        // Save Report
        // ==========================================

        const report = new LabReport({

            patientId,

            prescriptionId,

            prescriptionHistoryId,

            uhid,

            patientName,

            age,

            gender,

            mobile,

            testName,

            priority: priority || "Normal",

            reportPdf,

            reportStatus: "Uploaded"

        });


        await report.save();


        // ==========================================
        // Check Doctor Requested Tests
        // ==========================================

        if (sentPrescription) {
            const requestedTests =
                sentPrescription.prescription?.labTests || [];


            // Get all uploaded reports
            // for this prescription

            const uploadedReports =
                await LabReport.find({
                    prescriptionId
                });


            const uploadedTests =
                uploadedReports.map(
                    (report) => report.testName
                );


            // ==========================================
            // Check whether ALL tests are uploaded
            // ==========================================

            const allTestsUploaded =
                requestedTests.length > 0 &&
                requestedTests.every(
                    (test) =>
                        uploadedTests.includes(test)
                );


            if (allTestsUploaded) {

                sentPrescription.status =
                    "Completed";

                await sentPrescription.save();

                console.log(
                    "LAB PRESCRIPTION COMPLETED"
                );

            } else {

                console.log(
                    "LAB PRESCRIPTION STILL PENDING"
                );

            }

        }


        // ==========================================
        // Response
        // ==========================================

        res.status(201).json({

            success: true,

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

            success: false,

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
// Generate Lab Bill
// ==========================================

const generateLabBill = async (req, res) => {
    try {

        const {
            patientId,
            prescriptionId,
            tests
        } = req.body;

        if (!patientId || !tests || tests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Patient ID and tests are required"
            });
        }

        // ==========================================
        // Get Patient
        // ==========================================

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // ==========================================
        // Get Test Prices From Database
        // ==========================================

        const testRecords = await LabTest.find({
            testName: { $in: tests },
            active: true
        });

        if (testRecords.length !== tests.length) {
            return res.status(400).json({
                success: false,
                message: "Some lab test prices are not available"
            });
        }

        // ==========================================
        // Prepare Bill Tests
        // ==========================================

        const billTests = testRecords.map((test) => ({
            testName: test.testName,
            price: test.price
        }));

        // ==========================================
        // Calculate Total
        // ==========================================

        const totalAmount = billTests.reduce(
            (total, test) => total + Number(test.price),
            0
        );

        // ==========================================
        // Check Existing Pending Bill
        // ==========================================

        let bill = await LabBill.findOne({
            patientId,
            prescriptionId,
            paymentStatus: "Pending"
        });

        if (bill) {

            bill.tests = billTests;
            bill.totalAmount = totalAmount;

            await bill.save();

        } else {

            bill = new LabBill({
                patientId,
                prescriptionId: prescriptionId || null,

                uhid: patient.uhid,
                patientName: patient.name,
                mobile: patient.mobile || "",

                doctorName:
                    typeof patient.doctor === "string"
                        ? patient.doctor
                        : patient.doctor?.name || "",

                tests: billTests,

                totalAmount,

                paymentMode: "Cash",

                paymentStatus: "Pending",

                billStatus: "Generated"
            });

            await bill.save();
        }

        res.status(201).json({
            success: true,
            message: "Lab Bill Generated Successfully",
            bill
        });

    } catch (error) {

        console.error(
            "GENERATE LAB BILL ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// Get Lab Bill
// ==========================================

const getLabBill = async (req, res) => {
    try {
      const bill = await LabBill.findOne({
    patientId: req.params.patientId
}).sort({
    createdAt: -1
});

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Lab Bill not found"
            });
        }

        res.status(200).json({
            success: true,
            bill
        });

    } catch (error) {
        console.error(
            "GET LAB BILL ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// Generate Lab Bill PDF
// ==========================================

const generateLabBillPDF = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });
        }

        // ==========================================
        // Get Latest Lab Bill
        // ==========================================

        const bill = await LabBill.findOne({
            patientId
        }).sort({
            createdAt: -1
        });

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Lab Bill not found"
            });
        }

        // ==========================================
        // Get Patient
        // ==========================================

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // ==========================================
        // PDF
        // ==========================================

        const PDFDocument = require("pdfkit");

        const doc = new PDFDocument({
            margin: 50
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${patient.name || "Patient"}_Lab_Bill.pdf"`
        );

        doc.pipe(res);

        // ==========================================
        // Hospital Heading
        // ==========================================

        doc
            .fontSize(20)
            .text("Hospital Management System", {
                align: "center"
            });

        doc
            .moveDown()
            .fontSize(16)
            .text("LABORATORY BILL", {
                align: "center"
            });

        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown();

        // ==========================================
        // Patient Details
        // ==========================================

        doc.fontSize(11);

        doc.text(`UHID: ${patient.uhid || bill.uhid || "N/A"}`);
        doc.text(`Patient Name: ${patient.name || bill.patientName || "N/A"}`);
        doc.text(`Age: ${patient.age || "N/A"}`);
        doc.text(`Gender: ${patient.gender || "N/A"}`);
        doc.text(`Mobile: ${patient.mobile || bill.mobile || "N/A"}`);

        doc.moveDown();

        doc.text(
            `Doctor: ${bill.doctorName || "N/A"}`
        );

        doc.moveDown();

        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();

        doc.moveDown();

        // ==========================================
        // Lab Tests
        // ==========================================

        doc
            .fontSize(13)
            .text("Lab Tests");

        doc.moveDown();

        doc.fontSize(11);

        (bill.tests || []).forEach((test, index) => {

            doc.text(
                `${index + 1}. ${test.testName || "N/A"}`
            );

            doc.text(
                `Price: Rs. ${Number(test.price || 0).toFixed(2)}`
            );

            doc.moveDown(0.5);
        });

        doc.moveDown();

        doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();

        doc.moveDown();

        // ==========================================
        // Total
        // ==========================================

        doc
            .fontSize(14)
            .text(
                `Total Amount: Rs. ${Number(
                    bill.totalAmount || 0
                ).toFixed(2)}`,
                {
                    align: "right"
                }
            );

        doc.moveDown();

        doc
            .fontSize(11)
            .text(
                `Payment Mode: ${bill.paymentMode || "N/A"}`
            );

        doc.text(
            `Payment Status: ${bill.paymentStatus || "Pending"}`
        );

        doc.text(
            `Bill Date: ${
                bill.createdAt
                    ? new Date(
                        bill.createdAt
                    ).toLocaleString("en-IN")
                    : "N/A"
            }`
        );

        doc.moveDown(2);

        doc
            .fontSize(10)
            .text(
                "Generated By HMS",
                {
                    align: "center"
                }
            );

        doc.end();

    } catch (error) {

        console.error(
            "GENERATE LAB BILL PDF ERROR:",
            error
        );

        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

// ==========================================
// Update Lab Payment
// ==========================================

const updateLabPayment = async (req, res) => {
    try {
        const {
            paymentMode,
            razorpayOrderId,
            razorpayPaymentId
        } = req.body;

        const bill = await LabBill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Lab Bill not found"
            });
        }

        console.log("========== LAB PAYMENT BEFORE ==========");
        console.log({
            billId: bill._id,
            patientId: bill.patientId,
            prescriptionId: bill.prescriptionId,
            paymentStatus: bill.paymentStatus
        });

        bill.paymentMode = paymentMode || "Cash";
        bill.paymentStatus = "Paid";
        bill.billStatus = "Paid";

        if (razorpayOrderId) {
            bill.razorpayOrderId = razorpayOrderId;
        }

        if (razorpayPaymentId) {
            bill.razorpayPaymentId = razorpayPaymentId;
        }

        await bill.save();

        console.log("========== LAB PAYMENT AFTER ==========");
        console.log({
            billId: bill._id,
            patientId: bill.patientId,
            prescriptionId: bill.prescriptionId,
            paymentStatus: bill.paymentStatus,
            billStatus: bill.billStatus
        });

        res.status(200).json({
            success: true,
            message: "Lab Payment Updated Successfully",
            bill
        });

    } catch (error) {
        console.error("LAB PAYMENT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
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
    dashboardSummary,
    generateLabBill,
    getLabBill,
    generateLabBillPDF,
    updateLabPayment
};