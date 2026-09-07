
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const Bill = require("../models/Bill");
const mergePDFs = require("../mergePdf");

// =====================================================
// EMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// =====================================================
// SEND MERGED BILL
// =====================================================

exports.sendMergedBill = async (req, res) => {
  try {
    console.log("\n=================================");
    console.log("BILLING EMAIL REQUEST");
    console.log("=================================");

    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL PASSWORD EXISTS:",
      !!process.env.EMAIL_PASS
    );

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);


    // ---------------------------------------------
    // CHECK FILES
    // ---------------------------------------------

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No PDF files uploaded",
      });
    }


    // ---------------------------------------------
    // GET PATIENT DATA
    // ---------------------------------------------

    const {
      patientName,
      email,
    } = req.body;


    if (!patientName) {
      return res.status(400).json({
        success: false,
        message: "Patient name is required",
      });
    }


    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Patient email is required",
      });
    }


    // ---------------------------------------------
    // UPLOAD DIRECTORY
    // ---------------------------------------------

    const uploadDir = path.join(
      __dirname,
      "../uploads"
    );


    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }


    // ---------------------------------------------
    // MERGED PDF
    // ---------------------------------------------

    const mergedFileName =
      `merged_${Date.now()}.pdf`;


    const mergedPath =
      path.join(
        uploadDir,
        mergedFileName
      );


    console.log(
      "Merged PDF Path:",
      mergedPath
    );


    // ---------------------------------------------
    // MERGE PDFs
    // ---------------------------------------------

    await mergePDFs(
      req.files,
      mergedPath
    );


    console.log(
      "PDF MERGED SUCCESSFULLY"
    );


    // ---------------------------------------------
    // CHECK MERGED PDF
    // ---------------------------------------------

    if (!fs.existsSync(mergedPath)) {
      throw new Error(
        "Merged PDF was not created"
      );
    }


    console.log(
      "PDF EXISTS:",
      true
    );


    // ---------------------------------------------
    // SAVE BILL TO MONGODB
    // ---------------------------------------------

    const bill = new Bill({
      patientName,
      email,
      pdfPath: mergedPath,
    });


    await bill.save();


    console.log(
      "BILL SAVED TO DATABASE"
    );


    // ---------------------------------------------
    // EMAIL
    // ---------------------------------------------

    const mailOptions = {

      from: `"Shradha Hospital" <${process.env.EMAIL_USER}>`,

      to: email,

      subject:
        "Shradha Hospital - Billing Documents",

      text:
        `Hello ${patientName},

Your hospital billing documents are attached.

Thank you,
Shradha Hospital`,

      attachments: [
        {
          filename:
            "Hospital_Bill.pdf",

          path:
            mergedPath,
        },
      ],
    };


    console.log(
      "Sending email to:",
      email
    );


    // ---------------------------------------------
    // SEND EMAIL
    // ---------------------------------------------

    const info =
      await transporter.sendMail(
        mailOptions
      );


    console.log(
      "================================="
    );

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );

    console.log(
      "MESSAGE ID:",
      info.messageId
    );

    console.log(
      "RESPONSE:",
      info.response
    );

    console.log(
      "================================="
    );


    // ---------------------------------------------
    // RESPONSE
    // ---------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Billing PDF created and email sent successfully",

      bill,

      messageId:
        info.messageId,

      pdfUrl:
        `http://localhost:5000/uploads/${mergedFileName}`,

    });


  } catch (error) {

    console.error(
      "\n================================="
    );

    console.error(
      "BILLING EMAIL ERROR"
    );

    console.error(
      "================================="
    );

    console.error(
      "Error Code:",
      error.code
    );

    console.error(
      "Error Message:",
      error.message
    );

    console.error(
      "Full Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Billing email failed",

      error:
        error.message,

      code:
        error.code,

    });

  }
};


// =====================================================
// GET ALL BILLS
// =====================================================

exports.getAllBills = async (req, res) => {

  try {

    const bills =
      await Bill.find()
        .sort({
          createdAt: -1,
        });


    return res.status(200).json({

      success: true,

      bills,

    });

  } catch (error) {

    console.error(
      "GET BILLS ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch bills",

      error:
        error.message,

    });

  }
};


// =====================================================
// GET BILL BY ID
// =====================================================

exports.getBillById = async (req, res) => {

  try {

    const bill =
      await Bill.findById(
        req.params.id
      );


    if (!bill) {

      return res.status(404).json({

        success: false,

        message:
          "Bill not found",

      });

    }


    return res.status(200).json({

      success: true,

      bill,

    });

  } catch (error) {

    console.error(
      "GET BILL ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch bill",

      error:
        error.message,

    });

  }
};


// =====================================================
// DELETE BILL
// =====================================================

exports.deleteBill = async (req, res) => {

  try {

    const bill =
      await Bill.findById(
        req.params.id
      );


    if (!bill) {

      return res.status(404).json({

        success: false,

        message:
          "Bill not found",

      });

    }


    // Delete PDF from filesystem

    if (
      bill.pdfPath &&
      fs.existsSync(
        bill.pdfPath
      )
    ) {

      fs.unlinkSync(
        bill.pdfPath
      );

    }


    // Delete database record

    await Bill.findByIdAndDelete(
      req.params.id
    );


    return res.status(200).json({

      success: true,

      message:
        "Bill deleted successfully",

    });

  } catch (error) {

    console.error(
      "DELETE BILL ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to delete bill",

      error:
        error.message,

    });

  }

};

