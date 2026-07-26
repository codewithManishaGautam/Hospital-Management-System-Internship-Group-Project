# 04 – Functional Requirements Specification (FRS)
## HMS Insurance Module

---

## 1. Introduction

This document defines every functional requirement the HMS Insurance Module must satisfy. Each requirement is uniquely numbered, tagged by module, and prioritized.

**Priority Legend:**
- P0 = Must Have (system cannot function without it)
- P1 = Should Have (required for business operations)
- P2 = Nice to Have (enhances experience)

---

## 2. Insurance Master Management

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-IM-001 | System shall allow creation of insurance company records with name, IRDAI code, contact, email, portal URL | P0 |
| FR-IM-002 | System shall allow creation of TPA records linked to one or more insurance companies | P0 |
| FR-IM-003 | System shall allow creation of policy type master (Individual, Floater, Group, Corporate, Government) | P0 |
| FR-IM-004 | System shall allow creation of insurance plans with sum insured, room rent limit, co-pay %, ICU limit, and exclusion list | P0 |
| FR-IM-005 | System shall allow marking a policy plan as active or inactive | P0 |
| FR-IM-006 | System shall maintain a list of network hospitals per insurance company | P1 |
| FR-IM-007 | System shall allow configuration of claim submission TAT (turnaround time) per TPA | P1 |
| FR-IM-008 | System shall allow uploading TPA empanelment agreements | P1 |
| FR-IM-009 | System shall support bulk import of insurance master data via CSV | P2 |
| FR-IM-010 | System shall log all changes to master data with user and timestamp | P0 |

---

## 3. Patient Insurance Registration

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-PIR-001 | System shall allow linking a registered HMS patient to an insurance policy | P0 |
| FR-PIR-002 | System shall capture policy number, group number, member ID, policy holder name, and policy validity dates | P0 |
| FR-PIR-003 | System shall support family floater policies with multiple members | P0 |
| FR-PIR-004 | System shall allow attaching a scanned insurance card and policy document | P0 |
| FR-PIR-005 | System shall alert the desk when a policy is within 30 days of expiry | P1 |
| FR-PIR-006 | System shall track sum insured, utilized amount, and remaining balance | P1 |
| FR-PIR-007 | System shall support linking a patient to a corporate employer group policy | P1 |
| FR-PIR-008 | System shall allow recording manual TPA eligibility verification with reference number and date | P0 |
| FR-PIR-009 | System shall prevent cashless claim creation if policy is expired | P0 |
| FR-PIR-010 | System shall maintain history of all policies linked to a patient | P1 |

---

## 4. Pre-Authorization

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-PA-001 | System shall allow creation of a pre-auth request for any active admitted patient | P0 |
| FR-PA-002 | Pre-auth form shall capture: admission date, treating doctor, diagnosis (ICD-10), procedure (ICD-10-PCS), estimated cost, ward type | P0 |
| FR-PA-003 | System shall auto-populate TPA details based on patient's linked policy | P0 |
| FR-PA-004 | System shall allow attachment of supporting documents (doctor notes, investigation reports) | P0 |
| FR-PA-005 | System shall track pre-auth status: Draft > Submitted > Query Raised > Responded > Approved > Partially Approved > Rejected > Cancelled | P0 |
| FR-PA-006 | System shall allow submission of enhancement request when cost exceeds approved amount | P0 |
| FR-PA-007 | System shall capture TPA authorization letter number and approved amount | P0 |
| FR-PA-008 | System shall allow upload of authorization letter PDF | P0 |
| FR-PA-009 | System shall send alert to insurance desk when pre-auth is pending > 2 hours | P1 |
| FR-PA-010 | System shall escalate pre-auth to manager if pending > 4 hours | P1 |
| FR-PA-011 | System shall record every query raised by TPA with timestamp | P0 |
| FR-PA-012 | System shall allow recording and submitting query response | P0 |
| FR-PA-013 | System shall maintain full history of all pre-auth events | P0 |
| FR-PA-014 | System shall generate a pre-auth summary report for each case | P1 |

---

## 5. Cashless Claims

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-CC-001 | System shall allow creation of a cashless claim from an approved pre-auth | P0 |
| FR-CC-002 | System shall track claim status: Created > Interim Bill Submitted > Final Bill Submitted > Acknowledged > Under Review > Settled > Partially Settled > Rejected | P0 |
| FR-CC-003 | System shall link claim to HMS billing records | P0 |
| FR-CC-004 | System shall display approved amount, billed amount, and balance on claim screen | P0 |
| FR-CC-005 | System shall calculate and display patient co-pay amount | P0 |
| FR-CC-006 | System shall allow submission of interim bills during long admissions | P1 |
| FR-CC-007 | System shall generate final claim package (bill + discharge summary + documents) | P0 |
| FR-CC-008 | System shall record TPA settlement amount, payment reference, and date | P0 |
| FR-CC-009 | System shall calculate and track shortfall amounts | P0 |
| FR-CC-010 | System shall prevent discharge without co-pay collection confirmation | P0 |

---

## 6. Reimbursement Claims

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-RC-001 | System shall allow registration of a reimbursement claim post-discharge | P0 |
| FR-RC-002 | System shall generate a document checklist based on insurance company | P0 |
| FR-RC-003 | System shall track document collection status per checklist item | P0 |
| FR-RC-004 | System shall allow claim submission with all collected documents | P0 |
| FR-RC-005 | System shall track claim submission docket number and date | P0 |
| FR-RC-006 | System shall allow upload of deficiency letter and response | P1 |
| FR-RC-007 | System shall track claim status updates from TPA | P0 |
| FR-RC-008 | System shall record settlement amount and payment details | P0 |
| FR-RC-009 | System shall alert if reimbursement claim is not submitted within 25 days of discharge | P1 |
| FR-RC-010 | System shall allow partial settlement recording and balance follow-up | P1 |

---

## 7. Document Management

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-DM-001 | System shall allow upload of documents in PDF, JPG, PNG formats | P0 |
| FR-DM-002 | System shall categorize documents by type (policy card, auth letter, discharge summary, bills, investigation reports, ID proof) | P0 |
| FR-DM-003 | System shall allow only authorized roles to view specific document types | P0 |
| FR-DM-004 | System shall maintain version history when a document is replaced | P1 |
| FR-DM-005 | System shall track document expiry (for policy cards, ID proofs) | P1 |
| FR-DM-006 | System shall log every document view and download with user and timestamp | P0 |
| FR-DM-007 | System shall allow bulk document download per claim | P1 |
| FR-DM-008 | System shall enforce mandatory document checklist before claim submission | P0 |

---

## 8. Billing Integration

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-BI-001 | System shall display insurance-approved amount on the billing screen | P0 |
| FR-BI-002 | System shall calculate patient co-pay based on plan rules | P0 |
| FR-BI-003 | System shall prevent billing from exceeding approved amount without manager approval | P0 |
| FR-BI-004 | System shall support insurance package billing linked to plan packages | P1 |
| FR-BI-005 | System shall split bill into insurance portion and patient portion | P0 |
| FR-BI-006 | System shall update billing when enhancement is approved | P0 |
| FR-BI-007 | System shall generate insurance invoice for TPA submission | P0 |

---

## 9. Finance Integration

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-FI-001 | System shall allow finance team to record TPA payment receipts | P0 |
| FR-FI-002 | System shall generate outstanding claims aging report (30/60/90/120+ days) | P0 |
| FR-FI-003 | System shall allow write-off recording for denied or partial settlements | P1 |
| FR-FI-004 | System shall provide insurance revenue summary per period | P0 |
| FR-FI-005 | System shall reconcile TPA payments against submitted claims | P1 |

---

## 10. Notifications

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-NT-001 | System shall send in-app notification when pre-auth status changes | P0 |
| FR-NT-002 | System shall send email notification when pre-auth is approved or rejected | P1 |
| FR-NT-003 | System shall alert insurance desk when TPA query is received | P0 |
| FR-NT-004 | System shall alert when pre-auth is pending for > 2 hours | P0 |
| FR-NT-005 | System shall alert when claim submission deadline is approaching (48 hours) | P1 |
| FR-NT-006 | System shall alert when policy is expiring within 30 days | P1 |
| FR-NT-007 | System shall alert finance when TPA payment is overdue (> 45 days after settlement) | P2 |

---

## 11. Audit & Compliance

| FR-ID | Requirement | Priority |
|---|---|---|
| FR-AU-001 | System shall log every state change on every claim | P0 |
| FR-AU-002 | Audit log shall capture user ID, role, timestamp, previous state, and new state | P0 |
| FR-AU-003 | Audit logs shall be immutable (no edit or delete) | P0 |
| FR-AU-004 | System shall provide audit log search by claim, user, date, and action | P1 |
| FR-AU-005 | System shall retain all records for minimum 7 years | P0 |

---

*End of FRS*
