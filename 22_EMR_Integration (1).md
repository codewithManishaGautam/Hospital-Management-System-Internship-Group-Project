# 22 — EMR Integration

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Integration Specification  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Overview](#1-overview)
2. [Integration Objectives](#2-integration-objectives)
3. [EMR Data Required by Insurance Module](#3-emr-data-required-by-insurance-module)
4. [Integration Architecture](#4-integration-architecture)
5. [Clinical Coding Standards](#5-clinical-coding-standards)
6. [Pre-Authorization Integration](#6-pre-authorization-integration)
7. [Claim Generation from EMR](#7-claim-generation-from-emr)
8. [Discharge Summary Integration](#8-discharge-summary-integration)
9. [Prescription & Pharmacy Integration](#9-prescription--pharmacy-integration)
10. [Lab & Radiology Integration](#10-lab--radiology-integration)
11. [OT & Procedure Integration](#11-ot--procedure-integration)
12. [FHIR / HL7 Standards](#12-fhir--hl7-standards)
13. [Data Mapping Tables](#13-data-mapping-tables)
14. [Error Handling & Fallback](#14-error-handling--fallback)
15. [Tasks for Gemini](#15-tasks-for-gemini)

---

## 1. Overview

The EMR (Electronic Medical Records) Integration connects clinical data captured during patient care to the Insurance Module. This integration is the backbone of automated claim generation, pre-authorization support, and medical necessity validation.

Without EMR integration, insurance desk staff must manually transcribe clinical information, leading to:
- Transcription errors
- Delayed claim submissions
- Incomplete documentation
- Rejection due to missing clinical data

With EMR integration:
- Claims are auto-populated from clinical records
- Pre-auth requests reference actual diagnoses and procedures
- Discharge summaries are automatically attached
- Coding (ICD-10, CPT, SNOMED) is consistent with treatment rendered

### 1.1 Scope

| Included | Excluded |
|---|---|
| Patient demographics from Registration | External EHR systems (Epic, Cerner) — Phase 2 |
| Inpatient admission data | FHIR external exchange — Phase 2 |
| Diagnosis (ICD-10) from treating doctor | AI-assisted coding — Phase 3 |
| Procedures (CPT/ICD-10-PCS) | Telehealth integrations |
| Discharge summary | Third-party pharmacy POS systems |
| Lab results (summary) | Wearable/IoT device data |
| Radiology reports (summary) | |
| OT notes | |
| Prescription summary | |

---

## 2. Integration Objectives

| Objective | Business Value |
|---|---|
| Auto-populate claim forms from EMR | Reduces manual entry by 80% |
| Pull diagnosis codes automatically | Eliminates ICD-10 manual lookup errors |
| Link procedures to claim line items | Ensures accurate billing |
| Attach discharge summary to claims | Reduces documentation requests |
| Validate medical necessity | Reduces pre-auth rejections |
| Trigger insurance alerts at key clinical events | Faster authorization turnaround |
| Maintain audit trail between clinical and financial records | Regulatory compliance |

---

## 3. EMR Data Required by Insurance Module

### 3.1 Patient Registration Data

| Field | Source Module | Used In |
|---|---|---|
| Patient ID (MRN) | Registration | All insurance records |
| Full Name | Registration | Claim forms |
| Date of Birth | Registration | Age validation, policy matching |
| Gender | Registration | Policy validation |
| Aadhaar / PAN | Registration | KYC, PMJAY validation |
| Contact Number | Registration | Notifications |
| Address | Registration | TPA correspondence |
| Blood Group | EMR | Emergency claims |
| Known Allergies | EMR | Pharmacy claims |
| Pre-existing conditions | EMR | Policy exclusion check |

### 3.2 Admission Data

| Field | Source | Used In |
|---|---|---|
| IP Number | IPD Registration | Claim reference |
| Admission Date & Time | IPD Registration | Claim period |
| Admitting Doctor | IPD Registration | Pre-auth |
| Ward / Bed | IPD Registration | Room category billing |
| Admission Type | IPD Registration | Emergency vs Planned |
| Primary Diagnosis at Admission | EMR (Doctor) | Pre-auth, claim |
| Provisional Diagnosis | EMR (Doctor) | Pre-auth |
| Chief Complaints | EMR (Doctor) | Medical necessity |
| Referral Details | EMR | Network validation |

### 3.3 Clinical Events

| Event | Data Captured | Insurance Trigger |
|---|---|---|
| Diagnosis confirmed | ICD-10 code, description | Pre-auth update |
| Surgery scheduled | Procedure code, OT date | Pre-auth escalation |
| Surgery completed | Procedure code, OT notes, surgeon | Final claim line item |
| ICU admission | Duration, reason | ICU billing alert |
| Ventilator use | Hours, type | ICU claim addendum |
| Blood transfusion | Units, type | Claim line item |
| Implant used | Implant type, brand, cost | Special approval trigger |
| High-cost drug prescribed | Drug name, cost | Special approval trigger |
| Discharge order placed | Discharge date | Final claim trigger |

### 3.4 Discharge Data

| Field | Source | Used In |
|---|---|---|
| Discharge Date | IPD | Claim period end |
| Final Diagnosis (Primary) | EMR | Claim |
| Final Diagnosis (Secondary) | EMR | Comorbidity claim |
| Procedures Performed | EMR/OT | Claim line items |
| Discharge Type | IPD | Claim status |
| Treating Doctor | EMR | Claim |
| Consultant Doctors | EMR | Claim |
| Discharge Instructions | EMR | Documentation |
| Follow-up Date | EMR | Post-discharge claims |

---

## 4. Integration Architecture

### 4.1 Integration Approach

```
┌─────────────────────────────────────────────┐
│              HMS Core System                │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Register │  │  EMR     │  │  OPD/IPD │  │
│  │ Module   │  │  Module  │  │  Module  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │        │
│       └─────────────┴──────────────┘        │
│                     │                       │
│           ┌─────────▼──────────┐            │
│           │   Event Bus /      │            │
│           │   Internal API     │            │
│           └─────────┬──────────┘            │
│                     │                       │
│           ┌─────────▼──────────┐            │
│           │  Insurance Module  │            │
│           │  Integration Layer │            │
│           └────────────────────┘            │
└─────────────────────────────────────────────┘
```

### 4.2 Integration Methods

| Method | When Used | Description |
|---|---|---|
| **Direct Database Views** | Same-system integration | Read-only views of EMR tables |
| **Internal REST APIs** | Recommended | Module-to-module API calls |
| **Event-Driven (Webhooks)** | Real-time triggers | Events trigger insurance workflows |
| **HL7 FHIR** | External EHR systems | Phase 2 scope |

### 4.3 Internal API Call Pattern

Insurance Module calls EMR Module APIs to fetch:
- Patient summary
- Admission details
- Diagnosis list (ICD-10)
- Procedure list
- Discharge summary
- Lab/radiology summary

All calls are **read-only** from insurance perspective. Insurance module **never writes** to EMR.

---

## 5. Clinical Coding Standards

### 5.1 ICD-10 (International Classification of Diseases, 10th Revision)

Used for: Diagnosis coding on all claims

| Code Range | Category |
|---|---|
| A00–B99 | Infectious diseases |
| C00–D49 | Neoplasms |
| E00–E89 | Endocrine/metabolic |
| G00–G99 | Nervous system |
| I00–I99 | Circulatory system |
| J00–J99 | Respiratory system |
| K00–K95 | Digestive system |
| M00–M99 | Musculoskeletal |
| S00–T88 | Injuries / poisoning |
| Z00–Z99 | Factors influencing health |

**Rules:**
- Primary diagnosis: Required (1 code minimum)
- Secondary diagnoses: Up to 10 codes
- ICD-10-CM codes used (India adapts WHO ICD-10)
- Version must be stored with code (ICD-10 vs ICD-11)

### 5.2 CPT / ICD-10-PCS (Procedure Codes)

Used for: Procedure coding on claims

| Type | Standard | Usage |
|---|---|---|
| Surgical procedures | CPT-4 | Inpatient/Outpatient |
| Medical procedures | CPT-4 | OPD claims |
| Inpatient procedures | ICD-10-PCS | IPD claims |
| Lab tests | CPT (80000–89999) | Diagnostic claims |
| Radiology | CPT (70000–79999) | Imaging claims |
| E&M visits | CPT (99000–99499) | Consultation claims |

### 5.3 SNOMED CT

Used for: Clinical terminology standardization (Phase 2)

### 5.4 LOINC

Used for: Lab test coding (Phase 2)

### 5.5 Indian Specific Codes

| System | Purpose |
|---|---|
| CGHS Rate List | Government insurance billing |
| PMJAY Package Codes | Ayushman Bharat packages |
| ESI Schedule | ESIC claims |
| NABH Procedure Codes | Accredited hospital procedures |

---

## 6. Pre-Authorization Integration

### 6.1 Data Auto-Populated from EMR into Pre-Auth Form

| Pre-Auth Field | EMR Source | Auto/Manual |
|---|---|---|
| Patient Name | Registration | Auto |
| UHID / IP Number | Registration/IPD | Auto |
| Policy Number | Insurance Registration | Auto |
| Admission Date | IPD | Auto |
| Admitting Doctor | IPD | Auto |
| Provisional Diagnosis | EMR | Auto |
| ICD-10 Codes | EMR | Auto |
| Proposed Procedure | EMR/OT Schedule | Auto |
| Procedure CPT Code | EMR | Auto |
| Estimated Cost | Billing module | Auto |
| Medical History | EMR | Auto |
| Pre-existing Conditions | EMR | Auto |
| ICU Required | EMR | Auto |
| Expected Duration | Doctor entry | Manual |
| Clinical Justification | Doctor entry | Manual |

### 6.2 Clinical Event Triggers for Pre-Auth

```
Patient Admitted
     │
     ▼
EMR: Doctor enters Provisional Diagnosis
     │
     ▼
Insurance Module triggered:
  → Pre-Auth form auto-populated
  → Insurance Desk notified
     │
     ▼
OT Scheduling: Procedure scheduled
     │
     ▼
Insurance Module:
  → Procedure codes added to pre-auth
  → Escalation if high-value procedure
     │
     ▼
ICU Admission (if applicable)
     │
     ▼
Insurance Module:
  → ICU pre-auth initiated or updated
```

---

## 7. Claim Generation from EMR

### 7.1 Auto-Claim Population Workflow

```
Discharge Order Placed in EMR
     │
     ▼
Insurance Module Event Listener triggered
     │
     ▼
Fetch from EMR:
  - Final diagnosis (ICD-10)
  - All procedures (CPT/ICD-10-PCS)
  - Discharge summary text
  - Attending physician list
  - Admission & discharge dates
  - Ward category
     │
     ▼
Fetch from Billing Module:
  - All service line items
  - Room charges
  - Procedure charges
  - Medicine charges
  - Lab charges
  - Consumables
     │
     ▼
Auto-generate Claim:
  - Map billing items to claim lines
  - Attach ICD-10 codes
  - Attach CPT codes
  - Calculate pre-auth vs actual
  - Flag discrepancies
     │
     ▼
Insurance Desk Review:
  - Verify auto-populated data
  - Add any manual corrections
  - Attach documents
  - Submit claim
```

### 7.2 Claim Line Item Mapping

| Billing Item Type | Claim Form Section | Notes |
|---|---|---|
| Room charges | Accommodation | Per day, ward category |
| Doctor consultation | Professional fees | Per visit |
| Surgical procedure | Procedure charges | CPT code required |
| Anesthesia | Procedure charges | Separate line |
| ICU charges | Critical care | Per day |
| Lab investigations | Diagnostics | LOINC/CPT |
| Radiology | Diagnostics | CPT required |
| Blood transfusion | Procedure | Units, type |
| Implants / prosthetics | Implant section | Brand, cost, approval |
| Medicines | Pharmacy | Generic name, quantity |
| Consumables | Consumables | Line items |
| Nursing charges | Nursing | Per day |
| Physiotherapy | Rehab | Sessions |
| Oxygen / ventilator | Equipment | Hours |

---

## 8. Discharge Summary Integration

### 8.1 Discharge Summary Components Required

| Section | Required for Claim | Required for Pre-Auth |
|---|---|---|
| Patient demographics | Yes | Yes |
| Admission date/time | Yes | Yes |
| Discharge date/time | Yes | No |
| Primary diagnosis + ICD-10 | Yes | Yes |
| Secondary diagnoses | Yes | Partial |
| Procedures performed + CPT | Yes | Yes (planned) |
| Operative notes summary | Yes | No |
| ICU details | Yes (if applicable) | No |
| Complications | Yes | No |
| Blood transfusions | Yes | No |
| Implants used | Yes | Partial |
| Discharge condition | Yes | No |
| Discharge instructions | No | No |
| Follow-up plan | No | No |
| Treating physician signature | Yes | Yes |

### 8.2 Discharge Summary Document Standards

- Format: PDF (generated from EMR)
- Digital signature: Doctor's digital signature
- Timestamp: Auto-generated by EMR
- Immutability: Once finalized, cannot be edited
- Version: Amendments tracked
- Attachment: Auto-attached to claim package

---

## 9. Prescription & Pharmacy Integration

### 9.1 Pharmacy Data for Claims

| Data | Source | Used In |
|---|---|---|
| Drug name (generic) | EMR/Pharmacy | Claim line item |
| Brand name | Pharmacy | Documentation |
| Quantity dispensed | Pharmacy | Claim |
| Unit cost | Pharmacy | Billing |
| Total cost | Pharmacy | Claim total |
| Prescription date | EMR | Claim period |
| Prescribing doctor | EMR | Claim validation |
| High-cost drug flag | Pharmacy | Special approval |
| Controlled substance | Pharmacy | Regulatory |

### 9.2 High-Cost Drug Approval Workflow

```
Pharmacist enters high-cost drug (>₹5,000 per dose)
     │
     ▼
Insurance Module alert triggered
     │
     ▼
Insurance Desk:
  → Initiates special approval request to TPA/Insurer
  → Attaches prescription and clinical justification
     │
     ▼
TPA/Insurer approves or requests alternative
     │
     ▼
Pharmacy dispensed only after approval received
```

---

## 10. Lab & Radiology Integration

### 10.1 Lab Data for Claims

| Data | Required for Claim | Notes |
|---|---|---|
| Test name | Yes | |
| Test code (LOINC/CPT) | Yes (Phase 2) | |
| Date of test | Yes | |
| Result (value) | No (summary) | Detailed report attached |
| Reference range | No | |
| Cost | Yes | |
| Ordering doctor | Yes | |
| Report PDF | Yes (attached) | |

### 10.2 Radiology Data for Claims

| Data | Required | Notes |
|---|---|---|
| Study name (X-ray, CT, MRI, etc.) | Yes | |
| CPT code | Yes | |
| Date of study | Yes | |
| Radiologist report summary | Yes | |
| DICOM images | No (not in claim) | Available on request |
| Cost | Yes | |
| Ordering doctor | Yes | |

---

## 11. OT & Procedure Integration

### 11.1 OT Data Required for Claims

| Field | Source | Claim Use |
|---|---|---|
| Procedure name | OT Schedule | Claim description |
| CPT code | OT System | Claim coding |
| Date of procedure | OT System | Claim period |
| Duration (minutes) | OT System | Anesthesia billing |
| Surgeon | OT System | Claim |
| Co-surgeon | OT System | Claim |
| Anesthetist | OT System | Separate line item |
| Anesthesia type | OT System | Claim |
| OT category (major/minor) | OT System | Billing tier |
| Implants used | OT System | Special approval |
| OT notes summary | EMR | Documentation |
| Complications | OT/EMR | Claim amendment |

### 11.2 Implant/Prosthetic Special Handling

```
Implant used in surgery
     │
     ▼
OT staff records:
  - Implant type
  - Brand name
  - Serial number
  - Batch number
  - Cost
     │
     ▼
Insurance Module:
  → Check if pre-approved
  → If not: raise special approval request
  → Attach invoice from vendor
  → Attach surgical necessity note
     │
     ▼
TPA/Insurer:
  → Review and approve/reject
  → Specify reimbursable amount
```

---

## 12. FHIR / HL7 Standards

### 12.1 Phase 1 (Internal Integration) — Current Scope

- Internal REST APIs between HMS modules
- No external FHIR requirement
- Custom JSON data format for module-to-module

### 12.2 Phase 2 (ABDM/NHCX Integration) — Future Scope

| Standard | Purpose |
|---|---|
| HL7 FHIR R4 | Health data exchange |
| FHIR Patient resource | Patient demographics |
| FHIR Encounter resource | Admission/discharge |
| FHIR Condition resource | Diagnosis |
| FHIR Procedure resource | Procedures |
| FHIR Claim resource | Insurance claim |
| FHIR ClaimResponse resource | Insurer response |
| FHIR Coverage resource | Insurance policy |
| ABDM PHR profile | Ayushman Bharat Health Account |
| NHCX Claim Exchange | National Health Claim Exchange |

---

## 13. Data Mapping Tables

### 13.1 Registration → Insurance Module

| Source Field | Source Table | Target Field | Target Table |
|---|---|---|---|
| patient_id | patients | patient_id | insurance_patients |
| mrn | patients | mrn | insurance_patients |
| full_name | patients | patient_name | claims |
| dob | patients | dob | claims |
| gender | patients | gender | claims |
| aadhaar_no | patient_kyc | aadhaar_no | insurance_patients |

### 13.2 IPD → Insurance Module

| Source Field | Source Table | Target Field | Target Table |
|---|---|---|---|
| ip_number | ipd_admissions | ip_number | claims |
| admission_date | ipd_admissions | admission_date | claims |
| discharge_date | ipd_admissions | discharge_date | claims |
| ward_category | ipd_admissions | room_category | claim_billing_details |
| admitting_doctor_id | ipd_admissions | admitting_doctor | claims |

### 13.3 EMR → Insurance Module

| Source Field | Source Table | Target Field | Target Table |
|---|---|---|---|
| diagnosis_code | emr_diagnoses | icd10_code | claim_diagnoses |
| diagnosis_description | emr_diagnoses | diagnosis_description | claim_diagnoses |
| procedure_code | emr_procedures | cpt_code | claim_procedures |
| procedure_name | emr_procedures | procedure_name | claim_procedures |
| discharge_summary_id | emr_documents | document_id | claim_documents |

---

## 14. Error Handling & Fallback

### 14.1 EMR Data Not Available

| Scenario | System Behavior | User Action Required |
|---|---|---|
| Patient not yet admitted | Warning shown; manual entry allowed | Insurance desk enters manually |
| Diagnosis not yet entered | Pre-auth form partially populated | Doctor must enter diagnosis |
| Discharge summary not signed | Claim cannot be auto-submitted | Doctor must finalize discharge summary |
| Procedure not coded | Claim line item flagged | Coder must add CPT code |
| Lab report missing | Document list shows missing item | Lab dept notified |

### 14.2 Integration Failure Handling

| Failure Type | Retry Logic | Fallback |
|---|---|---|
| EMR API timeout | 3 retries, 5s interval | Allow manual entry |
| Partial data returned | Warn user, show missing fields | Manual completion |
| Code mapping not found | Flag for manual coding | Coding team notified |
| Duplicate record detected | Show duplicate warning | User reviews and merges |

---

## 15. Tasks for Gemini

---

### TASK EMR-001: EMR Integration Service Layer

**Objective:** Build the internal integration service that the Insurance Module uses to fetch data from EMR.

**Business Context:** Insurance desk must be able to pull patient's clinical data (diagnosis, procedures, discharge summary) with a single click instead of manually copying from paper records.

**Implementation Goal:** Create a service/utility layer (`emr_integration_service`) that provides clean, well-typed functions for fetching EMR data.

**Files Likely Created:**
- `services/emr_integration_service.js`
- `services/emr_data_mapper.js`
- `tests/emr_integration_service.test.js`

**Database Impact:** Read-only queries on EMR tables / views

**API Impact:** New internal API: `GET /api/v1/emr/patient-summary/:patientId`

**Functions to Build:**
```
getPatientSummary(patientId)
getAdmissionDetails(ipNumber)
getDiagnosisList(ipNumber)
getProcedureList(ipNumber)
getDischargeSummary(ipNumber)
getLabSummary(ipNumber)
getPharmacySummary(ipNumber)
getOtNotes(ipNumber)
```

**Validation Rules:**
- Patient must exist in HMS
- IP number must be valid for current admission
- Service must handle null/missing fields gracefully

**Acceptance Criteria:**
- All 8 functions return expected data structures
- Handles missing data without crashing
- Returns appropriate error messages for invalid IDs
- Response time < 500ms for standard queries

**Definition of Done:**
- Functions implemented with error handling
- Unit tests written and passing
- API endpoint returning correct data
- Swagger documentation updated

**Priority:** Critical  
**Estimated Effort:** 3 days  
**Risk Level:** Medium (depends on EMR module's data structure)

---

### TASK EMR-002: Pre-Authorization Auto-Population

**Objective:** When insurance desk opens a pre-auth form for an admitted patient, automatically populate all fields from EMR and IPD data.

**Business Context:** Insurance staff currently spend 15–20 minutes manually filling pre-auth forms. Automation reduces this to under 2 minutes.

**Implementation Goal:** On pre-auth form load (for an existing admission), call EMR integration service and pre-fill all available fields.

**Files Likely Modified:**
- `components/PreAuthForm.jsx`
- `hooks/usePreAuthAutoFill.js`
- `services/preauth_service.js`

**UI Changes:**
- Auto-filled fields shown with visual indicator (light blue background)
- "Data source: EMR" tooltip on auto-filled fields
- Warning banner if some fields could not be auto-populated
- Button: "Refresh from EMR" to re-fetch latest data

**Acceptance Criteria:**
- All auto-fillable fields populated on form load
- Manual override allowed on any auto-filled field
- Changes tracked (original EMR value vs. manually edited)
- Missing fields highlighted with warning

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK EMR-003: Claim Auto-Generation from Discharge

**Objective:** When a patient is discharged, automatically trigger claim pre-population in the Insurance Module.

**Business Context:** Discharge is the trigger for final claim submission. Auto-generation ensures no claim is missed and saves 30+ minutes of manual data entry per claim.

**Implementation Goal:**
1. Listen for discharge event from IPD module
2. Fetch complete clinical and billing data
3. Create draft claim with all available data
4. Notify insurance desk

**Event Trigger:** IPD sends event `PATIENT_DISCHARGED` with `{ patientId, ipNumber, dischargeDate }`

**Files Likely Created:**
- `events/discharge_event_handler.js`
- `services/claim_auto_generator.js`

**Acceptance Criteria:**
- Draft claim created within 60 seconds of discharge event
- All billing line items mapped to claim sections
- ICD-10 and CPT codes pulled from EMR
- Insurance desk receives notification
- Claim shows "Auto-generated — Pending Review" status

**Priority:** High  
**Estimated Effort:** 3 days  
**Risk Level:** Medium

---

### TASK EMR-004: ICD-10 Code Lookup & Validation

**Objective:** Build ICD-10 code search, validation, and autocomplete for all claim and pre-auth forms.

**Implementation Goal:**
- Searchable ICD-10 master database (loaded from WHO ICD-10 list)
- Autocomplete on diagnosis fields
- Code + description display
- Validation that code is valid/active

**Files Likely Created:**
- `data/icd10_codes.json` (master list)
- `services/icd10_service.js`
- `components/ICD10SearchInput.jsx`
- `api/icd10.routes.js`

**API:** `GET /api/v1/codes/icd10/search?q={query}&limit=10`

**Acceptance Criteria:**
- Autocomplete results appear within 200ms
- Search works by code (J45) and by description ("asthma")
- Invalid codes rejected with error message
- ICD-10 version tracked (10th vs 11th)

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK EMR-005: CPT / Procedure Code Lookup

**Objective:** CPT code search and autocomplete for procedure coding on claims.

**Similar to EMR-004 but for CPT codes.**

**Files Likely Created:**
- `data/cpt_codes.json`
- `services/cpt_service.js`
- `components/CPTCodeSearchInput.jsx`

**Priority:** High  
**Estimated Effort:** 1.5 days  
**Risk Level:** Low

---

### TASK EMR-006: Discharge Summary Auto-Attachment

**Objective:** When a discharge summary is finalized in EMR, automatically attach the PDF to the corresponding insurance claim.

**Implementation Goal:**
1. Listen for `DISCHARGE_SUMMARY_FINALIZED` event
2. Fetch PDF from document management
3. Attach to insurance claim's document package
4. Mark "Discharge Summary" checklist item as complete

**Acceptance Criteria:**
- PDF attached automatically within 30 seconds
- Document version tracked
- Insurance desk sees "Discharge Summary: Received" status
- If summary not finalized, claim shows warning "Discharge Summary Pending"

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

**Executive Summary:** The EMR Integration layer is the foundation for automated, accurate, and efficient insurance claim processing. Without it, the insurance module is a standalone data entry system; with it, claims are largely auto-generated from clinical truth.

---
