# 10 – Pre-Authorization Workflow
## HMS Insurance Module

---

## 1. Overview

Pre-Authorization (Pre-Auth) is the formal process of obtaining approval from the TPA/insurance company before initiating cashless treatment. It is the most time-sensitive and critical workflow in hospital insurance operations.

---

## 2. Types of Pre-Authorization

| Type | Description | Timing |
|---|---|---|
| Initial Pre-Auth | First authorization request for the admission | Before or at time of admission |
| Enhancement Request | Additional authorization when costs increase | During admission, before discharge |
| Day Care Pre-Auth | For procedures that don't require overnight stay | Day of procedure |
| OPD Pre-Auth | For OPD-covered procedures (depends on policy) | Before OPD visit |
| Emergency Intimation | Simplified form for emergency admissions | Within 24 hours of emergency admission |

---

## 3. Pre-Auth Form Fields (Standard)

### Section A: Patient Information
| Field | Required | Source |
|---|---|---|
| Patient Name | ✅ | HMS Patient Record |
| Date of Birth | ✅ | HMS Patient Record |
| Gender | ✅ | HMS Patient Record |
| UHID (Hospital ID) | ✅ | HMS Patient Record |
| Policy Number | ✅ | Patient Insurance Registration |
| Group/Scheme Number | If applicable | Patient Insurance Registration |
| Insured Person's Name | ✅ | Patient Insurance Registration |
| Relationship to Insured | ✅ | Patient Insurance Registration |
| TPA Name | ✅ | Auto from policy |
| Insurance Company Name | ✅ | Auto from policy |

### Section B: Hospital Information
| Field | Required | Source |
|---|---|---|
| Hospital Name | ✅ | System config |
| Hospital Registration No. | ✅ | System config |
| Hospital TPA Empanelment No. | ✅ | System config |
| Hospital Address | ✅ | System config |
| Treating Doctor Name | ✅ | HMS Doctor Master |
| Doctor's Qualification | ✅ | HMS Doctor Master |
| Doctor's Registration No. | ✅ | HMS Doctor Master |
| Contact Number | ✅ | System config |

### Section C: Clinical Information
| Field | Required | Source |
|---|---|---|
| Date of Admission | ✅ | HMS Admission |
| Admission Type | ✅ | Planned / Emergency / Day Care |
| Presenting Complaints | ✅ | Manual entry |
| Duration of Illness | ✅ | Manual entry |
| Past Medical History | If relevant | Manual entry / EMR |
| Past Hospitalization | If relevant | Manual entry / EMR |
| Diagnosis | ✅ | ICD-10 code + description |
| Planned Procedure | ✅ | ICD-10-PCS code + description |
| Procedure Surgeon Name | If surgery | Manual entry / HMS |
| Expected Length of Stay | ✅ | Manual entry |
| Ward Type Requested | ✅ | General / Semi-Private / Private / ICU |

### Section D: Estimated Cost Breakdown
| Cost Item | Field | Required |
|---|---|---|
| Room/Nursing Charges | Per day × days | ✅ |
| ICU Charges | Per day × days | If applicable |
| Surgeon's Fee | Total | If applicable |
| Anesthetist's Fee | Total | If applicable |
| Investigations (Lab) | Total estimated | ✅ |
| Investigations (Radiology) | Total estimated | If applicable |
| Medicine/Pharmacy | Total estimated | ✅ |
| Blood/Blood Products | Total estimated | If applicable |
| Implants/Prosthetics | Total estimated | If applicable |
| Other Charges | Total | If applicable |
| **TOTAL ESTIMATED COST** | **Auto-calculated** | **✅** |

### Section E: Documents Attached
| Document | Mandatory |
|---|---|
| Treating Doctor's Certificate | ✅ |
| Latest Investigation Reports | ✅ |
| Previous Treatment Records | If chronic disease |
| Previous Discharge Summary | If re-admission |
| Referral Letter (if transferred) | If applicable |

---

## 4. Pre-Auth State Machine

```
[DRAFT]
   │
   └──Submit to TPA──►[SUBMITTED]
                          │
                    TPA Response
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
    [APPROVED]    [QUERY_RAISED]      [REJECTED]
         │                │                │
         │           Team responds         │
         │                │                ▼
         │         [RESPONDED]         [APPEAL]
         │                │                │
         │         TPA Re-reviews          │
         │                │          [APPEAL_SETTLED]
         │                │          [APPEAL_REJECTED]
         │         Loop or Approve
         │
[PARTIALLY_APPROVED]
         │
    Accept or Appeal
         │
         ▼
[CLAIM_INITIATED] ─────► Cashless Claim Workflow

Enhancement Request:
[APPROVED/PARTIALLY_APPROVED]
         │
    Enhancement needed
         │
         ▼
[ENHANCEMENT_SUBMITTED]
         │
    TPA responds
         │
[ENHANCEMENT_APPROVED] or [ENHANCEMENT_REJECTED]
         │
    Update total approved amount
```

---

## 5. Pre-Auth TAT (Turnaround Time) Standards

| Type | Standard TAT | Emergency TAT |
|---|---|---|
| Planned Medical | 6–8 hours | Not applicable |
| Planned Surgical | 8–24 hours | Not applicable |
| Emergency Medical | 2 hours | 1 hour |
| Emergency Surgical | 2 hours | 30 minutes |
| ICU Admission | 1 hour | 30 minutes |
| Day Care Procedure | 2–4 hours | Not applicable |

---

## 6. TPA Communication Log Requirements

Every TPA communication must be recorded:

| Field | Detail |
|---|---|
| Communication Type | Phone / Portal / Email / Fax |
| Date & Time | System timestamp |
| TPA Representative Name | Entered by user |
| Communication Direction | Outgoing / Incoming |
| Summary | Text of communication |
| Outcome | Auth number / Query raised / Rejected |
| Reference number | TPA's reference |
| Attached document | If any |

---

## 7. Pre-Auth Query Categories

TPAs raise queries in these common categories:

| Category | Examples |
|---|---|
| Clinical | Need justification for ICU admission, Need OT notes, Query on diagnosis |
| Financial | Estimated cost too high, Need itemized cost breakdown |
| Document | Missing investigation reports, Need old discharge summary |
| Policy | Policy in waiting period, Exclusion applies |
| Technical | Form incomplete, Wrong ICD code |

**Response Workflow per Category:**
- Clinical → Consult treating doctor, prepare clinical justification letter
- Financial → Get itemized estimate from billing, justify each cost head
- Document → Collect missing document, scan and upload
- Policy → Verify policy terms, if dispute escalate to TPA manager
- Technical → Correct form and resubmit

---

## 8. Enhancement Request Workflow

### When to Submit Enhancement
- Doctor confirms additional surgery/procedure needed
- ICU stay extends beyond initially estimated days
- Complications arising requiring more treatment
- Cost escalation due to ICU / specialized drugs / implants

### Enhancement Form Fields
| Field | Required |
|---|---|
| Original Auth Reference Number | ✅ (auto-linked) |
| Original Approved Amount | ✅ (auto-filled) |
| Additional Amount Required | ✅ |
| Reason for Enhancement | ✅ |
| Additional Procedures/Diagnosis | ✅ |
| Updated Estimated Cost | ✅ |
| Supporting Documents | ✅ |

### Business Rules
- Enhancement submitted BEFORE discharge (system enforces)
- Enhancement must reference original auth number
- Enhancement response recorded in same pre-auth record
- Running total of approved amounts maintained

---

## 9. Pre-Auth Dashboard Requirements

| Dashboard Element | Description |
|---|---|
| All active pre-auths (today) | Status, patient, TPA, elapsed time |
| Pending > 2 hours | Highlighted in yellow |
| Pending > 4 hours | Highlighted in red (escalation) |
| Query raised (unresponded) | Highlighted in orange |
| Approved today | Count + total amount |
| Rejected today | Count + reasons |
| Enhancement pending | List by patient |

---

## 10. Tasks for Gemini – Pre-Authorization Module

### Task: PA-001 – Pre-Auth Record Model and API

**Objective:** Create the pre-auth data model and CRUD APIs

**Files likely created:**
- `src/models/PreAuthorization.js` (or equivalent ORM model)
- `src/models/PreAuthCommunicationLog.js`
- `src/models/EnhancementRequest.js`
- `src/controllers/preauth.controller.js`
- `src/routes/preauth.routes.js`

**Database Impact:**
- Tables: `pre_authorizations`, `preauth_communication_logs`, `enhancement_requests`

**API Impact:**
- `GET /api/v1/insurance/pre-auth` – list with filters
- `POST /api/v1/insurance/pre-auth` – create new
- `GET /api/v1/insurance/pre-auth/:id` – detail
- `PATCH /api/v1/insurance/pre-auth/:id/status` – status update
- `POST /api/v1/insurance/pre-auth/:id/query-response` – record query response
- `POST /api/v1/insurance/pre-auth/:id/enhancement` – submit enhancement

**Acceptance Criteria:**
- [ ] Full state machine implemented at model level
- [ ] Status transitions validated (cannot jump from DRAFT to APPROVED)
- [ ] Every status change logged in audit trail
- [ ] Enhancement request creates linked record with original auth reference
- [ ] SLA alerts triggered at 2 hours and 4 hours pending

---

*End of Pre-Authorization Workflow*
