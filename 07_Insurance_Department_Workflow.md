# 07 – Insurance Department Workflow
## HMS Insurance Module

---

## 1. Overview

This document maps how the Insurance Department operates in a multi-specialty hospital, covering all claim types (cashless, reimbursement, TPA) and all case types (planned, emergency, day care). These workflows are the ground truth that the software must replicate digitally.

---

## 2. Department Structure

```
Insurance Department
├── Insurance Desk (OPD/IPD counters)
│   └── Insurance Desk Executives (patient registration, pre-auth initiation)
├── Pre-Authorization Cell
│   └── Claims Executives (pre-auth follow-up, TPA communication)
├── Claims Processing Team
│   └── Claims Managers (claim creation, bill submission, settlement)
└── Finance Liaison
    └── Finance Officers (settlement posting, reconciliation)
```

---

## 3. Patient Insurance Journey (High Level)

```
PATIENT ARRIVES
      │
      ▼
Step 1: Insurance Verification
      │ Insurance desk checks if patient has active policy
      │ Verifies policy details with TPA (phone/portal)
      ▼
Step 2: Policy Registration
      │ Link policy to HMS patient record
      │ Upload insurance card
      ▼
Step 3A (Cashless)       │       Step 3B (Reimbursement)
Pre-Authorization        │       Patient self-pays
Request                  │       Plans to claim later
      │                  │
      ▼                  │
Step 4A: TPA Processing  │       Step 4B: Discharge
Auth letter received     │       Documents collected
      │                  │
      ▼                  │
Step 5A: Cashless        │       Step 5B: Claim Registration
Treatment & Billing      │       Post-discharge claim filed
      │                  │
      ▼                  ▼
Step 6: Discharge Coordination
      │ Final bill generated, co-pay collected
      ▼
Step 7: Claim Submission
      │ Complete claim package submitted to TPA
      ▼
Step 8: TPA Processing
      │ TPA reviews, may raise queries
      ▼
Step 9: Settlement
      │ TPA pays hospital
      ▼
Step 10: Reconciliation
      Finance reconciles and posts
```

---

## 4. Daily Insurance Desk Workflow

### Morning (8 AM – 10 AM)
1. Review pending pre-auth requests from previous day
2. Follow up with TPAs for pending authorizations (calls, portal checks)
3. Check alerts for new TPA queries on active cases
4. Update pre-auth status in system based on TPA responses

### During the Day
1. Receive new patients at insurance counter
2. Verify insurance card and policy
3. Register patient insurance in HMS
4. Initiate pre-auth for new admissions
5. Respond to TPA queries within 2 hours of receipt
6. Coordinate with ward for document collection
7. Inform billing of approved amounts

### End of Day (4 PM – 5 PM)
1. Review all pending pre-auth requests
2. Escalate any stuck pre-auths to Claims Manager
3. Update discharge planning team for patients due to be discharged
4. Ensure all co-pay amounts are confirmed to billing

---

## 5. Pre-Authorization Workflow (Planned Admission)

```
1. Patient scheduled for admission (from OPD / surgery planning)
      │
      ▼
2. Insurance desk receives advance intimation
      │ (minimum 24 hours before planned admission)
      ▼
3. Collect patient insurance details
      │
      ▼
4. Verify policy validity and benefit applicability
      │
      ▼
5. Prepare pre-auth request form
      │ Diagnosis, ICD-10 code, planned procedure, estimated cost
      │ Ward type, expected length of stay
      ▼
6. Attach supporting documents
      │ Treating doctor's certificate, investigation reports, prescription
      ▼
7. Submit pre-auth to TPA (portal/email/fax)
      │
      ▼
8. TPA acknowledges and assigns reference number
      │
      ▼
9. TPA reviews (usual TAT: 2–4 hours planned, 1 hour emergency)
      │
      ├── APPROVED ──────────────────────────────►  Record auth letter number
      │                                             Upload auth letter
      │                                             Inform ward and billing
      │
      ├── PARTIALLY APPROVED ──────────────────►   Record partial amount
      │                                             Decide: accept or appeal
      │                                             Inform patient of balance liability
      │
      ├── QUERY RAISED ────────────────────────►   Read query, collect information
      │                                             Respond to TPA within 2 hours
      │                                             Loop back to TPA review
      │
      └── REJECTED ───────────────────────────►    Record rejection reason
                                                    Assess appeal possibility
                                                    Inform patient (may shift to reimbursement)
```

---

## 6. Pre-Authorization Workflow (Emergency Admission)

```
1. Patient admitted directly to Emergency / ICU
      │
      ▼
2. Insurance desk informed immediately (within 1 hour of admission)
      │
      ▼
3. Verify patient's insurance card (or contact family)
      │
      ▼
4. Submit emergency pre-auth intimation to TPA
      │ (Emergency intimation: simplified form, within 24 hours of admission)
      ▼
5. TPA processes emergency auth (faster TAT: 1–2 hours)
      │
      ▼
6. Continue treatment, bill under approval pending
      │
      ▼
7. Full pre-auth submitted once patient is stable
      │
      ▼
8. Continue with standard cashless workflow
```

---

## 7. Cashless Claim Discharge Workflow

```
1. Treating doctor confirms patient is ready for discharge
      │
      ▼
2. Nursing staff informs insurance desk
      │
      ▼
3. Insurance desk checks:
      │ - Pre-auth approval in place
      │ - Approved amount vs estimated bill
      │ - Any enhancement needed?
      ▼
4. If treatment cost > approved amount:
      │ Submit enhancement request to TPA
      │ Wait for additional approval (or collect co-pay for excess)
      ▼
5. Billing team prepares final bill
      │
      ▼
6. Insurance desk reviews bill:
      │ - Check room rent limits
      │ - Check excluded items
      │ - Calculate patient co-pay liability
      ▼
7. Patient/attendant briefed on co-pay amount
      │
      ▼
8. Patient pays co-pay to billing
      │
      ▼
9. Insurance desk creates final claim package:
      │ - Discharge summary (from EMR)
      │ - Final bill
      │ - Investigation reports
      │ - Pharmacy bills
      │ - Authorization letter
      │ - Pre-auth form copy
      │ - Patient identity documents
      ▼
10. Claim submitted to TPA (portal/physically)
      │
      ▼
11. Claim acknowledgment received, docket number recorded
      │
      ▼
12. Patient discharged
```

---

## 8. TPA Query Response Workflow

```
TPA raises a query on pre-auth or claim
      │
      ▼
System sends alert to insurance desk (real-time)
      │
      ▼
Insurance desk reads query
      │
      ├── Clinical query ──────────────► Contact treating doctor
      │                                   Get clinical justification
      │                                   Prepare response
      │
      └── Document query ─────────────► Collect missing documents
                                         Prepare response
      │
      ▼
Response submitted to TPA (within 2 hours SLA)
      │
      ▼
Response recorded in system with timestamp
      │
      ▼
TPA reviews response → Auth decision resumes
```

---

## 9. Reimbursement Claim Workflow

```
Patient self-pays treatment (no pre-auth / policy not accepted cashless)
      │
      ▼
Patient requests reimbursement from insurance after discharge
      │
      ▼
Insurance desk registers reimbursement claim in system
      │
      ▼
System generates document checklist for patient's insurance company
      │
      ▼
Patient/family collects and submits documents:
      - Original discharge summary
      - Original bills and receipts
      - Investigation reports
      - Prescription
      - Identity proof
      - Insurance card copy
      - Claim form (duly signed)
      ▼
Insurance desk verifies documents against checklist
      │
      ▼
Complete set: Submit to TPA/Insurance Company
      │
      Incomplete: Issue deficiency letter
      │           Patient submits missing documents
      │           Re-verify and resubmit
      ▼
Claim submitted, docket number recorded in system
      │
      ▼
TPA processes claim (TAT: 30–45 days standard)
      │
      ├── TPA raises deficiency letter
      │   └── Hospital/patient responds with additional documents
      │
      ├── TPA settles claim
      │   └── Settlement amount recorded
      │   └── Finance reconciles
      │
      └── TPA rejects claim
          └── Reason recorded
          └── Appeal assessed
```

---

## 10. Exception Scenarios

| Exception | Handling |
|---|---|
| Patient does not have physical insurance card | Verify via TPA portal, note verbal confirmation, follow up with card |
| Policy expired on day of admission | Cannot process cashless; advise patient to contact insurer; may process as reimbursement |
| TPA does not respond within SLA | Escalate to Claims Manager; consider emergency authorization letter; notify hospital management |
| Enhancement rejected by TPA | Collect excess from patient; document reason; consider appeal |
| Discharge at night (outside office hours) | Duty manager / on-call insurance staff handles; system records action |
| Patient refuses to pay co-pay | Flag in system; billing holds discharge; escalate to administrator |
| Wrong diagnosis code submitted | Correction request to TPA; document revised submission |
| TPA portal down | Manual fax/email submission; record in system as "offline submission"; follow up when portal restores |

---

*End of Insurance Department Workflow*
