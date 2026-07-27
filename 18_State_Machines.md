# 18 — State Machines
## HMS Insurance Module | Enterprise PRD

**Version:** 1.0  
**Status:** Approved for Development  
**Owner:** Project Manager

---

## 1. Overview

This document defines the complete finite state machines (FSM) for every status-driven entity in the Insurance Module. Gemini must implement these state machines strictly. No state transition should be possible unless explicitly defined here.

**Implementation Rule:** Use a dedicated service class (e.g. `ClaimStateMachine`, `PreAuthStateMachine`) that validates transitions before persisting to the database. Every invalid transition must return a structured error.

---

## 2. Pre-Authorization Request State Machine

### 2.1 States

| State | Code | Description |
|-------|------|-------------|
| Draft | `DRAFT` | Form being filled, not submitted |
| Submitted | `SUBMITTED` | Sent to TPA / Insurance company |
| Under Review | `UNDER_REVIEW` | TPA is evaluating |
| Queried | `QUERIED` | TPA raised a query, hospital must respond |
| Query Responded | `QUERY_RESPONDED` | Hospital responded, awaiting TPA decision |
| Approved | `APPROVED` | TPA approved with authorization number |
| Partially Approved | `PARTIALLY_APPROVED` | Approved for less amount |
| Rejected | `REJECTED` | TPA rejected the request |
| Appealed | `APPEALED` | Hospital has filed an appeal |
| Cancelled | `CANCELLED` | Request cancelled before TPA action |
| Closed | `CLOSED` | Final state — no further action |
| Expired | `EXPIRED` | Approved but authorization validity expired |

### 2.2 Transition Table

| From State | To State | Trigger | Actor | Condition |
|------------|----------|---------|-------|-----------|
| — | `DRAFT` | Create | Desk Staff | New request |
| `DRAFT` | `SUBMITTED` | Submit | Desk Staff | Required docs uploaded |
| `DRAFT` | `CANCELLED` | Cancel | Desk Staff / Manager | Any time before submission |
| `SUBMITTED` | `UNDER_REVIEW` | TPA Acknowledgement | System / Staff | TPA reference received |
| `SUBMITTED` | `QUERIED` | TPA raises query | Staff (manual entry) | Query details entered |
| `UNDER_REVIEW` | `QUERIED` | TPA raises query | Staff | Query details entered |
| `UNDER_REVIEW` | `APPROVED` | TPA approves | Staff | Auth number + amount entered |
| `UNDER_REVIEW` | `PARTIALLY_APPROVED` | TPA partially approves | Staff | Approved < Requested |
| `UNDER_REVIEW` | `REJECTED` | TPA rejects | Staff | Rejection reason entered |
| `QUERIED` | `QUERY_RESPONDED` | Hospital responds | Staff | Response + docs uploaded |
| `QUERY_RESPONDED` | `APPROVED` | TPA approves post-query | Staff | Auth number entered |
| `QUERY_RESPONDED` | `PARTIALLY_APPROVED` | Partial after query | Staff | |
| `QUERY_RESPONDED` | `REJECTED` | Rejected post-query | Staff | Rejection reason entered |
| `APPROVED` | `EXPIRED` | Validity date passed | System (scheduled) | valid_to < today |
| `APPROVED` | `CLOSED` | Claim created | System | claim_headers record created |
| `PARTIALLY_APPROVED` | `CLOSED` | Claim created | System | |
| `REJECTED` | `APPEALED` | Hospital appeals | Manager | Appeal reason entered |
| `APPEALED` | `APPROVED` | Appeal accepted | Staff | |
| `APPEALED` | `REJECTED` | Appeal rejected | Staff | |
| `CANCELLED` | — | Terminal | — | No further transitions |
| `CLOSED` | — | Terminal | — | No further transitions |
| `EXPIRED` | — | Terminal | — | No further transitions |

### 2.3 State Machine Diagram (Text Representation)

```
                      ┌─────────────────┐
                      │      DRAFT      │
                      └────────┬────────┘
                   Submit ↓     └─── Cancel
                      ┌─────────────────┐     ┌──────────────┐
                      │   SUBMITTED     │────▶│  CANCELLED   │
                      └────────┬────────┘     └──────────────┘
               TPA Ack ↓        └─── Query Raised
                      ┌─────────────────┐     ┌──────────────┐
                      │  UNDER_REVIEW   │────▶│   QUERIED    │
                      └────────┬────────┘     └──────┬───────┘
                 ┌─────────────┼─────────┐    Respond ↓
             Approve    Partial     Reject  ┌─────────────────┐
                 ↓         ↓          ↓    │ QUERY_RESPONDED  │
         ┌──────────┐ ┌────────┐ ┌───────┐└───────┬─────────┘
         │ APPROVED │ │PARTIAL │ │REJECT │        │
         └────┬─────┘ └───┬────┘ └───┬───┘     Approve/Reject
       Claim  │           │     Appeal│
       Created│           │        ┌──┴────────┐
              ↓           │        │  APPEALED │
           CLOSED       CLOSED     └─────┬─────┘
                                   Accept/Reject
                                 APPROVED / REJECTED
```

### 2.4 Business Rules for Pre-Auth Transitions

| Rule | Description |
|------|-------------|
| Cannot submit without patient card | `verification_status` must be `VERIFIED` |
| Cannot submit without required documents | Checklist in Document Management doc |
| Approval requires auth number | `authorization_number` is mandatory for APPROVED state |
| Enhancement only from APPROVED state | `parent_preauth_id` must point to an APPROVED pre-auth |
| Extension only from APPROVED state | Same as enhancement |
| System auto-expires | Scheduled job runs nightly to check `valid_to` |

---

## 3. Claim State Machine

### 3.1 States

| State | Code | Description |
|-------|------|-------------|
| Draft | `DRAFT` | Being created |
| Documents Pending | `DOCUMENTS_PENDING` | Claim created but docs incomplete |
| Submitted | `SUBMITTED` | Sent to TPA/insurer |
| Acknowledged | `ACKNOWLEDGED` | TPA acknowledged receipt |
| Under Process | `UNDER_PROCESS` | TPA is processing |
| Queried | `QUERIED` | TPA raised a query |
| Query Responded | `QUERY_RESPONDED` | Hospital responded to query |
| Approved | `APPROVED` | Amount approved, awaiting payment |
| Partially Settled | `PARTIALLY_SETTLED` | Partial payment received |
| Settled | `SETTLED` | Full payment received |
| Rejected | `REJECTED` | TPA rejected claim |
| Appealed | `APPEALED` | Hospital filed appeal |
| Resubmitted | `RESUBMITTED` | New claim created after rejection |
| Written Off | `WRITTEN_OFF` | Amount written off |
| Closed | `CLOSED` | Terminal state |

### 3.2 Transition Table

| From | To | Trigger | Actor | Condition |
|------|----|---------|-------|-----------|
| — | `DRAFT` | Create claim | Staff | New record |
| `DRAFT` | `DOCUMENTS_PENDING` | Save | System | Required docs missing |
| `DRAFT` | `SUBMITTED` | Submit | Staff | All docs present |
| `DOCUMENTS_PENDING` | `SUBMITTED` | Submit after docs | Staff | |
| `SUBMITTED` | `ACKNOWLEDGED` | TPA acknowledgement | Staff | TPA claim number entered |
| `SUBMITTED` | `UNDER_PROCESS` | Process started | Staff | |
| `ACKNOWLEDGED` | `UNDER_PROCESS` | Process started | Staff | |
| `UNDER_PROCESS` | `QUERIED` | TPA raises query | Staff | Query recorded |
| `UNDER_PROCESS` | `APPROVED` | TPA approves | Staff | Approved amount entered |
| `UNDER_PROCESS` | `REJECTED` | TPA rejects | Staff | Rejection reason entered |
| `QUERIED` | `QUERY_RESPONDED` | Hospital responds | Staff | |
| `QUERY_RESPONDED` | `UNDER_PROCESS` | TPA continues processing | Staff | |
| `QUERY_RESPONDED` | `APPROVED` | TPA approves | Staff | |
| `QUERY_RESPONDED` | `REJECTED` | TPA rejects | Staff | |
| `APPROVED` | `SETTLED` | Full payment received | Staff / Finance | Payment recorded |
| `APPROVED` | `PARTIALLY_SETTLED` | Partial payment | Staff | |
| `PARTIALLY_SETTLED` | `SETTLED` | Remaining payment | Staff | |
| `REJECTED` | `APPEALED` | Hospital appeals | Manager | |
| `REJECTED` | `RESUBMITTED` | New claim created | Staff | New claim links to original |
| `APPEALED` | `UNDER_PROCESS` | Appeal accepted | Staff | |
| `APPEALED` | `REJECTED` | Appeal rejected | Staff | |
| `APPROVED` | `WRITTEN_OFF` | Write off decision | Finance Manager | Authorized write-off |
| `PARTIALLY_SETTLED` | `WRITTEN_OFF` | Write off balance | Finance Manager | |
| `SETTLED` | `CLOSED` | Finance confirmed | System | Finance GL posted |
| `WRITTEN_OFF` | `CLOSED` | Finance confirmed | Finance | |
| `RESUBMITTED` | `CLOSED` | New claim active | System | |

### 3.3 Claim State Machine Diagram

```
[DRAFT] ──────────────────────────────────▶ [DOCUMENTS_PENDING]
   │                                                  │
   │ All docs present                          Docs uploaded
   ▼                                                  ▼
[SUBMITTED] ◀─────────────────────────────────────────┘
   │
   │ TPA Ack
   ▼
[ACKNOWLEDGED]
   │
   │ Processing begins
   ▼
[UNDER_PROCESS]
   │         │              │
   │ Query   │ Approve      │ Reject
   ▼         ▼              ▼
[QUERIED]  [APPROVED]   [REJECTED]
   │           │              │        │
   │ Respond   │ Payment      │ Appeal  │ Resubmit
   ▼           ▼              ▼        ▼
[QUERY_RESPONDED] [SETTLED] [APPEALED] [RESUBMITTED]
   │                │           │
   │                │ Finance   │ Accept/Reject
   │                ▼           ▼
   └──────▶   [CLOSED]    [UNDER_PROCESS / REJECTED]
```

### 3.4 Business Rules for Claim Transitions

| Rule | Description |
|------|-------------|
| Cashless claim must have preauth | If `claim_type = CASHLESS`, `preauth_id` is mandatory |
| Cannot submit without discharge date | For cashless inpatient claims |
| Cannot submit without required documents | See document checklist |
| Settlement amount validation | `settled_amount` ≤ `approved_amount` |
| Partial settlement tracking | `partially_settled_amount` tracked against `approved_amount` |
| Finance posting triggers on SETTLED | Auto-triggers finance integration |
| Write-off requires senior authorization | Role: `FINANCE_MANAGER` minimum |
| Resubmission creates new claim | Original claim moves to `RESUBMITTED` (terminal) |

---

## 4. Patient Insurance Card State Machine

### 4.1 States

| State | Code |
|-------|------|
| Pending Verification | `PENDING` |
| Verified | `VERIFIED` |
| Rejected | `REJECTED` |
| Expired | `EXPIRED` |
| Cancelled | `CANCELLED` |

### 4.2 Transitions

| From | To | Trigger | Actor | Condition |
|------|----|---------|-------|-----------|
| — | `PENDING` | Registration | Desk Staff | New card registered |
| `PENDING` | `VERIFIED` | Verify | Insurance Coordinator / Manager | Manual review |
| `PENDING` | `REJECTED` | Reject | Coordinator | Invalid card details |
| `REJECTED` | `PENDING` | Re-register | Desk Staff | After patient corrects |
| `VERIFIED` | `EXPIRED` | Expiry Date Passed | System (nightly job) | `policy_end_date` < today |
| `VERIFIED` | `CANCELLED` | Cancel | Manager | Patient request |

### 4.3 Business Rules

| Rule | Detail |
|------|--------|
| Pre-auth requires VERIFIED card | Cannot create pre-auth with PENDING or REJECTED card |
| Claim requires VERIFIED card | |
| Nightly expiry job | System checks `policy_end_date` and marks EXPIRED |
| Only manager can cancel | Role guard on CANCELLED transition |

---

## 5. Claim Query State Machine

### 5.1 States

| State | Code |
|-------|------|
| Open | `OPEN` |
| Responded | `RESPONDED` |
| Closed | `CLOSED` |

### 5.2 Transitions

| From | To | Trigger | Actor |
|------|----|---------|-------|
| — | `OPEN` | Query raised | Staff (manual) |
| `OPEN` | `RESPONDED` | Response submitted | Staff |
| `RESPONDED` | `CLOSED` | TPA closes query | Staff |
| `OPEN` | `CLOSED` | Directly closed by TPA | Staff |

**Business Rule:** Claim cannot be marked SETTLED while any query is in `OPEN` state.

---

## 6. Implementation Specification for Gemini

### 6.1 StateMachine Service Pattern

```
insurance/
  services/
    state-machines/
      PreAuthStateMachine.ts
      ClaimStateMachine.ts
      InsuranceCardStateMachine.ts
      ClaimQueryStateMachine.ts
```

Each state machine class must implement:

```typescript
interface IStateMachine {
  canTransition(fromState: string, toState: string): boolean;
  transition(entityId: string, toState: string, actorId: string, remarks?: string): Promise<void>;
  getAvailableTransitions(currentState: string, actorRole: string): string[];
}
```

### 6.2 Transition Guard Rules

Every transition method must:
1. Validate the transition is allowed in the FSM table
2. Validate the actor's role permits the transition
3. Validate business conditions (e.g., documents present)
4. Persist the new state atomically with the status log entry
5. Trigger the appropriate notification
6. Log to `insurance_audit_logs`

### 6.3 Status Codes Reference (for `insurance_lookup_values` seed)

**Category: `PREAUTH_STATUS`**
```
DRAFT, SUBMITTED, UNDER_REVIEW, QUERIED, QUERY_RESPONDED,
APPROVED, PARTIALLY_APPROVED, REJECTED, APPEALED, CANCELLED,
CLOSED, EXPIRED
```

**Category: `CLAIM_STATUS`**
```
DRAFT, DOCUMENTS_PENDING, SUBMITTED, ACKNOWLEDGED, UNDER_PROCESS,
QUERIED, QUERY_RESPONDED, APPROVED, PARTIALLY_SETTLED, SETTLED,
REJECTED, APPEALED, RESUBMITTED, WRITTEN_OFF, CLOSED
```

**Category: `CARD_STATUS`**
```
PENDING, VERIFIED, REJECTED, EXPIRED, CANCELLED
```

**Category: `QUERY_STATUS`**
```
OPEN, RESPONDED, CLOSED
```

---

## 7. Review Checklist

- [ ] All states defined for every entity
- [ ] All valid transitions documented
- [ ] Terminal states identified (no outgoing transitions)
- [ ] Actor / role for each transition defined
- [ ] Business conditions for transitions specified
- [ ] State machine service pattern defined for Gemini
- [ ] Status codes seeded in lookup values
- [ ] Audit trail on every transition
- [ ] Notification trigger per transition (ref Notification doc)
- [ ] Scheduled jobs identified (expiry, TAT breach)
