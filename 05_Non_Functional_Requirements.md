# 05 – Non-Functional Requirements (NFR)
## HMS Insurance Module

---

## 1. Performance Requirements

| NFR-ID | Requirement | Target |
|---|---|---|
| NFR-P-001 | Dashboard load time | < 3 seconds |
| NFR-P-002 | Pre-auth form submission response | < 2 seconds |
| NFR-P-003 | Document upload (< 10MB) completion | < 5 seconds |
| NFR-P-004 | API response time (95th percentile) | < 500ms |
| NFR-P-005 | Search results (patient/claim) | < 1 second |
| NFR-P-006 | Report generation (< 1,000 records) | < 10 seconds |
| NFR-P-007 | Audit log query (date range) | < 5 seconds |
| NFR-P-008 | Concurrent users supported | Minimum 50 simultaneous |

---

## 2. Availability & Reliability

| NFR-ID | Requirement | Target |
|---|---|---|
| NFR-A-001 | System uptime | 99.9% (≤ 8.7 hours downtime/year) |
| NFR-A-002 | Planned maintenance window | Sunday 2 AM – 5 AM |
| NFR-A-003 | Recovery Time Objective (RTO) | < 2 hours |
| NFR-A-004 | Recovery Point Objective (RPO) | < 1 hour (last backup) |
| NFR-A-005 | Database backup frequency | Every 6 hours |
| NFR-A-006 | System must function if TPA portal is down | Offline manual fallback mode |
| NFR-A-007 | No data loss on browser crash mid-form | Auto-save draft every 60 seconds |

---

## 3. Security Requirements

| NFR-ID | Requirement | Standard |
|---|---|---|
| NFR-S-001 | All data in transit encrypted | TLS 1.2+ |
| NFR-S-002 | All sensitive data at rest encrypted | AES-256 |
| NFR-S-003 | Authentication | JWT + Refresh Token (or session-based as per HMS) |
| NFR-S-004 | Password policy | Min 8 chars, uppercase, number, special char |
| NFR-S-005 | Session timeout | 30 minutes of inactivity |
| NFR-S-006 | Role-based access control | Enforced at API and UI layer |
| NFR-S-007 | PHI data access logging | All access logged |
| NFR-S-008 | SQL injection protection | ORM parameterized queries |
| NFR-S-009 | XSS protection | Input sanitization on all fields |
| NFR-S-010 | CSRF protection | CSRF tokens on all forms |
| NFR-S-011 | File upload validation | Type whitelist, size limit, virus scan |
| NFR-S-012 | API rate limiting | 100 requests/minute per user |
| NFR-S-013 | Audit trail for PHI access | Immutable logs |

---

## 4. Scalability Requirements

| NFR-ID | Requirement | Detail |
|---|---|---|
| NFR-SC-001 | Database must support 100,000+ claim records | With proper indexing |
| NFR-SC-002 | Document storage scalable to 10TB+ | Cloud object storage recommended |
| NFR-SC-003 | System architecture must support horizontal scaling | Stateless API design |
| NFR-SC-004 | New insurance company/TPA onboardable without code change | Configuration-driven |
| NFR-SC-005 | New document type addable without code change | Admin-configurable |

---

## 5. Usability Requirements

| NFR-ID | Requirement | Detail |
|---|---|---|
| NFR-U-001 | UI must be operable without training (for standard tasks) | Guided forms, tooltips |
| NFR-U-002 | All forms must show validation errors inline | No page-reload validation |
| NFR-U-003 | All data tables must support search, sort, filter, and pagination | Standard behavior |
| NFR-U-004 | System must work on Chrome, Firefox, Edge (latest 2 versions) | Cross-browser tested |
| NFR-U-005 | UI must be responsive for tablet view (for ward use) | Min 768px viewport |
| NFR-U-006 | All screens must show user role and current patient context | Persistent header |

---

## 6. Maintainability Requirements

| NFR-ID | Requirement | Detail |
|---|---|---|
| NFR-M-001 | All modules must have independent unit tests | > 80% coverage |
| NFR-M-002 | Code must follow project-defined naming conventions | Per existing HMS standards |
| NFR-M-003 | All APIs must be versioned | /api/v1/insurance/... |
| NFR-M-004 | Database migrations must be reversible | Down migration scripts required |
| NFR-M-005 | All environment-specific configs in .env files | No hardcoded values |
| NFR-M-006 | Error messages must be logged with stack trace | Centralized logging |

---

## 7. Compliance Requirements

| NFR-ID | Requirement | Regulation |
|---|---|---|
| NFR-C-001 | Patient data must not leave the hospital network without consent | DPDP Act 2023 |
| NFR-C-002 | Medical records must be retained for minimum 7 years | MCI/NMC guidelines |
| NFR-C-003 | Insurance claim data must be auditable | IRDAI guidelines |
| NFR-C-004 | System must support NABH audit requirements | NABH accreditation standards |

---

## 8. Integration Requirements

| NFR-ID | Requirement | Detail |
|---|---|---|
| NFR-I-001 | Integration with existing HMS patient module | Patient data must not be duplicated |
| NFR-I-002 | Integration with existing HMS billing module | Real-time approved amount sync |
| NFR-I-003 | Integration with existing HMS EMR/IPD module | Discharge summary and diagnosis auto-populated |
| NFR-I-004 | Integration with existing HMS finance module | Settlement posting |
| NFR-I-005 | Integration points must be documented as APIs | No direct DB cross-schema queries |

---

*End of NFR*
