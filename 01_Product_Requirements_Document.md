# 01 – Product Requirements Document (PRD)
## HMS Insurance Module

---

### Document Control

| Field | Value |
|---|---|
| Document ID | HMS-INS-PRD-001 |
| Version | 1.0 |
| Status | Draft for Review |

---

## 1. Purpose

This PRD defines the complete product vision, goals, user personas, feature set, and success metrics for the HMS Insurance Module. It is the primary reference document for all downstream planning, design, and development.

---

## 2. Product Vision

> "A hospital where every insurance claim is processed digitally, every authorization decision is tracked, every rupee is recovered, and no patient faces unnecessary delay due to insurance paperwork."

---

## 3. User Personas

### Persona 1 – Insurance Desk Executive (Front Desk)
- **Goal:** Register patient insurance, initiate pre-auth requests quickly
- **Pain:** Manual paperwork, phone calls to TPA, no status visibility
- **Needs:** Quick policy lookup, guided document upload, real-time auth status

### Persona 2 – Insurance Claims Manager
- **Goal:** Track all active claims, ensure timely follow-up, minimize denials
- **Pain:** No consolidated dashboard, manual escalation, lost documents
- **Needs:** Claim dashboard, status filters, escalation workflows, denial management

### Persona 3 – Billing Executive
- **Goal:** Raise accurate bills aligned with approved claim amount
- **Pain:** Disconnect between approved amount and billed amount
- **Needs:** Real-time approved amount visibility, automated billing triggers

### Persona 4 – Finance Officer
- **Goal:** Reconcile insurance receipts, track outstanding claims
- **Pain:** Manual reconciliation, delayed TPA payments
- **Needs:** Settlement reports, aging reports, TPA payment tracking

### Persona 5 – Hospital Administrator / Management
- **Goal:** Overview of insurance revenue, rejection rates, TPA performance
- **Pain:** No consolidated analytics
- **Needs:** Real-time dashboards, trend reports, TPA scorecards

### Persona 6 – Patient / Attendant
- **Goal:** Cashless treatment without upfront payment
- **Pain:** Uncertainty about approval status, documentation requirements
- **Needs:** Clear communication of approval, document list, limits

---

## 4. Feature List

### 4.1 Insurance Master Management
- Insurance company registration
- TPA registration and linking
- Policy type master
- Plan/Product master (individual, floater, corporate)
- Network hospital configuration
- Exclusion list management
- Co-pay and deductible rules

### 4.2 Patient Insurance Registration
- Link patient to insurance policy
- Policy verification
- Beneficiary management (family floater)
- Corporate employee mapping
- Policy renewal tracking
- Eligibility checking

### 4.3 Pre-Authorization (Cashless)
- Initial pre-auth request creation
- Enhancement requests
- TPA communication workflow
- Approval / Partial Approval / Rejection handling
- Query response management
- Authorization letter upload

### 4.4 Cashless Claim Processing
- Claim creation from pre-auth
- Interim bill submission
- Final bill submission
- Discharge summary integration
- Settlement tracking

### 4.5 Reimbursement Claims
- Claim registration post-discharge
- Document collection checklist
- Submission to TPA/Company
- Status tracking
- Deficiency letter handling
- Settlement recording

### 4.6 TPA Claims
- TPA-specific form generation
- TPA portal submission tracking
- TPA query management
- TPA settlement reconciliation

### 4.7 Corporate Insurance
- Corporate account management
- Employee policy mapping
- Credit billing for corporates
- Monthly settlement cycles

### 4.8 Billing Integration
- Approved amount vs billed amount visibility
- Automatic billing adjustment triggers
- Co-pay collection at discharge
- Package billing for insurance

### 4.9 Finance Integration
- TPA payment receipt entry
- Outstanding claim aging
- Write-off management
- Revenue recognition

### 4.10 Document Management
- Document upload by category
- Version control
- Expiry tracking
- Secure access
- Audit trail

### 4.11 Reporting & Analytics
- Claim volume reports
- Rejection analysis
- TPA performance scorecards
- Revenue from insurance
- Pending authorization reports

### 4.12 Notifications & Alerts
- Pre-auth pending alerts
- Authorization received notifications
- Claim submission deadlines
- Document expiry alerts
- TPA query notifications

### 4.13 Audit Logs
- Every claim state change logged
- User action tracking
- Document access logs
- Login and permission logs

---

## 5. Non-Goals (What this PRD does NOT cover)

- Patient-facing mobile app
- NHCX/ABDM integration (Phase 2)
- AI-based fraud detection
- Direct insurer API real-time integration (planned later)

---

## 6. Success Metrics

| Metric | Target |
|---|---|
| Claim rejection rate | < 5% |
| Pre-auth turnaround time | < 4 hours average |
| Document completeness at submission | > 95% |
| Insurance revenue recovery | > 98% of eligible claims |
| System uptime | 99.9% |
| User adoption by insurance desk | 100% within 30 days |

---

## 7. Constraints

| Type | Constraint |
|---|---|
| Technical | Must integrate with existing HMS database |
| Regulatory | PHI data must be encrypted at rest and in transit |
| Operational | System must work even if TPA portal is down |
| Performance | Dashboard must load in < 3 seconds |

---

## 8. Dependencies

| Dependency | Owner |
|---|---|
| Existing HMS patient module | Development team |
| Existing HMS billing module | Development team |
| Existing HMS EMR/IPD module | Development team |
| TPA portal credentials | Hospital IT |
| Insurance company master data | Insurance department |

---

*End of PRD*
