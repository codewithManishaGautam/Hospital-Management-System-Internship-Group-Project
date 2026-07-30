# API Contract: Insurance Module
**Backend Owner:** Siddhant Shinde
**Frontend Owner:** TBD
**Status:** 🟡 Draft
**Last Updated:** 12 May 2026

---

## Endpoint 1: POST /api/insurance/verify-patient

**Purpose:** Verify if a patient is eligible for a specific insurance scheme (e.g., Ayushman Bharat, CGHS, Private).

**Authentication:** Required (JWT Bearer Token)

**Allowed Roles:** insurance_desk, admin

**Request Body:**
```json
{
  "patientId": "64b1f4c3a1b2c3d4e5f6g7h8",
  "insuranceProvider": "Ayushman Bharat",
  "policyNumber": "AB-123456789",
  "documentType": "Aadhaar",
  "documentNumber": "1234-5678-9012"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Insurance verified successfully",
  "data": {
    "status": "active",
    "coverageLimit": 500000,
    "validUntil": "2027-03-31T00:00:00Z"
  }
}
```

**Error Responses:**
| Status Code | Scenario | Response |
|---|---|---|
| 400 | Missing required fields | `{"success": false, "error": "policyNumber is required"}` |
| 404 | Policy not found/Invalid | `{"success": false, "error": "Policy details invalid or expired"}` |

---

## Endpoint 2: POST /api/insurance/pre-auth

**Purpose:** Submit a pre-authorization request to the TPA for a planned treatment.

**Request Body:**
```json
{
  "patientId": "64b1f4c3a1b2c3d4e5f6g7h8",
  "doctorId": "64b1f4c3a1b2c3d4e5f6g7h9",
  "diagnosis": "Acute Appendicitis",
  "proposedTreatment": "Appendectomy",
  "estimatedCost": 45000
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Pre-auth request submitted",
  "data": {
    "preAuthId": "PA-2026-0512-001",
    "status": "pending_approval"
  }
}
```
