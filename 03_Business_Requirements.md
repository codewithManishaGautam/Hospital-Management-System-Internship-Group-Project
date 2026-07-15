# 03 – Business Requirements Document (BRD)
## HMS Insurance Module

---

## 1. Executive Summary

The hospital processes hundreds of insurance cases monthly across multiple insurance companies and TPAs. The current process is manual, error-prone, and causes revenue leakage, patient dissatisfaction, and regulatory risk. This BRD captures all business requirements for the digital Insurance Module.

---

## 2. Business Context

### 2.1 Current State (AS-IS)

| Process | Current Method | Problem |
|---|---|---|
| Pre-authorization request | Phone/fax/email to TPA | Delay, no tracking |
| Document submission | Physical files or email | Loss, no version control |
| Claim status tracking | Phone calls to TPA | Time-consuming, inaccurate |
| Billing vs insurance | Manual reconciliation | Errors, disputes |
| Denial management | Ad-hoc follow-up | Revenue leakage |
| Reporting | Excel sheets | Outdated, inaccurate |

### 2.2 Future State (TO-BE)

| Process | Future Method | Benefit |
|---|---|---|
| Pre-authorization | Digital form submission with tracking | Fast, auditable |
| Document submission | Structured digital upload | No loss, version controlled |
| Claim status tracking | Real-time dashboard | Instant visibility |
| Billing vs insurance | Automated sync | Zero reconciliation errors |
| Denial management | Structured appeal workflow | Reduced revenue leakage |
| Reporting | Real-time dashboards | Accurate decisions |

---

## 3. Business Requirements

### BR-01: Insurance Master Management
The system must allow administrators to configure and maintain:
- Insurance companies (name, contact, IRDAI code, claim email, portal URL)
- TPAs (name, code, contact, services)
- Policy types (individual, floater, group, corporate, government)
- Plans with their sum insured, co-pay %, exclusions, waiting periods
- Room rent limits per plan
- Network status per plan

### BR-02: Patient Insurance Eligibility
The system must:
- Link any registered HMS patient to one or more insurance policies
- Support family floater policies with multiple members
- Track policy active dates and renewal status
- Record sum insured, available balance, and sub-limits
- Support corporate employees linked to employer group policies
- Allow manual eligibility verification with TPA reference

### BR-03: Pre-Authorization (Cashless)
The system must:
- Allow the insurance desk to initiate a pre-auth request for any admitted patient
- Capture all clinically required fields (diagnosis, treatment plan, estimated cost)
- Submit pre-auth to the correct TPA based on patient policy
- Track pre-auth status (Submitted, Query Raised, Approved, Partially Approved, Rejected)
- Allow enhancement requests when treatment cost exceeds approved amount
- Store authorization letters with reference numbers
- Alert team when TPA raises a query within 2 hours
- Escalate pending pre-auths automatically after configurable SLA breach

### BR-04: Cashless Claim Processing
The system must:
- Create a claim record linked to the pre-authorization
- Allow interim bill submissions during long admissions
- Generate final claim package at discharge
- Track approved amount vs billed amount
- Record co-pay collected from patient
- Track claim submission, acknowledgment, and settlement
- Record TPA settlement amount and date
- Flag shortfall amounts for follow-up

### BR-05: Reimbursement Claims
The system must:
- Allow registration of reimbursement claims from self-pay patients
- Generate a document checklist based on insurance company requirements
- Track document collection status
- Record claim submission with docket number
- Allow deficiency letter upload and response management
- Track claim status updates
- Record settlement amount and payment details

### BR-06: TPA Management
The system must:
- Maintain TPA-specific claim form templates
- Track pending claims per TPA
- Record TPA query responses with timestamps
- Generate TPA-specific reports
- Track TPA performance metrics (TAT, approval rate, settlement rate)

### BR-07: Corporate Insurance
The system must:
- Maintain corporate account master with credit limits
- Map employees to corporate policies
- Allow credit billing for corporate patients
- Generate monthly corporate billing statements
- Track outstanding balances per corporate account

### BR-08: Billing Integration
The system must:
- Show approved insurance amount on billing screen
- Prevent billing from exceeding approved amount without override
- Automatically calculate patient co-pay liability
- Support package billing aligned with insurance plan
- Trigger billing adjustment when enhancement is approved
- Show insurance vs cash split on final bill

### BR-09: Finance Integration
The system must:
- Record TPA payment receipts against claim settlement
- Track outstanding claims by aging (30/60/90/120+ days)
- Support write-off recording for denied claims
- Provide insurance revenue summary for monthly P&L
- Generate receivables report per TPA

### BR-10: Document Management
The system must:
- Allow upload of insurance documents by category
- Enforce mandatory document checklist per claim type
- Maintain version history for re-submitted documents
- Track document expiry (policy cards, ID proofs)
- Provide secure, role-restricted document access
- Log every document view and download action

### BR-11: Reporting & Analytics
The system must provide:
- Daily pre-auth pending report
- Claim status summary by TPA
- Monthly insurance revenue report
- Rejection rate analysis by reason
- TPA performance dashboard
- Outstanding claims aging report
- Document pending report
- Corporate billing summary

### BR-12: Notifications
The system must send alerts for:
- Pre-auth submitted (confirmation to desk executive)
- TPA query received (urgent alert within 15 minutes)
- Authorization approved/rejected (immediate)
- Claim submission deadline approaching (48 hours before)
- Policy expiry approaching (30 days before)
- Document expiry (30 days before)
- Settlement received

### BR-13: Audit & Compliance
The system must:
- Log every action on every claim with user, timestamp, and change detail
- Maintain immutable audit trail
- Support audit report generation
- Allow read-only access for auditors
- Retain all records for minimum 7 years

---

## 4. Business Rules

| Rule ID | Rule Description |
|---|---|
| BRU-01 | No cashless claim can be processed without an approved pre-authorization |
| BRU-02 | Final bill cannot exceed approved amount + enhancement without manager override |
| BRU-03 | Reimbursement claims must be submitted within 30 days of discharge |
| BRU-04 | Pre-auth requests must be submitted at least 24 hours before planned procedure |
| BRU-05 | Enhancement requests must be submitted before discharge |
| BRU-06 | Co-pay must be collected before patient discharge |
| BRU-07 | Denied claims must have a denial reason recorded before closure |
| BRU-08 | Policy must be active on date of admission for cashless eligibility |
| BRU-09 | Room rent exceeding plan limit must trigger patient liability calculation |
| BRU-10 | Corporate credit billing requires corporate account to have available credit limit |

---

## 5. Regulatory Requirements

| Requirement | Standard |
|---|---|
| Patient data privacy | DPDP Act 2023 (India) |
| Insurance regulatory compliance | IRDAI guidelines |
| Medical record retention | MCI / NMC guidelines (minimum 3 years, best practice 7 years) |
| Audit trail | Required for accreditation (NABH/JCI) |
| Cashless facility | As per network hospital agreement |

---

## 6. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| Q1 | Which TPAs are currently empaneled? | Insurance Dept | Open |
| Q2 | Are there any existing TPA portal integrations? | IT Dept | Open |
| Q3 | What is the current ERP/finance system? | Finance Dept | Open |
| Q4 | What are the corporate account credit limits? | Finance Dept | Open |
| Q5 | Is ABDM integration required in Phase 1? | Management | Decided: Phase 2 |

---

*End of BRD*
