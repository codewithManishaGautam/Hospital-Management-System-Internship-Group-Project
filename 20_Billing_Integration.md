# 20 — Billing Integration
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager

---

## 1. Purpose

This document defines how the Insurance Module integrates with the HMS Billing Module. The billing and insurance workflows are tightly coupled: every insurance claim must trace back to a hospital bill, and every cashless authorization must influence what the patient is asked to pay at discharge.

---

## 2. Integration Overview

```
HMS Billing Module ◀────────────────▶ HMS Insurance Module
       │                                        │
  Patient Bills                          Claims / Pre-Auth
  OPD / IPD Bills                        Coverage Limits
  Final Discharge Bill                   Co-payment Computation
  Service Line Items                     Disallowed Items
  Patient Payable Amount                 Settlement Tracking
```

---

## 3. Key Integration Points

### 3.1 Admission-Level Linkage

When a patient is admitted and has a verified insurance card:

1. Billing module checks `patient_insurance_cards` for active, verified policies
2. Insurance desk creates pre-authorization linked to the `admissions` record
3. Pre-auth approved amount appears in billing module as "Insurance Coverage Estimate"
4. Billing module separates: (a) Insurance Payable amount, (b) Patient Payable amount

### 3.2 Service-Level Coverage Mapping

For each service billed in the HMS:

| Billing Service Type | Insurance Coverage Consideration |
|---------------------|----------------------------------|
| Room charges | Apply room rent limit from policy |
| ICU charges | Apply ICU rent limit from policy |
| Surgery/OT | Covered up to approved pre-auth amount |
| Pharmacy | Check if pharmacy covered (some policies exclude OPD pharmacy) |
| Laboratory | Generally covered if inpatient |
| Radiology | Generally covered if inpatient |
| Consultation fees | Often excluded or limited |
| Ambulance | Covered up to ambulance limit |
| Maternity-related | Only if maternity benefit active |

### 3.3 Discharge Bill Generation

At discharge, billing generates the final bill. The Insurance Module must provide:

- **Insurance Eligible Amount** — based on approved pre-auth + policy rules
- **Co-payment Amount** — `total_eligible × co_payment_pct / 100`
- **Deductible Amount** — as per policy
- **Disallowed Items** — items not covered (pre-existing, exclusions, limit excess)
- **Patient Payable Amount** = Disallowed + Co-payment + Deductible + Non-insured items

**Formula:**
```
Patient Payable = Total Bill − Insurance Eligible + Co-payment + Deductible
```

---

## 4. Data Shared Between Billing and Insurance

### 4.1 Billing → Insurance

| Data | When | How |
|------|------|-----|
| `admission_id` | On admission | FK reference |
| Final bill amount | At discharge | API call from billing to insurance |
| Itemized service list | For claim creation | Billing exports line items |
| Bill finalization date | Triggers claim readiness | Event notification |
| Patient payable amount | Final computation | Shared field in `admissions` or billing |

### 4.2 Insurance → Billing

| Data | When | How |
|------|------|-----|
| `preauth_id` | When pre-auth approved | FK in `admissions` |
| Authorization number | For discharge summary | Read from pre-auth |
| Insurance Eligible Amount | For patient billing | API response |
| Co-payment amount | At discharge | API response |
| Disallowed items + reasons | At discharge | API response |
| Approved room type | Affects room assignment | Read from pre-auth |
| Settlement status | For AR tracking | Updated on claim settlement |

---

## 5. APIs Required for Billing Integration

### 5.1 Get Insurance Coverage for Admission

**GET** `/api/v1/insurance/admissions/:admissionId/coverage`

Called by billing module when generating the discharge bill.

**Response:**
```json
{
  "success": true,
  "data": {
    "admission_id": "uuid",
    "patient_id": "uuid",
    "insurance_card_id": "uuid",
    "insurance_company": "Star Health",
    "policy_number": "P/141113/01/2024/001234",
    "preauth_id": "uuid",
    "preauth_number": "PA-2024-00123",
    "authorization_number": "AUTH20241115001",
    "preauth_status": "APPROVED",
    "approved_amount": 70000.00,
    "room_rent_limit": 3000.00,
    "room_type_approved": "SEMI_PRIVATE",
    "co_payment_percentage": 0,
    "deductible_amount": 0,
    "sum_insured": 500000.00,
    "remaining_sum_insured": 430000.00,
    "maternity_covered": false,
    "ambulance_limit": 1000.00,
    "coverage_warnings": [
      "Pharmacy charges above ₹5000 may require additional pre-auth",
      "Consultation charges capped at ₹1000 per day"
    ]
  }
}
```

**Called by:** Billing Module  
**Permissions:** Internal service-to-service call (no user JWT required; use service API key)

---

### 5.2 Calculate Patient Payable (Insurance Deduction)

**POST** `/api/v1/insurance/admissions/:admissionId/calculate-deduction`

Called by billing with the full itemized bill to get insurance deduction breakdown.

**Request Body:**
```json
{
  "total_bill_amount": 87500.00,
  "bill_items": [
    { "service_code": "ROOM-SEMI", "service_name": "Room - Semi Private", "amount": 9000.00, "days": 3 },
    { "service_code": "SURG-APPY", "service_name": "Appendectomy - Laparoscopic", "amount": 45000.00 },
    { "service_code": "PHARMACY", "service_name": "Pharmacy", "amount": 8500.00 },
    { "service_code": "LAB", "service_name": "Laboratory", "amount": 4000.00 },
    { "service_code": "CONSULT", "service_name": "Consultation", "amount": 2000.00 },
    { "service_code": "MISC", "service_name": "Miscellaneous", "amount": 19000.00 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_bill_amount": 87500.00,
    "insurance_eligible_amount": 75000.00,
    "disallowed_amount": 12500.00,
    "co_payment_amount": 0,
    "deductible_amount": 0,
    "patient_payable_amount": 12500.00,
    "disallowance_breakdown": [
      { "service_code": "CONSULT", "billed": 2000.00, "disallowed": 2000.00, "reason": "Consultation not covered in-policy" },
      { "service_code": "ROOM-SEMI", "billed": 9000.00, "disallowed": 0, "reason": "Within room rent limit" },
      { "service_code": "PHARMACY", "billed": 8500.00, "disallowed": 3500.00, "reason": "OPD pharmacy limit ₹5000 applied" },
      { "service_code": "MISC", "billed": 19000.00, "disallowed": 7000.00, "reason": "Exceeds pre-auth approved limit" }
    ],
    "warnings": []
  }
}
```

---

### 5.3 Notify Insurance of Bill Finalization

**POST** `/api/v1/insurance/admissions/:admissionId/bill-finalized`

Called by Billing when the discharge bill is locked.

**Request Body:**
```json
{
  "final_bill_amount": 87500.00,
  "finalized_at": "2024-11-23T14:30:00Z",
  "billing_reference": "BILL-2024-009876"
}
```

**Effect:** Insurance module marks claim as "Ready for Submission" and creates the claim draft automatically from bill data.

---

### 5.4 Get Insurance Settlement Status for Admission

**GET** `/api/v1/insurance/admissions/:admissionId/settlement-status`

Called by billing's accounts receivable to check if insurance payment has been received.

**Response:**
```json
{
  "success": true,
  "data": {
    "claim_number": "CLM-2024-00001",
    "claim_status": "SETTLED",
    "settled_amount": 68000.00,
    "settlement_date": "2024-12-10",
    "utr_reference": "HDFC12345678901",
    "pending_with_patient": 12500.00,
    "patient_payment_status": "PAID"
  }
}
```

---

## 6. Co-payment & Deductible Computation Logic

### 6.1 Co-payment

```
If co_payment_percentage > 0:
    co_payment_amount = insurance_eligible_amount × (co_payment_percentage / 100)
    
Patient pays: co_payment_amount + non_eligible_items + deductible
Insurance pays: insurance_eligible_amount - co_payment_amount
```

### 6.2 Deductible

```
If deductible_amount > 0:
    If total_eligible > deductible:
        insurance_pays = total_eligible - deductible
        patient_pays_deductible = deductible
    Else:
        insurance_pays = 0
        patient_pays_deductible = total_eligible
```

### 6.3 Room Rent Proportionate Deduction (Industry Standard)

If patient is admitted to a room with higher rent than allowed:

```
Proportionate Factor = (Actual Room Rent) / (Eligible Room Rent)
All treatment charges are reduced proportionately:
Eligible Amount per item = Billed Amount / Proportionate Factor
```

Example:
- Eligible room rent: ₹3,000/day
- Actual room rent: ₹5,000/day
- Proportionate factor: 5000/3000 = 1.667
- Surgery billed at ₹45,000 → eligible = 45,000/1.667 = ₹27,000

This must be computed in the deduction API.

---

## 7. Billing Integration Workflow at Discharge

```
Step 1: Nurse triggers discharge request
Step 2: Billing finalized final itemized bill
Step 3: Billing calls GET /admissions/:id/coverage → gets pre-auth details
Step 4: Billing calls POST /admissions/:id/calculate-deduction with bill items
Step 5: Insurance API returns eligible amount, disallowances, patient payable
Step 6: Billing displays: Insurance Portion: ₹75,000 | Patient Portion: ₹12,500
Step 7: Patient pays ₹12,500 at counter
Step 8: Billing calls POST /admissions/:id/bill-finalized
Step 9: Insurance module auto-creates claim draft (CLM-XXXX) from bill data
Step 10: Insurance desk reviews claim draft, uploads documents, submits to TPA
```

---

## 8. Billing Module Changes Required

The following fields/features must be added or modified in the HMS Billing Module to support insurance integration:

| Change | Description | Priority |
|--------|-------------|----------|
| Link `preauth_id` to admission record | FK column in `admissions` table | HIGH |
| Display insurance coverage estimate on bill screen | Fetch from insurance API | HIGH |
| Split bill into Insurance + Patient portions | Computed from deduction API | HIGH |
| "Bill Finalized" webhook/event trigger | Calls insurance module | HIGH |
| Show insurance settlement status in AR | Call insurance settlement API | MEDIUM |
| Room type tracking vs. policy allowed type | Alert if patient in higher room | MEDIUM |
| Mark items as "insurance covered" vs "patient payable" | Per-line tagging | MEDIUM |

---

## 9. Error Handling for Billing-Insurance Integration

| Scenario | Handling |
|----------|---------|
| Insurance API unavailable at discharge | Allow billing to proceed; flag claim as "pending insurance link" |
| No pre-auth found for admission | Billing proceeds as self-pay; insurance desk to handle separately |
| Pre-auth expired by discharge | Warning to billing; desk must get extension or process as reimbursement |
| Bill amount exceeds approved pre-auth amount | System flags difference; insurance desk to request enhancement |
| Multiple insurance cards for patient | Present card selection UI; manual selection required |

---

## 10. Review Checklist

- [ ] All integration APIs defined
- [ ] Co-payment formula documented
- [ ] Deductible formula documented
- [ ] Room rent proportionate deduction logic defined
- [ ] Billing module change requirements listed
- [ ] Discharge workflow sequence is clear
- [ ] Error handling for integration failures defined
- [ ] Service-to-service authentication method defined
- [ ] Auto-claim draft creation from bill finalization specified
