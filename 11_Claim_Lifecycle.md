# 11 – Claim Lifecycle
## HMS Insurance Module

---

## 1. Claim Types Summary

| Claim Type | Description | Who Receives Settlement |
|---|---|---|
| Cashless | Hospital submits, TPA pays hospital directly | Hospital |
| Reimbursement | Patient pays, submits claim, TPA pays patient | Patient |
| TPA Claim | Claim processed through TPA intermediary | Hospital or Patient |
| Corporate | Employer's insurer settles; may go through TPA | Hospital (credit billing) |

---

## 2. Master Claim Lifecycle (All Types)

```
                    ┌─────────────────────────────────┐
                    │         CLAIM CREATED            │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │       DOCUMENTS COLLECTED        │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │         CLAIM REVIEWED           │
                    │     (Internal Quality Check)     │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │       SUBMITTED TO TPA           │
                    └─────────────────┬───────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
    ┌─────────▼────────┐   ┌─────────▼────────┐   ┌─────────▼────────┐
    │  DEFICIENCY /    │   │   UNDER REVIEW   │   │    SETTLEMENT    │
    │  QUERY RAISED    │   │    (Pending TPA)  │   │    RECEIVED      │
    └─────────┬────────┘   └─────────┬────────┘   └─────────┬────────┘
              │                      │                       │
              │ Response             │                ┌──────┴──────┐
              │ submitted        Settlement           │             │
              │                 or Rejection     SETTLED      PARTIAL
              └──────────────►       │          (CLOSED)       SETTLED
                                     │                             │
                              ┌──────┴──────┐                     │
                              │             │                SHORTFALL
                           SETTLED      REJECTED              FOLLOW-UP
                                            │
                                      APPEAL FILED
                                            │
                                  ┌─────────┴─────────┐
                                  │                   │
                           APPEAL SETTLED      APPEAL REJECTED
                                                      │
                                                  WRITE-OFF
```

---

## 3. Claim Statuses Reference Table

| Status Code | Display Name | Description |
|---|---|---|
| INITIATED | Initiated | Pre-auth or claim record created |
| DRAFT | Draft | Being filled, not yet submitted |
| DOCS_PENDING | Documents Pending | Waiting for document collection |
| DOCS_COMPLETE | Documents Complete | All documents uploaded |
| INTERNAL_REVIEW | Under Internal Review | Claims Manager reviewing before submission |
| SUBMITTED | Submitted to TPA | Sent to TPA/insurer |
| ACKNOWLEDGED | Acknowledged by TPA | TPA confirms receipt |
| QUERY_RAISED | Query Raised | TPA has questions |
| RESPONDED | Response Submitted | Hospital/patient has responded to query |
| UNDER_REVIEW | Under TPA Review | TPA is processing |
| APPROVED | Approved | Pre-auth approved by TPA |
| PARTIALLY_APPROVED | Partially Approved | TPA approved a lesser amount |
| REJECTED | Rejected | TPA has rejected |
| CLAIM_CREATED | Claim Created | Cashless claim created from approved pre-auth |
| INTERIM_SUBMITTED | Interim Bill Submitted | Interim bill sent during long admission |
| FINAL_SUBMITTED | Final Bill Submitted | Complete claim package sent |
| DEFICIENCY_RAISED | Deficiency Raised | TPA found documents incomplete |
| DEFICIENCY_RESPONDED | Deficiency Responded | Additional documents submitted |
| SETTLED | Settled | Full payment received/confirmed |
| PARTIALLY_SETTLED | Partially Settled | Partial payment received |
| SHORTFALL_PENDING | Shortfall Pending | Following up for remaining amount |
| APPEAL_FILED | Appeal Filed | Formal appeal submitted to TPA |
| APPEAL_SETTLED | Appeal Settled | Appeal resulted in payment |
| APPEAL_REJECTED | Appeal Rejected | TPA rejected the appeal |
| WRITTEN_OFF | Written Off | Amount written off by Finance |
| CLOSED | Closed | Claim fully resolved and closed |
| CANCELLED | Cancelled | Claim withdrawn |

---

## 4. Claim Entity Relationships

```
PATIENT
  └──► PATIENT_INSURANCE_POLICY
              └──► PRE_AUTHORIZATION
                          ├──► ENHANCEMENT_REQUESTS (0..n)
                          ├──► PREAUTH_COMMUNICATION_LOGS (0..n)
                          └──► CASHLESS_CLAIM (0..1)
                                      ├──► INTERIM_BILLS (0..n)
                                      ├──► FINAL_BILL (1)
                                      └──► CLAIM_SETTLEMENT (0..1)

PATIENT_INSURANCE_POLICY
  └──► REIMBURSEMENT_CLAIM
              ├──► REIMBURSEMENT_DOCUMENTS
              ├──► DEFICIENCY_RECORDS
              └──► REIMBURSEMENT_SETTLEMENT

CASHLESS_CLAIM or REIMBURSEMENT_CLAIM
  └──► APPEAL_RECORDS (0..1)
              └──► APPEAL_SETTLEMENT

ALL CLAIMS
  └──► CLAIM_AUDIT_LOG (immutable, append-only)
```

---

## 5. Claim Number Format

| Claim Type | Format | Example |
|---|---|---|
| Pre-Authorization | PA-YYYY-NNNNN | PA-2025-00123 |
| Cashless Claim | CC-YYYY-NNNNN | CC-2025-00456 |
| Reimbursement Claim | RM-YYYY-NNNNN | RM-2025-00789 |
| Enhancement Request | ENH-PA-ID-N | ENH-00123-1 |
| Appeal | APL-CLAIM-ID | APL-CC-00456 |

---

## 6. Financial Tracking per Claim

Every claim must track these financial fields:

| Field | Description |
|---|---|
| Estimated Amount | Initial estimate at pre-auth |
| Approved Amount | TPA approved amount |
| Enhanced Amount | Additional amount approved via enhancement |
| Total Approved | Approved + Enhanced |
| Billed Amount | Actual hospital bill |
| Non-Payable Amount | Amount excluded by insurer (cosmetics, food, etc.) |
| Payable Amount | Billed – Non-Payable |
| Co-Pay Amount | Patient's share per policy |
| Settled Amount | Actual TPA payment received |
| Shortfall Amount | Total Approved – Settled |
| Written-Off Amount | Amount written off if shortfall unrecovered |

**Formula Reference:**
```
Co-Pay Amount = Payable Amount × Co-Pay %
Insurance Payable = Payable Amount – Co-Pay Amount
Patient Total Liability = Co-Pay Amount + (Billed Amount – Payable Amount)
Shortfall = Insurance Payable – Settled Amount
```

---

## 7. Claim Audit Trail Requirements

Every state change must log:

| Field | Description |
|---|---|
| claim_id | Reference to the claim |
| claim_type | CASHLESS / REIMBURSEMENT / PRE_AUTH |
| action | Status changed, document uploaded, query responded, etc. |
| previous_status | Before change |
| new_status | After change |
| performed_by | User ID |
| user_name | Denormalized name |
| user_role | Role at time of action |
| ip_address | Client IP |
| timestamp | UTC timestamp |
| notes | Free-text notes |
| document_id | If action involves a document |

**Immutability:** Audit logs are INSERT-only. No UPDATE or DELETE allowed on this table.

---

## 8. Claim Closure Criteria

A claim can be CLOSED when any of these conditions are met:

| Condition | Required Action |
|---|---|
| Full settlement received | Finance records payment; Claim closed |
| Write-off approved | Manager approves write-off; Finance records; Claim closed |
| Claim withdrawn by patient | Reason recorded; Claim cancelled |
| Successful appeal settled | Appeal settlement recorded; Claim closed |

---

## 9. Tasks for Gemini – Claim Lifecycle

### Task: CL-001 – Unified Claim Tracking Dashboard

**Objective:** Build a dashboard showing all claims across types with filtering

**Files likely created:**
- `src/pages/insurance/ClaimDashboard.jsx`
- `src/components/insurance/ClaimStatusBadge.jsx`
- `src/api/claims.js`

**API Impact:**
- `GET /api/v1/insurance/claims?type=ALL&status=ALL&from=DATE&to=DATE`

**Acceptance Criteria:**
- [ ] All claim types shown in unified view
- [ ] Filter by: type, status, date range, TPA, patient
- [ ] Status badges color-coded by urgency
- [ ] Pending alerts highlighted
- [ ] Export to CSV available

---

*End of Claim Lifecycle*
