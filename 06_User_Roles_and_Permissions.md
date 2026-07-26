# 06 – User Roles & Permissions (RBAC Matrix)
## HMS Insurance Module

---

## 1. Role Definitions

### Role 1: Insurance Desk Executive
**Who:** Front desk staff assigned to the insurance counter
**Scope:** Day-to-day patient insurance registration, pre-auth initiation, document collection
**Access Level:** Operational

### Role 2: Insurance Claims Manager
**Who:** Senior staff managing claim processing and follow-up
**Scope:** Claim lifecycle management, TPA correspondence, escalations
**Access Level:** Supervisory

### Role 3: Billing Executive
**Who:** Staff in the billing department
**Scope:** Insurance amount visibility, bill creation aligned with insurance approval
**Access Level:** Billing operational

### Role 4: Finance Officer
**Who:** Accounts and finance department staff
**Scope:** Settlement recording, outstanding tracking, reconciliation
**Access Level:** Finance operational

### Role 5: Medical Officer / Doctor
**Who:** Treating doctor or medical team
**Scope:** Clinical information for pre-auth (diagnosis, treatment plan)
**Access Level:** Clinical read/limited write

### Role 6: Hospital Administrator
**Who:** Department heads, hospital management
**Scope:** Full visibility, reports, dashboards, approvals
**Access Level:** Administrative read + approval

### Role 7: System Administrator
**Who:** IT staff
**Scope:** Master data management, user management, configuration
**Access Level:** System configuration

### Role 8: Auditor
**Who:** Internal or external auditors
**Scope:** Read-only access to all records and audit logs
**Access Level:** Read-only all

---

## 2. Feature-Level Permission Matrix

| Feature | Ins. Desk | Claims Mgr | Billing Exec | Finance Officer | Medical Officer | Admin | Sys Admin | Auditor |
|---|---|---|---|---|---|---|---|---|
| **INSURANCE MASTER** |  |  |  |  |  |  |  |  |
| View insurance companies | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Create/edit insurance company | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| View TPA master | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Create/edit TPA | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| View policy plans | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Create/edit policy plans | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **PATIENT INSURANCE** |  |  |  |  |  |  |  |  |
| Register patient insurance | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| View patient insurance | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit patient insurance | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **PRE-AUTHORIZATION** |  |  |  |  |  |  |  |  |
| Create pre-auth request | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| View pre-auth records | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Submit pre-auth to TPA | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Record TPA response | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Approve/reject pre-auth (internal) | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Upload auth letter | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **CASHLESS CLAIMS** |  |  |  |  |  |  |  |  |
| Create cashless claim | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| View cashless claims | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Submit bill to TPA | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Record settlement | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Override billing limit | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **REIMBURSEMENT CLAIMS** |  |  |  |  |  |  |  |  |
| Register reimbursement | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| View reimbursement claims | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Submit to TPA | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Record settlement | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **DOCUMENTS** |  |  |  |  |  |  |  |  |
| Upload documents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| View documents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Download documents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Delete documents | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **BILLING (Insurance view)** |  |  |  |  |  |  |  |  |
| View approved amount | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Raise insurance bill | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **FINANCE** |  |  |  |  |  |  |  |  |
| Record TPA payment | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| View outstanding report | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Record write-off | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **REPORTING** |  |  |  |  |  |  |  |  |
| View operational reports | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| View management dashboards | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Export reports | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| **AUDIT LOGS** |  |  |  |  |  |  |  |  |
| View own actions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View all audit logs | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **ADMINISTRATION** |  |  |  |  |  |  |  |  |
| User management | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Role assignment | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| System configuration | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

---

## 3. Data Visibility Rules

| Data | Visibility Scope |
|---|---|
| Patient PHI (name, policy, diagnosis) | Only roles listed above with access |
| Financial settlement amounts | Insurance Claims Manager, Finance Officer, Admin |
| Audit logs | Admin, Sys Admin, Auditor only |
| Master data (company/TPA/plans) | All roles (read); Sys Admin only (write) |
| Corporate account credit limit | Finance Officer, Admin |
| Document files | Based on document category permission per role |

---

## 4. Business Rule Enforcement by Role

| Business Rule | Enforced For |
|---|---|
| Cannot create cashless claim without approved pre-auth | Claims Manager |
| Cannot bill > approved amount without override | Billing Executive (blocked); Admin (allowed) |
| Co-pay collection confirmation before discharge | Billing Executive, Claims Manager |
| Enhancement must be submitted before discharge | Claims Manager |
| Reimbursement submission within 30 days | Claims Manager (alert) |

---

## 5. Implementation Notes for Gemini

- All permissions must be enforced **both at API level** (middleware guard) and **UI level** (conditional render)
- Permissions should be stored in a roles table and a role_permissions junction table
- Use middleware like `requireRole(['CLAIMS_MANAGER', 'ADMIN'])` pattern on every API route
- UI components should check `user.permissions` before rendering buttons/forms
- Never rely solely on UI hiding for security – always validate at API

---

*End of User Roles & Permissions*
