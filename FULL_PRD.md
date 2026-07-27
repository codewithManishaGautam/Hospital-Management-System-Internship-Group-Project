# ═══════════════════════════════════════════════════════════════════════
# HMS INSURANCE MODULE — PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Format: AI Prompt Document for Gemini 1.5 Pro
# Prepared by: Siddhant Sangram Shinde — Insurance Module Owner
# Project: Hospital Management System (Team Internship — 6 Months)
# Role Stack: React.js + Node.js + Express.js + MongoDB
# ═══════════════════════════════════════════════════════════════════════

---

## ⚡ ACTIVATION — READ THIS BEFORE ANYTHING ELSE

You are a **senior full-stack developer** with 8+ years of experience building
healthcare IT systems in India. You have deep expertise in:

- React.js (v19), Node.js, Express.js (v5), MongoDB, Mongoose
- Indian health insurance operations (IRDAI, TPA ecosystem, PM-JAY, CGHS, ESIC, MJPJAY)
- Hospital Management System architecture
- REST API design with JWT authentication and role-based access control
- Multi-developer team Git workflows

You are building the **Insurance Module** for an existing Hospital Management System
(HMS) as part of a **6-person internship team** where each developer owns one module.

**Your mission:** Build the complete Insurance Module — backend + frontend — fully
integrated with the existing HMS codebase. Every decision you make must respect
the existing codebase structure so that the team's work merges cleanly on GitHub.

---

## 🏗️ CRITICAL CONSTRAINT — EXISTING CODEBASE CONTEXT

> **THIS IS NOT A GREENFIELD PROJECT.**
> An HMS already exists. Other team members have built: Reception Module,
> Doctor Module, Billing Module, Admin Module, Nurse Module, Lab Module,
> Pharmacy Module. You are **adding** the Insurance Module to this system.

### ⛔ FRONTEND DESIGN RULES — NON-NEGOTIABLE

The frontend must **match the existing team's UI design exactly**:

1. **Use the existing `Layout.jsx` component** — do NOT create a new layout.
   The Layout has a Sidebar + Topbar already. Plug your Insurance views into it.

2. **Match existing color palette, font, spacing** — look at how other modules
   render their pages and replicate the same card styles, table styles, button
   styles, and form styles.

3. **Same component patterns** — if the team uses `<table>` for data lists, use
   `<table>`. If they use cards for stats, use cards. Do not introduce new UI
   libraries not already in the project.

4. **Same CSS approach** — match whether the project uses inline styles, CSS
   modules, Tailwind, or plain CSS. Do NOT introduce new styling approaches.

5. **Never break other modules** — your routes, component names, and API paths
   must not conflict with other modules already in the project.

6. **Use existing shared components** — patient lookup, doctor lookup, date
   pickers, and modals that already exist in the project must be reused.

---

## 👤 DEVELOPER PROFILE — WHO IS BUILDING THIS

- **Name:** Siddhant Sangram Shinde, Pune, Maharashtra
- **Age:** 24
- **Experience:** Strong coder, first real-world team project
- **Insurance Domain Knowledge:** Zero prior exposure — needs concepts explained
- **Team Size:** 6 developers, each owning one HMS module
- **Timeline:** 6-month internship
- **Stack:** React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, HTML5, CSS3, ES6+

---

## 📁 PROJECT STRUCTURE — FOLLOW THIS EXACTLY

```
HMS-Project/
├── Backend/
│   ├── index.js                        ← Main entry point (port 5000)
│   ├── models/
│   │   ├── Patient.js                  ← Already exists — reference it
│   │   ├── User.js                     ← Already exists — reference it
│   │   └── insurance/                  ← YOU CREATE THIS FOLDER
│   │       ├── InsurancePolicy.js
│   │       ├── GovernmentScheme.js
│   │       ├── PreAuthRequest.js
│   │       ├── InsuranceClaim.js
│   │       ├── ClaimDocument.js
│   │       ├── InsuranceBillingMapping.js
│   │       ├── TPAMaster.js
│   │       ├── InsuranceCompany.js
│   │       └── OfficialFormsRegistry.js
│   ├── routes/
│   │   ├── insurance/                  ← YOU CREATE THIS FOLDER
│   │   │   ├── index.js                ← Router hub
│   │   │   ├── policyRoutes.js
│   │   │   ├── schemeRoutes.js
│   │   │   ├── preAuthRoutes.js
│   │   │   ├── claimRoutes.js
│   │   │   ├── documentRoutes.js
│   │   │   ├── billingIntegrationRoutes.js
│   │   │   ├── masterDataRoutes.js
│   │   │   └── notificationRoutes.js
│   ├── middleware/
│   │   └── upload.js                   ← Multer config (5MB limit)
│   ├── seeds/
│   │   └── insuranceSeed.js            ← Seed TPA + Insurer master data
│   └── insurance-api.postman_collection.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx              ← ALREADY EXISTS — DO NOT TOUCH
│   │   ├── pages/
│   │   │   └── Insurance/              ← YOU CREATE THIS FOLDER
│   │   │       ├── Insurance.jsx       ← Main insurance page
│   │   │       ├── ProviderFormRenderer.jsx
│   │   │       ├── InsuranceSplitCard.jsx
│   │   │       ├── NotificationBell.jsx
│   │   │       └── insuranceFormTemplates.js
```

---

## 🗄️ SECTION 1 — DATABASE SCHEMA (MongoDB + Mongoose)

Build **9 MongoDB collections** under the `hospitalDB` database.
Use Mongoose with proper validation, defaults, and ref population.

---

### Collection 1: `insurance_policies`

**Purpose:** Stores private health insurance policies linked to patients.

| Field | Type | Required | Notes |
|---|---|---|---|
| `patientId` | ObjectId → Patient | ✅ | Reference to patients collection |
| `insuranceType` | Enum | ✅ | `Private` or `Government` |
| `providerName` | String | ✅ | e.g. "Star Health" |
| `policyNumber` | String | ✅ | Unique per patient |
| `planType` | Enum | ✅ | `Individual`, `Family Floater`, `Group` |
| `sumInsured` | Number | ✅ | Total coverage amount in INR |
| `subLimits.roomRentCap` | Number | | Per-day room rent limit |
| `subLimits.icuCap` | Number | | Per-day ICU limit |
| `subLimits.procedureCap` | Number | | Per-procedure limit |
| `coPayPercentage` | Number | | Default: 0 |
| `deductible` | Number | | Default: 0 |
| `tpaId` | ObjectId → TPAMaster | | Linked TPA |
| `insurerCompanyId` | ObjectId → InsuranceCompany | | Linked insurer |
| `policyStartDate` | Date | ✅ | |
| `policyEndDate` | Date | ✅ | |
| `isNetworkHospital` | Boolean | | Is this hospital in-network? |
| `waitingPeriodNotes` | String | | Free text |
| `verificationStatus` | Enum | | `Not Verified`, `Verified — Active`, `Verified — Expired`, `Verification Failed` |
| `verifiedBy` | ObjectId → User | | Staff who verified |
| `verifiedAt` | Date | | Timestamp of verification |
| `isActive` | Boolean | | Default: true (soft-delete) |
| `createdAt`, `updatedAt` | Date | | Mongoose timestamps: true |

---

### Collection 2: `government_schemes`

**Purpose:** Enrolls patients under PM-JAY, CGHS, ESIC, MJPJAY, or Other.

| Field | Type | Required | Notes |
|---|---|---|---|
| `patientId` | ObjectId → Patient | ✅ | |
| `schemeName` | Enum | ✅ | `PM-JAY`, `CGHS`, `ESIC`, `MJPJAY`, `Other` |
| `schemeSpecificData.abhaNumber` | String | | PM-JAY ABHA health ID |
| `schemeSpecificData.ayushmanCardNumber` | String | | PM-JAY card |
| `schemeSpecificData.familyId` | String | | PM-JAY family ID |
| `schemeSpecificData.hbpCode` | String | | Health Benefit Package code |
| `schemeSpecificData.cghsBeneficiaryId` | String | | CGHS unique ID |
| `schemeSpecificData.cghsCardType` | Enum | | `Serving`, `Pensioner`, `Dependent` |
| `schemeSpecificData.referralReference` | String | | CGHS referral number |
| `schemeSpecificData.esicIpNumber` | String | | ESIC IP number |
| `schemeSpecificData.employerName` | String | | ESIC employer name |
| `schemeSpecificData.dispensaryName` | String | | ESIC dispensary |
| `schemeSpecificData.rationCardNumber` | String | | PM-JAY / MJPJAY |
| `schemeSpecificData.rationCardCategory` | Enum | | `Yellow`, `Orange`, `AAY`, `Annapurna` |
| `schemeSpecificData.arogyamitraVerified` | Boolean | | Arogya Mitra checked? |
| `verificationStatus` | Enum | | Same as policy |
| `verifiedBy` | ObjectId → User | | |
| `verifiedAt` | Date | | |
| `primaryScheme` | Boolean | | For dual-eligible patients |
| `isActive` | Boolean | | Default: true |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 3: `pre_authorization_requests`

**Purpose:** Tracks cashless pre-auth requests from hospital to insurer/TPA.

| Field | Type | Required | Notes |
|---|---|---|---|
| `patientId` | ObjectId → Patient | ✅ | |
| `policyId` | ObjectId → InsurancePolicy | | For private insurance |
| `schemeId` | ObjectId → GovernmentScheme | | For government scheme |
| `admittingDoctor` | String | ✅ | Treating doctor name |
| `expectedAdmissionDate` | Date | | |
| `expectedDischargeDate` | Date | | |
| `diagnosis` | String | ✅ | |
| `icd10Code` | String | | e.g. "J18.9" |
| `proposedTreatment` | String | ✅ | |
| `estimatedCost` | Number | ✅ | |
| `status` | Enum | ✅ | `Draft`, `Submitted`, `Under Review`, `Query Raised`, `Approved`, `Enhancement Requested`, `Rejected`, `Expired` |
| `approvedAmount` | Number | | Set when approved |
| `authorizationNumber` | String | | TPA auth ref number |
| `validityDate` | Date | | Auth expiry |
| `queryDetails` | Array of { query, response, timestamp } | | Q&A log |
| `statusHistory` | Array of { status, changedBy, changedAt, remarks } | | Full audit trail |
| `documents` | [ObjectId → ClaimDocument] | | |
| `providerTemplateUsed` | String | | `IRDAI_STANDARD`, `PM_JAY`, `CGHS` |
| `providerSpecificData` | Map (Mixed) | | Dynamic form field values |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 4: `insurance_claims`

**Purpose:** Core claims processing — both cashless and reimbursement.

| Field | Type | Required | Notes |
|---|---|---|---|
| `claimNumber` | String, unique | ✅ | Auto-generated: CLM-YYYYMMDD-NNNN |
| `patientId` | ObjectId → Patient | ✅ | |
| `policyId` | ObjectId → InsurancePolicy | | |
| `schemeId` | ObjectId → GovernmentScheme | | |
| `preAuthId` | ObjectId → PreAuthRequest | | If claim linked to pre-auth |
| `claimType` | Enum | ✅ | `Cashless`, `Reimbursement` |
| `admissionDate` | Date | ✅ | |
| `dischargeDate` | Date | | |
| `diagnosis` | String | ✅ | |
| `icd10Code` | String | | |
| `proceduresPerformed` | String | | |
| `treatingDoctor` | String | | |
| `totalBillAmount` | Number | | Gross hospital bill |
| `claimedAmount` | Number | | Amount submitted to insurer |
| `approvedAmount` | Number | | Insurer approved |
| `settledAmount` | Number | | Actual amount received |
| `coPayAmount` | Number | | Patient co-pay portion |
| `deductibleAmount` | Number | | Deductible applied |
| `nonCoveredAmount` | Number | | Exclusions total |
| `patientPayable` | Number | | Net patient liability |
| `status` | Enum | ✅ | `Draft`, `Documents Pending`, `Ready for Submission`, `Submitted`, `Under Process`, `Query`, `Approved`, `Partially Settled`, `Settled`, `Rejected`, `Appeal Filed` |
| `settlementDetails` | { utrNumber, date, bankReference, amount } | | |
| `rejectionReason` | String | | |
| `statusHistory` | Array of { status, changedBy, changedAt, remarks } | | |
| `documents` | [ObjectId → ClaimDocument] | | |
| `documentChecklist` | { admissionForm, dischargeSummary, investigationReports, prescription, doctorNotes, billInvoice, consentForm, insuranceCardCopy, idProof } — all Boolean | | |
| `providerTemplateUsed` | String | | |
| `providerSpecificData` | Map (Mixed) | | |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 5: `insurance_billing_mappings`

**Purpose:** Provides the Billing Module with insurance split data.

| Field | Type | Required | Notes |
|---|---|---|---|
| `patientId` | ObjectId → Patient | ✅ | |
| `billId` | ObjectId | | Reference to billing module's bill |
| `claimId` | ObjectId → InsuranceClaim | | |
| `policyId` | ObjectId → InsurancePolicy | | |
| `totalBillAmount` | Number | ✅ | |
| `approvedAmount` | Number | | |
| `coPayAmount` | Number | | |
| `deductibleAmount` | Number | | |
| `nonCoveredItems` | Array of { description, amount } | | Itemised exclusions |
| `insuranceDeduction` | Number | ✅ | What insurance pays |
| `patientPayable` | Number | ✅ | What patient pays |
| `isManualOverride` | Boolean | | Default: false |
| `overrideReason` | String | | |
| `overrideBy` | ObjectId → User | | |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 6: `claim_documents`

**Purpose:** Stores all uploaded medical documents for claims and pre-auths.

| Field | Type | Required | Notes |
|---|---|---|---|
| `claimId` | ObjectId → InsuranceClaim | | |
| `preAuthId` | ObjectId → PreAuthRequest | | |
| `category` | Enum | ✅ | `Admission Form`, `Discharge Summary`, `Investigation Reports`, `Prescription`, `Doctor Notes`, `Bill/Invoice`, `Consent Form`, `Insurance Card Copy`, `ID Proof`, `Operation Theatre Notes`, `Other` |
| `filename` | String | ✅ | System-stored filename |
| `originalName` | String | ✅ | Original upload filename |
| `filePath` | String | ✅ | Server path |
| `fileSize` | Number | | Bytes |
| `mimeType` | Enum | | `application/pdf`, `image/jpeg`, `image/png` |
| `uploadedBy` | ObjectId → User | ✅ | |
| `isDeleted` | Boolean | | Default: false |
| `deletedBy` | ObjectId → User | | |
| `deletedAt` | Date | | |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 7: `tpa_master`

**Purpose:** Registry of Third Party Administrators operating in India.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | String, unique | ✅ | e.g. "Medi Assist India" |
| `irdaiLicenseNumber` | String | | IRDAI TPA license |
| `portalUrl` | String | | Hospital provider portal |
| `helpdeskPhone` | String | | 24x7 helpline |
| `helpdeskEmail` | String | | |
| `preAuthTAT` | String | | e.g. "2–4 hours" |
| `claimTAT` | String | | e.g. "7–15 working days" |
| `linkedInsurers` | [ObjectId → InsuranceCompany] | | |
| `isActive` | Boolean | | Default: true |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 8: `insurance_companies`

**Purpose:** Registry of insurance companies this hospital deals with.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | String, unique | ✅ | Full company name |
| `type` | Enum | ✅ | `Private`, `PSU`, `Government` |
| `irdaiRegistrationNumber` | String | | |
| `claimPortalUrl` | String | | |
| `contactPhone` | String | | |
| `contactEmail` | String | | |
| `networkHospitalStatus` | Boolean | | Is this hospital empanelled? |
| `defaultTpaId` | ObjectId → TPAMaster | | |
| `isActive` | Boolean | | Default: true |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

### Collection 9: `official_forms_registry`

**Purpose:** Directory of official insurer/TPA PDF forms for download.

| Field | Type | Required | Notes |
|---|---|---|---|
| `insurerOrTpaName` | String | ✅ | |
| `formName` | String | ✅ | e.g. "Star Health Pre-Auth Form" |
| `formType` | Enum | ✅ | `Pre-Auth`, `Claim`, `Reimbursement`, `Discharge`, `Other` |
| `downloadUrl` | String | ✅ | Where staff can download form |
| `formVersion` | String | | e.g. "v2.1" |
| `lastVerifiedDate` | Date | | |
| `lastVerifiedBy` | ObjectId → User | | |
| `isDeprecated` | Boolean | | Default: false |
| `notes` | String | | Any special notes |
| `createdAt`, `updatedAt` | Date | | timestamps: true |

---

## 🔌 SECTION 2 — API SPECIFICATION (33 Endpoints)

All routes mount under `/api/insurance` in `Backend/index.js`.

**Standard Response Format:**
```
Success: { success: true, data: {}, message: "..." }
Error:   { success: false, error: "..." }
```

**Auth Header (to be enforced later):** `Authorization: Bearer <JWT>`

---

### 2.1 Health Check

```
GET  /api/insurance/health
Purpose: Verify insurance module backend is running
Response: { status: "ok", timestamp: ISODate, module: "insurance" }
```

---

### 2.2 Policy Routes — `/api/insurance/policies`

```
POST   /
  Body: { patientId, insuranceType, providerName, policyNumber, planType,
          sumInsured, subLimits, coPayPercentage, deductible, tpaId,
          insurerCompanyId, policyStartDate, policyEndDate,
          isNetworkHospital, waitingPeriodNotes }
  Validation: patientId required, policyNumber required,
              sumInsured must be > 0, dates must be valid
  Returns: 201 + created policy

GET    /:patientId
  Returns: All active policies for patient (populated: tpaId, insurerCompanyId)

GET    /detail/:policyId
  Returns: Single policy (fully populated)

PUT    /:policyId
  Body: Same as POST
  Returns: 200 + updated policy

PATCH  /:policyId/verify
  Body: { verificationStatus, verifiedBy }
  Values: "Not Verified" | "Verified — Active" | "Verified — Expired" | "Verification Failed"
  Returns: 200 + updated status

DELETE /:policyId
  Action: Soft-delete (isActive = false)
  Returns: 200 + { message: "Policy deactivated" }
```

---

### 2.3 Scheme Routes — `/api/insurance/schemes`

```
POST   /
  Body: { patientId, schemeName, schemeSpecificData, primaryScheme }
  Validation: patientId required, schemeName must be valid enum
  Returns: 201 + created scheme

GET    /:patientId
  Returns: All active scheme enrollments for patient

PUT    /:schemeId
  Body: Same as POST
  Returns: 200 + updated scheme

PATCH  /:schemeId/verify
  Body: { verificationStatus, verifiedBy }
  Returns: 200 + updated status
```

---

### 2.4 Pre-Auth Routes — `/api/insurance/pre-auth`

```
POST   /
  Body: { patientId, policyId OR schemeId, admittingDoctor,
          expectedAdmissionDate, expectedDischargeDate, diagnosis,
          icd10Code, proposedTreatment, estimatedCost,
          providerTemplateUsed, providerSpecificData }
  Action: Saves with status "Draft", initialises statusHistory
  Returns: 201 + created pre-auth

GET    /
  Returns: All pre-auth requests
  Populated: patientId (name, uhid), policyId (policyNumber, providerName)
  Sorted: createdAt descending

GET    /:id
  Returns: Single pre-auth (fully populated including documents)

PATCH  /:id/status
  Body: { status, approvedAmount, authorizationNumber,
          validityDate, remarks, changedBy }
  Action: Updates status + pushes to statusHistory array
  Returns: 200 + updated pre-auth
```

---

### 2.5 Claim Routes — `/api/insurance/claims`

```
POST   /
  Body: { patientId, policyId, schemeId, preAuthId, claimType,
          admissionDate, dischargeDate, diagnosis, icd10Code,
          proceduresPerformed, treatingDoctor, totalBillAmount,
          claimedAmount, providerTemplateUsed, providerSpecificData }
  Action: Auto-generates claimNumber as "CLM-YYYYMMDD-NNNN" (4-digit counter)
          Initialises status as "Draft", statusHistory, documentChecklist
  Returns: 201 + { claim, claimNumber }

GET    /
  Query: ?status=Draft&page=1&limit=10
  Returns: Paginated claims list
  Populated: patientId (name, uhid)

GET    /dashboard-stats
  Returns: {
    totalClaims: Number,
    approvedClaims: Number,
    pendingClaims: Number,
    rejectedClaims: Number,
    totalSettledAmount: Number
  }
  NOTE: This route must be defined BEFORE /:id to avoid route conflict

GET    /:id
  Returns: Single claim (fully populated: patient, policy, scheme, documents)

PATCH  /:id/status
  Body: { status, approvedAmount, settledAmount, settlementDetails,
          rejectionReason, remarks, changedBy }
  Action: Updates status + pushes to statusHistory
  Returns: 200 + updated claim
```

---

### 2.6 Document Routes — `/api/insurance/documents`

```
POST   /upload
  Content-Type: multipart/form-data
  Body: { file (PDF/JPG/PNG max 5MB), claimId OR preAuthId, category, uploadedBy }
  Action: Multer saves file, creates ClaimDocument,
          updates documentChecklist on claim if claimId present
  Returns: 201 + created document

GET    /claim/:claimId
  Returns: All non-deleted documents for a claim

GET    /pre-auth/:preAuthId
  Returns: All non-deleted documents for a pre-auth

DELETE /:docId
  Action: Soft-delete (isDeleted = true, deletedBy, deletedAt)
  Returns: 200 + { message: "Document deleted" }
```

---

### 2.7 Billing Integration Routes — `/api/insurance/billing`

```
GET    /summary/:patientId
  Returns: Latest InsuranceBillingMapping for patient
  Structure: {
    totalBillAmount, approvedAmount, coPayAmount,
    deductibleAmount, nonCoveredItems,
    insuranceDeduction, patientPayable,
    isManualOverride, claimNumber
  }

POST   /mapping
  Body: { patientId, billId, claimId, policyId, totalBillAmount,
          approvedAmount, coPayAmount, deductibleAmount,
          nonCoveredItems, insuranceDeduction, patientPayable }
  Returns: 201 + created mapping
```

---

### 2.8 Master Data Routes — `/api/insurance/master-data`

```
GET    /tpas
  Returns: All active TPAs (populated: linkedInsurers)

POST   /tpas
  Body: { name, irdaiLicenseNumber, portalUrl, helpdeskPhone,
          helpdeskEmail, preAuthTAT, claimTAT, linkedInsurers }
  Returns: 201 + created TPA

GET    /companies
  Returns: All active insurance companies

POST   /companies
  Body: { name, type, irdaiRegistrationNumber, claimPortalUrl,
          contactPhone, contactEmail, networkHospitalStatus, defaultTpaId }
  Returns: 201 + created company

GET    /forms
  Returns: All non-deprecated official forms

POST   /forms
  Body: { insurerOrTpaName, formName, formType, downloadUrl,
          formVersion, notes }
  Returns: 201 + created form entry
```

---

### 2.9 Notification Routes — `/api/insurance/notifications`

```
GET    /
  Returns: List of notifications for insurance desk
  Note: Currently returns mock data — real triggers to be built later
  Structure: [{ id, message, type, isRead, createdAt }]

PUT    /:id/read
  Action: Marks notification as read
  Returns: 200 + { message: "Marked as read" }
```

---

## 🎨 SECTION 3 — FRONTEND SPECIFICATION

### CRITICAL — READ BEFORE BUILDING FRONTEND

> You are adding your Insurance pages to an **existing React app**.
> The sidebar, topbar, routing, and Layout are already set up.
> You are only adding new pages + new sidebar links.
> **Never modify Layout.jsx or App.jsx routing for other modules.**

---

### 3.1 Main Insurance Page — `Insurance.jsx`

**Route:** `/insurance`
**Layout:** Wraps inside existing `<Layout>` component
**Pattern:** Single-page with internal view state managed by `step` variable

```
step = 'dashboard'        → Dashboard view
step = 'register-policy'  → Register Policy form
step = 'enroll-scheme'    → Enroll Government Scheme form
step = 'pre-auth'         → Pre-Auth requests list + create form
step = 'claims'           → All claims list + file claim form
step = 'documents'        → Document upload interface
step = 'official-forms'   → ProviderFormRenderer
```

**Sidebar Navigation Items (add to existing sidebar):**
1. Dashboard
2. Register Policy
3. Enroll Scheme
4. Pre-Auth Requests
5. All Claims
6. Documents
7. Official Provider Forms

---

### 3.2 View 1 — Dashboard

**What it shows:**
- 4 stat cards: Total Claims / Approved Claims / Pending Claims / Total Settled Amount
- Claims list table with columns: Claim No. | Patient | Type | Status | Amount | Date | Actions
- Status filter dropdown
- Pagination

**API calls:**
- `GET /api/insurance/claims/dashboard-stats` → stat cards
- `GET /api/insurance/claims?page=1&limit=10` → claims table

---

### 3.3 View 2 — Register Policy

**What it shows:** Form with fields:
- Patient ID / UHID lookup (search existing patients)
- Insurance Type (Private / Government dropdown)
- Provider Name (text)
- Policy Number (text)
- Plan Type (Individual / Family Floater / Group)
- Sum Insured (number in INR)
- Room Rent Cap, ICU Cap, Procedure Cap (optional numbers)
- Co-Pay % (number, default 0)
- Deductible (number, default 0)
- TPA (dropdown from master data)
- Insurer Company (dropdown from master data)
- Policy Start Date / End Date (date pickers)
- Is Network Hospital (checkbox)
- Waiting Period Notes (textarea)

**API calls:**
- `GET /api/insurance/master-data/tpas` → populate TPA dropdown on mount
- `GET /api/insurance/master-data/companies` → populate insurer dropdown
- `POST /api/insurance/policies` → on submit

---

### 3.4 View 3 — Enroll Government Scheme

**What it shows:** Form that changes fields based on scheme selection:

```
Scheme = PM-JAY → Show: ABHA Number, Ayushman Card Number,
                        Family ID, Ration Card Number, Ration Card Category,
                        Arogya Mitra Verified checkbox

Scheme = CGHS   → Show: CGHS Beneficiary ID, CGHS Card Type (dropdown),
                        Referral Reference Number

Scheme = ESIC   → Show: ESIC IP Number, Employer Name, Dispensary Name

Scheme = MJPJAY → Show: Ration Card Number, Ration Card Category,
                        Family ID, HBP Code
```

**API calls:**
- `POST /api/insurance/schemes` → on submit

---

### 3.5 View 4 — Pre-Auth Requests

**What it shows:**
- Pre-auth form (collapsible or modal)
- Pre-auth list table: Patient | Doctor | Diagnosis | Estimated Cost | Status | Auth No. | Actions
- Status update button per row (Update Status modal)
- "View Form" modal that shows providerSpecificData if template was used

**Form fields:**
- Patient lookup (UHID search)
- Link to Policy or Scheme (dropdown loads based on patient)
- Admitting Doctor (text)
- Expected Admission Date / Discharge Date
- Diagnosis (text)
- ICD-10 Code (text)
- Proposed Treatment (textarea)
- Estimated Cost (number)
- Provider Template: None / IRDAI Standard / PM-JAY / CGHS (dropdown)
- If template selected → show `ProviderFormRenderer` component inline

**API calls:**
- `POST /api/insurance/pre-auth` → create
- `GET /api/insurance/pre-auth` → list
- `PATCH /api/insurance/pre-auth/:id/status` → update status

---

### 3.6 View 5 — All Claims

**What it shows:**
- File Claim form (collapsible or modal)
- Claims table: Claim No. | Patient | Type | Diagnosis | Bill Amount | Status | Actions
- Approve button (sets approvedAmount)
- Settlement button (sets settlementDetails)
- CSV export button

**Form fields:**
- Patient lookup
- Claim Type: Cashless / Reimbursement
- Link to Pre-Auth (optional dropdown)
- Admission Date / Discharge Date
- Diagnosis + ICD-10 Code
- Procedures Performed
- Treating Doctor
- Total Bill Amount
- Claimed Amount
- Provider Template (same as pre-auth)

**API calls:**
- `POST /api/insurance/claims` → create
- `GET /api/insurance/claims` → list
- `PATCH /api/insurance/claims/:id/status` → approve/update

---

### 3.7 View 6 — Documents

**What it shows:**
- Upload form: Claim ID or Pre-Auth ID input, Category dropdown, File picker
- Document list per claim/pre-auth (load after entering ID)
- Delete button per document

**API calls:**
- `POST /api/insurance/documents/upload` → multipart upload
- `GET /api/insurance/documents/claim/:claimId` → fetch docs
- `DELETE /api/insurance/documents/:docId` → soft delete

---

### 3.8 View 7 — Official Provider Forms (`ProviderFormRenderer.jsx`)

**Purpose:** Dynamic form renderer that loads insurer-specific form templates.

**Template selector:** Dropdown — IRDAI Standard / PM-JAY / CGHS

**Behavior:**
- On template selection → render all fields defined in that template config
- Auto-fill fields where patient data is available from state
- Manual fields shown with distinct styling
- Print to PDF button (`window.print()`)
- Submit button → POST to pre-auth or claim endpoint with providerSpecificData

**Auto-populated vs manual field visual rule:**
- Auto-filled fields: light background, read-only, small "Auto" badge
- Manual fields: standard white input, editable

---

### 3.9 Form Templates — `insuranceFormTemplates.js`

Define 3 templates as JS config objects exported from this file:

---

**Template 1: IRDAI_STANDARD**

```
Section 1 — Patient Details:
  - patientFullName (text, auto-fill)
  - dateOfBirth (date, auto-fill)
  - gender (select: Male/Female/Other, auto-fill)
  - contactNumber (text, auto-fill)
  - policyNumber (text, auto-fill from policy)
  - sumInsured (number, auto-fill from policy)
  - policyStartDate (date, auto-fill)
  - policyEndDate (date, auto-fill)

Section 2 — Policy Details:
  - insurerName (text, auto-fill)
  - tpaName (text, auto-fill)
  - planType (text, auto-fill)
  - coPayPercentage (number, auto-fill)
  - roomRentCap (number, auto-fill)

Section 3 — Medical Information:
  - admittingDoctor (text, manual)
  - hospitalName (text, auto-fill from HMS config)
  - hospitalRohiniCode (text, manual)
  - diagnosisDescription (textarea, manual)
  - icd10Code (text, manual)
  - proposedTreatment (textarea, manual)
  - dateOfAdmission (date, manual)
  - estimatedDaysOfStay (number, manual)
  - estimatedDateOfDischarge (date, manual)
  - isEmergency (checkbox, manual)
  - preExistingCondition (textarea, manual)

Section 4 — Financial Estimates:
  - estimatedRoomCharges (number, manual)
  - estimatedSurgeryCharges (number, manual)
  - estimatedIcuCharges (number, manual)
  - estimatedMedicineCharges (number, manual)
  - estimatedInvestigationCharges (number, manual)
  - estimatedTotalCost (number, manual)
```

---

**Template 2: PM_JAY**

```
Section 1 — Beneficiary Verification:
  - abhaNumber (text, auto-fill)
  - ayushmanCardNumber (text, auto-fill)
  - familyId (text, auto-fill)
  - aadhaarNumber (text, manual — masked display)
  - beneficiaryName (text, auto-fill)
  - dateOfBirth (date, auto-fill)
  - gender (select, auto-fill)
  - rationCardNumber (text, auto-fill)
  - rationCardCategory (select, auto-fill)
  - arogyamitraVerified (checkbox, auto-fill)

Section 2 — Admission & Clinical:
  - hospitalName (text, auto-fill)
  - hospitalHFRCode (text, manual)
  - admittingDoctorName (text, manual)
  - admittingDoctorRegNumber (text, manual)
  - admissionType (select: Emergency/Planned, manual)
  - diagnosisName (text, manual)
  - icd10Code (text, manual)
  - expectedDateOfAdmission (date, manual)
  - estimatedLengthOfStay (number, manual)

Section 3 — Package Selection:
  - hbpCode (text, manual — Health Benefit Package code)
  - hbpName (text, manual)
  - hbpAmount (number, manual — auto lookup from package code ideally)
  - procedureCode (text, manual)
  - procedureName (text, manual)
  - clinicalEvidence (textarea, manual — clinical notes justifying package)
  - investigationRequired (textarea, manual)
```

---

**Template 3: CGHS**

```
Section 1 — Beneficiary Information:
  - beneficiaryName (text, auto-fill)
  - cghsBeneficiaryId (text, auto-fill)
  - cghsCardType (select: Serving/Pensioner/Dependent, auto-fill)
  - designation (text, manual)
  - department (text, manual)
  - dateOfBirth (date, auto-fill)
  - gender (select, auto-fill)
  - referralReference (text, auto-fill)
  - referredByWellnessCenter (text, manual)

Section 2 — Medical & Billing:
  - diagnosisDescription (textarea, manual)
  - icd10Code (text, manual)
  - treatmentType (select: Medical Management/Surgery/Day Care, manual)
  - admittingDoctorName (text, manual)
  - hospitalName (text, auto-fill)
  - wardEntitlement (select: General/Semi-Private/Private, manual)
  - estimatedCost (number, manual)
  - cghsApprovedRateApplicable (checkbox, manual)
  - excessChargesReason (textarea, manual — if cost > CGHS rates)
```

---

### 3.10 InsuranceSplitCard Component

**Used by:** Billing Module (imported from Insurance module folder)

```
Props:
  patientId: String (required)

Fetches:
  GET /api/insurance/billing/summary/:patientId

Displays:
  ┌─────────────────────────────────────┐
  │ Insurance Coverage Breakdown        │
  ├─────────────────────────────────────┤
  │ Gross Hospital Bill:   ₹ [amount]   │
  │ Insurance Deduction:  -₹ [amount]   │
  │ Patient Co-Pay:        ₹ [amount]   │
  │ Deductible Applied:    ₹ [amount]   │
  ├─────────────────────────────────────┤
  │ NET PATIENT PAYABLE:   ₹ [amount]   │
  └─────────────────────────────────────┘
  
States:
  Loading: Show spinner
  No insurance on file: Show "No insurance coverage found"
  Error: Show error message with retry button
```

---

### 3.11 NotificationBell Component

```
Behaviour:
  - Renders in the top-right area of the existing Topbar
  - Polls GET /api/insurance/notifications every 30 seconds
  - Shows badge with unread count (red badge, number)
  - Clicking opens dropdown list of notifications
  - Clicking a notification calls PUT /api/insurance/notifications/:id/read
  - Each notification shows: message text + timestamp

States:
  0 unread: Bell icon, no badge
  1+ unread: Bell icon + red badge with count
  Dropdown open: List of last 10 notifications
```

---

## 📊 SECTION 4 — WORKFLOWS (Business Logic Rules)

### 4.1 Claim Number Auto-Generation

```
Format: CLM-YYYYMMDD-NNNN
Example: CLM-20260514-0001

Logic:
  1. Get today's date as YYYYMMDD string
  2. Count existing claims created today
  3. Increment counter + 1
  4. Pad counter to 4 digits with leading zeros
  5. Combine into final claim number
  
Edge case: Ensure uniqueness via unique: true on claimNumber field
```

### 4.2 Status Lifecycle Rules

**Pre-Auth Status Transitions (in order):**
```
Draft → Submitted → Under Review → Query Raised → Approved
Draft → Submitted → Under Review → Rejected
Approved → Enhancement Requested → Under Review → Approved
Any state → Expired (if validityDate passes)
```

**Claim Status Transitions (11 stages in order):**
```
Draft → Documents Pending → Ready for Submission → Submitted
→ Under Process → Query → Approved → Partially Settled → Settled
                         ↘ Rejected → Appeal Filed
```

### 4.3 Document Checklist Auto-Update

When a document is uploaded with a `claimId`, automatically update the
`documentChecklist` field on the claim:

```
category === "Admission Form"        → documentChecklist.admissionForm = true
category === "Discharge Summary"     → documentChecklist.dischargeSummary = true
category === "Investigation Reports" → documentChecklist.investigationReports = true
category === "Prescription"          → documentChecklist.prescription = true
category === "Doctor Notes"          → documentChecklist.doctorNotes = true
category === "Bill/Invoice"          → documentChecklist.billInvoice = true
category === "Consent Form"          → documentChecklist.consentForm = true
category === "Insurance Card Copy"   → documentChecklist.insuranceCardCopy = true
category === "ID Proof"              → documentChecklist.idProof = true
```

### 4.4 Pre-Auth to Claim Conversion

When a claim is created with a `preAuthId`:
- Auto-populate `diagnosis`, `icd10Code`, `treatingDoctor`, `admissionDate`
  from the linked pre-auth record
- Set `claimedAmount` default to `preAuth.approvedAmount`

### 4.5 Billing Integration Trigger

When a claim status is updated to `Approved`:
- If no billing mapping exists for this patient+claim → auto-create one
- Calculate: `patientPayable = totalBillAmount - approvedAmount + coPayAmount + deductibleAmount`

---

## 🌱 SECTION 5 — SEED DATA

Create `Backend/seeds/insuranceSeed.js` that seeds the following master data:

**TPAs to seed (10 records):**
1. Medi Assist India — preAuthTAT: "2-4 hours", claimTAT: "7-15 working days"
2. Paramount Health Services — preAuthTAT: "4-6 hours", claimTAT: "10-21 working days"
3. Health India TPA — preAuthTAT: "4-8 hours", claimTAT: "10-21 working days"
4. FHPL (Family Health Plan Ltd) — preAuthTAT: "2-4 hours", claimTAT: "7-14 working days"
5. Vidal Health — preAuthTAT: "2-4 hours", claimTAT: "7-15 working days"
6. MDIndia Health Insurance TPA — preAuthTAT: "4-6 hours", claimTAT: "10-21 working days"
7. Raksha TPA — preAuthTAT: "4-8 hours", claimTAT: "15-21 working days"
8. East West Assist — preAuthTAT: "6-12 hours", claimTAT: "15-30 working days"
9. Heritage Health TPA — preAuthTAT: "4-8 hours", claimTAT: "10-21 working days"
10. DHCS (Dedicated Healthcare Services) — preAuthTAT: "4-6 hours", claimTAT: "10-21 working days"

**Insurance Companies to seed (10 private + 3 PSU records):**

Private:
1. Star Health and Allied Insurance — type: Private
2. HDFC ERGO Health Insurance — type: Private
3. Bajaj Allianz General Insurance — type: Private
4. ICICI Lombard General Insurance — type: Private
5. Niva Bupa Health Insurance — type: Private
6. Care Health Insurance — type: Private
7. Tata AIG General Insurance — type: Private
8. Reliance General Insurance — type: Private
9. Aditya Birla Health Insurance — type: Private
10. Manipal Cigna Health Insurance — type: Private

PSU:
11. New India Assurance Company — type: PSU
12. United India Insurance Company — type: PSU
13. Oriental Insurance Company — type: PSU

**Seed script must:**
- Check if data already exists before inserting (idempotent)
- Log count of records seeded
- Be runnable with `node seeds/insuranceSeed.js`

---

## 🔗 SECTION 6 — CROSS-MODULE INTEGRATION CONTRACTS

### 6.1 Reception → Insurance (Auto Pre-Auth Creation)

When a receptionist marks a patient as having insurance during registration,
the Reception module calls:

```
POST /api/insurance/pre-auth
Body: {
  patientId: "<patient_id>",
  admittingDoctor: "",
  diagnosis: "Pending assessment",
  proposedTreatment: "Pending",
  estimatedCost: 0,
  status: "Draft"
}
```

The Insurance Module saves this draft for the Insurance Desk to complete.

### 6.2 Insurance → Billing (Split Data API)

The Billing Module consumes:
```
GET /api/insurance/billing/summary/:patientId
```

The response is used by `InsuranceSplitCard.jsx` which the Billing developer
imports and renders in their billing page.

Export `InsuranceSplitCard` properly so it can be imported:
```javascript
// In InsuranceSplitCard.jsx
export default InsuranceSplitCard;

// In Billing Module (other developer's code)
import InsuranceSplitCard from '../Insurance/InsuranceSplitCard';
```

### 6.3 Admin → Insurance (Master Data Management)

The Admin module renders TPA and Insurance Company management by calling:
```
GET /api/insurance/master-data/tpas
GET /api/insurance/master-data/companies
POST /api/insurance/master-data/tpas
POST /api/insurance/master-data/companies
```

---

## 📦 SECTION 7 — GITHUB WORKFLOW (Daily Push Protocol)

### Branch Strategy

```
main (protected — never push directly)
  └── feature/insurance-module  ← Siddhant's branch (ALWAYS work here)
```

### First-Time Setup

```bash
# Clone the team repo
git clone <team-repo-url>
cd HMS-Project

# Create your branch from main
git checkout -b feature/insurance-module

# Set upstream
git push -u origin feature/insurance-module
```

### Daily Work Cycle

```bash
# START OF DAY — Sync with team changes
git checkout feature/insurance-module
git fetch origin
git merge origin/main
# Fix any merge conflicts if they exist
# Then continue working

# DURING THE DAY — Save work frequently
git add .
git commit -m "feat(insurance): [what you built today]"

# END OF DAY — Push to remote
git push origin feature/insurance-module
```

### Commit Message Format

Use this format so team lead can track all changes:

```
feat(insurance): add policy registration API endpoint
fix(insurance): resolve claim number duplication bug
docs(insurance): update PRD with billing integration contract
refactor(insurance): separate pre-auth validation into middleware
test(insurance): add postman tests for claim routes
style(insurance): match claim table UI to existing team design
```

### What NOT to push

Create a `.gitignore` entry for:
```
node_modules/
.env
uploads/      ← Multer uploaded files
*.log
```

### Pull Request (End of Sprint)

When your feature is complete and tested:
1. Push final commits to `feature/insurance-module`
2. Open a Pull Request on GitHub: `feature/insurance-module → main`
3. Title: "Insurance Module — Complete Implementation"
4. Description: List all endpoints built + features completed
5. Tag team lead as reviewer
6. Do NOT merge yourself — wait for review

### Handling Merge Conflicts

If another module changes a shared file (like `index.js` or `App.jsx`):
```bash
# When merge conflict appears:
git status          # See which files conflict
# Open conflicting file, look for <<<< ==== >>>> markers
# Keep BOTH changes — your insurance routes + their module routes
git add <resolved-file>
git commit -m "fix(insurance): resolve merge conflict with billing module"
```

---

## ✅ SECTION 8 — VALIDATION RULES

### Policy Validation

```
patientId:        required, valid MongoDB ObjectId
policyNumber:     required, min 5 chars, max 50 chars
sumInsured:       required, must be > 0
coPayPercentage:  0–100 range
policyEndDate:    must be after policyStartDate
insuranceType:    must be "Private" or "Government"
planType:         must be one of enum values
```

### Pre-Auth Validation

```
patientId:        required
estimatedCost:    required, > 0
diagnosis:        required, min 3 chars
proposedTreatment: required, min 3 chars
icd10Code:        optional, if provided — format check (letter + digits)
Either policyId OR schemeId must be present (not both null)
```

### Claim Validation

```
patientId:        required
claimType:        must be "Cashless" or "Reimbursement"
admissionDate:    required, cannot be future date
totalBillAmount:  required, > 0
claimedAmount:    required, > 0, ≤ totalBillAmount
```

### Document Upload Validation (Multer)

```
Accepted MIME types: application/pdf, image/jpeg, image/png
Max file size: 5MB (5 * 1024 * 1024 bytes)
category: must be one of the 11 enum values
Either claimId OR preAuthId must be present
```

---

## ⚠️ SECTION 9 — KNOWN GAPS (Pending Items — Do NOT Block on These)

The following items are planned but NOT required in the first implementation.
Build the module without them, and leave comments `// TODO:` where they will go.

1. **JWT Auth + RBAC Middleware** — All endpoints are currently open.
   Leave a comment: `// TODO: Add JWT auth middleware here`

2. **Real Notification Triggers** — Return mock notifications for now.
   Leave a comment: `// TODO: Trigger real notifications on claim status change`

3. **Analytics & Reports** — Dashboard stats endpoint covers basic counts.
   Full reports module (PDF export, date-range filters) is Phase 2.

4. **External TPA Portal Integration** — All TPA communication is manual entry.
   Staff manually update statuses after checking TPA portals.
   Leave a comment: `// TODO: Replace with TPA API integration in future`

5. **Patient-Facing Insurance Portal** — Not in scope.

6. **ECHS Scheme Support** — Not in current schema.
   ESIC, CGHS, PM-JAY, MJPJAY are in scope for now.

---

## 📋 SECTION 10 — DELIVERABLES CHECKLIST

When the build is complete, verify all of the following exist:

### Backend

- [ ] `Backend/models/insurance/` — 9 Mongoose model files
- [ ] `Backend/routes/insurance/` — 9 route files + index.js
- [ ] `Backend/middleware/upload.js` — Multer configuration
- [ ] `Backend/seeds/insuranceSeed.js` — TPA + Insurer seed data
- [ ] All 33 API endpoints operational and tested in Postman
- [ ] `Backend/insurance-api.postman_collection.json` — exported Postman collection
- [ ] Insurance routes registered in `Backend/index.js` as `/api/insurance`

### Frontend

- [ ] `frontend/src/pages/Insurance/Insurance.jsx` — main page (694+ lines)
- [ ] `frontend/src/pages/Insurance/ProviderFormRenderer.jsx`
- [ ] `frontend/src/pages/Insurance/InsuranceSplitCard.jsx`
- [ ] `frontend/src/pages/Insurance/NotificationBell.jsx`
- [ ] `frontend/src/pages/Insurance/insuranceFormTemplates.js`
- [ ] Insurance link added to existing sidebar
- [ ] Insurance route added to existing router (`/insurance`)
- [ ] All 7 views functional
- [ ] Frontend matches existing team UI design

### GitHub

- [ ] All work pushed to `feature/insurance-module` branch
- [ ] `.env` not committed (in .gitignore)
- [ ] `node_modules/` not committed
- [ ] Meaningful commit messages for each day's work
- [ ] Pull Request opened when module is complete

---

## 🗒️ SECTION 11 — IMPLEMENTATION ORDER (Recommended Sequence)

Follow this order to avoid blockers:

```
Week 1:
  Day 1–2: Set up folder structure, install dependencies, create all 9 Mongoose models
  Day 3–4: Build master data routes (TPAs, Companies, Forms) + run seed script
  Day 5:   Test master data endpoints in Postman

Week 2:
  Day 1–2: Build Policy routes + Scheme routes (6 + 4 endpoints)
  Day 3:   Build Pre-Auth routes (4 endpoints)
  Day 4–5: Build Claims routes (5 endpoints) + claim number auto-generation

Week 3:
  Day 1–2: Build Document routes + Multer middleware
  Day 3:   Build Billing Integration routes
  Day 4–5: Build Notification routes + test all 33 endpoints end-to-end

Week 4:
  Day 1–2: Build Insurance.jsx with Dashboard view + sidebar navigation
  Day 3–4: Build Register Policy view + Enroll Scheme view (dynamic fields)
  Day 5:   Build Pre-Auth Requests view

Week 5:
  Day 1–2: Build All Claims view + claim filing form
  Day 3:   Build Documents view
  Day 4–5: Build ProviderFormRenderer + insuranceFormTemplates.js

Week 6:
  Day 1:   Build InsuranceSplitCard + NotificationBell
  Day 2–3: Test all frontend-backend integration
  Day 4:   Fix UI to match team design exactly
  Day 5:   Final testing, Postman collection export, PR creation
```

---

## 🔍 SECTION 12 — FINAL BUILD INSTRUCTIONS FOR GEMINI

When you begin building this module, follow these rules:

1. **Read all sections before writing any code.** The constraints in Section 3
   (frontend design rules) affect every frontend file you create.

2. **Build backend first, frontend second.** Verify each API endpoint with
   Postman before wiring it to the frontend.

3. **Do not invent API routes or field names** not defined in this PRD.
   If a field is not listed, leave it out.

4. **Respect existing code.** Never delete or modify models, routes, or
   components that belong to other modules (Reception, Doctor, Billing, etc.).

5. **Comment your code clearly.** Other team members need to understand your
   insurance module. Add JSDoc comments to all route handlers and Mongoose models.

6. **Mark every TODO clearly.** Unimplemented features from Section 9 must
   have `// TODO:` comments so the team knows what is pending.

7. **The module must run after `npm install` + `node seeds/insuranceSeed.js`.**
   No manual database setup should be required beyond setting the `.env` MongoDB URI.

8. **Test the billing integration last.** `InsuranceSplitCard` depends on claim
   data existing, so test it after at least one claim + billing mapping is seeded.

---

*End of PRD Document*
*HMS Insurance Module — Siddhant Sangram Shinde*
*Version 1.0 — May 2026*