const GovernmentScheme = require('../../models/insurance/GovernmentScheme');

// 1. POST /schemes - Enroll patient under a government scheme
exports.enrollScheme = async (req, res, next) => {
  try {
    const scheme = new GovernmentScheme(req.body);
    await scheme.save();
    res.status(201).json({
      success: true,
      message: 'Scheme enrolled successfully',
      data: scheme
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET /schemes/:patientId - Get scheme enrollments for patient
exports.getPatientSchemes = async (req, res, next) => {
  try {
    const schemes = await GovernmentScheme.find({ patientId: req.params.patientId });
    res.status(200).json({ success: true, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. PUT /schemes/:schemeId - Update scheme details
exports.updateScheme = async (req, res, next) => {
  try {
    const scheme = await GovernmentScheme.findByIdAndUpdate(req.params.schemeId, req.body, { new: true, runValidators: true });
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.status(200).json({ success: true, message: 'Scheme updated successfully', data: scheme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. PATCH /schemes/:schemeId/verify - Update verification status
exports.updateSchemeVerificationStatus = async (req, res, next) => {
  try {
    const { verificationStatus } = req.body;
    const scheme = await GovernmentScheme.findByIdAndUpdate(
      req.params.schemeId, 
      { verificationStatus, verifiedAt: new Date() }, 
      { new: true }
    );
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.status(200).json({ success: true, message: 'Verification status updated', data: scheme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
