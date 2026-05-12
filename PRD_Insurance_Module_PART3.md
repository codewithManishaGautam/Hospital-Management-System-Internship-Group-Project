# 📋 PRD — Insurance Module (PART 3 of 5)
# Section 8: Database Schema Design (MongoDB)

---

## SECTION 8: Database Schema Design

> All collections use Mongoose. Relationships via ObjectId references. Timestamps auto-managed.

---

### 8.1 Collection: `insurance_policies`

Stores private insurance policy details linked to patients.

```json
{
  "_id": "ObjectId",
  "patientId": { "type": "ObjectId", "ref": "Patient", "required": true },
  "insuranceType": { "type": "String", "enum": ["Private", "Government"], "required": true },
  "providerName": { "type": "String", "required": true, "example": "Star Health" },
  "policyNumber": { "type": "String", "required": true, "unique": true },
  "planType": { "type": "String", "enum": ["Individual", "Family Floater", "Group"], "default": "Individual" },
  "sumInsured": { "type": "Number", "required": true, "example": 500000 },
  "subLimits": {
    "roomRentCap": { "type": "Number", "default": 0 },
    "icuCap": { "type": "Number", "default": 0 },
    "procedureCap": { "type": "Number", "default": 0 }
  },
  "coPayPercentage": { "type": "Number", "default": 0 },
  "deductible": { "type": "Number", "default": 0 },
  "tpaId": { "type": "ObjectId", "ref": "tpa_master" },
  "insurerCompanyId": { "type": "ObjectId", "ref": "insurance_companies" },
  "policyStartDate": { "type": "Date", "required": true },
  "policyEndDate": { "type": "Date", "required": true },
  "isNetworkHospital": { "type": "Boolean", "default": true },
  "waitingPeriodNotes": { "type": "String" },
  "verificationStatus": {
    "type": "String",
    "enum": ["Not Verified", "Verified — Active", "Verified — Expired", "Verification Failed"],
    "default": "Not Verified"
  },
  "verifiedBy": { "type": "ObjectId", "ref": "User" },
  "verifiedAt": { "type": "Date" },
  "isActive": { "type": "Boolean", "default": true },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `patientId`, `policyNumber` (unique), `providerName`, `verificationStatus`

---

### 8.2 Collection: `government_schemes`

Stores government scheme enrollment data per patient.

```json
{
  "_id": "ObjectId",
  "patientId": { "type": "ObjectId", "ref": "Patient", "required": true },
  "schemeName": {
    "type": "String",
    "enum": ["PM-JAY", "CGHS", "ESIC", "MJPJAY", "Other"],
    "required": true
  },
  "schemeSpecificData": {
    "abhaNumber": { "type": "String", "comment": "PM-JAY: 14-digit ABHA" },
    "ayushmanCardNumber": { "type": "String" },
    "familyId": { "type": "String" },
    "hbpCode": { "type": "String", "comment": "Health Benefit Package code" },
    "cghsBeneficiaryId": { "type": "String" },
    "cghsCardType": { "type": "String", "enum": ["Serving", "Pensioner", "Dependent"] },
    "referralReference": { "type": "String" },
    "esicIpNumber": { "type": "String" },
    "employerName": { "type": "String" },
    "dispensaryName": { "type": "String" },
    "rationCardNumber": { "type": "String" },
    "rationCardCategory": { "type": "String", "enum": ["Yellow", "Orange", "AAY", "Annapurna"] },
    "sevenTwelveExtract": { "type": "String" },
    "arogyamitraVerified": { "type": "Boolean", "default": false }
  },
  "verificationStatus": {
    "type": "String",
    "enum": ["Not Verified", "Verified — Active", "Verified — Expired", "Verification Failed"],
    "default": "Not Verified"
  },
  "verifiedBy": { "type": "ObjectId", "ref": "User" },
  "verifiedAt": { "type": "Date" },
  "primaryScheme": { "type": "Boolean", "default": true },
  "isActive": { "type": "Boolean", "default": true },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `patientId`, `schemeName`, `schemeSpecificData.abhaNumber`, `schemeSpecificData.esicIpNumber`

---

### 8.3 Collection: `tpa_master`

Master list of Third Party Administrators.

```json
{
  "_id": "ObjectId",
  "name": { "type": "String", "required": true, "example": "Medi Assist" },
  "irdaiLicenseNumber": { "type": "String" },
  "portalUrl": { "type": "String", "example": "https://mediassisttpa.in" },
  "helpdeskPhone": { "type": "String" },
  "helpdeskEmail": { "type": "String" },
  "preAuthTAT": { "type": "String", "example": "4 hours" },
  "claimTAT": { "type": "String", "example": "21 days" },
  "linkedInsurers": [{ "type": "ObjectId", "ref": "insurance_companies" }],
  "isActive": { "type": "Boolean", "default": true },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `name` (unique), `isActive`

---

### 8.4 Collection: `insurance_companies`

Master list of insurance companies.

```json
{
  "_id": "ObjectId",
  "name": { "type": "String", "required": true, "example": "Star Health Insurance" },
  "type": { "type": "String", "enum": ["Private", "PSU", "Government"], "required": true },
  "irdaiRegistrationNumber": { "type": "String" },
  "claimPortalUrl": { "type": "String" },
  "contactPhone": { "type": "String" },
  "contactEmail": { "type": "String" },
  "networkHospitalStatus": { "type": "Boolean", "default": false },
  "defaultTpaId": { "type": "ObjectId", "ref": "tpa_master" },
  "isActive": { "type": "Boolean", "default": true },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `name` (unique), `type`, `isActive`

---

### 8.5 Collection: `pre_authorization_requests`

Tracks all pre-authorization requests.

```json
{
  "_id": "ObjectId",
  "patientId": { "type": "ObjectId", "ref": "Patient", "required": true },
  "policyId": { "type": "ObjectId", "ref": "insurance_policies" },
  "schemeId": { "type": "ObjectId", "ref": "government_schemes" },
  "admittingDoctor": { "type": "String", "required": true },
  "expectedAdmissionDate": { "type": "Date" },
  "expectedDischargeDate": { "type": "Date" },
  "diagnosis": { "type": "String", "required": true },
  "icd10Code": { "type": "String" },
  "proposedTreatment": { "type": "String", "required": true },
  "estimatedCost": { "type": "Number", "required": true },
  "status": {
    "type": "String",
    "enum": ["Draft", "Submitted", "Under Review", "Query Raised", "Approved", "Enhancement Requested", "Rejected", "Expired"],
    "default": "Draft"
  },
  "approvedAmount": { "type": "Number" },
  "authorizationNumber": { "type": "String" },
  "validityDate": { "type": "Date" },
  "queryDetails": [{
    "queryText": "String",
    "queryDate": "Date",
    "responseText": "String",
    "responseDate": "Date",
    "respondedBy": { "type": "ObjectId", "ref": "User" }
  }],
  "statusHistory": [{
    "status": "String",
    "changedAt": "Date",
    "changedBy": { "type": "ObjectId", "ref": "User" },
    "notes": "String"
  }],
  "documents": [{ "type": "ObjectId", "ref": "claim_documents" }],
  "submittedBy": { "type": "ObjectId", "ref": "User" },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `patientId`, `status`, `authorizationNumber`, `validityDate`

---

### 8.6 Collection: `insurance_claims`

Core claims collection tracking the full claim lifecycle.

```json
{
  "_id": "ObjectId",
  "claimNumber": { "type": "String", "unique": true, "comment": "Auto-generated: CLM-YYYYMMDD-XXXX" },
  "patientId": { "type": "ObjectId", "ref": "Patient", "required": true },
  "policyId": { "type": "ObjectId", "ref": "insurance_policies" },
  "schemeId": { "type": "ObjectId", "ref": "government_schemes" },
  "preAuthId": { "type": "ObjectId", "ref": "pre_authorization_requests" },
  "claimType": { "type": "String", "enum": ["Cashless", "Reimbursement"], "required": true },
  "admissionDate": { "type": "Date", "required": true },
  "dischargeDate": { "type": "Date" },
  "diagnosis": { "type": "String", "required": true },
  "icd10Code": { "type": "String" },
  "proceduresPerformed": { "type": "String" },
  "treatingDoctor": { "type": "String" },
  "totalBillAmount": { "type": "Number" },
  "claimedAmount": { "type": "Number" },
  "approvedAmount": { "type": "Number" },
  "settledAmount": { "type": "Number" },
  "coPayAmount": { "type": "Number" },
  "deductibleAmount": { "type": "Number" },
  "nonCoveredAmount": { "type": "Number" },
  "patientPayable": { "type": "Number" },
  "status": {
    "type": "String",
    "enum": ["Draft", "Documents Pending", "Ready for Submission", "Submitted", "Under Process", "Query", "Approved", "Settled", "Partially Settled", "Rejected", "Appeal Filed"],
    "default": "Draft"
  },
  "settlementDetails": {
    "utrNumber": "String",
    "settlementDate": "Date",
    "bankReference": "String",
    "partialReason": "String"
  },
  "rejectionReason": { "type": "String" },
  "statusHistory": [{
    "status": "String",
    "changedAt": "Date",
    "changedBy": { "type": "ObjectId", "ref": "User" },
    "notes": "String"
  }],
  "documents": [{ "type": "ObjectId", "ref": "claim_documents" }],
  "documentChecklist": {
    "admissionForm": { "type": "Boolean", "default": false },
    "dischargeSummary": { "type": "Boolean", "default": false },
    "investigationReports": { "type": "Boolean", "default": false },
    "prescription": { "type": "Boolean", "default": false },
    "doctorNotes": { "type": "Boolean", "default": false },
    "billInvoice": { "type": "Boolean", "default": false },
    "consentForm": { "type": "Boolean", "default": false },
    "insuranceCardCopy": { "type": "Boolean", "default": false },
    "idProof": { "type": "Boolean", "default": false }
  },
  "createdBy": { "type": "ObjectId", "ref": "User" },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `claimNumber` (unique), `patientId`, `status`, `claimType`, `admissionDate`, `policyId`

---

### 8.7 Collection: `claim_documents`

Stores metadata for uploaded insurance documents.

```json
{
  "_id": "ObjectId",
  "claimId": { "type": "ObjectId", "ref": "insurance_claims" },
  "preAuthId": { "type": "ObjectId", "ref": "pre_authorization_requests" },
  "category": {
    "type": "String",
    "enum": ["Admission Form", "Discharge Summary", "Investigation Reports", "Prescription", "Doctor Notes", "Pre-Auth Form", "Bill/Invoice", "Consent Form", "Insurance Card Copy", "ID Proof", "Other"],
    "required": true
  },
  "filename": { "type": "String", "required": true },
  "originalName": { "type": "String", "required": true },
  "filePath": { "type": "String", "required": true },
  "fileSize": { "type": "Number" },
  "mimeType": { "type": "String", "enum": ["application/pdf", "image/jpeg", "image/png"] },
  "uploadedBy": { "type": "ObjectId", "ref": "User", "required": true },
  "isDeleted": { "type": "Boolean", "default": false },
  "deletedBy": { "type": "ObjectId", "ref": "User" },
  "deletedAt": { "type": "Date" },
  "createdAt": "Date (auto)"
}
```

**Indexes:** `claimId`, `preAuthId`, `category`, `isDeleted`

---

### 8.8 Collection: `official_forms_registry`

Directory of official insurer/TPA claim forms.

```json
{
  "_id": "ObjectId",
  "insurerOrTpaName": { "type": "String", "required": true },
  "formName": { "type": "String", "required": true, "example": "Pre-Authorization Request Form" },
  "formType": { "type": "String", "enum": ["Pre-Auth", "Claim", "Reimbursement", "Discharge", "Other"] },
  "downloadUrl": { "type": "String", "required": true },
  "formVersion": { "type": "String" },
  "lastVerifiedDate": { "type": "Date" },
  "lastVerifiedBy": { "type": "ObjectId", "ref": "User" },
  "isDeprecated": { "type": "Boolean", "default": false },
  "notes": { "type": "String" },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `insurerOrTpaName`, `formType`, `isDeprecated`

---

### 8.9 Collection: `insurance_billing_mapping`

Links insurance calculations to billing records.

```json
{
  "_id": "ObjectId",
  "patientId": { "type": "ObjectId", "ref": "Patient", "required": true },
  "billId": { "type": "ObjectId", "ref": "Bill", "comment": "From Billing module" },
  "claimId": { "type": "ObjectId", "ref": "insurance_claims" },
  "policyId": { "type": "ObjectId", "ref": "insurance_policies" },
  "totalBillAmount": { "type": "Number", "required": true },
  "approvedAmount": { "type": "Number" },
  "coPayAmount": { "type": "Number", "default": 0 },
  "deductibleAmount": { "type": "Number", "default": 0 },
  "nonCoveredItems": [{
    "itemName": "String",
    "amount": "Number"
  }],
  "insuranceDeduction": { "type": "Number", "required": true },
  "patientPayable": { "type": "Number", "required": true },
  "isManualOverride": { "type": "Boolean", "default": false },
  "overrideReason": { "type": "String" },
  "overrideBy": { "type": "ObjectId", "ref": "User" },
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

**Indexes:** `patientId`, `billId`, `claimId`

---

### Entity Relationship Summary

```
Patient (Reception Module)
    │
    ├── insurance_policies (1:N) ── tpa_master (N:1) ── insurance_companies (N:M)
    │
    ├── government_schemes (1:N)
    │
    ├── pre_authorization_requests (1:N) ── claim_documents (1:N)
    │
    ├── insurance_claims (1:N) ── claim_documents (1:N)
    │                         ── insurance_billing_mapping (1:1)
    │
    └── official_forms_registry (standalone master data)
```

---

> **End of Part 3** — Continue to `PRD_Insurance_Module_PART4.md` for Section 9 (API Endpoints) and Section 10 (Frontend Screens).
