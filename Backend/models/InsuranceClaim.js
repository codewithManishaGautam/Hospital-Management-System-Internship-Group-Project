const mongoose = require('mongoose');

const insuranceClaimSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  insuranceProvider: {
    type: String,
    required: true,
    enum: ['Ayushman Bharat', 'CGHS', 'ESIC', 'MJPJAY', 'Private/TPA']
  },
  policyNumber: {
    type: String,
    required: true
  },
  claimType: {
    type: String,
    required: true,
    enum: ['Cashless', 'Reimbursement']
  },
  status: {
    type: String,
    default: 'Pending Pre-Auth',
    enum: [
      'Pending Pre-Auth',
      'Pre-Auth Approved',
      'Pre-Auth Rejected',
      'Claim Submitted',
      'Claim Approved',
      'Claim Settled',
      'Claim Rejected'
    ]
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  approvedAmount: {
    type: Number,
    default: 0
  },
  diagnosis: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
insuranceClaimSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('InsuranceClaim', insuranceClaimSchema);
