// const multer = require("multer");
// const path = require("path");
<<<<<<< HEAD
=======
// // const multer = require("multer");
// // const path = require("path");
>>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da

// // // Storage Configuration

// // const storage = multer.diskStorage({

// //     destination: function (req, file, cb) {

// //         cb(null, "uploads/reports");

// //     },

// //     filename: function (req, file, cb) {

// //         const uniqueName =
// //             Date.now() +
// //             "-" +
// //             Math.round(Math.random() * 1E9);

// //         cb(

// //             null,

// //             uniqueName +
// //             path.extname(file.originalname)

// //         );

// //     }

// // });

// // // File Filter

// // const fileFilter = (req, file, cb) => {

// //     if (file.mimetype === "application/pdf") {

// //         cb(null, true);

// //     }

// //     else {

// //         cb(

// //             new Error("Only PDF files are allowed"),

// //             false

// //         );

// //     }

// // };

// // const upload = multer({

// //     storage,

// //     fileFilter,

// //     limits: {

// //         fileSize: 20 * 1024 * 1024

// //     }

// // });

// // module.exports = upload;





// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");

// const uploadPath = path.join(__dirname, "../uploads/reports");

if (!fs.existsSync(uploadPath)) {
// if (!fs.existsSync(uploadPath)) {

//     fs.mkdirSync(uploadPath, { recursive: true });

// }

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {

//         cb(null, uploadPath);

//     },

//     filename: function (req, file, cb) {

//         cb(

//             null,

//             Date.now() + "-" + file.originalname

//         );

//     }

// });

// module.exports = multer({

//     storage

<<<<<<< HEAD
// });
// =======

const multer = require("multer");

const uploadPath = path.join(__dirname, "../uploads/reports");

if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, { recursive: true });

}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadPath);

    },

    filename: function (req, file, cb) {

        cb(

            null,

            Date.now() + "-" + file.originalname

        );

    }

});

module.exports = multer({

    storage

=======
>>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
});
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
<<<<<<< HEAD
=======
// });
// =======

const multer = require("multer");
const path = require("path");
const fs = require("fs");
>>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/insurance-docs");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
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

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;

  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Images and PDFs Only!"));
  }
}

const upload = multer({
  storage: storage2,
  limits: { fileSize: 5000000 }, // 5MB limit
<<<<<<< HEAD
=======
  storage,
  limits: { fileSize: 5000000 }, // 5 MB
>>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
<<<<<<< HEAD
=======
module.exports = upload;
>>>>>>> 735352d1e14ce85733f6606b8df0a31a0f07b6da
