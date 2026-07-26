# 25 — Test Plan

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Quality Assurance & Test Plan  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Testing Objectives](#1-testing-objectives)
2. [Testing Scope](#2-testing-scope)
3. [Testing Types & Strategy](#3-testing-types--strategy)
4. [Unit Testing Plan](#4-unit-testing-plan)
5. [Integration Testing Plan](#5-integration-testing-plan)
6. [End-to-End Testing Plan](#6-end-to-end-testing-plan)
7. [User Acceptance Testing (UAT)](#7-user-acceptance-testing-uat)
8. [Performance Testing](#8-performance-testing)
9. [Security Testing](#9-security-testing)
10. [Regression Testing](#10-regression-testing)
11. [Negative & Edge Case Tests](#11-negative--edge-case-tests)
12. [Test Data Requirements](#12-test-data-requirements)
13. [Test Environments](#13-test-environments)
14. [Bug Management](#14-bug-management)
15. [Go/No-Go Criteria](#15-gonogo-criteria)
16. [Tasks for Gemini](#16-tasks-for-gemini)

---

## 1. Testing Objectives

| Objective | Measurable Target |
|---|---|
| All critical workflows function correctly | 100% critical path test cases pass |
| No high-severity bugs in production release | 0 Severity 1 or 2 bugs at go-live |
| Performance requirements met | All API responses < 2 seconds under normal load |
| Security vulnerabilities addressed | OWASP Top 10 scan clean before go-live |
| Data integrity maintained | 100% data validation test cases pass |
| Role-based access enforced | All RBAC test cases pass |
| Audit trails complete | 100% of auditable actions create log entries |

---

## 2. Testing Scope

### 2.1 In Scope

- All Insurance Module screens and forms
- All Insurance Module APIs
- Database operations (CRUD)
- Workflow state transitions (pre-auth, claim lifecycle)
- Role-based access control
- Document upload/download/validation
- Integration with Billing module
- Integration with Finance module
- Integration with EMR module
- Notifications (email/SMS/in-app)
- Reporting and dashboards
- Audit logging
- Export functions (PDF, Excel)

### 2.2 Out of Scope

- Core HMS modules (tested separately)
- Infrastructure testing (handled by DevOps)
- External TPA portal integrations (system-to-system; tested in staging with mocks)
- ABDM/NHCX integration (Phase 2)
- Mobile app testing (Phase 2)
- Load testing beyond 500 concurrent users (Phase 2)

---

## 3. Testing Types & Strategy

| Test Type | Tool | Who Runs | When |
|---|---|---|---|
| Unit Tests | Jest + Testing Library | Gemini (developer) | Every commit |
| Integration Tests | Jest + Supertest | Gemini (developer) | Every PR |
| End-to-End Tests | Playwright or Cypress | Gemini / QA | Before release |
| UAT | Manual | Hospital staff | Sprint review |
| Performance Tests | k6 or Artillery | Gemini | Before go-live |
| Security Tests | OWASP ZAP + manual | Security reviewer | Before go-live |
| Regression Tests | Playwright (automated) | CI/CD pipeline | Every release |

### 3.1 Test Coverage Targets

| Layer | Target Coverage |
|---|---|
| Backend services | ≥ 80% line coverage |
| API controllers | ≥ 75% line coverage |
| Frontend components | ≥ 70% line coverage |
| Utility functions | ≥ 90% line coverage |
| Critical workflows | 100% happy path tested |

---

## 4. Unit Testing Plan

### 4.1 Backend Unit Tests

#### 4.1.1 Service Layer Tests

| Service | Test Cases |
|---|---|
| `claim_service.js` | Create claim, update status, calculate totals, validate eligibility |
| `preauth_service.js` | Create pre-auth, submit, approve, enhance, close |
| `settlement_service.js` | Record payment, calculate deductions, generate receipt |
| `emr_integration_service.js` | Fetch patient summary, handle missing data, error handling |
| `document_service.js` | Upload validation, type check, size check, hash generation |
| `notification_service.js` | Email trigger, SMS trigger, in-app notification |
| `audit_log_service.js` | Log creation, immutability, required fields |
| `icd10_service.js` | Code lookup, search, invalid code rejection |
| `cpt_service.js` | Code lookup, search |

#### 4.1.2 Utility Function Tests

| Utility | Test Cases |
|---|---|
| `encryption_utils.js` | Encrypt/decrypt cycle, masked display, key usage |
| `jwt_utils.js` | Token generation, verification, expiry, tamper detection |
| `date_utils.js` | Date calculation (days pending, TAT), timezone handling |
| `currency_utils.js` | Amount formatting, rounding, sum totals |
| `validation_utils.js` | Policy number format, date validation, amount limits |

#### 4.1.3 Model/ORM Tests

- CRUD operations on each model
- Relationships and associations
- Required field enforcement
- Unique constraint enforcement
- Soft delete behaviour

### 4.2 Frontend Unit Tests

| Component | Test Cases |
|---|---|
| `PreAuthForm` | Form renders, validation on submit, required field highlight |
| `ClaimForm` | Line items add/remove, total calculation, status display |
| `DocumentUpload` | File type rejection, size limit rejection, success upload |
| `ICD10SearchInput` | Autocomplete renders, selection works, invalid code rejected |
| `SettlementForm` | Deduction calculation, partial payment entry |
| `Dashboard KPI tiles` | Correct values rendered, loading state, error state |
| `ClaimStatusBadge` | Correct color per status |

---

## 5. Integration Testing Plan

### 5.1 API Integration Tests

All APIs tested using Supertest with an in-memory test database.

#### 5.1.1 Pre-Authorization APIs

| Test Case | Expected Result |
|---|---|
| POST /preauth with valid data | 201 + pre-auth created |
| POST /preauth without required fields | 422 + field errors |
| POST /preauth with invalid policy | 400 + policy error |
| GET /preauth/:id as authorized user | 200 + correct data |
| GET /preauth/:id as unauthorized role | 403 |
| PUT /preauth/:id/submit | 200 + status changed to submitted |
| PUT /preauth/:id/submit (already submitted) | 409 conflict |
| PUT /preauth/:id/approve as INSURANCE_DESK | 403 |

#### 5.1.2 Claim APIs

| Test Case | Expected Result |
|---|---|
| POST /claims with valid data | 201 + claim created |
| POST /claims for duplicate IP number | 409 + duplicate warning |
| PUT /claims/:id/submit (incomplete docs) | 400 + missing doc list |
| PUT /claims/:id/submit (complete docs) | 200 + status submitted |
| PUT /claims/:id/status — invalid transition | 400 + state error |
| GET /claims with date filter | 200 + filtered results |
| DELETE /claims/:id | 403 (soft delete only by admin) |

#### 5.1.3 Settlement APIs

| Test Case | Expected Result |
|---|---|
| POST /settlements with full payment | 200 + claim settled |
| POST /settlements with partial payment | 200 + claim partially settled |
| POST /settlements exceeding claim amount | 400 + amount error |
| POST /settlements for non-existent claim | 404 |

#### 5.1.4 Module Integration Tests

| Integration | Test Scenario | Expected |
|---|---|---|
| EMR → Insurance | Fetch patient summary for admitted patient | Patient data returned |
| EMR → Insurance | Fetch summary for non-existent patient | 404 handled |
| Billing → Insurance | Fetch billing line items for claim | Line items mapped correctly |
| Insurance → Finance | Settlement recorded in finance | Finance AR updated |
| Insurance → Notification | Claim status changed → notification sent | Notification created |
| Insurance → Audit | Every state change creates audit log | Audit entry present |

---

## 6. End-to-End Testing Plan

### 6.1 Critical E2E Scenarios

#### E2E-001: Complete Cashless Hospitalization Workflow

```
1. Insurance desk registers patient insurance policy
2. Patient admitted to IPD
3. Insurance desk opens pre-auth form (auto-populated from EMR)
4. Submits pre-auth to TPA
5. TPA approves pre-auth (manual input)
6. Patient discharged
7. Claim auto-generated from discharge event
8. Insurance desk reviews and completes claim
9. Documents uploaded and verified
10. Claim submitted to TPA
11. TPA approves claim
12. Settlement recorded
13. Finance notified
14. Claim closed
```

**Expected:** Claim status moves through all states; all notifications triggered; audit log complete; settlement reflected in AR.

---

#### E2E-002: Reimbursement Claim Workflow

```
1. Patient presents with insurance card (OPD/post-treatment)
2. Insurance desk creates reimbursement claim
3. Patient uploads documents (manual upload)
4. Insurance desk verifies documents
5. Claim submitted to insurance company
6. Insurance company requests additional documents
7. Additional documents uploaded
8. Insurance company approves partial amount
9. Partial settlement recorded
10. Claim partially closed; remainder disputed
```

**Expected:** Partial settlement correctly recorded; balance shows as disputed; report reflects correctly.

---

#### E2E-003: Pre-Auth Enhancement Workflow

```
1. Initial pre-auth approved for ₹50,000
2. Patient condition deteriorates; requires ICU
3. Enhancement pre-auth submitted for additional ₹30,000
4. TPA approves enhancement
5. Claim submitted for ₹78,000 (within enhanced limit)
6. Claim approved
```

---

#### E2E-004: Claim Rejection & Dispute Workflow

```
1. Claim submitted
2. TPA rejects claim with reason "policy exclusion"
3. Insurance desk disputes rejection
4. Additional clinical documents uploaded
5. Dispute escalated
6. TPA reverses decision; approves partial amount
7. Settlement recorded for partial amount
```

---

#### E2E-005: Role Access Control Verification

```
1. Login as INSURANCE_DESK
   → Can create pre-auth: YES
   → Can approve pre-auth: NO (403)
   → Can submit claim: YES
   → Can process settlement: NO (403)
   → Can view audit logs: NO (403)

2. Login as FINANCE_STAFF
   → Can view claims: YES
   → Can create claims: NO (403)
   → Can process settlement: YES
   → Can approve settlement: NO (only FINANCE_HEAD)

3. Login as AUDITOR
   → Can view all claims: YES
   → Can create anything: NO (403)
   → Can view audit logs: YES
   → Can export reports: YES
```

---

### 6.2 E2E Testing Tool Setup

**Playwright** recommended for E2E:
- Tests written in TypeScript
- Page Object Model pattern
- Test data managed via fixtures
- Screenshots on failure
- CI/CD integrated (GitHub Actions)
- Test reports generated (HTML report)

---

## 7. User Acceptance Testing (UAT)

### 7.1 UAT Participants

| Role | Tester | Scenarios |
|---|---|---|
| Insurance Desk Officer | Actual hospital staff | Pre-auth, claim submission |
| Finance Staff | Finance team member | Settlement, AR reports |
| TPA Coordinator | TPA relationship staff | TPA workflows, reports |
| Hospital Administrator | Admin staff | Management dashboard, access control |
| Internal Auditor | Compliance staff | Audit reports |

### 7.2 UAT Test Scenarios

| Scenario | Tester | Pass Criteria |
|---|---|---|
| Register a new patient insurance policy | Insurance Desk | Policy saved; validation works |
| Submit pre-auth for a real patient case | Insurance Desk | Form works; notification sent |
| Process a settlement | Finance Staff | Amount recorded; receipt generated |
| Generate monthly AR aging report | Finance Staff | Report accurate; export works |
| View TPA scorecard | TPA Coordinator | KPIs correct |
| Export management dashboard | Hospital Admin | PDF generated; data correct |
| Review audit log | Auditor | All actions visible; filters work |

### 7.3 UAT Acceptance Threshold

| Metric | Minimum Pass |
|---|---|
| Critical scenarios passing | 100% |
| Non-critical scenarios passing | 90% |
| UAT sign-off from all role testers | Required |
| No Severity 1 or 2 bugs open | Required |

---

## 8. Performance Testing

### 8.1 Performance Requirements

| Scenario | Load | Target Response Time |
|---|---|---|
| Dashboard load | 50 concurrent users | < 3 seconds |
| Claim list (500 records) | 50 concurrent users | < 2 seconds |
| Pre-auth form save | 50 concurrent users | < 1 second |
| Report generation (1000 records) | 10 concurrent users | < 5 seconds |
| Document upload (5MB PDF) | 20 concurrent users | < 10 seconds |
| Login | 100 concurrent users | < 1 second |

### 8.2 Performance Test Scenarios

| Test | Tool | Load Profile |
|---|---|---|
| Baseline — normal load | k6 | 50 users, 5 mins |
| Stress — peak load | k6 | Ramp to 200 users |
| Spike test | k6 | Sudden burst to 200 |
| Endurance test | k6 | 50 users for 60 mins |
| Report generation under load | k6 | 10 concurrent report requests |

### 8.3 Performance Acceptance Criteria

- No errors at baseline load
- P95 response time < target
- No memory leaks detected (stable memory over 60-min endurance test)
- Database query execution < 200ms for all common queries

---

## 9. Security Testing

### 9.1 Security Test Cases

| Category | Test | Expected |
|---|---|---|
| Authentication | Login with wrong password 5x | Account locked for 30 min |
| Authentication | Access protected route without token | 401 |
| Authentication | Use expired JWT | 401 with TOKEN_EXPIRED code |
| Authentication | Tamper JWT payload | 401 |
| Authorization | INSURANCE_DESK access admin endpoint | 403 |
| Authorization | Access another branch's claims | 403 |
| Injection | SQL injection in search field | Input rejected / no SQL error |
| Injection | XSS in patient name field | Script not executed |
| File Upload | Upload PHP file as PDF | Rejected with error |
| File Upload | Upload 15MB file (limit 10MB) | Rejected with size error |
| CSRF | Cross-origin state-changing request | Blocked |
| Rate Limiting | 11th login attempt per minute | 429 Too Many Requests |
| Data Exposure | Aadhaar in API response | Only last 4 digits |
| Data Exposure | PHI in application logs | Not present |

---

## 10. Regression Testing

### 10.1 Regression Strategy

- Core workflow E2E tests run on every release
- Automated Playwright test suite as regression suite
- Minimum regression run: 30 minutes before any production deployment
- Full regression run: 2 hours quarterly

### 10.2 Regression Test Suite Contents

| Category | Test Count |
|---|---|
| Pre-authorization workflows | 15 tests |
| Claim lifecycle tests | 20 tests |
| Settlement tests | 10 tests |
| Document tests | 8 tests |
| RBAC tests | 20 tests |
| Report generation | 10 tests |
| Integration tests | 15 tests |
| **Total** | **~98 automated tests** |

---

## 11. Negative & Edge Case Tests

| Scenario | Expected Behavior |
|---|---|
| Pre-auth submitted without TPA assignment | Validation error: TPA required |
| Claim submitted with pre-auth amount exceeded by 200% | Warning flag; requires admin override |
| Same IP number claimed twice | Duplicate warning; require override |
| Settlement amount > claimed amount | Rejected with error |
| Document uploaded for closed claim | Rejected with status error |
| User access revoked mid-session | Next API call returns 401 |
| Pre-auth expired before claim submission | Warning shown; re-auth required |
| Insurance policy expired on admission date | Warning shown; manual override required |
| Empty claim (₹0 total) | Rejected with error |
| Claim submission during system maintenance window | Queued or rejected with clear message |
| Concurrent edits to same claim | Last-write-wins with conflict warning |
| TPA system returns error | Graceful error shown; retry option |
| Large document package (50MB total) | Upload rejected; individual file limit enforced |
| Special characters in patient name | Handled correctly; no encoding errors |
| Future admission date entered | Validation error |
| Discharge date before admission date | Validation error |

---

## 12. Test Data Requirements

### 12.1 Test Patient Data (Anonymized/Synthetic)

| Required | Count |
|---|---|
| Test patients with active insurance policies | 20 |
| Test patients with expired policies | 5 |
| Test patients with corporate insurance | 5 |
| Test patients with TPA-managed claims | 10 |
| Test patients with PMJAY coverage | 5 |
| Test patients with no insurance | 5 |

### 12.2 Test Insurance Master Data

| Required | Count |
|---|---|
| Test insurance companies | 5 |
| Test TPA companies | 3 |
| Test corporate employers | 3 |
| Test insurance products | 10 |

### 12.3 Test Documents

| Required | Details |
|---|---|
| Sample discharge summary PDF | Doctor-signed, dated |
| Sample prescription PDF | Drug names, quantity |
| Sample lab report PDF | Standard lab format |
| Sample pre-auth approval letter | TPA letterhead |
| Sample claim rejection letter | With reason code |
| Large test file (11MB) | For size limit testing |
| Invalid file type (PHP) | For upload security testing |

---

## 13. Test Environments

| Environment | Purpose | Data |
|---|---|---|
| **Local (Dev)** | Unit tests, development testing | Seed data, minimal |
| **Test (CI/CD)** | Automated integration tests | Synthetic test data |
| **Staging** | UAT, E2E tests, performance tests | Anonymized copy of production-like data |
| **Production** | Smoke tests only after deployment | Real data |

### 13.1 Environment Parity

- Staging must mirror production configuration
- Same database version
- Same Node.js version
- Same environment variables (with test values)
- TPA integrations use mock services in staging

---

## 14. Bug Management

### 14.1 Bug Severity Classification

| Severity | Definition | Examples | Resolution Target |
|---|---|---|---|
| **S1 — Critical** | System crash, data loss, security breach | Data not saved, unauthorized access | Immediate (same day) |
| **S2 — High** | Core workflow broken, wrong financial amounts | Claim can't be submitted, wrong settlement | Within 24 hours |
| **S3 — Medium** | Feature broken but workaround exists | Report filter wrong, minor calculation | Within 3 days |
| **S4 — Low** | UI issues, minor text errors | Label typo, color mismatch | Within 1 week |

### 14.2 Bug Report Template

```
Title: [Component] Brief description

Severity: S1 / S2 / S3 / S4
Environment: Dev / Test / Staging
Version: x.x.x

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:

Actual Result:

Screenshots/Logs:

Test Data Used:
```

---

## 15. Go/No-Go Criteria

### 15.1 Mandatory Pass Requirements for Go-Live

| Criterion | Requirement |
|---|---|
| Critical (S1) bugs open | 0 |
| High (S2) bugs open | 0 |
| Critical E2E scenarios | 100% passing |
| RBAC test cases | 100% passing |
| Security scan | No high/critical findings |
| Performance targets | All met at baseline load |
| UAT sign-off | All designated testers signed off |
| Audit log verification | 100% of auditable actions logged |
| Data integrity tests | 100% passing |

### 15.2 Acceptable at Go-Live (With Documented Exceptions)

| Criterion | Acceptable |
|---|---|
| Medium (S3) bugs open | ≤ 5, with workarounds documented |
| Low (S4) bugs open | ≤ 10 |
| Non-critical E2E scenarios | ≥ 90% passing |
| Unit test coverage | ≥ 75% (target 80%) |

---

## 16. Tasks for Gemini

---

### TASK QA-001: Testing Infrastructure Setup

**Objective:** Set up the complete testing infrastructure for both backend and frontend.

**Backend:**
- Jest configuration with test database
- Supertest for API testing
- Test database seed scripts
- Coverage reporting (Istanbul/nyc)

**Frontend:**
- React Testing Library
- Jest configuration for components
- Mock service worker (MSW) for API mocking

**Files Likely Created:**
- `jest.config.js`
- `jest.setup.js`
- `tests/helpers/test_db.js` — test database utilities
- `tests/helpers/auth_helper.js` — login helper for tests
- `tests/fixtures/` — test data fixtures
- `tests/mocks/` — mock service responses

**Acceptance Criteria:**
- `npm test` runs all tests
- `npm run test:coverage` shows coverage report
- Test database created fresh before each test suite
- CI/CD runs tests on every PR

**Priority:** Critical  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK QA-002: Unit Tests for Core Services

**Objective:** Write unit tests for all core Insurance Module services.

**Coverage Required:**
- `claim_service.js` — 80% coverage
- `preauth_service.js` — 80% coverage
- `settlement_service.js` — 80% coverage
- `document_service.js` — 80% coverage
- `audit_log_service.js` — 90% coverage

**Test Count Target:** Minimum 50 unit tests across all services.

**Acceptance Criteria:**
- All tests pass
- Coverage targets met
- Tests run in < 30 seconds total

**Priority:** High  
**Estimated Effort:** 4 days  
**Risk Level:** Low

---

### TASK QA-003: API Integration Tests

**Objective:** Integration tests for all Insurance Module API endpoints.

**Test File Structure:**
```
tests/
  integration/
    preauth.test.js
    claims.test.js
    settlements.test.js
    documents.test.js
    reports.test.js
    auth.test.js
```

**Minimum Test Cases:** 80 integration tests.

**Acceptance Criteria:**
- All happy path scenarios pass
- All error scenarios return correct HTTP status codes
- All RBAC scenarios tested (unauthorized = 403)
- All validation scenarios tested (invalid input = 422)

**Priority:** High  
**Estimated Effort:** 5 days  
**Risk Level:** Low

---

### TASK QA-004: Playwright E2E Test Suite

**Objective:** Build the E2E test suite covering all 5 critical workflow scenarios.

**Files Likely Created:**
```
e2e/
  pages/
    PreAuthPage.ts
    ClaimPage.ts
    SettlementPage.ts
  tests/
    cashless_workflow.spec.ts
    reimbursement_workflow.spec.ts
    pre_auth_enhancement.spec.ts
    rejection_dispute.spec.ts
    rbac_access_control.spec.ts
  fixtures/
    test_patient.json
    test_insurance.json
```

**Acceptance Criteria:**
- All 5 E2E scenarios pass in staging environment
- Tests run headless in CI/CD
- Screenshots captured on failure
- HTML report generated

**Priority:** High  
**Estimated Effort:** 5 days  
**Risk Level:** Medium

---

### TASK QA-005: Performance Test Scripts

**Objective:** k6 performance test scripts for critical endpoints.

**Files Likely Created:**
- `performance/baseline_test.js`
- `performance/dashboard_load_test.js`
- `performance/claim_submission_stress_test.js`

**Acceptance Criteria:**
- All performance targets met at baseline (50 concurrent users)
- Report generated showing P50, P95, P99 response times
- Error rate < 0.1% at baseline

**Priority:** Medium  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

**Executive Summary:** A comprehensive test plan is the safety net that ensures the Insurance Module handles real-world hospital operations reliably. The combination of unit tests (developer confidence), integration tests (module correctness), E2E tests (workflow completeness), and UAT (business validation) provides multiple layers of quality assurance before the module goes live.

---
