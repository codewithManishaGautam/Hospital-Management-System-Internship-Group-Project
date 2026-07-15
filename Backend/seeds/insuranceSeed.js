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
    await TPAMaster.deleteMany({});
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

    // 2. Seed Insurance Companies
    await InsuranceCompany.deleteMany({});
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
        { name: 'SBI General Insurance', type: 'Private' },
        { name: 'New India Assurance Company', type: 'PSU' },
        { name: 'United India Insurance Company', type: 'PSU' },
        { name: 'Oriental Insurance Company', type: 'PSU' }
      ];

      const insertedCompanies = await InsuranceCompany.insertMany(companies);
      console.log(`Seeded ${insertedCompanies.length} Insurance Companies`);

    // 3. Seed Official Forms Registry
    await OfficialFormsRegistry.deleteMany({});
    const forms = [
        {
          formName: 'IRDAI Standard Pre-Auth Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'IRDAI',
          downloadUrl: '/official-forms/IRDAI_Standard_PreAuth_Form.pdf'
        },
        {
          formName: 'PM-JAY Pre-Authorization Request Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'NHA (National Health Authority)',
          downloadUrl: '/official-forms/PM_JAY_Ayushman_Form.pdf'
        },
        {
          formName: 'CGHS Pre-Authorization Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'CGHS',
          downloadUrl: '/official-forms/CGHS_Request_Form.pdf'
        },
        {
          formName: 'Star Health Pre-Auth Request',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'Star Health and Allied Insurance',
          downloadUrl: '/official-forms/Star_Health_PreAuth_Form.pdf'
        },
        {
          formName: 'HDFC ERGO Pre-Authorization Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'HDFC ERGO Health Insurance',
          downloadUrl: '/official-forms/HDFC_ERGO_Request_Form.pdf'
        },
        {
          formName: 'Bajaj Allianz Cashless Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'Bajaj Allianz General Insurance',
          downloadUrl: '/official-forms/Bajaj_Allianz_Cashless_Form.pdf'
        },
        {
          formName: 'ICICI Lombard Cashless Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'ICICI Lombard General Insurance',
          downloadUrl: '/official-forms/ICICI_Lombard_Cashless_Form.pdf'
        },
        {
          formName: 'Niva Bupa Pre-Auth Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'Niva Bupa Health Insurance',
          downloadUrl: '/official-forms/Niva_Bupa_PreAuth_Form.pdf'
        },
        {
          formName: 'Care Health Cashless Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'Care Health Insurance',
          downloadUrl: '/official-forms/Care_Health_Cashless_Form.pdf'
        },
        {
          formName: 'SBI General Cashless Form',
          formType: 'Pre-Auth',
          insurerOrTpaName: 'SBI General Insurance',
          downloadUrl: '/official-forms/SBI_General_Cashless_Form.pdf'
        },
        {
          formName: 'Insurance Claim Intimation Form',
          formType: 'Claim',
          insurerOrTpaName: 'Generic',
          downloadUrl: '/official-forms/Generic_Claim_Form.pdf'
        }
      ];

      const insertedForms = await OfficialFormsRegistry.insertMany(forms);
      console.log(`Seeded ${insertedForms.length} Official Forms`);

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
