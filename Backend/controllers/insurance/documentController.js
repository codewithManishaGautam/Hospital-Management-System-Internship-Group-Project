const ClaimDocument = require('../../models/insurance/ClaimDocument');
const InsuranceClaim = require('../../models/insurance/InsuranceClaim');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const fs = require('fs');
const path = require('path');

// Category-to-checklist-field mapping
const CHECKLIST_MAP = {
  'Admission Form': 'admissionForm',
  'Discharge Summary': 'dischargeSummary',
  'Investigation Reports': 'investigationReports',
  'Prescription': 'prescription',
  'Doctor Notes': 'doctorNotes',
  'Bill/Invoice': 'billInvoice',
  'Consent Form': 'consentForm',
  'Insurance Card Copy': 'insuranceCardCopy',
  'ID Proof': 'idProof'
};

// POST /documents/upload - Upload a single document
exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const document = new ClaimDocument({
      claimId: req.body.claimId,
      preAuthId: req.body.preAuthId,
      category: req.body.category,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: `/uploads/insurance-docs/${req.file.filename}`,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.body.uploadedBy || null
    });

    await document.save();

    // Auto-update claim document checklist
    if (req.body.claimId && CHECKLIST_MAP[req.body.category]) {
      const checklistField = CHECKLIST_MAP[req.body.category];
      await InsuranceClaim.findByIdAndUpdate(
        req.body.claimId,
        { $set: { [`documentChecklist.${checklistField}`]: true } }
      );
    }

    // Auto-link document to pre-auth
    if (req.body.preAuthId) {
      await PreAuthRequest.findByIdAndUpdate(
        req.body.preAuthId,
        { $push: { documents: document._id } }
      );
    }

    // Auto-link document to claim
    if (req.body.claimId) {
      await InsuranceClaim.findByIdAndUpdate(
        req.body.claimId,
        { $push: { documents: document._id } }
      );
    }

    res.status(201).json({ success: true, message: 'Document uploaded successfully', data: document });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /documents/claim/:claimId - Get all documents for a claim
exports.getClaimDocuments = async (req, res, next) => {
  try {
    const documents = await ClaimDocument.find({ claimId: req.params.claimId, isDeleted: false });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /documents/pre-auth/:preAuthId - Get all documents for a pre-auth
exports.getPreAuthDocuments = async (req, res, next) => {
  try {
    const documents = await ClaimDocument.find({ preAuthId: req.params.preAuthId, isDeleted: false });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /documents/:id - Soft delete a document
exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await ClaimDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    
    const filePath = path.join(__dirname, '../../', document.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    document.isDeleted = true;
    document.deletedAt = new Date();
    await document.save();
    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
