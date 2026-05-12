const express = require('express');
const router = express.Router();
const InsuranceClaim = require('../models/InsuranceClaim');
const upload = require('../middleware/upload');


// @route   POST /api/insurance/verify-patient
// @desc    Verify patient insurance details (Mock Implementation)
router.post('/verify-patient', async (req, res) => {
  try {
    const { patientId, insuranceProvider, policyNumber } = req.body;
    
    if (!patientId || !insuranceProvider || !policyNumber) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // MOCK VERIFICATION LOGIC
    // In production, this would call external API (Ayushman Bharat, TPA, etc.)
    const isValid = policyNumber.length > 5; // Simple mock validation
    
    if (isValid) {
      res.status(200).json({
        success: true,
        message: 'Insurance verified successfully',
        data: {
          status: 'active',
          coverageLimit: 500000,
          validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
      });
    } else {
      res.status(404).json({ success: false, error: 'Policy details invalid or expired' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/pre-auth
// @desc    Submit a pre-auth request for a patient
router.post('/pre-auth', async (req, res) => {
  try {
    const { patientId, insuranceProvider, policyNumber, estimatedCost, diagnosis } = req.body;

    // Create a new claim record in Pending state
    const newClaim = new InsuranceClaim({
      patientId,
      insuranceProvider,
      policyNumber,
      claimType: 'Cashless',
      status: 'Pending Pre-Auth',
      estimatedCost,
      diagnosis
    });

    await newClaim.save();

    res.status(201).json({
      success: true,
      message: 'Pre-auth request submitted',
      data: newClaim
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/insurance/claims
// @desc    Get all claims
router.get('/claims', async (req, res) => {
  try {
    const claims = await InsuranceClaim.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: claims });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/claims/:id/upload
// @desc    Upload documents for a specific claim (Pre-Auth / Discharge)
router.post('/claims/:id/upload', upload.array('documents', 5), async (req, res) => {
  try {
    const claimId = req.params.id;
    
    // In a real application, we would update the claim record in the DB
    // to include the file paths of the uploaded documents.
    // For now, we will just return success with the file details.
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    }));

    // Update the claim record with the uploaded documents
    const updatedClaim = await InsuranceClaim.findByIdAndUpdate(
      claimId, 
      { $push: { documents: { $each: uploadedFiles } } },
      { new: true }
    );

    if (!updatedClaim) {
       return res.status(404).json({ success: false, error: 'Claim not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Documents uploaded successfully',
      data: updatedClaim
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error during upload' });
  }
});

module.exports = router;

