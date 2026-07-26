# 02 – Project Index & Development Roadmap
## HMS Insurance Module

---

## 1. Document Repository Index

| # | Document | Purpose | Status |
|---|---|---|---|
| 00 | Project Charter | Project authorization and scope | ✅ |
| 01 | PRD | Product vision and feature list | ✅ |
| 02 | Project Index | This document – navigation index | ✅ |
| 03 | Business Requirements | BRD – what the business needs | ✅ |
| 04 | Functional Requirements | FRS – system must-do list | ✅ |
| 05 | Non-Functional Requirements | Performance, security, scalability | ✅ |
| 06 | User Roles & Permissions | RBAC matrix | ✅ |
| 07 | Insurance Department Workflow | Dept-level process flows | ✅ |
| 08 | Cashless Workflow | Pre-auth to settlement | ✅ |
| 09 | Reimbursement Workflow | Post-discharge claim flow | ✅ |
| 10 | Pre-Authorization Workflow | Initial + Enhancement pre-auth | ✅ |
| 11 | Claim Lifecycle | Complete claim state machine | ✅ |
| 12 | Document Management | Upload, versioning, retention | ✅ |
| 13 | Insurance Master | Companies, TPAs, policies | ✅ |
| 14 | TPA Master | TPA-specific configuration | ✅ |
| 15 | Database Design | All tables, columns, indexes | ✅ |
| 16 | API Specification | All endpoints documented | ✅ |
| 17 | UI/UX Specification | All screens and components | ✅ |
| 18 | State Machines | Claim status transitions | ✅ |
| 19 | Sequence Diagrams | Inter-system message flows | ✅ |
| 20 | Billing Integration | Insurance-billing sync | ✅ |
| 21 | Finance Integration | Settlement and reconciliation | ✅ |
| 22 | EMR Integration | Discharge summary, diagnosis | ✅ |
| 23 | Reporting | Reports, dashboards, KPIs | ✅ |
| 24 | Security | Auth, encryption, audit | ✅ |
| 25 | Test Plan | Unit, integration, UAT | ✅ |
| 26 | Deployment | Infra, CI/CD, rollback | ✅ |
| 27 | Development Roadmap | Sprint plan for Gemini | ✅ |
| 28 | Sprint Backlog | Task-level breakdown | ✅ |
| 29 | Future Enhancements | NHCX, ABDM, AI, mobile | ✅ |

---

## 2. Development Phase Breakdown

### Phase 0 – Research (Week 1)
> Understand domain, collect forms, study existing HMS code

**Deliverables:**
- Domain knowledge document
- Insurance form analysis
- Existing HMS integration points list

---

### Phase 1 – Business Analysis (Weeks 2–3)
> Define all business requirements, user stories, and use cases

**Deliverables:**
- BRD (Doc 03)
- FRS (Doc 04)
- NFR (Doc 05)
- User Stories spreadsheet

---

### Phase 2 – Workflow Design (Week 3–4)
> Map every real-world insurance process to system workflows

**Deliverables:**
- Insurance Department Workflow (Doc 07)
- Cashless Workflow (Doc 08)
- Reimbursement Workflow (Doc 09)
- Pre-Authorization Workflow (Doc 10)
- Claim Lifecycle (Doc 11)

---

### Phase 3 – Architecture & Database Design (Weeks 4–6)
> Design database schema, APIs, and system architecture

**Deliverables:**
- Database Design (Doc 15)
- API Specification (Doc 16)
- State Machines (Doc 18)
- Sequence Diagrams (Doc 19)

---

### Phase 4 – UI/UX Design (Weeks 5–6)
> Design every screen, component, and navigation flow

**Deliverables:**
- UI/UX Specification (Doc 17)
- Wireframe descriptions for every screen

---

### Phase 5 – Master Data Setup (Weeks 7–8)
> Build Insurance Company, TPA, Policy, Plan masters

**Gemini Tasks:**
- Insurance Company CRUD
- TPA CRUD
- Policy Type master
- Plan/Product master
- Network hospital configuration

---

### Phase 6 – Patient Insurance Registration (Week 9)
> Build patient insurance linking and policy management

**Gemini Tasks:**
- Patient insurance registration form
- Policy search and link
- Beneficiary management
- Eligibility check

---

### Phase 7 – Pre-Authorization Module (Weeks 10–11)
> Build cashless pre-auth request workflow

**Gemini Tasks:**
- Pre-auth request form
- Enhancement request
- TPA query response
- Authorization letter upload
- Pre-auth dashboard

---

### Phase 8 – Cashless Claim Module (Weeks 11–12)
> Build cashless claim processing from auth to settlement

**Gemini Tasks:**
- Cashless claim creation
- Bill submission workflows
- Claim settlement recording
- Discharge integration

---

### Phase 9 – Reimbursement Module (Weeks 13–14)
> Build reimbursement claim workflow post-discharge

**Gemini Tasks:**
- Reimbursement registration
- Document checklist
- TPA submission tracking
- Deficiency handling
- Settlement recording

---

### Phase 10 – Billing Integration (Week 15)
> Sync insurance module with HMS billing

**Gemini Tasks:**
- Approved amount visibility in billing
- Co-pay calculation
- Package billing integration
- Final bill reconciliation

---

### Phase 11 – Finance Integration (Week 16)
> Link settlements to finance module

**Gemini Tasks:**
- TPA payment receipt
- Outstanding claim aging report
- Write-off management
- Revenue posting

---

### Phase 12 – Document Management (Week 17)
> Build secure document upload, versioning, and retrieval system

**Gemini Tasks:**
- Document upload component
- Version control
- Access control by role
- Document audit trail

---

### Phase 13 – Reporting & Dashboards (Week 18)
> Build all insurance reports and management dashboards

**Gemini Tasks:**
- Claim volume dashboard
- Rejection analysis report
- TPA performance scorecard
- Revenue reports

---

### Phase 14 – Notifications & Audit Logs (Week 19)
> Build notification system and audit trail infrastructure

**Gemini Tasks:**
- Notification engine
- Audit log writer
- Alert configuration

---

### Phase 15 – Security & Permissions (Week 20)
> Implement RBAC, encryption, and security hardening

**Gemini Tasks:**
- Role-based access at UI and API level
- Data encryption
- Session management
- Security audit

---

### Phase 16 – Testing & QA (Weeks 21–22)
> Comprehensive testing before production release

**Gemini Tasks:**
- Unit test coverage
- Integration testing
- UAT support
- Bug fixing

---

### Phase 17 – Production Readiness (Week 23–24)
> Deployment preparation, data migration, go-live

**Gemini Tasks:**
- Deployment scripts
- Migration scripts
- Environment configuration
- Go-live checklist

---

## 3. Sprint Plan Summary

| Sprint | Weeks | Focus |
|---|---|---|
| Sprint 1 | 1–2 | Research + BRD |
| Sprint 2 | 3–4 | Workflows + DB Design |
| Sprint 3 | 5–6 | API + UI Design |
| Sprint 4 | 7–8 | Master Data |
| Sprint 5 | 9 | Patient Insurance |
| Sprint 6 | 10–11 | Pre-Authorization |
| Sprint 7 | 11–12 | Cashless Claims |
| Sprint 8 | 13–14 | Reimbursement |
| Sprint 9 | 15–16 | Billing + Finance |
| Sprint 10 | 17–18 | Documents + Reports |
| Sprint 11 | 19–20 | Notifications + Security |
| Sprint 12 | 21–24 | Testing + Production |

---

## 4. Milestone Summary

| Milestone | Expected Week | Description |
|---|---|---|
| M1 | Week 2 | Planning complete, BRD signed off |
| M2 | Week 4 | Workflows and DB design approved |
| M3 | Week 6 | API and UI specs finalized |
| M4 | Week 8 | Master data module live in staging |
| M5 | Week 10 | Patient insurance registration live |
| M6 | Week 12 | Pre-auth and cashless workflow live |
| M7 | Week 14 | Reimbursement workflow live |
| M8 | Week 16 | Billing and finance integration live |
| M9 | Week 18 | Documents and reports live |
| M10 | Week 20 | Notifications and security complete |
| M11 | Week 22 | UAT complete |
| M12 | Week 24 | Production go-live |

---

## 5. Dependency Map

```
Insurance Master (Phase 5)
        │
        ▼
Patient Insurance Registration (Phase 6)
        │
        ▼
Pre-Authorization Module (Phase 7)
        │
        ├──► Cashless Claims (Phase 8)
        │
        └──► Reimbursement (Phase 9)
                │
                ▼
        Billing Integration (Phase 10)
                │
                ▼
        Finance Integration (Phase 11)

All phases depend on:
- Database Design (Phase 3)
- API Design (Phase 3)
- Document Management (Phase 12) [cross-cutting]
- Security & RBAC (Phase 15) [cross-cutting]
- Notifications (Phase 14) [cross-cutting]
```

---

*End of Project Index*
