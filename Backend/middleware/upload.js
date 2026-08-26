const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// INSURANCE DOCUMENT UPLOAD
// =====================================================

const uploadDir = path.join(__dirname, "../uploads/insurance-docs");

// Create insurance upload directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Insurance storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// =====================================================
// FILE TYPE VALIDATION
// =====================================================

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }

  cb(new Error("Images and PDFs Only!"));
}

// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
