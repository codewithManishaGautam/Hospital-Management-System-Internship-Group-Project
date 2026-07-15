# 21 — Finance Integration
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager

---

## 1. Purpose

This document defines how the Insurance Module integrates with the HMS Finance / Accounts Module. Every insurance payment received must be posted to the hospital's general ledger (GL) with proper accounting entries. This integration ensures the finance team has real-time visibility into insurance receivables, settlements, disallowances, TDS, and write-offs.

---

## 2. Accounting Framework

### 2.1 Chart of Accounts (Insurance-Specific)

The following GL accounts must be set up in the HMS Finance Module to support insurance operations:

| Account Name | Account Type | Normal Balance | Description |
|---|---|---|---|
| Insurance Receivables — Cashless | Asset | Debit | Amounts due from insurance companies (cashless) |
| Insurance Receivables — TPA | Asset | Debit | Amounts due via TPA |
| Insurance Revenue | Revenue | Credit | Revenue recognized from insurance |
| Insurance Disallowances | Expense | Debit | Amounts disallowed by insurer |
| Insurance Write-offs | Expense | Debit | Claims written off |
| TDS Payable — Insurance | Liability | Credit | TDS deducted by insurer |
| Insurance Co-payment Receivable | Asset | Debit | Co-payment collectible from patient |
| Insurance Advance (Cashless) | Liability | Credit | Advance received before final settlement |
| Insurance Settlements Received | Asset | Debit | Bank posting on receipt |
| Reimbursement Claim Advance | Asset | Debit | Advance paid to patient for reimbursement |

### 2.2 Accounting Standards

- Accrual basis accounting
- Revenue recognized on bill generation (not on settlement)
- Insurance receivable booked at time of claim submission
- Disallowance recognized at time of settlement advice
- TDS accounted separately and linked to TDS filing

---

## 3. GL Entry Triggers and Templates

### 3.1 On Claim Submission (Cashless)

When a cashless claim is submitted to TPA:

```
DR  Insurance Receivables — Cashless   ₹75,000.00
CR  Insurance Revenue                  ₹75,000.00
    Narration: Claim CLM-2024-00001 | Star Health | Patient: Ramesh Patil | Admission: 2024-11-20
```

### 3.2 On Claim Approval (TPA Sends Approval)

When approved amount differs from claimed amount (disallowance):

```
DR  Insurance Disallowances            ₹7,000.00
CR  Insurance Receivables — Cashless   ₹7,000.00
    Narration: Disallowance on CLM-2024-00001 | Reason: Room rent cap applied
```

### 3.3 On Payment Receipt (Settlement)

When bank payment is received from insurer:

```
DR  Bank Account (Insurer Payment A/c)  ₹67,320.00
DR  TDS Payable — Insurance               ₹680.00
CR  Insurance Receivables — Cashless    ₹68,000.00
    Narration: Settlement received | CLM-2024-00001 | UTR: HDFC12345678901 | Date: 2024-12-10
```

### 3.4 On Co-payment Collection from Patient

When patient co-payment is collected at counter:

```
DR  Cash / Bank                        ₹12,500.00
CR  Insurance Co-payment Receivable    ₹12,500.00
    Narration: Co-payment collected | CLM-2024-00001 | Patient: Ramesh Patil
```

### 3.5 On Claim Write-off

When a claim or portion is written off:

```
DR  Insurance Write-offs               ₹5,000.00
CR  Insurance Receivables — Cashless   ₹5,000.00
    Narration: Write-off approved | CLM-2024-00001 | Approved by: Finance Manager
```

### 3.6 On Reimbursement Claim Receipt

For reimbursement where hospital assists patient:

```
DR  Insurance Receivables — TPA        ₹68,000.00
CR  Insurance Revenue                  ₹68,000.00
    Narration: Reimbursement claim submitted | CLM-2024-00002 | HDFC ERGO
```

---

## 4. Finance Integration APIs

### 4.1 Post GL Entry

**POST** `/api/v1/finance/gl-entries`  
(This is a Finance Module API — called by Insurance Module)

**Request Body:**
```json
{
  "voucher_type": "INSURANCE_CLAIM",
  "voucher_date": "2024-11-23",
  "reference_number": "CLM-2024-00001",
  "reference_type": "INSURANCE_CLAIM",
  "reference_id": "uuid",
  "narration": "Claim submitted | CLM-2024-00001 | Star Health | Ramesh Patil",
  "entries": [
    {
      "account_code": "INSUR-REC-CASHLESS",
      "debit_amount": 75000.00,
      "credit_amount": 0,
      "cost_center": "INSURANCE_DEPT"
    },
    {
      "account_code": "INSUR-REVENUE",
      "debit_amount": 0,
      "credit_amount": 75000.00,
      "cost_center": "INSURANCE_DEPT"
    }
  ],
  "posted_by": "uuid",
  "tags": {
    "insurance_company_id": "uuid",
    "claim_id": "uuid",
    "patient_id": "uuid"
  }
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "gl_entry_id": "uuid",
    "voucher_number": "JV-2024-09876",
    "posted_at": "2024-11-23T15:00:00Z"
  }
}
```

**Note:** Insurance module stores `gl_entry_id` in `claim_headers.finance_entry_id`.

---

### 4.2 Get GL Entry for Claim

**GET** `/api/v1/finance/gl-entries?reference_id=:claimId&reference_type=INSURANCE_CLAIM`

Called by Insurance Module to display finance posting status on claim detail screen.

---

### 4.3 Get Insurer Outstanding Balance

**GET** `/api/v1/finance/accounts-receivable/insurer/:insuranceCompanyId`

Returns the current outstanding balance owed by a specific insurance company.

**Response:**
```json
{
  "success": true,
  "data": {
    "insurance_company_id": "uuid",
    "company_name": "Star Health",
    "total_outstanding": 450000.00,
    "oldest_outstanding_date": "2024-09-15",
    "claim_count": 8,
    "breakdown_by_aging": {
      "0_30_days": 150000.00,
      "31_60_days": 200000.00,
      "61_90_days": 80000.00,
      "above_90_days": 20000.00
    }
  }
}
```

---

### 4.4 TDS Certificate Data Export

**GET** `/api/v1/insurance/finance/tds-summary`

**Query Params:** `financial_year`, `company_id`

Provides TDS data for Form 26Q filing.

**Response:**
```json
{
  "success": true,
  "data": {
    "financial_year": "2024-25",
    "total_tds_deducted": 45000.00,
    "by_company": [
      {
        "company_name": "Star Health",
        "pan": "AAJCS5000D",
        "gross_payment": 1200000.00,
        "tds_deducted": 12000.00,
        "tds_rate_percent": 1.0
      }
    ]
  }
}
```

---

## 5. Insurance Receivables Aging Report

This report is owned by both Finance and Insurance departments.

### 5.1 Aging Buckets

| Bucket | Days |
|--------|------|
| Current | 0–30 days |
| 31–60 days | Moderate risk |
| 61–90 days | High attention |
| 91–120 days | Critical |
| > 120 days | Provision for write-off required |

### 5.2 Report Columns

| Column | Description |
|--------|-------------|
| Claim Number | |
| Patient Name | |
| Insurance Company | |
| TPA | |
| Claimed Amount | |
| Approved Amount | |
| Settled Amount | |
| Outstanding Amount | claimed − settled |
| Submission Date | |
| Days Outstanding | Today − submission date |
| Aging Bucket | Computed |
| Status | |
| Finance Entry | GL voucher number |
| Remarks | Action taken |

---

## 6. Finance Reports Required

### 6.1 Insurance Revenue Report

Groups insurance revenue by department, doctor, and insurance company.  
**Period:** Daily / Monthly / Quarterly  
**Columns:** Company, Policy Type, Claim Count, Claimed, Approved, Settled, Disallowed, Write-off

### 6.2 TDS Deduction Register

All TDS deducted by insurance companies.  
**Columns:** Company, PAN, Payment Date, Gross Amount, TDS Rate, TDS Amount, Net Received, UTR

### 6.3 Insurance Receivables Ledger

Complete ledger of insurance receivable movements.  
**Columns:** Date, Claim#, Company, DR, CR, Balance

### 6.4 Disallowance Analysis

Reports disallowed amounts by reason code.  
Helps identify patterns (e.g., "consultation fee always disallowed by Star Health").

---

## 7. Finance Integration Workflow

```
Event: Claim Submitted
    ↓
Insurance Module queues GL posting task
    ↓
Finance GL API: Post DR Insurance Receivable / CR Revenue
    ↓
Store gl_entry_id in claim_headers
    ↓

Event: Settlement Entered
    ↓
If disallowed amount > 0:
    Post DR Disallowance / CR Insurance Receivable
    ↓
Event: Payment Received
    ↓
Post DR Bank / DR TDS Payable / CR Insurance Receivable
    ↓
Mark claim payment as posted_to_finance = TRUE
    ↓

Event: Write-off Approved
    ↓
Post DR Write-off / CR Insurance Receivable
    ↓
Mark claim as WRITTEN_OFF / CLOSED
```

---

## 8. Finance Team Responsibilities

| Task | Finance Action | System Support |
|------|----------------|----------------|
| Book insurance receivable | Auto-posted by system | GL entry via API |
| Verify TPA payment advice | Manual verification | Upload payment advice doc |
| Post bank receipt | Manual (or bank integration) | Update claim payment record |
| Handle TDS deductions | Manual TDS register update | TDS summary API |
| Approve write-offs | Finance Manager approval | Role-gated action in system |
| Monthly AR reconciliation | Download outstanding report | Insurance AR aging report |
| Quarterly TDS filing | Use TDS export | TDS summary API |

---

## 9. Review Checklist

- [ ] GL entry templates defined for all scenarios
- [ ] Chart of accounts defined
- [ ] Finance API contracts documented
- [ ] TDS handling specified
- [ ] Aging buckets defined
- [ ] Finance reports listed
- [ ] Write-off authorization flow defined
- [ ] Async GL posting specified (queue-based)
- [ ] Finance integration does not block insurance workflow
- [ ] GL entry IDs stored back in claim records
