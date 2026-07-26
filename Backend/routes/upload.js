const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const fs = require("fs");

// =====================================
// Upload Folder
// =====================================

const uploadPath = path.join(

    __dirname,

    "../uploads/consents"

);

if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, {

        recursive: true

    });

}

// =====================================
// Multer Storage
// =====================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(

            null,

            uploadPath

        );

    },

    filename: (req, file, cb) => {

        const fileName =

            Date.now() +

            "-" +

            file.originalname;

        cb(

            null,

            fileName

        );

    }

});

const upload = multer({

    storage

});

// =====================================
// Upload PDF
// =====================================

router.post(

    "/",

    upload.single("file"),

    (req, res) => {

        if (!req.file) {

            return res.status(400).json({

                message: "No File Uploaded"

            });

        }

        res.status(200).json({

            message: "PDF Uploaded Successfully",

            filePath:

                "/uploads/consents/" +

                req.file.filename

        });

    }

);

module.exports = router;