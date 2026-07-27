# 17 — UI/UX Specification
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager  
**Target Developer:** Gemini 3.1

---

## 1. Design System Reference

All UI must follow the existing HMS design system. The insurance module is an extension, not a separate product.

| Property | Value |
|----------|-------|
| Framework | React 18 + TypeScript |
| UI Library | Ant Design 5.x (or as per existing HMS) |
| State Management | Redux Toolkit or Zustand (as per HMS) |
| Form Library | React Hook Form + Zod |
| Table Library | Ant Design Table with server-side pagination |
| Charts | Recharts or Ant Design Charts |
| Icon Library | Lucide React or Ant Design Icons |
| Color Palette | Match HMS primary theme |
| Typography | Same as HMS |
| Responsive | Desktop first, tablet compatible |

---

## 2. Navigation Structure

```
HMS Sidebar
  └── Insurance (module icon: shield)
       ├── Dashboard
       ├── Pre-Authorization
       │    ├── New Request
       │    ├── Pending
       │    ├── Approved
       │    └── All Requests
       ├── Claims
       │    ├── New Claim
       │    ├── Cashless Claims
       │    ├── Reimbursement Claims
       │    └── All Claims
       ├── Patient Insurance
       │    ├── Register Card
       │    └── Manage Cards
       ├── Masters
       │    ├── Insurance Companies
       │    ├── TPA Masters
       │    ├── Policy Masters
       │    └── Corporate Masters
       ├── Reports
       │    ├── Claim Summary
       │    ├── Aging Report
       │    ├── Outstanding by Insurer
       │    └── Pre-Auth TAT
       └── Settings
            ├── Lookups
            └── Configurations
```

---

## 3. Screen Specifications

---

### Screen 1: Insurance Dashboard

**Route:** `/insurance/dashboard`  
**Purpose:** At-a-glance operational summary for insurance department  
**Primary Users:** Insurance Desk Manager, Insurance Coordinator

#### Layout
```
┌─────────────────────────────────────────────────────┐
│  Insurance Dashboard          [Date Range Filter]    │
├──────┬──────┬──────┬──────┬──────┬──────┬──────────┤
│ KPI  │ KPI  │ KPI  │ KPI  │ KPI  │ KPI  │  KPI     │
│Cards │      │      │      │      │      │          │
├──────────────────────┬──────────────────────────────┤
│  Pending Pre-Auth    │  Claims Status Chart          │
│  (Alert List)        │  (Donut/Bar)                  │
├──────────────────────┼──────────────────────────────┤
│  Recent Claims       │  Insurer Outstanding (Table)  │
│  (Last 10)           │                               │
└──────────────────────┴──────────────────────────────┘
```

#### KPI Cards (7 tiles)
| Tile | Value | Color | Navigation |
|------|-------|-------|------------|
| Pending Pre-Auth | Count | Orange | → Pre-Auth Pending list |
| Claims in Progress | Count | Blue | → Claims filtered by active statuses |
| Submitted Today | Count | Green | → Today's submitted claims |
| Total Claimed (MTD) | INR Amount | Blue | → Monthly summary report |
| Total Settled (MTD) | INR Amount | Green | → Settled claims MTD |
| Pending Queries | Count | Red | → Claims with open queries |
| Policies Expiring (7 days) | Count | Yellow | → Patient cards expiry report |

#### Alerts Panel
- List of pre-auths where TPA TAT is breached (highlight in red)
- List of claims pending > 30 days
- List of queries not responded within 48 hours
- Clickable rows navigate to respective records

#### Fields & Filters
- Date range picker (default: current month)
- Insurance company dropdown filter
- Refresh button

#### Permissions: `insurance.dashboard.view`

---

### Screen 2: Insurance Company List

**Route:** `/insurance/masters/companies`  
**Purpose:** View and manage all insurance company records

#### Layout: Standard list page
```
[Search Bar]  [Status Filter]  [Type Filter]  [+ Add Company]

┌─────────────────────────────────────────────────────────────┐
│ Code │ Company Name    │ Type    │ TPA │ Cashless │ Status │ Actions│
│ STAR │ Star Health     │ Private │ No  │ Yes      │ Active │ ✏ 🗑  │
│ HDFC │ HDFC ERGO       │ Private │ No  │ Yes      │ Active │ ✏ 🗑  │
└─────────────────────────────────────────────────────────────────────┘
[Pagination]
```

#### Actions
- Edit → Opens Edit drawer/modal
- Deactivate → Confirmation dialog → Soft delete
- Click row → Navigates to Detail page

#### Columns
| Column | Sortable | Width |
|--------|----------|-------|
| Company Code | Yes | 100px |
| Company Name | Yes | 250px |
| Type | Yes | 100px |
| TPA Managed | No | 80px |
| Cashless | No | 80px |
| Status | Yes | 100px |
| Actions | No | 100px |

---

### Screen 3: Insurance Company Create/Edit

**Route:** `/insurance/masters/companies/new` | `/insurance/masters/companies/:id/edit`  
**Purpose:** Add or edit an insurance company  
**Form Layout:** Tabbed form with sections

#### Tabs
1. **Basic Info** — Name, Code, Type, IRDAI number, PAN, GST
2. **Address & Contact** — Full address, phone, email, website
3. **Portal Info** — Claim portal URL, Pre-auth portal URL
4. **Policy Settings** — Cashless/reimbursement enabled, payment terms
5. **TPA Linkage** — Select TPA if TPA managed
6. **Contact Person** — Name, phone, email

#### Validation (inline, on blur and submit)
- Company Code: Required, max 20 chars, alphanumeric only
- Company Name: Required, min 5 chars
- GST Number: Pattern `[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}`
- PAN: Pattern `[A-Z]{5}[0-9]{4}[A-Z]{1}`

#### Buttons
- Save (Primary) — validates and submits
- Save as Draft — saves without full validation
- Cancel — navigates back with unsaved changes warning

---

### Screen 4: Patient Insurance Card Registration

**Route:** `/insurance/patient-cards/new`  
**Purpose:** Register a new insurance card for a patient

#### Step Wizard (3 steps)

**Step 1: Find Patient**
- Search patient by name, UHID, phone number
- Display patient details: Name, DOB, Gender, MRN
- Select patient → Proceed

**Step 2: Policy Details**
- Insurance Company (dropdown with search)
- TPA (auto-filled or selectable)
- Policy Number (text)
- Member ID (text)
- Card Number (optional)
- Policy holder details (name, DOB, relationship)
- Patient name on card, patient relationship
- Policy start/end date (date pickers)
- Sum Insured (numeric)
- Room Rent Limit (numeric, optional)
- Co-payment % (numeric, 0-100)
- Is Primary Card (toggle)

**Step 3: Family Members & Documents**
- Add family member rows (dynamic table): name, DOB, gender, relationship, member ID
- Upload front of card (image)
- Upload back of card (image)
- Notes (textarea)

#### Special Behaviors
- Policy end date in the past → Warning banner ("This policy appears to have expired. Verify with patient.")
- Sum insured 0 → Validation error
- Duplicate policy number for same patient → Warning (allow override with reason)

---

### Screen 5: Patient Insurance Card List

**Route:** `/insurance/patient-cards`  
**Purpose:** Search and manage patient insurance cards

#### Filters
- Patient search (name, UHID)
- Insurance company
- Verification status
- Policy expiry (expiring in 7/30/60 days, already expired)
- Date registered

#### Columns
| Column | Description |
|--------|-------------|
| Patient Name | With UHID badge |
| Insurance Company | |
| Policy Number | |
| Member ID | |
| Sum Insured | Right-aligned, INR format |
| Policy Expiry | Red if expired, orange if expiring in 30 days |
| Verification Status | Color-coded badge |
| Actions | View, Edit, Verify, Eligibility Check |

---

### Screen 6: Pre-Authorization Request Form

**Route:** `/insurance/preauth/new`  
**Purpose:** Create a new pre-authorization request

#### Form Sections

**Section A: Patient & Policy**
- Patient Search (UHID/Name)
- Auto-load active insurance cards for patient
- Select insurance card
- Auto-populate: Company, TPA, Policy number, Member ID, Sum insured

**Section B: Clinical Details**
- Pre-Auth Type: Initial / Enhancement / Extension
- Request Type: Planned / Emergency
- ICD-10 Diagnosis Code (searchable)
- Diagnosis Description (text)
- Procedure codes (multi-select/tag input)
- Treating Doctor (dropdown)
- Department (dropdown)
- Planned Admission Date
- Planned Discharge Date (auto-calc estimated days)

**Section C: Financial Details**
- Estimated Total Cost (INR)
- Requested Amount (INR, must be ≤ remaining SI)
- Room Type Requested (dropdown)

**Section D: Linked Admission**
- Admission ID (auto-link if patient is admitted)
- Or manual link by searching admission

#### Buttons
- Save Draft
- Save and Submit to TPA
- Cancel

#### Inline Calculations
- Estimated Days = Discharge Date − Admission Date
- Maximum claimable = Remaining Sum Insured
- Room rent eligibility = Auto-computed from policy

---

### Screen 7: Pre-Authorization Detail View

**Route:** `/insurance/preauth/:id`  
**Purpose:** View complete pre-auth record, take actions

#### Layout
```
Header: PA-2024-00123 | Status: APPROVED | [Action Buttons]

Tab 1: Overview      — All form details, amounts
Tab 2: Documents     — Document list with upload, preview
Tab 3: Queries       — Query list, respond to queries
Tab 4: Status Log    — Timeline of all status changes
Tab 5: Enhancement   — Enhancement/extension requests (if any)
```

#### Action Buttons (context-sensitive per status)
| Status | Available Actions |
|--------|------------------|
| DRAFT | Edit, Submit, Delete |
| SUBMITTED | Update TPA Response, Upload Docs |
| QUERIED | Respond to Query, Upload Docs |
| APPROVED | Create Claim, Raise Enhancement |
| REJECTED | Raise Appeal, Close |
| CLOSED | View only |

---

### Screen 8: Claim List

**Route:** `/insurance/claims`  
**Purpose:** View and manage all claims

#### Filters
- Claim Type (Cashless / Reimbursement / TPA)
- Status (multi-select)
- Insurance Company
- Date Range (created)
- Settlement Date Range
- Amount Range
- Search (claim number, patient name)

#### Columns
| Column | Notes |
|--------|-------|
| Claim Number | Link to detail |
| Patient Name | With UHID |
| Type | Badge |
| Insurance Company | |
| Claimed Amount | INR, right-aligned |
| Approved Amount | INR, green if = claimed, red if < |
| Status | Color-coded badge |
| Days Pending | Red if > 30 |
| Actions | View, Edit, Submit |

#### Color Coding for Status Badges
| Status | Color |
|--------|-------|
| DRAFT | Grey |
| SUBMITTED | Blue |
| UNDER_PROCESS | Yellow |
| QUERIED | Orange |
| APPROVED | Teal |
| SETTLED | Green |
| REJECTED | Red |
| APPEALED | Purple |
| CLOSED | Dark Grey |

---

### Screen 9: New Claim Form

**Route:** `/insurance/claims/new`  
**Purpose:** Create a new cashless or reimbursement claim

#### Form — Sections

**Section A: Claim Type & Linkage**
- Claim type (Cashless / Reimbursement)
- Pre-Auth linkage (if cashless — required; auto-populates much of the form)
- Patient search and insurance card selection
- Admission linkage

**Section B: Clinical Summary**
- Admission date / Discharge date
- Treating Doctor, Department
- Primary Diagnosis, ICD Code
- Secondary Diagnoses (multi-add)
- Procedures performed

**Section C: Financial Summary**
- Total Bill Amount
- Claimed Amount
- Co-payment amount
- Deductible
- Patient payable amount

**Section D: Claim Line Items** (expandable table)
| Field | Type |
|-------|------|
| Service Category | Dropdown |
| Service Name | Text |
| Service Date | Date |
| Quantity | Number |
| Unit Rate | Currency |
| Billed Amount | Currency (auto-calc) |
| Notes | Text |
- [+ Add Row] button
- Delete row button per row
- Total row at bottom (auto-sum)

---

### Screen 10: Claim Detail View

**Route:** `/insurance/claims/:id`  
**Purpose:** Complete claim record with all details and actions

#### Tabs
1. **Overview** — Patient, policy, clinical, financial summary
2. **Bill Items** — Claim line items, eligibility breakdown
3. **Documents** — Upload and preview
4. **Settlement** — Approved amounts, TPA reference, payment details
5. **Queries** — Query list, respond
6. **Payments** — Payment history, receipt
7. **Status Log** — Audit trail
8. **Finance** — GL posting status

#### Action Buttons per Status
| Status | Actions |
|--------|---------|
| DRAFT | Edit, Add Items, Upload Docs, Submit |
| SUBMITTED | Update TPA Ref, Upload Docs |
| UNDER_PROCESS | Record Settlement, Add Query Response |
| QUERIED | Respond to Query, Upload Docs |
| APPROVED | Record Payment, Download Claim Form |
| SETTLED | View Finance Entry, Generate Receipt |
| REJECTED | Resubmit, Appeal |
| CLOSED | View only, Download |

---

### Screen 11: Reports - Claims Aging

**Route:** `/insurance/reports/claims-aging`  
**Purpose:** Identify overdue claims by aging bucket

#### Filters
- Insurance Company (multi-select)
- Status (multi-select)
- Date From / To
- Aging bucket (0-30, 31-60, 61-90, 90+)

#### Display
- Summary cards: Total claims per bucket
- Detailed table: Claim#, Patient, Company, Submitted Date, Days Pending, Amount
- Export to Excel button

---

### Screen 12: Reports - Insurer Outstanding

**Route:** `/insurance/reports/insurer-outstanding`  
**Purpose:** Show outstanding receivables by insurance company

#### Display
- Grouped by insurer
- Columns: Claim Count, Total Claimed, Total Approved, Pending Settlement, Oldest Claim Date
- Drill-down: Click insurer → see individual claims
- Export to Excel/PDF

---

## 4. Common UI Components Required

| Component | Description |
|-----------|-------------|
| `InsuranceStatusBadge` | Color-coded claim/preauth status badge |
| `PatientInsuranceCardPicker` | Inline patient + card selector with eligibility check |
| `DocumentUploader` | Drag & drop upload with type validation |
| `DocumentViewer` | PDF/image preview modal |
| `ClaimItemsTable` | Editable line items table with auto-sum |
| `StatusTimeline` | Visual audit trail timeline component |
| `AmountBreakdown` | INR amount breakdown: Billed / Approved / Disallowed |
| `PreauthBadge` | Shows preauth status with auth number |
| `PolicyExpiryAlert` | Warning banner for expired/near-expiry policies |
| `InsuranceSummaryCard` | Patient-level policy summary card |
| `QueryResponsePanel` | Query list + inline response form |

---

## 5. Form Validation Rules (Global)

| Field Type | Rule |
|------------|------|
| Amount fields | > 0, max 2 decimal places, must not exceed policy SI |
| Date fields | Valid date, no future dates for historical events |
| Required fields | Red asterisk, inline error on blur |
| Policy number | No special chars except `-` and `/` |
| Phone numbers | 10-digit Indian mobile or landline |
| GST Number | Regex validated |
| PAN Number | Regex validated |
| File uploads | Type: PDF/JPG/PNG only; Size: max 20MB |

---

## 6. Accessibility Requirements

- All interactive elements keyboard navigable
- Color contrast ratio ≥ 4.5:1
- Error messages not conveyed by color alone (also icon + text)
- Form labels associated with inputs via `for`/`id`
- Loading states with spinner and aria-busy
- Empty states with descriptive messages and action buttons

---

## 7. Review Checklist

- [ ] All screens have defined routes
- [ ] All screens define required permissions
- [ ] All tables have pagination
- [ ] All forms have validation specs
- [ ] All status values have color coding
- [ ] Common components listed and reusable
- [ ] All file upload fields have type and size limits
- [ ] Action buttons are context-sensitive per status
- [ ] Dashboard KPIs are defined and navigable
