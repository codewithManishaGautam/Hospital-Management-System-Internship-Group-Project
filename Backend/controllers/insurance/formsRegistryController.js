const OfficialFormsRegistry = require('../../models/insurance/OfficialFormsRegistry');
const path = require('path');
const fs = require('fs');

// POST /api/insurance/forms-registry — Create / upload a new form
exports.createForm = async (req, res) => {
  try {
    const formData = { ...req.body };

    // If a file was uploaded via multer
    if (req.file) {
      formData.filePath = req.file.path.replace(/\\/g, '/');
      if (!formData.fileFormat) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const formatMap = { '.pdf': 'PDF', '.docx': 'DOCX', '.xlsx': 'Excel', '.xls': 'Excel' };
        formData.fileFormat = formatMap[ext] || 'PDF';
      }
    }

    const form = new OfficialFormsRegistry(formData);
    await form.save();

    res.status(201).json({
      success: true,
      message: 'Form registered successfully',
      data: form
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/insurance/forms-registry — List all forms with filters
exports.listForms = async (req, res) => {
  try {
    const filter = { isActive: true, isDeprecated: false };

    if (req.query.insuranceCompanyId) filter.insuranceCompanyId = req.query.insuranceCompanyId;
    if (req.query.tpaId) filter.tpaId = req.query.tpaId;
    if (req.query.insurerOrTpaName) filter.insurerOrTpaName = { $regex: req.query.insurerOrTpaName, $options: 'i' };
    if (req.query.formCategory) filter.formCategory = req.query.formCategory;
    if (req.query.claimType) filter.claimType = { $in: [req.query.claimType, 'Both'] };
    if (req.query.isMandatory) filter.isMandatory = req.query.isMandatory === 'true';
    if (req.query.templateId) filter.templateId = req.query.templateId;

    const forms = await OfficialFormsRegistry.find(filter)
      .populate('insuranceCompanyId', 'companyName shortName')
      .populate('tpaId', 'tpaName shortName')
      .sort({ formCategory: 1, formName: 1 });

    res.status(200).json({ success: true, count: forms.length, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/insurance/forms-registry/company/:companyId — Auto-select forms for a company (BRD §3 Step 3)
exports.getFormsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find forms mapped to this company that are active and not expired
    const now = new Date();
    const forms = await OfficialFormsRegistry.find({
      insuranceCompanyId: companyId,
      isActive: true,
      isDeprecated: false,
      effectiveDate: { $lte: now },
      $or: [
        { expiryDate: null },
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: now } }
      ]
    })
    .populate('insuranceCompanyId', 'companyName shortName')
    .sort({ isMandatory: -1, formCategory: 1, formName: 1 }); // Mandatory forms first

    // Separate mandatory and optional
    const mandatory = forms.filter(f => f.isMandatory);
    const optional = forms.filter(f => !f.isMandatory);

    res.status(200).json({
      success: true,
      companyId,
      totalForms: forms.length,
      mandatoryCount: mandatory.length,
      optionalCount: optional.length,
      mandatory,
      optional
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/insurance/forms-registry/:id — Get single form
exports.getFormById = async (req, res) => {
  try {
    const form = await OfficialFormsRegistry.findById(req.params.id)
      .populate('insuranceCompanyId', 'companyName shortName')
      .populate('tpaId', 'tpaName shortName');

    if (!form) return res.status(404).json({ success: false, message: 'Form not found' });

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/insurance/forms-registry/:id — Update form
exports.updateForm = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.filePath = req.file.path.replace(/\\/g, '/');
    }

    const form = await OfficialFormsRegistry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!form) return res.status(404).json({ success: false, message: 'Form not found' });

    res.status(200).json({ success: true, message: 'Form updated', data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/insurance/forms-registry/:id — Soft delete
exports.deleteForm = async (req, res) => {
  try {
    const form = await OfficialFormsRegistry.findByIdAndUpdate(
      req.params.id,
      { isActive: false, isDeprecated: true },
      { new: true }
    );

    if (!form) return res.status(404).json({ success: false, message: 'Form not found' });

    res.status(200).json({ success: true, message: 'Form deactivated', data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
