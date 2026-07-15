# 23 — Reporting & Dashboards

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Reporting Specification  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Overview](#1-overview)
2. [Reporting Objectives](#2-reporting-objectives)
3. [User Report Access by Role](#3-user-report-access-by-role)
4. [Operational Reports](#4-operational-reports)
5. [Financial Reports](#5-financial-reports)
6. [TPA / Insurer Reports](#6-tpa--insurer-reports)
7. [Clinical Analytics Reports](#7-clinical-analytics-reports)
8. [Management Dashboards](#8-management-dashboards)
9. [Audit & Compliance Reports](#9-audit--compliance-reports)
10. [Report Technical Specifications](#10-report-technical-specifications)
11. [Export Formats](#11-export-formats)
12. [Scheduled Reports](#12-scheduled-reports)
13. [KPIs & Metrics Reference](#13-kpis--metrics-reference)
14. [Tasks for Gemini](#14-tasks-for-gemini)

---

## 1. Overview

The Reporting & Dashboards module provides real-time and scheduled visibility into every aspect of the Insurance Module. It serves multiple stakeholders — Insurance Desk, Finance, Management, TPA Relationship Managers, and Hospital Administration.

### 1.1 Report Categories

| Category | Purpose | Primary Users |
|---|---|---|
| Operational | Day-to-day claim tracking | Insurance Desk, TPA Coordinator |
| Financial | Revenue, settlements, outstanding | Finance, CFO |
| TPA/Insurer | TPA-wise performance | TPA Coordinator, Management |
| Clinical Analytics | Diagnosis, procedure trends | Medical Director, Admin |
| Management Dashboard | KPIs and executive summary | CEO, CFO, COO, CMO |
| Audit & Compliance | Audit trails, exceptions | Compliance, Internal Audit |

---

## 2. Reporting Objectives

| Objective | Target |
|---|---|
| Claims pending > 7 days | Visible on dashboard within real-time |
| Monthly settlement reconciliation | Auto-generated report by 5th of each month |
| TPA performance scorecard | Available per TPA per month |
| Rejection analysis | Available within 1 hour of rejection |
| Outstanding pre-auth list | Real-time |
| Finance AR (Accounts Receivable) aging | Daily auto-generated |
| Top 10 rejected diagnosis-procedure pairs | Monthly report |

---

## 3. User Report Access by Role

| Report | Insurance Desk | Finance | TPA Coordinator | Admin/CMO | Auditor |
|---|---|---|---|---|---|
| Claims Pending List | ✅ Own claims | ❌ | ✅ All | ✅ All | ✅ Read |
| Claims Settled Report | ✅ | ✅ | ✅ | ✅ | ✅ |
| TPA Outstanding Report | ❌ | ✅ | ✅ | ✅ | ✅ |
| Financial AR Aging | ❌ | ✅ | ❌ | ✅ | ✅ |
| Rejection Analysis | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pre-Auth Pending Report | ✅ | ❌ | ✅ | ✅ | ✅ |
| Audit Trail Report | ❌ | ❌ | ❌ | ✅ | ✅ |
| Diagnosis Analytics | ❌ | ❌ | ❌ | ✅ | ✅ |
| User Activity Report | ❌ | ❌ | ❌ | ✅ | ✅ |

---

## 4. Operational Reports

### 4.1 Claims Pending Report

**Purpose:** Shows all claims not yet submitted or pending insurer response.

| Column | Description |
|---|---|
| Claim ID | Unique claim reference |
| Patient Name | Patient name |
| UHID / IP Number | Hospital identifiers |
| Admission Date | Date of admission |
| Discharge Date | Date of discharge |
| Insurance Company | Company name |
| TPA | TPA name |
| Claim Type | Cashless / Reimbursement |
| Claim Status | Current status |
| Claim Amount | Total claimed |
| Days Pending | Days since discharge |
| Assigned To | Insurance desk staff |
| Action Due | Next action required |

**Filters:** Date range, Insurance company, TPA, Claim type, Status, Assigned user, Days pending range

**Sort:** Default by days pending (desc)

**Alert:** Rows older than 7 days highlighted in amber; older than 15 days in red.

---

### 4.2 Pre-Authorization Pending Report

**Purpose:** Shows all open pre-authorization requests.

| Column | Description |
|---|---|
| Pre-Auth ID | Reference |
| Patient Name | |
| UHID | |
| Insurance Company | |
| TPA | |
| Admission Date | |
| Pre-Auth Type | Initial / Enhancement / ICU |
| Requested Amount | |
| Status | Sent / Pending / Query raised |
| Sent Date | |
| Response Due | SLA deadline |
| Days Waiting | |
| Contact Attempts | Number of follow-ups |

**Alert:** SLA breach highlighted in red; approaching SLA in amber.

---

### 4.3 Pre-Auth Approved vs Actual Comparison Report

**Purpose:** Compares pre-authorized amount with actual claim amount for variance analysis.

| Column | Description |
|---|---|
| Claim ID | |
| Patient | |
| Pre-Auth Amount | Approved amount |
| Actual Claim Amount | Final billed |
| Variance (₹) | Difference |
| Variance (%) | Percentage difference |
| Variance Reason | Entered by staff |
| Status | Within limit / Over limit / Under utilized |

---

### 4.4 Document Checklist Status Report

**Purpose:** Shows which required documents are missing for each active claim.

| Column | Description |
|---|---|
| Claim ID | |
| Patient | |
| Required Documents | List |
| Submitted Documents | List |
| Missing Documents | List |
| % Complete | Document completion % |
| Responsible Person | Who must upload |

---

### 4.5 Discharge Not Claimed Report

**Purpose:** Identifies discharged patients whose insurance claims have NOT been initiated.

| Column | Description |
|---|---|
| IP Number | |
| Patient Name | |
| Discharge Date | |
| Insurance Company | |
| Policy Number | |
| Billing Amount | |
| Days Since Discharge | |
| Reason Not Claimed | If known |

**Alert:** Trigger after 24 hours of discharge with active insurance.

---

## 5. Financial Reports

### 5.1 Claims Settlement Report

**Purpose:** Summary of all settled/paid claims for a period.

| Column | Description |
|---|---|
| Claim ID | |
| Patient | |
| Insurance Company | |
| TPA | |
| Claim Date | |
| Settlement Date | |
| Claimed Amount | |
| Approved Amount | |
| Settled Amount | |
| Deduction Amount | |
| Deduction Reason | |
| TDS (if any) | |
| Net Received | |
| Days to Settle | |

**Summary Row:** Total claimed, total approved, total settled, total deductions.

---

### 5.2 TPA Accounts Receivable (AR) Aging Report

**Purpose:** Outstanding amounts grouped by aging buckets for each TPA.

| Bucket | Definition |
|---|---|
| 0–30 days | Current |
| 31–60 days | Overdue |
| 61–90 days | Significantly Overdue |
| 91–180 days | Action Required |
| 180+ days | Escalation / Write-off Risk |

**Columns per TPA:**
- TPA Name
- 0–30 days outstanding
- 31–60 days outstanding
- 61–90 days outstanding
- 91–180 days outstanding
- 180+ days outstanding
- Total Outstanding
- Number of Claims

---

### 5.3 Insurance Revenue vs Actual Revenue

**Purpose:** Compares billed amount vs what was received from insurance vs patient share.

| Column | Description |
|---|---|
| Period | Month/Quarter |
| Total Billed | Gross billing |
| Insurance Claimed | Amount claimed |
| Insurance Received | Amount settled |
| Co-pay Collected | Patient co-pay |
| Deductions | Disallowances |
| Write-offs | Uncollectable |
| Net Revenue | Actual net |

---

### 5.4 Claim Deductions Analysis

**Purpose:** Analysis of amounts deducted by insurers/TPAs and reasons.

| Column | Description |
|---|---|
| Claim ID | |
| TPA/Insurer | |
| Claimed Amount | |
| Approved Amount | |
| Deduction Amount | |
| Deduction Category | Non-payable / Excess / Consumables / Co-pay / Penalty |
| Deduction Description | Specific reason |
| Disputed | Yes/No |
| Dispute Status | |

**Aggregate:** Top 10 deduction reasons by total amount.

---

### 5.5 Monthly Settlement Reconciliation

**Purpose:** Reconciles TPA payments received with expected settlements.

| Section | Content |
|---|---|
| Opening balance | Prior month outstanding |
| Claims submitted in period | New claims |
| Claims settled in period | Payments received |
| Claims rejected | Rejected claims |
| Claims disputed | Under dispute |
| Closing balance | Current outstanding |

---

## 6. TPA / Insurer Reports

### 6.1 TPA Performance Scorecard

**Purpose:** Evaluate each TPA's performance monthly.

| KPI | Target | Actual | Status |
|---|---|---|---|
| Average pre-auth TAT (hours) | < 4 hrs | X hrs | Green/Red |
| Average settlement TAT (days) | < 30 days | X days | |
| Claim rejection rate (%) | < 5% | X% | |
| Query rate (%) | < 10% | X% | |
| Average approved vs claimed ratio | > 90% | X% | |
| Deduction rate (%) | < 8% | X% | |

---

### 6.2 TPA Claim Summary by Month

| Column | Description |
|---|---|
| TPA Name | |
| Month | |
| Total Claims Submitted | |
| Total Claims Settled | |
| Total Claims Pending | |
| Total Claims Rejected | |
| Total Claimed Amount | |
| Total Settled Amount | |
| Settlement Rate (%) | |

---

### 6.3 Insurance Company Coverage Analysis

**Purpose:** Which insurance companies cover most patients — for empanelment decisions.

| Column | Description |
|---|---|
| Insurance Company | |
| Total Patients Covered | |
| Total Claims | |
| Total Claim Value | |
| Avg Claim Value | |
| Settlement Rate | |
| Avg TAT | |

---

## 7. Clinical Analytics Reports

### 7.1 Top Diagnosis by Claims

**Purpose:** Identify which diagnoses generate the most claims.

| Column | Description |
|---|---|
| ICD-10 Code | |
| Diagnosis Name | |
| Total Claims | |
| Total Claimed Amount | |
| Avg Claim Amount | |
| Approval Rate | |
| Common Procedures | |

---

### 7.2 Top Procedures by Claims

| Column | Description |
|---|---|
| CPT Code | |
| Procedure Name | |
| Total Claims | |
| Total Claimed Amount | |
| Avg Claim Amount | |
| Approval Rate | |
| Common Diagnoses | |

---

### 7.3 Department-wise Insurance Utilization

| Column | Description |
|---|---|
| Department | Cardiology, Orthopedics, etc. |
| Total Insured Patients | |
| Total Cashless Patients | |
| Total Claims | |
| Total Claim Value | |
| % of Total Insurance Revenue | |

---

### 7.4 Rejection Analysis by Diagnosis-Procedure Pair

**Purpose:** Identify diagnosis-procedure combinations most likely to be rejected.

| Column | Description |
|---|---|
| Diagnosis (ICD-10) | |
| Procedure (CPT) | |
| Total Claims | |
| Rejected | Count |
| Rejection Rate (%) | |
| Common Rejection Reasons | |

---

## 8. Management Dashboards

### 8.1 Insurance Module Executive Dashboard

**Real-time KPI tiles:**

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  Active Claims  │  Pending Pre-   │  Claims This    │  Settlement     │
│  247            │  Auth: 34       │  Month: 156     │  This Month:    │
│  ▲ 12 new today │  ⚠ 5 overdue   │  ₹1.2 Cr        │  ₹98 L          │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  Total AR       │  Rejection Rate │  Avg Pre-Auth   │  Avg Settlement │
│  ₹3.45 Cr       │  4.2%           │  TAT: 3.2 hrs   │  TAT: 28 days   │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

**Charts:**
- Claims by status (Donut chart)
- Monthly claim trend — 12 months (Line chart)
- TPA-wise outstanding (Bar chart)
- Claim amount by insurance company (Bar chart)
- Pre-auth TAT trend (Line chart)
- Rejection rate trend (Line chart)

---

### 8.2 Finance Dashboard

**Focus:** Revenue visibility and AR management

**KPI tiles:**
- Total insurance AR
- Current month settlements received
- Current month claims submitted
- Deductions this month
- AR > 90 days (escalation)

**Charts:**
- AR aging chart (Stacked bar by bucket)
- Monthly settlement vs claim (Grouped bar)
- TPA-wise AR (Horizontal bar)
- Deduction breakdown by category (Pie)

---

### 8.3 Operations Dashboard (Insurance Desk)

**Focus:** Individual staff productivity and task management

**Shows:**
- My pending pre-auths
- My pending claims
- Claims due today
- Documents overdue
- Recent activity log

---

## 9. Audit & Compliance Reports

### 9.1 User Activity Report

| Column | Description |
|---|---|
| Timestamp | Date and time |
| User | Staff member |
| Action | Created / Updated / Deleted / Submitted / Approved |
| Module | Pre-auth / Claim / Document |
| Record ID | Claim or pre-auth ID |
| IP Address | For security |
| Changes Made | Before/after values |

---

### 9.2 Claim Amendment Report

| Column | Description |
|---|---|
| Claim ID | |
| Amendment Date | |
| Amended By | |
| Field Changed | |
| Old Value | |
| New Value | |
| Reason | |

---

### 9.3 Document Upload/Download Log

| Column | Description |
|---|---|
| Timestamp | |
| User | |
| Action | Upload / Download / Delete |
| Document Name | |
| Document Type | |
| Claim/Pre-Auth ID | |
| IP Address | |

---

## 10. Report Technical Specifications

### 10.1 Report Engine

| Requirement | Specification |
|---|---|
| Library | React with recharts or Chart.js for charts |
| Table rendering | React Table (TanStack Table) |
| Export | PDF via jsPDF, Excel via SheetJS |
| Date pickers | Date range filters on all reports |
| Pagination | Server-side pagination, 50 rows default |
| Performance | Reports < 5 seconds for up to 10,000 records |
| Large data | Background generation + download link for > 10,000 records |

### 10.2 Report Data Query Guidelines

| Principle | Implementation |
|---|---|
| No direct table scans | All reports use pre-built query views |
| Indexes required | Date, TPA ID, Insurance ID, Status indexed |
| Read replica | Reports run on read replica if available |
| Caching | Dashboard KPIs cached for 5 minutes |
| Async for large | Reports > 10,000 rows generated async |

---

## 11. Export Formats

| Format | Use Case | Implementation |
|---|---|---|
| PDF | Formal reports, sharing with management | jsPDF + html2canvas |
| Excel (.xlsx) | Data analysis, pivot tables | SheetJS |
| CSV | Data imports, bulk processing | Native browser |
| Print | Physical copies | Browser print CSS |

**All exports must include:**
- Hospital name and logo
- Report title and period
- Generated date and time
- Generated by (user name)
- Page numbers (PDF)
- Confidentiality notice

---

## 12. Scheduled Reports

| Report | Frequency | Recipients | Delivery |
|---|---|---|---|
| Daily Claims Pending | Daily 8 AM | Insurance Head, TPA Coordinators | Email |
| Pre-Auth Overdue (> 4 hrs) | Every 4 hours | Insurance Desk, TPA Coordinators | Email + System notification |
| Weekly AR Aging | Every Monday 9 AM | Finance, CFO | Email |
| Monthly Settlement Reconciliation | 5th of each month | Finance, CFO | Email |
| Monthly TPA Scorecard | 1st of each month | Management | Email |
| Discharge Not Claimed | Daily 6 PM | Insurance Head | Email |
| Monthly Management Dashboard PDF | 3rd of each month | CEO, CFO, COO | Email |

---

## 13. KPIs & Metrics Reference

| KPI | Formula | Target | Alert Threshold |
|---|---|---|---|
| Pre-auth TAT | Time from submission to TPA response | < 4 hours | > 6 hours |
| Claim submission TAT | Time from discharge to claim submission | < 24 hours | > 48 hours |
| Settlement TAT | Time from submission to payment receipt | < 30 days | > 45 days |
| Claim rejection rate | Rejected claims / Total claims × 100 | < 5% | > 8% |
| Document completeness | Docs submitted / Docs required × 100 | 100% | < 90% |
| Pre-auth approval rate | Approved / Submitted × 100 | > 90% | < 85% |
| AR > 90 days | Value outstanding > 90 days / Total AR | < 15% | > 25% |
| Settlement ratio | Amount settled / Amount claimed | > 92% | < 88% |
| Claim enhancement rate | Enhanced claims / Total claims | Informational | |
| Co-pay collection rate | Co-pay collected / Co-pay billed | 100% | < 95% |

---

## 14. Tasks for Gemini

---

### TASK RPT-001: Report Infrastructure Setup

**Objective:** Set up the base report infrastructure — routes, filters, pagination, and export utilities.

**Business Context:** All 20+ reports share the same base infrastructure. Building this once correctly reduces effort for each individual report.

**Files Likely Created:**
- `components/reports/ReportLayout.jsx` — base layout with filters, export, print
- `components/reports/ReportTable.jsx` — paginated sortable table
- `utils/report_export.js` — PDF and Excel export utilities
- `utils/report_filters.js` — date range and filter helpers
- `api/reports/reports_base.routes.js`

**Acceptance Criteria:**
- Date range filter works correctly
- PDF export generates with header (hospital name, report title, date)
- Excel export generates with correct column headers
- Pagination works server-side (50 rows per page)
- All exports include "Confidential" footer

**Priority:** High  
**Estimated Effort:** 3 days  
**Risk Level:** Low

---

### TASK RPT-002: Claims Pending Report

**Objective:** Implement the Claims Pending operational report.

**Database Query:** Claims table joined with patients, insurance_companies, tpa, staff — filtered by status NOT IN ('settled', 'rejected', 'closed').

**API:** `GET /api/v1/reports/claims-pending?dateFrom=&dateTo=&insuranceId=&tpaId=&status=&assignedTo=`

**UI:**
- Filter bar: Date range, Insurance company, TPA, Status, Days pending minimum
- Table with all columns defined in section 4.1
- Row color coding (amber > 7 days, red > 15 days)
- Export to PDF and Excel

**Acceptance Criteria:**
- Loads within 3 seconds for up to 500 rows
- Color coding correct
- Filters work and combine correctly
- Export generates correctly

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK RPT-003: Financial AR Aging Report

**Objective:** Implement TPA Accounts Receivable aging report.

**Database Query:** Claims with status = 'submitted' or 'approved' or 'partially_settled', grouped by TPA, aged by submission date.

**API:** `GET /api/v1/reports/ar-aging?asOfDate=&tpaId=`

**UI:**
- Summary table: TPA vs aging buckets with totals
- Drill-down: Click TPA row to see individual claims
- Grand total row
- Chart: Stacked bar by aging bucket

**Acceptance Criteria:**
- Aging calculated correctly from claim submission date
- Totals match individual claim values
- Drill-down shows correct claims
- Chart renders correctly

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK RPT-004: Executive Dashboard

**Objective:** Build the management executive dashboard with real-time KPI tiles and charts.

**Files Likely Created:**
- `pages/dashboard/InsuranceDashboard.jsx`
- `hooks/useDashboardData.js`
- `api/reports/dashboard.routes.js`

**KPI Tiles:** 8 tiles as defined in section 8.1  
**Charts:** 6 charts (donut, line, bar)

**Data Refresh:** Auto-refresh every 5 minutes; manual refresh button.

**Acceptance Criteria:**
- All 8 KPI tiles load within 2 seconds
- All 6 charts render correctly
- Data is accurate (verified against manual calculation)
- Dashboard visible to authorized roles only
- Mobile responsive layout

**Priority:** Medium  
**Estimated Effort:** 4 days  
**Risk Level:** Medium

---

### TASK RPT-005: Scheduled Report Engine

**Objective:** Build automated scheduled report generation and email delivery.

**Files Likely Created:**
- `jobs/scheduled_reports.job.js` — cron jobs
- `services/report_email_service.js` — email delivery
- `config/report_schedule.config.js` — schedule configuration

**Implementation:**
- Use node-cron for scheduling
- Reports generated as PDF and attached to emails
- Email log stored (who received what, when)
- Failed delivery retried 3 times

**Acceptance Criteria:**
- Daily pending report delivered at 8 AM
- Weekly AR aging report delivered Monday 9 AM
- Email contains PDF attachment
- Delivery log shows success/failure

**Priority:** Medium  
**Estimated Effort:** 3 days  
**Risk Level:** Medium

---

### TASK RPT-006: TPA Performance Scorecard

**Objective:** Monthly TPA scorecard showing all KPIs per TPA.

**Calculated KPIs:** Pre-auth TAT, settlement TAT, rejection rate, query rate, approved ratio — all per TPA.

**API:** `GET /api/v1/reports/tpa-scorecard?month=&year=&tpaId=`

**UI:**
- Table: TPAs vs KPIs with RAG status (Green/Amber/Red)
- Trend comparison vs previous month
- Export as PDF for management presentation

**Acceptance Criteria:**
- All KPIs calculated correctly
- RAG status applied correctly per target thresholds
- Trend arrows show correct direction
- PDF export formatted professionally

**Priority:** Medium  
**Estimated Effort:** 3 days  
**Risk Level:** Medium

---

**Executive Summary:** Reporting transforms raw claim data into actionable intelligence for every stakeholder level — from the insurance desk tracking daily work to the CFO monitoring AR aging to the CEO reviewing monthly KPIs. This module's value compounds over time as historical data accumulates.

---
