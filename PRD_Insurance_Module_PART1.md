# 📋 PRODUCT REQUIREMENTS DOCUMENT
# Insurance Module — Hospital Management System

---

## SECTION 1: Document Header & Metadata

| Field | Details |
|---|---|
| **Document Title** | Product Requirements Document — Insurance Module |
| **Module Name** | Insurance Module (HMS) |
| **Author** | Siddhant Sangram Shinde |
| **Version** | 1.0 |
| **Date** | 11 May 2026 |
| **Status** | 🟡 Draft |
| **Tech Stack** | React.js · Node.js · Express.js · MongoDB · Mongoose · JWT · HTML/CSS/JS |
| **Repository** | GitHub (Branch: `feature/insurance-module`) |

### Stakeholders

| # | Name | Module Owned | Interaction with Insurance |
|---|---|---|---|
| 1 | Siddhant Sangram Shinde | **Insurance** | Owner — Full-stack (FE + BE + DB) |
| 2 | Prajwal | Billing | **Critical** — Shared billing-insurance deduction data |
| 3 | Sakshi | Admin | **High** — Master data setup (hospital info, user roles) |
| 4 | Namrata | Reception / Registration | **High** — Patient registration feeds insurance verification |
| 5 | TBD | Doctor Module | **Medium** — Diagnosis codes, treatment plans for pre-auth |
| 6 | TBD | Lab Module | **Medium** — Lab reports attached to claim documents |
| 7 | TBD | Pharmacy Module | **Medium** — Pharmacy bills included in claim |
| 8 | TBD | Nurse Module | **Low** — Nursing records for documentation |
| 9 | TBD | Patient Portal | **Low** — Patient views own claim status |

### Document Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 11 May 2026 | Siddhant S. Shinde | Initial draft — structure and research |
| 1.0 | 11 May 2026 | Siddhant S. Shinde | Complete PRD with all 15 sections |

---

## SECTION 2: Executive Summary

### What is the Insurance Module?

The Insurance Module is the component of the Hospital Management System (HMS) that manages **every interaction between the hospital, its patients, and insurance entities** — whether those entities are government health schemes (Ayushman Bharat PM-JAY, CGHS, ESIC, MJPJAY) or private health insurance companies operating through Third Party Administrators (TPAs).

### Why is it Critical?

In an Indian hospital context, **40-60% of inpatient revenue** flows through insurance channels. Without a dedicated module:
- Claims are filed manually on paper — leading to delays of weeks or months
- Pre-authorization requests are tracked via phone calls and WhatsApp — causing lost approvals
- Revenue leakage occurs when services are rendered but never billed to the insurer
- Compliance failures happen when claim documents are incomplete or mismatched
- The hospital cannot generate reports on insurance receivables, denial rates, or scheme-wise revenue

### What Problem Does It Solve?

This module digitises the **entire insurance lifecycle** inside the hospital:

```
Patient Arrives → Insurance Verified → Pre-Auth Raised → Treatment Happens →
Claim Filed → Documents Uploaded → Settlement Tracked → Revenue Reconciled
```

### Scope of Siddhant's Ownership

Siddhant owns the **complete vertical** for this module:

| Layer | Responsibility |
|---|---|
| **Frontend** | All React.js screens, forms, dashboards, and reports |
| **Backend** | All Express.js API routes, controllers, middleware, and business logic |
| **Database** | All MongoDB collections, schemas, indexes, and seed data |
| **Integration** | API contracts with Billing (Prajwal), Reception (Namrata), Admin (Sakshi) |

### 5-Line Summary (Non-Technical)

> The Insurance Module helps our hospital manage every patient who comes with a health insurance policy or government health card. It verifies their coverage at admission, sends approval requests to the insurance company before treatment begins, tracks all medical documents needed for the claim, calculates how much the insurance will pay versus how much the patient pays, and finally submits the claim to get the hospital paid. Think of it as the hospital's "insurance desk" — but fully digital, faster, and error-free.

---

## SECTION 3: Deep Research Findings — Insurance System in India

### 3A. Government Insurance Schemes — How They Work at Hospital Level

#### 3A.1 — Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)

**What it is:** India's largest government-funded health insurance scheme providing Rs.5 lakh per family per year for secondary and tertiary hospitalization. Managed by the National Health Authority (NHA). As of 2026, it covers over 55 crore beneficiaries across 12+ crore families.

**Beneficiary Identification:**
- Ayushman Bharat Health Account (ABHA) number
- Aadhaar-based eKYC verification
- PM-JAY e-card (downloadable from mera.pmjay.gov.in)
- Family ID linked to SECC (Socio-Economic Caste Census) 2011 database

**How it works at hospital level:**

```
Step 1:  Patient presents Ayushman card / Aadhaar at reception
Step 2:  Hospital verifies eligibility via NHA TMS (Transaction Management System)
Step 3:  If eligible → Beneficiary registered in TMS with demographic + Aadhaar eKYC
Step 4:  Doctor diagnoses → Hospital selects HBP (Health Benefit Package) code
Step 5:  Pre-authorization request submitted via TMS portal
         - Includes: Patient demographics, diagnosis (ICD-10), proposed treatment,
           HBP package code, clinical documentation
Step 6:  State Health Agency (SHA) / Insurance Company reviews — approves/queries/rejects
Step 7:  Treatment proceeds upon approval
Step 8:  At discharge → Hospital uploads: discharge summary, operative notes,
         investigation reports, implant stickers (if applicable), consent forms
Step 9:  Claim submitted electronically via TMS within 15 days of discharge
Step 10: Claim adjudicated → Payment released to hospital bank account
```

**Key Technical Integration Points for HMS:**
- **NHA TMS Portal** — primary interface for all transactions
- **NHCX (National Health Claims Exchange)** — standardised API-based claims exchange under ABDM
- **HBP Codes** — Health Benefit Package codes define the fixed price for each procedure
- **ABDM Compliance** — Hospitals increasingly required to use ABDM-compliant HMIS

**What HMS must store:** Beneficiary ABHA number, Ayushman card number, family ID, HBP code used, pre-auth reference number, TMS transaction ID, claim status, SHA payment reference.

#### 3A.2 — CGHS (Central Government Health Scheme)

**What it is:** Health scheme for Central Government employees, pensioners, and their dependents. Administered by the Ministry of Health & Family Welfare. As of 2026, CGHS has migrated to NHA's TMS 2.0 platform.

**Beneficiary Verification:**
- CGHS Beneficiary ID Card (physical or digital e-card via "My CGHS 2.0" app / DigiLocker)
- PAN-based unique ID for entitlement assessment
- **Mandatory OTP verification** via registered mobile number in TMS 2.0

**How it works at hospital level:**

```
Step 1: Beneficiary presents CGHS card + government photo ID
Step 2: Hospital verifies via TMS 2.0 — OTP sent to beneficiary mobile
Step 3: Beneficiary shares OTP with hospital TPA desk
Step 4: For planned procedures → Referral from CGHS Wellness Centre required
        (Exception: Pensioners 70+ can access specialist OPD directly)
        (Exception: Genuine emergencies — no referral needed)
Step 5: Pre-authorization submitted on TMS 2.0
Step 6: Treatment provided — NO upfront payment from beneficiary for cashless
Step 7: Post-treatment → Documents uploaded, claim submitted
Step 8: Settlement at CGHS-approved rates (revised Oct 2025)
```

**Key Points for HMS:**
- Must track CGHS beneficiary card type (serving employee vs. pensioner vs. dependent)
- Must enforce referral requirement (store referral document reference)
- Must use CGHS rate cards for billing — different from private insurance rates
- Hospital must be empanelled via HEM 2.0 portal and have executed current MoA

#### 3A.3 — ESIC (Employees' State Insurance Corporation)

**What it is:** Social security scheme for workers earning up to Rs.21,000/month. Provides comprehensive medical care including OPD, IPD, maternity, disability, and funeral benefits.

**Beneficiary Identification:**
- ESI Card / Pehchan Card
- IP (Insured Person) Number — unique identifier
- Aadhaar or government-issued photo ID as secondary verification

**How it works at hospital level:**

```
Step 1: Patient presents ESI card / Pehchan Card at hospital
Step 2: Identity verified — IP number checked in ESIC system
Step 3: OPD → Registration at OPD counter → token → consultation
Step 4: IPD → Admission based on ESIC doctor recommendation or emergency
Step 5: Treatment proceeds — medicines from in-house pharmacy
Step 6: Discharge → Discharge summary with follow-up instructions
Step 7: Hospital bills ESIC directly — no payment from patient
Step 8: Reimbursement cases → Patient informs ESIC branch within 24 hours
```

**Key Points for HMS:**
- Must differentiate between ESIC direct treatment vs. reimbursement pathway
- Must store IP number, employer details, dispensary referral reference
- Reimbursement claims submitted via employer, not directly by hospital

#### 3A.4 — MJPJAY (Mahatma Jyotirao Phule Jan Arogya Yojana) — Maharashtra

**What it is:** Maharashtra's flagship state health insurance scheme providing cashless treatment to low-income families. Converged with AB-PMJAY. Coverage: Rs.1.5 lakh per family/year (up to Rs.2.5 lakh for renal transplant). With PM-JAY convergence, reaches Rs.5 lakh.

**Beneficiary Eligibility:**
- Yellow, Orange, Antyodaya Anna Yojana (AAY), or Annapurna ration card holders
- Farmers from designated agriculturally distressed districts (White ration card + 7/12 extract)
- Students in government Ashram schools
- Residents of government orphanages, Mahila Ashrams, old-age homes

**How it works at hospital level:**

```
Step 1: Patient visits empanelled hospital
Step 2: Meets Arogyamitra (scheme facilitator stationed at hospital)
Step 3: Arogyamitra verifies eligibility using ration card + ID proof
Step 4: Hospital submits pre-authorization request online
Step 5: Approval typically within 24 hours
Step 6: Cashless treatment — zero payment from patient
Step 7: Post-discharge → Hospital uploads bills, records to portal
Step 8: SHAS (State Health Assurance Society) reviews and settles
Step 9: Patient eligible for free follow-up for 10 days post-discharge
```

**Key Points for HMS:**
- Must store ration card category, 7/12 extract reference (for farmers)
- Must track Arogyamitra verification status
- Dual eligibility with PM-JAY — HMS must identify primary scheme
- Must enforce follow-up period tracking (10-day post-discharge window)

---

### 3B. Private Insurance — Cashless and Reimbursement Process

#### 3B.1 — Cashless Claim Process (Network Hospitals)

The patient pays nothing (or only non-covered items), and the insurer settles directly with the hospital.

```
CASHLESS CLAIM LIFECYCLE
========================

ADMISSION
├── Patient presents health card + photo ID
├── Hospital insurance desk verifies policy via TPA portal
├── Coverage, sum insured, sub-limits, exclusions checked
└── Patient registered in HMS with insurance linkage

PRE-AUTHORIZATION
├── Hospital fills Pre-Auth form (medical details from doctor)
├── Form sent to TPA electronically
├── TPA reviews against policy terms
│   ├── Approved → Authorization Letter issued with amount
│   ├── Query → TPA asks for more info → Hospital responds
│   └── Denied → Patient informed → Self-pay or reimbursement
├── Planned admission: Intimate TPA 48-72 hours before
└── Emergency admission: Intimate TPA within 24 hours

DURING TREATMENT
├── All charges auto-logged in HMS (lab, pharmacy, procedures)
├── If costs exceed approved amount → Enhancement request sent
└── Documents collected continuously (reports, prescriptions)

DISCHARGE
├── Final bill prepared with itemised breakdown
├── Insurance-covered amount deducted from bill
├── Patient pays: Non-covered items + deductibles + co-pay
├── Discharge summary + final claim form sent to TPA
└── IRDAI mandate: TPA must approve discharge within 3 hours

SETTLEMENT
├── TPA processes final claim
├── Payment released to hospital (NEFT/RTGS)
└── Hospital reconciles against receivables
```

#### 3B.2 — Reimbursement Claim Process

Used when: non-network hospital, cashless denied, or patient chooses to pay upfront.

```
Step 1: Patient pays all hospital bills out of pocket
Step 2: Hospital provides: Itemised bills, discharge summary, prescriptions,
        lab reports, doctor referral letters — ALL ORIGINALS
Step 3: Patient fills Part A of Standardised Claim Form
Step 4: Hospital fills Part B of Standardised Claim Form
Step 5: Patient submits to insurer/TPA with all original documents
Step 6: Insurer processes within 30 days (IRDAI mandate)
Step 7: If delayed beyond 30 days → Insurer pays 2% above bank rate as interest
```

---

### 3C. TPA System — Role in the Hospital Ecosystem

**What is a TPA?** A company licensed by IRDAI that acts as intermediary between insurance companies and hospitals. Processes and recommends claims on behalf of the insurer.

**Major TPAs in India:**

| TPA Name | Key Insurers Served | Portal |
|---|---|---|
| **Medi Assist** | Star Health, Bajaj Allianz, HDFC ERGO, ICICI Lombard | mediassisttpa.in |
| **Paramount Health Services** | New India Assurance, United India | paramounttpa.com |
| **Health India TPA** | Various PSU and private insurers | healthindiatpa.com |
| **FHPL (Family Health Plan Ltd)** | Multiple insurers | fhpl.net |
| **Vidal Health** | Multiple insurers | vidalhealth.com |
| **Raksha TPA** | Various insurers | raboraksha.com |
| **Safeway TPA** | Various insurers | safewaytpa.in |

**For HMS v1:** Store TPA master data, track TPA-specific claim IDs, provide data export in TPA-compatible formats. Direct API integration is out of scope.

---

### 3D. Why Claim Forms Must Be Sourced from Official Insurer/TPA Websites

**Why HMS should NOT embed claim forms:**
1. Forms updated by insurers periodically — HMS would need constant updates
2. Legal liability if HMS provides outdated form and claim is rejected
3. Different insurers require different forms (no universal standard for pre-auth forms)
4. Some forms require insurer-specific barcodes or QR codes

**How HMS Should Handle This:**
1. **Official Forms Registry** — database of links to official claim form download pages
2. **Version Tracking** — store last-known form version and date checked
3. **Alert System** — prompt staff to verify form version before using
4. **Document Storage** — scan and upload completed forms as part of claim documentation
5. **Generated Data** — HMS auto-fills hospital-side data (Part B) for printing

---

### 3E. Key Regulatory and Compliance Considerations

#### IRDAI Guidelines

| Guideline | Requirement | Impact on HMS |
|---|---|---|
| Standardised Claim Form | All insurers must use standard 2-part form | HMS must generate Part B data accurately |
| Cashless Pre-Auth Timeline | Approved within **1 hour** | HMS must timestamp all pre-auth submissions |
| Discharge Approval | Granted within **3 hours** of final bill | HMS must track discharge approval timestamps |
| Reimbursement Settlement | Settled within **30 days** | HMS must track document submission dates |
| Interest on Delay | 2% above bank rate per day | HMS reports should flag overdue settlements |
| Single Query Rule | All docs requested in first query | HMS should track query rounds per claim |

#### Patient Data Privacy
- All insurance data encrypted at rest and in transit
- Role-based access — not all staff should see policy details
- Audit logs for all data access and modifications
- Comply with IT Act 2000 and DPDPA 2023

---

## SECTION 4: Goals & Success Metrics

### Primary Goals

| # | Goal | Measurable Target |
|---|---|---|
| G1 | Digitise insurance verification | 100% of insured patients verified in HMS before IPD admission |
| G2 | Streamline pre-authorization | Pre-auth submission time reduced from 2-4 hours to 15 minutes |
| G3 | Eliminate paper-based tracking | 100% of claim documents stored digitally with search capability |
| G4 | Integrate with billing | Insurance deductions auto-calculated on final bill |
| G5 | Track claim lifecycle | Every claim has visible status on dashboard |
| G6 | Support multiple schemes | PM-JAY, CGHS, ESIC, MJPJAY, and 5+ private insurers |
| G7 | Prevent revenue leakage | Every billable service captured and included in claim |
| G8 | Enable management reporting | Scheme-wise, insurer-wise, TPA-wise revenue reports |

### Success Metrics (KPIs)

| KPI | Target | How Measured |
|---|---|---|
| Insurance verification completion rate | >= 98% | Verified patients / Total insured patients |
| Average pre-auth submission time | <= 15 min | Timestamp: registration → pre-auth sent |
| Claim rejection rate (documentation) | <= 5% | Rejected claims (doc reasons) / Total claims |
| Average days to claim settlement | Track baseline | Settlement date − Submission date |
| Revenue leakage rate | <= 2% | Unbilled services / Total services |
| System uptime | >= 99.5% | Monitoring dashboard |

### Out of Scope (v1)

| # | Feature | Reason |
|---|---|---|
| 1 | Direct API integration with NHA TMS / NHCX | Requires ABDM certification |
| 2 | Direct API integration with TPA portals | Each TPA has different API |
| 3 | Automated ICD-10 code suggestion | Requires ML/NLP |
| 4 | Patient mobile app for claim tracking | Separate module |
| 5 | Insurance premium calculation or policy selling | Hospital is provider, not insurer |
| 6 | DigiLocker integration | Requires government API onboarding |
| 7 | Multi-language support | English-only for v1 |
| 8 | Automated bank reconciliation | Requires bank API integration |

---

## SECTION 5: User Roles & Permissions (RBAC)

### Role Matrix

| Permission | Insurance Desk | Receptionist | Doctor | Billing Staff | Admin | Patient |
|---|---|---|---|---|---|---|
| View patient insurance status | Full | Summary only | Coverage summary | Deduction amount | Full | Own only |
| Create insurance registration | Yes | No | No | No | Yes | No |
| Edit insurance details | Yes | No | No | No | Yes | No |
| Delete insurance record | No | No | No | No | Yes (soft) | No |
| Create pre-auth request | Yes | No | No | No | Yes | No |
| View pre-auth status | Yes | Yes | Yes | Yes | Yes | Own only |
| Update pre-auth (add docs) | Yes | No | Yes (medical) | No | Yes | No |
| Create claim | Yes | No | No | No | Yes | No |
| View claim details | Yes | No | No | Summary | Yes | Own only |
| Update claim status | Yes | No | No | No | Yes | No |
| Upload documents | Yes | No | Yes (clinical) | Yes (bills) | Yes | No |
| View documents | Yes | No | Own patient | Bills only | Yes | Own only |
| Manage TPA master data | No | No | No | No | Yes | No |
| Manage insurer master data | No | No | No | No | Yes | No |
| Manage govt scheme master | No | No | No | No | Yes | No |
| View insurance reports | Limited | No | No | Limited | Full | No |
| Calculate insurance deduction | No | No | No | Yes (trigger) | Yes | No |
| Approve claim for submission | Yes (prepare) | No | No | No | Yes (final) | No |
| View analytics dashboard | Yes | No | No | No | Yes | No |
| Manage official forms registry | No | No | No | No | Yes | No |

### Role Descriptions

**1. Insurance Desk Staff** — Primary user. Handles day-to-day insurance operations: verification, pre-auth, claim filing, document collection. UI should be optimised for this role.

**2. Receptionist** — Sees badge/indicator on patient record showing insurance status during registration. Cannot modify insurance data. Directs patient to insurance desk.

**3. Doctor** — Sees patient's insurance coverage summary to make informed treatment decisions. Can upload clinical documents (diagnosis notes, operative reports).

**4. Billing Staff** — Triggers insurance deduction calculation on final bill. Sees the split: "Insurance Pays: X" vs "Patient Pays: Y". Cannot modify insurance records.

**5. Admin** — Full access. Manages master data (TPA list, insurer list, scheme configuration, rate cards). Views all reports. Can override claim statuses.

**6. Patient (via Portal)** — Read-only access to own insurance and claim data. Only applicable if patient portal module is built.
