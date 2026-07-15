# 16 — API Specification
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Base URL:** `/api/v1/insurance`  
**Authentication:** Bearer JWT (all endpoints unless stated)  
**Content-Type:** `application/json`

---

## 1. API Design Principles

- RESTful design with consistent resource naming
- All IDs are UUID strings
- All monetary values in INR as decimal strings
- Pagination on all list endpoints (`page`, `limit`, `total`, `pages`)
- Standard error envelope: `{ success, message, errors[], data }`
- Standard success envelope: `{ success, message, data, meta }`
- HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable, 500 Server Error
- Rate limiting: 200 req/min per user token
- All date fields: ISO 8601 (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`)

---

## 2. Authentication

### POST `/api/v1/auth/login`
Standard HMS auth — not redefined here. Insurance APIs inherit the JWT issued by the HMS auth module. The JWT payload must include `userId`, `roles[]`, and `permissions[]`.

---

## 3. Insurance Company APIs

### 3.1 List Insurance Companies
**GET** `/api/v1/insurance/companies`

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | Integer | Default 1 |
| `limit` | Integer | Default 20, max 100 |
| `search` | String | Name or code search |
| `status` | String | `ACTIVE`, `INACTIVE` |
| `type` | String | `PUBLIC`, `PRIVATE`, `GOVERNMENT` |

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "company_code": "STAR",
      "company_name": "Star Health and Allied Insurance",
      "short_name": "Star Health",
      "company_type": "PRIVATE",
      "is_cashless_enabled": true,
      "is_tpa_managed": false,
      "status": "ACTIVE",
      "contact_person_name": "Rajesh Kumar",
      "contact_person_phone": "9876543210"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 15, "pages": 1 }
}
```

**Permissions:** `insurance.companies.read`

---

### 3.2 Get Insurance Company Detail
**GET** `/api/v1/insurance/companies/:id`

**Response 200:**
Full company object including TPA linkage, portal URLs, policy counts.

**Errors:**
- 404: Company not found

---

### 3.3 Create Insurance Company
**POST** `/api/v1/insurance/companies`

**Request Body:**
```json
{
  "company_code": "HDFC",
  "company_name": "HDFC ERGO General Insurance",
  "short_name": "HDFC ERGO",
  "company_type": "PRIVATE",
  "registration_number": "IRDAI/HLT/HDFC/P-H/V.I/14/13-14",
  "pan_number": "AAACH0569R",
  "gst_number": "27AAACH0569R1ZD",
  "address_line1": "1st Floor, HDFC House",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400013",
  "phone": "022-67502700",
  "email": "support@hdfcergo.com",
  "is_cashless_enabled": true,
  "is_reimbursement_enabled": true,
  "is_tpa_managed": false,
  "payment_terms_days": 30
}
```

**Validation:**
- `company_code`: Required, unique, 2–20 chars, alphanumeric
- `company_name`: Required, 5–200 chars
- `gst_number`: Optional, validated GST format if provided
- `pan_number`: Optional, validated PAN format if provided

**Response 201:** Created company object

**Permissions:** `insurance.companies.create`

---

### 3.4 Update Insurance Company
**PUT** `/api/v1/insurance/companies/:id`

**Request Body:** Same as Create (partial update supported)

**Response 200:** Updated company object

**Permissions:** `insurance.companies.update`

---

### 3.5 Delete (Deactivate) Insurance Company
**DELETE** `/api/v1/insurance/companies/:id`

Soft delete only. Sets `is_deleted = true`, `status = INACTIVE`.

**Business Rule:** Cannot delete if active policies or pending claims exist.

**Response 200:**
```json
{ "success": true, "message": "Insurance company deactivated successfully" }
```

**Permissions:** `insurance.companies.delete`

---

## 4. TPA APIs

### 4.1 List TPAs
**GET** `/api/v1/insurance/tpas`

Same pagination/filter pattern as companies.

### 4.2 Get TPA
**GET** `/api/v1/insurance/tpas/:id`

### 4.3 Create TPA
**POST** `/api/v1/insurance/tpas`

**Key Fields:** `tpa_code`, `tpa_name`, `irdai_tpa_license`, `helpline_number`, `preauth_tat_hours`, `claim_tat_days`

### 4.4 Update TPA
**PUT** `/api/v1/insurance/tpas/:id`

### 4.5 Delete TPA
**DELETE** `/api/v1/insurance/tpas/:id`

---

## 5. Policy Master APIs

### 5.1 List Policy Products
**GET** `/api/v1/insurance/policy-masters`

**Query Params:** `company_id`, `tpa_id`, `policy_type`, `coverage_type`, `status`, `page`, `limit`

### 5.2 Get Policy Product
**GET** `/api/v1/insurance/policy-masters/:id`

### 5.3 Create Policy Product
**POST** `/api/v1/insurance/policy-masters`

**Request Body includes all coverage rules:** room rent limits, co-payment, waiting periods, covered benefits.

### 5.4 Update Policy Product
**PUT** `/api/v1/insurance/policy-masters/:id`

### 5.5 Copy Policy Product
**POST** `/api/v1/insurance/policy-masters/:id/copy`

Creates a duplicate for a new policy year with updated `effective_from` date.

---

## 6. Patient Insurance Card APIs

### 6.1 List Patient Insurance Cards
**GET** `/api/v1/insurance/patient-cards`

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `patient_id` | UUID | Filter by patient |
| `policy_number` | String | Search by policy no. |
| `member_id` | String | Search by member ID |
| `verification_status` | String | `PENDING`, `VERIFIED`, `REJECTED` |
| `expiry_before` | Date | Cards expiring before date |
| `company_id` | UUID | Filter by insurer |

**Response 200:** List of cards with patient name, company name, policy number, expiry, sum insured.

---

### 6.2 Get Patient Insurance Card
**GET** `/api/v1/insurance/patient-cards/:id`

Includes family members sub-array.

---

### 6.3 Register Patient Insurance Card
**POST** `/api/v1/insurance/patient-cards`

**Request Body:**
```json
{
  "patient_id": "uuid",
  "insurance_company_id": "uuid",
  "tpa_id": "uuid",
  "policy_master_id": "uuid",
  "policy_number": "P/141113/01/2024/001234",
  "member_id": "STAR123456",
  "card_number": "STARCARD789",
  "policy_holder_name": "Ramesh Patil",
  "policy_holder_dob": "1975-05-12",
  "policy_holder_relationship": "SELF",
  "patient_name_on_card": "Ramesh Patil",
  "patient_relationship": "SELF",
  "policy_start_date": "2024-04-01",
  "policy_end_date": "2025-03-31",
  "sum_insured": 500000.00,
  "room_rent_limit": 3000.00,
  "co_payment_percentage": 0,
  "is_primary": true,
  "family_members": [
    {
      "member_name": "Sunita Patil",
      "dob": "1978-08-20",
      "gender": "FEMALE",
      "relationship": "SPOUSE",
      "member_id_on_card": "STAR123457"
    }
  ]
}
```

**Validation:**
- Patient must exist
- Insurance company must be active
- `policy_end_date` must be after `policy_start_date`
- `policy_end_date` must be >= today (warn if expired)
- `sum_insured` > 0

**Response 201:** Created card with ID

**Permissions:** `insurance.patient_cards.create`

---

### 6.4 Verify Insurance Card
**POST** `/api/v1/insurance/patient-cards/:id/verify`

**Request Body:**
```json
{
  "verification_status": "VERIFIED",
  "verification_remarks": "Card details confirmed with TPA portal"
}
```

**Business Rule:** Only `INSURANCE_DESK_MANAGER` or `INSURANCE_COORDINATOR` can verify.

---

### 6.5 Check Policy Eligibility
**POST** `/api/v1/insurance/patient-cards/:id/eligibility-check`

Real-time or manual eligibility check.

**Request Body:**
```json
{
  "check_date": "2024-11-15",
  "planned_procedure": "Appendectomy"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "is_eligible": true,
    "policy_status": "ACTIVE",
    "policy_end_date": "2025-03-31",
    "remaining_sum_insured": 450000.00,
    "room_rent_limit": 3000.00,
    "co_payment": 0,
    "waiting_period_cleared": true,
    "ped_declared": false,
    "maternity_eligible": false,
    "warnings": []
  }
}
```

---

## 7. Pre-Authorization APIs

### 7.1 List Pre-Authorization Requests
**GET** `/api/v1/insurance/preauth`

**Query Params:** `patient_id`, `status`, `insurance_company_id`, `date_from`, `date_to`, `preauth_type`, `page`, `limit`

**Response:** Summary list with preauth_number, patient name, insurer, requested amount, status, created date.

---

### 7.2 Get Pre-Authorization Detail
**GET** `/api/v1/insurance/preauth/:id`

Full detail including documents, status logs, query history.

---

### 7.3 Create Pre-Authorization Request
**POST** `/api/v1/insurance/preauth`

**Request Body:**
```json
{
  "patient_id": "uuid",
  "patient_insurance_card_id": "uuid",
  "admission_id": "uuid",
  "preauth_type": "INITIAL",
  "request_type": "PLANNED",
  "diagnosis_icd_code": "K35.89",
  "diagnosis_description": "Acute appendicitis with other complications",
  "procedure_codes": ["47562", "47563"],
  "planned_admission_date": "2024-11-20",
  "planned_discharge_date": "2024-11-23",
  "estimated_days": 3,
  "treating_doctor_id": "uuid",
  "department_id": "uuid",
  "estimated_cost": 85000.00,
  "requested_amount": 75000.00,
  "room_type_requested": "SEMI_PRIVATE"
}
```

**Validation:**
- Patient insurance card must be `VERIFIED` and active
- `planned_admission_date` >= today
- `requested_amount` <= card's remaining sum insured
- Treating doctor must be registered

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "preauth_number": "PA-2024-00123",
    "status": "DRAFT"
  }
}
```

**Permissions:** `insurance.preauth.create`

---

### 7.4 Submit Pre-Authorization to TPA
**POST** `/api/v1/insurance/preauth/:id/submit`

Changes status from `DRAFT` → `SUBMITTED`.

**Business Rule:** All required documents must be uploaded before submission.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "preauth_number": "PA-2024-00123",
    "status": "SUBMITTED",
    "submission_date": "2024-11-15T10:30:00Z",
    "tpa_reference_number": null
  }
}
```

---

### 7.5 Update TPA Response on Pre-Authorization
**PUT** `/api/v1/insurance/preauth/:id/tpa-response`

Records TPA's decision.

**Request Body:**
```json
{
  "tpa_reference_number": "TPA-REF-987654",
  "status": "APPROVED",
  "authorization_number": "AUTH20241115001",
  "approved_amount": 70000.00,
  "approved_room_type": "SEMI_PRIVATE",
  "approved_room_rent": 3000.00,
  "co_payment_applicable": false,
  "valid_from": "2024-11-20",
  "valid_to": "2024-11-25",
  "remarks_by_tpa": "Approved for appendectomy procedure"
}
```

**Permissions:** `insurance.preauth.update_response`

---

### 7.6 Raise Enhancement Request
**POST** `/api/v1/insurance/preauth/:id/enhancement`

**Request Body:**
```json
{
  "enhancement_requested_amount": 20000.00,
  "reason": "Additional procedure required - laparoscopic cholecystectomy",
  "estimated_additional_days": 1
}
```

Creates a new `pre_authorization_requests` record with `preauth_type = ENHANCEMENT` and `parent_preauth_id` linking back.

---

### 7.7 Get Pre-Auth Status Log
**GET** `/api/v1/insurance/preauth/:id/status-log`

Returns full audit trail of all status changes.

---

### 7.8 List Pre-Auth Documents
**GET** `/api/v1/insurance/preauth/:id/documents`

---

### 7.9 Upload Pre-Auth Document
**POST** `/api/v1/insurance/preauth/:id/documents`

Multipart form upload. Accepted types: `application/pdf`, `image/jpeg`, `image/png`. Max 20MB per file.

---

## 8. Claim APIs

### 8.1 List Claims
**GET** `/api/v1/insurance/claims`

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `patient_id` | UUID | |
| `claim_type` | String | `CASHLESS`, `REIMBURSEMENT`, `TPA` |
| `status` | String | Claim status value |
| `company_id` | UUID | |
| `date_from` | Date | Created date range |
| `date_to` | Date | |
| `settlement_from` | Date | Settlement date range |
| `settlement_to` | Date | |
| `min_amount` | Decimal | |
| `max_amount` | Decimal | |
| `search` | String | Claim number or patient name |
| `page` | Integer | |
| `limit` | Integer | |

**Response:** Summary list with key fields for dashboard display.

---

### 8.2 Get Claim Detail
**GET** `/api/v1/insurance/claims/:id`

Full claim detail including items, documents, payments, status log, queries.

---

### 8.3 Create Claim
**POST** `/api/v1/insurance/claims`

**Request Body:**
```json
{
  "claim_type": "CASHLESS",
  "patient_id": "uuid",
  "patient_insurance_card_id": "uuid",
  "admission_id": "uuid",
  "preauth_id": "uuid",
  "insurance_company_id": "uuid",
  "tpa_id": "uuid",
  "policy_number": "P/141113/01/2024/001234",
  "member_id": "STAR123456",
  "authorization_number": "AUTH20241115001",
  "admission_date": "2024-11-20",
  "discharge_date": "2024-11-23",
  "treating_doctor_id": "uuid",
  "department_id": "uuid",
  "diagnosis_primary": "Acute appendicitis",
  "diagnosis_icd_code": "K35.89",
  "total_bill_amount": 87500.00,
  "claimed_amount": 75000.00,
  "claim_items": [
    {
      "service_category": "ROOM",
      "service_code": "SEMI-PVT",
      "service_name": "Semi-Private Room - 3 Days",
      "quantity": 3,
      "unit_rate": 3000.00,
      "billed_amount": 9000.00
    },
    {
      "service_category": "SURGERY",
      "service_code": "APPY",
      "service_name": "Appendectomy - Laparoscopic",
      "quantity": 1,
      "unit_rate": 45000.00,
      "billed_amount": 45000.00
    }
  ]
}
```

**Response 201:** Claim created with `claim_number`

**Permissions:** `insurance.claims.create`

---

### 8.4 Submit Claim
**POST** `/api/v1/insurance/claims/:id/submit`

Validates all required documents present, changes status `DRAFT` → `SUBMITTED`.

---

### 8.5 Update Claim Settlement
**PUT** `/api/v1/insurance/claims/:id/settlement`

**Request Body:**
```json
{
  "approved_amount": 68000.00,
  "disallowed_amount": 7000.00,
  "co_payment_amount": 0,
  "settled_amount": 68000.00,
  "tds_deducted": 680.00,
  "net_receivable_amount": 67320.00,
  "tpa_claim_number": "TPA-CLM-2024-98765",
  "insurer_claim_number": "INS-CLM-2024-44321",
  "settlement_date": "2024-12-10",
  "settlement_utr": "HDFC12345678901",
  "payment_mode": "NEFT",
  "shortfall_reason": "Room rent capped at policy limit",
  "claim_items": [
    {
      "id": "uuid",
      "eligible_amount": 9000.00,
      "approved_amount": 9000.00,
      "disallowed_amount": 0
    }
  ]
}
```

**Permissions:** `insurance.claims.update_settlement`

---

### 8.6 Record Claim Payment
**POST** `/api/v1/insurance/claims/:id/payments`

**Request Body:**
```json
{
  "payment_date": "2024-12-10",
  "amount_received": 67320.00,
  "tds_amount": 680.00,
  "net_amount": 67320.00,
  "payment_mode": "NEFT",
  "utr_reference": "HDFC12345678901"
}
```

**Side effect:** Triggers finance posting workflow.

---

### 8.7 Get Claim Status Log
**GET** `/api/v1/insurance/claims/:id/status-log`

---

### 8.8 List Claim Documents
**GET** `/api/v1/insurance/claims/:id/documents`

---

### 8.9 Upload Claim Document
**POST** `/api/v1/insurance/claims/:id/documents`

Multipart file upload.

---

### 8.10 List Claim Items
**GET** `/api/v1/insurance/claims/:id/items`

---

### 8.11 Update Claim Items
**PUT** `/api/v1/insurance/claims/:id/items`

Bulk update of claim line items with eligibility/approval amounts.

---

### 8.12 Raise Claim Query Response
**POST** `/api/v1/insurance/claims/:id/queries/:queryId/respond`

**Request Body:**
```json
{
  "response_details": "Patient records attached. Surgery was emergency due to perforation risk.",
  "document_ids": ["uuid1", "uuid2"]
}
```

---

### 8.13 Resubmit Claim
**POST** `/api/v1/insurance/claims/:id/resubmit`

Creates a new claim linked to the original as `parent_claim_id`.

---

## 9. Corporate Insurance APIs

### 9.1 List Corporates
**GET** `/api/v1/insurance/corporates`

### 9.2 Get Corporate
**GET** `/api/v1/insurance/corporates/:id`

### 9.3 Create Corporate
**POST** `/api/v1/insurance/corporates`

### 9.4 Update Corporate
**PUT** `/api/v1/insurance/corporates/:id`

---

## 10. Dashboard & Reporting APIs

### 10.1 Insurance Dashboard Summary
**GET** `/api/v1/insurance/dashboard/summary`

**Query Params:** `date_from`, `date_to`, `company_id`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "pending_preauth": 12,
    "pending_claims": 8,
    "claims_submitted_today": 3,
    "total_claimed_mtd": 1250000.00,
    "total_settled_mtd": 980000.00,
    "pending_queries": 5,
    "expiring_policies_7days": 4,
    "rejection_rate_mtd": 2.5,
    "avg_settlement_days": 18.4
  }
}
```

---

### 10.2 Claims Aging Report
**GET** `/api/v1/insurance/reports/claims-aging`

**Query Params:** `date_from`, `date_to`, `company_id`, `status`

---

### 10.3 Insurer-wise Outstanding Report
**GET** `/api/v1/insurance/reports/insurer-outstanding`

---

### 10.4 Monthly Claim Summary
**GET** `/api/v1/insurance/reports/monthly-summary`

**Query Params:** `year`, `month`, `company_id`

---

### 10.5 Pre-Auth TAT Report
**GET** `/api/v1/insurance/reports/preauth-tat`

Returns average TAT by company and TPA.

---

### 10.6 Export Claims to Excel
**GET** `/api/v1/insurance/reports/claims/export`

**Query Params:** Same as list claims. Returns file stream.

**Response:** `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

---

## 11. Lookup APIs

### 11.1 Get Lookup Values by Category
**GET** `/api/v1/insurance/lookups/:category`

Returns all active lookup values for a given category.

**Example:** `GET /api/v1/insurance/lookups/CLAIM_STATUS`

---

### 11.2 Get All Lookup Categories
**GET** `/api/v1/insurance/lookups`

---

## 12. Notification APIs

### 12.1 List Notifications for Current User
**GET** `/api/v1/insurance/notifications`

**Query Params:** `is_read`, `type`, `page`, `limit`

### 12.2 Mark Notification as Read
**PUT** `/api/v1/insurance/notifications/:id/read`

### 12.3 Mark All as Read
**PUT** `/api/v1/insurance/notifications/read-all`

---

## 13. Standard Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "policy_end_date", "message": "Policy end date must be after start date" },
    { "field": "sum_insured", "message": "Sum insured must be greater than 0" }
  ]
}
```

### 401 Unauthorized
```json
{ "success": false, "message": "Authentication required" }
```

### 403 Forbidden
```json
{ "success": false, "message": "You do not have permission to perform this action" }
```

### 404 Not Found
```json
{ "success": false, "message": "Insurance company not found" }
```

### 422 Business Rule Violation
```json
{
  "success": false,
  "message": "Claim cannot be submitted",
  "errors": [
    { "field": "documents", "message": "Discharge summary is required before submission" }
  ]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An unexpected error occurred. Reference: ERR-2024-001"
}
```

---

## 14. API Security Requirements

| Requirement | Detail |
|-------------|--------|
| Authentication | JWT Bearer token, 8-hour expiry |
| Authorization | Role + permission based per endpoint |
| Rate Limiting | 200 req/min per user |
| Input Sanitization | All string inputs sanitized |
| SQL Injection | Parameterized queries only via ORM |
| File Uploads | Virus scan before storage |
| Audit | Every mutating API call logged to `insurance_audit_logs` |
| HTTPS | Mandatory on all environments |
| CORS | Whitelist only HMS frontend domain |

---

## 15. API Review Checklist

- [ ] All endpoints have authentication
- [ ] All endpoints have permission guards
- [ ] All list endpoints have pagination
- [ ] All create/update endpoints have validation
- [ ] Soft delete implemented on all DELETEs
- [ ] Standard error envelope used consistently
- [ ] All financial fields return as decimal strings
- [ ] Audit logging triggered on all mutations
- [ ] File upload endpoints have size/type validation
- [ ] No sensitive data (card numbers, PAN) returned in list APIs
