# 15 – Database Design
## HMS Insurance Module

---

## 1. Design Principles

- All primary keys are UUIDs (not auto-increment integers)
- All tables include `created_at`, `updated_at` timestamps
- Soft delete via `is_deleted` + `deleted_at` + `deleted_by` (never hard delete insurance data)
- All financial amounts stored as DECIMAL(15,2)
- All percentage values stored as DECIMAL(5,2)
- Dates stored as DATE type; timestamps as TIMESTAMP WITH TIMEZONE (UTC)
- All foreign keys have explicit constraints
- Indexes on all FK columns and all commonly searched/filtered columns

---

## 2. Database Schema Overview

```
MASTER DATA LAYER
  insurance_companies
  tpas
  tpa_insurance_mappings
  policy_types
  insurance_plans
  plan_exclusions
  non_payable_items
  tpa_configurations
  tpa_contacts
  government_schemes

PATIENT INSURANCE LAYER
  patient_insurance_policies
  policy_beneficiaries
  corporate_accounts
  corporate_employee_policies

PRE-AUTHORIZATION LAYER
  pre_authorizations
  preauth_communication_logs
  preauth_queries
  enhancement_requests

CASHLESS CLAIM LAYER
  cashless_claims
  interim_bills
  claim_documents
  claim_settlements

REIMBURSEMENT CLAIM LAYER
  reimbursement_claims
  reimbursement_documents
  deficiency_records
  reimbursement_settlements

APPEAL LAYER
  claim_appeals
  appeal_documents
  appeal_settlements

FINANCE LAYER
  tpa_payment_receipts
  claim_write_offs
  insurance_receivables_aging

DOCUMENT LAYER
  claim_documents (shared)
  document_versions
  document_access_logs

NOTIFICATION LAYER
  notification_templates
  notifications
  notification_logs

AUDIT LAYER
  claim_audit_logs (immutable)
  master_data_change_logs
```

---

## 3. Core Tables

### 3.1 insurance_companies

```sql
insurance_companies (
  id                     UUID PRIMARY KEY,
  company_name           VARCHAR(200) NOT NULL,
  short_name             VARCHAR(50) NOT NULL,
  irdai_registration_no  VARCHAR(50) NOT NULL UNIQUE,
  company_type           VARCHAR(20) NOT NULL CHECK (company_type IN ('PUBLIC','PRIVATE','GOVERNMENT')),
  headquarters           VARCHAR(200),
  claim_email            VARCHAR(200) NOT NULL,
  pre_auth_email         VARCHAR(200),
  portal_url             VARCHAR(500),
  helpline_number        VARCHAR(20),
  claim_department_phone VARCHAR(20) NOT NULL,
  empanelment_date       DATE,
  empanelment_expiry     DATE,
  is_cashless            BOOLEAN NOT NULL DEFAULT TRUE,
  is_active              BOOLEAN NOT NULL DEFAULT TRUE,
  notes                  TEXT,
  created_by             UUID NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_deleted             BOOLEAN DEFAULT FALSE,
  deleted_at             TIMESTAMPTZ,
  deleted_by             UUID
)

INDEXES: idx_insurance_companies_name, idx_insurance_companies_irdai
```

---

### 3.2 tpas

```sql
tpas (
  id                     UUID PRIMARY KEY,
  tpa_name               VARCHAR(200) NOT NULL,
  short_name             VARCHAR(50) NOT NULL,
  irdai_tpa_code         VARCHAR(50) NOT NULL UNIQUE,
  headquarters           VARCHAR(200),
  pre_auth_email         VARCHAR(200) NOT NULL,
  claims_email           VARCHAR(200) NOT NULL,
  portal_url             VARCHAR(500),
  helpline               VARCHAR(20),
  empanelment_no         VARCHAR(100),
  standard_tat_hours     INTEGER,
  claim_tat_days         INTEGER,
  is_active              BOOLEAN NOT NULL DEFAULT TRUE,
  notes                  TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

---

### 3.3 insurance_plans

```sql
insurance_plans (
  id                            UUID PRIMARY KEY,
  insurance_company_id          UUID NOT NULL REFERENCES insurance_companies(id),
  tpa_id                        UUID REFERENCES tpas(id),
  plan_name                     VARCHAR(200) NOT NULL,
  plan_code                     VARCHAR(50) NOT NULL,
  policy_type_code              VARCHAR(20) NOT NULL,
  sum_insured                   DECIMAL(15,2) NOT NULL,
  room_rent_limit_per_day       DECIMAL(15,2),
  room_type_allowed             VARCHAR(20),
  icu_limit_per_day             DECIMAL(15,2),
  copay_percentage              DECIMAL(5,2) DEFAULT 0,
  copay_applies_to              VARCHAR(50),
  deductible_amount             DECIMAL(15,2) DEFAULT 0,
  pre_hospitalization_days      INTEGER DEFAULT 30,
  post_hospitalization_days     INTEGER DEFAULT 60,
  waiting_period_initial_days   INTEGER DEFAULT 30,
  waiting_period_pvd_years      INTEGER DEFAULT 1,
  daycare_covered               BOOLEAN DEFAULT TRUE,
  opd_covered                   BOOLEAN DEFAULT FALSE,
  maternity_covered             BOOLEAN DEFAULT FALSE,
  dental_covered                BOOLEAN DEFAULT FALSE,
  vision_covered                BOOLEAN DEFAULT FALSE,
  mental_health_covered         BOOLEAN DEFAULT FALSE,
  ayush_covered                 BOOLEAN DEFAULT FALSE,
  is_active                     BOOLEAN DEFAULT TRUE,
  effective_from                DATE,
  effective_to                  DATE,
  notes                         TEXT,
  created_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

---

### 3.4 patient_insurance_policies

```sql
patient_insurance_policies (
  id                     UUID PRIMARY KEY,
  patient_id             UUID NOT NULL,   -- FK to HMS patients table
  insurance_company_id   UUID NOT NULL REFERENCES insurance_companies(id),
  tpa_id                 UUID REFERENCES tpas(id),
  plan_id                UUID REFERENCES insurance_plans(id),
  policy_number          VARCHAR(100) NOT NULL,
  group_number           VARCHAR(100),
  member_id              VARCHAR(100),
  policyholder_name      VARCHAR(200) NOT NULL,
  relationship_to_patient VARCHAR(50) NOT NULL,
  policy_type            VARCHAR(20) NOT NULL,
  policy_start_date      DATE NOT NULL,
  policy_end_date        DATE NOT NULL,
  sum_insured            DECIMAL(15,2) NOT NULL,
  utilized_amount        DECIMAL(15,2) DEFAULT 0,
  available_balance      DECIMAL(15,2),  -- computed: sum_insured - utilized_amount
  copay_percentage       DECIMAL(5,2) DEFAULT 0,
  room_type_entitlement  VARCHAR(20),
  is_primary_policy      BOOLEAN DEFAULT TRUE,
  eligibility_verified   BOOLEAN DEFAULT FALSE,
  eligibility_verified_by UUID,
  eligibility_verified_at TIMESTAMPTZ,
  tpa_reference_number   VARCHAR(100),
  is_active              BOOLEAN DEFAULT TRUE,
  notes                  TEXT,
  created_by             UUID NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

INDEXES: idx_pip_patient_id, idx_pip_policy_number, idx_pip_end_date
```

---

### 3.5 pre_authorizations

```sql
pre_authorizations (
  id                        UUID PRIMARY KEY,
  preauth_number            VARCHAR(50) UNIQUE NOT NULL,  -- PA-YYYY-NNNNN
  patient_id                UUID NOT NULL,
  admission_id              UUID NOT NULL,  -- FK to HMS admissions
  patient_insurance_policy_id UUID NOT NULL REFERENCES patient_insurance_policies(id),
  insurance_company_id      UUID NOT NULL REFERENCES insurance_companies(id),
  tpa_id                    UUID REFERENCES tpas(id),

  -- Clinical
  admission_date            DATE NOT NULL,
  admission_type            VARCHAR(20) NOT NULL,  -- PLANNED/EMERGENCY/DAYCARE
  treating_doctor_id        UUID NOT NULL,
  treating_doctor_name      VARCHAR(200) NOT NULL,
  department                VARCHAR(100),
  primary_diagnosis_icd     VARCHAR(20) NOT NULL,
  primary_diagnosis_desc    VARCHAR(500) NOT NULL,
  secondary_diagnosis_icd   VARCHAR(20),
  secondary_diagnosis_desc  VARCHAR(500),
  planned_procedure_code    VARCHAR(20),
  planned_procedure_desc    VARCHAR(500),
  presenting_complaints     TEXT,
  duration_of_illness       VARCHAR(100),
  expected_los_days         INTEGER,
  ward_type_requested       VARCHAR(20),

  -- Financial
  estimated_room_charges    DECIMAL(15,2) DEFAULT 0,
  estimated_icu_charges     DECIMAL(15,2) DEFAULT 0,
  estimated_surgeon_fee     DECIMAL(15,2) DEFAULT 0,
  estimated_anesthetist_fee DECIMAL(15,2) DEFAULT 0,
  estimated_lab_charges     DECIMAL(15,2) DEFAULT 0,
  estimated_radiology_charges DECIMAL(15,2) DEFAULT 0,
  estimated_pharmacy_charges DECIMAL(15,2) DEFAULT 0,
  estimated_blood_charges   DECIMAL(15,2) DEFAULT 0,
  estimated_implant_charges DECIMAL(15,2) DEFAULT 0,
  estimated_other_charges   DECIMAL(15,2) DEFAULT 0,
  estimated_total           DECIMAL(15,2) NOT NULL,

  -- TPA Response
  tpa_reference_number      VARCHAR(100),
  tpa_auth_number           VARCHAR(100),
  approved_amount           DECIMAL(15,2),
  tpa_response_date         DATE,
  tpa_response_notes        TEXT,
  rejection_reason          TEXT,

  -- Status
  status                    VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
  submitted_at              TIMESTAMPTZ,
  approved_at               TIMESTAMPTZ,
  rejected_at               TIMESTAMPTZ,

  -- Metadata
  created_by                UUID NOT NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

INDEXES: idx_pa_patient_id, idx_pa_status, idx_pa_tpa_id, idx_pa_preauth_number
```

---

### 3.6 cashless_claims

```sql
cashless_claims (
  id                        UUID PRIMARY KEY,
  claim_number              VARCHAR(50) UNIQUE NOT NULL,  -- CC-YYYY-NNNNN
  pre_authorization_id      UUID NOT NULL REFERENCES pre_authorizations(id),
  patient_id                UUID NOT NULL,
  admission_id              UUID NOT NULL,
  insurance_company_id      UUID NOT NULL REFERENCES insurance_companies(id),
  tpa_id                    UUID REFERENCES tpas(id),

  -- Financial
  approved_amount           DECIMAL(15,2) NOT NULL,
  total_enhanced_amount     DECIMAL(15,2) DEFAULT 0,
  total_approved_amount     DECIMAL(15,2),  -- approved + enhanced
  billed_amount             DECIMAL(15,2),
  non_payable_amount        DECIMAL(15,2) DEFAULT 0,
  payable_amount            DECIMAL(15,2),
  copay_amount              DECIMAL(15,2) DEFAULT 0,
  insurance_payable_amount  DECIMAL(15,2),
  settled_amount            DECIMAL(15,2),
  shortfall_amount          DECIMAL(15,2),
  written_off_amount        DECIMAL(15,2),

  -- TPA submission tracking
  tpa_docket_number         VARCHAR(100),
  submission_date           DATE,
  acknowledgment_date       DATE,
  expected_settlement_date  DATE,
  settlement_date           DATE,
  settlement_reference      VARCHAR(100),
  tpa_rejection_reason      TEXT,

  -- Copay tracking
  copay_collected           BOOLEAN DEFAULT FALSE,
  copay_collected_at        TIMESTAMPTZ,
  copay_collected_by        UUID,
  copay_receipt_number      VARCHAR(100),

  -- Status
  status                    VARCHAR(50) NOT NULL DEFAULT 'CLAIM_CREATED',

  -- Metadata
  created_by                UUID NOT NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

---

### 3.7 reimbursement_claims

```sql
reimbursement_claims (
  id                        UUID PRIMARY KEY,
  claim_number              VARCHAR(50) UNIQUE NOT NULL,  -- RM-YYYY-NNNNN
  patient_id                UUID NOT NULL,
  admission_id              UUID NOT NULL,
  patient_insurance_policy_id UUID REFERENCES patient_insurance_policies(id),
  insurance_company_id      UUID NOT NULL REFERENCES insurance_companies(id),
  tpa_id                    UUID REFERENCES tpas(id),

  -- Clinical summary
  primary_diagnosis         VARCHAR(500) NOT NULL,
  admission_date            DATE NOT NULL,
  discharge_date            DATE NOT NULL,
  treating_doctor_name      VARCHAR(200),

  -- Financial
  total_claimed_amount      DECIMAL(15,2) NOT NULL,
  settled_amount            DECIMAL(15,2),
  shortfall_amount          DECIMAL(15,2),
  rejection_amount          DECIMAL(15,2),

  -- Submission tracking
  submission_method         VARCHAR(20),  -- EMAIL/PHYSICAL/PORTAL
  submission_date           DATE,
  tpa_docket_number         VARCHAR(100),
  expected_response_date    DATE,
  settlement_date           DATE,
  settlement_reference      VARCHAR(100),
  rejection_reason          TEXT,

  -- Status
  status                    VARCHAR(50) NOT NULL DEFAULT 'REGISTERED',
  document_completion_pct   DECIMAL(5,2) DEFAULT 0,

  -- Metadata
  created_by                UUID NOT NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

---

### 3.8 claim_audit_logs (IMMUTABLE)

```sql
claim_audit_logs (
  id              UUID PRIMARY KEY,
  claim_id        UUID NOT NULL,
  claim_type      VARCHAR(20) NOT NULL,  -- CASHLESS / REIMBURSEMENT / PRE_AUTH
  action          VARCHAR(100) NOT NULL,
  previous_status VARCHAR(50),
  new_status      VARCHAR(50),
  performed_by    UUID NOT NULL,
  user_name       VARCHAR(200) NOT NULL,
  user_role       VARCHAR(50) NOT NULL,
  ip_address      VARCHAR(50),
  timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes           TEXT,
  document_id     UUID
)
-- NO UPDATE or DELETE permissions granted on this table
-- INSERT only via stored procedure / application service layer
INDEXES: idx_audit_claim_id, idx_audit_timestamp, idx_audit_performed_by
```

---

### 3.9 claim_documents

```sql
claim_documents (
  id                  UUID PRIMARY KEY,
  claim_id            UUID NOT NULL,
  claim_type          VARCHAR(20) NOT NULL,
  document_category   VARCHAR(50) NOT NULL,
  document_name       VARCHAR(200) NOT NULL,
  original_filename   VARCHAR(300) NOT NULL,
  stored_filename     VARCHAR(300) NOT NULL,
  storage_path        VARCHAR(1000) NOT NULL,
  mime_type           VARCHAR(100) NOT NULL,
  file_size_bytes     BIGINT,
  version             INTEGER NOT NULL DEFAULT 1,
  is_latest           BOOLEAN NOT NULL DEFAULT TRUE,
  is_mandatory        BOOLEAN DEFAULT FALSE,
  expiry_date         DATE,
  uploaded_by         UUID NOT NULL,
  upload_timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_by         UUID,
  verification_status VARCHAR(20) DEFAULT 'PENDING',
  is_deleted          BOOLEAN DEFAULT FALSE,
  deleted_by          UUID,
  deleted_at          TIMESTAMPTZ,
  deletion_reason     TEXT
)
INDEXES: idx_docs_claim_id, idx_docs_category
```

---

### 3.10 enhancement_requests

```sql
enhancement_requests (
  id                        UUID PRIMARY KEY,
  pre_authorization_id      UUID NOT NULL REFERENCES pre_authorizations(id),
  enhancement_number        VARCHAR(50) UNIQUE NOT NULL,  -- ENH-XXXXX-N
  reason                    TEXT NOT NULL,
  additional_diagnosis      VARCHAR(500),
  additional_procedure      VARCHAR(500),
  original_approved_amount  DECIMAL(15,2) NOT NULL,
  additional_amount_requested DECIMAL(15,2) NOT NULL,
  enhancement_approved_amount DECIMAL(15,2),
  tpa_response_date         DATE,
  tpa_reference             VARCHAR(100),
  status                    VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
  rejection_reason          TEXT,
  created_by                UUID NOT NULL,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
```

---

### 3.11 notifications

```sql
notifications (
  id              UUID PRIMARY KEY,
  type            VARCHAR(50) NOT NULL,  -- PREAUTH_PENDING / QUERY_RAISED / etc.
  title           VARCHAR(200) NOT NULL,
  message         TEXT NOT NULL,
  priority        VARCHAR(10) NOT NULL DEFAULT 'NORMAL',  -- LOW/NORMAL/HIGH/URGENT
  claim_id        UUID,
  claim_type      VARCHAR(20),
  target_role     VARCHAR(50),
  target_user_id  UUID,
  is_read         BOOLEAN DEFAULT FALSE,
  read_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at      TIMESTAMPTZ
)
INDEXES: idx_notif_target_user, idx_notif_is_read, idx_notif_claim_id
```

---

## 4. Indexes Summary

| Table | Index Columns |
|---|---|
| patient_insurance_policies | patient_id, policy_number, policy_end_date |
| pre_authorizations | patient_id, status, tpa_id, created_at |
| cashless_claims | patient_id, status, tpa_id, created_at |
| reimbursement_claims | patient_id, status, insurance_company_id |
| claim_audit_logs | claim_id, timestamp, performed_by |
| claim_documents | claim_id, document_category |
| notifications | target_user_id, is_read, created_at |

---

## 5. Data Migration Notes

If migrating from an existing system:
1. Insurance company master data migration first
2. TPA master data second
3. Patient insurance policy data third
4. Historical claims import (separate import job, read-only)
5. DO NOT import partial/incomplete historical data as active records

---

*End of Database Design*
