const mongoose = require('mongoose');

// Auto-generate IPD number
const generateIpdNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `IPD-${year}-${random}`;
};

const AdmissionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  ipdNumber: { type: String, unique: true, default: generateIpdNumber },
  admissionDate: { type: Date, required: true, default: Date.now },
  dischargeDate: { type: Date },
  expectedDischargeDate: { type: Date },
  wardType: { type: String, enum: ['General', 'Semi-Private', 'Private', 'ICU', 'NICU', 'HDU'], default: 'General' },
  roomNumber: { type: String },
  bedNumber: { type: String },
  admittingDoctor: { type: String },
  admittingDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  department: { type: String },
  diagnosis: { type: String },
  admissionType: { type: String, enum: ['Planned', 'Emergency', 'Day Care'], default: 'Planned' },
  
  status: { type: String, enum: ['Admitted', 'Discharged', 'Cancelled', 'Transfer'], default: 'Admitted' },

  // Insurance linkages
  insuranceCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCase' },
  activePolicyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientInsurancePolicy' },
  activePreAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PreAuthRequest' },

  // Patient Identity (BRD §3 Step 1)
  identityProofs: {
    aadhaar: { type: String },
    pan: { type: String },
    otherIdType: { type: String },
    otherIdNumber: { type: String }
  },

  // Referral & Previous Records
  referralDocuments: [{ type: String }], // File paths
  previousMedicalRecords: [{ type: String }], // File paths

  // Financial linkages
  totalBilledAmount: { type: Number, default: 0 },
  insurancePayable: { type: Number, default: 0 },
  patientPayable: { type: Number, default: 0 },

  // Audit
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String }
}, { timestamps: true });

AdmissionSchema.index({ patientId: 1, status: 1 });
AdmissionSchema.index({ ipdNumber: 1 });

module.exports = mongoose.model('Admission', AdmissionSchema);
