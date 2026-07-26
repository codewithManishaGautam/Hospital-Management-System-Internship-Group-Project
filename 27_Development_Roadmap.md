# 27 — Development Roadmap

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Development Roadmap & Timeline  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Roadmap Overview](#1-roadmap-overview)
2. [Phase Summary](#2-phase-summary)
3. [Milestone Map](#3-milestone-map)
4. [Dependency Graph](#4-dependency-graph)
5. [Phase 1 Detailed Roadmap — Foundation](#5-phase-1-detailed-roadmap--foundation)
6. [Phase 2 Detailed Roadmap — Core Workflows](#6-phase-2-detailed-roadmap--core-workflows)
7. [Phase 3 Detailed Roadmap — Integration & Finance](#7-phase-3-detailed-roadmap--integration--finance)
8. [Phase 4 Detailed Roadmap — Intelligence & Reporting](#8-phase-4-detailed-roadmap--intelligence--reporting)
9. [Phase 5 Detailed Roadmap — Hardening & Launch](#9-phase-5-detailed-roadmap--hardening--launch)
10. [Risk Register](#10-risk-register)
11. [Resource Requirements](#11-resource-requirements)
12. [Decision Log](#12-decision-log)

---

## 1. Roadmap Overview

The Insurance Module is developed across **5 phases** spanning approximately **5–6 months** with a single full-stack developer (Gemini). Each phase delivers a working, testable increment that can be reviewed and approved before the next phase begins.

### 1.1 Guiding Principles

| Principle | Application |
|---|---|
| **Working software over documentation** | Each phase delivers runnable code, not just specs |
| **Incremental delivery** | Every phase builds on the previous; no big-bang releases |
| **Testable milestones** | Each phase has clear acceptance criteria before moving on |
| **No skipping** | Phase N cannot start until Phase N-1 is accepted |
| **Business value first** | Core cashless workflow before advanced features |

### 1.2 Total Timeline Summary

| Phase | Name | Duration | Cumulative |
|---|---|---|---|
| Phase 1 | Foundation & Master Data | 4 weeks | Week 4 |
| Phase 2 | Core Insurance Workflows | 6 weeks | Week 10 |
| Phase 3 | Integration & Finance | 4 weeks | Week 14 |
| Phase 4 | Reporting & Intelligence | 3 weeks | Week 17 |
| Phase 5 | Hardening, Security & Launch | 3 weeks | Week 20 |
| **Total** | | **~20 weeks** | **~5 months** |

---

## 2. Phase Summary

### Phase 1 — Foundation & Master Data (Weeks 1–4)
**Goal:** Build the infrastructure, authentication, and all master data screens.
**Business Value:** Insurance department can register all insurance companies, TPAs, products, and patient policies.

**Deliverables:**
- Authentication system (roles, permissions)
- Insurance Company master
- TPA master
- Insurance Product master
- Patient Insurance Registration
- Base UI layout and navigation
- Database migrations for all above
- API endpoints for all CRUD operations

**Go/No-Go Criteria:** A new patient's insurance policy can be registered and retrieved. All master data can be managed by admin.

---

### Phase 2 — Core Insurance Workflows (Weeks 5–10)
**Goal:** Implement the two most important workflows — Cashless Pre-Authorization and Claim Submission.
**Business Value:** Insurance desk can process cashless hospitalizations end-to-end.

**Deliverables:**
- Pre-Authorization workflow (create, submit, approve, enhance, close)
- Claim lifecycle (create, document upload, submit, approve, reject, dispute)
- Document management (upload, validate, checklist)
- Notification system (email, in-app)
- Audit logging for all actions
- Workflow state machine enforcement

**Go/No-Go Criteria:** A complete cashless hospitalization can be processed from admission to claim closure.

---

### Phase 3 — Integration & Finance (Weeks 11–14)
**Goal:** Connect insurance to billing and finance; implement reimbursement workflow.
**Business Value:** Finance can see and reconcile insurance settlements; billing is linked to claims.

**Deliverables:**
- EMR integration layer
- Billing integration (auto-populate claim from billing)
- Settlement processing (full, partial, deduction)
- Finance AR integration
- Reimbursement claim workflow
- Corporate insurance workflow

**Go/No-Go Criteria:** Settlement is recorded and reflected in finance AR. Billing data auto-populates claim forms.

---

### Phase 4 — Reporting & Intelligence (Weeks 15–17)
**Goal:** Build all reports, dashboards, and analytics.
**Business Value:** Management, finance, and insurance heads have full visibility.

**Deliverables:**
- Executive dashboard (KPIs + charts)
- Operational reports (6 reports)
- Financial reports (5 reports)
- TPA performance reports (3 reports)
- Scheduled report automation
- PDF/Excel export for all reports

**Go/No-Go Criteria:** All 14+ reports generate correct data. Dashboard shows real-time KPIs.

---

### Phase 5 — Hardening, Security & Launch (Weeks 18–20)
**Goal:** Security hardening, performance optimization, UAT, and production launch.
**Business Value:** Production-grade, secure system ready for live hospital use.

**Deliverables:**
- Security hardening (OWASP review, penetration test)
- Performance optimization and testing
- Complete E2E test suite
- UAT with hospital staff
- Deployment to production
- Staff training and handover documentation

**Go/No-Go Criteria:** All go-live criteria from Test Plan (doc 25) met. UAT sign-off received.

---

## 3. Milestone Map

```
Week 1   Week 2   Week 3   Week 4   Week 5   Week 6   Week 7   Week 8
  │        │        │        │        │        │        │        │
  ├──────PHASE 1: Foundation────────┤
  │                                 │
  │ M1.1        M1.2     M1.3   M1.4│
  │ DB Ready    Auth     Master  Patient
  │             System   Data   Insurance
                                 Registration
                                 ↓
                                 PHASE 1 REVIEW
                                 
Week 5   Week 6   Week 7   Week 8   Week 9   Week 10
  │        │        │        │        │        │
  ├────────────PHASE 2: Core Workflows──────────┤
  │                                             │
  │ M2.1       M2.2        M2.3           M2.4  │
  │ Pre-Auth   Claim       Document       Notification
  │ Workflow   Workflow    Management     + Audit
                                         ↓
                                         PHASE 2 REVIEW
                                         
Week 11  Week 12  Week 13  Week 14
  │        │        │        │
  ├────PHASE 3: Integration & Finance────┤
  │ M3.1       M3.2         M3.3         │
  │ EMR        Settlement   Finance AR   │
  │ Integration Processing  Integration │
                                        ↓
                                        PHASE 3 REVIEW
                                        
Week 15  Week 16  Week 17
  │        │        │
  ├───PHASE 4: Reporting───┤
  │ M4.1       M4.2       │
  │ Dashboard  Reports    │
                          ↓
                          PHASE 4 REVIEW
                          
Week 18  Week 19  Week 20
  │        │        │
  ├────PHASE 5: Launch─────┤
  │ M5.1    M5.2    M5.3   │
  │ Harden  UAT     Launch │
```

---

## 4. Dependency Graph

```
[Database Migrations]
        │
        ▼
[Auth & RBAC]
        │
        ▼
[Insurance Company Master] ──┐
[TPA Master]                 ├──▶ [Patient Insurance Registration]
[Insurance Products]  ───────┘              │
                                            ▼
                             [Pre-Authorization Workflow]
                                            │
                                            ▼
                             [Claim Workflow] ←── [Billing Integration]
                                            │
                                            ▼
                             [Document Management]
                                            │
                                            ▼
                             [Settlement Processing] ←── [Finance Integration]
                                            │
                                            ▼
                             [Audit Logging] + [Notifications]
                                            │
                                            ▼
                             [Reporting & Dashboards]
                                            │
                                            ▼
                             [Security Hardening]
                                            │
                                            ▼
                             [UAT & Performance Testing]
                                            │
                                            ▼
                             [PRODUCTION LAUNCH]
```

---

## 5. Phase 1 Detailed Roadmap — Foundation

### Week 1: Project Setup & Database

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P1-001 | Project scaffold — folder structure, linting, environment setup | 0.5 days | Critical |
| P1-002 | Database schema design review and approval | 0.5 days | Critical |
| P1-003 | Knex migration setup + base migrations (all Insurance Module tables) | 2 days | Critical |
| P1-004 | CI/CD pipeline setup (GitHub Actions) | 1 day | High |
| P1-005 | Testing infrastructure (Jest, Supertest, test DB) | 1 day | High |

**Week 1 Milestone:** Database schema deployed to development. CI pipeline running.

---

### Week 2: Authentication & Authorization

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P1-006 | JWT authentication middleware | 1 day | Critical |
| P1-007 | RBAC authorization middleware | 1 day | Critical |
| P1-008 | User login API (use existing HMS auth) | 0.5 days | Critical |
| P1-009 | Insurance-specific role assignment | 0.5 days | High |
| P1-010 | Session management (refresh tokens) | 1 day | High |
| P1-011 | Auth unit tests | 1 day | High |

**Week 2 Milestone:** All protected routes enforcing authentication and role checks.

---

### Week 3: Master Data — Insurance Company, TPA, Products

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P1-012 | Insurance Company CRUD API | 1 day | Critical |
| P1-013 | Insurance Company management UI | 1 day | Critical |
| P1-014 | TPA CRUD API | 0.5 days | Critical |
| P1-015 | TPA management UI | 1 day | Critical |
| P1-016 | Insurance Products/Plans CRUD API | 0.5 days | High |
| P1-017 | Insurance Products UI | 1 day | High |

**Week 3 Milestone:** Admin can manage all insurance companies, TPAs, and products.

---

### Week 4: Patient Insurance Registration

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P1-018 | Patient insurance search (from HMS) | 0.5 days | Critical |
| P1-019 | Policy registration form API | 1 day | Critical |
| P1-020 | Policy registration UI | 1.5 days | Critical |
| P1-021 | Policy list and search UI | 1 day | High |
| P1-022 | Policy status management (active/expired/suspended) | 0.5 days | High |
| P1-023 | Phase 1 integration testing | 1 day | Critical |
| P1-024 | Phase 1 review documentation | 0.5 days | Required |

**Week 4 Milestone: PHASE 1 COMPLETE** — Patient policy can be registered and managed.

---

## 6. Phase 2 Detailed Roadmap — Core Workflows

### Week 5–6: Pre-Authorization Workflow

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P2-001 | Pre-auth state machine implementation | 1 day | Critical |
| P2-002 | Create pre-auth API | 1 day | Critical |
| P2-003 | Pre-auth form UI (with auto-fill from patient record) | 2 days | Critical |
| P2-004 | Pre-auth submission to TPA (status update) | 1 day | Critical |
| P2-005 | Pre-auth approval/rejection recording | 1 day | Critical |
| P2-006 | Pre-auth enhancement workflow | 1 day | High |
| P2-007 | Pre-auth list and search UI | 1 day | High |
| P2-008 | Pre-auth unit and integration tests | 1 day | High |

**Milestone:** Complete pre-auth workflow from creation to TPA response.

---

### Week 7–8: Claim Workflow

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P2-009 | Claim state machine implementation | 1 day | Critical |
| P2-010 | Create claim API (auto-populate from pre-auth) | 1 day | Critical |
| P2-011 | Claim form UI with billing line items | 2 days | Critical |
| P2-012 | Claim submission workflow | 1 day | Critical |
| P2-013 | Claim approval/partial approval recording | 1 day | Critical |
| P2-014 | Claim rejection and dispute workflow | 1 day | High |
| P2-015 | Claim list, search, and filter UI | 1 day | High |
| P2-016 | Claim tests | 1 day | High |

**Milestone:** Complete claim workflow from creation to approval/rejection.

---

### Week 9: Document Management

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P2-017 | Document upload API (with validation) | 1 day | Critical |
| P2-018 | Document upload UI component | 1 day | Critical |
| P2-019 | Document checklist management | 1 day | High |
| P2-020 | Document download with access control | 0.5 days | High |
| P2-021 | Document version tracking | 0.5 days | Medium |
| P2-022 | Document tests | 1 day | High |

---

### Week 10: Notifications, Audit, and Phase 2 Review

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P2-023 | Audit log service (all insurance actions) | 1 day | Critical |
| P2-024 | In-app notification system | 1 day | High |
| P2-025 | Email notification templates | 1 day | High |
| P2-026 | Notification trigger wiring (all state changes) | 1 day | High |
| P2-027 | Phase 2 E2E test — cashless workflow | 1 day | Critical |
| P2-028 | Phase 2 review documentation | 0.5 days | Required |

**Week 10 Milestone: PHASE 2 COMPLETE** — Full cashless hospitalization processable.

---

## 7. Phase 3 Detailed Roadmap — Integration & Finance

### Week 11–12: EMR & Billing Integration

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P3-001 | EMR integration service layer | 2 days | Critical |
| P3-002 | Pre-auth form auto-fill from EMR | 1 day | High |
| P3-003 | Claim auto-generation on discharge event | 2 days | High |
| P3-004 | ICD-10 code lookup and autocomplete | 1 day | High |
| P3-005 | CPT code lookup and autocomplete | 0.5 days | High |
| P3-006 | Billing module integration (pull line items) | 2 days | Critical |
| P3-007 | Discharge summary auto-attachment | 1 day | High |

---

### Week 13–14: Settlement, Finance & Reimbursement

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P3-008 | Settlement recording API (full and partial) | 1 day | Critical |
| P3-009 | Settlement UI | 1 day | Critical |
| P3-010 | Deduction recording and categorization | 1 day | High |
| P3-011 | Finance AR integration (update on settlement) | 1 day | High |
| P3-012 | Settlement receipt generation (PDF) | 1 day | High |
| P3-013 | Reimbursement claim workflow | 2 days | High |
| P3-014 | Corporate insurance workflow | 1 day | Medium |
| P3-015 | Phase 3 integration tests | 1 day | Critical |

**Week 14 Milestone: PHASE 3 COMPLETE** — Full billing-to-settlement pipeline working.

---

## 8. Phase 4 Detailed Roadmap — Intelligence & Reporting

### Week 15–17: Reporting & Dashboards

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P4-001 | Report infrastructure (base layout, filters, export utils) | 2 days | Critical |
| P4-002 | Executive dashboard (KPI tiles + 6 charts) | 3 days | Critical |
| P4-003 | Claims pending report | 1 day | High |
| P4-004 | Pre-auth pending report | 1 day | High |
| P4-005 | TPA AR aging report | 1.5 days | High |
| P4-006 | Settlement reconciliation report | 1 day | High |
| P4-007 | TPA scorecard report | 1.5 days | High |
| P4-008 | Rejection analysis report | 1 day | High |
| P4-009 | Diagnosis analytics report | 1 day | Medium |
| P4-010 | Scheduled report engine (cron + email) | 2 days | High |
| P4-011 | PDF/Excel export for all reports | 1 day | High |

**Week 17 Milestone: PHASE 4 COMPLETE** — All 10+ reports live and scheduled.

---

## 9. Phase 5 Detailed Roadmap — Hardening & Launch

### Week 18: Security Hardening

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P5-001 | Complete input validation on all endpoints | 1 day | Critical |
| P5-002 | Sensitive field encryption (Aadhaar, policy, bank) | 1 day | Critical |
| P5-003 | Security headers on all responses | 0.5 days | Critical |
| P5-004 | Rate limiting implementation | 0.5 days | High |
| P5-005 | OWASP Top 10 review and remediation | 2 days | Critical |
| P5-006 | Penetration test (or self-assessment) | 1 day | Critical |

---

### Week 19: UAT & Performance

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P5-007 | Complete E2E Playwright test suite | 2 days | Critical |
| P5-008 | Performance testing with k6 | 1 day | High |
| P5-009 | Performance optimization (slow queries, caching) | 1 day | High |
| P5-010 | UAT with hospital staff | 2 days | Critical |
| P5-011 | UAT bug fixes | 1 day | Critical |

---

### Week 20: Production Launch

| Task ID | Task | Effort | Priority |
|---|---|---|---|
| P5-012 | Staging deployment and validation | 1 day | Critical |
| P5-013 | Production deployment | 0.5 days | Critical |
| P5-014 | Production smoke tests | 0.5 days | Critical |
| P5-015 | Staff training sessions | 1 day | High |
| P5-016 | User guide and help documentation | 1 day | High |
| P5-017 | Post-launch monitoring (hypercare week) | ongoing | Critical |

**Week 20 Milestone: PRODUCTION LAUNCH** 🚀

---

## 10. Risk Register

| Risk ID | Risk Description | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R01 | EMR module has different data structure than expected | Medium | High | Spike in Week 1 to map EMR data model |
| R02 | TPA integration protocols differ across TPAs | High | Medium | Build generic adapter; configure per TPA |
| R03 | Scope creep: hospital requests additional features mid-development | High | High | Strict phase gate: no new features without pushing phase deadline |
| R04 | Single developer bottleneck | Medium | High | Clear daily tasks; PM review every 2 days |
| R05 | Complex billing integration takes longer than estimated | Medium | High | Allocate extra buffer in Phase 3; simplify if needed |
| R06 | UAT reveals fundamental UX issues | Low | High | Prototype pre-auth and claim screens early for review |
| R07 | Performance issues with large claim history | Low | Medium | Index critical fields; test with 10,000+ records in staging |
| R08 | Security vulnerabilities found late | Low | Critical | Run security checks from Phase 2; don't defer to Phase 5 |
| R09 | Regulatory change (IRDAI policy update) | Low | Medium | Design for configurability; avoid hardcoded business rules |
| R10 | Staff resistance to new system | Medium | Medium | Early training; involve key users in UAT |

---

## 11. Resource Requirements

### 11.1 Development Team

| Role | Person | Time Commitment |
|---|---|---|
| Full-Stack Developer (Gemini) | 1 developer | 100% (full-time) |
| Project Manager / Reviewer | You | 2–4 hours/day |
| Domain Expert (Insurance) | Hospital insurance head | 2–4 hours/week for UAT |
| Finance Reviewer | Finance head | 1–2 hours/week (Phase 3+) |

### 11.2 Tools & Software Required

| Tool | Purpose | Cost |
|---|---|---|
| GitHub / GitLab | Code hosting, CI/CD | Free (basic) |
| VS Code | IDE | Free |
| PostgreSQL | Database | Free |
| Node.js / React | Runtime & frontend | Free |
| k6 | Performance testing | Free |
| Playwright | E2E testing | Free |
| Postman | API testing | Free (basic) |
| Linux server (VPS) | Staging environment | ₹2,000–5,000/month |

---

## 12. Decision Log

| Decision ID | Date | Decision | Rationale | Made By |
|---|---|---|---|---|
| D001 | Project Start | Single codebase with HMS (not separate microservice) | Simpler deployment; shared auth; team size | Project Manager |
| D002 | Project Start | PostgreSQL as database | Existing HMS uses PostgreSQL | Technical |
| D003 | Phase 1 Start | No TPA portal API integration in Phase 1 | TPA portal APIs differ; manual status update acceptable for Phase 1 | Project Manager |
| D004 | Phase 1 Start | Feature flags for gradual rollout | Hospital cannot have insurance system go live suddenly | Technical |
| D005 | Phase 2 Start | State machine for claim lifecycle | Prevents invalid status transitions; enforceable in code | Technical |
| D006 | Phase 3 | Billing integration read-only | Insurance module should never modify billing records | Architecture |
| D007 | Phase 5 | Penetration test self-assessment first | External pentest scheduled post-launch (budget constraint) | Project Manager |

---

**Executive Summary:** The 5-phase, 20-week roadmap provides a structured, dependency-aware path from zero to a production-ready Insurance Module. Each phase delivers independently valuable software, reducing risk and enabling early feedback. The plan accounts for a single full-stack developer with PM oversight and is calibrated to deliver a comprehensive, enterprise-grade module within a realistic timeline.

---
