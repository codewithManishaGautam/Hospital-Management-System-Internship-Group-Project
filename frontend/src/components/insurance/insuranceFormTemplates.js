export const FORM_TEMPLATES = {
  IRDAI_STANDARD: {
    id: "IRDAI_STANDARD",
    name: "IRDAI Standard Private Insurance (Star Health, HDFC, etc.)",
    sections: [
      {
        title: "Patient Details",
        fields: [
          { name: "patientName", label: "Patient Name", type: "text", required: true, autoFill: "name" },
          { name: "age", label: "Age", type: "number", required: true, autoFill: "age" },
          { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true, autoFill: "gender" },
          { name: "contact", label: "Contact Number", type: "text", required: true, autoFill: "contact" }
        ]
      },
      {
        title: "Policy Details",
        fields: [
          { name: "policyNumber", label: "Policy Number", type: "text", required: true, autoFill: "policyNumber" },
          { name: "tpaName", label: "TPA / Insurance Provider", type: "text", required: true, autoFill: "providerName" },
          { name: "hasOtherInsurance", label: "Any other active health insurance?", type: "checkbox" }
        ]
      },
      {
        title: "Medical Information (To be filled by Doctor)",
        fields: [
          { name: "clinicalDiagnosis", label: "Clinical Diagnosis", type: "textarea", required: true },
          { name: "icd10Code", label: "ICD-10 Code", type: "text", required: true },
          { name: "treatmentType", label: "Proposed Treatment Line", type: "select", options: ["Medical Management", "Surgical", "Intensive Care"], required: true },
          { name: "isPreExisting", label: "Is it a pre-existing condition?", type: "checkbox" }
        ]
      },
      {
        title: "Financial Estimates",
        fields: [
          { name: "roomRentPerDay", label: "Room Rent Per Day (₹)", type: "number", required: true },
          { name: "estimatedStay", label: "Estimated Length of Stay (Days)", type: "number", required: true },
          { name: "totalEstimatedCost", label: "Total Estimated Cost (₹)", type: "number", required: true }
        ]
      }
    ]
  },
  PM_JAY: {
    id: "PM_JAY",
    name: "Ayushman Bharat (PM-JAY)",
    sections: [
      {
        title: "Beneficiary Verification",
        fields: [
          { name: "abhaNumber", label: "ABHA Number (14-digit)", type: "text", required: true, autoFill: "abhaNumber" },
          { name: "pmjayId", label: "PM-JAY Health Card ID", type: "text", required: true, autoFill: "ayushmanCardNumber" }
        ]
      },
      {
        title: "Admission & Clinical Status",
        fields: [
          { name: "admissionType", label: "Admission Type", type: "select", options: ["Planned", "Emergency"], required: true },
          { name: "bloodPressure", label: "Blood Pressure (e.g. 120/80)", type: "text", required: true },
          { name: "pulseRate", label: "Pulse Rate (bpm)", type: "number", required: true },
          { name: "clinicalNotes", label: "Clinical Signs / Presenting Illness", type: "textarea", required: true }
        ]
      },
      {
        title: "Package Selection & Evidence",
        fields: [
          { name: "hbpCategory", label: "HBP Category", type: "text", required: true },
          { name: "hbpCode", label: "Health Benefit Package (HBP) Code", type: "text", required: true },
          { name: "onBedPhoto", label: "Upload Mandatory 'On-Bed' Patient Photograph", type: "file", required: true }
        ]
      }
    ]
  },
  CGHS: {
    id: "CGHS",
    name: "Central Government Health Scheme (CGHS)",
    sections: [
      {
        title: "Beneficiary Information",
        fields: [
          { name: "cghsCardNo", label: "CGHS Card Number", type: "text", required: true, autoFill: "ayushmanCardNumber" },
          { name: "principalCardholder", label: "Name of Principal Cardholder", type: "text", required: true },
          { name: "basicPay", label: "Basic Pay / Pension (₹)", type: "number", required: true },
          { name: "wardEntitlement", label: "Ward Entitlement", type: "select", options: ["General", "Semi-Private", "Private"], required: true }
        ]
      },
      {
        title: "Medical & Billing Details",
        fields: [
          { name: "procedureName", label: "Name of Procedure", type: "text", required: true },
          { name: "cghsRateCode", label: "Applicable CGHS Rate Code", type: "text", required: true },
          { name: "referralAttached", label: "Is CGHS Referral Letter Attached?", type: "checkbox", required: true }
        ]
      }
    ]
  }
};
