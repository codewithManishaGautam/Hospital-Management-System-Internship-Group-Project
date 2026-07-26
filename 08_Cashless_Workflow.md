# 08 – Cashless Authorization & Claim Workflow
## HMS Insurance Module

---

## 1. Overview

The cashless workflow covers the complete journey from when a patient arrives with an insurance card to the point where the TPA settles the hospital's bill. The patient pays only the co-pay; the rest is settled directly between the TPA and the hospital.

---

## 2. Eligibility Criteria for Cashless

| Criteria | Requirement |
|---|---|
| Hospital empaneled | Hospital must be in the insurer's network |
| Policy active | Policy must be active on the date of admission |
| Waiting period | Treatment must be past any applicable waiting period |
| Disease covered | Diagnosis must not be in exclusion list |
| Pre-authorization | Valid pre-auth must be obtained before or during admission |

---

## 3. Cashless Claim States

```
INITIATED → SUBMITTED → QUERY_RAISED → RESPONDED → APPROVED
                                                        │
                                    PARTIALLY_APPROVED  │
                                                        │
                                         REJECTED       │
                                                        ▼
                                                 CLAIM_CREATED
                                                        │
                                                        ▼
                                             INTERIM_BILL_SUBMITTED (optional)
                                                        │
                                                        ▼
                                              FINAL_BILL_SUBMITTED
                                                        │
                                                        ▼
                                               ACKNOWLEDGED_BY_TPA
                                                        │
                                                        ▼
                                                UNDER_REVIEW
                                                        │
                                         ┌──────────────┴──────────────┐
                                         ▼                             ▼
                                      SETTLED                   PARTIALLY_SETTLED
                                                                       │
                                                                  SHORTFALL_PENDING
```

---

## 4. Step-by-Step Cashless Workflow

### Step 1: Patient Arrival & Policy Verification
**Actor:** Insurance Desk Executive
**System Actions:**
1. Search patient in HMS
2. If new patient: register in HMS, then link insurance
3. If existing patient: open patient record
4. Search for active insurance policy linked to patient
5. If no policy: register new policy
6. Verify policy validity dates, sum insured, available balance

**Validations:**
- Policy must not be expired
- Sum insured must have sufficient balance for estimated treatment
- Diagnosis must not be in exclusion list
- Waiting period must be satisfied

**System Output:**
- Patient insurance record created/confirmed
- Pre-auth request can now be initiated

---

### Step 2: Pre-Authorization Request

**Actor:** Insurance Desk Executive
**System Actions:**
1. Open new pre-auth request form linked to patient + admission
2. Auto-populate: Patient name, DOB, policy number, TPA details, hospital details
3. Enter: Admission date/time, admission type (planned/emergency)
4. Enter: Treating doctor name, department
5. Enter: Diagnosis (search ICD-10 code), description
6. Enter: Planned procedure (ICD-10-PCS), description
7. Enter: Estimated cost (breakdown: room rent, surgery, medicine, investigation, ICU)
8. Select: Ward type (General/Semi-private/Private/ICU)
9. Enter: Expected length of stay
10. Attach: Doctor's certificate, investigation reports

**Validations:**
- Diagnosis code required
- Estimated cost > 0
- Ward type must match policy entitlement (or flag excess)
- Doctor name must be from HMS doctor list

**System Output:**
- Pre-auth record created in DRAFT status
- Checklist of required documents shown

---

### Step 3: Pre-Auth Submission to TPA

**Actor:** Insurance Desk Executive
**System Actions:**
1. Review pre-auth draft
2. Confirm all mandatory documents uploaded
3. Click "Submit to TPA"
4. System changes status to SUBMITTED
5. System records submission timestamp
6. System generates reference number (internal)
7. TPA submission channel: portal / email / fax (manual, with system record)

**System Output:**
- Pre-auth status: SUBMITTED
- Notification sent to Claims Manager (for tracking)
- SLA timer starts (2-hour alert configured)

---

### Step 4: TPA Response Handling

**Scenario A: TPA Approves**
1. Insurance desk receives authorization letter from TPA
2. Enter TPA authorization number in system
3. Enter approved amount
4. Upload authorization letter PDF
5. System changes pre-auth status to APPROVED
6. Notification sent to billing: "Pre-auth approved, amount: ₹X"
7. Admission confirmed, treatment begins

**Scenario B: TPA Partially Approves**
1. Enter TPA authorization number and partially approved amount
2. Upload partial auth letter
3. System status: PARTIALLY_APPROVED
4. System calculates patient liability: Estimated cost – Approved amount
5. Patient/attendant informed of additional liability
6. Decision: Accept partial → continue; OR submit appeal

**Scenario C: TPA Raises Query**
1. TPA sends query (via portal/email/call)
2. Insurance desk enters query in system with text and timestamp
3. System status changes to QUERY_RAISED
4. Notification sent to Claims Manager (urgent)
5. Team gathers response (clinical info, documents)
6. Response entered in system and submitted to TPA
7. System status: RESPONDED
8. Loop back to TPA review

**Scenario D: TPA Rejects Pre-Auth**
1. Enter rejection reason (from TPA letter)
2. Upload rejection letter
3. System status: REJECTED
4. Options:
   - Appeal: document appeal and resubmit
   - Convert to reimbursement: patient self-pays, plans to claim after discharge
   - Cancel: patient cancels treatment

---

### Step 5: Enhancement Request (When Bill May Exceed Approval)

**Trigger:** Treating doctor indicates treatment cost will exceed pre-auth approved amount

**System Actions:**
1. Open Enhancement Request form linked to original pre-auth
2. Enter: Additional procedures planned, additional estimated cost, reason
3. Attach: Updated clinical notes
4. Submit to TPA as enhancement
5. Status: ENHANCEMENT_SUBMITTED
6. TPA approves/rejects enhancement → update total approved amount

**Business Rule:** Enhancement must be submitted BEFORE patient discharge

---

### Step 6: Cashless Claim Creation at Discharge

**Actor:** Claims Manager + Billing Executive
**Trigger:** Treating doctor clears patient for discharge

**System Actions:**
1. Insurance desk opens cashless claim form
2. Claim auto-links to pre-auth
3. Pull final bill from HMS billing
4. System shows:
   - Approved amount
   - Final billed amount
   - Patient co-pay (calculated per plan rules)
   - Shortfall (if any)
5. Exclude non-payable items (cosmetics, food, attendant charges)
6. Claims Manager reviews and confirms

**Validations:**
- Bill must not exceed approved amount (without override)
- Co-pay must be confirmed as collected
- Discharge summary must be attached

---

### Step 7: Claim Package Submission

**Documents Required for TPA Submission:**
| # | Document | Source |
|---|---|---|
| 1 | Pre-authorization letter | TPA |
| 2 | Final hospital bill | HMS Billing |
| 3 | Discharge summary | HMS EMR |
| 4 | All investigation reports | HMS Lab/Radiology |
| 5 | Pharmacy bills | HMS Pharmacy |
| 6 | OT notes (if surgery) | HMS OT Module |
| 7 | Patient identity proof | Uploaded at registration |
| 8 | Insurance card copy | Uploaded at registration |
| 9 | TPA claim form (filled) | System-generated |

**System Actions:**
1. System assembles claim package (checklist)
2. Claims Manager confirms all documents present
3. Submit claim to TPA (portal/physical)
4. Record submission date and TPA docket number
5. Status: FINAL_BILL_SUBMITTED

---

### Step 8: TPA Claim Processing

**Timeline:** TPA standard processing time = 15–30 days

**System Tracking:**
- Track acknowledgment date
- Track expected settlement date (submission date + 30 days)
- Alert if no response in 20 days
- Record any TPA queries and responses during claim review

---

### Step 9: Settlement

**Scenario A: Full Settlement**
1. Finance receives TPA payment
2. Finance enters settlement in system: amount, payment reference, date
3. Status: SETTLED
4. Revenue posted to insurance revenue account

**Scenario B: Partial Settlement**
1. Finance records partial settlement amount
2. Status: PARTIALLY_SETTLED
3. Shortfall amount flagged for follow-up
4. Claims Manager contacts TPA for balance
5. If no resolution: Consider write-off process

**Scenario C: Rejection at Claim Stage**
1. TPA rejects final claim (different from pre-auth rejection)
2. Enter rejection reason
3. Status: CLAIM_REJECTED
4. Consider appeal within TPA appeal timeline
5. If appeal fails: write-off process with Finance

---

## 5. Key SLA Thresholds

| Event | SLA | Alert Trigger |
|---|---|---|
| Pre-auth submission | Within 1 hour of admission | None (user-driven) |
| TPA query response | 2 hours from receipt | 1-hour warning alert |
| Enhancement submission | Before discharge | 24-hour-before-discharge reminder |
| Claim package submission | Within 5 days of discharge | 3-day alert |
| TPA settlement follow-up | 30 days from submission | Auto-alert at 25 days |

---

## 6. Tasks for Gemini – Cashless Workflow

### Task: CW-001 – Pre-Authorization Form

**Objective:** Build the pre-auth request creation form

**Files likely created:**
- `src/pages/insurance/PreAuthForm.jsx`
- `src/components/insurance/DiagnosisSearch.jsx`
- `src/api/preauth.js`
- `src/models/PreAuthorization.js`

**Database Impact:** Creates record in `pre_authorizations` table

**API Impact:** `POST /api/v1/insurance/pre-auth`

**Validations:**
- ICD-10 code must exist in system
- Estimated cost > 0
- All required fields filled before submission

**Acceptance Criteria:**
- [ ] Form creates pre-auth in DRAFT status
- [ ] Submit to TPA changes status to SUBMITTED
- [ ] TPA response recording works for all scenarios (Approved/Partial/Query/Rejected)
- [ ] Enhancement request form available on pre-auth detail page
- [ ] All status changes logged in audit trail

---

*End of Cashless Workflow*
