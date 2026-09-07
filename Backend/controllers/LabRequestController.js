const LabRequest = require("../models/LabRequest");


// ==========================================
// Create Lab Request
// ==========================================

exports.createLabRequest = async (req, res) => {

    try {

        const request = new LabRequest(req.body);

        await request.save();

        res.status(201).json({

            success: true,

            message: "Lab Request Created Successfully",

            data: request

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get All Lab Requests
// ==========================================

exports.getAllLabRequests = async (req, res) => {

    try {

        const requests = await LabRequest.find()

            .sort({

                requestedAt: -1

            });

        res.status(200).json({

            success: true,

            data: requests

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get Pending Requests
// ==========================================

exports.getPendingRequests = async (req, res) => {

    try {

        const requests = await LabRequest.find({

            status: "Pending"

        });

        res.status(200).json({

            success: true,

            data: requests

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get Processing Requests
// ==========================================

exports.getProcessingRequests = async (req, res) => {

    try {

        const requests = await LabRequest.find({

            status: "Processing"

        });

        res.status(200).json({

            success: true,

            data: requests

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get Completed Requests
// ==========================================

exports.getCompletedRequests = async (req, res) => {

    try {

        const requests = await LabRequest.find({

            status: "Completed"

        });

        res.status(200).json({

            success: true,

            data: requests

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get Single Patient Request
// ==========================================

exports.getSingleRequest = async (req, res) => {

    try {

        const request = await LabRequest.findById(

            req.params.id

        );

        res.status(200).json({

            success: true,

            data: request

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Change Status
// ==========================================

exports.updateStatus = async (req, res) => {

    try {

        const request = await LabRequest.findByIdAndUpdate(

            req.params.id,

            {

                status: req.body.status

            },

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            message: "Status Updated",

            data: request

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Upload PDF Path
// ==========================================

exports.uploadReport = async (req, res) => {

    try {

        const request = await LabRequest.findByIdAndUpdate(

            req.params.id,

            {

                reportPdf: req.file.filename,

                status: "Completed"

            },

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            message: "Report Uploaded Successfully",

            data: request

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};