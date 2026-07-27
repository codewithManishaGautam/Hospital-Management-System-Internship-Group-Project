# 14 – TPA Master Configuration
## HMS Insurance Module

---

## 1. Overview

A TPA (Third Party Administrator) is a company licensed by IRDAI that manages health insurance claims on behalf of one or more insurance companies. This document defines the TPA-specific configuration requirements.

---

## 2. Major TPAs in India (Pre-Configured List)

| TPA Name | IRDAI Code | Portal |
|---|---|---|
| Medi Assist India | MEDIASSIST | www.mediassistindia.com |
| Paramount Health Services | PARAMOUNT | www.paramounttpa.com |
| Health India TPA | HEALTHINDIA | www.healthindiatpa.com |
| Vidal Health | VIDAL | www.vidalhealth.in |
| Medsave Health Insurance | MEDSAVE | www.medsave.in |
| Star Health (Self-TPA) | STARHEALTH | www.starhealth.in |
| Bajaj Allianz (Self-TPA) | BAJAJ | www.bajajallianz.com |
| NIVA BUPA (Self-TPA) | NIVABUPA | www.nivabupa.com |
| ICICI Lombard (Self-TPA) | ICICILOMBARD | www.icicilombard.com |
| National Insurance | NATIONAL | www.nationalinsurance.nic.co.in |
| New India Assurance | NEWINDIA | www.newindia.co.in |
| United India Insurance | UNITED | www.uiic.co.in |
| Oriental Insurance | ORIENTAL | www.orientalinsurance.org.in |

*Note: This list should be kept in seed data for easy setup*

---

## 3. TPA-Specific Configuration

### 3.1 Pre-Auth Configuration per TPA

| Config Item | Description |
|---|---|
| Submission method | EMAIL / PORTAL / FAX |
| Pre-auth email address | Specific email for this TPA |
| Portal URL | Online portal for submissions |
| Portal login required | Yes/No |
| Pre-auth form template | Which TPA form template to use |
| Max file size per submission | e.g., 10MB |
| Accepted file formats | PDF only or JPG also? |
| TAT for planned cases | In hours |
| TAT for emergency cases | In hours |
| Contact person | Primary contact at TPA |
| Escalation contact | Escalation contact |

### 3.2 Claim Configuration per TPA

| Config Item | Description |
|---|---|
| Claim submission method | EMAIL / PORTAL / PHYSICAL |
| Claim email address | Claims email |
| Claim form template | Which TPA claim form |
| Mandatory documents list | TPA-specific required documents |
| Settlement TAT | Days |
| Payment mode | NEFT / Cheque / RTGS |
| Account details | Hospital bank account registered with TPA |
| TDS applicable | Yes/No and % |

### 3.3 Query / Deficiency Handling

| Config Item | Description |
|---|---|
| Query communication method | Email / Portal |
| Query response SLA | Hours |
| Deficiency letter format | Standard or TPA-specific |
| Deficiency response method | Same as submission |

---

## 4. TPA Claim Form Templates

Different TPAs have different form formats. The system must support:

### Template Storage
| Field | Description |
|---|---|
| tpa_id | FK to TPA |
| form_type | PRE_AUTH / CLAIM / QUERY_RESPONSE |
| form_version | Version of the form |
| template_file | PDF template stored in system |
| effective_date | When this version became active |
| is_current | Is this the active template? |
| field_mapping | JSON: system field → form field mapping |

### System-Generated Form
When a pre-auth or claim is being submitted, the system should:
1. Pull the current template for the relevant TPA
2. Auto-fill all system-known fields (patient, hospital, diagnosis)
3. Present the form for user review and any manual fields
4. Generate a filled PDF for download and submission

---

## 5. TPA Performance Tracking

### Metrics to Track per TPA

| Metric | Formula |
|---|---|
| Average Pre-Auth TAT | (Sum of auth hours across cases) / Count |
| Pre-Auth Approval Rate | Approved / Total submitted × 100 |
| Pre-Auth Partial Approval Rate | Partially Approved / Total × 100 |
| Pre-Auth Rejection Rate | Rejected / Total × 100 |
| Average Query Count per Pre-Auth | Total queries / Total pre-auths |
| Average Claim TAT | (Sum of settlement days) / Count |
| Claim Rejection Rate | Rejected / Total × 100 |
| Average Settlement Ratio | Settled Amount / Claimed Amount × 100 |
| Pending Claims > 30 Days | Count |
| Pending Claims > 60 Days | Count |

### TPA Scorecard Report (Monthly)
Automatically generated report per TPA:
- Pre-auth volume and approval metrics
- Claim volume and settlement metrics
- Average TATs vs. contracted TATs
- Query frequency analysis
- Outstanding settlements

---

## 6. TPA Portal Integration (Manual vs Automated)

### Phase 1: Manual with System Records
The system does NOT directly integrate with TPA portals in Phase 1. Instead:
- User submits forms via TPA portal externally
- User records the submission and reference numbers in the HMS
- System tracks status based on user-entered updates

**Rationale:** Each TPA has a different portal with different APIs. Building 10+ integrations at once is high risk. Manual tracking with system records gives all audit and tracking benefits with zero integration risk.

### Phase 2 (Future): API Integration
For TPAs that expose APIs:
- Direct submission via API
- Automatic status polling
- Webhook-based status updates

---

## 7. TPA Contact Directory

Each TPA record should include a contact directory:

| Contact Role | Fields |
|---|---|
| Primary Contact | Name, phone, email |
| Pre-Auth Coordinator | Name, phone, email |
| Accounts/Settlement | Name, phone, email |
| Escalation Manager | Name, phone, email |
| Regional Manager | Name, phone, email |

---

## 8. TPA-Specific Business Rules

The system must support TPA-specific overrides:

| Rule | Configurable per TPA |
|---|---|
| Cashless admission minimum hours | Some TPAs require minimum 24 hours |
| Advance notice for planned admission | 24 / 48 / 72 hours |
| Pre-auth validity period | 7 / 15 / 30 days |
| Enhancement approval required | Yes / No |
| Discharge intimation required | Yes / No (some TPAs want discharge notice) |
| TPA representative visit at hospital | Required for large claims in some TPAs |

---

## 9. Tasks for Gemini – TPA Master

### Task: TPA-001 – TPA CRUD and Configuration

**Objective:** Build TPA management with all configuration fields

**Files likely created:**
- `src/pages/admin/TPAList.jsx`
- `src/pages/admin/TPAForm.jsx`
- `src/pages/admin/TPAConfiguration.jsx`
- `src/models/TPA.js`
- `src/models/TPAInsuranceMapping.js`
- `src/models/TPAConfiguration.js`

**Acceptance Criteria:**
- [ ] TPA CRUD with all configuration fields
- [ ] Insurance company mapping (many-to-many)
- [ ] Contact directory management
- [ ] TPA-specific document checklist configuration
- [ ] Performance metrics calculation (can be a separate background job)

---

*End of TPA Master*
