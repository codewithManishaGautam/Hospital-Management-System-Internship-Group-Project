export const validatePolicy = (data) => {
  const errors = {};

  if (!data.patientId || data.patientId.length < 5) {
    errors.patientId = 'Valid Patient ID is required';
  }
  if (!data.providerName || data.providerName.trim().length < 2) {
    errors.providerName = 'Provider name must be at least 2 characters';
  }
  if (!data.policyNumber || data.policyNumber.trim().length < 3) {
    errors.policyNumber = 'Valid policy number is required';
  }
  if (!data.sumInsured || Number(data.sumInsured) <= 0) {
    errors.sumInsured = 'Sum insured must be greater than 0';
  }
  if (!data.policyStartDate) {
    errors.policyStartDate = 'Policy start date is required';
  }
  if (!data.policyEndDate) {
    errors.policyEndDate = 'Policy end date is required';
  }
  if (data.policyStartDate && data.policyEndDate && new Date(data.policyEndDate) <= new Date(data.policyStartDate)) {
    errors.policyEndDate = 'End date must be after start date';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateScheme = (data) => {
  const errors = {};

  if (!data.patientId || data.patientId.length < 5) {
    errors.patientId = 'Valid Patient ID is required';
  }
  if (!data.schemeName) {
    errors.schemeName = 'Scheme name is required';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePreAuth = (data) => {
  const errors = {};

  if (!data.patientId || data.patientId.length < 5) {
    errors.patientId = 'Valid Patient ID is required';
  }
  if (!data.policyId || data.policyId.length < 5) {
    errors.policyId = 'Policy/Scheme ID is required';
  }
  if (!data.estimatedAmount || Number(data.estimatedAmount) <= 0) {
    errors.estimatedAmount = 'Estimated amount must be greater than 0';
  }
  if (!data.clinicalDiagnosis || data.clinicalDiagnosis.trim().length < 3) {
    errors.clinicalDiagnosis = 'Clinical diagnosis must be at least 3 characters';
  }
  if (!data.hospitalBranch || data.hospitalBranch.trim().length < 2) {
    errors.hospitalBranch = 'Hospital branch is required';
  }
  if (!data.treatingDoctor || data.treatingDoctor.trim().length < 2) {
    errors.treatingDoctor = 'Treating doctor name is required';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateClaim = (data) => {
  const errors = {};

  if (!data.patientId || data.patientId.length < 5) {
    errors.patientId = 'Valid Patient ID is required';
  }
  if (!data.policyId || data.policyId.length < 5) {
    errors.policyId = 'Policy/Scheme ID is required';
  }
  if (!data.totalBilledAmount || Number(data.totalBilledAmount) <= 0) {
    errors.totalBilledAmount = 'Total billed amount must be greater than 0';
  }
  if (!data.hospitalizationDate) {
    errors.hospitalizationDate = 'Admission date is required';
  }
  if (!data.dischargeDate) {
    errors.dischargeDate = 'Discharge date is required';
  }
  if (data.hospitalizationDate && data.dischargeDate && new Date(data.dischargeDate) <= new Date(data.hospitalizationDate)) {
    errors.dischargeDate = 'Discharge date must be after admission date';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const formatValidationErrors = (errors) => {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join('; ');
};
