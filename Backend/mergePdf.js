const fs =
require("fs");

const {
  PDFDocument
} = require("pdf-lib");

async function mergePDFs(

  pdfFiles,

  outputPath

) {

  const mergedPdf =
  await PDFDocument.create();

  for (const file of pdfFiles) {

    const pdfBytes =
    fs.readFileSync(file);

    const pdf =
    await PDFDocument.load(
      pdfBytes
    );

    const copiedPages =

    await mergedPdf.copyPages(

      pdf,

      pdf.getPageIndices()

    );

    copiedPages.forEach(

      (page) => {

        mergedPdf.addPage(page);

      }

    );

  }

  const mergedPdfBytes =
  await mergedPdf.save();

  fs.writeFileSync(

    outputPath,

    mergedPdfBytes

  );

}

module.exports =
mergePDFs;