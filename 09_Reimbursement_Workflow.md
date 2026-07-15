# 09 – Reimbursement Claim Workflow
## HMS Insurance Module

---

## 1. Overview

Reimbursement claims arise when a patient pays for treatment out-of-pocket and subsequently claims the amount from their insurance company. This differs from cashless in that the hospital is NOT the direct recipient of the insurance payment — the patient is. However, the hospital's insurance team assists the patient in claim preparation and may submit on the patient's behalf.

---

## 2. When Reimbursement Claims Arise

| Scenario | Reason |
|---|---|
| Hospital is not in TPA's network | Patient eligible but hospital not empaneled |
| Patient chose not to use cashless | Personal choice |
| Pre-auth was rejected, patient still proceeded | Treatment done self-pay |
| Emergency admission, no time for pre-auth | Intimation submitted but auth delayed |
| Policy has no cashless facility | Pure reimbursement policy |
| Corporate policy with defined reimbursement | Corporate HR will reimburse employee |

---

## 3. Reimbursement Claim States

```
REGISTERED
    │
    ▼
DOCUMENTS_COLLECTION
    │
    ▼
DOCUMENTS_COMPLETE
    │
    ▼
SUBMITTED_TO_TPA
    │
    ├── DEFICIENCY_RAISED → DEFICIENCY_RESPONDED → Back to UNDER_REVIEW
    │
    ▼
UNDER_REVIEW
    │
    ├── SETTLED (full)
    ├── PARTIALLY_SETTLED
    └── REJECTED
            │
            └── APPEAL_SUBMITTED → APPEAL_SETTLED / APPEAL_REJECTED
```

---

## 4. Document Checklist for Reimbursement

### Universal Documents (All Companies)
| # | Document | Original / Copy | Mandatory |
|---|---|---|---|
| 1 | Duly filled claim form | Original | ✅ |
| 2 | Original discharge summary | Original | ✅ |
| 3 | Original final bill with receipt | Original | ✅ |
| 4 | All original investigation reports (blood, urine, etc.) | Original | ✅ |
| 5 | Original X-ray/CT/MRI reports | Original | ✅ |
| 6 | Original pharmacy bills | Original | ✅ |
| 7 | Insurance policy card copy | Attested copy | ✅ |
| 8 | Patient ID proof (Aadhaar/PAN/Passport) | Attested copy | ✅ |
| 9 | Cancelled cheque or bank details | Original | ✅ |
| 10 | Treating doctor prescription | Original | ✅ |

### Additional (Surgery Cases)
| # | Document | Mandatory |
|---|---|---|
| 1 | OT notes | ✅ |
| 2 | Anesthesia notes | ✅ |
| 3 | Implant sticker/invoice (if applicable) | ✅ |
| 4 | Histopathology report | If applicable |

### Additional (ICU Cases)
| # | Document | Mandatory |
|---|---|---|
| 1 | ICU daily charts | ✅ |
| 2 | Ventilator records | If applicable |

### Additional (Accidental Cases)
| # | Document | Mandatory |
|---|---|---|
| 1 | FIR or accident report | ✅ |
| 2 | MLC (medico-legal case) report | ✅ |
| 3 | Discharge summary mentioning accident | ✅ |

---

## 5. Step-by-Step Reimbursement Workflow

### Step 1: Claim Registration

**When:** After patient discharge (or at the time of discharge if patient requests)
**Actor:** Insurance Desk Executive OR patient self-registers (if portal is available)

**System Actions:**
1. Search patient by name/UHID
2. Link to specific admission episode
3. Select claim type: Reimbursement
4. Select insurance company/TPA
5. Enter basic claim details:
   - Claim type: Individual/Family floater/Corporate
   - Relation to policyholder (if family)
   - Primary diagnosis
   - Claim amount requested (total bill amount)
6. System assigns Reimbursement Claim Number (e.g., RMB-2025-001234)
7. System generates document checklist based on insurance company

**Status after registration:** REGISTERED

---

### Step 2: Document Collection

**Actor:** Insurance Desk Executive + Patient/Family
**System Actions:**
1. Display document checklist (insurance-company-specific)
2. For each document:
   - Upload scanned/photographed copy
   - Mark as received or pending
3. System tracks % completion of checklist
4. Alert patient (via desk executive) if any document is pending
5. If document collection is complete → Status: DOCUMENTS_COMPLETE

**Business Rule:** Claim cannot be submitted until all mandatory documents are uploaded and verified.

**Validation per document:**
- File must be in allowed format (PDF/JPG/PNG)
- File size must be < 10MB per file
- Document expiry check (for ID proofs)

---

### Step 3: Claim Preparation

**Actor:** Claims Manager
**System Actions:**
1. Claims Manager reviews all uploaded documents
2. Verify against document checklist
3. Generate claim summary sheet (from system):
   - Patient details
   - Admission details
   - Diagnosis and procedure
   - Total claim amount
   - Document list with verification status
4. Generate TPA-specific claim form (from system template)
5. Flag any discrepancies (e.g., bill amount > policy limit)

**Potential Issues:**
- Bill amount exceeds sum insured → System warns; patient must be informed
- Diagnosis in exclusion list → System flags; claim may be rejected
- Documents from non-authorized source → Flag for verification

---

### Step 4: Claim Submission to TPA

**Actor:** Claims Manager
**System Actions:**
1. Final review of complete claim package
2. Submit to TPA:
   - If physical: Mark as "Physically Submitted" with courier docket number + date
   - If email: Upload email confirmation with timestamp
   - If TPA portal: Enter portal submission reference + date
3. System status: SUBMITTED_TO_TPA
4. Record:
   - Submission date
   - TPA/company contact
   - Submission reference/docket number
5. Set expected response date (submission date + 30 days standard)
6. Notification to Claims Manager: "Reimbursement claim submitted for [Patient Name]"

---

### Step 5: Tracking After Submission

**System Features:**
- Dashboard showing all submitted claims with expected response dates
- Alert if no TPA response in 20 days
- Alert if deficiency letter received

**Actor for follow-up:** Claims Manager
**Actions:**
- Call TPA / check TPA portal for status
- Update status in system based on TPA feedback

---

### Step 6: Deficiency Letter Handling

**When:** TPA finds documents incomplete or needs additional information

**System Actions:**
1. Claims Manager receives deficiency letter (from TPA portal/email/physical)
2. Upload deficiency letter in system
3. Status: DEFICIENCY_RAISED
4. List of deficiencies entered in system
5. Collect missing documents from patient
6. Upload response documents
7. Prepare deficiency response letter
8. Submit to TPA with new submission reference
9. Status: DEFICIENCY_RESPONDED
10. Resume TPA review

---

### Step 7: Settlement Recording

**Scenario A: Full Settlement**
1. TPA settles claim for full requested amount
2. Settlement goes directly to patient's bank account (not hospital's)
3. Claims Manager records in system:
   - Settled amount
   - Payment date
   - Payment reference
   - Settlement letter uploaded
4. Status: SETTLED

**Scenario B: Partial Settlement**
1. TPA settles a lesser amount than claimed
2. Record partial settlement details
3. Status: PARTIALLY_SETTLED
4. Document reason for short settlement
5. Decide: Accept or appeal

**Scenario C: Rejection**
1. TPA rejects claim
2. Record rejection reason
3. Upload rejection letter
4. Status: REJECTED
5. Options: Appeal within TPA's appeal timeline (usually 30 days)

---

### Step 8: Appeal Process

**When:** Patient wants to appeal a rejection or partial settlement

**System Actions:**
1. Create Appeal record linked to original claim
2. Enter appeal grounds
3. Attach additional documents supporting appeal
4. Submit to TPA
5. Track appeal status separately
6. Record appeal outcome: APPEAL_SETTLED or APPEAL_REJECTED

---

## 6. Key Business Rules

| Rule | Detail |
|---|---|
| Time limit for claim submission | Most companies: within 30 days of discharge |
| Emergency extension | Up to 90 days if patient in ICU or critical |
| Original documents mandatory | Most TPAs do not accept photocopies for key documents |
| Cancelled cheque required | For NEFT payment to patient |
| Pre-numbering of bills required | Bills must be pre-numbered and sequential |

---

## 7. Tasks for Gemini – Reimbursement Workflow

### Task: RW-001 – Reimbursement Registration Form

**Objective:** Build reimbursement claim registration interface

**Files likely created:**
- `src/pages/insurance/ReimbursementForm.jsx`
- `src/api/reimbursement.js`
- `src/models/ReimbursementClaim.js`

**Database Impact:** Creates record in `reimbursement_claims` table

**API Impact:** `POST /api/v1/insurance/reimbursement`

**Acceptance Criteria:**
- [ ] Claim registration creates record linked to patient + admission
- [ ] Document checklist generated based on insurance company
- [ ] Document collection tracking with % completion
- [ ] Cannot submit claim until all mandatory documents uploaded
- [ ] Full status state machine implemented
- [ ] Appeal workflow creates linked appeal record

---

*End of Reimbursement Workflow*
