const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const OfficialFormsRegistry = require('../models/insurance/OfficialFormsRegistry');
const InsuranceCompany = require('../models/insurance/InsuranceCompany');

mongoose.connect(process.env.MONGO_URL || process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for Form Seeding...'))
  .catch(err => console.log(err));

const seedForms = async () => {
  try {
    // Clear existing
    await OfficialFormsRegistry.deleteMany({});

    const companies = await InsuranceCompany.find();
    if (companies.length === 0) {
      console.log('No insurance companies found. Please run insuranceSeed.js first.');
      process.exit(1);
    }

    const starHealth = companies.find(c => c.companyName && c.companyName.includes('Star Health'));
    const hdfc = companies.find(c => c.companyName && c.companyName.includes('HDFC'));
    const icici = companies.find(c => c.companyName && c.companyName.includes('ICICI'));
    const esic = companies.find(c => c.companyName && c.companyName.includes('ESIC')); // Assuming we have ESIC or generic Govt

    const formDocs = [];

    // Star Health Forms
    if (starHealth) {
      formDocs.push({
        formName: 'Request for Cashless Hospitalisation',
        formCode: 'STAR-CL-01',
        description: 'Standard cashless pre-authorization request form for Star Health.',
        insuranceCompanyId: starHealth._id,
        insurerOrTpaName: starHealth.companyName,
        formCategory: 'Pre-Auth',
        claimType: 'Cashless',
        isMandatory: true,
        fileFormat: 'PDF',
        templateId: 'STAR_HEALTH_CASHLESS'
      });
      formDocs.push({
        formName: 'Reimbursement Claim Form - Part A',
        formCode: 'STAR-RM-A',
        description: 'To be filled by the insured for reimbursement claims.',
        insuranceCompanyId: starHealth._id,
        insurerOrTpaName: starHealth.companyName,
        formCategory: 'Claim',
        claimType: 'Reimbursement',
        isMandatory: true,
        fileFormat: 'PDF'
      });
    }

    // HDFC ERGO Forms
    if (hdfc) {
      formDocs.push({
        formName: 'HDFC ERGO Cashless Request',
        formCode: 'HDFC-PA-01',
        description: 'Pre-authorization request for planned and emergency admissions.',
        insuranceCompanyId: hdfc._id,
        insurerOrTpaName: hdfc.companyName,
        formCategory: 'Pre-Auth',
        claimType: 'Cashless',
        isMandatory: true,
        fileFormat: 'PDF'
      });
      formDocs.push({
        formName: 'Hospital Discharge Summary Certificate',
        formCode: 'HDFC-DS-01',
        description: 'Mandatory discharge certificate format for HDFC ERGO claims.',
        insuranceCompanyId: hdfc._id,
        insurerOrTpaName: hdfc.companyName,
        formCategory: 'Discharge',
        claimType: 'Both',
        isMandatory: false,
        fileFormat: 'Digital Template'
      });
    }

    // ICICI Lombard Forms
    if (icici) {
      formDocs.push({
        formName: 'ICICI Lombard Claim Form',
        formCode: 'ICICI-CL-01',
        description: 'Standard hospitalization claim form.',
        insuranceCompanyId: icici._id,
        insurerOrTpaName: icici.companyName,
        formCategory: 'Claim',
        claimType: 'Both',
        isMandatory: true,
        fileFormat: 'PDF'
      });
    }

    // Generic HealthIndia TPA / ESIC
    const genericCo = esic || companies[0];
    if (genericCo) {
      formDocs.push({
        formName: 'ESIC Claim Form / HealthIndia TPA',
        formCode: 'ESIC-HI-01',
        description: 'Official ESIC Insurance Claim Form with NEFT mandate details.',
        insuranceCompanyId: genericCo._id,
        insurerOrTpaName: genericCo.companyName || 'ESIC / Generic',
        formCategory: 'Claim',
        claimType: 'Both',
        isMandatory: true,
        fileFormat: 'PDF'
      });
    }

    await OfficialFormsRegistry.insertMany(formDocs);
    console.log(`Successfully seeded ${formDocs.length} official forms!`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedForms();
