# 📋 PRD — Insurance Module (PART 5 of 5)
# Sections 11–15: Git Workflow, Sprint Plan, Risk Register, Team Guidance, Appendix

---

## SECTION 11: Git Workflow for This Module

### Branch Strategy

```
main (production-ready)
  └── develop (integration branch)
        └── feature/insurance-module (Siddhant's main feature branch)
              ├── feature/insurance-schema-setup
              ├── feature/insurance-policy-management
              ├── feature/insurance-preauth
              ├── feature/insurance-claims
              ├── feature/insurance-documents
              ├── feature/insurance-billing-integration
              ├── feature/insurance-reports
              └── feature/insurance-notifications
```

### Commit Message Convention

Format: `[INSURANCE]: <type>: <short description>`

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

**Examples:**
```
[INSURANCE]: feat: Add insurance policy registration API
[INSURANCE]: feat: Create pre-auth form UI with validation
[INSURANCE]: fix: Correct co-pay calculation in billing summary
[INSURANCE]: refactor: Extract document upload logic to middleware
[INSURANCE]: docs: Update API contract for billing integration
[INSURANCE]: test: Add unit tests for claim status transitions
[INSURANCE]: chore: Update multer config for file size limit
```

### Pull Request Template

```markdown
## [INSURANCE] PR: <Feature Name>

### What does this PR do?
- Brief description of the feature/fix

### Changes Made
- [ ] Backend: Models / Routes / Controllers
- [ ] Frontend: Components / Pages / CSS
- [ ] Database: Schema changes
- [ ] Documentation: API contracts / README

### Testing
- [ ] Tested locally with `npm run dev`
- [ ] API tested via Postman / curl
- [ ] UI tested in browser
- [ ] No console errors

### Dependencies on Other Modules
- Does this need changes from Billing? (Yes/No)
- Does this need data from Reception? (Yes/No)

### Screenshots (if UI change)
```

### Review Checklist Before Merge
1. Code compiles without errors
2. No `console.log` left in production code
3. All API endpoints return proper error responses
4. RBAC middleware applied to protected routes
5. Form validations working (frontend + backend)
6. No hardcoded URLs (use environment variables)
7. Commit messages follow convention
8. No merge conflicts with `develop`

---

## SECTION 12: Development Execution Plan (Sprint Breakdown)

---

### MONTH 1 — Foundation (Weeks 1–4)

**Week 1: Schema & Environment**

| Day | Task | Output |
|---|---|---|
| 1 | Set up feature branch, review team codebase, sync with develop | Branch ready |
| 2 | Create all 9 Mongoose models (schema files) | `/models/insurance/*.js` |
| 3 | Create seed data scripts for TPA, insurers, govt schemes | `/seeds/insuranceSeed.js` |
| 4 | Set up insurance route file structure, test basic health check endpoint | `/routes/insurance/*.js` |
| 5 | Integrate insurance routes into main `index.js`, test with Postman | Routes mounted at `/api/insurance` |

**Week 2: Core APIs — Policy & Scheme**

| Day | Task | Output |
|---|---|---|
| 1 | Build Policy CRUD APIs (POST, GET, PUT, DELETE) | 6 endpoints working |
| 2 | Build Government Scheme CRUD APIs | 4 endpoints working |
| 3 | Add verification status update endpoints | PATCH endpoints |
| 4 | Add input validation middleware (express-validator) | Validation on all POST/PUT |
| 5 | Write Postman collection for all built APIs | `insurance-api.postman_collection.json` |

**Week 3: Core APIs — Pre-Auth & Claims**

| Day | Task | Output |
|---|---|---|
| 1 | Build Pre-Auth CRUD APIs | 6 endpoints |
| 2 | Build Claims CRUD APIs | 6 endpoints |
| 3 | Build document upload API (multer integration) | Upload endpoint working |
| 4 | Build dashboard stats API | Aggregation pipeline working |
| 5 | Build billing-summary API for Billing module integration | Integration endpoint ready |

**Week 4: Base Frontend Setup**

| Day | Task | Output |
|---|---|---|
| 1 | Update Layout.jsx sidebar with all Insurance navigation items | Sidebar updated |
| 2 | Build Insurance Dashboard with StatsCards | Dashboard UI |
| 3 | Build Policy Registration form (Private insurance) | Form with validation |
| 4 | Build Scheme Enrollment form (Government schemes) | Scheme-specific fields |
| 5 | Connect forms to backend APIs with Axios | End-to-end flow |

**Month 1 Definition of Done:**
- All 9 MongoDB collections created with proper schemas
- 30+ API endpoints functional and tested via Postman
- Dashboard, Policy Registration, and Scheme Enrollment screens working
- Frontend connected to backend for core flows

---

### MONTH 2 — Core Features (Weeks 5–8)

**Week 5:** Pre-Auth form UI + status tracker table + status update flow
**Week 6:** Cashless claim filing screen + document checklist + claim status tracking
**Week 7:** Document upload screen (drag-drop, categorize, preview) + document listing per claim
**Week 8:** Claim status dashboard with filters, search, pagination, status-wise counts

**Month 2 Definition of Done:**
- Pre-auth → Claim → Document Upload flow works end-to-end
- Claims dashboard with filters is functional
- Document upload with categorization is working

---

### MONTH 3 — Advanced Features (Weeks 9–12)

**Week 9:** Reimbursement claim workflow + Part B data generation + printable view
**Week 10:** TPA management screen (Admin) + Insurer management + Forms directory
**Week 11:** Insurance-Billing integration API + InsuranceSplitCard component for Billing module
**Week 12:** Notifications system — alert triggers, notification bell, alert list

**Month 3 Definition of Done:**
- Both cashless and reimbursement workflows complete
- Master data management (TPA, Insurers, Forms) functional
- Billing integration API ready and documented
- Notification system showing real-time alerts

---

### MONTH 4 — Integration Sprint (Weeks 13–16)

**Week 13:** Coordinate with Billing module (Prajwal) — test billing-summary API, verify deduction calculations
**Week 14:** Coordinate with Reception (Namrata) — ensure patient data flows correctly into insurance registration
**Week 15:** End-to-end testing: Patient registers → Insurance verified → Pre-auth → Treatment → Claim → Bill → Settlement
**Week 16:** Fix integration bugs, handle edge cases (expired policy, rejected pre-auth, partial settlement)

**Dependencies:**
- FROM Billing (Prajwal): `billId`, `totalBillAmount`, bill line items API
- FROM Reception (Namrata): `patientId`, patient demographics, admission data
- FROM Doctor: Diagnosis data, treatment notes
- TO Billing: `GET /api/insurance/billing-summary/:patientId`

**Month 4 Definition of Done:**
- Insurance ↔ Billing integration tested and working
- Patient registration → Insurance → Billing flow is seamless
- All edge cases documented and handled

---

### MONTH 5 — Polish & Edge Cases (Weeks 17–20)

**Week 17:** Form validations — all frontend forms have inline validation, error messages
**Week 18:** Error handling — all APIs return structured errors, frontend shows user-friendly messages
**Week 19:** Reports screen — all 5 reports with date filters and CSV export
**Week 20:** UI polish — loading states, empty states, responsive design, animations

**Month 5 Definition of Done:**
- No unhandled errors in any user flow
- All reports generating accurate data
- UI is polished and consistent with team's design language

---

### MONTH 6 — Testing, Docs & Demo (Weeks 21–24)

**Week 21:** Manual testing — test every screen, every form, every API with realistic data
**Week 22:** Bug fixes from testing, performance optimization (add DB indexes, optimize queries)
**Week 23:** Write documentation — README for Insurance module, API documentation, deployment notes
**Week 24:** Final demo preparation — prepare demo script, seed realistic data, practice demo

**Month 6 Definition of Done:**
- Zero critical bugs
- Documentation complete
- Demo-ready with realistic data

---

## SECTION 13: Risk Register

| # | Risk | Probability | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Billing module API not ready when Insurance needs it | High | High | Build mock billing API; use `json-server` for development. Sync with Prajwal weekly. | Siddhant + Prajwal |
| R2 | Insurance form versions change on insurer websites | Medium | Medium | HMS stores URLs, not forms. "Last Verified" date alerts staff. No legal liability. | Siddhant |
| R3 | Scope creep — team asks for more insurer integrations | High | Medium | PRD clearly defines v1 scope. Any new insurer = add to master data, not new code. | Siddhant |
| R4 | MongoDB schema changes break existing data | Medium | High | Use schema versioning. Never delete fields — deprecate. Run migration scripts. | Siddhant |
| R5 | Merge conflicts with Billing module on shared patient data | High | Medium | Define clear API contract (Section 6.8). Insurance never writes to Billing collection; Billing never writes to Insurance. | Siddhant + Prajwal |
| R6 | File upload storage fills up on server | Low | High | Set 5MB file limit. Monitor disk usage. Plan: migrate to cloud storage (S3) in v2. | Siddhant |
| R7 | JWT token handling inconsistency across modules | Medium | High | Use shared auth middleware. Standardize token format with team. | Siddhant + Team |
| R8 | Siddhant burnout from owning full-stack alone | Medium | High | Follow sprint plan strictly. Take breaks. Prioritize P0 features. Skip P2 if behind schedule. | Siddhant |
| R9 | Patient data privacy violation | Low | Critical | Encrypt sensitive fields. Apply RBAC strictly. Log all access. No patient data in URLs or logs. | Siddhant |
| R10 | Team member delays blocking Insurance module | Medium | Medium | Design module to work independently with mock data. Only Month 4 requires real integration. | Siddhant |

---

## SECTION 14: First-Time Team Developer Guidance

### Communication Best Practices

**Daily:**
- Post a 2-line status update in team WhatsApp/Slack: "Today: Built X. Blocker: None / Y"
- If blocked, say so immediately — don't wait for someone to ask

**When you need something from another module:**
1. Write a GitHub Issue with title: `[INSURANCE ← BILLING] Need bill line items API`
2. Describe: What you need, what format, by when
3. Tag the responsible person
4. Follow up in 2 days if no response

**PR Descriptions:**
- Never submit a PR with just "updated files"
- Always include: What changed, Why, How to test, Screenshots

### Collaboration Rules with Billing Module (Prajwal)

**The Sacred Contract:**
```
┌─────────────────────┐        ┌──────────────────────┐
│   INSURANCE MODULE   │  API   │    BILLING MODULE     │
│   (Siddhant's code)  │◄──────►│   (Prajwal's code)    │
│                       │        │                        │
│ OWNS:                 │        │ OWNS:                  │
│ - insurance_policies  │        │ - bills collection     │
│ - insurance_claims    │        │ - payment records      │
│ - pre_auth_requests   │        │ - bill_line_items      │
│ - claim_documents     │        │                        │
│                       │        │ CALLS:                 │
│ PROVIDES:             │        │ GET /api/insurance/    │
│ billing-summary API   │───────►│   billing-summary/     │
│                       │        │   :patientId           │
└─────────────────────┘        └──────────────────────┘
```

**Rules:**
1. Insurance NEVER writes to any Billing collection
2. Billing NEVER writes to any Insurance collection
3. All data exchange happens through APIs
4. If either module's API changes, the owner must update the API contract doc AND notify the other person

**Who owns `insuranceDeduction` on the Bill?**
- The **Billing module** stores it on the bill document
- But the **Insurance module** calculates it via `GET /billing-summary/:patientId`
- Billing calls Insurance API → gets the number → stores it on the bill

### Mindset Advice for First-Time Team Developer

**1. You will make mistakes. That's normal.**
- Accidentally pushing to wrong branch? `git reflog` saves you.
- Breaking another module's API? Revert, fix, communicate.
- Every senior developer has done all of this.

**2. Ask for help. It's a strength, not a weakness.**
- "I'm stuck on X for 2 hours" → Ask the team
- "I need Y from your module" → Write a GitHub Issue
- "I don't understand Z" → Google it for 30 min, then ask

**3. Merge conflicts are normal. Don't panic.**
```bash
# When you see a merge conflict:
git status                    # See which files conflict
# Open the file, look for <<<< ==== >>>> markers
# Keep the right code, delete the markers
git add <fixed-file>
git commit -m "[INSURANCE]: fix: Resolve merge conflict in index.js"
```

**4. Pace yourself across 6 months.**
- Month 1–2: Build core features (don't optimize yet)
- Month 3: Add advanced features (don't chase perfection)
- Month 4: Integrate with team (communicate daily)
- Month 5: Polish (now optimize and handle edge cases)
- Month 6: Test and document (resist adding new features)

**5. Your PRD is your daily guide.**
- Every morning: Open PRD, check sprint plan, pick today's task
- Every evening: Mark what you completed
- Every week: Compare progress against the plan

---

## SECTION 15: Appendix

### A. Glossary of Insurance Terms

| Term | Definition |
|---|---|
| **TPA** | Third Party Administrator — intermediary between insurer and hospital, processes claims |
| **Pre-Auth** | Pre-Authorization — advance approval from insurer before treatment begins |
| **Cashless** | Claim type where insurer pays hospital directly; patient pays nothing (or only non-covered items) |
| **Reimbursement** | Claim type where patient pays upfront, then claims money back from insurer |
| **HBP Code** | Health Benefit Package code — PM-JAY's standardized procedure codes with fixed prices |
| **ABHA** | Ayushman Bharat Health Account — 14-digit unique health ID under ABDM |
| **IRDAI** | Insurance Regulatory and Development Authority of India — regulates all insurance in India |
| **Co-Pay** | Percentage of bill the patient must pay even with insurance (e.g., 10% co-pay) |
| **Deductible** | Fixed amount patient pays before insurance kicks in |
| **Sub-Limit** | Maximum amount payable for specific items (e.g., room rent cap of ₹5,000/day) |
| **Sum Insured** | Total maximum amount the policy covers per year |
| **UTR Number** | Unique Transaction Reference — bank transfer reference for settlement payments |
| **Revenue Leakage** | Hospital services rendered but not billed/claimed — lost revenue |
| **Empanelment** | Hospital's registration/approval under an insurance scheme |
| **NHA** | National Health Authority — operates PM-JAY at central level |
| **SHA** | State Health Agency — operates PM-JAY at state level |
| **NHCX** | National Health Claims Exchange — standardized API for health claims |
| **ABDM** | Ayushman Bharat Digital Mission — India's digital health infrastructure |
| **ICD-10** | International Classification of Diseases, 10th edition — standard diagnosis codes |
| **DPDPA** | Digital Personal Data Protection Act, 2023 — India's data privacy law |

### B. Reference Links

**Government Scheme Portals:**
| Portal | URL |
|---|---|
| PM-JAY Official | https://pmjay.gov.in |
| NHA TMS Portal | https://tms.pmjay.gov.in |
| ABHA Creation | https://abha.abdm.gov.in |
| CGHS Official | https://cghs.nic.in |
| My CGHS App | https://mycghs.nic.in |
| ESIC Official | https://esic.gov.in |
| MJPJAY Official | https://www.jeevandayee.gov.in |

**TPA Portals:**
| TPA | Portal |
|---|---|
| Medi Assist | https://www.mediassisttpa.in |
| Paramount | https://www.paramounttpa.com |
| FHPL | https://www.fhpl.net |
| Vidal Health | https://www.vidalhealth.com |
| Raksha TPA | https://www.raboraksha.com |

**Private Insurer Claim Portals:**
| Insurer | Portal |
|---|---|
| Star Health | https://www.starhealth.in |
| New India Assurance | https://www.newindia.co.in |
| HDFC ERGO | https://www.hdfcergo.com |
| Bajaj Allianz | https://www.bajajallianz.com |
| ICICI Lombard | https://www.icicilombard.com |
| United India | https://uiic.co.in |

### C. Sample MongoDB Documents

**Sample `insurance_policies` document:**
```json
{
  "_id": "665a1b2c3d4e5f6789012345",
  "patientId": "664f0a1b2c3d4e5f67890001",
  "insuranceType": "Private",
  "providerName": "Star Health",
  "policyNumber": "SH-2026-78901",
  "planType": "Individual",
  "sumInsured": 500000,
  "subLimits": { "roomRentCap": 5000, "icuCap": 10000, "procedureCap": 0 },
  "coPayPercentage": 10,
  "deductible": 5000,
  "tpaId": "665b2c3d4e5f678901234567",
  "policyStartDate": "2026-01-01T00:00:00.000Z",
  "policyEndDate": "2026-12-31T23:59:59.000Z",
  "isNetworkHospital": true,
  "verificationStatus": "Verified — Active",
  "verifiedBy": "665c3d4e5f67890123456789",
  "verifiedAt": "2026-05-12T10:30:00.000Z",
  "isActive": true
}
```

**Sample `insurance_claims` document:**
```json
{
  "_id": "665d4e5f678901234567890a",
  "claimNumber": "CLM-20260512-0001",
  "patientId": "664f0a1b2c3d4e5f67890001",
  "policyId": "665a1b2c3d4e5f6789012345",
  "preAuthId": "665e5f67890123456789abcd",
  "claimType": "Cashless",
  "admissionDate": "2026-05-10T00:00:00.000Z",
  "dischargeDate": "2026-05-12T00:00:00.000Z",
  "diagnosis": "Acute Appendicitis",
  "icd10Code": "K35.80",
  "proceduresPerformed": "Laparoscopic Appendectomy",
  "treatingDoctor": "Dr. Sharma",
  "totalBillAmount": 130000,
  "claimedAmount": 130000,
  "approvedAmount": 120000,
  "coPayAmount": 12000,
  "deductibleAmount": 5000,
  "nonCoveredAmount": 4500,
  "patientPayable": 26500,
  "status": "Approved",
  "documentChecklist": {
    "admissionForm": true,
    "dischargeSummary": true,
    "investigationReports": true,
    "prescription": true,
    "doctorNotes": true,
    "billInvoice": true,
    "consentForm": true,
    "insuranceCardCopy": true,
    "idProof": true
  },
  "statusHistory": [
    { "status": "Draft", "changedAt": "2026-05-10T10:00:00Z", "changedBy": "user1" },
    { "status": "Submitted", "changedAt": "2026-05-12T11:00:00Z", "changedBy": "user1" },
    { "status": "Approved", "changedAt": "2026-05-12T15:00:00Z", "changedBy": "user1" }
  ]
}
```

**Sample `government_schemes` document:**
```json
{
  "_id": "665f6789012345678901bcde",
  "patientId": "664f0a1b2c3d4e5f67890002",
  "schemeName": "PM-JAY",
  "schemeSpecificData": {
    "abhaNumber": "12345678901234",
    "ayushmanCardNumber": "AY-MH-2026-56789",
    "familyId": "FAM-MH-001234",
    "hbpCode": "HBP-SUR-001"
  },
  "verificationStatus": "Verified — Active",
  "primaryScheme": true,
  "isActive": true
}
```

---

### D. Insurance Module File Structure (Final)

```
Backend/
├── models/
│   └── insurance/
│       ├── InsurancePolicy.js
│       ├── GovernmentScheme.js
│       ├── TPAMaster.js
│       ├── InsuranceCompany.js
│       ├── PreAuthRequest.js
│       ├── InsuranceClaim.js
│       ├── ClaimDocument.js
│       ├── OfficialFormsRegistry.js
│       └── InsuranceBillingMapping.js
├── routes/
│   └── insurance/
│       ├── policyRoutes.js
│       ├── schemeRoutes.js
│       ├── preAuthRoutes.js
│       ├── claimRoutes.js
│       ├── documentRoutes.js
│       ├── billingIntegrationRoutes.js
│       ├── masterDataRoutes.js
│       ├── reportRoutes.js
│       ├── notificationRoutes.js
│       └── index.js (aggregator)
├── middleware/
│   ├── upload.js
│   └── rbac.js
├── controllers/
│   └── insurance/
│       └── (one per route file)
└── seeds/
    └── insuranceSeed.js

frontend/src/
├── pages/
│   ├── Insurance.jsx (main container)
│   └── Insurance.css
├── components/
│   └── insurance/
│       ├── StatsCard.jsx
│       ├── PolicyForm.jsx
│       ├── SchemeForm.jsx
│       ├── PreAuthForm.jsx
│       ├── ClaimForm.jsx
│       ├── ClaimsTable.jsx
│       ├── DocumentUpload.jsx
│       ├── StatusBadge.jsx
│       ├── InsuranceSplitCard.jsx
│       └── NotificationBell.jsx
```

---

> **🏁 END OF PRD — All 15 Sections Complete**
>
> This document is Siddhant's single source of truth for the 6-month Insurance Module development.
>
> **Files:** PART1 (Sections 1–5) | PART2 (Sections 6–7) | PART3 (Section 8) | PART4 (Sections 9–10) | **PART5 (Sections 11–15)**
