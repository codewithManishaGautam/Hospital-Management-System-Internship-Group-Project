# 00 – Project Charter
## Hospital Management System – Insurance Module

---

### Document Control

| Field | Value |
|---|---|
| Document ID | HMS-INS-CHARTER-001 |
| Version | 1.0 |
| Status | Approved |
| Author | Enterprise Project Manager |
| Reviewer | Solution Architect |
| Last Updated | 2025 |

---

## 1. Project Overview

The Insurance Module is a core revenue-cycle component of the Hospital Management System (HMS). It replaces manual, paper-based insurance workflows with a fully digital, auditable, and integrated platform covering cashless authorizations, reimbursement claims, TPA processing, corporate insurance, and billing reconciliation.

---

## 2. Problem Statement

Hospitals today lose 15–30% of potential insurance revenue due to:
- Manual pre-authorization delays causing cashless rejections
- Incomplete or incorrect claim documentation
- Disconnected billing and insurance departments
- No real-time claim status visibility
- Poor audit trails for denied claims
- No structured escalation for pending or disputed claims

---

## 3. Project Objectives

1. Build a production-grade Insurance Module integrated into the existing HMS
2. Support Cashless, Reimbursement, TPA, and Corporate insurance workflows
3. Reduce claim rejection rate to under 5%
4. Reduce pre-authorization turnaround time to under 4 hours
5. Achieve full audit traceability for every claim event
6. Support future ABDM / NHCX integration
7. Provide real-time reporting and analytics dashboards

---

## 4. Scope

### In Scope
- Insurance Master Data Management (Companies, TPAs, Policies, Plans)
- Patient Insurance Registration
- Pre-Authorization (Initial + Enhancement)
- Cashless Claim Processing
- Reimbursement Claim Processing
- TPA Claim Processing
- Corporate Insurance Claim Processing
- Document Management
- Billing Integration
- Finance Integration
- EMR Integration
- Notifications and Alerts
- Reporting and Analytics Dashboards
- Audit Logs
- Security and Role-Based Access Control

### Out of Scope (Phase 1)
- Direct ABDM / NHCX API integration (planned Phase 2)
- Patient-facing mobile app for insurance
- AI-based claim fraud detection
- Third-party insurance marketplace integration

---

## 5. Stakeholders

| Role | Name / Department | Responsibility |
|---|---|---|
| Project Sponsor | Hospital CEO / CFO | Final approval and funding |
| Product Owner | HMS Project Manager | Requirements ownership |
| Business Analyst | Insurance Department Head | Workflow documentation |
| Solution Architect | Technical Lead | Architecture decisions |
| Developer | Gemini (Junior Full Stack) | Implementation |
| QA Lead | Testing Lead | Test strategy and execution |
| Insurance Department | Front Desk, Claims Team | UAT and operations |
| Finance Department | Accounts, Billing Team | Finance integration UAT |
| IT Department | System Administrator | Deployment and infrastructure |

---

## 6. High-Level Timeline

| Phase | Description | Estimated Duration |
|---|---|---|
| Phase 0 | Research & Domain Understanding | 1 week |
| Phase 1–2 | Business Analysis & Workflow Design | 2 weeks |
| Phase 3–5 | Database, UI/UX, API Planning | 3 weeks |
| Phase 6–10 | Core Module Development | 8 weeks |
| Phase 11–13 | Integrations | 4 weeks |
| Phase 14–16 | Reporting, Security, Notifications | 3 weeks |
| Phase 17–18 | Testing & Production Readiness | 3 weeks |
| Phase 19 | Future Enhancements | Ongoing |
| **Total** | | **~24 weeks** |

---

## 7. Budget Estimate (Reference Only)

| Category | Estimate |
|---|---|
| Development | As per contract |
| Infrastructure | Cloud/On-prem as decided |
| Third-party integrations | TBD |
| Testing tools | TBD |
| Training | Included in rollout |

---

## 8. Critical Success Factors

- [ ] Pre-authorization workflow live within first 3 months
- [ ] Zero data loss on claim documents
- [ ] Claim status visible to all authorized roles in real-time
- [ ] Billing and Insurance modules fully synchronized
- [ ] Audit log for every state change on every claim
- [ ] Role-based access enforced at UI and API levels

---

## 9. Key Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Insurance workflow complexity underestimated | High | High | Domain expert review at each phase |
| TPA API unavailability | Medium | High | Build manual fallback workflows |
| Data migration from existing system | Medium | Medium | Plan migration scripts separately |
| Scope creep from insurance team | High | Medium | Freeze scope at BRD sign-off |
| Developer ramp-up time | Low | Medium | Detailed task breakdown per phase |

---

## 10. Assumptions

1. The existing HMS backend and database are stable and available
2. The developer (Gemini) has access to all existing HMS source code
3. Insurance company and TPA master data will be provided by the hospital
4. All integration credentials (TPA portals) will be supplied by the hospital IT team
5. The hospital will allocate domain experts for UAT review

---

## 11. Constraints

- Must use existing HMS tech stack
- Must comply with Indian healthcare data privacy norms
- All documents must be stored securely with access control
- Audit logs are mandatory for regulatory compliance

---

## 12. Sign-off

| Role | Name | Signature | Date |
|---|---|---|---|
| Project Sponsor | | | |
| Product Owner | | | |
| Solution Architect | | | |
| QA Lead | | | |

---

*End of Project Charter*
