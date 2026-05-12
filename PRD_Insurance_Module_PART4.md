# 📋 PRD — Insurance Module (PART 4 of 5)
# Sections 9–10: API Endpoints & Frontend Screens

---

## SECTION 9: API Endpoints Specification

> Base URL: `/api/insurance`
> All endpoints require JWT authentication unless noted.
> Role column shows which roles can access.

---

### 9.1 Policy Management APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 1 | POST | `/policies` | Register new insurance policy for patient | Insurance Desk, Admin |
| 2 | GET | `/policies/:patientId` | Get all policies for a patient | Insurance Desk, Billing, Doctor, Admin |
| 3 | GET | `/policies/detail/:policyId` | Get single policy details | Insurance Desk, Admin |
| 4 | PUT | `/policies/:policyId` | Update policy details | Insurance Desk, Admin |
| 5 | PATCH | `/policies/:policyId/verify` | Update verification status | Insurance Desk, Admin |
| 6 | DELETE | `/policies/:policyId` | Soft-delete a policy | Admin |

**Example — POST `/policies`**

Request:
```json
{
  "patientId": "665a1b2c3d4e5f6789012345",
  "insuranceType": "Private",
  "providerName": "Star Health",
  "policyNumber": "SH-2026-78901",
  "planType": "Individual",
  "sumInsured": 500000,
  "subLimits": { "roomRentCap": 5000, "icuCap": 10000 },
  "coPayPercentage": 10,
  "deductible": 5000,
  "tpaId": "665a1b2c3d4e5f6789012399",
  "policyStartDate": "2026-01-01",
  "policyEndDate": "2026-12-31",
  "isNetworkHospital": true
}
```

Success Response (201):
```json
{
  "success": true,
  "message": "Policy registered successfully",
  "data": { "_id": "...", "policyNumber": "SH-2026-78901", "verificationStatus": "Not Verified" }
}
```

Error Responses:
- `400` — Missing required fields
- `409` — Policy number already exists
- `401` — Unauthorized
- `403` — Insufficient permissions

---

### 9.2 Government Scheme APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 7 | POST | `/schemes` | Enroll patient under a government scheme | Insurance Desk, Admin |
| 8 | GET | `/schemes/:patientId` | Get scheme enrollments for patient | Insurance Desk, Doctor, Admin |
| 9 | PUT | `/schemes/:schemeId` | Update scheme details | Insurance Desk, Admin |
| 10 | PATCH | `/schemes/:schemeId/verify` | Update verification status | Insurance Desk, Admin |

---

### 9.3 Pre-Authorization APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 11 | POST | `/pre-auth` | Create a new pre-auth request | Insurance Desk, Admin |
| 12 | GET | `/pre-auth` | List all pre-auth requests (with filters) | Insurance Desk, Admin |
| 13 | GET | `/pre-auth/:id` | Get single pre-auth detail | Insurance Desk, Doctor, Admin |
| 14 | PATCH | `/pre-auth/:id/status` | Update pre-auth status | Insurance Desk, Admin |
| 15 | POST | `/pre-auth/:id/query-response` | Respond to TPA query | Insurance Desk, Admin |
| 16 | POST | `/pre-auth/:id/enhance` | Submit enhancement request | Insurance Desk, Admin |

**Example — PATCH `/pre-auth/:id/status`**

Request:
```json
{
  "status": "Approved",
  "approvedAmount": 120000,
  "authorizationNumber": "AUTH-2026-5678",
  "validityDate": "2026-06-15",
  "notes": "Approved for cardiac bypass surgery"
}
```

---

### 9.4 Claims APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 17 | POST | `/claims` | Create a new claim | Insurance Desk, Admin |
| 18 | GET | `/claims` | List all claims (with filters, pagination) | Insurance Desk, Billing, Admin |
| 19 | GET | `/claims/:id` | Get single claim detail | Insurance Desk, Billing, Admin |
| 20 | PATCH | `/claims/:id/status` | Update claim status | Insurance Desk, Admin |
| 21 | PATCH | `/claims/:id/settlement` | Record settlement details | Insurance Desk, Admin |
| 22 | GET | `/claims/dashboard-stats` | Get dashboard statistics | Insurance Desk, Admin |

**Example — GET `/claims?status=Submitted&page=1&limit=20`**

Response (200):
```json
{
  "success": true,
  "data": [ { "claimNumber": "CLM-20260512-0001", "patientId": "...", "status": "Submitted", "claimedAmount": 120000 } ],
  "pagination": { "page": 1, "limit": 20, "total": 45, "pages": 3 }
}
```

---

### 9.5 Document APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 23 | POST | `/documents/upload` | Upload documents (multipart) | Insurance Desk, Doctor, Billing, Admin |
| 24 | GET | `/documents/claim/:claimId` | Get all documents for a claim | Insurance Desk, Admin |
| 25 | GET | `/documents/:docId` | Get single document metadata | Insurance Desk, Admin |
| 26 | GET | `/documents/:docId/download` | Download/view document file | Insurance Desk, Doctor, Admin |
| 27 | DELETE | `/documents/:docId` | Soft-delete document | Admin |

---

### 9.6 Billing Integration APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 28 | GET | `/billing-summary/:patientId` | Get insurance deduction for billing | Billing, Insurance Desk, Admin |
| 29 | POST | `/billing-mapping` | Create billing-insurance mapping | Billing, Admin |
| 30 | PATCH | `/billing-mapping/:id/override` | Manual override with reason | Admin |

---

### 9.7 Master Data APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 31 | GET | `/tpa` | List all TPAs | Insurance Desk, Admin |
| 32 | POST | `/tpa` | Add new TPA | Admin |
| 33 | PUT | `/tpa/:id` | Update TPA | Admin |
| 34 | GET | `/insurers` | List all insurance companies | Insurance Desk, Admin |
| 35 | POST | `/insurers` | Add new insurer | Admin |
| 36 | PUT | `/insurers/:id` | Update insurer | Admin |

---

### 9.8 Forms Registry APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 37 | GET | `/forms` | List all official forms | Insurance Desk, Admin |
| 38 | POST | `/forms` | Add new form entry | Admin |
| 39 | PUT | `/forms/:id` | Update form entry | Admin |

---

### 9.9 Reports APIs

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 40 | GET | `/reports/scheme-wise` | Scheme-wise revenue report | Admin |
| 41 | GET | `/reports/insurer-wise` | Insurer-wise claims report | Admin |
| 42 | GET | `/reports/tpa-performance` | TPA performance metrics | Admin |
| 43 | GET | `/reports/monthly-trend` | Monthly claims trend | Admin, Insurance Desk |
| 44 | GET | `/reports/rejection-analysis` | Claim rejection analysis | Admin |

---

### 9.10 Notifications API

| # | Method | Endpoint | Description | Roles |
|---|---|---|---|---|
| 45 | GET | `/notifications` | Get user's notifications | All authenticated |
| 46 | PATCH | `/notifications/:id/read` | Mark notification as read | All authenticated |
| 47 | GET | `/notifications/unread-count` | Get unread notification count | All authenticated |

---

## SECTION 10: Frontend Screen Specifications

> Stack: React.js with react-router-dom. All screens use the shared `Layout.jsx` component.
> Base route: `/insurance/*`

---

### 10.1 Insurance Dashboard

| Property | Detail |
|---|---|
| **Route** | `/insurance` (default step: `dashboard`) |
| **Purpose** | Overview of all insurance operations |
| **API Calls** | `GET /claims/dashboard-stats`, `GET /notifications/unread-count` |
| **Components** | `StatsCard` (3), `RecentClaimsTable`, `AlertsWidget` |
| **Stats Cards** | Active Claims count, Pending Pre-Auths count, Monthly Settled Amount |
| **States** | Loading spinner, Empty state ("No claims yet"), Error toast |

---

### 10.2 Patient Policy Registration

| Property | Detail |
|---|---|
| **Route** | Step: `register-policy` |
| **Purpose** | Register a patient's insurance policy or government scheme |
| **API Calls** | `POST /policies`, `POST /schemes`, `GET /tpa`, `GET /insurers` |
| **Components** | `InsuranceTypeToggle` (Private/Government), `PolicyForm`, `SchemeForm`, `PatientSearchBar` |
| **Form Fields (Private)** | Provider (dropdown from insurers), Policy Number, Plan Type, Sum Insured, Sub-limits, Co-pay %, Deductible, TPA (dropdown), Start/End Date |
| **Form Fields (Govt)** | Scheme (dropdown), then scheme-specific fields (see Section 6.3) |
| **Validations** | All required fields, policy number format, dates not in past, sum insured > 0 |
| **States** | Form default, Submitting (button disabled), Success toast, Validation errors inline |

---

### 10.3 Policy Details View

| Property | Detail |
|---|---|
| **Route** | Step: `policy-detail` |
| **Purpose** | View complete policy/scheme details for a patient |
| **API Calls** | `GET /policies/:patientId`, `GET /schemes/:patientId` |
| **Components** | `PolicyCard`, `SchemeCard`, `VerificationBadge`, `EditButton` |
| **Display** | All policy fields in a clean card layout, verification status badge (green/yellow/red) |

---

### 10.4 Pre-Authorization Form & Tracker

| Property | Detail |
|---|---|
| **Route** | Step: `pre-auth` |
| **Purpose** | Create new pre-auth requests and track existing ones |
| **API Calls** | `POST /pre-auth`, `GET /pre-auth`, `PATCH /pre-auth/:id/status` |
| **Components** | `PreAuthForm`, `PreAuthTable`, `StatusBadge`, `QueryResponseModal` |
| **Form Fields** | Patient ID (search), Policy ref, Doctor name, Expected dates, Diagnosis, ICD-10, Treatment, Estimated cost, Document upload |
| **Table Columns** | Pre-Auth ID, Patient, Diagnosis, Amount, Status, Days Pending, Actions |
| **Status Colors** | Draft=grey, Submitted=blue, Approved=green, Query=amber, Rejected=red, Expired=dark-grey |

---

### 10.5 Cashless Claim Filing Screen

| Property | Detail |
|---|---|
| **Route** | Step: `file-claim` |
| **Purpose** | Create a new cashless insurance claim |
| **API Calls** | `POST /claims`, `GET /pre-auth/:id` (pre-fill from pre-auth) |
| **Components** | `ClaimForm`, `PreAuthSelector`, `DocumentChecklist`, `CostBreakdown` |
| **Form Fields** | Patient, Policy/Scheme, Pre-auth number (auto-fill), Admission/Discharge dates, Diagnosis, Procedures, Doctor, Total bill, Document uploads |
| **Document Checklist** | 9 checkboxes (per Section 6.9) — visual indicator of completeness |

---

### 10.6 Reimbursement Claim Screen

| Property | Detail |
|---|---|
| **Route** | Step: `reimbursement` |
| **Purpose** | Generate Part B data and track document handover to patient |
| **API Calls** | `POST /claims` (type=Reimbursement), `GET /claims/:id` |
| **Components** | `ReimbursementForm`, `PartBPreview`, `DocumentHandoverChecklist` |
| **Special** | "Print Part B" button generates printable PDF-like view |

---

### 10.7 Claim Status Tracker (Dashboard)

| Property | Detail |
|---|---|
| **Route** | Step: `claims` |
| **Purpose** | View, search, and filter all claims |
| **API Calls** | `GET /claims?status=X&page=Y` |
| **Components** | `StatusFilterBar`, `ClaimsTable`, `Pagination`, `ExportButton` |
| **Filters** | Status dropdown, Insurer/Scheme dropdown, Date range, Search bar |
| **Highlights** | Query claims = amber row, 30+ days unsettled = red row |

---

### 10.8 Document Upload Screen

| Property | Detail |
|---|---|
| **Route** | Step: `upload-docs` (accessed from claim detail) |
| **Purpose** | Upload and manage documents for a specific claim |
| **API Calls** | `POST /documents/upload`, `GET /documents/claim/:claimId` |
| **Components** | `FileDropzone`, `DocumentList`, `CategorySelector`, `PreviewModal` |
| **Features** | Drag-and-drop area, category tagging, file preview, completeness % bar |

---

### 10.9 Official Forms Directory

| Property | Detail |
|---|---|
| **Route** | Step: `forms-directory` |
| **Purpose** | Browse and access official insurer/TPA claim forms |
| **API Calls** | `GET /forms` |
| **Components** | `FormsTable`, `SearchBar`, `FilterByType` |
| **Columns** | Insurer/TPA, Form Name, Type, Version, Last Verified, Download Link |

---

### 10.10 TPA Management Screen

| Property | Detail |
|---|---|
| **Route** | Step: `manage-tpa` (Admin only) |
| **Purpose** | Add, edit, and manage TPA master data |
| **API Calls** | `GET /tpa`, `POST /tpa`, `PUT /tpa/:id` |
| **Components** | `TPATable`, `TPAFormModal`, `QuickAccessButton` |

---

### 10.11 Insurance Reports Screen

| Property | Detail |
|---|---|
| **Route** | Step: `reports` (Admin, Insurance Desk limited) |
| **Purpose** | View analytical reports on insurance operations |
| **API Calls** | `GET /reports/scheme-wise`, `GET /reports/insurer-wise`, etc. |
| **Components** | `ReportSelector`, `DataTable`, `SummaryCards`, `ExportCSVButton`, `DateRangeFilter` |
| **Reports Available** | Scheme-wise revenue, Insurer-wise, TPA performance, Monthly trend, Rejection analysis |

---

### 10.12 Billing Integration View

| Property | Detail |
|---|---|
| **Route** | Accessed from Billing module (`/billing`) |
| **Purpose** | Show insurance deduction breakdown on patient's final bill |
| **API Calls** | `GET /billing-summary/:patientId` |
| **Components** | `InsuranceSplitCard` — shows Total Bill, Insurance Covers, Patient Pays |
| **Note** | This component is built by Insurance team but consumed by Billing module |

---

### Screen Navigation Map

```
Login → Insurance Dashboard
              │
              ├── Register Policy / Enroll Scheme
              ├── Verify Eligibility
              ├── Pre-Auth Requests ──→ File Claim (from approved pre-auth)
              ├── All Claims ──→ Claim Detail ──→ Upload Documents
              ├── Reimbursement Claims
              ├── Forms Directory
              ├── TPA Management (Admin)
              ├── Reports (Admin)
              └── Notifications
```

---

> **End of Part 4** — Continue to `PRD_Insurance_Module_PART5.md` for Sections 11–15 (Git Workflow, Sprint Plan, Risk Register, Team Guidance, Appendix).
