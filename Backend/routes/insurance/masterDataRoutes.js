const express = require('express');
const router = express.Router();
const insuranceMasterController = require('../../controllers/insuranceMasterController');

// Insurance Companies
router.route('/companies')
  .post(insuranceMasterController.createInsuranceCompany)
  .get(insuranceMasterController.getAllInsuranceCompanies);

router.route('/companies/:id')
  .get(insuranceMasterController.getInsuranceCompanyById)
  .put(insuranceMasterController.updateInsuranceCompany)
  .delete(insuranceMasterController.deleteInsuranceCompany);

// TPAs
router.route('/tpas')
  .post(insuranceMasterController.createTpa)
  .get(insuranceMasterController.getAllTpas);

router.route('/tpas/:id')
  .get(insuranceMasterController.getTpaById)
  .put(insuranceMasterController.updateTpa);

// Insurance Plans
router.route('/plans')
  .post(insuranceMasterController.createPlan)
  .get(insuranceMasterController.getAllPlans);

router.route('/plans/:id')
  .get(insuranceMasterController.getPlanById)
  .put(insuranceMasterController.updatePlan);

module.exports = router;
