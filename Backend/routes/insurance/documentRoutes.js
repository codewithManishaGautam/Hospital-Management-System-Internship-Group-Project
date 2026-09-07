// const express = require('express');
// const router = express.Router();
// const documentController = require('../../controllers/insurance/documentController');
// const upload = require('../../middleware/upload');

// // @route   POST /api/insurance/documents/upload
// // @desc    Upload a single document
// router.post('/upload', upload.single('document'), documentController.uploadDocument);

// // @route   GET /api/insurance/documents/claim/:claimId
// // @desc    Get all documents for a claim
// router.get('/claim/:claimId', documentController.getClaimDocuments);

// // @route   GET /api/insurance/documents/pre-auth/:preAuthId
// // @desc    Get all documents for a pre-auth
// router.get('/pre-auth/:preAuthId', documentController.getPreAuthDocuments);

// // @route   DELETE /api/insurance/documents/:id
// // @desc    Delete a document
// router.get('/case/:caseId', documentController.getDocumentsByCase);
// router.get('/:id/history', documentController.getDocumentHistory);
// router.get('/:id/download', documentController.logDocumentAccess);
// router.delete('/:id', documentController.deleteDocument);

// module.exports = router;



const express = require("express");

const router = express.Router();

const documentController = require("../../controllers/insurance/documentController");

const { uploadInsurance } = require("../../middleware/upload");

// POST /api/insurance/documents/upload
// Upload a single insurance document
router.post(
  "/upload",
  uploadInsurance.single("document"),
  documentController.uploadDocument
);

// GET /api/insurance/documents/claim/:claimId
// Get all documents for a claim
router.get(
  "/claim/:claimId",
  documentController.getClaimDocuments
);

// GET /api/insurance/documents/pre-auth/:preAuthId
// Get all documents for a pre-auth
router.get(
  "/pre-auth/:preAuthId",
  documentController.getPreAuthDocuments
);

// GET /api/insurance/documents/case/:caseId
// Get all documents for a case
router.get(
  "/case/:caseId",
  documentController.getDocumentsByCase
);

// GET /api/insurance/documents/:id/history
// Get document history
router.get(
  "/:id/history",
  documentController.getDocumentHistory
);

// GET /api/insurance/documents/:id/download
// Log document access / download
router.get(
  "/:id/download",
  documentController.logDocumentAccess
);

// DELETE /api/insurance/documents/:id
// Delete a document
router.delete(
  "/:id",
  documentController.deleteDocument
);

module.exports = router;

