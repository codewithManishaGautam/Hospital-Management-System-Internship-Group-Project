const express = require('express');
const router = express.Router();
const insuranceCaseController = require('../../controllers/insurance/insuranceCaseController');
const claimPackageController = require('../../controllers/insurance/claimPackageController');
const departmentIntakeController = require('../../controllers/insurance/departmentIntakeController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/department-docs/');
  },
  filename: (req, file, cb) => {
    cb(null, `dept_${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

// Creation & Retrieval
router.post('/', insuranceCaseController.createCase);
router.get('/', insuranceCaseController.listCases);
router.get('/:id', insuranceCaseController.getCaseById);
router.patch('/:id/status', insuranceCaseController.updateCaseStatus);

// Admission Workflow (BRD §3)
router.post('/:id/verify', insuranceCaseController.verifyInsurance);
router.get('/:id/required-forms', insuranceCaseController.getRequiredForms);
router.post('/:id/fill-form/:formIndex', insuranceCaseController.fillForm);
router.post('/:id/generate-pdf/:formIndex', insuranceCaseController.generateFormPdf);
router.post('/:caseId/generate-claim-package', claimPackageController.generateClaimPackage);

// Inter-Department Document Intake (BRD §5)
router.post('/:caseId/department-docs', upload.single('document'), departmentIntakeController.intakeDepartmentDocument);

// Communication & Queries
router.post('/:id/query', insuranceCaseController.addQuery);
router.post('/:id/query/:queryIndex/respond', insuranceCaseController.respondToQuery);
router.post('/:id/enhance', insuranceCaseController.submitEnhancement);
router.post('/:id/communication', insuranceCaseController.addCommunication);

module.exports = router;
