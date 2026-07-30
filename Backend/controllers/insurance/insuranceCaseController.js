const InsuranceCase = require('../../models/insurance/InsuranceCase');
const Admission = require('../../models/insurance/Admission');
const PatientInsurancePolicy = require('../../models/insurance/PatientInsurancePolicy');
const GovernmentScheme = require('../../models/insurance/GovernmentScheme');
const OfficialFormsRegistry = require('../../models/insurance/OfficialFormsRegistry');
const PreAuthRequest = require('../../models/insurance/PreAuthRequest');
const InsuranceClaim = require('../../models/insurance/InsuranceClaim');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ==========================================
// MOCK NOTIFICATION SERVICE (PHASE 5)
// ==========================================
const NotificationService = {
  sendPatientNotification: (patientId, type, message) => {
    console.log(`\n======================================================`);
    console.log(`✉️  [NOTIFICATION ENGIN] Sending ${type} to Patient ${patientId}`);
    console.log(`   Message: ${message}`);
    console.log(`   Time: ${new Date().toLocaleString()}`);
    console.log(`======================================================\n`);
  }
};

// Ensure generated directory exists
const generatedDir = path.join(__dirname, '../../generated/insurance-forms');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// ============================================================
// STEP 1: Create Insurance Case (from patient admission)
// POST /api/insurance/cases
// ============================================================
exports.createCase = async (req, res) => {
  try {
    const { patientId, admissionId, policyId, schemeId, insuranceCompanyId, tpaId, notes } = req.body;

    if (!patientId) {
      return res.status(400).json({ success: false, message: 'patientId is required' });
    }

    // Create or link admission
    let admission;
    if (admissionId) {
      admission = await Admission.findById(admissionId);
      if (!admission) return res.status(404).json({ success: false, message: 'Admission not found' });
    } else {
      // Auto-create admission record
      admission = new Admission({
        patientId,
        admissionDate: req.body.admissionDate || new Date(),
        wardType: req.body.wardType || 'General',
        admittingDoctor: req.body.admittingDoctor,
        diagnosis: req.body.diagnosis,
        admissionType: req.body.admissionType || 'Planned',
        activePolicyId: policyId,
        identityProofs: req.body.identityProofs || {}
      });
      await admission.save();
    }

    // Resolve insurance company from policy if not provided
    let resolvedCompanyId = insuranceCompanyId;
    if (!resolvedCompanyId && policyId) {
      const policy = await PatientInsurancePolicy.findById(policyId);
      if (policy) resolvedCompanyId = policy.insuranceCompanyId;
    }

    const insuranceCase = new InsuranceCase({
      patientId,
      admissionId: admission._id,
      policyId: policyId || null,
      schemeId: schemeId || null,
      insuranceCompanyId: resolvedCompanyId || null,
      tpaId: tpaId || null,
      status: 'OPEN',
      notes,
      statusHistory: [{ status: 'OPEN', changedAt: new Date(), notes: 'Case created' }],
      auditTrail: [{ action: 'CASE_CREATED', timestamp: new Date(), details: `Insurance case created for patient ${patientId}` }]
    });

    await insuranceCase.save();

    // Link case back to admission
    admission.insuranceCaseId = insuranceCase._id;
    await admission.save();

    res.status(201).json({
      success: true,
      message: 'Insurance Case created successfully',
      data: insuranceCase
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// STEP 2: Insurance Verification
// POST /api/insurance/cases/:id/verify
// ============================================================
exports.verifyInsurance = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    // Fetch policy details
    let verificationResult = {};

    if (insuranceCase.policyId) {
      const policy = await PatientInsurancePolicy.findById(insuranceCase.policyId)
        .populate('insuranceCompanyId', 'companyName isCashless');

      if (!policy) {
        return res.status(400).json({ success: false, message: 'Policy not found' });
      }

      const now = new Date();
      const policyValid = policy.isActive &&
        new Date(policy.policyStartDate) <= now &&
        new Date(policy.policyEndDate) >= now;

      verificationResult = {
        policyValid,
        policyStatus: policyValid ? 'Active' : 'Invalid/Expired',
        sumInsured: policy.sumInsured,
        remainingBalance: policy.availableBalance || (policy.sumInsured - (policy.utilizedAmount || 0)),
        cashlessEligible: policy.insuranceCompanyId?.isCashless !== false,
        networkHospital: true, // Our hospital is always in-network for saved companies
        roomEligibility: policy.roomTypeEntitlement || 'As per policy',
        coPay: policy.copayPercentage || 0,
        deductible: 0,
        exclusions: [],
        waitingPeriodCleared: true, // Simplified; real system would check disease-specific waiting
        diseaseCoverage: true,
        verifiedAt: new Date(),
        notes: req.body.notes || 'Automatic verification completed'
      };

      // Mark policy as verified
      if (!policy.eligibilityVerified) {
        policy.eligibilityVerified = true;
        policy.eligibilityVerifiedAt = new Date();
        await policy.save();
      }
    } else if (insuranceCase.schemeId) {
      // Government scheme verification
      const scheme = await GovernmentScheme.findById(insuranceCase.schemeId);
      if (scheme) {
        verificationResult = {
          policyValid: scheme.isActive,
          policyStatus: scheme.isActive ? 'Active Scheme' : 'Inactive',
          sumInsured: scheme.coverageAmount || 500000,
          remainingBalance: scheme.coverageAmount || 500000,
          cashlessEligible: true,
          networkHospital: true,
          roomEligibility: 'General Ward',
          coPay: 0,
          deductible: 0,
          exclusions: [],
          waitingPeriodCleared: true,
          diseaseCoverage: true,
          verifiedAt: new Date(),
          notes: `Government scheme: ${scheme.schemeName}`
        };
      }
    }

    insuranceCase.verificationResult = verificationResult;
    insuranceCase.status = verificationResult.policyValid ? 'VERIFICATION_COMPLETE' : 'VERIFICATION_PENDING';
    insuranceCase.statusHistory.push({
      status: insuranceCase.status,
      changedAt: new Date(),
      notes: verificationResult.policyValid ? 'Verification passed' : 'Verification failed'
    });
    insuranceCase.auditTrail.push({
      action: 'INSURANCE_VERIFIED',
      timestamp: new Date(),
      details: `Policy valid: ${verificationResult.policyValid}, Balance: ₹${verificationResult.remainingBalance}`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: verificationResult.policyValid ? 'Insurance verified successfully' : 'Verification failed — patient may proceed as self-pay',
      data: { verificationResult, caseStatus: insuranceCase.status }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// STEP 3: Auto-load required forms for the company
// GET /api/insurance/cases/:id/required-forms
// ============================================================
exports.getRequiredForms = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    // If forms already loaded, return them
    if (insuranceCase.requiredForms && insuranceCase.requiredForms.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Forms already loaded for this case',
        data: insuranceCase.requiredForms
      });
    }

    // Query FormsRegistry for the insurance company
    const now = new Date();
    const filter = {
      isActive: true,
      isDeprecated: false,
      effectiveDate: { $lte: now },
      $or: [
        { expiryDate: null },
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: now } }
      ]
    };

    if (insuranceCase.insuranceCompanyId) {
      filter.insuranceCompanyId = insuranceCase.insuranceCompanyId;
    }

    const registryForms = await OfficialFormsRegistry.find(filter)
      .sort({ isMandatory: -1, formCategory: 1 });

    // Map registry forms to the case's requiredForms array
    const requiredForms = registryForms.map(f => ({
      formRegistryId: f._id,
      formName: f.formName,
      formCategory: f.formCategory,
      isMandatory: f.isMandatory,
      templateId: f.templateId || null,
      status: 'Pending',
      filledData: new Map()
    }));

    insuranceCase.requiredForms = requiredForms;
    insuranceCase.status = 'FORMS_PENDING';
    insuranceCase.statusHistory.push({
      status: 'FORMS_PENDING',
      changedAt: new Date(),
      notes: `${requiredForms.length} forms loaded for completion`
    });
    insuranceCase.auditTrail.push({
      action: 'FORMS_LOADED',
      timestamp: new Date(),
      details: `${requiredForms.length} forms loaded (${registryForms.filter(f => f.isMandatory).length} mandatory)`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      totalForms: requiredForms.length,
      mandatoryCount: requiredForms.filter(f => f.isMandatory).length,
      data: requiredForms
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// STEP 4: Save filled form data (with auto-population)
// POST /api/insurance/cases/:id/fill-form/:formIndex
// ============================================================
exports.fillForm = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id)
      .populate('patientId')
      .populate('admissionId');
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    const formIndex = parseInt(req.params.formIndex, 10);
    if (formIndex < 0 || formIndex >= insuranceCase.requiredForms.length) {
      return res.status(400).json({ success: false, message: 'Invalid form index' });
    }

    const form = insuranceCase.requiredForms[formIndex];
    
    // Merge auto-populated data with user-provided data
    const filledData = new Map();
    
    // Auto-populate from patient record
    if (insuranceCase.patientId) {
      const patient = insuranceCase.patientId;
      if (patient.name) filledData.set('patientName', patient.name);
      if (patient.age) filledData.set('age', patient.age);
      if (patient.gender) filledData.set('gender', patient.gender);
      if (patient.mobile) filledData.set('contact', patient.mobile);
    }

    // Auto-populate from admission
    if (insuranceCase.admissionId) {
      const adm = insuranceCase.admissionId;
      if (adm.ipdNumber) filledData.set('ipdNumber', adm.ipdNumber);
      if (adm.admissionDate) filledData.set('admissionDate', adm.admissionDate);
      if (adm.admittingDoctor) filledData.set('admittingDoctor', adm.admittingDoctor);
      if (adm.diagnosis) filledData.set('diagnosis', adm.diagnosis);
      if (adm.wardType) filledData.set('wardType', adm.wardType);
    }

    // Overlay with user-provided data (overrides auto-fill)
    if (req.body.formData && typeof req.body.formData === 'object') {
      Object.entries(req.body.formData).forEach(([key, value]) => {
        filledData.set(key, value);
      });
    }

    form.filledData = filledData;
    form.status = 'Filled';

    insuranceCase.auditTrail.push({
      action: 'FORM_FILLED',
      timestamp: new Date(),
      details: `Form "${form.formName}" filled (index: ${formIndex})`
    });

    // Check if all mandatory forms are filled
    const allMandatoryFilled = insuranceCase.requiredForms
      .filter(f => f.isMandatory)
      .every(f => f.status !== 'Pending');

    if (allMandatoryFilled && insuranceCase.requiredForms.length > 0) {
      insuranceCase.status = 'FORMS_COMPLETE';
      insuranceCase.statusHistory.push({
        status: 'FORMS_COMPLETE',
        changedAt: new Date(),
        notes: 'All mandatory forms completed'
      });
    }

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: `Form "${form.formName}" saved successfully`,
      data: { formIndex, formName: form.formName, status: form.status, allMandatoryFilled }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// STEP 5: Generate PDF from filled form data
// POST /api/insurance/cases/:id/generate-pdf/:formIndex
// ============================================================
exports.generateFormPdf = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id)
      .populate('patientId')
      .populate('insuranceCompanyId', 'companyName');
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    const formIndex = parseInt(req.params.formIndex, 10);
    if (formIndex < 0 || formIndex >= insuranceCase.requiredForms.length) {
      return res.status(400).json({ success: false, message: 'Invalid form index' });
    }

    const form = insuranceCase.requiredForms[formIndex];
    if (!form.filledData || form.filledData.size === 0) {
      return res.status(400).json({ success: false, message: 'Form has no filled data. Please fill the form first.' });
    }

    // Generate PDF
    const fileName = `${insuranceCase.caseNumber}_form_${formIndex}_${Date.now()}.pdf`;
    const filePath = path.join(generatedDir, fileName);

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(18).font('Helvetica-Bold').text('INSURANCE FORM', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).font('Helvetica').text(form.formName, { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).fillColor('#666')
      .text(`Case: ${insuranceCase.caseNumber} | Category: ${form.formCategory || 'N/A'}`, { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).text(`Generated: ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN')}`, { align: 'center' });
    doc.fillColor('#000');

    // Divider
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Insurance Company
    if (insuranceCase.insuranceCompanyId) {
      doc.fontSize(12).font('Helvetica-Bold').text('Insurance Provider:');
      doc.fontSize(11).font('Helvetica').text(insuranceCase.insuranceCompanyId.companyName || 'N/A');
      doc.moveDown(0.5);
    }

    // Form fields
    doc.fontSize(12).font('Helvetica-Bold').text('Form Details:');
    doc.moveDown(0.5);

    const filledDataObj = form.filledData instanceof Map
      ? Object.fromEntries(form.filledData)
      : (form.filledData.toJSON ? form.filledData.toJSON() : form.filledData);

    // Render each field as a labeled row
    Object.entries(filledDataObj).forEach(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();

      if (doc.y > 700) { doc.addPage(); }

      doc.fontSize(10).font('Helvetica-Bold').text(`${label}:`, { continued: true });
      doc.font('Helvetica').text(`  ${value || 'N/A'}`);
      doc.moveDown(0.3);
    });

    // Footer
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);

    // Signature lines
    doc.fontSize(10).font('Helvetica');
    const sigY = doc.y + 40;
    doc.text('____________________________', 50, sigY);
    doc.text('Patient / Attendant Signature', 50, sigY + 15);
    doc.text('____________________________', 350, sigY);
    doc.text('Insurance Executive Signature', 350, sigY + 15);

    doc.moveDown(3);
    doc.fontSize(8).fillColor('#999').text('This document was auto-generated by HMS Insurance Module', { align: 'center' });

    doc.end();

    // Wait for stream to finish
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    // Update form record
    form.generatedPdfPath = filePath.replace(/\\/g, '/');
    form.generatedAt = new Date();
    form.status = 'Generated';

    insuranceCase.auditTrail.push({
      action: 'PDF_GENERATED',
      timestamp: new Date(),
      details: `PDF generated for form "${form.formName}"`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: `PDF generated for "${form.formName}"`,
      data: {
        formIndex,
        formName: form.formName,
        pdfPath: form.generatedPdfPath,
        downloadUrl: `/generated/insurance-forms/${fileName}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// GET /api/insurance/cases — List all cases with filters
// ============================================================
exports.listCases = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.patientId) filter.patientId = req.query.patientId;
    if (req.query.insuranceCompanyId) filter.insuranceCompanyId = req.query.insuranceCompanyId;

    const cases = await InsuranceCase.find(filter)
      .populate('patientId', 'name age gender mobile')
      .populate('insuranceCompanyId', 'companyName shortName')
      .populate('tpaId', 'tpaName shortName')
      .populate('admissionId', 'ipdNumber admissionDate wardType status')
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);

    // Dashboard stats
    const allCases = await InsuranceCase.find({});
    const stats = {
      total: allCases.length,
      open: allCases.filter(c => c.status === 'OPEN').length,
      verificationPending: allCases.filter(c => c.status === 'VERIFICATION_PENDING' || c.status === 'VERIFICATION_COMPLETE').length,
      formsPending: allCases.filter(c => c.status === 'FORMS_PENDING').length,
      formsComplete: allCases.filter(c => c.status === 'FORMS_COMPLETE').length,
      preAuthSubmitted: allCases.filter(c => c.status === 'PREAUTH_SUBMITTED' || c.status === 'PREAUTH_APPROVED').length,
      treatmentInProgress: allCases.filter(c => c.status === 'TREATMENT_IN_PROGRESS').length,
      claimSubmitted: allCases.filter(c => ['CLAIM_SUBMITTED', 'CLAIM_UNDER_REVIEW', 'CLAIM_APPROVED'].includes(c.status)).length,
      settled: allCases.filter(c => c.status === 'CLAIM_SETTLED').length,
      closed: allCases.filter(c => c.status === 'CLOSED').length
    };

    res.status(200).json({ success: true, count: cases.length, stats, data: cases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// GET /api/insurance/cases/:id — Full case details
// ============================================================
exports.getCaseById = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id)
      .populate('patientId', 'name age gender mobile email')
      .populate('admissionId')
      .populate('policyId')
      .populate('schemeId')
      .populate('preAuthId')
      .populate('claimId')
      .populate('insuranceCompanyId', 'companyName shortName claimEmail preAuthEmail helplineNumber')
      .populate('tpaId', 'tpaName shortName preAuthEmail claimsEmail')
      .populate('documents');

    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    // Trigger Notification for specific statuses
    if (status === 'PREAUTH_APPROVED') {
      NotificationService.sendPatientNotification(
        insuranceCase.patientId, 
        'SMS', 
        `Your Pre-Authorization for Case ${insuranceCase.caseNumber} has been Approved!`
      );
    } else if (status === 'CLAIM_SETTLED') {
      NotificationService.sendPatientNotification(
        insuranceCase.patientId, 
        'Email', 
        `Great news! Your claim for Case ${insuranceCase.caseNumber} has been successfully settled.`
      );
    }

    res.status(200).json({ success: true, data: insuranceCase });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// PATCH /api/insurance/cases/:id/status — Update case status
// ============================================================
exports.updateCaseStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    const oldStatus = insuranceCase.status;
    insuranceCase.status = status;
    insuranceCase.statusHistory.push({ status, changedAt: new Date(), notes });
    insuranceCase.auditTrail.push({
      action: 'STATUS_CHANGED',
      timestamp: new Date(),
      details: `Status changed from ${oldStatus} to ${status}. ${notes || ''}`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: `Case status updated to ${status}`,
      data: { oldStatus, newStatus: status }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// POST /api/insurance/cases/:id/query — Log a query from TPA
// ============================================================
exports.addQuery = async (req, res) => {
  try {
    const { queryText, raisedBy } = req.body;
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    insuranceCase.queryLog.push({
      queryText,
      raisedBy: raisedBy || 'Insurance Company',
      raisedAt: new Date(),
      status: 'Open'
    });

    insuranceCase.auditTrail.push({
      action: 'QUERY_RAISED',
      timestamp: new Date(),
      details: `Query raised: ${queryText.substring(0, 100)}...`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: 'Query logged',
      data: insuranceCase.queryLog[insuranceCase.queryLog.length - 1]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// POST /api/insurance/cases/:id/query/:queryIndex/respond
// ============================================================
exports.respondToQuery = async (req, res) => {
  try {
    const { responseText } = req.body;
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    const queryIndex = parseInt(req.params.queryIndex, 10);
    if (queryIndex < 0 || queryIndex >= insuranceCase.queryLog.length) {
      return res.status(400).json({ success: false, message: 'Invalid query index' });
    }

    insuranceCase.queryLog[queryIndex].responseText = responseText;
    insuranceCase.queryLog[queryIndex].respondedAt = new Date();
    insuranceCase.queryLog[queryIndex].status = 'Responded';

    insuranceCase.auditTrail.push({
      action: 'QUERY_RESPONDED',
      timestamp: new Date(),
      details: `Query #${queryIndex} responded`
    });

    await insuranceCase.save();

    res.status(200).json({ success: true, message: 'Query response recorded' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// POST /api/insurance/cases/:id/enhance — Submit enhancement
// ============================================================
exports.submitEnhancement = async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    insuranceCase.enhancementRequests.push({
      amount,
      reason,
      requestedAt: new Date(),
      status: 'Submitted'
    });

    insuranceCase.auditTrail.push({
      action: 'ENHANCEMENT_SUBMITTED',
      timestamp: new Date(),
      details: `Enhancement of ₹${amount} requested: ${reason}`
    });

    await insuranceCase.save();

    res.status(200).json({
      success: true,
      message: `Enhancement request of ₹${amount} submitted`,
      data: insuranceCase.enhancementRequests[insuranceCase.enhancementRequests.length - 1]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================================================
// POST /api/insurance/cases/:id/communication — Add comm log
// ============================================================
exports.addCommunication = async (req, res) => {
  try {
    const insuranceCase = await InsuranceCase.findById(req.params.id);
    if (!insuranceCase) return res.status(404).json({ success: false, message: 'Case not found' });

    insuranceCase.communicationLog.push({
      ...req.body,
      timestamp: new Date()
    });

    insuranceCase.auditTrail.push({
      action: 'COMMUNICATION_LOGGED',
      timestamp: new Date(),
      details: `${req.body.direction || 'N/A'} ${req.body.type || 'N/A'}: ${req.body.subject || 'N/A'}`
    });

    await insuranceCase.save();

    res.status(200).json({ success: true, message: 'Communication logged' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
