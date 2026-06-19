const express = require('express');
const router = express.Router();
const TPAMaster = require('../../models/insurance/TPAMaster');
const InsuranceCompany = require('../../models/insurance/InsuranceCompany');
const OfficialFormsRegistry = require('../../models/insurance/OfficialFormsRegistry');

// @route   GET /api/insurance/master-data/tpas
router.get('/tpas', async (req, res) => {
  try {
    const tpas = await TPAMaster.find();
    res.json({ success: true, data: tpas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/master-data/tpas
router.post('/tpas', async (req, res) => {
  try {
    const newTpa = new TPAMaster(req.body);
    await newTpa.save();
    res.status(201).json({ success: true, data: newTpa });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   GET /api/insurance/master-data/companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await InsuranceCompany.find();
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/master-data/companies
router.post('/companies', async (req, res) => {
  try {
    const newCompany = new InsuranceCompany(req.body);
    await newCompany.save();
    res.status(201).json({ success: true, data: newCompany });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   GET /api/insurance/master-data/forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await OfficialFormsRegistry.find();
    res.json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   POST /api/insurance/master-data/forms
router.post('/forms', async (req, res) => {
  try {
    const newForm = new OfficialFormsRegistry(req.body);
    await newForm.save();
    res.status(201).json({ success: true, data: newForm });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
