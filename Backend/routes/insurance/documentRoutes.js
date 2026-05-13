const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const ClaimDocument = require('../../models/insurance/ClaimDocument');
const InsuranceClaim = require('../../models/insurance/InsuranceClaim');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');

// @route   POST /api/insurance/documents/upload
// @desc    Upload documents
router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const { claimId, preAuthId, category, uploadedBy } = req.body;

    if (!claimId && !preAuthId) {
       return res.status(400).json({ success: false, error: 'Must provide claimId or preAuthId' });
    }

    const newDocument = new ClaimDocument({
      claimId: claimId || undefined,
      preAuthId: preAuthId || undefined,
      category,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy
    });

    await newDocument.save();

    // Link document to claim or pre-auth
    if (claimId) {
      await InsuranceClaim.findByIdAndUpdate(claimId, {
        $push: { documents: newDocument._id }
      });
    } else if (preAuthId) {
      await PreAuthRequest.findByIdAndUpdate(preAuthId, {
        $push: { documents: newDocument._id }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: newDocument
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/documents/claim/:claimId
// @desc    Get all documents for a claim
router.get('/claim/:claimId', async (req, res) => {
  try {
    const documents = await ClaimDocument.find({ claimId: req.params.claimId, isDeleted: false });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/documents/pre-auth/:preAuthId
// @desc    Get all documents for a pre-auth
router.get('/pre-auth/:preAuthId', async (req, res) => {
  try {
    const documents = await ClaimDocument.find({ preAuthId: req.params.preAuthId, isDeleted: false });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   DELETE /api/insurance/documents/:docId
// @desc    Soft-delete a document
router.delete('/:docId', async (req, res) => {
  try {
    const deletedDoc = await ClaimDocument.findByIdAndUpdate(
      req.params.docId,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!deletedDoc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
