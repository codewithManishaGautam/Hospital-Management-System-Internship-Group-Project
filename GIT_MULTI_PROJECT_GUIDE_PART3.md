# 🛡️ GitHub Multi-Account & Team Backend Development Guide — PART 3
# Sections 12–14: Weekly Health Check, Mental Model, Quick Reference Card

---

## SECTION 12: Weekly GitHub Health Check (Siddhant as Team Lead)

### EVERY FRIDAY — GITHUB TEAM HEALTH AUDIT

```
□ CHECK 1: Has every team member committed at least 3 times this week?
```

**Using GitHub web interface:**
1. Go to: `https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project`
2. Click **"Insights"** tab → **"Contributors"**
3. Check the commit graph for the past week
4. Note anyone with 0 or very low commits

**Using Git CLI:**

```bash
# See commits from the last 7 days grouped by author
git log --since="7 days ago" --format="%an" | sort | uniq -c | sort -rn

# Expected output (example):
#   12 Siddhant Sangram Shinde
#    8 Namrata
#    7 Prajwal
#    5 Manisha Gautam
#    3 Sakshi
#    3 Suhas
#    2 Vaishnavi
#    1 Trupti          ← ⚠️ Low activity — check in with her
#    0 [missing name]  ← 🔴 No commits — needs immediate attention
```

**Action if member has 0 commits:**
- Send a direct message: "Hey [Name], I noticed you haven't pushed any commits this week. Are you blocked on anything? Can I help?"
- Check if they're stuck on a Git issue (help them set up their environment)
- Update the team standup to include a "commits this week" count

```
□ CHECK 2: Are any branches more than 5 commits behind develop?
```

```bash
# Fetch all remote branches
git fetch origin

# Check each member's branch against develop
git rev-list --count origin/develop..origin/feature/reception-module
# If output is > 5, that branch needs to sync with develop

git rev-list --count origin/develop..origin/feature/lab-module
git rev-list --count origin/develop..origin/feature/pharmacy-module
git rev-list --count origin/develop..origin/feature/doctor-module
git rev-list --count origin/develop..origin/feature/billing-module
git rev-list --count origin/develop..origin/feature/nurse-module
git rev-list --count origin/develop..origin/feature/admin-module
git rev-list --count origin/develop..origin/feature/insurance-module
```

**Action if a branch is far behind:**
- Message the member: "Your branch is X commits behind develop. Please run `git pull origin develop` to sync. This prevents painful merge conflicts later."

```
□ CHECK 3: Are there any open PRs older than 3 days without review?
```

**GitHub web:**
1. Go to the repo → **"Pull requests"** tab
2. Filter: Sort by "Oldest"
3. Check any PR that has been open for 3+ days without a review

**GitHub CLI (if installed):**
```bash
gh pr list --repo codewithManishaGautam/Hospital-Management-System-Internship-Group-Project
```

**Action:** Review the PR yourself or assign a reviewer. Stale PRs block progress.

```
□ CHECK 4: Is the develop branch protected? (No direct pushes allowed)
```

**GitHub Settings:**
1. Go to repo → **Settings** → **Branches**
2. Under "Branch protection rules" — check that `develop` has:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (at least 1)
   - ✅ Require status checks to pass (if CI is set up)
3. Also protect `main` with the same rules

**If not protected — set it up:**
1. Click **"Add rule"**
2. Branch name pattern: `develop`
3. Check: "Require a pull request before merging"
4. Check: "Require approvals" → Set minimum to 1
5. Click **"Create"**

> Only Manisha (repo owner) can set branch protection rules. Siddhant should request this if not already done.

```
□ CHECK 5: Are all commit messages following the convention?
```

```bash
# View last 20 commits on develop
git log --oneline -20 origin/develop

# Look for commits that DON'T follow [MODULE]: Description format
# Bad examples:
#   "fixed bug"           ← No module tag, vague description
#   "updated code"        ← No module tag, no specifics
#   "asdfgh"              ← Meaningless

# Good examples:
#   [RECEPTION-BE]: Add POST /api/patients/register endpoint
#   [INSURANCE]: Fix pre-auth form validation
#   [SCHEMA]: Add labOrders reference to Patient model
```

**Action for bad commits:** Don't shame publicly. Send a private message with the convention guide (Section 9) and offer to help.

```
□ CHECK 6: Siddhant's own insurance branch — is it clean and pushed?
```

```bash
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
git checkout feature/insurance-module
git status

# ✅ GOOD: "nothing to commit, working tree clean"
# ⚠️ BAD: "Changes not staged for commit" or "Untracked files"

# If uncommitted work exists:
git add .
git commit -m "[INSURANCE]: End-of-week commit — save all progress"
git push origin feature/insurance-module
```

```
□ CHECK 7: Project 2 repo — any uncommitted work left from this week?
```

```bash
cd C:\Dev\Project2\[project-2-repo-name]
git status

# Same check as above — commit and push everything before the weekend
```

### Weekly Audit Summary Template

Post this in your team group every Friday:

```markdown
## 📊 HMS Weekly GitHub Health Report — Week of [Date]

### Commit Activity
| Member | Commits This Week | Status |
|--------|-------------------|--------|
| Siddhant | 12 | ✅ Active |
| Namrata | 8 | ✅ Active |
| Prajwal | 6 | ✅ Active |
| Manisha | 5 | ✅ Active |
| Sakshi | 3 | ✅ Active |
| Suhas | 2 | ⚠️ Low |
| Vaishnavi | 1 | ⚠️ Low |
| Trupti | 0 | 🔴 Needs attention |

### Branch Health
| Branch | Commits Behind Develop | Action |
|--------|----------------------|--------|
| feature/reception-module | 2 | ✅ OK |
| feature/lab-module | 8 | ⚠️ Needs sync |
| feature/insurance-module | 0 | ✅ Up to date |

### Open PRs
- PR #15: [RECEPTION-BE] Add patient search — Open 2 days ✅
- PR #12: [LAB-BE] Add test orders — Open 5 days ⚠️ Needs review

### API Delivery Status
| Module | Backend Status | Frontend Integration |
|--------|---------------|---------------------|
| Reception | ✅ Delivered | 🔄 In Progress |
| Lab | 🔄 Building | ⏳ Waiting |
| Pharmacy | ⏳ Not Started | ⏳ Waiting |
| Insurance | 🔄 Building | 🔄 Building (Siddhant) |

### Action Items for Next Week
1. @Trupti — Please commit your work. Need help? Reach out.
2. @Suhas — Pull develop into your branch ASAP
3. Lab module API will be ready by Tuesday
```

---

## SECTION 13: The "Two-Project Developer" Mental Model

### Time-Blocking Strategy

```
RECOMMENDED WEEKLY SCHEDULE
============================

Monday    — HMS (full day)     → Focus: Backend APIs for other modules
Tuesday   — HMS (full day)     → Focus: Insurance module features
Wednesday — HMS (morning)      → Focus: Code review + team sync
            Project 2 (afternoon) → Context switch after lunch
Thursday  — HMS (full day)     → Focus: Integration testing + bug fixes
Friday    — HMS (morning)      → Focus: Weekly audit + PR reviews
            Project 2 (afternoon) → Second project work session

Weekend   — Personal choice    → But commit and push before stopping
```

**Why this works:**
- HMS gets 4.5 days per week (it's the priority as a team project)
- Project 2 gets 1.5 days per week (enough for steady progress)
- Context switches are limited to **2 per week** (Wednesday and Friday afternoons)
- Each switch happens at a natural break point (lunch)

### The 5 Non-Negotiable Habits

**Habit 1: Never leave uncommitted work.**
Before walking away from ANY project — even for 5 minutes — commit and push. Use `[WIP]:` prefix for incomplete work.

```bash
git add .
git commit -m "[WIP][INSURANCE]: Pre-auth form — saving before break"
git push origin feature/insurance-module
```

**Habit 2: Close before opening.**
Always close the current project's VS Code window, terminal tabs, and browser tabs BEFORE opening the other project. Never have both projects open simultaneously.

**Habit 3: `gitcheck` is your seatbelt.**
Run it before EVERY push. It takes 2 seconds and saves you from hours of disaster recovery.

```bash
gitcheck
# Takes 2 seconds. Prevents 2 hours of disaster recovery.
```

**Habit 4: Daily sync is non-negotiable.**
Every morning, the FIRST thing you do in HMS is:

```bash
git fetch origin
git pull origin develop
```

This prevents merge conflict mountains from forming.

**Habit 5: Communicate before modifying shared files.**
If you need to change `Patient.js`, `server.js`, `package.json`, or any file that another member might also be editing — post in the team group first: "I'm about to modify Patient.js to add insurance fields. Anyone else working on it?"

### Mental Context Switching Checklist

Before writing code after a project switch, take 60 seconds to answer these questions:

```
CONTEXT SWITCH VERIFICATION (60 seconds)
=========================================
□ What project am I working on right now?        → [HMS / Project 2]
□ What was I working on last time in THIS project? → [Feature/bug/task]
□ What's my goal for this session?                → [Specific deliverable]
□ Am I on the correct branch?                     → [Run: git branch --show-current]
□ Is my terminal showing the correct repo?        → [Check terminal prompt]
□ Did I pull the latest changes?                  → [Run: git pull]
```

### Why You Should Never Have Both Projects Open

| What Could Go Wrong | How It Happens |
|---|---|
| Editing the wrong file | Both projects have similarly named files (e.g., `server.js`, `package.json`) |
| Running the wrong server | `npm start` in the wrong terminal tab |
| Copying code between projects | Accidentally paste HMS code into Project 2 file |
| Git operations in wrong terminal | Running `git push` in a terminal that's `cd`'d into the wrong project |
| Mental confusion | Your brain loses track of which project's patterns and conventions apply |

---

## SECTION 14: Quick Reference Card (Print This Out)

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          SIDDHANT'S DAILY GIT SAFETY REFERENCE CARD v2.0                ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── INSTANT VERIFY COMMANDS ────                                       ║
║  Identity:      git config user.email                                    ║
║  Remote:        git remote -v                                            ║
║  Branch:        git branch --show-current                                ║
║  All-in-one:    gitcheck                                                 ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── HMS TEAM PROJECT ────                                              ║
║  Folder:   C:\Dev\HMS-Team-Project\Hospital-Management-System-...        ║
║  Remote:   github.com/codewithManishaGautam/Hospital-Management-...      ║
║  SSH:      git@github-hms:codewithManishaGautam/Hospital-Manag...        ║
║  Branch:   feature/insurance-module                                      ║
║  Email:    [your-hms-github-email@example.com]                           ║
║  Color:    GREEN title bar in VS Code                                    ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── PROJECT 2 ────                                                     ║
║  Folder:   C:\Dev\Project2\[repo-name]                                   ║
║  Remote:   github.com/[your-username]/[repo-name]                        ║
║  SSH:      git@github-project2:[your-username]/[repo-name]               ║
║  Branch:   [main-branch]                                                 ║
║  Email:    [your-project2-email@example.com]                             ║
║  Color:    BLUE title bar in VS Code                                     ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── DAILY WORKFLOW ────                                                ║
║  Morning:   gitcheck → git pull origin develop → start coding            ║
║  Commit:    git add . → git status (review!) → git commit -m "[TAG]:"    ║
║  Push:      gitcheck → git push origin feature/insurance-module          ║
║  Sync:      git fetch origin → git merge origin/develop                  ║
║  Switch:    Commit → Push → Close VS Code → Open other project           ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── COMMIT MESSAGE FORMAT ────                                         ║
║  Own work:    [INSURANCE]: Add pre-auth form backend                     ║
║  Other BE:    [RECEPTION-BE]: Add POST /api/patients endpoint            ║
║  Bug fix:     [BUGFIX][LAB]: Fix UHID null lookup                        ║
║  Schema:      [SCHEMA]: Add insurance fields to Patient model            ║
║  Sync:        [SYNC]: Merge develop into feature/insurance-module        ║
║  WIP:         [WIP][INSURANCE]: Save progress before switch              ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── BEFORE EVERY PUSH — ASK YOURSELF ────                              ║
║                                                                          ║
║    1. Am I in the correct FOLDER?          → pwd                         ║
║    2. Am I on the correct BRANCH?          → git branch --show-current   ║
║    3. Is remote showing correct REPO?      → git remote -v              ║
║    4. Is my email correct for this repo?   → git config user.email       ║
║    5. Is my commit message tagged?         → [MODULE]: Description       ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── EMERGENCY COMMANDS ────                                            ║
║  Undo last commit (keep files):     git reset --soft HEAD~1              ║
║  Abort a merge:                     git merge --abort                    ║
║  Abort a rebase:                    git rebase --abort                   ║
║  Recover deleted branch:            git reflog → git checkout -b ...     ║
║  Fix wrong email on last commit:    git commit --amend --author="..."    ║
║  Check remote before push:          git remote get-url origin            ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ──── NEVER DO THESE ────                                                ║
║                                                                          ║
║  🔴 NEVER push directly to main                                         ║
║  🔴 NEVER commit to another member's feature branch                     ║
║  🔴 NEVER use git push --force (use --force-with-lease instead)         ║
║  🔴 NEVER have both projects open in VS Code simultaneously             ║
║  🔴 NEVER push without running gitcheck first                           ║
║  🔴 NEVER leave uncommitted work when switching projects                ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## APPENDIX: One-Time Setup Checklist

Run these commands ONCE when setting up your development environment for the first time:

```
□ 1. Create folder structure
```
```powershell
mkdir C:\Dev\HMS-Team-Project
mkdir C:\Dev\Project2
```

```
□ 2. Clone both repositories
```
```bash
cd C:\Dev\HMS-Team-Project
git clone https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git

cd C:\Dev\Project2
git clone https://github.com/[your-username]/[project-2-repo].git
```

```
□ 3. Set local Git identity for HMS
```
```bash
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
git config --local user.name "Siddhant Sangram Shinde"
git config --local user.email "your-hms-email@example.com"
```

```
□ 4. Set local Git identity for Project 2
```
```bash
cd C:\Dev\Project2\[project-2-repo]
git config --local user.name "Siddhant Shinde"
git config --local user.email "your-project2-email@example.com"
```

```
□ 5. Generate SSH keys (Section 4A)
□ 6. Create SSH config file (Section 4B)
□ 7. Add SSH keys to GitHub accounts (Section 4C)
□ 8. Update remote URLs to SSH (Section 4D)
□ 9. Test SSH connections (Section 4E)
□ 10. Install pre-push hook for HMS (Section 3E)
□ 11. Install pre-push hook for Project 2 (Section 3E)
□ 12. Create VS Code workspace files (Section 11A)
□ 13. Install VS Code extensions (Section 11B)
□ 14. Set up terminal prompt (Section 11C)
□ 15. Set up gitcheck alias (Section 3D)
□ 16. Checkout your feature branch in HMS
```
```bash
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
git checkout feature/insurance-module
# If branch doesn't exist yet:
git checkout -b feature/insurance-module
git push -u origin feature/insurance-module
```

```
□ 17. Create /docs/api-contracts/ folder in HMS repo
```
```bash
mkdir -p docs/api-contracts
touch docs/api-contracts/.gitkeep
git add docs/api-contracts/.gitkeep
git commit -m "[DOCS]: Initialize API contracts folder"
git push origin feature/insurance-module
```

```
□ 18. Set up mock API server (Section 8B)
```
```bash
npm install json-server --save-dev
mkdir mock
# Create mock/db.json with sample data
```

```
□ 19. Verify everything is working
```
```bash
gitcheck
# Should show: correct name, email, branch, remote for HMS

ssh -T github-hms
# Should show: Hi [your-username]! You've successfully authenticated...

ssh -T github-project2
# Should show: Hi [your-other-username]! You've successfully authenticated...
```

```
□ 20. Print the Quick Reference Card (Section 14) and pin it to your desk ✅
```

---

**END OF GUIDE**

*This document was generated to make it technically near-impossible for Siddhant Sangram Shinde to push code to the wrong repository or commit under the wrong identity. Follow every section. Trust the process. Build great software.*
