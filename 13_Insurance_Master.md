# 13 – Insurance Master Data
## HMS Insurance Module

---

## 1. Insurance Company Master

### Purpose
Central registry of all insurance companies with which the hospital has a cashless or reimbursement arrangement.

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| id | UUID | ✅ | Primary key |
| company_name | String(200) | ✅ | Full company name |
| short_name | String(50) | ✅ | Short/display name |
| irdai_registration_no | String(50) | ✅ | IRDAI registration number |
| company_type | Enum | ✅ | PUBLIC / PRIVATE / GOVERNMENT |
| headquarters | String(200) | | City and state |
| claim_email | Email | ✅ | Claims department email |
| pre_auth_email | Email | | Pre-auth submission email |
| portal_url | URL | | Online TPA/insurance portal |
| helpline_number | String(20) | | Customer helpline |
| claim_department_phone | String(20) | ✅ | Direct claims number |
| empanelment_date | Date | | Date hospital joined network |
| empanelment_expiry | Date | | Network agreement expiry |
| is_cashless | Boolean | ✅ | Does hospital accept cashless? |
| is_active | Boolean | ✅ | Active/inactive flag |
| created_by | UUID | ✅ | User who created |
| created_at | Timestamp | ✅ | System-generated |
| updated_at | Timestamp | ✅ | System-generated |
| notes | Text | | Internal notes |

---

## 2. TPA (Third Party Administrator) Master

### Purpose
Registry of all TPAs that manage claims on behalf of insurance companies.

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| id | UUID | ✅ | Primary key |
| tpa_name | String(200) | ✅ | Full TPA name |
| short_name | String(50) | ✅ | Short name |
| irdai_tpa_code | String(50) | ✅ | IRDAI assigned TPA code |
| headquarters | String(200) | | City |
| pre_auth_email | Email | ✅ | For pre-auth submissions |
| claims_email | Email | ✅ | For claim submissions |
| portal_url | URL | | TPA portal URL |
| helpline | String(20) | | Helpline number |
| empanelment_no | String(100) | | Hospital-TPA empanelment ID |
| standard_tat_hours | Integer | | Pre-auth TAT in hours |
| claim_tat_days | Integer | | Claim settlement TAT |
| is_active | Boolean | ✅ | Active status |
| created_at | Timestamp | ✅ | System-generated |
| notes | Text | | Internal notes |

### TPA–Insurance Company Mapping

| Field | Type | Description |
|---|---|---|
| tpa_id | UUID | FK to TPA master |
| insurance_company_id | UUID | FK to Insurance Company |
| effective_from | Date | Start date of arrangement |
| effective_to | Date | End date |
| is_active | Boolean | Current status |

---

## 3. Policy Type Master

### Purpose
Defines the high-level categories of insurance policies.

### Predefined Types

| Code | Name | Description |
|---|---|---|
| IND | Individual | Covers single policyholder only |
| FLOATER | Family Floater | Single sum insured shared by family |
| GROUP | Group / Corporate | Employer-provided group policy |
| GOVT | Government | CGHS, ECHS, ESI, Ayushman Bharat, etc. |
| PA | Personal Accident | Covers only accident-related treatment |
| CI | Critical Illness | Fixed benefit for listed critical illnesses |
| TOP_UP | Top-Up Policy | Covers costs above deductible |

---

## 4. Insurance Plan / Product Master

### Purpose
Defines the specific plans offered under each insurance company/TPA, with all benefit details.

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| id | UUID | ✅ | Primary key |
| insurance_company_id | UUID | ✅ | FK to company |
| tpa_id | UUID | | FK to TPA (if applicable) |
| plan_name | String(200) | ✅ | Product/plan name |
| plan_code | String(50) | ✅ | Internal code |
| policy_type_code | Enum | ✅ | IND / FLOATER / GROUP / GOVT |
| sum_insured | Decimal | ✅ | Maximum cover amount |
| room_rent_limit_per_day | Decimal | | Per day room rent cap |
| room_type_allowed | Enum | | GENERAL / SEMI_PRIVATE / PRIVATE / ANY |
| icu_limit_per_day | Decimal | | ICU per day cap |
| copay_percentage | Decimal | | % co-pay by patient |
| copay_applies_to | Enum | | ALL / SPECIFIC_CONDITIONS |
| deductible_amount | Decimal | | Amount borne by patient before insurance |
| pre_hospitalization_days | Integer | | Pre-hosp coverage (default 30) |
| post_hospitalization_days | Integer | | Post-hosp coverage (default 60) |
| waiting_period_initial_days | Integer | | Initial waiting period (usually 30 days) |
| waiting_period_pvd_years | Integer | | Pre-existing disease waiting (1–4 years) |
| daycare_covered | Boolean | | Is day care covered? |
| opd_covered | Boolean | | OPD covered? |
| maternity_covered | Boolean | | Maternity covered? |
| dental_covered | Boolean | | Dental covered? |
| vision_covered | Boolean | | Vision/eye covered? |
| mental_health_covered | Boolean | | Psychiatric/mental health? |
| ayush_covered | Boolean | | Ayurveda/AYUSH covered? |
| is_active | Boolean | ✅ | Plan active status |
| effective_from | Date | | Plan validity start |
| effective_to | Date | | Plan validity end |
| created_at | Timestamp | ✅ | |
| notes | Text | | Admin notes |

---

## 5. Plan Exclusion List

### Purpose
List of conditions, diseases, and procedures not covered under a specific plan.

| Field | Type | Description |
|---|---|---|
| id | UUID | PK |
| plan_id | UUID | FK to plan |
| exclusion_type | Enum | DISEASE / PROCEDURE / CONDITION |
| exclusion_code | String | ICD-10 code or custom code |
| exclusion_name | String(200) | Human readable |
| exclusion_scope | Enum | PERMANENT / WAITING_PERIOD |
| waiting_period_years | Integer | If waiting period applies |
| notes | Text | Additional details |

### Common Exclusions (Pre-configured)
- Congenital diseases (first 2–4 years)
- Self-inflicted injuries
- Cosmetic procedures
- Dental (unless accidental)
- Vision correction (spectacles/lenses)
- Infertility treatment (many plans)
- War injuries / nuclear hazards
- HIV/AIDS (many plans)
- Substance abuse treatment

---

## 6. Non-Payable Items List

### Purpose
Line items on a hospital bill that insurance does not cover, even if the condition is covered.

| Category | Examples |
|---|---|
| Administrative charges | Admission fees, registration charges |
| Food and beverages | Patient food, relative food |
| Telephone/TV charges | |
| Toiletries | Soap, shampoo, diapers |
| Attendant charges | Attendant bed, extra blanket |
| Laundry | |
| Patient clothing | Hospital gown (if charged separately) |
| Screening charges | Routine health check items |
| Vitamins/supplements | Unless prescribed for treatment |
| Cosmetic/aesthetic | Any cosmetic procedure or product |

**System Use:**
- Non-payable items auto-excluded from insurance claim calculation
- Shown separately on patient liability statement

---

## 7. Hospital Network Configuration

| Field | Description |
|---|---|
| insurance_company_id | Which insurer |
| network_type | FULL / PARTIAL / OPD_ONLY |
| cashless_allowed | Boolean |
| empanelment_number | Hospital's network ID with this insurer |
| empanelment_date | Start date |
| empanelment_expiry | End date |
| special_conditions | Any conditions attached |

---

## 8. Government Scheme Master (CGHS / ECHS / Ayushman Bharat / State Schemes)

### Purpose
Government schemes need separate configuration as they have their own rate cards, approval processes, and reporting formats.

| Field | Description |
|---|---|
| scheme_name | e.g., Ayushman Bharat PMJAY |
| scheme_code | Government assigned code |
| applicable_state | State-specific schemes |
| beneficiary_id_type | PMJAY ID / CGHS Card / ECHS Card |
| rate_card_applicable | Yes/No |
| rate_card_reference | Link to rate card document |
| claim_portal_url | Government portal for claims |
| special_workflow | Any scheme-specific workflow |
| reporting_format | Required report format |

---

## 9. Tasks for Gemini – Insurance Master

### Task: IM-001 – Insurance Company CRUD

**Objective:** Build insurance company management (list, create, edit, view, deactivate)

**Files likely created:**
- `src/pages/admin/InsuranceCompanyList.jsx`
- `src/pages/admin/InsuranceCompanyForm.jsx`
- `src/api/insuranceMaster.js`
- `src/models/InsuranceCompany.js`
- `src/controllers/insuranceMaster.controller.js`

**Acceptance Criteria:**
- [ ] CRUD operations working with validation
- [ ] Search by name, IRDAI code
- [ ] Soft delete (deactivation only, never hard delete)
- [ ] All changes logged in audit trail
- [ ] Related TPAs listed on company detail page

### Task: IM-002 – Insurance Plan Builder

**Objective:** Build plan configuration UI with all benefit fields and exclusion management

**Acceptance Criteria:**
- [ ] Plan creation with all fields
- [ ] Exclusion list management per plan
- [ ] Non-payable items configuration per company
- [ ] Plan search from patient insurance registration

---

*End of Insurance Master Data*
