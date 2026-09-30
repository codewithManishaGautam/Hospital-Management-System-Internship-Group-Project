



const fs = require("fs");
const path = require("path"); 
const { PDFDocument } = require("pdf-lib");


const mergePDFs = async (files, outputPath) => {
  try {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new Error("No PDF files were uploaded");
    }

    console.log("=================================");
    console.log("MERGING PDF FILES");
    console.log("=================================");
    console.log("Number of PDFs:", files.length);

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      console.log("Reading PDF:", file.originalname);

      // ------------------------------------------------
      // Multer memoryStorage()
      // ------------------------------------------------
      if (!file.buffer) {
        throw new Error(
          `PDF buffer is missing for file: ${file.originalname}`
        );
      }

      if (file.mimetype !== "application/pdf") {
        throw new Error(
          `Invalid file type: ${file.originalname}`
        );
      }

      const pdf = await PDFDocument.load(file.buffer);

      const pages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => {
        mergedPdf.addPage(page);
      });

      console.log(
        `Added: ${file.originalname} (${pages.length} pages)`
      );
    }

    // ------------------------------------------------
    // Ensure output directory exists
    // ------------------------------------------------

    const outputDirectory = path.dirname(outputPath);

    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, {
        recursive: true,
      });
    }

    // ------------------------------------------------
    // Save merged PDF
    // ------------------------------------------------

    const mergedPdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, mergedPdfBytes);

    console.log("---------------------------------");
    console.log("Merged PDF created successfully");
    console.log("Merged PDF Path:", outputPath);
    console.log("---------------------------------");

    return outputPath;
  } catch (error) {
    console.error("=================================");
    console.error("MERGE PDF ERROR");
    console.error("=================================");
    console.error("Error:", error.message);
    console.error("Full Error:", error);

    throw error;
  }
};

module.exports = mergePDFs;