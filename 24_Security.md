# 24 — Security

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Security Specification  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Security Philosophy](#1-security-philosophy)
2. [Regulatory Compliance Framework](#2-regulatory-compliance-framework)
3. [Authentication & Identity](#3-authentication--identity)
4. [Authorization & Access Control](#4-authorization--access-control)
5. [Data Security](#5-data-security)
6. [API Security](#6-api-security)
7. [Frontend Security](#7-frontend-security)
8. [Document Security](#8-document-security)
9. [Audit & Non-Repudiation](#9-audit--non-repudiation)
10. [Network & Infrastructure Security](#10-network--infrastructure-security)
11. [Incident Response](#11-incident-response)
12. [Security Testing Requirements](#12-security-testing-requirements)
13. [Security Checklist](#13-security-checklist)
14. [Tasks for Gemini](#14-tasks-for-gemini)

---

## 1. Security Philosophy

The Insurance Module handles sensitive Protected Health Information (PHI), financial data, and insurance policy details. Security is not optional — it is a non-negotiable foundation that must be built into every layer.

### 1.1 Core Security Principles

| Principle | Description |
|---|---|
| **Least Privilege** | Every user has access only to what their role requires. Nothing more. |
| **Defense in Depth** | Multiple layers of security — application, API, database, network. |
| **Zero Trust** | Never assume any request is safe. Validate at every boundary. |
| **Audit Everything** | Every action is logged with enough detail to reconstruct what happened. |
| **Fail Secure** | On error or uncertainty, deny access rather than allow it. |
| **Encrypt at Rest and Transit** | All sensitive data encrypted both in storage and in transmission. |
| **Privacy by Design** | PHI access minimized, pseudonymized where possible for reports. |

### 1.2 Data Classification

| Classification | Examples | Protection Level |
|---|---|---|
| **Critical** | Policy numbers, claim amounts, insurance ID, aadhaar | Encrypted at rest + field-level encryption |
| **Confidential** | Patient name, DOB, diagnosis, treatment | Encrypted at rest + RBAC |
| **Internal** | Claim status, TPA names, workflow data | RBAC + access logging |
| **Public** | Insurance company names, general terms | Minimal |

---

## 2. Regulatory Compliance Framework

### 2.1 India-Specific Regulations

| Regulation | Relevance | Requirement |
|---|---|---|
| **IT Act 2000 + Amendment 2008** | All digital health data | Unauthorized access prevention, encryption |
| **DPDP Act 2023** (Digital Personal Data Protection) | Patient personal data | Consent management, data minimization, deletion rights |
| **IRDAI Regulations** | Insurance data | Data retention per IRDAI guidelines |
| **NABH Standards** | Accreditation | Patient data confidentiality standards |
| **CEA 2000** | Electronic records | Digital signatures, audit trails |
| **Aadhaar Act 2016** | Aadhaar data | Strict masking, no storage of biometric |

### 2.2 Data Retention Policy

| Data Type | Retention Period | Basis |
|---|---|---|
| Insurance claims | 10 years | IRDAI regulation |
| Pre-authorization records | 7 years | Hospital policy |
| Patient insurance policy data | Policy period + 5 years | Contract |
| Audit logs | 5 years | IT Act |
| Financial settlement records | 10 years | Income Tax Act |
| Document scans | 10 years | IRDAI regulation |
| System access logs | 2 years | Security policy |

### 2.3 Aadhaar Data Handling

- **Do NOT store** full Aadhaar number in any unmasked form
- Display only last 4 digits: `XXXX-XXXX-1234`
- Use VID (Virtual ID) for verification
- Aadhaar verification only through UIDAI-approved API
- Biometric data: **strictly prohibited** in HMS

---

## 3. Authentication & Identity

### 3.1 Login Security

| Feature | Requirement |
|---|---|
| Password hashing | bcrypt with cost factor ≥ 12 |
| Password minimum length | 10 characters |
| Password complexity | Uppercase + lowercase + digit + special character |
| Password history | Last 5 passwords cannot be reused |
| Account lockout | 5 failed attempts → 30-minute lockout |
| Session timeout | 30 minutes of inactivity |
| Concurrent sessions | Maximum 2 per user; configurable |
| MFA | OTP via SMS/Email for privileged roles (Admin, Finance, Approver) |
| Secure cookie | HttpOnly + Secure + SameSite=Strict |
| JWT | Short-lived access token (15 min) + refresh token (8 hours) |

### 3.2 Token Management

```
Login Request
     │
     ▼
Validate credentials
     │
     ▼
Generate:
  - Access Token (JWT, 15 min expiry)
  - Refresh Token (opaque, 8 hours, stored in DB)
     │
     ▼
Access Token stored in memory (NOT localStorage)
Refresh Token stored in HttpOnly cookie
     │
     ▼
Each API request:
  → Send Access Token in Authorization header
  → On 401: Use Refresh Token to get new Access Token
  → On Refresh Token expired: Force re-login
```

### 3.3 Password Reset Security

- Reset link sent to registered email only
- Link expires in 1 hour
- Single-use token
- New password cannot match last 5 passwords
- Notification sent to user on password change

### 3.4 Session Termination

- Logout invalidates refresh token in database
- Force logout from all sessions (Admin feature)
- Session list visible to user in profile settings

---

## 4. Authorization & Access Control

### 4.1 Role-Based Access Control (RBAC)

Every API endpoint, every screen, every action is protected by role permission checks.

| Role | Description | Trust Level |
|---|---|---|
| INSURANCE_ADMIN | Full insurance module admin | High |
| INSURANCE_DESK | Day-to-day claim processing | Medium |
| TPA_COORDINATOR | TPA relationship management | Medium |
| FINANCE_STAFF | Financial reconciliation | Medium |
| FINANCE_HEAD | Financial approval authority | High |
| MEDICAL_DIRECTOR | Clinical review and approval | High |
| AUDITOR | Read-only audit access | Low (read only) |
| SYSTEM_ADMIN | Configuration only | Very High |

### 4.2 Permission Matrix — Key Actions

| Action | INSURANCE_ADMIN | INSURANCE_DESK | TPA_COORD | FINANCE | AUDITOR |
|---|---|---|---|---|---|
| Create pre-auth | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve pre-auth | ✅ | ❌ | ❌ | ❌ | ❌ |
| Submit claim | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit submitted claim | ✅ | ❌ | ❌ | ❌ | ❌ |
| Process settlement | ✅ | ❌ | ❌ | ✅ | ❌ |
| Approve settlement | ✅ | ❌ | ❌ | ✅ (Head only) | ❌ |
| View all claims | ✅ | Own only | ✅ | ✅ | ✅ |
| Delete records | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export reports | ✅ | Limited | ✅ | ✅ | ✅ |
| View audit logs | ✅ | ❌ | ❌ | ❌ | ✅ |
| Manage users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configure TPA master | ✅ | ❌ | ✅ (view) | ❌ | ❌ |

### 4.3 Field-Level Security

Certain fields must be hidden or masked based on role:

| Field | Rule |
|---|---|
| Aadhaar number | Show last 4 digits only to all roles; full only to INSURANCE_ADMIN |
| Policy number | Visible to all with access; do not expose in logs |
| Bank account (settlement) | Masked; visible only to FINANCE roles |
| Claim financial amounts | Visible to all with access |
| Rejection reason codes | Visible to INSURANCE_ADMIN, AUDITOR, FINANCE |
| Internal notes | Visible to own-role and INSURANCE_ADMIN |

### 4.4 Row-Level Security (Multi-Branch Hospitals)

For hospital networks with multiple branches:
- Each branch's claims are only visible to staff of that branch
- Corporate/head office roles can see all branches
- TPA coordinators see claims for their assigned TPAs only

---

## 5. Data Security

### 5.1 Database Encryption

| Level | Implementation |
|---|---|
| **At-rest encryption** | AES-256 encryption at database/disk level |
| **Field-level encryption** | Aadhaar, policy number, bank details |
| **Backups** | Encrypted backups; AES-256 |
| **Connection** | TLS 1.3 between application and database |
| **Credentials** | Database passwords in environment variables; NOT in code |

### 5.2 Field-Level Encryption for Sensitive Data

Fields requiring field-level encryption:

```javascript
const sensitiveFields = [
  'aadhaar_number',       // Aadhaar
  'pan_number',           // PAN
  'policy_number',        // Insurance policy
  'bank_account_number',  // Settlement bank
  'bank_ifsc',            // Bank IFSC
  'tpa_user_credentials'  // TPA portal credentials
];
```

Encryption approach:
- AES-256-GCM encryption
- Encryption key stored in key management service (not in database)
- Key rotation supported

### 5.3 Data Masking in Logs

- No PHI in application logs
- No policy numbers in logs
- Log patient ID only (not name or Aadhaar)
- No financial amounts in debug logs

### 5.4 SQL Injection Prevention

- All queries use parameterized statements (ORM, prepared statements)
- No raw SQL string concatenation
- Input validation before any database query
- Database user has minimum required privileges only (no DROP, no CREATE)

---

## 6. API Security

### 6.1 API Authentication

Every API request must include:
```
Authorization: Bearer {access_token}
```

Server validates:
- Token signature
- Token expiry
- Token not revoked
- User account still active
- User has required permission for the endpoint

### 6.2 API Input Validation

| Rule | Implementation |
|---|---|
| All inputs validated | Joi / Zod schema validation on every endpoint |
| Content-Type enforced | `application/json` only for POST/PUT |
| Request size limit | 10MB maximum per request |
| File uploads | Separate endpoint; virus scan; extension whitelist |
| Query parameter sanitization | Strip HTML/SQL from all query params |
| Date format enforcement | ISO 8601 format only |
| ID format enforcement | UUID or integer — no arbitrary strings |

### 6.3 Rate Limiting

| Endpoint Category | Rate Limit |
|---|---|
| Login endpoint | 10 requests per IP per minute |
| All authenticated API endpoints | 100 requests per user per minute |
| Report generation endpoints | 10 per user per minute |
| File upload endpoints | 20 per user per hour |
| Password reset | 3 per email per hour |

### 6.4 CORS Policy

```javascript
corsOptions = {
  origin: [process.env.FRONTEND_URL], // Only allowed frontend origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600
};
```

### 6.5 Security Headers

All API responses must include:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### 6.6 HTTPS Enforcement

- All traffic over HTTPS (TLS 1.2 minimum, TLS 1.3 preferred)
- HTTP redirects to HTTPS
- HSTS header enabled
- SSL certificates from trusted CA (Let's Encrypt or purchased)

---

## 7. Frontend Security

### 7.1 XSS Prevention

- React renders all user content safely (no `dangerouslySetInnerHTML` with user data)
- Content Security Policy header set
- All user-supplied content sanitized before rendering
- No inline scripts

### 7.2 CSRF Prevention

- SameSite=Strict cookie attribute
- CSRF token for state-changing operations (double submit cookie pattern)

### 7.3 Sensitive Data in Frontend

- Access tokens stored in memory (not localStorage)
- Refresh tokens in HttpOnly cookies
- No patient PHI in browser URL parameters
- No sensitive data in console.log

### 7.4 Inactive Session Handling

- Show warning after 25 minutes of inactivity
- Auto-logout at 30 minutes
- On auto-logout: clear tokens, redirect to login with message
- On browser close: clear session storage

---

## 8. Document Security

### 8.1 Document Upload Security

| Check | Implementation |
|---|---|
| File type validation | MIME type check + extension whitelist (PDF, JPG, PNG, TIFF) |
| Virus scanning | ClamAV scan on upload |
| File size limit | Maximum 10MB per file, 50MB per claim |
| Malicious content | PDF sanitization (remove embedded scripts) |
| Storage path | Files stored outside web root |
| File names | Rename to UUID on storage (not original filename) |
| Access control | Documents only accessible via authenticated API |

### 8.2 Document Access Control

- Documents are not served as static files
- All document access goes through authenticated API
- Access logged
- Temporary signed URLs for download (expire in 15 minutes)
- Role-based access: Only authorized roles can download claim documents

### 8.3 Document Integrity

- SHA-256 hash stored on upload
- Hash verified on download
- Tampering detected and alerted

---

## 9. Audit & Non-Repudiation

### 9.1 Audit Log Requirements

Every action in the Insurance Module must be logged with:

| Field | Description |
|---|---|
| `timestamp` | UTC timestamp (millisecond precision) |
| `user_id` | Who performed the action |
| `user_name` | Name at time of action |
| `user_role` | Role at time of action |
| `ip_address` | Client IP address |
| `user_agent` | Browser/client information |
| `action` | What was done (CREATE, UPDATE, DELETE, VIEW, SUBMIT, APPROVE, REJECT) |
| `module` | Insurance module component |
| `record_type` | claim / pre_auth / settlement / document |
| `record_id` | ID of affected record |
| `changes` | JSON: `{ field: { before, after } }` |
| `reason` | User-provided reason (for sensitive actions) |

### 9.2 Actions That Must Be Audited

| Action | Audit Level |
|---|---|
| Login success/failure | Always |
| Password change | Always |
| Pre-auth created | Always |
| Pre-auth submitted | Always |
| Claim created | Always |
| Claim submitted | Always |
| Claim amount edited | Always + reason required |
| Claim status changed | Always |
| Settlement processed | Always |
| Settlement amount edited | Always + reason required |
| Document uploaded | Always |
| Document downloaded | Always |
| Report exported | Always |
| User role changed | Always |
| Master data changed | Always |
| Soft delete performed | Always + reason required |

### 9.3 Audit Log Immutability

- Audit logs stored in a **separate, append-only table**
- No UPDATE or DELETE permitted on audit log table
- Separate database user with INSERT-only permissions for audit writes
- Monthly audit log backup to immutable storage

---

## 10. Network & Infrastructure Security

### 10.1 Deployment Security

| Layer | Security |
|---|---|
| Web server | Nginx reverse proxy; application server not exposed directly |
| Firewall | Allow only 80/443 inbound; database port not exposed |
| Database | Accessible only from application server IP |
| SSH access | Key-based only; password SSH disabled |
| Environment variables | All secrets in `.env`; never committed to git |
| Secrets management | Use HashiCorp Vault or AWS Secrets Manager in production |

### 10.2 Dependency Security

| Practice | Implementation |
|---|---|
| Dependency scanning | `npm audit` run on every CI build |
| Known vulnerabilities | Block deployment if high-severity vuln found |
| Outdated packages | Review and update monthly |
| Lock files | `package-lock.json` committed and used |

---

## 11. Incident Response

### 11.1 Security Incident Categories

| Category | Examples | Response Time |
|---|---|---|
| P1 — Critical | Data breach, unauthorized access to PHI | Immediate (< 1 hour) |
| P2 — High | Account compromise, bulk data export | < 4 hours |
| P3 — Medium | Multiple failed logins, unusual access pattern | < 24 hours |
| P4 — Low | Single failed login, expired certificate | < 72 hours |

### 11.2 Data Breach Protocol

1. **Detect:** Security monitoring alerts or user report
2. **Contain:** Disable affected accounts; revoke tokens; isolate affected system
3. **Assess:** Determine scope — which data, how many patients
4. **Notify:** CERT-In notification within 6 hours (as per DPDP Act); affected patients notified within 72 hours
5. **Remediate:** Patch vulnerability; rotate credentials
6. **Review:** Post-incident review within 5 days

---

## 12. Security Testing Requirements

### 12.1 Required Security Tests Before Go-Live

| Test Type | Tool / Method | Frequency |
|---|---|---|
| OWASP Top 10 check | Manual review + automated scan | Before every release |
| SQL injection testing | SQLMap, manual | Before go-live |
| XSS testing | Manual + OWASP ZAP | Before go-live |
| Authentication testing | Manual | Before go-live |
| Authorization testing | Manual (role boundary testing) | Before go-live |
| API security testing | Postman + manual | Before go-live |
| File upload security | Manual | Before go-live |
| Session management | Manual | Before go-live |
| Rate limiting verification | Load testing | Before go-live |
| Dependency vulnerability | npm audit | Every build |
| Penetration testing | Third-party (recommended) | Annually |

### 12.2 OWASP Top 10 Checklist

- [ ] A01 Broken Access Control — RBAC tested for all roles
- [ ] A02 Cryptographic Failures — Encryption verified; no sensitive data in clear text
- [ ] A03 Injection — All inputs parameterized; SQL injection tested
- [ ] A04 Insecure Design — Threat modeling done; security architecture reviewed
- [ ] A05 Security Misconfiguration — Default credentials changed; debug mode off in production
- [ ] A06 Vulnerable Components — All dependencies scanned; no known CVEs
- [ ] A07 Authentication Failures — Brute force protection tested; MFA implemented
- [ ] A08 Data Integrity Failures — Document integrity verified; no deserialization issues
- [ ] A09 Logging Failures — All security events logged; logs protected
- [ ] A10 SSRF — No user-controlled URLs used in server-side requests

---

## 13. Security Checklist

### Pre-Development
- [ ] Security requirements reviewed and understood
- [ ] Threat model documented for Insurance Module
- [ ] RBAC matrix reviewed and approved
- [ ] Data classification agreed

### During Development
- [ ] All inputs validated with schema
- [ ] All outputs sanitized
- [ ] Authentication middleware on all protected routes
- [ ] Authorization check on every controller function
- [ ] No hardcoded credentials in code
- [ ] No PHI in logs
- [ ] Audit log written for all actions

### Before Go-Live
- [ ] OWASP Top 10 review completed
- [ ] Penetration test completed (or scheduled within 30 days)
- [ ] SSL certificate installed and tested
- [ ] All secrets moved to environment variables
- [ ] Database access restricted by IP
- [ ] Backup encryption verified
- [ ] Incident response plan documented
- [ ] Staff security awareness training done

---

## 14. Tasks for Gemini

---

### TASK SEC-001: Authentication Middleware

**Objective:** Implement JWT authentication middleware that protects all insurance module API routes.

**Implementation Goal:**
- Validate JWT access token on every request
- Attach user object (id, role, permissions) to `req.user`
- Return 401 for missing/invalid/expired tokens
- Return 403 for expired refresh tokens (force re-login)

**Files Likely Created:**
- `middleware/auth.middleware.js`
- `utils/jwt_utils.js`
- `tests/auth.middleware.test.js`

**Acceptance Criteria:**
- Valid token → request proceeds with `req.user` populated
- Missing token → 401 with `{ error: 'Authentication required' }`
- Expired token → 401 with `{ error: 'Token expired', code: 'TOKEN_EXPIRED' }`
- Tampered token → 401 with `{ error: 'Invalid token' }`
- No token details leaked in error messages

**Priority:** Critical  
**Estimated Effort:** 1 day  
**Risk Level:** Low

---

### TASK SEC-002: RBAC Authorization Middleware

**Objective:** Role-based access control middleware that checks permissions on every route.

**Implementation:**
```javascript
// Usage example
router.post('/claims', 
  authenticate, 
  authorize(['INSURANCE_DESK', 'INSURANCE_ADMIN', 'TPA_COORDINATOR']),
  claimController.create
);
```

**Files Likely Created:**
- `middleware/authorize.middleware.js`
- `config/permissions.config.js` — maps roles to allowed actions
- `tests/authorize.middleware.test.js`

**Acceptance Criteria:**
- Authorized role → proceeds
- Unauthorized role → 403 `{ error: 'Insufficient permissions' }`
- All insurance routes tested with unauthorized role
- Permission matrix matches document section 4.2

**Priority:** Critical  
**Estimated Effort:** 1 day  
**Risk Level:** Low

---

### TASK SEC-003: Comprehensive Audit Log Service

**Objective:** Build the audit log service that logs every action in the Insurance Module.

**Files Likely Created:**
- `services/audit_log_service.js`
- `models/audit_log.model.js`
- Database migration: `audit_logs` table (append-only)

**Usage in controllers:**
```javascript
await auditLogService.log({
  userId: req.user.id,
  action: 'CLAIM_SUBMITTED',
  recordType: 'claim',
  recordId: claim.id,
  changes: { status: { before: 'draft', after: 'submitted' } },
  ipAddress: req.ip
});
```

**Acceptance Criteria:**
- Every action in acceptance test creates an audit log entry
- Log contains all required fields (see section 9.1)
- Logs cannot be updated or deleted (verified by database constraint)
- Log entries visible in audit report

**Priority:** Critical  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK SEC-004: Sensitive Field Encryption

**Objective:** Implement field-level encryption for Aadhaar, policy numbers, and bank details.

**Files Likely Created:**
- `utils/encryption_utils.js` — encrypt/decrypt functions
- Migration to add encrypted columns

**Acceptance Criteria:**
- Aadhaar stored encrypted; only last 4 digits shown in UI
- Policy number encrypted; decrypted only when explicitly accessed by authorized role
- Encryption/decryption transparent to other services
- Database direct query shows encrypted (unreadable) value

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Medium

---

### TASK SEC-005: Input Validation Middleware

**Objective:** Joi/Zod schema validation for all Insurance Module API inputs.

**Files Likely Created:**
- `validators/claim.validator.js`
- `validators/preauth.validator.js`
- `validators/settlement.validator.js`
- `middleware/validate.middleware.js`

**Acceptance Criteria:**
- All POST/PUT endpoints reject invalid input with 422 + field-level errors
- SQL injection strings rejected
- HTML/script tags stripped from text fields
- Correct data types enforced (dates as ISO strings, amounts as numbers)

**Priority:** Critical  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

**Executive Summary:** Security in the Insurance Module is non-negotiable due to the sensitivity of health and financial data. Every layer — authentication, authorization, encryption, audit, and transport — must be implemented before the module goes live. Security is a feature, not an afterthought.

---
