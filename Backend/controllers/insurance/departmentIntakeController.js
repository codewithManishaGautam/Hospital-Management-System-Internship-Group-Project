const ClaimDocument = require('../../models/insurance/ClaimDocument');
const InsuranceCase = require('../../models/insurance/InsuranceCase');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/department-docs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ============================================================
// POST /api/insurance/cases/:caseId/department-docs
// Any hospital department pushes a document to the Insurance Case
// ============================================================
exports.intakeDepartmentDocument = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { department, category, documentName, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Document file is required' });
    }

    const insuranceCase = await InsuranceCase.findById(caseId);
    if (!insuranceCase) {
      // Clean up uploaded file if case not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: 'Insurance case not found' });
    }

    const docPath = req.file.path.replace(/\\/g, '/');

    const document = new ClaimDocument({
      patientId: insuranceCase.patientId,
      insuranceCaseId: insuranceCase._id,
      claimId: insuranceCase.claimId,
      preAuthId: insuranceCase.preAuthId,
      department: department || 'Other',
      category: category || 'Medical Record',
      documentName: documentName || req.file.originalname,
      documentUrl: docPath,
      notes,
      uploadedAt: new Date()
    });

    await document.save();

    // Link to case
    insuranceCase.documents.push(document._id);
    insuranceCase.auditTrail.push({
      action: 'DOCUMENT_RECEIVED',
      timestamp: new Date(),
      details: `${department || 'Unknown'} Dept pushed document: ${document.documentName}`
    });

    await insuranceCase.save();

    res.status(201).json({
      success: true,
      message: 'Document successfully pushed to Insurance Case',
      data: document
    });
  } catch (error) {
    if (req.file && req.file.path) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
