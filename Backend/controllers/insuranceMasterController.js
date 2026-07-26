const InsuranceCompany = require('../models/insurance/InsuranceCompany');
const TPAMaster = require('../models/insurance/TPAMaster');
const InsurancePlan = require('../models/insurance/InsurancePlan');

// ============================================
// Insurance Companies CRUD
// ============================================

exports.createInsuranceCompany = async (req, res) => {
  try {
    const newCompany = new InsuranceCompany(req.body);
    // createdBy can be populated if auth middleware sets req.user
    if (req.user) newCompany.createdBy = req.user._id;
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: 'Error creating insurance company', error: error.message });
  }
};

exports.getAllInsuranceCompanies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find({ isDeleted: false });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurance companies', error: error.message });
  }
};

exports.getInsuranceCompanyById = async (req, res) => {
  try {
    const company = await InsuranceCompany.findById(req.params.id);
    if (!company || company.isDeleted) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
};

exports.updateInsuranceCompany = async (req, res) => {
  try {
    const updatedCompany = await InsuranceCompany.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: 'Error updating company', error: error.message });
  }
};

exports.deleteInsuranceCompany = async (req, res) => {
  try {
    const company = await InsuranceCompany.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    company.isDeleted = true;
    company.deletedAt = new Date();
    if (req.user) company.deletedBy = req.user._id;
    await company.save();
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
};

// ============================================
// TPAs CRUD
// ============================================

exports.createTpa = async (req, res) => {
  try {
    const newTpa = new TPAMaster(req.body);
    const savedTpa = await newTpa.save();
    res.status(201).json(savedTpa);
  } catch (error) {
    res.status(400).json({ message: 'Error creating TPA', error: error.message });
  }
};

exports.getAllTpas = async (req, res) => {
  try {
    const tpas = await TPAMaster.find({ isActive: true });
    res.status(200).json(tpas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TPAs', error: error.message });
  }
};

exports.getTpaById = async (req, res) => {
  try {
    const tpa = await TPAMaster.findById(req.params.id);
    if (!tpa) return res.status(404).json({ message: 'TPA not found' });
    res.status(200).json(tpa);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TPA', error: error.message });
  }
};

exports.updateTpa = async (req, res) => {
  try {
    const updatedTpa = await TPAMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTpa) return res.status(404).json({ message: 'TPA not found' });
    res.status(200).json(updatedTpa);
  } catch (error) {
    res.status(400).json({ message: 'Error updating TPA', error: error.message });
  }
};

// ============================================
// Insurance Plans CRUD
// ============================================

exports.createPlan = async (req, res) => {
  try {
    const newPlan = new InsurancePlan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan', error: error.message });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await InsurancePlan.find().populate('insuranceCompanyId').populate('tpaId');
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await InsurancePlan.findById(req.params.id).populate('insuranceCompanyId').populate('tpaId');
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan', error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await InsurancePlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error updating plan', error: error.message });
  }
};
