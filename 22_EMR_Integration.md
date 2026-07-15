# 22 — EMR Integration
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager

---

## 1. Purpose

This document defines the integration between the HMS Insurance Module and the Electronic Medical Records (EMR) system. Insurance processes require clinical data — diagnoses, procedures, discharge summaries — from the EMR. The Insurance Module must read from the EMR and auto-populate claims with accurate clinical information.

---

## 2. EMR Data Required by Insurance Module

### 2.1 At Pre-Authorization Stage

| Data | Source in EMR | Used for |
|------|--------------|---------|
| Primary Diagnosis (ICD-10) | Clinical Notes | Pre-auth form |
| Secondary Diagnoses | Clinical Notes | Pre-auth supporting info |
| Planned Procedure (CPT/SNOMED) | OT Planning | Pre-auth clinical justification |
| Treating Doctor | Admission record | Pre-auth form |
| Department | Admission record | Pre-auth form |
| Pre-existing Conditions (PED) | Patient history | Insurer disclosure |
| Planned admission/discharge dates | Admission plan | Pre-auth timeline |
| Estimated days of stay | OT/Ward planning | Pre-auth form |
| Clinical notes / justification | Doctor notes | Pre-auth supporting document |

### 2.2 At Claim Submission Stage

| Data | Source in EMR | Used for |
|------|--------------|---------|
| Discharge Summary | EMR — Discharge notes | Mandatory claim document |
| Final Diagnosis | EMR — Discharge notes | Claim form |
| Procedures performed | OT records | Claim line items |
| Lab reports (selected) | Lab EMR | Claim document |
| Radiology reports | Radiology system | Claim document |
| Prescription records | Pharmacy EMR | Pharmacy claim line items |
| Anesthesia notes | OT EMR | Surgical claim |
| ICU charts | ICU EMR | ICU day billing |
| Nurse charts | Ward EMR | Room day billing |
| Vitals history | EMR | Supporting clinical data |

---

## 3. Integration Architecture

```
EMR Module
    │
    │  Read APIs (REST)
    ▼
Insurance Module (reads clinical data)
    │
    │ Populates
    ▼
Pre-Auth Form / Claim Form
```

The Insurance Module is a **consumer** of EMR data. It does **not** write back to the EMR. All clinical data remains in the EMR; the Insurance Module copies only what is needed for claim/pre-auth at the time of submission.

---

## 4. EMR APIs Consumed by Insurance Module

These APIs are provided by the EMR module. The Insurance Module calls them.

### 4.1 Get Admission Clinical Summary

**GET** `/api/v1/emr/admissions/:admissionId/clinical-summary`

Returns key clinical data for a given admission for use in pre-auth/claim forms.

**Response:**
```json
{
  "success": true,
  "data": {
    "admission_id": "uuid",
    "patient_id": "uuid",
    "admission_date": "2024-11-20",
    "discharge_date": "2024-11-23",
    "treating_doctor": {
      "id": "uuid",
      "name": "Dr. Sanjay Mehta",
      "specialization": "General Surgery",
      "registration_number": "MCI-12345"
    },
    "department": "General Surgery",
    "primary_diagnosis": {
      "icd_code": "K35.89",
      "description": "Acute appendicitis with other complications"
    },
    "secondary_diagnoses": [],
    "procedures": [
      {
        "code": "47562",
        "name": "Laparoscopic appendectomy",
        "date": "2024-11-20",
        "surgeon": "Dr. Sanjay Mehta"
      }
    ],
    "icu_days": 0,
    "ward_days": 3,
    "room_type": "SEMI_PRIVATE",
    "discharge_condition": "STABLE",
    "pre_existing_conditions": [],
    "clinical_notes_summary": "Patient presented with acute abdominal pain. Emergency laparoscopic appendectomy performed. Uneventful recovery."
  }
}
```

---

### 4.2 Get Discharge Summary

**GET** `/api/v1/emr/admissions/:admissionId/discharge-summary`

Returns the discharge summary as a structured document.

**Response:**
```json
{
  "success": true,
  "data": {
    "is_finalized": true,
    "finalized_at": "2024-11-23T10:00:00Z",
    "pdf_url": "https://storage.hms.com/discharge-summary/uuid.pdf",
    "summary_text": "...",
    "final_diagnosis": "K35.89 - Acute appendicitis",
    "procedures_performed": "Laparoscopic appendectomy",
    "follow_up_instructions": "Review in OPD after 7 days"
  }
}
```

**Business Rule:** Insurance module cannot submit a claim if `is_finalized = false`.

---

### 4.3 Get Lab Reports for Admission

**GET** `/api/v1/emr/admissions/:admissionId/lab-reports`

**Response:** List of lab reports with names, dates, and PDF URLs.

---

### 4.4 Get Radiology Reports for Admission

**GET** `/api/v1/emr/admissions/:admissionId/radiology-reports`

**Response:** List of radiology reports with names, dates, and PDF/DICOM reference URLs.

---

### 4.5 Get OT/Procedure Notes

**GET** `/api/v1/emr/admissions/:admissionId/ot-notes`

**Response:** OT procedure details, surgeon, anesthesiologist, duration, implants used.

---

### 4.6 Get Patient Medical History (for PED Check)

**GET** `/api/v1/emr/patients/:patientId/medical-history`

Used to display patient's pre-existing conditions before submitting pre-auth.

**Response:**
```json
{
  "success": true,
  "data": {
    "patient_id": "uuid",
    "conditions": [
      { "condition": "Type 2 Diabetes", "diagnosed_year": 2018, "icd_code": "E11" },
      { "condition": "Hypertension", "diagnosed_year": 2019, "icd_code": "I10" }
    ],
    "allergies": ["Penicillin"],
    "surgeries": [],
    "chronic_medications": ["Metformin 500mg", "Amlodipine 5mg"]
  }
}
```

**Used for:** PED disclosure in pre-auth; insurer's exclusion assessment.

---

## 5. Auto-Population Workflow

When an insurance desk staff member opens a pre-auth form or new claim form and links it to an admission:

```
Step 1: Staff selects Admission ID
Step 2: Insurance Module calls GET /emr/admissions/:id/clinical-summary
Step 3: Response data auto-populates:
         - Primary Diagnosis (ICD code + description)
         - Procedures (procedure_codes field)
         - Treating Doctor
         - Department
         - Admission/Discharge dates
         - Estimated days
Step 4: Staff reviews and can manually edit any field
Step 5: For claim creation, insurance module also calls GET /emr/admissions/:id/discharge-summary
         to verify discharge summary is finalized
Step 6: Lab and radiology reports listed for easy document attachment
```

---

## 6. Discharge Summary Auto-Attach

When a claim document is required (Discharge Summary), the system:

1. Calls `GET /emr/admissions/:id/discharge-summary`
2. If `is_finalized = true` and `pdf_url` is available:
   - Offers "Auto-Attach Discharge Summary" button
   - Clicking this attaches the EMR-generated PDF to the claim document list
   - No manual upload needed
3. If not finalized:
   - Shows warning: "Discharge summary not yet finalized. Please complete EMR discharge notes first."
   - Blocks claim submission

---

## 7. ICD-10 Code Search Integration

For manual entry of diagnosis codes in pre-auth forms:

**GET** `/api/v1/emr/icd-codes/search?q=appendicitis&limit=10`

**Response:**
```json
{
  "data": [
    { "code": "K35.0", "description": "Acute appendicitis with generalized peritonitis" },
    { "code": "K35.2", "description": "Acute appendicitis with generalized peritonitis" },
    { "code": "K35.89", "description": "Acute appendicitis with other complications" },
    { "code": "K37", "description": "Unspecified appendicitis" }
  ]
}
```

This is a live typeahead search on the pre-auth form's diagnosis code field.

---

## 8. Doctor & Department Master Sync

Insurance Module should not maintain its own doctor/department master. It reads from the HMS master:

**GET** `/api/v1/hms/doctors?status=ACTIVE&department_id=:id`

**GET** `/api/v1/hms/departments`

These are used to populate dropdowns in pre-auth and claim forms.

---

## 9. ABDM / NHCX Future Integration Note

The National Health Claims Exchange (NHCX) is India's upcoming standard for digital claims processing. When implemented:

- Discharge summaries will be available as FHIR R4 documents
- Claims will be submitted digitally via NHCX API
- Pre-auth responses will come via NHCX notification webhooks
- All EMR data exchange will follow FHIR standards

**Current requirement:** Design the EMR integration layer as an abstraction interface so that switching from current REST calls to FHIR-based ABDM/NHCX calls requires only changes to the integration adapter, not to the entire insurance module.

**Pattern:**
```typescript
interface IEMRAdapter {
  getAdmissionSummary(admissionId: string): Promise<ClinicalSummary>;
  getDischargeSummary(admissionId: string): Promise<DischargeSummary>;
  getLabReports(admissionId: string): Promise<LabReport[]>;
  getPatientHistory(patientId: string): Promise<MedicalHistory>;
}

class HMSEMRAdapter implements IEMRAdapter { ... }   // Current
class FHIRABDMAdapter implements IEMRAdapter { ... }  // Future
```

---

## 10. Review Checklist

- [ ] All EMR data requirements listed for pre-auth and claims
- [ ] EMR APIs defined and consumed correctly
- [ ] Auto-population workflow specified for pre-auth and claim forms
- [ ] Discharge summary auto-attach specified
- [ ] ICD-10 search integrated
- [ ] Doctor/department master read from HMS (no duplication)
- [ ] ABDM/NHCX adapter interface defined for future-proofing
- [ ] PED disclosure workflow from EMR history defined
- [ ] Claim submission blocked if discharge summary not finalized
- [ ] No write-back to EMR from Insurance Module
