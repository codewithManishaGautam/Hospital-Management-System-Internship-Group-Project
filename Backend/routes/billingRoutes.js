const express = require("express");
const multer = require("multer");

const router = express.Router();

const billingController =
  require("../controllers/billingController");

// PDF files memory मध्ये ठेवण्यासाठी
// कारण mergePdf.js ला file.buffer लागतो
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

// Send merged PDF by email
router.post(
  "/send-email",
  upload.array("pdfs", 10),
  billingController.sendMergedBill
);

// Get all bills
router.get(
  "/",
  billingController.getAllBills
);

// Get bill by ID
router.get(
  "/:id",
  billingController.getBillById
);

// Delete bill
router.delete(
  "/:id",
  billingController.deleteBill
);

module.exports = router;