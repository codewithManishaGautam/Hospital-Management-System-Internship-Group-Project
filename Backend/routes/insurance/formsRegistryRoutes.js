const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const formsRegistryController = require('../../controllers/insurance/formsRegistryController');

// Multer config for form file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/insurance-forms/');
  },
  filename: (req, file, cb) => {
    cb(null, `form_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx', '.doc', '.xlsx', '.xls'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, and Excel files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Routes
router.post('/', upload.single('formFile'), formsRegistryController.createForm);
router.get('/', formsRegistryController.listForms);
router.get('/company/:companyId', formsRegistryController.getFormsByCompany);
router.get('/:id', formsRegistryController.getFormById);
router.put('/:id', upload.single('formFile'), formsRegistryController.updateForm);
router.delete('/:id', formsRegistryController.deleteForm);

module.exports = router;
