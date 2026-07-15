# 12 – Document Management
## HMS Insurance Module

---

## 1. Overview

Document management is a cross-cutting concern in the Insurance Module. Every claim type, every workflow step, and every TPA interaction generates or requires documents. This module defines how documents are uploaded, categorized, versioned, accessed, and retained.

---

## 2. Document Categories

### Category 1: Patient Identity Documents
| Document | Accepted Formats | Max Size | Expiry Tracking |
|---|---|---|---|
| Aadhaar Card | PDF, JPG, PNG | 5MB | No |
| PAN Card | PDF, JPG, PNG | 5MB | No |
| Passport | PDF, JPG, PNG | 5MB | Yes (expiry date) |
| Voter ID | PDF, JPG, PNG | 5MB | No |
| Driving License | PDF, JPG, PNG | 5MB | Yes (expiry date) |

### Category 2: Insurance Documents
| Document | Accepted Formats | Max Size | Expiry Tracking |
|---|---|---|---|
| Insurance Policy Card (front) | JPG, PNG, PDF | 5MB | Yes (policy end date) |
| Insurance Policy Card (back) | JPG, PNG, PDF | 5MB | Yes |
| Policy Document (full) | PDF | 20MB | Yes |
| TPA Empanelment Letter | PDF | 5MB | Yes |
| Authorization Letter | PDF | 5MB | No |
| Rejection Letter | PDF | 5MB | No |

### Category 3: Clinical Documents
| Document | Accepted Formats | Max Size |
|---|---|---|
| Discharge Summary | PDF | 10MB |
| Doctor's Certificate | PDF, JPG | 5MB |
| OT Notes | PDF | 10MB |
| Anesthesia Notes | PDF | 10MB |
| ICU Charts | PDF | 20MB |
| Nursing Notes | PDF | 10MB |
| Histopathology Report | PDF | 20MB |

### Category 4: Investigation Reports
| Document | Accepted Formats | Max Size |
|---|---|---|
| Blood Test Reports | PDF, JPG | 10MB |
| Urine Test Reports | PDF, JPG | 5MB |
| X-Ray Reports | PDF, JPG, DICOM ref | 20MB |
| CT Scan Reports | PDF, JPG | 20MB |
| MRI Reports | PDF, JPG | 30MB |
| Echocardiography Reports | PDF, JPG | 10MB |
| Ultrasound Reports | PDF, JPG | 10MB |

### Category 5: Financial Documents
| Document | Accepted Formats | Max Size |
|---|---|---|
| Final Hospital Bill | PDF | 10MB |
| Pharmacy Bills | PDF, JPG | 10MB |
| Interim Bills | PDF | 10MB |
| Receipts (Payment Proof) | PDF, JPG | 5MB |
| Implant Invoice | PDF | 5MB |
| Cancelled Cheque | JPG, PNG, PDF | 2MB |
| Bank Statement | PDF | 5MB |

### Category 6: TPA/Claim Forms
| Document | Accepted Formats | Max Size |
|---|---|---|
| Pre-Auth Form (system-generated) | PDF | 5MB |
| TPA Claim Form (filled) | PDF | 10MB |
| Query Response Letter | PDF | 10MB |
| Deficiency Response | PDF | 10MB |
| Appeal Letter | PDF | 10MB |

### Category 7: Accident / Legal Documents
| Document | Accepted Formats | Max Size |
|---|---|---|
| FIR Copy | PDF, JPG | 5MB |
| MLC Report | PDF | 5MB |
| Accident Report | PDF, JPG | 5MB |
| Police Report | PDF | 5MB |

---

## 3. Document Lifecycle

```
UPLOAD REQUEST
      │
      ▼
FILE VALIDATION
      │ (format, size, malware scan)
      ▼
METADATA CAPTURE
      │ (category, claim link, uploaded by, date)
      ▼
STORAGE
      │ (secure object storage or filesystem)
      ▼
VERSION RECORDING
      │ (version 1 for new, version n+1 for replacement)
      ▼
DOCUMENT ACTIVE
      │
      ├──► VIEW / DOWNLOAD (with audit log)
      │
      ├──► REPLACE (new version, old version archived)
      │
      ├──► EXPIRE (flagged when expiry date reached)
      │
      └──► DELETE (admin only, with reason + audit log)
```

---

## 4. Document Storage Architecture

### Recommended Approach:
```
Storage:
  - Small files (< 5MB): local filesystem or S3-compatible storage
  - Large files (> 5MB, radiology): dedicated document server or S3

Naming Convention:
  /insurance/
    /{claim_type}/
      /{claim_id}/
        /{document_category}/
          /{timestamp}_{original_filename}

Example:
  /insurance/cashless/CC-2025-00123/auth_letter/20250601_auth_letter_v1.pdf
  /insurance/cashless/CC-2025-00123/auth_letter/20250602_auth_letter_v2.pdf
```

### Why NOT store files in the database:
- BLOBs cause database bloat and slow down queries
- Files scale differently from structured data
- Backup and restore is simpler with file systems
- S3 / object storage is the industry standard

---

## 5. Document Metadata (Database Schema Intent)

| Field | Description |
|---|---|
| id | Unique document ID |
| claim_id | Linked claim ID (cashless/reimbursement) |
| claim_type | CASHLESS / REIMBURSEMENT / PRE_AUTH |
| document_category | From category list above |
| document_name | Display name (user-entered or auto) |
| original_filename | Original file name from upload |
| stored_filename | Actual stored file name |
| storage_path | Full path in storage |
| mime_type | File MIME type |
| file_size_bytes | Size |
| version | Integer version (1, 2, 3...) |
| is_latest | Boolean: is this the latest version? |
| is_mandatory | Is this in the mandatory checklist? |
| expiry_date | If applicable |
| uploaded_by | User ID |
| upload_timestamp | UTC timestamp |
| verified_by | User ID who verified (if applicable) |
| verification_status | PENDING / VERIFIED / REJECTED |
| verification_timestamp | UTC timestamp |
| is_deleted | Soft delete flag |
| deleted_by | User ID |
| deleted_timestamp | UTC timestamp |
| deletion_reason | Required for audit |

---

## 6. Document Access Control

| Document Category | Who Can View | Who Can Upload | Who Can Delete |
|---|---|---|---|
| Identity documents | All insurance roles | Ins. Desk, Claims Mgr | Admin only |
| Insurance card/policy | All insurance roles | Ins. Desk, Claims Mgr | Admin only |
| Authorization letter | All insurance roles | Ins. Desk, Claims Mgr | Admin only |
| Clinical documents | All insurance roles + Doctor | Ins. Desk, Claims Mgr, Doctor | Admin only |
| Investigation reports | All insurance roles + Doctor | Ins. Desk, Claims Mgr | Admin only |
| Financial documents | Claims Mgr, Finance, Admin | Billing, Finance | Admin only |
| TPA forms | All insurance roles | Ins. Desk, Claims Mgr | Admin only |
| Legal documents | Claims Mgr, Admin | Ins. Desk, Claims Mgr | Admin only |

---

## 7. Document Checklist per Claim Type

### Cashless Claim – Mandatory Documents

| # | Document | Stage Required |
|---|---|---|
| 1 | Insurance policy card (front & back) | Pre-auth |
| 2 | Patient identity proof | Pre-auth |
| 3 | Treating doctor's certificate | Pre-auth |
| 4 | Relevant investigation reports | Pre-auth |
| 5 | Authorization letter from TPA | After approval |
| 6 | Discharge summary | Claim submission |
| 7 | Final hospital bill | Claim submission |
| 8 | Pharmacy bills | Claim submission |
| 9 | Investigation reports (full set) | Claim submission |
| 10 | OT notes (if surgery) | Claim submission |

### Reimbursement Claim – Mandatory Documents

| # | Document | Stage Required |
|---|---|---|
| 1 | Insurance policy card | Registration |
| 2 | Patient identity proof | Registration |
| 3 | Duly filled claim form | Preparation |
| 4 | Original discharge summary | Preparation |
| 5 | Original final bill with receipt | Preparation |
| 6 | All original investigation reports | Preparation |
| 7 | Original pharmacy bills | Preparation |
| 8 | Treating doctor prescription | Preparation |
| 9 | Cancelled cheque | Preparation |

---

## 8. Retention Policy

| Document Type | Minimum Retention | Legal Basis |
|---|---|---|
| Medical records | 7 years | MCI/NMC guidelines |
| Insurance claims | 7 years | IRDAI / Audit requirements |
| Identity documents | 5 years after last use | DPDP Act 2023 |
| Financial documents | 8 years | IT Act / Audit standards |
| Audit logs | 10 years | Compliance standards |

---

## 9. Tasks for Gemini – Document Management

### Task: DM-001 – Document Upload Component

**Objective:** Build reusable document upload with category, validation, and versioning

**Files likely created:**
- `src/components/documents/DocumentUpload.jsx`
- `src/components/documents/DocumentViewer.jsx`
- `src/components/documents/DocumentChecklist.jsx`
- `src/api/documents.js`
- `src/controllers/document.controller.js`
- `src/models/Document.js`
- `src/utils/fileValidation.js`

**Validations:**
- File format in whitelist
- File size within limit per category
- Virus scan (if library available)
- Expiry date required for expiring document types

**Acceptance Criteria:**
- [ ] Upload stores file and creates metadata record
- [ ] Replacement creates new version, marks old as archived
- [ ] All access (view/download) logged in audit
- [ ] Checklist component shows mandatory vs optional per claim type
- [ ] Checklist tracks completion %

---

*End of Document Management*
