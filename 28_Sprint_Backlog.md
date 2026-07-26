# 28 — Sprint Backlog

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Sprint Backlog & Task Tracker  
**Status:** Ready for Development  
**Last Updated:** 2025  
**Sprint Duration:** 2 weeks each  
**Total Sprints:** 10 sprints (20 weeks)

---

> **For Gemini:** Each sprint below is a self-contained unit of work. Start from Sprint 1. Do NOT move to the next sprint until the current sprint's acceptance criteria are met and reviewed. Each user story has a clear acceptance criterion. Each task is independently buildable.

---

## Sprint Overview

| Sprint | Phase | Focus | Weeks |
|---|---|---|---|
| Sprint 1 | Phase 1 | DB Schema + Auth + CI/CD | 1–2 |
| Sprint 2 | Phase 1 | Master Data (Insurance Co., TPA, Products) | 3–4 |
| Sprint 3 | Phase 1 | Patient Insurance Registration | 5 (+ buffer) |
| Sprint 4 | Phase 2 | Pre-Authorization Workflow | 6–7 |
| Sprint 5 | Phase 2 | Claim Workflow | 8–9 |
| Sprint 6 | Phase 2 | Document Management + Audit + Notifications | 10–11 |
| Sprint 7 | Phase 3 | EMR + Billing Integration | 12–13 |
| Sprint 8 | Phase 3 | Settlement + Finance + Reimbursement | 14–15 |
| Sprint 9 | Phase 4 | Reporting & Dashboards | 16–17 |
| Sprint 10 | Phase 5 | Security + UAT + Launch | 18–20 |

---

## SPRINT 1 — Database Foundation, Auth & CI/CD

**Sprint Goal:** The project is set up correctly. Database schema is deployed. Authentication works. CI/CD pipeline is running. Gemini has a solid, working foundation.

**Sprint Duration:** Weeks 1–2

---

### User Stories

---

**US-001: Database Schema**  
*As a Developer, I want the entire Insurance Module database schema deployed via migrations, so all tables are available for development.*

**Story Points:** 5  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T001-1 | Set up Knex.js migration framework | 2 hours |
| T001-2 | Migration: insurance_companies table | 1 hour |
| T001-3 | Migration: tpa_master table | 1 hour |
| T001-4 | Migration: insurance_products table | 1 hour |
| T001-5 | Migration: patient_insurance_policies table | 1 hour |
| T001-6 | Migration: preauth_requests table | 2 hours |
| T001-7 | Migration: claims table | 2 hours |
| T001-8 | Migration: claim_documents table | 1 hour |
| T001-9 | Migration: claim_billing_details table | 1 hour |
| T001-10 | Migration: settlements table | 1 hour |
| T001-11 | Migration: audit_logs table | 1 hour |
| T001-12 | Migration: notifications table | 1 hour |
| T001-13 | Seed data: test insurance companies, TPAs, products | 2 hours |

**Acceptance Criteria:**
- [ ] `npm run migrate:latest` runs without error
- [ ] All tables exist in development database
- [ ] Seed data loaded successfully
- [ ] `npm run migrate:rollback` rolls back cleanly

---

**US-002: CI/CD Pipeline**  
*As a Developer, I want CI/CD running so every commit is automatically tested.*

**Story Points:** 3  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T002-1 | GitHub Actions: lint + test on PR | 3 hours |
| T002-2 | GitHub Actions: deploy to staging on merge | 2 hours |
| T002-3 | Branch protection rules (require PR, require passing tests) | 1 hour |
| T002-4 | Environment variable secrets in GitHub Actions | 1 hour |

**Acceptance Criteria:**
- [ ] CI runs on every PR to `main`
- [ ] Failed tests block PR merge
- [ ] All secrets managed via GitHub Secrets (not in code)

---

**US-003: JWT Authentication Middleware**  
*As a system, I need all Insurance Module routes protected by JWT authentication.*

**Story Points:** 3  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T003-1 | `auth.middleware.js` — validate JWT on protected routes | 3 hours |
| T003-2 | `jwt_utils.js` — generate, verify, refresh tokens | 2 hours |
| T003-3 | Login API endpoint (insurance module entry) | 2 hours |
| T003-4 | Unit tests for auth middleware | 2 hours |

**Acceptance Criteria:**
- [ ] Request with valid JWT → proceeds
- [ ] Request without JWT → 401
- [ ] Request with expired JWT → 401 with `TOKEN_EXPIRED` code
- [ ] Unit tests pass

---

**US-004: RBAC Authorization**  
*As a system, I need every API endpoint to enforce role-based access control.*

**Story Points:** 3  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T004-1 | `authorize.middleware.js` — check role permission on route | 3 hours |
| T004-2 | `permissions.config.js` — role-to-permission mapping | 2 hours |
| T004-3 | Unit tests — all 8 roles tested against key endpoints | 2 hours |

**Acceptance Criteria:**
- [ ] Authorized role → proceeds
- [ ] Unauthorized role → 403 Forbidden
- [ ] All roles from permission matrix tested

---

**US-005: Testing Infrastructure**  
*As a Developer, I want testing infrastructure ready so I can write tests alongside code.*

**Story Points:** 2  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T005-1 | Jest configuration (backend) | 1 hour |
| T005-2 | Supertest setup for API tests | 1 hour |
| T005-3 | Test database setup (isolated from dev DB) | 2 hours |
| T005-4 | Test helpers: login helper, seed helper | 2 hours |
| T005-5 | React Testing Library setup (frontend) | 1 hour |

**Acceptance Criteria:**
- [ ] `npm test` runs and passes
- [ ] `npm run test:coverage` shows coverage report
- [ ] Tests use separate test database
- [ ] Test database resets between test suites

---

**Sprint 1 Review Checklist:**
- [ ] All migrations deployed
- [ ] Auth middleware tested with all error cases
- [ ] CI/CD pipeline verified (break a test; confirm CI fails)
- [ ] No hardcoded secrets in codebase
- [ ] 0 open critical bugs

---

## SPRINT 2 — Insurance Master Data

**Sprint Goal:** Insurance desk admin can manage all master data — insurance companies, TPAs, and insurance products/plans.

**Sprint Duration:** Weeks 3–4

---

### User Stories

---

**US-006: Insurance Company Management**  
*As an Insurance Admin, I want to add, edit, and manage insurance companies so I can configure all empanelled insurers.*

**Story Points:** 5  
**Priority:** Must Have

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/insurance/companies | List all (paginated, searchable) |
| POST | /api/v1/insurance/companies | Create new |
| GET | /api/v1/insurance/companies/:id | Get detail |
| PUT | /api/v1/insurance/companies/:id | Update |
| PATCH | /api/v1/insurance/companies/:id/status | Activate/Deactivate |

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T006-1 | Insurance company CRUD API (all 5 endpoints) | 3 hours |
| T006-2 | Input validation schema for insurance company | 1 hour |
| T006-3 | Insurance company list page (table, search, filter) | 3 hours |
| T006-4 | Insurance company create/edit form | 3 hours |
| T006-5 | Insurance company detail view | 1 hour |
| T006-6 | Integration tests for all 5 endpoints | 2 hours |

**Acceptance Criteria:**
- [ ] Can create insurance company with all fields
- [ ] Required fields validated (name, type, registration number)
- [ ] Duplicate registration number rejected
- [ ] Can activate/deactivate company
- [ ] List shows with search and pagination
- [ ] All endpoints return correct HTTP status codes

---

**US-007: TPA Management**  
*As an Insurance Admin, I want to manage TPAs and link them to insurance companies.*

**Story Points:** 4  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T007-1 | TPA CRUD API (5 endpoints) | 2 hours |
| T007-2 | Insurance company ↔ TPA relationship management | 2 hours |
| T007-3 | TPA list page | 2 hours |
| T007-4 | TPA create/edit form | 2 hours |
| T007-5 | Integration tests | 1.5 hours |

**Acceptance Criteria:**
- [ ] TPA created and linked to one or more insurance companies
- [ ] TPA contact details (email, phone, portal URL) stored
- [ ] TPA list filterable by insurance company
- [ ] Integration tests pass

---

**US-008: Insurance Products/Plans Management**  
*As an Insurance Admin, I want to manage insurance products (Individual Health, Family Floater, Corporate, PMJAY, etc.).*

**Story Points:** 4  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T008-1 | Insurance products CRUD API | 2 hours |
| T008-2 | Product-to-insurance company linkage | 1 hour |
| T008-3 | Products list page | 2 hours |
| T008-4 | Product create/edit form | 2 hours |
| T008-5 | Room category limits per product | 1.5 hours |
| T008-6 | Integration tests | 1.5 hours |

**Acceptance Criteria:**
- [ ] Products linked to insurance company and TPA
- [ ] Room category and sub-limit fields configurable
- [ ] Pre-authorization requirement flag configurable per product

---

**Sprint 2 Review Checklist:**
- [ ] Admin can add all master data without developer help
- [ ] All validation working (required fields, duplicate checks)
- [ ] All integration tests passing
- [ ] UI is usable (consistent with HMS UI style)
- [ ] 0 open critical bugs

---

## SPRINT 3 — Patient Insurance Registration

**Sprint Goal:** Insurance desk can register and manage patient insurance policies, search by policy number, and view policy status.

**Sprint Duration:** Week 5 (3-day sprint; remaining 2 days = buffer/review)

---

### User Stories

---

**US-009: Patient Insurance Policy Registration**  
*As an Insurance Desk Officer, I want to register a patient's insurance policy so the system knows what coverage they have.*

**Story Points:** 6  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T009-1 | Patient search (from HMS registration module) | 2 hours |
| T009-2 | Policy registration API | 3 hours |
| T009-3 | Policy registration form UI | 4 hours |
| T009-4 | Policy validation (expiry, active status) | 2 hours |
| T009-5 | Policy list and search page | 2 hours |
| T009-6 | Policy status management (suspend, reactivate) | 1 hour |
| T009-7 | Multiple policies per patient support | 1 hour |
| T009-8 | Integration tests | 2 hours |

**Acceptance Criteria:**
- [ ] Patient searched by name/UHID/phone
- [ ] Policy registered with all fields
- [ ] Expired policy shows warning
- [ ] Duplicate policy number rejected
- [ ] Policy active/inactive status manageable
- [ ] Multiple policies per patient supported

---

**Phase 1 Final Acceptance:**
- [ ] New patient's insurance policy can be registered
- [ ] Insurance company and TPA correctly linked
- [ ] Policy searchable by policy number and patient name
- [ ] All RBAC rules enforced on master data screens

---

## SPRINT 4 — Pre-Authorization Workflow

**Sprint Goal:** Insurance desk can create, submit, and track pre-authorization requests. The complete pre-auth lifecycle works end-to-end.

**Sprint Duration:** Weeks 6–7

---

### User Stories

---

**US-010: Create Pre-Authorization Request**  
*As an Insurance Desk Officer, I want to create a pre-authorization request for an admitted patient.*

**Story Points:** 8  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T010-1 | Pre-auth state machine (all states, all transitions) | 3 hours |
| T010-2 | Create pre-auth API | 3 hours |
| T010-3 | Pre-auth form UI (all fields from doc 10) | 5 hours |
| T010-4 | Patient + policy auto-fill on form | 2 hours |
| T010-5 | Pre-auth list page with status, filters | 3 hours |
| T010-6 | Pre-auth detail view | 2 hours |
| T010-7 | Submit pre-auth (status: draft → submitted) | 2 hours |
| T010-8 | Record TPA response (approve / query / reject) | 2 hours |

**Acceptance Criteria:**
- [ ] Pre-auth created for admitted patient
- [ ] All required fields validated
- [ ] Status transitions enforced (cannot submit if draft incomplete)
- [ ] TPA response recordable (approve/query/reject)
- [ ] Pre-auth shows correct status throughout

---

**US-011: Pre-Auth Enhancement**  
*As an Insurance Desk Officer, I want to submit an enhancement request when the approved amount is insufficient.*

**Story Points:** 3  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T011-1 | Enhancement request API (linked to parent pre-auth) | 2 hours |
| T011-2 | Enhancement UI (shows original approval + new request) | 3 hours |
| T011-3 | Enhancement history tracking | 1 hour |

**Acceptance Criteria:**
- [ ] Enhancement linked to original pre-auth
- [ ] Enhancement amount + total approved shown clearly
- [ ] Enhancement history viewable

---

**Sprint 4 Review Checklist:**
- [ ] Full pre-auth cycle from creation to TPA response works
- [ ] State machine enforced (no invalid transitions)
- [ ] Enhancement workflow works
- [ ] Pre-auth expiry date tracked
- [ ] All integration tests passing

---

## SPRINT 5 — Claim Workflow

**Sprint Goal:** Insurance desk can create, document, submit, and close insurance claims for cashless patients.

**Sprint Duration:** Weeks 8–9

---

### User Stories

---

**US-012: Claim Creation and Submission**  
*As an Insurance Desk Officer, I want to create and submit an insurance claim for a discharged patient.*

**Story Points:** 10  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T012-1 | Claim state machine | 3 hours |
| T012-2 | Create claim API (linked to pre-auth if cashless) | 3 hours |
| T012-3 | Claim form UI — patient, policy, diagnosis section | 4 hours |
| T012-4 | Claim form UI — billing line items section | 4 hours |
| T012-5 | Pre-auth vs claim amount comparison logic | 2 hours |
| T012-6 | Claim submission (validates doc checklist completeness) | 2 hours |
| T012-7 | Record TPA response (approve / partial / reject) | 3 hours |
| T012-8 | Claim list page (with status, age, filters) | 3 hours |
| T012-9 | Claim detail/summary view | 2 hours |
| T012-10 | Integration tests | 3 hours |

**Acceptance Criteria:**
- [ ] Claim created with all line items
- [ ] Total claim amount calculated correctly
- [ ] Pre-auth vs claim amount comparison works
- [ ] Submission blocked if document checklist incomplete
- [ ] Approval/partial approval/rejection recordable
- [ ] State machine enforced

---

**US-013: Claim Rejection Dispute**  
*As an Insurance Admin, I want to dispute a rejected claim and track its dispute status.*

**Story Points:** 4  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T013-1 | Dispute initiation API | 1.5 hours |
| T013-2 | Dispute UI (reason, additional docs, escalation) | 3 hours |
| T013-3 | Dispute status tracking | 1 hour |
| T013-4 | Dispute resolution recording | 1 hour |

---

**Sprint 5 Review Checklist:**
- [ ] Full claim lifecycle from creation to closure works
- [ ] Dispute workflow works
- [ ] State machine prevents invalid transitions
- [ ] All integration tests pass

---

## SPRINT 6 — Documents, Audit & Notifications

**Sprint Goal:** Document upload/management works for all claim types. All actions are audited. Notifications are sent on key events.

**Sprint Duration:** Weeks 10–11

---

### User Stories

---

**US-014: Document Management**  
*As an Insurance Desk Officer, I want to upload and manage required documents for each claim.*

**Story Points:** 6  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T014-1 | Document upload API (type validation, size limit, virus scan) | 4 hours |
| T014-2 | Document upload UI component (multi-file, progress) | 3 hours |
| T014-3 | Document checklist per claim type | 2 hours |
| T014-4 | Document checklist status in claim form | 2 hours |
| T014-5 | Document download (authenticated, access-controlled) | 2 hours |
| T014-6 | Document version tracking | 1 hour |
| T014-7 | Tests (invalid type, size limit, missing required docs) | 2 hours |

---

**US-015: Comprehensive Audit Logging**  
*As an Auditor, I want every action in the Insurance Module to be logged so I can trace what happened.*

**Story Points:** 4  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T015-1 | Audit log service implementation | 3 hours |
| T015-2 | Wire audit log to all state changes (pre-auth + claims) | 3 hours |
| T015-3 | Audit log API (list, filter by user/action/record) | 2 hours |
| T015-4 | Audit log UI page | 2 hours |
| T015-5 | Verify immutability (no UPDATE/DELETE on audit_logs) | 1 hour |

---

**US-016: Notification System**  
*As an Insurance Desk Officer, I want to receive notifications for key events (pre-auth approved, claim rejected, documents needed).*

**Story Points:** 4  
**Priority:** Must Have

**Tasks:**

| Task # | Task | Estimate |
|---|---|---|
| T016-1 | In-app notification creation and storage | 2 hours |
| T016-2 | Notification bell UI (unread count, list, mark read) | 3 hours |
| T016-3 | Email notification service (templates for 5 key events) | 3 hours |
| T016-4 | Wire notifications to all key events | 2 hours |

---

**Sprint 6 Review Checklist:**
- [ ] Documents upload with type and size validation
- [ ] Claim submission blocked if required docs missing
- [ ] All actions create audit log entries
- [ ] Notifications sent on key events
- [ ] E2E test of complete cashless workflow passes

---

## SPRINT 7 — EMR & Billing Integration

**Sprint Goal:** Pre-auth forms and claims auto-populate from EMR data. Billing line items flow into claims automatically.

**Sprint Duration:** Weeks 12–13

*(Detailed tasks in document 22_EMR_Integration.md)*

**Key User Stories:**
- US-017: EMR data auto-populates pre-auth form
- US-018: Claim auto-generated on patient discharge
- US-019: Billing line items auto-populate claim
- US-020: ICD-10 and CPT code lookup works

**Sprint 7 Review Checklist:**
- [ ] Pre-auth form auto-fills from EMR
- [ ] Claim created within 60s of discharge event
- [ ] Billing items map correctly to claim sections
- [ ] ICD-10/CPT search works

---

## SPRINT 8 — Settlement, Finance & Reimbursement

**Sprint Goal:** Finance team can process settlements. AR is updated in real-time. Reimbursement workflow is available.

**Sprint Duration:** Weeks 14–15

**Key User Stories:**
- US-021: Record full settlement payment
- US-022: Record partial settlement with deductions
- US-023: Finance AR updated on settlement
- US-024: Reimbursement claim submission
- US-025: Settlement receipt PDF generation

**Sprint 8 Review Checklist:**
- [ ] Full and partial settlements recorded correctly
- [ ] Finance AR reflects correct outstanding amounts
- [ ] Deductions categorized and reportable
- [ ] Reimbursement workflow complete
- [ ] Settlement receipt PDF generated

---

## SPRINT 9 — Reporting & Dashboards

**Sprint Goal:** All stakeholders can view the reports and dashboards they need. Reports export to PDF and Excel.

**Sprint Duration:** Weeks 16–17

*(Detailed tasks in document 23_Reporting.md)*

**Key User Stories:**
- US-026: Executive dashboard with KPIs and charts
- US-027: Claims pending operational report
- US-028: TPA AR aging financial report
- US-029: TPA performance scorecard
- US-030: Scheduled report email delivery

**Sprint 9 Review Checklist:**
- [ ] All 10+ reports generating correct data
- [ ] Dashboard shows real-time KPIs
- [ ] PDF and Excel export working
- [ ] Scheduled reports delivered on schedule

---

## SPRINT 10 — Security Hardening, UAT & Launch

**Sprint Goal:** System is secure, tested, and production-ready. Hospital staff are trained. System is live.

**Sprint Duration:** Weeks 18–20

**Key User Stories:**
- US-031: All inputs validated and sanitized
- US-032: Sensitive data encrypted at rest
- US-033: Rate limiting and security headers applied
- US-034: OWASP Top 10 review completed
- US-035: UAT completed and signed off
- US-036: Production deployment successful
- US-037: Staff trained and system live

**Sprint 10 Review Checklist:**
- [ ] OWASP Top 10 checklist completed
- [ ] Performance tests pass at baseline load
- [ ] UAT sign-off received from all role testers
- [ ] Production deployment successful
- [ ] Smoke tests pass on production
- [ ] No S1 or S2 bugs open

---

## Backlog — Future Features (Not in Current Scope)

These items are captured for future sprints. Do NOT implement in the current roadmap.

| Feature | Business Value | Estimated Effort |
|---|---|---|
| TPA portal API integration (auto-submit pre-auth) | Very High | 4 weeks |
| ABDM/NHCX integration | High | 6 weeks |
| Mobile app for insurance desk | Medium | 8 weeks |
| AI-assisted claim coding (ICD-10 suggestion) | High | 6 weeks |
| Fraud detection analytics | High | 8 weeks |
| Automated claim processing (straight-through) | Very High | 10 weeks |
| Patient mobile app (claim status, documents) | Medium | 8 weeks |

---

## Definition of Done (Applied to Every Task)

- [ ] Code written and peer-reviewed (or self-reviewed for solo dev)
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing (for API changes)
- [ ] Input validation implemented
- [ ] Error handling implemented (no unhandled exceptions)
- [ ] Audit log created for auditable actions
- [ ] API endpoint documented (Swagger/Postman updated)
- [ ] UI component renders correctly in desktop viewport
- [ ] No console.log with sensitive data
- [ ] No hardcoded values (use config/env vars)
- [ ] Code committed to feature branch and PR raised

---
