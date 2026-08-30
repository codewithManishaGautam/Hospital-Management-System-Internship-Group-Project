const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function mergePDFs(pdfFiles, outputPath) {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    console.log("Reading PDF:", file.path);

    if (!file || !file.path) {
      throw new Error("Uploaded PDF path is undefined");
    }

    // Read uploaded PDF from disk
    const pdfBytes = fs.readFileSync(file.path);

    // Load PDF
    const pdf = await PDFDocument.load(pdfBytes);

    // Copy all pages
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    // Add pages to merged PDF
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  // Create merged PDF
  const mergedPdfBytes = await mergedPdf.save();

  // Save merged PDF
  fs.writeFileSync(outputPath, mergedPdfBytes);

  console.log("Merged PDF created:", outputPath);
}

module.exports = mergePDFs;
