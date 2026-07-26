// const multer = require("multer");
// const path = require("path");

// // Storage Configuration

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {

//         cb(null, "uploads/reports");

//     },

//     filename: function (req, file, cb) {

//         const uniqueName =
//             Date.now() +
//             "-" +
//             Math.round(Math.random() * 1E9);

//         cb(

//             null,

//             uniqueName +
//             path.extname(file.originalname)

//         );

//     }

// });

// // File Filter

// const fileFilter = (req, file, cb) => {

//     if (file.mimetype === "application/pdf") {

//         cb(null, true);

//     }

//     else {

//         cb(

//             new Error("Only PDF files are allowed"),

//             false

//         );

//     }

// };

// const upload = multer({

//     storage,

//     fileFilter,

//     limits: {

//         fileSize: 20 * 1024 * 1024

//     }

// });

// module.exports = upload;





const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadPath = path.join(__dirname, "../uploads/reports");

// Folder नसल्यास तयार कर
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

});