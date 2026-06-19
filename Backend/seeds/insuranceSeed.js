const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TPAMaster = require('../models/insurance/TPAMaster');
const InsuranceCompany = require('../models/insurance/InsuranceCompany');
const OfficialFormsRegistry = require('../models/insurance/OfficialFormsRegistry');
const User = require('../models/User');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hms');
    console.log('Connected to MongoDB for Seeding');

    // 1. Seed TPAs (10 records)
    const existingTpaCount = await TPAMaster.countDocuments();
    if (existingTpaCount === 0) {
      const tpas = [
        { name: 'Medi Assist India', preAuthTAT: '2-4 hours', claimTAT: '7-15 working days' },
        { name: 'Paramount Health Services', preAuthTAT: '4-6 hours', claimTAT: '10-21 working days' },
        { name: 'Health India TPA', preAuthTAT: '4-8 hours', claimTAT: '10-21 working days' },
        { name: 'FHPL (Family Health Plan Ltd)', preAuthTAT: '2-4 hours', claimTAT: '7-14 working days' },
        { name: 'Vidal Health', preAuthTAT: '2-4 hours', claimTAT: '7-15 working days' },
        { name: 'MDIndia Health Insurance TPA', preAuthTAT: '4-6 hours', claimTAT: '10-21 working days' },
        { name: 'Raksha TPA', preAuthTAT: '4-8 hours', claimTAT: '15-21 working days' },
        { name: 'East West Assist', preAuthTAT: '6-12 hours', claimTAT: '15-30 working days' },
        { name: 'Heritage Health TPA', preAuthTAT: '4-8 hours', claimTAT: '10-21 working days' },
        { name: 'DHCS (Dedicated Healthcare Services)', preAuthTAT: '4-6 hours', claimTAT: '10-21 working days' }
      ];

      const insertedTpas = await TPAMaster.insertMany(tpas);
      console.log(`Seeded ${insertedTpas.length} TPAs`);
    } else {
      console.log(`TPAs already seeded (${existingTpaCount} records). Skipping.`);
    }

    // 2. Seed Insurance Companies (13 records: 10 private + 3 PSU)
    const existingCompanyCount = await InsuranceCompany.countDocuments();
    if (existingCompanyCount === 0) {
      const companies = [
        { name: 'Star Health and Allied Insurance', type: 'Private' },
        { name: 'HDFC ERGO Health Insurance', type: 'Private' },
        { name: 'Bajaj Allianz General Insurance', type: 'Private' },
        { name: 'ICICI Lombard General Insurance', type: 'Private' },
        { name: 'Niva Bupa Health Insurance', type: 'Private' },
        { name: 'Care Health Insurance', type: 'Private' },
        { name: 'Tata AIG General Insurance', type: 'Private' },
        { name: 'Reliance General Insurance', type: 'Private' },
        { name: 'Aditya Birla Health Insurance', type: 'Private' },
        { name: 'Manipal Cigna Health Insurance', type: 'Private' },
        { name: 'New India Assurance Company', type: 'PSU' },
        { name: 'United India Insurance Company', type: 'PSU' },
        { name: 'Oriental Insurance Company', type: 'PSU' }
      ];

      const insertedCompanies = await InsuranceCompany.insertMany(companies);
      console.log(`Seeded ${insertedCompanies.length} Insurance Companies`);
    } else {
      console.log(`Insurance Companies already seeded (${existingCompanyCount} records). Skipping.`);
    }

    // 3. Seed Official Forms Registry
    const existingFormCount = await OfficialFormsRegistry.countDocuments();
    if (existingFormCount === 0) {
      const forms = [
        {
          formName: 'IRDAI Standard Pre-Auth Form',
          formType: 'Pre-Auth',
          providerType: 'Generic',
          providerName: 'IRDAI',
          templateIdentifier: 'IRDAI_STANDARD',
          isActive: true
        },
        {
          formName: 'PM-JAY Pre-Authorization Request Form',
          formType: 'Pre-Auth',
          providerType: 'Government',
          providerName: 'NHA (National Health Authority)',
          templateIdentifier: 'PM_JAY',
          isActive: true
        },
        {
          formName: 'CGHS Pre-Authorization Form',
          formType: 'Pre-Auth',
          providerType: 'Government',
          providerName: 'CGHS',
          templateIdentifier: 'CGHS',
          isActive: true
        },
        {
          formName: 'Star Health Pre-Auth Request',
          formType: 'Pre-Auth',
          providerType: 'Private',
          providerName: 'Star Health and Allied Insurance',
          templateIdentifier: 'STAR_HEALTH_PREAUTH',
          isActive: true
        },
        {
          formName: 'HDFC ERGO Pre-Authorization Form',
          formType: 'Pre-Auth',
          providerType: 'Private',
          providerName: 'HDFC ERGO Health Insurance',
          templateIdentifier: 'HDFC_ERGO_PREAUTH',
          isActive: true
        },
        {
          formName: 'Insurance Claim Intimation Form',
          formType: 'Claim',
          providerType: 'Generic',
          providerName: 'Generic',
          templateIdentifier: 'GENERIC_CLAIM',
          isActive: true
        }
      ];

      const insertedForms = await OfficialFormsRegistry.insertMany(forms);
      console.log(`Seeded ${insertedForms.length} Official Forms`);
    } else {
      console.log(`Official Forms already seeded (${existingFormCount} records). Skipping.`);
    }

    // 4. Seed default users (idempotent)
    const existingUserCount = await User.countDocuments();
    if (existingUserCount === 0) {
      const users = [
        { name: 'Admin User', email: 'admin@shraddha.com', password: 'admin123', role: 'Admin' },
        { name: 'Insurance Desk', email: 'insurance@shraddha.com', password: 'insurance123', role: 'Insurance' },
        { name: 'Reception Desk', email: 'reception@shraddha.com', password: 'reception123', role: 'Receptionist' },
        { name: 'Billing Desk', email: 'billing@shraddha.com', password: 'billing123', role: 'Billing' },
        { name: 'Doctor Access', email: 'doctor@shraddha.com', password: 'doctor123', role: 'Doctor' },
        { name: 'Lab Access', email: 'lab@shraddha.com', password: 'lab123', role: 'Lab' },
        { name: 'Pharmacy Access', email: 'pharmacy@shraddha.com', password: 'pharmacy123', role: 'Pharmacy' },
        { name: 'Nurse Access', email: 'nurse@shraddha.com', password: 'nurse123', role: 'Nurse' }
      ];

      for (const userData of users) {
        await User.create(userData);
      }
      console.log(`Seeded ${users.length} Users`);
    } else {
      console.log(`Users already seeded (${existingUserCount} records). Skipping.`);
    }

    console.log('Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();
