# 📋 PRD — Insurance Module (PART 2 of 5)
# Sections 6–7: Functional & Non-Functional Requirements

---

## SECTION 6: Functional Requirements

> Every feature below uses the format: User Story → Acceptance Criteria → Priority.
> Priority key: 🔴 P0 = Must Have | 🟡 P1 = Should Have | 🟢 P2 = Nice to Have

---

### 6.1 Patient Insurance Registration & Verification 🔴 P0

**Feature:** Allow Insurance Desk staff to register and verify a patient's insurance coverage at the time of admission.

**User Story:**
> As an **Insurance Desk Staff**, I want to **register a patient's insurance details and verify their coverage in real-time**, so that **the hospital knows before admission whether the patient is covered and for how much**.

**Acceptance Criteria:**
1. Insurance Desk can search for a patient by name, phone, or patient ID from the Reception module's registry
2. A form allows entry of: insurance type (Government/Private), provider name, policy number, group/employee ID, sum insured, validity dates
3. For government schemes: fields for ABHA number, Ayushman card number, ration card type, CGHS beneficiary ID, ESI IP number
4. System validates policy number format (e.g., Ayushman ABHA is 14 digits)
5. On successful registration, patient record shows a visible insurance badge/tag
6. Duplicate policy registration for the same patient is prevented with a warning
7. Verification status is tracked: `Not Verified`, `Verified — Active`, `Verified — Expired`, `Verification Failed`
8. Verification timestamp and verifying staff member's name are stored

---

### 6.2 Policy Management (Private Insurance) 🔴 P0

**Feature:** Manage and track private health insurance policies linked to patients.

**User Story:**
> As an **Insurance Desk Staff**, I want to **view and manage complete policy details for privately insured patients**, so that **I can quickly check coverage limits, exclusions, and co-pay terms before submitting a pre-auth**.

**Acceptance Criteria:**
1. Policy record stores: policy number, insurer name, TPA name, plan type (individual/family floater), sum insured, sub-limits (room rent cap, ICU cap, procedure-specific caps)
2. Co-pay percentage and deductible amount are stored and used in billing calculations
3. Policy start date and end date are tracked — system flags if policy is expired
4. Waiting period diseases list (e.g., pre-existing conditions) can be noted as free-text
5. Network hospital status for this insurer is indicated (Yes/No)
6. Policy can be linked to multiple family members (family floater scenario)
7. Policy history is maintained — previous year's policies are archived, not deleted

---

### 6.3 Government Scheme Beneficiary Management 🔴 P0

**Feature:** Register and manage patients covered under PM-JAY, CGHS, ESIC, and MJPJAY schemes.

**User Story:**
> As an **Insurance Desk Staff**, I want to **enroll a patient under the correct government health scheme with scheme-specific fields**, so that **claims are filed to the right authority with correct reference data**.

**Acceptance Criteria:**
1. Scheme selection dropdown includes: Ayushman Bharat PM-JAY, CGHS, ESIC, MJPJAY, Other State Scheme
2. Each scheme shows only its relevant fields:
   - **PM-JAY:** ABHA number, Ayushman card number, family ID, HBP code
   - **CGHS:** Beneficiary ID, card type (serving/pensioner/dependent), referral reference
   - **ESIC:** IP number, employer name, dispensary name
   - **MJPJAY:** Ration card number, card category (Yellow/Orange/AAY/Annapurna), 7/12 extract reference
3. Beneficiary verification status is tracked separately from private insurance
4. If a patient is eligible under multiple schemes (PM-JAY + MJPJAY convergence), system allows selecting primary scheme
5. Arogyamitra verification checkbox is available for MJPJAY
6. Scheme-specific rate cards can be referenced (PM-JAY HBP rates, CGHS rates)

---

### 6.4 Pre-Authorization Request Management 🔴 P0

**Feature:** Create, track, and manage pre-authorization requests sent to insurers/TPAs.

**User Story:**
> As an **Insurance Desk Staff**, I want to **create a pre-authorization request with all required clinical and demographic data, track its status in real-time, and receive alerts on pending or expiring pre-auths**, so that **treatment is not delayed due to approval bottlenecks**.

**Acceptance Criteria:**
1. Pre-auth form collects: patient ID, policy reference, admitting doctor, expected admission date, expected discharge date, diagnosis (free-text + ICD-10 code if known), proposed treatment/procedure, estimated cost
2. Pre-auth status lifecycle: `Draft` → `Submitted` → `Under Review` → `Query Raised` → `Approved` → `Enhancement Requested` → `Rejected` → `Expired`
3. Each status change is timestamped and logged with the user who updated it
4. Approved pre-auth shows: approved amount, authorization number, validity period
5. If TPA raises a query, the query text is stored, and the response with additional documents can be submitted
6. Enhancement request: if treatment cost exceeds approved amount, a supplementary request can be filed
7. Pre-auth expiry date is tracked — system shows a warning 24 hours before expiry
8. Dashboard widget shows: total pre-auths today, pending approvals count, average approval time
9. Pre-auth can have multiple documents attached (clinical notes, lab reports)

---

### 6.5 Cashless Claim Processing Workflow 🔴 P0

**Feature:** File and track cashless insurance claims from admission to settlement.

**User Story:**
> As an **Insurance Desk Staff**, I want to **file a complete cashless claim with all required documents and track it through the settlement lifecycle**, so that **the hospital receives payment from the insurer without delays**.

**Acceptance Criteria:**
1. Claim can be created from an existing pre-auth (inheriting pre-auth data) or independently
2. Claim captures: patient ID, policy/scheme reference, pre-auth number, admission date, discharge date, diagnosis, procedures performed, treating doctor, final bill amount
3. Claim status lifecycle: `Draft` → `Documents Pending` → `Ready for Submission` → `Submitted` → `Under Process` → `Query` → `Approved` → `Settled` → `Partially Settled` → `Rejected` → `Appeal Filed`
4. Final bill amount is pulled from the Billing module (integration with Prajwal's module)
5. Insurance-covered amount and patient-payable amount are calculated based on policy terms (sum insured, co-pay, sub-limits, deductibles)
6. A document checklist is shown — each required document (discharge summary, bills, lab reports, prescriptions) has a checkbox indicating uploaded/not uploaded
7. Claim cannot move to "Ready for Submission" until all mandatory documents are uploaded
8. Settlement details: settlement amount, UTR number (bank reference), settlement date are recorded when payment is received
9. Partial settlement is supported (insurer pays less than claimed amount — difference noted with reason)

---

### 6.6 Reimbursement Claim Processing Workflow 🟡 P1

**Feature:** Support reimbursement claim workflow for patients who pay upfront.

**User Story:**
> As an **Insurance Desk Staff**, I want to **generate the hospital's portion (Part B) of the standardised reimbursement claim form and issue it to the patient with supporting documents**, so that **the patient can submit a reimbursement claim to their insurer**.

**Acceptance Criteria:**
1. Reimbursement claim can be initiated when cashless is denied or patient opts for self-pay
2. System generates Part B data: hospital name, treating doctor, admission/discharge dates, diagnosis, procedures, itemised bill, investigation summary
3. Part B data is available as a printable PDF
4. Document packet checklist is shown: original bills (marked as issued to patient), discharge summary, prescription copies, lab report copies, referral letter
5. "Documents Handed Over" confirmation is recorded with patient/attendant signature date
6. Status tracked as: `Initiated` → `Documents Issued to Patient` → `Closed`
7. Reimbursement claim is differentiated from cashless claim in all reports

---

### 6.7 TPA Management 🟡 P1

**Feature:** Maintain a master registry of Third Party Administrators (TPAs).

**User Story:**
> As an **Admin**, I want to **manage a master list of TPAs with their contact details, portal links, and associated insurers**, so that **Insurance Desk staff can quickly identify which TPA to contact for a given patient's policy**.

**Acceptance Criteria:**
1. TPA master record stores: TPA name, IRDAI license number, portal URL, helpdesk phone, helpdesk email, TAT (turnaround time) for pre-auth, TAT for claims
2. Each TPA can be linked to multiple insurance companies
3. TPA records can be activated/deactivated (not deleted)
4. A "Quick Access" button opens the TPA portal URL in a new tab
5. Admin can add, edit, and deactivate TPA records
6. Insurance Desk can view TPA details (read-only)

---

### 6.8 Insurance-Billing Integration 🔴 P0

**Feature:** Automatically calculate insurance deductions on the patient's final bill.

**User Story:**
> As a **Billing Staff**, I want the system to **automatically calculate the insurance-payable amount and patient-payable amount on the final bill**, so that **the discharge process is faster and billing errors are eliminated**.

**Acceptance Criteria:**
1. When a bill is generated for an insured patient, the system pulls: approved pre-auth amount, policy sub-limits, co-pay %, deductible amount
2. Insurance deduction is calculated as: `min(approved_amount, total_bill) - co_pay - deductible - non_covered_items`
3. Patient-payable = `total_bill - insurance_deduction`
4. Non-covered items (e.g., attendant meals, special room upgrade) are listed separately
5. The bill shows a clear split: "Total Bill: X | Insurance Covers: Y | You Pay: Z"
6. If no pre-auth exists, a warning is shown: "No active pre-authorization found for this patient"
7. Billing staff can manually override the insurance amount (with audit log entry and reason)
8. This data is shared via API with the Billing module (Prajwal's ownership)

**Integration Contract with Billing Module:**

```json
// API: GET /api/insurance/billing-summary/:patientId
// Called BY: Billing Module
// Returns TO: Billing Module
{
  "patientId": "PAT-12345",
  "insuranceType": "Private",
  "provider": "Star Health",
  "policyNumber": "SH-2026-78901",
  "preAuthNumber": "PA-5678",
  "approvedAmount": 120000,
  "coPayPercentage": 10,
  "deductible": 5000,
  "nonCoveredItems": [
    { "item": "Room Upgrade (Deluxe to Suite)", "amount": 3000 },
    { "item": "Attendant Meals", "amount": 1500 }
  ],
  "insuranceDeduction": 103500,
  "patientPayable": 26500,
  "calculationBreakdown": {
    "totalBill": 130000,
    "approvedCap": 120000,
    "lessCoPay": 12000,
    "lessDeductible": 5000,
    "lessNonCovered": 4500,
    "netInsurancePays": 103500
  }
}
```

---

### 6.9 Document Management 🔴 P0

**Feature:** Upload, store, categorise, and retrieve all insurance-related documents.

**User Story:**
> As an **Insurance Desk Staff**, I want to **upload, tag, and retrieve all documents related to a claim — from admission to settlement**, so that **claims are never rejected due to missing documentation**.

**Acceptance Criteria:**
1. Supported file types: PDF, JPEG, PNG (max 5MB per file)
2. Documents can be tagged by category: Admission Form, Discharge Summary, Investigation Reports, Prescription, Doctor's Notes, Pre-Auth Form, Bill/Invoice, Consent Form, Insurance Card Copy, ID Proof, Other
3. Each document is linked to a specific claim ID
4. Documents can be previewed in-browser (PDF viewer, image viewer)
5. Bulk upload is supported (up to 10 files at once)
6. A "Document Completeness" indicator shows percentage of mandatory documents uploaded per claim
7. Documents cannot be deleted — only soft-deleted with audit trail
8. Upload metadata stored: filename, file size, uploaded by, upload timestamp, document category

---

### 6.10 Official Insurer Form Management 🟡 P1

**Feature:** Maintain a directory of official claim forms from insurers and TPAs.

**User Story:**
> As an **Insurance Desk Staff**, I want to **quickly find the correct official claim form for any insurer/TPA**, so that **I always use the latest version and avoid claim rejection due to outdated forms**.

**Acceptance Criteria:**
1. Admin maintains a registry: insurer/TPA name, form name, form type (pre-auth/claim/reimbursement), download URL, last verified date, form version
2. Insurance Desk sees a searchable directory of forms
3. Clicking "Download" opens the official URL in a new tab (HMS does NOT host the actual PDF)
4. A "Last Verified" date shows when someone last checked that the URL is still valid
5. Admin can mark a form as "Deprecated" if the insurer releases a new version
6. Forms can be filtered by insurer name or form type

---

### 6.11 Claim Status Tracking Dashboard 🔴 P0

**Feature:** A centralised dashboard showing the status of all insurance claims.

**User Story:**
> As an **Insurance Desk Staff**, I want to **see all my pending, approved, and settled claims on a single dashboard with filters and search**, so that **I can prioritise my work and ensure no claim falls through the cracks**.

**Acceptance Criteria:**
1. Dashboard shows claims in a table/card view with columns: Claim ID, Patient Name, Insurer/Scheme, Amount, Status, Days Since Submission, Action Required
2. Filters available: status, insurer, scheme type (govt/private), date range, amount range
3. Search by patient name, claim ID, or policy number
4. Status-wise count shown at the top: Pending (X), Submitted (Y), Under Query (Z), Approved (A), Settled (B)
5. Claims under query are highlighted in yellow/amber
6. Claims older than 30 days without settlement are highlighted in red
7. Click on any claim opens full claim detail view
8. Export to CSV/Excel functionality for reporting

---

### 6.12 Insurance Analytics & Reports 🟡 P1

**Feature:** Generate analytical reports on insurance operations.

**User Story:**
> As an **Admin**, I want to **view detailed reports on insurance revenue, claim performance, and scheme utilisation**, so that **I can make data-driven decisions about empanelment and insurer relationships**.

**Acceptance Criteria:**
1. Available reports:
   - **Scheme-wise Revenue Report:** Total claims, approved amount, settled amount — per scheme (PM-JAY, CGHS, ESIC, Private)
   - **Insurer-wise Report:** Claims per insurer, approval rate, average TAT, rejection rate
   - **TPA Performance Report:** Average pre-auth TAT, query rate, settlement TAT per TPA
   - **Revenue Leakage Report:** Services rendered but not included in claim
   - **Monthly Trend Report:** Claim volume, settlement volume, outstanding receivables
   - **Claim Rejection Analysis:** Rejection reasons, frequency, financial impact
2. Reports can be filtered by date range
3. Reports show data in tables with summary totals
4. Reports can be exported to CSV
5. Dashboard shows key metrics as summary cards (total claims this month, total settled this month, outstanding receivables)

---

### 6.13 Notifications & Alerts 🟡 P1

**Feature:** Proactive alerts and notifications for time-sensitive insurance tasks.

**User Story:**
> As an **Insurance Desk Staff**, I want to **receive alerts when a pre-auth is about to expire, when documents are missing, or when a claim has been pending too long**, so that **I never miss a critical deadline**.

**Acceptance Criteria:**
1. Alert triggers:
   - Pre-auth expiring within 24 hours
   - Pre-auth approved but no claim filed within 48 hours of discharge
   - Claim has missing mandatory documents
   - Claim submitted but no response from TPA for 7+ days
   - Claim under query — response pending for 48+ hours
   - Settlement received — reconciliation needed
2. Alerts displayed as a notification bell icon with unread count
3. Alert list view shows: alert type (icon), message, timestamp, action button (e.g., "View Claim")
4. Alerts are per-user (Insurance Desk sees their alerts, Admin sees all)
5. Clicking an alert navigates to the relevant claim/pre-auth
6. Read/unread state is maintained

---

## SECTION 7: Non-Functional Requirements

### 7.1 Performance

| Metric | Target | Notes |
|---|---|---|
| Page load time (dashboard) | < 2 seconds | For up to 500 active claims displayed |
| API response time (single record) | < 300ms | GET requests for patient/policy/claim |
| API response time (list with filters) | < 1 second | Up to 1000 records with pagination |
| File upload (5MB PDF) | < 5 seconds | Over standard broadband connection |
| Search results | < 500ms | Indexed fields: patient name, claim ID, policy number |
| Report generation | < 10 seconds | For up to 12 months of data |
| Concurrent users | 20+ simultaneous | Insurance desk + billing + admin users |

### 7.2 Security

| Requirement | Implementation |
|---|---|
| Authentication | JWT-based tokens with 24-hour expiry, refresh token rotation |
| Authorization | Role-Based Access Control (RBAC) as defined in Section 5 |
| Password storage | bcrypt with salt rounds = 12 |
| API protection | Rate limiting: 100 requests/minute per user |
| Data encryption (transit) | HTTPS/TLS 1.2+ for all API calls |
| Data encryption (rest) | MongoDB field-level encryption for: Aadhaar number, policy number, bank details |
| Sensitive data masking | Policy numbers partially masked in UI (show last 4 digits only) |
| Session management | Auto-logout after 30 minutes of inactivity |
| Audit logging | Every create, update, delete action logged with user ID, timestamp, IP, old value, new value |
| File upload security | File type validation (magic bytes, not just extension), virus scan placeholder for future |
| CORS policy | Whitelist only frontend domain |
| Input sanitization | All inputs sanitized against XSS, SQL/NoSQL injection |

### 7.3 Scalability

| Scenario | Target Capacity |
|---|---|
| Total patient records | 100,000+ |
| Total insurance policies | 50,000+ |
| Total claims | 200,000+ (across all time) |
| Active claims (concurrent) | 5,000 |
| Document storage | 500GB (filesystem or cloud storage in future) |
| API throughput | 500 requests/minute sustained |

### 7.4 Reliability

| Requirement | Target |
|---|---|
| System uptime | 99.5% (allows ~44 hours downtime/year) |
| Data backup | Daily automated MongoDB backups |
| Data recovery | Recovery Point Objective: < 24 hours |
| Error handling | Graceful error messages — never expose stack traces to users |
| Failover | For v1: manual restart. v2: PM2 process manager with auto-restart |

### 7.5 Compliance

| Regulation | Requirement for HMS |
|---|---|
| IRDAI Guidelines | Pre-auth and claim timelines must be trackable per IRDAI mandates |
| IT Act 2000 | Reasonable security practices for sensitive personal data |
| DPDPA 2023 | Consent-based data processing, data minimisation, right to erasure (soft delete) |
| ABDM Standards | ABHA number storage format compliance, future NHCX readiness |
| Hospital Regulatory | Maintain audit trail for all insurance transactions for potential CAG/regulatory audits |

---

> **End of Part 2** — Continue to `PRD_Insurance_Module_PART3.md` for Section 8 (Database Schema) and Section 9 (API Endpoints).
