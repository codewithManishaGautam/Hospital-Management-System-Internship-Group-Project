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

    // Seed the dynamic forms
    formDocs.push({
      formName: 'IRDAI Standard Private Insurance Form',
      formCode: 'IRDAI-STD-01',
      description: 'Standard IRDAI common cashless pre-authorization form.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'General/IRDAI',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'IRDAI_STANDARD'
    });

    formDocs.push({
      formName: 'Medi Assist Pre-Authorization Form',
      formCode: 'MEDI-ASSIST-01',
      description: 'Pre-authorization request for Medi Assist TPA.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'Medi Assist TPA',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'MEDI_ASSIST'
    });

    formDocs.push({
      formName: 'Liberty General Insurance Cashless Request',
      formCode: 'LIBERTY-CASH-01',
      description: 'Cashless authorization form for Liberty General.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'Liberty General Insurance',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'LIBERTY_GENERAL'
    });

    formDocs.push({
      formName: 'ICICI Lombard Cashless Form',
      formCode: 'ICICI-LOMBARD-01',
      description: 'Standard hospitalization claim form.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'ICICI Lombard',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'ICICI_LOMBARD'
    });
    
    formDocs.push({
      formName: 'Niva Bupa Health Insurance Pre-Auth',
      formCode: 'NIVA-BUPA-01',
      description: 'Pre-authorization request for Niva Bupa.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'Niva Bupa',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'NIVA_BUPA'
    });

    formDocs.push({
      formName: 'HealthIndia TPA Claim Form',
      formCode: 'HEALTHINDIA-TPA-01',
      description: 'Official HealthIndia Insurance Claim Form.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'HealthIndia TPA',
      formCategory: 'Claim',
      claimType: 'Reimbursement',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'HEALTHINDIA_TPA'
    });

    formDocs.push({
      formName: 'HealthIndia TPA Bank Details Form',
      formCode: 'HEALTHINDIA-BANK-01',
      description: 'NEFT mandate details for HealthIndia.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'HealthIndia TPA',
      formCategory: 'Claim',
      claimType: 'Reimbursement',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'HEALTHINDIA_BANK_DETAILS'
    });

    formDocs.push({
      formName: 'Bajaj Allianz Cashless Request',
      formCode: 'BAJAJ-ALLIANZ-01',
      description: 'Pre-auth request for Bajaj Allianz.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'Bajaj Allianz',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'BAJAJ_ALLIANZ'
    });

    formDocs.push({
      formName: 'East West Assist Pre-Auth',
      formCode: 'EAST-WEST-01',
      description: 'Pre-auth request for East West Assist TPA.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'East West Assist',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'EAST_WEST_ASSIST'
    });

    formDocs.push({
      formName: 'IndusInd General Insurance Pre-Auth',
      formCode: 'INDUSIND-01',
      description: 'Pre-auth request for IndusInd General.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'IndusInd General',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'INDUSIND_GENERAL'
    });

    formDocs.push({
      formName: 'Paramount Health Pre-Auth',
      formCode: 'PARAMOUNT-01',
      description: 'Pre-auth request for Paramount Health TPA.',
      insuranceCompanyId: genericCo._id,
      insurerOrTpaName: 'Paramount Health',
      formCategory: 'Pre-Auth',
      claimType: 'Cashless',
      isMandatory: true,
      fileFormat: 'Digital Template',
      templateId: 'PARAMOUNT_HEALTH'
    });

    await OfficialFormsRegistry.insertMany(formDocs);
    console.log(`Successfully seeded ${formDocs.length} official forms!`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedForms();
