# 19 — Sequence Diagrams
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager

---

## 1. Overview

This document describes the sequence of system interactions for the most critical workflows in the HMS Insurance Module. Each diagram shows the actor, the system components involved, the data flow, and the expected outcomes. Gemini should use these as the blueprint for implementing service-layer logic.

---

## 2. Workflow 1: Patient Insurance Card Registration & Verification

**Actors:** Desk Staff, Insurance Coordinator  
**Systems:** HMS Frontend, Insurance API, PostgreSQL, Notification Service

```
Desk Staff          Frontend           Insurance API          DB            Notification
    │                   │                    │                 │                 │
    │ Open Registration  │                   │                 │                 │
    │──────────────────▶│                   │                 │                 │
    │                   │ Search Patient     │                 │                 │
    │                   │───────────────────▶                 │                 │
    │                   │◀─── Patient Data ──│                 │                 │
    │ Fill Policy Details│                   │                 │                 │
    │──────────────────▶│                   │                 │                 │
    │                   │ POST /patient-cards│                 │                 │
    │                   │───────────────────▶│                 │                 │
    │                   │                   │ Validate request │                 │
    │                   │                   │─────────────────▶                 │
    │                   │                   │ INSERT card record│                │
    │                   │                   │◀─── Card ID ─────│                │
    │                   │                   │ INSERT family members              │
    │                   │                   │ CREATE audit log  │                │
    │                   │                   │ Trigger notification               │
    │                   │                   │────────────────────────────────────▶
    │                   │                   │                 │     Send SMS to patient
    │                   │◀── 201 Card ID ───│                 │     "Card registered, pending verification"
    │◀─── Success ──────│                   │                 │                 │
    │                   │                   │                 │                 │
    ║  [Later] Insurance Coordinator logs in ║                 │                 │
    │                   │                   │                 │                 │
    Coordinator         │ View Pending Cards │                 │                 │
    │──────────────────▶│ GET /patient-cards?verification_status=PENDING         │
    │                   │───────────────────▶│                 │                 │
    │                   │◀─── Card List ─────│                 │                 │
    │ Select Card        │                   │                 │                 │
    │──────────────────▶│                   │                 │                 │
    │                   │ POST /patient-cards/:id/verify       │                 │
    │                   │───────────────────▶│                 │                 │
    │                   │                   │ UPDATE card status = VERIFIED       │
    │                   │                   │ CREATE audit log  │                │
    │                   │                   │ Trigger notification               │
    │                   │                   │────────────────────────────────────▶
    │                   │                   │                 │  Notify Desk Staff: "Card verified"
    │                   │◀── 200 Success ────│                 │                 │
    │◀─── Verified ─────│                   │                 │                 │
```

---

## 3. Workflow 2: Cashless Pre-Authorization (Complete Flow)

**Actors:** Desk Staff, Insurance Coordinator, TPA (external)  
**Duration:** Target < 2 hours for response

```
Desk Staff        Frontend           Insurance API        DB         TPA/Insurer    Notification
    │                 │                    │               │               │              │
    │ Start Pre-Auth  │                    │               │               │              │
    │────────────────▶│                    │               │               │              │
    │                 │ Search Patient      │               │               │              │
    │                 │────────────────────▶               │               │              │
    │                 │◀── Patient + Cards ─│               │               │              │
    │ Select Card     │                    │               │               │              │
    │────────────────▶│                    │               │               │              │
    │                 │ POST /preauth (DRAFT│               │               │              │
    │                 │────────────────────▶               │               │              │
    │                 │                    │ Check card VERIFIED           │              │
    │                 │                    │ Check remaining SI            │              │
    │                 │                    │ INSERT pre_auth DRAFT         │              │
    │                 │◀── PA-2024-00123 ───│               │               │              │
    │ Upload Documents│                    │               │               │              │
    │────────────────▶│                    │               │               │              │
    │                 │ POST /preauth/:id/documents         │               │              │
    │                 │────────────────────▶               │               │              │
    │                 │                    │ Virus scan     │               │              │
    │                 │                    │ Upload to S3   │               │              │
    │                 │                    │ INSERT doc record              │              │
    │                 │◀── Doc uploaded ────│               │               │              │
    │ Click Submit    │                    │               │               │              │
    │────────────────▶│                    │               │               │              │
    │                 │ POST /preauth/:id/submit            │               │              │
    │                 │────────────────────▶               │               │              │
    │                 │                    │ Validate docs checklist       │              │
    │                 │                    │ UPDATE status = SUBMITTED     │              │
    │                 │                    │ INSERT status log             │              │
    │                 │                    │ Trigger notification ─────────────────────────▶
    │                 │                    │                               │  Alert: New Pre-Auth Received
    │                 │◀── Status: SUBMITTED│               │               │              │
    │◀── Submitted ───│                    │               │               │              │
    │                 │                    │               │               │              │
    ║        [Staff contacts TPA / TPA portal response]                    │              │
    │                 │                    │               │               │              │
    │ Enter TPA Response                   │               │               │              │
    │────────────────▶│                    │               │               │              │
    │                 │ PUT /preauth/:id/tpa-response       │               │              │
    │                 │────────────────────▶               │               │              │
    │                 │                    │ Validate status transition     │              │
    │                 │                    │ UPDATE status = APPROVED       │              │
    │                 │                    │ Store auth number              │              │
    │                 │                    │ UPDATE status log              │              │
    │                 │                    │ Trigger notification ─────────────────────────▶
    │                 │                    │                               │ SMS to patient:
    │                 │                    │                               │ "Pre-auth approved ₹70,000"
    │                 │                    │                               │ Alert Billing: Ready to proceed
    │                 │◀── Status: APPROVED │               │               │              │
    │◀─── Approved ───│                    │               │               │              │
```

---

## 4. Workflow 3: Cashless Claim Submission

**Follows:** Approved pre-authorization, patient discharge

```
Billing Dept       Frontend           Insurance API        DB          Finance API      Notification
    │                  │                    │               │               │               │
    │ Finalize Bill     │                    │               │               │               │
    │─────────────────▶│                    │               │               │               │
    │                  │ POST /claims       │               │               │               │
    │                  │────────────────────▶               │               │               │
    │                  │                    │ Fetch preauth  │               │               │
    │                  │                    │ Validate auth number valid    │               │
    │                  │                    │ Validate claim amount ≤ approved              │
    │                  │                    │ INSERT claim_headers = DRAFT  │               │
    │                  │                    │ INSERT claim_items            │               │
    │                  │◀── CLM-2024-00001 ──│               │               │               │
    │ Upload Documents │                    │               │               │               │
    │─────────────────▶│                    │               │               │               │
    │                  │ POST /claims/:id/documents         │               │               │
    │                  │────────────────────▶               │               │               │
    │                  │◀── Docs uploaded ───│               │               │               │
    │ Click Submit     │                    │               │               │               │
    │─────────────────▶│                    │               │               │               │
    │                  │ POST /claims/:id/submit            │               │               │
    │                  │────────────────────▶               │               │               │
    │                  │                    │ Checklist: all required docs? │               │
    │                  │                    │ UPDATE status = SUBMITTED     │               │
    │                  │                    │ INSERT status log             │               │
    │                  │                    │ Notify insurance team ─────────────────────────▶
    │                  │◀── Submitted ───────│               │               │               │
    │                  │                    │               │               │               │
    ║ [TPA processes — staff enters TPA decision] ║         │               │               │
    │                  │                    │               │               │               │
    │ Record Settlement│                    │               │               │               │
    │─────────────────▶│                    │               │               │               │
    │                  │ PUT /claims/:id/settlement         │               │               │
    │                  │────────────────────▶               │               │               │
    │                  │                    │ UPDATE amounts  │               │               │
    │                  │                    │ UPDATE status = APPROVED       │               │
    │                  │◀── Updated ─────────│               │               │               │
    │                  │                    │               │               │               │
    │ Record Payment   │                    │               │               │               │
    │─────────────────▶│                    │               │               │               │
    │                  │ POST /claims/:id/payments          │               │               │
    │                  │────────────────────▶               │               │               │
    │                  │                    │ INSERT payment record         │               │
    │                  │                    │ UPDATE status = SETTLED       │               │
    │                  │                    │ Trigger Finance posting ───────────────────────▶
    │                  │                    │                               │ Create GL entry
    │                  │                    │                               │ Debit: Insurance Receivable
    │                  │                    │                               │ Credit: Revenue A/c
    │                  │                    │◀───── Finance Entry ID ────────│               │
    │                  │                    │ Store finance_entry_id        │               │
    │                  │                    │ UPDATE posted_to_finance=TRUE │               │
    │                  │◀── Settled ─────────│               │               │               │
    │◀─── Claim Settled│                    │               │               │               │
```

---

## 5. Workflow 4: Reimbursement Claim Processing

```
Patient / OPD Desk   Frontend         Insurance API          DB         Notification
    │                    │                 │                  │               │
    │ Walk-in with        │                 │                  │               │
    │ Discharge Summary   │                 │                  │               │
    │────────────────────▶│                 │                  │               │
    │                    │ Search Patient   │                  │               │
    │                    │─────────────────▶                  │               │
    │                    │◀── Patient ──────│                  │               │
    │                    │ POST /claims (type=REIMBURSEMENT)   │               │
    │                    │─────────────────▶                  │               │
    │                    │                 │ No preauth required              │
    │                    │                 │ Create claim in DRAFT            │
    │                    │◀── CLM number ───│                  │               │
    │ Upload All Bills,   │                 │                  │               │
    │ Discharge Summary,  │                 │                  │               │
    │ Investigation Reports│                │                  │               │
    │────────────────────▶│                 │                  │               │
    │                    │ POST /claims/:id/documents (multiple)              │
    │                    │─────────────────▶                  │               │
    │                    │◀── All Docs OK ──│                  │               │
    │ Click Submit        │                 │                  │               │
    │────────────────────▶│                 │                  │               │
    │                    │ POST /claims/:id/submit             │               │
    │                    │─────────────────▶                  │               │
    │                    │                 │ Validate document checklist      │
    │                    │                 │ UPDATE SUBMITTED   │               │
    │                    │◀── Submitted ────│                  │               │
    │                    │                 │ Notify insurance team ────────────▶
    │                    │                 │                  │ "New reimbursement claim received"
    │                    │                 │                  │               │
    ║  Insurance Coordinator dispatches physical documents to TPA by courier  │
    │                    │                 │                  │               │
    │ Enter Dispatch Details               │                  │               │
    │────────────────────▶│                 │                  │               │
    │                    │ PUT /claims/:id (add courier_reference, dispatch_date)
    │                    │─────────────────▶                  │               │
    │                    │◀── Updated ──────│                  │               │
```

---

## 6. Workflow 5: TPA Query Response

```
Insurance Staff       Frontend         Insurance API           DB          Notification
    │                    │                  │                   │               │
    │ Receive Email from  │                  │                   │               │
    │ TPA: Query on Claim │                  │                   │               │
    │                    │                  │                   │               │
    │ Open Claim          │                  │                   │               │
    │────────────────────▶│                  │                   │               │
    │                    │ GET /claims/:id   │                   │               │
    │                    │──────────────────▶                   │               │
    │                    │◀── Claim Detail ──│                   │               │
    │ Click "Record Query"│                  │                   │               │
    │────────────────────▶│                  │                   │               │
    │ Enter Query Details │                  │                   │               │
    │────────────────────▶│                  │                   │               │
    │                    │ POST /claims/:id/queries             │               │
    │                    │──────────────────▶                   │               │
    │                    │                  │ INSERT query record│               │
    │                    │                  │ UPDATE claim status = QUERIED     │
    │                    │                  │ Notify manager ────────────────────▶
    │                    │                  │                   │ "Claim QUERIED — action needed"
    │                    │◀── Query Recorded │                   │               │
    │                    │                  │                   │               │
    ║  Staff collects response documents                        │               │
    │                    │                  │                   │               │
    │ Upload Response Docs│                  │                   │               │
    │────────────────────▶│                  │                   │               │
    │                    │ POST /claims/:id/documents           │               │
    │                    │──────────────────▶                   │               │
    │ Submit Response     │                  │                   │               │
    │────────────────────▶│                  │                   │               │
    │                    │ POST /claims/:id/queries/:qId/respond│               │
    │                    │──────────────────▶                   │               │
    │                    │                  │ UPDATE query status = RESPONDED   │
    │                    │                  │ UPDATE claim status = QUERY_RESPONDED
    │                    │                  │ INSERT status log  │               │
    │                    │                  │ Notify TPA (if API available) ─────▶
    │                    │◀── Response Sent ─│                   │               │
```

---

## 7. Workflow 6: Scheduled System Jobs

**These run as background cron jobs — no UI interaction**

```
Scheduler           Insurance API          DB                 Notification
    │                    │                  │                      │
    │  [Nightly 11:30 PM]│                  │                      │
    │ Trigger: Card Expiry Check            │                      │
    │────────────────────▶                  │                      │
    │                    │ SELECT cards WHERE policy_end_date < today AND status = VERIFIED
    │                    │──────────────────▶                      │
    │                    │◀── Expired cards ─│                      │
    │                    │ BATCH UPDATE status = EXPIRED            │
    │                    │ INSERT status logs │                      │
    │                    │ Trigger Notifications ────────────────────▶
    │                    │                  │  Alert: "Policy expired for [patient]"
    │                    │                  │                      │
    │  [Nightly 11:00 PM]│                  │                      │
    │ Trigger: PreAuth Expiry Check         │                      │
    │────────────────────▶                  │                      │
    │                    │ SELECT preauth WHERE valid_to < today AND status = APPROVED
    │                    │──────────────────▶                      │
    │                    │◀── Expired preauths                     │
    │                    │ BATCH UPDATE status = EXPIRED            │
    │                    │ Notify desk staff ────────────────────────▶
    │                    │                  │  Alert: "Pre-auth expired"
    │                    │                  │                      │
    │  [Daily 9:00 AM]   │                  │                      │
    │ Trigger: TAT Breach Alert             │                      │
    │────────────────────▶                  │                      │
    │                    │ SELECT preauth WHERE status=SUBMITTED    │
    │                    │   AND submission_date < NOW - TPA TAT    │
    │                    │──────────────────▶                      │
    │                    │◀── Breached preauths                    │
    │                    │ Notify insurance manager ─────────────────▶
    │                    │                  │  Escalation: "TPA TAT breached"
    │                    │                  │                      │
    │  [Daily 8:00 AM]   │                  │                      │
    │ Trigger: Policy Expiry Warning (30 days)                     │
    │────────────────────▶                  │                      │
    │                    │ SELECT cards WHERE policy_end_date BETWEEN today AND today+30
    │                    │──────────────────▶                      │
    │                    │◀── Expiring cards │                      │
    │                    │ Notify desk staff + patient ──────────────▶
    │                    │                  │  Warning: "Policy expiring in X days"
```

---

## 8. Workflow 7: Finance Integration on Claim Settlement

```
Insurance API       Finance API          GL System          DB
    │                   │                    │               │
    │ Payment Recorded   │                    │               │
    │ (Claim SETTLED)    │                    │               │
    │──────────────────▶│                    │               │
    │                   │ Create GL Entry     │               │
    │                   │────────────────────▶               │
    │                   │                    │ Debit: Insurance Receivable A/c
    │                   │                    │ Credit: Revenue A/c
    │                   │                    │ Narration: [Claim#] [Company] [Patient]
    │                   │◀─── GL Entry ID ────│               │
    │◀── Finance Entry ID│                    │               │
    │                   │                    │               │
    │ UPDATE claim_headers SET finance_entry_id = X, posted_to_finance = TRUE
    │─────────────────────────────────────────────────────────▶
    │                   │                    │ UPDATE claim_payments SET posted_to_finance = TRUE
```

---

## 9. Sequence Diagram Implementation Notes for Gemini

| Area | Guideline |
|------|-----------|
| API calls | Use Axios with interceptors for JWT and error handling |
| Database transactions | Use PostgreSQL transactions for multi-table operations |
| Notifications | Use a queue (Bull/Redis) — never call notification service inline |
| Finance integration | Fire-and-forget queue message; do not block claim API response |
| Scheduled jobs | Use node-cron or pg_cron; log every job run to a `scheduler_logs` table |
| Error handling | All failures must be caught, logged, and return structured error response |
| Idempotency | All POST endpoints must check for duplicate submissions before inserting |
