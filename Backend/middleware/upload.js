// <<<<<<< HEAD
// // // const multer = require("multer");
// // // const path = require("path");
// // <<<<<<< HEAD
// // =======
// // // // const multer = require("multer");
// // // // const path = require("path");
// // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
// =======
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// // const fs = require("fs");

// // const multer = require("multer");
// // const path = require("path");
// // // const multer = require("multer");
// // // const path = require("path");
// >>>>>>> origin/main

// // // // // Storage Configuration

// // // // const storage = multer.diskStorage({

// // // //     destination: function (req, file, cb) {

// // // //         cb(null, "uploads/reports");

// // // //     },

// // // //     filename: function (req, file, cb) {

// // // //         const uniqueName =
// // // //             Date.now() +
// // // //             "-" +
// // // //             Math.round(Math.random() * 1E9);

// // // //         cb(

// // // //             null,

// // // //             uniqueName +
// // // //             path.extname(file.originalname)

// // // //         );

// // // //     }

// // // // });

// // // // // File Filter

// // // // const fileFilter = (req, file, cb) => {

// // // //     if (file.mimetype === "application/pdf") {

// // // //         cb(null, true);

// // // //     }

// // // //     else {

// // // //         cb(

// // // //             new Error("Only PDF files are allowed"),

// // // //             false

// // // //         );

// // // //     }

// // // // };

// // // // const upload = multer({

// // // //     storage,

// // // //     fileFilter,

// // // //     limits: {

// // // //         fileSize: 20 * 1024 * 1024

// // // //     }

// // // // });

// // // // module.exports = upload;





// // // const fs = require("fs");
// // // const path = require("path");
// // // const multer = require("multer");

// // // const uploadPath = path.join(__dirname, "../uploads/reports");

// // if (!fs.existsSync(uploadPath)) {
// // // if (!fs.existsSync(uploadPath)) {

// // //     fs.mkdirSync(uploadPath, { recursive: true });

// // // }

// // // const storage = multer.diskStorage({

// // //     destination: function (req, file, cb) {

// // //         cb(null, uploadPath);

// // //     },

// // //     filename: function (req, file, cb) {

// // //         cb(

// // //             null,

// // //             Date.now() + "-" + file.originalname

// // //         );

// // //     }

// // // });

// // // module.exports = multer({

// // //     storage

// // <<<<<<< HEAD
// // // });
// // // =======

// <<<<<<< HEAD
// =======
// // // module.exports = upload;





// // const fs = require("fs");
// //const path = require("path");
// >>>>>>> origin/main
// // const multer = require("multer");

//  const uploadPath = path.join(__dirname, "../uploads/reports");

// <<<<<<< HEAD
// // if (!fs.existsSync(uploadPath)) {
// =======
// if (!fs.existsSync(uploadPath)) {
// //  if (!fs.existsSync(uploadPath)) {
// >>>>>>> origin/main

// //     fs.mkdirSync(uploadPath, { recursive: true });

// //  }

// // const storage = multer.diskStorage({

// //     destination: function (req, file, cb) {

// //         cb(null, uploadPath);

// //     },

// //     filename: function (req, file, cb) {

// //         cb(

// //             null,

// //             Date.now() + "-" + file.originalname

// //         );

// //     }

// // });

// // module.exports = multer({

// //     storage

// <<<<<<< HEAD
// // =======
// // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
// =======
// };
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');
// >>>>>>> origin/main
// // });
// // // const multer = require('multer');
// // // const path = require('path');
// // // const fs = require('fs');
// // <<<<<<< HEAD
// // =======
// // // });
// // // =======

// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");
// // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da

// // // Ensure upload directory exists
// // const uploadDir = path.join(__dirname, "../uploads/insurance-docs");

// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir, { recursive: true });
// // }

// // // Set storage engine
// // const storage2 = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, uploadDir);
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix =
// //       Date.now() + "-" + Math.round(Math.random() * 1e9);

// //     cb(
// //       null,
// //       file.fieldname +
// //         "-" +
// //         uniqueSuffix +
// //         path.extname(file.originalname)
// //     );
// //   },
// // });

// // // Check file type
// // function checkFileType(file, cb) {
// //   const filetypes = /jpeg|jpg|png|pdf/;

// //   const extname = filetypes.test(
// //     path.extname(file.originalname).toLowerCase()
// //   );

// //   const mimetype = filetypes.test(file.mimetype);

// //   if (mimetype && extname) {
// //     return cb(null, true);
// //   } else {
// //     cb(new Error("Images and PDFs Only!"));
// //   }
// // }

// // const upload = multer({
// //   storage: storage2,
// //   limits: { fileSize: 5000000 }, // 5MB limit
// // <<<<<<< HEAD
// // =======
// //   storage,
// //   limits: { fileSize: 5000000 }, // 5 MB
// // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
// //   fileFilter: function (req, file, cb) {
// //     checkFileType(file, cb);
// //   },
// // });

// // module.exports = upload;
// // <<<<<<< HEAD
// // =======
// // module.exports = upload;
// // >>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da




// <<<<<<< HEAD
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // =====================================================
// // REPORTS UPLOAD CONFIGURATION
// // =====================================================

// const reportsDir = path.join(__dirname, "../uploads/reports");

// // Create reports directory if it doesn't exist
// if (!fs.existsSync(reportsDir)) {
//   fs.mkdirSync(reportsDir, { recursive: true });
// }

// const reportsStorage = multer.diskStorage({
// =======
// //const multer = require("multer");
// //const path = require("path");
//  //const fs = require("fs");

// // =====================================================
// // INSURANCE DOCUMENT UPLOAD
// // =====================================================

// const uploadDir = path.join(__dirname, "../uploads/insurance-docs");

// // Create insurance upload directory if it does not exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Insurance storage
// const storage = multer.diskStorage({
// >>>>>>> origin/main
//   destination: function (req, file, cb) {
//     cb(null, reportsDir);
//   },

// <<<<<<< HEAD
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(
//       null,
//       uniqueName + path.extname(file.originalname)
//     );
//   },
// });

// // Only PDF files for reports
// const reportsFileFilter = function (req, file, cb) {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// const uploadReports = multer({
//   storage: reportsStorage,
//   fileFilter: reportsFileFilter,
//   limits: {
//     fileSize: 20 * 1024 * 1024, // 20 MB
//   },
// });

// // =====================================================
// // INSURANCE DOCUMENT UPLOAD CONFIGURATION
// // =====================================================

// const insuranceDir = path.join(
//   __dirname,
//   "../uploads/insurance-docs"
// );

// // Create insurance directory if it doesn't exist
// if (!fs.existsSync(insuranceDir)) {
//   fs.mkdirSync(insuranceDir, { recursive: true });
// }

// const insuranceStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, insuranceDir);
//   },

// =======
// >>>>>>> origin/main
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
//     );
//   },
// });

// <<<<<<< HEAD
// // Allow JPEG, JPG, PNG and PDF
// const insuranceFileFilter = function (req, file, cb) {
//   const allowedExtensions = /jpeg|jpg|png|pdf/;

//   const extname = allowedExtensions.test(
//     path.extname(file.originalname).toLowerCase()
//   );
// =======
// // =====================================================
// // FILE TYPE VALIDATION
// // =====================================================

// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|pdf/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// >>>>>>> origin/main

//   const mimetype = allowedExtensions.test(
//     file.mimetype
//   );

//   if (mimetype && extname) {
// <<<<<<< HEAD
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPG, JPEG, PNG and PDF files are allowed!"));
//   }
// };

// const uploadInsurance = multer({
//   storage: insuranceStorage,
//   fileFilter: insuranceFileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB
//   },
// });

// // =====================================================
// // EXPORTS
// // =====================================================

// module.exports = {
//   uploadReports,
//   uploadInsurance,
// };
// =======
//     return cb(null, true);
//   }

//   cb(new Error("Images and PDFs Only!"));
// }

// // =====================================================
// // MULTER CONFIGURATION
// // =====================================================

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5MB limit
//   storage,
//   limits: { fileSize: 5000000 }, // 5 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// module.exports = upload;
// module.exports = upload;
// >>>>>>> origin/main


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// REPORTS UPLOAD CONFIGURATION
// =====================================================

const reportsDir = path.join(__dirname, "../uploads/reports");

// Create reports directory if it doesn't exist
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const reportsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, reportsDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// Only PDF files for reports
const reportsFileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const uploadReports = multer({
  storage: reportsStorage,
  fileFilter: reportsFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

// =====================================================
// INSURANCE DOCUMENT UPLOAD CONFIGURATION
// =====================================================

const insuranceDir = path.join(
  __dirname,
  "../uploads/insurance-docs"
);

// Create insurance directory if it doesn't exist
if (!fs.existsSync(insuranceDir)) {
  fs.mkdirSync(insuranceDir, { recursive: true });
}

const insuranceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, insuranceDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

// Allow JPEG, JPG, PNG and PDF
const insuranceFileFilter = function (req, file, cb) {
  const allowedExtensions = /jpeg|jpg|png|pdf/;

  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedExtensions.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG and PDF files are allowed!"),
      false
    );
  }
};

const uploadInsurance = multer({
  storage: insuranceStorage,
  fileFilter: insuranceFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  uploadReports,
  uploadInsurance,
};