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
// GET /api/insurance/documents/case/:caseId — List all docs for a case
// ============================================================
exports.getDocumentsByCase = async (req, res) => {
  try {
    const documents = await ClaimDocument.find({
      insuranceCaseId: req.params.caseId,
      isDeleted: false,
      isLatest: true
    }).sort({ department: 1, uploadedAt: -1 })
      .populate('uploadedBy', 'name');

    // Group by department
    const grouped = documents.reduce((acc, doc) => {
      if (!acc[doc.department]) acc[doc.department] = [];
      acc[doc.department].push(doc);
      return acc;
    }, {});

    res.status(200).json({ success: true, count: documents.length, data: grouped });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// GET /api/insurance/documents/:id/history — Get version history
// ============================================================
exports.getDocumentHistory = async (req, res) => {
  try {
    const currentDoc = await ClaimDocument.findById(req.params.id);
    if (!currentDoc) return res.status(404).json({ success: false, message: 'Document not found' });

    // Find all versions of this document by name and case
    const history = await ClaimDocument.find({
      insuranceCaseId: currentDoc.insuranceCaseId,
      documentName: currentDoc.documentName,
      department: currentDoc.department
    }).sort({ documentVersion: -1 })
      .populate('uploadedBy', 'name');

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// GET /api/insurance/documents/:id/download — Log access and return URL
// ============================================================
exports.logDocumentAccess = async (req, res) => {
  try {
    const document = await ClaimDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    // Log the access
    document.accessLog.push({
      userId: req.user ? req.user.id : null,
      userName: req.user ? req.user.name : 'System/Unknown',
      action: 'Downloaded',
      timestamp: new Date()
    });

    await document.save();

    res.status(200).json({ 
      success: true, 
      downloadUrl: `/${document.documentUrl.replace('uploads/', '')}` 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// DELETE /api/insurance/documents/:id — Soft delete
// ============================================================
exports.deleteDocument = async (req, res) => {
  try {
    const document = await ClaimDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    document.isDeleted = true;
    document.deletedAt = new Date();
    document.deletedBy = req.user ? req.user.id : null;

    // Log in case audit trail
    if (document.insuranceCaseId) {
      await InsuranceCase.findByIdAndUpdate(document.insuranceCaseId, {
        $push: {
          auditTrail: {
            action: 'DOCUMENT_DELETED',
            timestamp: new Date(),
            details: `Document "${document.documentName}" soft deleted`
          }
        }
      });
    }

    await document.save();
    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// Fallback exports for backward compatibility with old routes
// ============================================================
exports.uploadDocument = async (req, res) => { /* Migration pending */ };
exports.getClaimDocuments = async (req, res) => { /* Migration pending */ };
exports.getPreAuthDocuments = async (req, res) => { /* Migration pending */ };
