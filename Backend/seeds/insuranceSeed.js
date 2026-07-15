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
    try { await TPAMaster.collection.drop(); } catch(e) {}
    const tpas = [
        { tpaName: 'Medi Assist India', shortName: 'Medi Assist', irdaiTpaCode: 'TPA01', preAuthEmail: 'preauth@mediassist.com', claimsEmail: 'claims@mediassist.com', standardTatHours: 4, claimTatDays: 15 },
        { tpaName: 'Paramount Health Services', shortName: 'Paramount', irdaiTpaCode: 'TPA02', preAuthEmail: 'preauth@paramount.com', claimsEmail: 'claims@paramount.com', standardTatHours: 6, claimTatDays: 21 },
        { tpaName: 'Health India TPA', shortName: 'Health India', irdaiTpaCode: 'TPA03', preAuthEmail: 'preauth@healthindia.com', claimsEmail: 'claims@healthindia.com', standardTatHours: 8, claimTatDays: 21 },
        { tpaName: 'FHPL (Family Health Plan Ltd)', shortName: 'FHPL', irdaiTpaCode: 'TPA04', preAuthEmail: 'preauth@fhpl.com', claimsEmail: 'claims@fhpl.com', standardTatHours: 4, claimTatDays: 14 },
        { tpaName: 'Vidal Health', shortName: 'Vidal', irdaiTpaCode: 'TPA05', preAuthEmail: 'preauth@vidal.com', claimsEmail: 'claims@vidal.com', standardTatHours: 4, claimTatDays: 15 },
        { tpaName: 'MDIndia Health Insurance TPA', shortName: 'MDIndia', irdaiTpaCode: 'TPA06', preAuthEmail: 'preauth@mdindia.com', claimsEmail: 'claims@mdindia.com', standardTatHours: 6, claimTatDays: 21 },
        { tpaName: 'Raksha TPA', shortName: 'Raksha', irdaiTpaCode: 'TPA07', preAuthEmail: 'preauth@raksha.com', claimsEmail: 'claims@raksha.com', standardTatHours: 8, claimTatDays: 21 },
        { tpaName: 'East West Assist', shortName: 'East West', irdaiTpaCode: 'TPA08', preAuthEmail: 'preauth@eastwest.com', claimsEmail: 'claims@eastwest.com', standardTatHours: 12, claimTatDays: 30 },
        { tpaName: 'Heritage Health TPA', shortName: 'Heritage', irdaiTpaCode: 'TPA09', preAuthEmail: 'preauth@heritage.com', claimsEmail: 'claims@heritage.com', standardTatHours: 8, claimTatDays: 21 },
        { tpaName: 'DHCS (Dedicated Healthcare Services)', shortName: 'DHCS', irdaiTpaCode: 'TPA10', preAuthEmail: 'preauth@dhcs.com', claimsEmail: 'claims@dhcs.com', standardTatHours: 6, claimTatDays: 21 }
      ];

      const insertedTpas = await TPAMaster.insertMany(tpas);
      console.log(`Seeded ${insertedTpas.length} TPAs`);

    // 2. Seed Insurance Companies
    try { await InsuranceCompany.collection.drop(); } catch(e) {}
    const companies = [
        { companyName: 'Star Health and Allied Insurance', shortName: 'Star Health', irdaiRegistrationNo: 'IRDA129', companyType: 'PRIVATE', claimEmail: 'claims@starhealth.com', claimDepartmentPhone: '1800-425-2255' },
        { companyName: 'HDFC ERGO Health Insurance', shortName: 'HDFC ERGO', irdaiRegistrationNo: 'IRDA146', companyType: 'PRIVATE', claimEmail: 'healthclaims@hdfcergo.com', claimDepartmentPhone: '1800-2700-700' },
        { companyName: 'Bajaj Allianz General Insurance', shortName: 'Bajaj Allianz', irdaiRegistrationNo: 'IRDA113', companyType: 'PRIVATE', claimEmail: 'bagichelp@bajajallianz.co.in', claimDepartmentPhone: '1800-209-5858' },
        { companyName: 'ICICI Lombard General Insurance', shortName: 'ICICI Lombard', irdaiRegistrationNo: 'IRDA115', companyType: 'PRIVATE', claimEmail: 'customersupport@icicilombard.com', claimDepartmentPhone: '1800-2666' },
        { companyName: 'Niva Bupa Health Insurance', shortName: 'Niva Bupa', irdaiRegistrationNo: 'IRDA145', companyType: 'PRIVATE', claimEmail: 'customercare@nivabupa.com', claimDepartmentPhone: '1860-500-8888' },
        { companyName: 'Care Health Insurance', shortName: 'Care Health', irdaiRegistrationNo: 'IRDA148', companyType: 'PRIVATE', claimEmail: 'customerfirst@careinsurance.com', claimDepartmentPhone: '1800-102-4488' },
        { companyName: 'Tata AIG General Insurance', shortName: 'Tata AIG', irdaiRegistrationNo: 'IRDA108', companyType: 'PRIVATE', claimEmail: 'customersupport@tataaig.com', claimDepartmentPhone: '1800-266-7780' },
        { companyName: 'Reliance General Insurance', shortName: 'Reliance', irdaiRegistrationNo: 'IRDA103', companyType: 'PRIVATE', claimEmail: 'rgicl.services@relianceada.com', claimDepartmentPhone: '1800-3009' },
        { companyName: 'Aditya Birla Health Insurance', shortName: 'Aditya Birla', irdaiRegistrationNo: 'IRDA153', companyType: 'PRIVATE', claimEmail: 'care.healthinsurance@adityabirlacapital.com', claimDepartmentPhone: '1800-270-7000' },
        { companyName: 'SBI General Insurance', shortName: 'SBI General', irdaiRegistrationNo: 'IRDA144', companyType: 'PRIVATE', claimEmail: 'customer.care@sbigeneral.in', claimDepartmentPhone: '1800-22-1111' },
        { companyName: 'New India Assurance Company', shortName: 'New India', irdaiRegistrationNo: 'IRDA190', companyType: 'PUBLIC', claimEmail: 'tech.support@newindia.co.in', claimDepartmentPhone: '1800-209-1415' },
        { companyName: 'United India Insurance Company', shortName: 'United India', irdaiRegistrationNo: 'IRDA545', companyType: 'PUBLIC', claimEmail: 'customercare@uiic.co.in', claimDepartmentPhone: '1800-425-33333' },
        { companyName: 'Oriental Insurance Company', shortName: 'Oriental', irdaiRegistrationNo: 'IRDA556', companyType: 'PUBLIC', claimEmail: 'portal.support@orientalinsurance.co.in', claimDepartmentPhone: '1800-11-8485' }
      ];

      const insertedCompanies = await InsuranceCompany.insertMany(companies);
      console.log(`Seeded ${insertedCompanies.length} Insurance Companies`);

    // 3. Official Forms Registry (Handled by formsRegistrySeed.js)
    /*
    await OfficialFormsRegistry.deleteMany({});
    ...
    console.log(`Seeded ${insertedForms.length} Official Forms`);
    */

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
