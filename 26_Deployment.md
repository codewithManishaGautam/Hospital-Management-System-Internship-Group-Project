# 26 — Deployment Plan

**Document Version:** 1.0  
**Module:** Hospital Management System — Insurance Module  
**Document Type:** Deployment & DevOps Plan  
**Status:** Approved for Development  
**Last Updated:** 2025

---

## Table of Contents

1. [Deployment Overview](#1-deployment-overview)
2. [Environment Strategy](#2-environment-strategy)
3. [Infrastructure Requirements](#3-infrastructure-requirements)
4. [Technology Stack](#4-technology-stack)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Database Migration Strategy](#6-database-migration-strategy)
7. [Deployment Procedure](#7-deployment-procedure)
8. [Rollback Plan](#8-rollback-plan)
9. [Configuration Management](#9-configuration-management)
10. [Monitoring & Observability](#10-monitoring--observability)
11. [Backup & Disaster Recovery](#11-backup--disaster-recovery)
12. [Production Launch Checklist](#12-production-launch-checklist)
13. [Post-Launch Support Plan](#13-post-launch-support-plan)
14. [Tasks for Gemini](#14-tasks-for-gemini)

---

## 1. Deployment Overview

The Insurance Module is deployed as an integrated sub-system of the existing HMS. It is NOT a standalone application — it shares the same backend server, database cluster, and frontend application as the existing HMS modules.

### 1.1 Deployment Strategy: Rolling Integration

- Each phase of the Insurance Module is deployed after completion and testing
- Feature flags control which features are visible to end users
- New database tables are added via migrations (non-destructive)
- Existing HMS functionality is not disrupted during Insurance Module deployment

### 1.2 Deployment Approach

| Approach | Description |
|---|---|
| **Blue-Green Deployment** | Two identical environments; switch traffic after verification |
| **Feature Flags** | Enable new insurance features gradually per department |
| **Database Migrations** | Sequential, versioned, reversible migrations |
| **Zero-Downtime Target** | Deployments during maintenance window; < 5 min downtime acceptable |

---

## 2. Environment Strategy

### 2.1 Environments

| Environment | Purpose | URL Pattern | Deployment Trigger |
|---|---|---|---|
| **Local (Dev)** | Individual developer testing | `localhost:3000` | Manual |
| **Development (Shared)** | Team integration | `dev.hms.internal` | On push to `develop` branch |
| **Test / CI** | Automated test runs | `test.hms.internal` | On every pull request |
| **Staging** | Pre-production UAT and performance testing | `staging.hms.hospital.com` | On merge to `release/*` branch |
| **Production** | Live hospital system | `hms.hospital.com` | Manual approval after staging |

### 2.2 Environment Parity Rules

- Staging must be identical to production in configuration
- Same Node.js version across all environments
- Same database version
- Same OS and server specs (staging can be smaller, but same config)
- All environment variables documented; secrets managed separately per environment

---

## 3. Infrastructure Requirements

### 3.1 Server Requirements

| Component | Development | Staging | Production |
|---|---|---|---|
| **Web/App Server** | 2 vCPU / 4GB RAM | 4 vCPU / 8GB RAM | 8 vCPU / 16GB RAM |
| **Database Server** | 2 vCPU / 4GB RAM | 4 vCPU / 8GB RAM | 8 vCPU / 32GB RAM |
| **Storage (Documents)** | 50 GB | 100 GB | 1 TB (expandable) |
| **Storage (Database)** | 20 GB | 50 GB | 500 GB (expandable) |
| **OS** | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

### 3.2 Production Infrastructure Topology

```
Internet
   │
   ▼
[Nginx Load Balancer / Reverse Proxy]
   │
   ├── [App Server 1 (Node.js)] ─────┐
   ├── [App Server 2 (Node.js)] ─────┤── [PostgreSQL Primary]
   │                                  │        │
   └── [Static Files / CDN]           └── [PostgreSQL Replica (Read)]
                                       │
                                       └── [Redis Cache]
                                       │
                                       └── [File Storage (NFS / S3)]
```

### 3.3 Network Requirements

| Component | Requirement |
|---|---|
| HTTPS | SSL/TLS certificate (Let's Encrypt or purchased) |
| Firewall | Only ports 80, 443 open externally |
| Database port | Not exposed externally (internal network only) |
| SSH | Key-based; port changed from 22 (security) |
| Intra-service | App server → Database over internal network |

---

## 4. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Runtime** | Node.js | 20 LTS |
| **Backend Framework** | Express.js (or NestJS) | Latest stable |
| **Frontend Framework** | React | 18 |
| **Database** | PostgreSQL | 15 |
| **Cache** | Redis | 7 |
| **File Storage** | Local NFS or AWS S3 | — |
| **Process Manager** | PM2 | Latest |
| **Web Server/Proxy** | Nginx | 1.24+ |
| **Container (optional)** | Docker + Docker Compose | Latest |
| **CI/CD** | GitHub Actions | — |
| **Monitoring** | PM2 Monitoring or Prometheus + Grafana | — |
| **Log Management** | Winston + daily file rotation | — |

---

## 5. CI/CD Pipeline

### 5.1 GitHub Actions Pipeline

```yaml
Pipeline Stages:
  1. Code Checkout
  2. Install Dependencies (npm ci)
  3. Lint (ESLint)
  4. Unit Tests (Jest)
  5. Integration Tests (Jest + Supertest)
  6. Build (if applicable)
  7. Security Scan (npm audit)
  8. [On PR merge to release]: Deploy to Staging
  9. [On manual approval]: Deploy to Production
```

### 5.2 Pipeline Rules

| Rule | Implementation |
|---|---|
| No deployment if tests fail | Pipeline blocked |
| No deployment if npm audit finds critical vuln | Pipeline blocked |
| No direct push to `main` | Branch protection enabled |
| PR requires 1 approval before merge | Branch protection enabled |
| Staging deployment automatic | On `release/*` branch merge |
| Production deployment manual | Requires explicit approval in GitHub Actions |

### 5.3 Deployment Script

```bash
#!/bin/bash
# deploy.sh

echo "Starting deployment..."

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production

# Run database migrations
npm run migrate:latest

# Restart application (zero-downtime with PM2)
pm2 reload ecosystem.config.js --env production

echo "Deployment complete."
pm2 status
```

### 5.4 PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'hms-insurance',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }]
};
```

---

## 6. Database Migration Strategy

### 6.1 Migration Principles

- All schema changes via versioned migration files
- Migrations are sequential and numbered
- Every migration has an `up` (apply) and `down` (rollback) method
- Migrations run automatically on deployment before application restart
- No manual schema changes in production — ever

### 6.2 Migration Tool

**Knex.js migrations** (or existing ORM's migration tool)

```
migrations/
  20250101_001_create_insurance_companies.js
  20250101_002_create_tpa_master.js
  20250101_003_create_insurance_products.js
  20250101_004_create_patient_insurance.js
  20250101_005_create_preauth_requests.js
  20250101_006_create_claims.js
  20250101_007_create_claim_documents.js
  20250101_008_create_settlements.js
  20250101_009_create_audit_logs.js
```

### 6.3 Migration Safety Rules

| Rule | Description |
|---|---|
| Non-destructive first | New columns added as nullable first; made required after data migration |
| No DROP in production | DROP TABLE / DROP COLUMN requires manual DBA review |
| Backup before migration | Automated backup before each production migration run |
| Test in staging first | Every migration run in staging before production |
| Rollback tested | `down` migration tested in staging |

---

## 7. Deployment Procedure

### 7.1 Pre-Deployment Checklist

- [ ] All tests passing in CI
- [ ] Security scan clean
- [ ] Migration scripts reviewed
- [ ] Database backup completed
- [ ] Staging deployment verified
- [ ] UAT sign-off received
- [ ] Rollback plan reviewed
- [ ] On-call staff informed
- [ ] Deployment time: Off-peak hours (11 PM – 4 AM)
- [ ] Announcement sent to hospital staff

### 7.2 Deployment Steps (Production)

```
Step 1: Take database backup
  └── pg_dump hms_production > backup_$(date +%Y%m%d_%H%M).sql

Step 2: Enable maintenance mode (if applicable)
  └── nginx: serve maintenance.html on frontend routes

Step 3: Pull latest code to production server
  └── git pull origin main

Step 4: Install dependencies
  └── npm ci --production

Step 5: Run database migrations
  └── npm run migrate:latest
  └── VERIFY: Migration completed without errors

Step 6: Restart application (rolling restart via PM2)
  └── pm2 reload ecosystem.config.js --env production

Step 7: Smoke tests
  └── Verify: Login works
  └── Verify: Insurance dashboard loads
  └── Verify: Create test pre-auth (then delete)
  └── Verify: Reports generate

Step 8: Disable maintenance mode

Step 9: Monitor for 30 minutes
  └── Watch error logs
  └── Check PM2 status
  └── Monitor database connections
```

### 7.3 Deployment Duration Estimate

| Activity | Duration |
|---|---|
| Backup | 5–10 minutes |
| Deployment | 5–10 minutes |
| Migration | 2–5 minutes |
| Smoke tests | 10 minutes |
| Monitoring | 30 minutes |
| **Total** | **~55–65 minutes** |

---

## 8. Rollback Plan

### 8.1 When to Rollback

| Trigger | Action |
|---|---|
| Smoke tests fail after deployment | Immediate rollback |
| Application not starting | Immediate rollback |
| Database migration fails | Rollback migration; redeploy previous version |
| Critical bug discovered in production | Hotfix or rollback within 2 hours |
| Performance degradation > 50% | Rollback while investigating |

### 8.2 Rollback Procedure

```
Step 1: Revert application code
  └── git revert HEAD (or git checkout previous_tag)
  └── pm2 reload ecosystem.config.js --env production

Step 2: Rollback database migration (if needed)
  └── npm run migrate:rollback
  └── Verify data integrity

Step 3: Restore database from backup (last resort)
  └── Only if data corruption detected
  └── Restore from pre-deployment backup
  └── WARNING: Will lose transactions since deployment

Step 4: Notify stakeholders
  └── Hospital IT, Department heads
  └── Document what went wrong

Step 5: Post-mortem within 24 hours
```

---

## 9. Configuration Management

### 9.1 Environment Variables

All secrets and configuration in `.env` file. Never committed to git.

```bash
# Server
NODE_ENV=production
PORT=3001
APP_URL=https://hms.hospital.com

# Database
DB_HOST=db.internal
DB_PORT=5432
DB_NAME=hms_production
DB_USER=hms_app_user
DB_PASSWORD=*** (secret)

# Redis
REDIS_URL=redis://redis.internal:6379

# JWT
JWT_SECRET=*** (secret, min 64 chars)
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=8h

# Encryption
ENCRYPTION_KEY=*** (secret, 32 bytes)

# File Storage
STORAGE_TYPE=local  # or s3
STORAGE_PATH=/var/hms/documents
# If S3:
AWS_BUCKET=hms-documents
AWS_REGION=ap-south-1
AWS_ACCESS_KEY=***
AWS_SECRET_KEY=***

# Email (Notifications)
SMTP_HOST=smtp.hospital.com
SMTP_PORT=587
SMTP_USER=noreply@hospital.com
SMTP_PASSWORD=***

# SMS (Notifications)
SMS_PROVIDER=twilio  # or msg91
SMS_API_KEY=***
SMS_SENDER_ID=HOSPIT

# TPA Integration
TPA_WEBHOOK_SECRET=***

# Monitoring
SENTRY_DSN=*** (optional)
```

### 9.2 Secrets Management

| Environment | Secrets Storage |
|---|---|
| Development | `.env.local` (gitignored) |
| Staging | `.env.staging` on staging server |
| Production | Managed service (HashiCorp Vault / AWS Secrets Manager) recommended |

---

## 10. Monitoring & Observability

### 10.1 Application Monitoring

| What to Monitor | Tool | Alert Threshold |
|---|---|---|
| Application uptime | PM2 + UptimeRobot | Downtime > 1 min |
| API response time | PM2 Metrics / Custom middleware | P95 > 2 seconds |
| Error rate | Winston logs + alerting | Error rate > 1% per 5 min |
| Memory usage | PM2 | > 80% of available |
| CPU usage | PM2 | > 80% sustained 5 min |
| Active connections | PM2 | > 1000 concurrent |

### 10.2 Database Monitoring

| Metric | Alert |
|---|---|
| Query execution time | Queries > 1 second |
| Connection pool | > 80% pool used |
| Disk usage | > 80% full |
| Replication lag | > 10 seconds |
| Locks | Long-running locks > 30 seconds |

### 10.3 Log Management

```
Logs stored in:
  /var/log/hms/
    app.log           — Application logs
    error.log         — Error logs only
    access.log        — HTTP access logs (nginx)
    audit.log         — Audit trail (insurance actions)
    migration.log     — Database migration logs

Rotation: Daily
Retention: 90 days on server; archived to cold storage for 2 years
```

### 10.4 Health Check Endpoint

```
GET /api/v1/health
Response: {
  status: "healthy",
  timestamp: "2025-01-01T00:00:00Z",
  database: "connected",
  redis: "connected",
  uptime: 86400
}
```

---

## 11. Backup & Disaster Recovery

### 11.1 Backup Schedule

| Backup Type | Frequency | Retention | Storage |
|---|---|---|---|
| Full database backup | Daily at 2 AM | 30 days | Off-site storage |
| Incremental backup | Every 6 hours | 7 days | Same server + off-site |
| Document files backup | Daily | 30 days | Off-site storage |
| Configuration backup | On every change | 10 versions | Version control |
| Pre-deployment backup | Before every deployment | 5 versions | Same server |

### 11.2 Recovery Time Objectives

| Scenario | RTO (Recovery Time) | RPO (Data Loss Tolerance) |
|---|---|---|
| Application crash | < 5 minutes (PM2 auto-restart) | 0 (no data loss) |
| Server failure | < 30 minutes | < 6 hours (incremental backup) |
| Database corruption | < 2 hours | < 24 hours (daily backup) |
| Complete disaster | < 8 hours | < 24 hours |

### 11.3 Disaster Recovery Procedure

1. Provision new server (or use standby)
2. Restore application from git
3. Restore database from backup
4. Restore document files from backup
5. Update DNS to point to new server
6. Run smoke tests
7. Notify staff

---

## 12. Production Launch Checklist

### Pre-Launch (T-7 days)

- [ ] All Phase 1–5 features complete and tested
- [ ] Staging deployment successful
- [ ] UAT completed and signed off
- [ ] Performance tests passed
- [ ] Security scan completed
- [ ] Backup procedures tested (restore drill done)
- [ ] SSL certificate installed and valid for 1 year+
- [ ] All environment variables configured
- [ ] Staff training completed
- [ ] User accounts created for all insurance staff
- [ ] Roles assigned correctly

### Pre-Launch (T-1 day)

- [ ] Database backup taken
- [ ] Deployment procedure reviewed with team
- [ ] Rollback procedure reviewed
- [ ] On-call contact list prepared
- [ ] Maintenance window communicated to staff
- [ ] Final code review done

### Launch Day

- [ ] Deploy during maintenance window
- [ ] Migrations run successfully
- [ ] Smoke tests pass
- [ ] First real transaction test done by department head
- [ ] Monitoring confirmed active
- [ ] First 2 hours: dedicated support available

### Post-Launch (T+24 hours)

- [ ] Review error logs from first 24 hours
- [ ] Performance metrics reviewed
- [ ] Any issues addressed
- [ ] Staff feedback collected
- [ ] Post-launch status report issued

---

## 13. Post-Launch Support Plan

### 13.1 Hypercare Period (First 2 weeks)

- Dedicated support: Insurance module developer available during business hours
- Response time: P1 issues — within 1 hour; P2 issues — within 4 hours
- Daily log review
- Daily status call with department head

### 13.2 Ongoing Support

| Support Type | Response Time |
|---|---|
| Critical (P1) bug | Same day |
| High (P2) bug | Next business day |
| Medium (P3) enhancement | Next sprint |
| Low (P4) cosmetic | Backlog |

---

## 14. Tasks for Gemini

---

### TASK DEP-001: CI/CD Pipeline Setup

**Objective:** Set up GitHub Actions CI/CD pipeline for the Insurance Module.

**Files Likely Created:**
- `.github/workflows/ci.yml` — test and lint on PR
- `.github/workflows/deploy-staging.yml` — deploy to staging on merge
- `.github/workflows/deploy-production.yml` — manual deploy to production

**Acceptance Criteria:**
- Tests run automatically on every PR
- Failed tests block merge
- Staging deploy works on release branch merge
- Production deploy requires manual approval

**Priority:** High  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK DEP-002: Database Migration Framework

**Objective:** Set up database migration framework with all Insurance Module migrations.

**Files Likely Created:**
- `migrations/` — all migration files
- `npm run migrate:latest` — runs pending migrations
- `npm run migrate:rollback` — rolls back last migration
- `npm run migrate:status` — shows migration status

**Acceptance Criteria:**
- All Insurance Module tables created via migrations
- Each migration has up and down methods
- Migrations idempotent (run twice = no error)
- Migration history tracked in `knex_migrations` table

**Priority:** Critical  
**Estimated Effort:** 2 days  
**Risk Level:** Low

---

### TASK DEP-003: PM2 Production Configuration

**Objective:** Configure PM2 for production process management.

**Files Likely Created:**
- `ecosystem.config.js`
- `deploy.sh`

**Acceptance Criteria:**
- Application starts automatically on server reboot
- Cluster mode with all available CPUs
- Auto-restart on crash with exponential backoff
- Memory limit enforced (restart at 1GB)
- Log rotation configured

**Priority:** High  
**Estimated Effort:** 1 day  
**Risk Level:** Low

---

### TASK DEP-004: Health Check & Monitoring Endpoints

**Objective:** Implement health check API and application metrics logging.

**Files Likely Created:**
- `api/health.routes.js`
- `middleware/request_logger.middleware.js` — logs each request with duration
- `utils/logger.js` — Winston logger configuration

**Acceptance Criteria:**
- `GET /api/v1/health` returns correct status
- All requests logged with method, path, status, duration
- Errors logged with stack trace
- Log files rotate daily

**Priority:** High  
**Estimated Effort:** 1 day  
**Risk Level:** Low

---

### TASK DEP-005: Environment Configuration & Secrets Setup

**Objective:** Set up environment variable management and document all required secrets.

**Files Likely Created:**
- `.env.example` — template with all variables (no real secrets)
- `config/app.config.js` — reads and validates env vars
- `docs/environment_setup.md` — setup guide

**Acceptance Criteria:**
- Application fails to start with informative error if required env var missing
- `.env.example` documents every variable with description
- No secrets in git history

**Priority:** Critical  
**Estimated Effort:** 1 day  
**Risk Level:** Low

---

**Executive Summary:** A structured deployment plan ensures the Insurance Module moves from development to production reliably, with minimal downtime, clear rollback procedures, and operational monitoring from day one. Deployment quality is as important as code quality.

---
