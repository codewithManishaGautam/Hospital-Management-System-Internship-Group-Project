const InsuranceCase = require('../../models/insurance/InsuranceCase');
const ClaimDocument = require('../../models/insurance/ClaimDocument');
const PDFDocument = require('pdfkit');
const PDFMerger = require('pdf-merger-js');
const fs = require('fs');
const path = require('path');

const generatedDir = path.join(__dirname, '../../generated/insurance-claims');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// Generate cover page using pdfkit
const generateCoverPage = async (insuranceCase, orderedDocs, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Title
    doc.fontSize(24).font('Helvetica-Bold').text('CLAIM PACKAGE', { align: 'center' });
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Details
    doc.fontSize(12).font('Helvetica');
    const details = [
      { label: 'Case Number', value: insuranceCase.caseNumber },
      { label: 'Patient Name', value: insuranceCase.patientId?.name || 'N/A' },
      { label: 'Insurance Provider', value: insuranceCase.insuranceCompanyId?.companyName || 'N/A' },
      { label: 'IPD Number', value: insuranceCase.admissionId?.ipdNumber || 'N/A' },
      { label: 'Total Billed Amount', value: `Rs. ${insuranceCase.financials?.totalBilled || 0}` },
      { label: 'Generated At', value: new Date().toLocaleString() }
    ];

    details.forEach(d => {
      doc.font('Helvetica-Bold').text(`${d.label}: `, { continued: true });
      doc.font('Helvetica').text(d.value);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Index
    doc.fontSize(16).font('Helvetica-Bold').text('Index of Documents', { underline: true });
    doc.moveDown(0.5);
    
    doc.fontSize(11).font('Helvetica');
    orderedDocs.forEach((d, i) => {
      doc.text(`${i + 1}. [${d.department}] ${d.category} - ${d.documentName}`);
      doc.moveDown(0.2);
    });

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

// POST /api/insurance/cases/:caseId/generate-claim-package
exports.generateClaimPackage = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { documentOrder } = req.body; // Array of ClaimDocument IDs to include

    const insuranceCase = await InsuranceCase.findById(caseId)
      .populate('patientId')
      .populate('insuranceCompanyId')
      .populate('admissionId');

    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    // 1. Fetch requested documents
    let docsToMerge = [];
    if (documentOrder && documentOrder.length > 0) {
      docsToMerge = await ClaimDocument.find({ _id: { $in: documentOrder } });
      // Sort them in the exact order requested
      docsToMerge.sort((a, b) => documentOrder.indexOf(a._id.toString()) - documentOrder.indexOf(b._id.toString()));
    } else {
      // Default: fetch all case docs, order by standard sequence
      const allDocs = await ClaimDocument.find({ insuranceCaseId: caseId, isDeleted: false, isLatest: true });
      
      const orderMap = {
        'Claim Form': 1,
        'Pre-Auth Form': 2,
        'ID Proof': 3,
        'Insurance Card': 4,
        'Discharge Summary': 5,
        'Final Bill': 6,
        'Payment Receipt': 7,
        'Lab Report': 8,
        'Radiology Report': 9,
        'Medical Record': 10,
        'Pharmacy Bill': 11,
        'Doctor Notes': 12,
        'Other': 13
      };
      
      docsToMerge = allDocs.sort((a, b) => (orderMap[a.category] || 99) - (orderMap[b.category] || 99));
    }

    if (docsToMerge.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid PDF documents found to merge' });
    }

    const outputFileName = `Claim_Package_${insuranceCase.caseNumber}_${Date.now()}.pdf`;
    const outputPath = path.join(generatedDir, outputFileName);
    const coverPagePath = path.join(generatedDir, `Cover_${insuranceCase.caseNumber}_${Date.now()}.pdf`);

    // 2. Generate Cover Page
    await generateCoverPage(insuranceCase, docsToMerge, coverPagePath);

    // 3. Merge Documents
    const merger = new PDFMerger();
    
    // Add cover page
    await merger.add(coverPagePath);

    // Add forms generated earlier (these are in the forms directory)
    for (const form of insuranceCase.requiredForms) {
      if (form.generatedPdfPath && fs.existsSync(form.generatedPdfPath)) {
        try { await merger.add(form.generatedPdfPath); } catch (e) { console.error(`Error adding form ${form.formName}`, e); }
      }
    }

    // Add physical documents
    for (const doc of docsToMerge) {
      const fullDocPath = path.join(__dirname, '../../', doc.documentUrl);
      if (fs.existsSync(fullDocPath) && fullDocPath.toLowerCase().endsWith('.pdf')) {
        try {
          await merger.add(fullDocPath);
        } catch (e) {
          console.error(`Error adding ${doc.documentName} to merge:`, e);
          // Continue with others even if one fails
        }
      }
    }

    await merger.save(outputPath);

    // Cleanup temp cover page
    if (fs.existsSync(coverPagePath)) fs.unlinkSync(coverPagePath);

    // 4. Update Insurance Case
    const relativePath = `generated/insurance-claims/${outputFileName}`;
    insuranceCase.claimPackagePath = relativePath;
    insuranceCase.claimPackageGeneratedAt = new Date();
    
    insuranceCase.auditTrail.push({
      action: 'CLAIM_PACKAGE_GENERATED',
      timestamp: new Date(),
      details: `Generated claim package PDF with ${docsToMerge.length} documents`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: 'Claim package generated successfully',
      data: {
        packageUrl: `/${relativePath}`,
        includedDocuments: docsToMerge.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
