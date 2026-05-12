const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TPAMaster = require('../models/insurance/TPAMaster');
const InsuranceCompany = require('../models/insurance/InsuranceCompany');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for Seeding');

    // Clear existing
    await TPAMaster.deleteMany();
    await InsuranceCompany.deleteMany();

    // 1. Seed TPAs
    const tpas = [
      {
        name: 'Medi Assist',
        irdaiLicenseNumber: 'TPA-001',
        portalUrl: 'https://mediassisttpa.in',
        preAuthTAT: '4 hours',
        claimTAT: '21 days',
      },
      {
        name: 'Paramount Health',
        irdaiLicenseNumber: 'TPA-002',
        portalUrl: 'https://paramounttpa.com',
        preAuthTAT: '6 hours',
        claimTAT: '30 days',
      },
      {
        name: 'Vidal Health',
        irdaiLicenseNumber: 'TPA-003',
        portalUrl: 'https://vidalhealth.com',
        preAuthTAT: '4 hours',
        claimTAT: '15 days',
      }
    ];

    const insertedTpas = await TPAMaster.insertMany(tpas);
    console.log(`Seeded ${insertedTpas.length} TPAs`);

    const mediAssistId = insertedTpas.find(t => t.name === 'Medi Assist')._id;
    const paramountId = insertedTpas.find(t => t.name === 'Paramount Health')._id;

    // 2. Seed Insurers
    const insurers = [
      {
        name: 'Star Health Insurance',
        type: 'Private',
        irdaiRegistrationNumber: 'IRDAI/129',
        claimPortalUrl: 'https://starhealth.in',
        networkHospitalStatus: true,
        defaultTpaId: null // In-house TPA usually, or handled directly
      },
      {
        name: 'HDFC ERGO',
        type: 'Private',
        irdaiRegistrationNumber: 'IRDAI/146',
        networkHospitalStatus: true,
        defaultTpaId: mediAssistId
      },
      {
        name: 'New India Assurance',
        type: 'PSU',
        irdaiRegistrationNumber: 'IRDAI/190',
        networkHospitalStatus: false,
        defaultTpaId: paramountId
      }
    ];

    const insertedInsurers = await InsuranceCompany.insertMany(insurers);
    console.log(`Seeded ${insertedInsurers.length} Insurance Companies`);

    console.log('Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();
