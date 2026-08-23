// const fs =
// require("fs");

// const {
//   PDFDocument
// } = require("pdf-lib");

// async function mergePDFs(

//   pdfFiles,

//   outputPath

// ) {

//   const mergedPdf =
//   await PDFDocument.create();

//   for (const file of pdfFiles) {

//     const pdfBytes =
//     fs.readFileSync(file);

//     const pdf =
//     await PDFDocument.load(
//       pdfBytes
//     );

//     const copiedPages =

//     await mergedPdf.copyPages(

//       pdf,

//       pdf.getPageIndices()

//     );

//     copiedPages.forEach(

//       (page) => {

//         mergedPdf.addPage(page);

//       }

//     );

//   }

//   const mergedPdfBytes =
//   await mergedPdf.save();

//   fs.writeFileSync(

//     outputPath,

//     mergedPdfBytes

//   );

// }

// module.exports =
// mergePDFs;



const fs = require("fs");

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

        console.log(
            "Reading PDF buffer..."
        );


        if (!file || !file.buffer) {

            throw new Error(
                "PDF buffer is undefined"
            );

        }


        // PDF file buffer

        const pdfBytes =
            file.buffer;


        // Load PDF

        const pdf =
            await PDFDocument.load(
                pdfBytes
            );


        // Copy pages

        const copiedPages =
            await mergedPdf.copyPages(
                pdf,
                pdf.getPageIndices()
            );


        // Add pages

        copiedPages.forEach(
            (page) => {

                mergedPdf.addPage(page);

            }
        );

    }


    // Save merged PDF

    const mergedPdfBytes =
        await mergedPdf.save();


    // Write merged PDF

    fs.writeFileSync(
        outputPath,
        mergedPdfBytes
    );


    console.log(
        "Merged PDF created:",
        outputPath
    );

}


module.exports =
    mergePDFs;