# 🛡️ GitHub Multi-Account & Team Backend Development Guide — PART 2
# Sections 8–11: Backend Strategy, Commit Standards, Disaster Recovery, VS Code Setup

---

## SECTION 8: Backend-as-a-Service Strategy for Other Modules

Since Siddhant is the sole backend developer for 7 frontend modules, this section defines how to build and deliver APIs without becoming a bottleneck.

### 8A. The API Contract Document

**What is it?** A written agreement between the backend developer (Siddhant) and each frontend developer describing exactly what each API endpoint accepts and returns. This MUST exist before the frontend member starts coding their API calls.

**Why it must exist:** Without this, frontend members will guess what the API looks like, write fetch/axios calls that don't match the real API, and waste hours debugging integration issues during the final sprint.

**Where to store it:** Create a `/docs/api-contracts/` folder in the HMS repo root.

**Template — copy this for each module:**

```markdown
# API Contract: Reception Module
**Backend Owner:** Siddhant Shinde
**Frontend Owner:** Namrata
**Status:** 🟡 Draft | 🟢 Ready | 🔵 Stable
**Last Updated:** 12 May 2026

---

## Endpoint 1: POST /api/patients/register

**Purpose:** Register a new patient at reception desk

**Authentication:** Required (JWT Bearer Token)

**Allowed Roles:** receptionist, admin

**Request Body:**
```json
{
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "dateOfBirth": "1985-03-15",
  "gender": "male",
  "phone": "9876543210",
  "email": "rajesh@example.com",
  "address": {
    "street": "123 MG Road",
    "city": "Pune",
    "state": "Maharashtra",
    "pincode": "411001"
  },
  "emergencyContact": {
    "name": "Priya Kumar",
    "phone": "9876543211",
    "relation": "spouse"
  },
  "idProof": {
    "type": "aadhaar",
    "number": "1234-5678-9012"
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Patient registered successfully",
  "data": {
    "patientId": "PAT-2026-00001",
    "uhid": "UHID-0001",
    "firstName": "Rajesh",
    "lastName": "Kumar",
    "registeredAt": "2026-05-12T08:30:00Z"
  }
}
```

**Error Responses:**
| Status Code | Scenario | Response |
|---|---|---|
| 400 | Missing required field | `{"success": false, "error": "firstName is required"}` |
| 409 | Duplicate phone number | `{"success": false, "error": "Patient with this phone already exists"}` |
| 401 | No/invalid JWT token | `{"success": false, "error": "Authentication required"}` |
| 403 | Insufficient role | `{"success": false, "error": "Access denied. Required role: receptionist"}` |

**Ready By:** 20 May 2026

**Frontend Member Notes:** Use this endpoint on the Patient Registration Form. UHID is auto-generated — do not send it in the request.

---

## Endpoint 2: GET /api/patients/:id

**Purpose:** Fetch a single patient's details by their patient ID or UHID

[...continue for each endpoint...]
```

### 8B. Mock API Strategy — Frontend Works Before Backend is Ready

**Problem:** Siddhant can't build all 7 modules' backends on Day 1. Frontend members need to start coding their UI immediately.

**Solution: `json-server` mock API**

**Step 1: Set up json-server in the project**

```bash
# In the HMS project root
npm install json-server --save-dev
```

**Step 2: Create mock data file — `/mock/db.json`**

```json
{
  "patients": [
    {
      "id": "PAT-2026-00001",
      "uhid": "UHID-0001",
      "firstName": "Rajesh",
      "lastName": "Kumar",
      "dateOfBirth": "1985-03-15",
      "gender": "male",
      "phone": "9876543210",
      "insuranceStatus": "insured",
      "insuranceProvider": "Star Health"
    },
    {
      "id": "PAT-2026-00002",
      "uhid": "UHID-0002",
      "firstName": "Priya",
      "lastName": "Sharma",
      "dateOfBirth": "1990-07-22",
      "gender": "female",
      "phone": "9876543211",
      "insuranceStatus": "government_scheme",
      "insuranceProvider": "PM-JAY"
    }
  ],
  "appointments": [],
  "labOrders": [],
  "prescriptions": []
}
```

**Step 3: Add mock server script to `package.json`:**

```json
{
  "scripts": {
    "mock-api": "json-server --watch mock/db.json --port 3001"
  }
}
```

**Step 4: Frontend members use environment-based API URL:**

Create `/frontend/.env.development`:
```
REACT_APP_API_URL=http://localhost:3001
```

Create `/frontend/.env.production`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**In React components — use the environment variable:**

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Usage in components:
import api from '../services/api';

const registerPatient = async (patientData) => {
  const response = await api.post('/patients', patientData);
  return response.data;
};
```

**When real API is ready:** Change `.env.development` to point to the real backend (`http://localhost:5000/api`). No code changes needed in components.

### 8C. Backend Development Priority Order

Build backends in this order — each layer depends on the one above it:

```
PRIORITY ORDER FOR BACKEND DEVELOPMENT
=======================================

LAYER 1 — FOUNDATION (Month 1-2)
┌─────────────────────────────────────────────────────┐
│  1. Auth Module (JWT login/register/role middleware) │  ← Everything depends on this
│  2. Patient/Reception Module (Patient CRUD + UHID)  │  ← Second foundation
│  3. Admin Module (Master data, user management)     │  ← Manages roles, hospital config
└─────────────────────────────────────────────────────┘

LAYER 2 — CLINICAL CORE (Month 2-3)
┌─────────────────────────────────────────────────────┐
│  4. Doctor Module (Appointments, diagnosis, notes)  │  ← Needs Patient
│  5. Nurse Module (Vitals, ward assignments)         │  ← Needs Patient + Doctor
│  6. Lab Module (Test orders, results)               │  ← Needs Patient + Doctor
│  7. Pharmacy Module (Prescriptions, dispensing)     │  ← Needs Patient + Doctor
└─────────────────────────────────────────────────────┘

LAYER 3 — FINANCIAL + INSURANCE (Month 3-4)
┌─────────────────────────────────────────────────────┐
│  8. Billing Module (Invoice, charges, payments)     │  ← Needs all clinical modules
│  9. Insurance Module (Siddhant's own module)        │  ← Needs Patient + Billing
└─────────────────────────────────────────────────────┘
```

**Communication script for each API delivery:**

When an API is ready, Siddhant posts on the team's communication channel (WhatsApp/Slack/GitHub Issues):

```
📦 API READY NOTIFICATION
Module: Reception
Endpoint: POST /api/patients/register
Branch: develop (merged via PR #12)
Contract: /docs/api-contracts/reception.md
Status: ✅ Tested with Postman
Action Required: @Namrata — Pull develop into your branch and integrate.
Questions? Tag me in a GitHub Issue.
```

### 8D. GitHub Issues as Backend Delivery Tracker

Create these Issue templates for the team:

**Issue Template 1: API Ready Notification**

```markdown
Title: [API READY] POST /api/patients/register — available in develop

**Module:** Reception
**Endpoint:** POST /api/patients/register
**Merged in PR:** #12
**API Contract:** /docs/api-contracts/reception.md
**Tested:** ✅ Postman collection attached

**For:** @Namrata
**Action:** Pull `develop` into your branch and integrate this endpoint.

**Sample Request:**
[Include curl command or Postman screenshot]
```

**Issue Template 2: Blocked/Dependency**

```markdown
Title: [BLOCKED] Lab module API waiting for Patient schema finalization

**Blocked Module:** Lab
**Blocking Module:** Reception
**Reason:** Lab test orders need `patientId` from Patient model, which is not yet finalized.
**Needed By:** 25 May 2026
**Action Required:** @Namrata — Please confirm Patient schema fields by 20 May.
**Workaround:** Using mock Patient IDs for now.
```

**Issue Template 3: Needs Testing**

```markdown
Title: [NEEDS TESTING] Insurance-Billing deduction endpoint

**Endpoint:** POST /api/billing/apply-insurance-deduction
**Module:** Insurance ↔ Billing integration
**For:** @Prajwal
**Action:** Please test this endpoint with your Billing UI and confirm:
1. Deduction amount is correct
2. Response format matches your frontend expectations
3. Edge case: What happens when insurance covers 100% of the bill?

**API Contract:** /docs/api-contracts/insurance-billing.md
**Branch:** develop (merged via PR #18)
```

---

## SECTION 9: Commit Message Standards for This Project

### Convention Format

```
[MODULE]: Brief description of change (imperative mood)
```

### Examples for Every Scenario Siddhant Will Face

```bash
# ─── Working on his own Insurance module ───
git commit -m "[INSURANCE]: Add pre-authorization request form backend"
git commit -m "[INSURANCE]: Create InsurancePolicy Mongoose model"
git commit -m "[INSURANCE]: Add claim status tracking dashboard UI"
git commit -m "[INSURANCE]: Implement document upload with multer"
git commit -m "[INSURANCE]: Add govt scheme beneficiary verification flow"

# ─── Building backend for another member's module ───
git commit -m "[RECEPTION-BE]: Add POST /api/patients/register endpoint"
git commit -m "[LAB-BE]: Add GET /api/lab/orders/:patientId endpoint"
git commit -m "[PHARMACY-BE]: Add prescription dispensing API"
git commit -m "[DOCTOR-BE]: Add appointment booking CRUD endpoints"
git commit -m "[NURSE-BE]: Add patient vitals recording API"
git commit -m "[BILLING-BE]: Add invoice generation endpoint"

# ─── Fixing bugs reported by team members ───
git commit -m "[BUGFIX][LAB]: Fix UHID lookup returning null for new patients"
git commit -m "[BUGFIX][INSURANCE]: Fix pre-auth status not updating after TPA response"
git commit -m "[BUGFIX][RECEPTION]: Fix duplicate patient creation on rapid form submit"

# ─── Updating shared database schemas ───
git commit -m "[SCHEMA]: Add insurance_deduction field to Billing model"
git commit -m "[SCHEMA]: Create GovernmentScheme master collection"
git commit -m "[SCHEMA]: Add labOrders reference to Patient model"

# ─── Syncing with develop ───
git commit -m "[SYNC]: Merge develop into feature/insurance-module"

# ─── Documentation ───
git commit -m "[DOCS]: Add API contract for Pharmacy module endpoints"
git commit -m "[DOCS]: Update README with backend setup instructions"

# ─── DevOps/Config ───
git commit -m "[CONFIG]: Add .env.example with required environment variables"
git commit -m "[CONFIG]: Update CORS settings to allow frontend port 3000"

# ─── Work in progress (use sparingly) ───
git commit -m "[WIP][INSURANCE]: Pre-auth form — saving progress before context switch"
```

### Rules for Commit Messages

| Rule | Example | Why |
|---|---|---|
| Use imperative mood | "Add endpoint" not "Added endpoint" | Git convention — reads like a command |
| Start with module tag | `[INSURANCE]:` | Easy to filter commits by module in git log |
| Keep under 72 characters | Short and clear | GitHub truncates long messages |
| Don't end with period | `Add patient API` not `Add patient API.` | Convention |
| Be specific | `Add POST /api/patients` not `Update backend` | Team can understand changes from log |

**Filter commits by module:**

```bash
# See only Insurance module commits
git log --oneline --grep="INSURANCE"

# See only backend work for Lab module
git log --oneline --grep="LAB-BE"

# See all bugfixes
git log --oneline --grep="BUGFIX"
```

---

## SECTION 10: Handling the Most Common Disaster Scenarios

### Scenario 1: Accidentally Pushed to `main` Instead of Feature Branch

**What happened:** You ran `git push origin main` while on your feature branch, or you switched to `main` and pushed.

**Diagnose:**
```bash
git log --oneline -5 origin/main
# Check if your latest commits appear on main
```

**Recover:**

```bash
# Step 1: Switch to main
git checkout main

# Step 2: Reset main to the commit BEFORE your accidental push
git log --oneline -10
# Find the commit hash just BEFORE your commits
git reset --hard <commit-hash-before-your-commits>

# Step 3: Force push to fix remote main
# ⚠️ WARNING: Only do this if you are the ONLY one who pushed. Inform Manisha first!
git push origin main --force-with-lease

# Step 4: Switch back to your branch
git checkout feature/insurance-module

# Step 5: Verify your commits are still on your branch
git log --oneline -5
```

**Prevent next time:**
- Use the pre-push hook (Section 3E)
- Set up branch protection on `main` in GitHub Settings
- Ask Manisha to enable: Settings → Branches → Add rule → `main` → Require PR before merge

### Scenario 2: Committed with the Wrong GitHub Identity

**What happened:** Your commits show Project 2's email instead of HMS email.

**Diagnose:**
```bash
git log --format="%H %ae %s" -5
# Shows: commit-hash email@used.com commit message
# If the email is wrong, you need to fix it
```

**Recover (fix last commit only):**

```bash
git commit --amend --author="Siddhant Sangram Shinde <correct-hms-email@example.com>" --no-edit
git push origin feature/insurance-module --force-with-lease
```

**Recover (fix multiple commits — use interactive rebase):**

```bash
# Fix last N commits (e.g., last 3)
git rebase -i HEAD~3

# In the editor, change 'pick' to 'edit' for each commit you want to fix
# Save and close the editor

# For each commit that pauses:
git commit --amend --author="Siddhant Sangram Shinde <correct-hms-email@example.com>" --no-edit
git rebase --continue

# After all commits are fixed:
git push origin feature/insurance-module --force-with-lease
```

**Prevent next time:**
- Always run `git config user.email` before first commit of the day
- Set local config per repo (Section 3B)

### Scenario 3: Pushed HMS Code to Project 2's Repository

**What happened:** You ran `git push` while in the wrong folder, and HMS code went to Project 2's repo.

**Diagnose:**
```bash
# Check Project 2's remote log
cd C:\Dev\Project2\[project-2-repo]
git log --oneline -10 origin/main
# Look for HMS-related commit messages
```

**Recover:**

```bash
# Step 1: Find the last good commit on Project 2
git log --oneline -20 origin/main
# Identify the commit hash BEFORE the HMS code was pushed

# Step 2: Reset remote to that commit
git checkout main
git reset --hard <last-good-commit-hash>
git push origin main --force-with-lease

# Step 3: Verify HMS repo is unaffected
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
git log --oneline -5
# Your commits should still be here
```

**Prevent next time:**
- Switch to SSH with aliases (Section 4) — makes this impossible
- Use the pre-push hook (Section 3E)
- ALWAYS run `gitcheck` before pushing

### Scenario 4: Massive Merge Conflict When Pulling from Develop

**What happened:** You ran `git pull origin develop` and got a wall of conflict markers.

**Stay calm. Follow this:**

```bash
# Step 1: See which files have conflicts
git status
# Files marked "both modified" have conflicts

# Step 2: Open each conflicted file in VS Code
# Look for these markers:
# <<<<<<< HEAD
# [your code]
# =======
# [code from develop]
# >>>>>>> origin/develop

# Step 3: For each conflict, decide:
#   - Keep YOUR version (if your code is correct)
#   - Keep THEIR version (if develop has a better/newer version)
#   - Combine both (if both changes are needed)

# Step 4: Remove ALL conflict markers (<<<, ===, >>>)

# Step 5: Mark each file as resolved
git add <resolved-file-1>
git add <resolved-file-2>

# Step 6: Complete the merge
git commit -m "[SYNC]: Resolve merge conflicts from develop"

# Step 7: Push
git push origin feature/insurance-module
```

**If it's too overwhelming — ABORT and ask for help:**

```bash
git merge --abort
# This restores your branch to the state before the merge attempt
# Then message Manisha or a teammate for help
```

**Prevent next time:**
- Pull from develop DAILY — small, frequent merges are easier than one massive merge
- Communicate with the team about which files you're modifying

### Scenario 5: Team Member's Frontend Breaks After Backend Change

**What happened:** Siddhant merged a backend API change to develop, and Namrata's frontend started crashing.

**Diagnose:**

```bash
# Check what changed in the last merge
git log --oneline -5 origin/develop
# Identify Siddhant's PR merge commit

git diff <commit-before-merge>..<merge-commit> -- backend/
# Shows exactly what changed in the backend
```

**Recover:**

```bash
# Option A: Quick fix — update the API to be backward compatible
# Add the old response field back alongside the new one

# Option B: Revert the merge (if the change was fundamentally wrong)
git revert <merge-commit-hash>
git push origin develop
# Notify: "@team — Reverted my last backend change. Will fix and re-submit."
```

**Prevent next time:**
- ALWAYS update the API contract BEFORE changing the API
- Notify the frontend member BEFORE the PR is merged
- Use API versioning for breaking changes (`/api/v1/` vs `/api/v2/`)

### Scenario 6: Accidentally Deleted Local Feature Branch

**What happened:** You ran `git branch -D feature/insurance-module` by mistake.

**Recover (if branch exists on remote):**

```bash
# Fetch remote branches
git fetch origin

# Recreate local branch from remote
git checkout -b feature/insurance-module origin/feature/insurance-module

# Verify
git log --oneline -5
# Your commits should all be there ✅
```

**Recover (if branch was only local — never pushed):**

```bash
# Git keeps deleted branches in reflog for ~30 days
git reflog
# Find the commit hash of your last commit on the deleted branch
# Look for entries like: "checkout: moving from feature/insurance-module to develop"

# Recreate the branch at that commit
git checkout -b feature/insurance-module <commit-hash-from-reflog>
```

**Prevent next time:**
- Push your branch to remote regularly (`git push origin feature/insurance-module`)
- Use `git branch -d` (lowercase d) instead of `-D` — it refuses to delete unmerged branches

### Scenario 7: Two Team Members Modified the Same File

**What happened:** Both Siddhant and Prajwal edited `models/Patient.js` — Siddhant added insurance fields, Prajwal added billing fields.

**Diagnose:**

```bash
git pull origin develop
# Auto-merging models/Patient.js
# CONFLICT (content): Merge conflict in models/Patient.js
```

**Recover:**

```bash
# Open models/Patient.js in VS Code
# You'll see something like:

# <<<<<<< HEAD
# insuranceStatus: { type: String, enum: ['insured', 'uninsured'] },
# insuranceProvider: { type: String },
# =======
# billingStatus: { type: String, enum: ['pending', 'paid'] },
# outstandingAmount: { type: Number, default: 0 },
# >>>>>>> origin/develop

# SOLUTION: Keep BOTH sections (both are valid additions)
# Remove the conflict markers and combine:

# insuranceStatus: { type: String, enum: ['insured', 'uninsured'] },
# insuranceProvider: { type: String },
# billingStatus: { type: String, enum: ['pending', 'paid'] },
# outstandingAmount: { type: Number, default: 0 },

git add models/Patient.js
git commit -m "[SYNC]: Resolve Patient model conflict — keep both insurance and billing fields"
```

**Prevent next time:**
- Communicate with Prajwal about shared files BEFORE modifying them
- Create a GitHub Issue: "Shared File Modification: Patient.js — Insurance fields"
- Consider splitting large schema files into separate files that import into a main model

---

## SECTION 11: VS Code Setup for Safe Multi-Project Work

### 11A. Workspace-Based Project Separation

**Create a workspace file for HMS project:**

Create file: `C:\Dev\HMS-Team-Project\hms.code-workspace`

```json
{
  "folders": [
    {
      "path": "Hospital-Management-System-Internship-Group-Project",
      "name": "HMS Team Project"
    }
  ],
  "settings": {
    "window.title": "🏥 HMS TEAM PROJECT — ${activeEditorShort}",
    "workbench.colorTheme": "Default Dark+",
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": "#1a5e1a",
      "titleBar.activeForeground": "#ffffff",
      "statusBar.background": "#1a5e1a",
      "statusBar.foreground": "#ffffff"
    },
    "terminal.integrated.cwd": "${workspaceFolder}"
  }
}
```

**Create a workspace file for Project 2:**

Create file: `C:\Dev\Project2\project2.code-workspace`

```json
{
  "folders": [
    {
      "path": "[project-2-repo-name]",
      "name": "Project 2"
    }
  ],
  "settings": {
    "window.title": "🔵 PROJECT 2 — ${activeEditorShort}",
    "workbench.colorTheme": "Default Dark+",
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": "#1a3d5e",
      "titleBar.activeForeground": "#ffffff",
      "statusBar.background": "#1a3d5e",
      "statusBar.foreground": "#ffffff"
    },
    "terminal.integrated.cwd": "${workspaceFolder}"
  }
}
```

**How to use:**
- Double-click `hms.code-workspace` to open HMS project — title bar turns **GREEN**
- Double-click `project2.code-workspace` to open Project 2 — title bar turns **BLUE**
- You can instantly see which project you're in by the title bar color

### 11B. VS Code Extensions for Git Safety

| Extension | Purpose | How It Helps |
|---|---|---|
| **GitLens** | Rich Git integration | Shows who committed each line, branch visualization, commit details. Before pushing, hover over the status bar to see current branch and remote. |
| **Git Graph** | Visual branch management | See all branches, their relationships, and where your branch is relative to develop. Helps avoid pushing to wrong branch. |
| **DotENV** | `.env` file syntax highlighting | Highlights environment variables. Prevents accidentally committing `.env` files with secrets. |
| **Error Lens** | Inline error display | Shows errors inline so you catch issues before committing broken code. |
| **Thunder Client** | API testing (Postman alternative) | Test your backend APIs directly from VS Code without switching to a browser. |

**Install via command palette (Ctrl+Shift+P):**
```
ext install eamodio.gitlens
ext install mhutchie.git-graph
ext install mikestead.dotenv
ext install usernamehw.errorlens
ext install rangav.vscode-thunder-client
```

### 11C. Terminal Prompt Customization

**For Git Bash — add to `~/.bashrc`:**

```bash
# Custom prompt showing: [repo-name] (branch) user@email $
parse_git_branch() {
  git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
}

parse_git_repo() {
  basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null
}

parse_git_email() {
  git config user.email 2>/dev/null
}

export PS1='\[\033[1;36m\][$(parse_git_repo)]\[\033[0m\] \[\033[1;33m\]($(parse_git_branch))\[\033[0m\] \[\033[0;32m\]$(parse_git_email)\[\033[0m\]\n$ '
```

**Result — your terminal will show:**

```
[Hospital-Management-System-Internship-Group-Project] (feature/insurance-module) siddhant.hms@example.com
$
```

When you switch to Project 2:

```
[project-2-repo-name] (main) siddhant.personal@example.com
$
```

**For PowerShell — add to your `$PROFILE`:**

```powershell
# Find your profile file location:
# echo $PROFILE
# Then edit that file and add:

function prompt {
    $branch = git branch --show-current 2>$null
    $repo = (Split-Path -Leaf (git rev-parse --show-toplevel 2>$null)) 2>$null
    $email = git config user.email 2>$null
    
    if ($branch) {
        Write-Host "[$repo]" -ForegroundColor Cyan -NoNewline
        Write-Host " ($branch)" -ForegroundColor Yellow -NoNewline
        Write-Host " $email" -ForegroundColor Green
    }
    return "PS> "
}
```
