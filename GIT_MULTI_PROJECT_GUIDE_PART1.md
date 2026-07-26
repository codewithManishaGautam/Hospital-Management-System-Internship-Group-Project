# 🛡️ GitHub Multi-Account & Team Backend Development Guide
# For Siddhant Sangram Shinde — HMS Project Lead
# Version 2.0 | 12 May 2026

*Git environment analysis complete. Multi-project safety guide generating now.*

---

## SECTION 1: The Multi-Project Developer's Daily Safety Protocol

Every single morning before writing a single line of code, run this checklist from the terminal inside the project folder you intend to work in.

### MORNING STARTUP CHECKLIST — BEFORE TOUCHING ANY CODE

**For HMS Project — Run inside HMS project folder:**

```
□ Step 1: Verify you are in the correct folder
```

```powershell
# PowerShell (Windows)
pwd

# Expected output:
# C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
```

```bash
# Git Bash / Mac / Linux
pwd

# Expected output:
# /c/Dev/HMS-Team-Project/Hospital-Management-System-Internship-Group-Project
```

```
□ Step 2: Verify your Git identity for THIS repo
```

```bash
git config user.name
# Expected: Siddhant Sangram Shinde

git config user.email
# Expected: [your-hms-github-email@example.com]
```

> ⚠️ WARNING: If the email shown does NOT match your HMS GitHub account email, STOP. Fix it before proceeding (see Section 3B).

```
□ Step 3: Verify the remote URL (WHERE your pushes will go)
```

```bash
git remote -v

# Expected output:
# origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (fetch)
# origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (push)
```

> 🔴 DANGER: If you see a DIFFERENT repository URL here, you are about to push to the wrong project. STOP immediately.

```
□ Step 4: Verify you are on YOUR branch
```

```bash
git branch --show-current

# Expected: feature/insurance-module
# (or a sub-branch like feature/insurance-preauth)
```

> ⚠️ WARNING: If you see `main` or `develop` or another member's branch name — switch to your branch immediately:
> `git checkout feature/insurance-module`

```
□ Step 5: Sync with remote — check if you're behind
```

```bash
git fetch origin
git status

# ✅ SAFE output:
# On branch feature/insurance-module
# Your branch is up to date with 'origin/feature/insurance-module'.
# nothing to commit, working tree clean

# ⚠️ WARNING output:
# Your branch is behind 'origin/feature/insurance-module' by 3 commits
# → Run: git pull origin feature/insurance-module
```

```
□ Step 6: Pull latest changes from develop (daily sync)
```

```bash
git pull origin develop

# This ensures your branch has the latest team changes.
# If conflicts appear, resolve them NOW — not after you've written new code.
```

```
□ Step 7: Run the ALL-IN-ONE identity check command
```

```bash
echo "=== GIT SAFETY CHECK ===" && echo "User: $(git config user.name)" && echo "Email: $(git config user.email)" && echo "Branch: $(git branch --show-current)" && echo "Remote:" && git remote -v && echo "=== END CHECK ==="
```

**Expected output:**

```
=== GIT SAFETY CHECK ===
User: Siddhant Sangram Shinde
Email: siddhant.hms@example.com
Branch: feature/insurance-module
Remote:
origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (fetch)
origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (push)
=== END CHECK ===
```

✅ If all 4 values match expectations → **Safe to start coding.**

---

## SECTION 2: Two-Project Folder Structure Setup

### Recommended Folder Structure

```
C:\Dev\                                          ← Master development folder
│
├── HMS-Team-Project\                            ← Project 1 container
│   └── Hospital-Management-System-Internship-Group-Project\
│       ├── .git\                                ← Git internals (DO NOT touch)
│       ├── .git\config                          ← LOCAL identity override lives here
│       ├── backend\
│       │   ├── controllers\
│       │   ├── models\
│       │   ├── routes\
│       │   ├── middleware\
│       │   └── server.js
│       ├── frontend\
│       │   └── src\
│       ├── package.json
│       └── .env
│
└── Project2\                                    ← Project 2 container
    └── [your-project-2-repo-name]\
        ├── .git\
        ├── .git\config                          ← DIFFERENT local identity
        └── [project files]
```

### Why This Structure Prevents Disasters

| Protection Layer | How It Helps |
|---|---|
| **Separate top-level folders** | You physically `cd` into a different folder tree. Your brain registers the switch. |
| **Separate `.git/config` per repo** | Each repo has its own `user.name` and `user.email`. No cross-contamination. |
| **No shared parent `.git`** | Neither project folder is nested inside the other — Git won't confuse them. |
| **Separate VS Code workspaces** | Each project opens in its own VS Code window with its own terminal context. |

### Initial Setup Commands (Run Once)

```powershell
# PowerShell (Windows) — Create the folder structure
mkdir C:\Dev\HMS-Team-Project
mkdir C:\Dev\Project2

# Clone HMS repo into the HMS folder
cd C:\Dev\HMS-Team-Project
git clone https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git

# Clone Project 2 repo into the Project2 folder
cd C:\Dev\Project2
git clone https://github.com/[your-username]/[project-2-repo-name].git
```

```bash
# Git Bash / Mac / Linux
mkdir -p ~/Dev/HMS-Team-Project
mkdir -p ~/Dev/Project2

cd ~/Dev/HMS-Team-Project
git clone https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git

cd ~/Dev/Project2
git clone https://github.com/[your-username]/[project-2-repo-name].git
```

---

## SECTION 3: Git Identity Configuration — Never Push as the Wrong Person

### 3A. Checking Current Global Git Identity

Your global identity is the DEFAULT used when no local override exists:

```bash
git config --global user.name
# Shows: whatever name is set globally

git config --global user.email
# Shows: whatever email is set globally
```

> ⚠️ WARNING: The global identity applies to ALL repos that don't have a local override. This is where cross-contamination starts. We fix this in 3B.

### 3B. Setting Project-Specific Local Identity for HMS Team Repo

```bash
# Navigate to HMS project
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project

# Set LOCAL identity (only applies to THIS repo)
git config --local user.name "Siddhant Sangram Shinde"
git config --local user.email "your-hms-github-email@example.com"

# Verify it was set correctly
git config --local user.name
# Output: Siddhant Sangram Shinde

git config --local user.email
# Output: your-hms-github-email@example.com
```

Now do the same for Project 2:

```bash
# Navigate to Project 2
cd C:\Dev\Project2\[project-2-repo-name]

# Set LOCAL identity for Project 2
git config --local user.name "Siddhant Shinde"
git config --local user.email "your-project2-github-email@example.com"

# Verify
git config --local user.name
git config --local user.email
```

> ✅ SAFE: Local config always overrides global config. Once set, every commit in that repo will use the correct identity — automatically.

**How to verify the local config is saved:**

```bash
cat .git/config
```

You should see at the bottom:

```ini
[user]
    name = Siddhant Sangram Shinde
    email = your-hms-github-email@example.com
```

### 3C. Verifying Remote URL Before Every Push

```bash
git remote -v
```

**Correct output for HMS:**
```
origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (fetch)
origin  https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (push)
```

**Correct output for Project 2:**
```
origin  https://github.com/[your-username]/[project-2-repo].git (fetch)
origin  https://github.com/[your-username]/[project-2-repo].git (push)
```

> 🔴 DANGER: If the URLs are swapped — you are about to push code to the WRONG repository. Fix with:
```bash
git remote set-url origin [CORRECT_URL]
```

### 3D. The "Identity Verification" One-Liner Command

Save this as a shell alias. Run it anytime to get a full safety snapshot:

```bash
# For Git Bash / PowerShell — paste and run
echo "USER: $(git config user.name) <$(git config user.email)>" && echo "BRANCH: $(git branch --show-current)" && echo "REMOTE: $(git remote get-url origin)"
```

**Sample output:**
```
USER: Siddhant Sangram Shinde <siddhant.hms@example.com>
BRANCH: feature/insurance-module
REMOTE: https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git
```

**To make this a permanent alias (Git Bash):**

Add to your `~/.bashrc` or `~/.bash_profile`:

```bash
alias gitcheck='echo "USER: $(git config user.name) <$(git config user.email)>" && echo "BRANCH: $(git branch --show-current)" && echo "REMOTE: $(git remote get-url origin)"'
```

Then just type `gitcheck` anytime.

**For PowerShell — add to your `$PROFILE`:**

```powershell
function gitcheck {
    Write-Host "USER: $(git config user.name) <$(git config user.email)>"
    Write-Host "BRANCH: $(git branch --show-current)"
    Write-Host "REMOTE: $(git remote get-url origin)"
}
```

### 3E. Setting Up a Git Pre-Push Safety Hook

This creates an automatic safety check that runs EVERY time you try to `git push`. It shows you where the push is going and asks for confirmation.

**Step 1: Navigate to hooks folder:**

```bash
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project\.git\hooks
```

**Step 2: Create the pre-push hook file:**

```bash
# Create the file (Git Bash)
touch pre-push
chmod +x pre-push
```

```powershell
# PowerShell — create the file
New-Item -Path pre-push -ItemType File
```

**Step 3: Add this content to the `pre-push` file:**

```bash
#!/bin/bash
# Pre-push safety hook — prevents accidental pushes to wrong repo

REMOTE_URL=$(git remote get-url origin)
BRANCH=$(git branch --show-current)
USER_EMAIL=$(git config user.email)

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║         GIT PRE-PUSH SAFETY CHECK            ║"
echo "╠══════════════════════════════════════════════╣"
echo "║ Remote:  $REMOTE_URL"
echo "║ Branch:  $BRANCH"
echo "║ Email:   $USER_EMAIL"
echo "╚══════════════════════════════════════════════╝"
echo ""
read -p "⚠️  Push to this remote? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "🔴 Push ABORTED. Check your remote and branch."
    exit 1
fi

echo "✅ Push proceeding..."
exit 0
```

> ✅ SAFE: Now every `git push` will show you the exact target and ask for confirmation. If anything looks wrong, type `n` and the push is cancelled.

**Repeat this for Project 2's repo** with its own `.git/hooks/pre-push` file.

---

## SECTION 4: SSH Key Setup for Multi-Account GitHub

This is the **permanent, professional solution** for managing two GitHub accounts from one machine. SSH keys eliminate password/token confusion entirely.

### 4A. Generate Two SSH Keys

```bash
# Open Git Bash (or terminal on Mac/Linux)

# Key 1: For HMS project (Manisha's repo — your collaborator account)
ssh-keygen -t ed25519 -C "your-hms-github-email@example.com" -f ~/.ssh/id_ed25519_hms

# When prompted for passphrase, either set one or press Enter for none
# This creates:
#   ~/.ssh/id_ed25519_hms       (private key — NEVER share)
#   ~/.ssh/id_ed25519_hms.pub   (public key — add to GitHub)

# Key 2: For Project 2 (your personal/other account)
ssh-keygen -t ed25519 -C "your-project2-email@example.com" -f ~/.ssh/id_ed25519_project2

# This creates:
#   ~/.ssh/id_ed25519_project2
#   ~/.ssh/id_ed25519_project2.pub
```

**Verify both keys exist:**

```bash
ls -la ~/.ssh/

# You should see:
# id_ed25519_hms
# id_ed25519_hms.pub
# id_ed25519_project2
# id_ed25519_project2.pub
```

### 4B. Create SSH Config File

```bash
# Create or edit the SSH config file
# Git Bash / Mac / Linux:
nano ~/.ssh/config

# Or on Windows, use notepad:
notepad C:\Users\Siddhant\.ssh\config
```

**Paste this exact content:**

```
# ─── HMS Team Project (Manisha's repo — collaborator access) ───
Host github-hms
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_hms
    IdentitiesOnly yes

# ─── Project 2 (Personal/Other account) ───
Host github-project2
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_project2
    IdentitiesOnly yes
```

> The `Host` values (`github-hms` and `github-project2`) are custom aliases. They replace `github.com` in your remote URLs so SSH knows which key to use.

### 4C. Add SSH Keys to Respective GitHub Accounts

**For HMS account:**

```bash
# Copy the public key to clipboard
# Git Bash:
cat ~/.ssh/id_ed25519_hms.pub
# Select and copy the entire output

# PowerShell:
Get-Content C:\Users\Siddhant\.ssh\id_ed25519_hms.pub | Set-Clipboard
```

1. Go to **github.com** → Sign in with your HMS GitHub account
2. Click your profile avatar → **Settings**
3. Left sidebar → **SSH and GPG keys**
4. Click **New SSH key**
5. Title: `HMS Laptop Key`
6. Key type: Authentication Key
7. Paste the public key content
8. Click **Add SSH key**

**For Project 2 account — repeat with the other key:**

```bash
cat ~/.ssh/id_ed25519_project2.pub
```

Sign in with your Project 2 GitHub account and add this key the same way.

### 4D. Update Remote URLs to Use SSH Aliases

```bash
# Navigate to HMS project
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project

# Switch remote from HTTPS to SSH with alias
git remote set-url origin git@github-hms:codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git

# Verify
git remote -v
# Expected:
# origin  git@github-hms:codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (fetch)
# origin  git@github-hms:codewithManishaGautam/Hospital-Management-System-Internship-Group-Project.git (push)
```

```bash
# Navigate to Project 2
cd C:\Dev\Project2\[project-2-repo-name]

# Switch remote to SSH with alias
git remote set-url origin git@github-project2:[your-username]/[project-2-repo-name].git

# Verify
git remote -v
# Expected:
# origin  git@github-project2:[your-username]/[project-2-repo-name].git (fetch)
# origin  git@github-project2:[your-username]/[project-2-repo-name].git (push)
```

### 4E. Test SSH Connection for Both Accounts

```bash
# Test HMS account
ssh -T github-hms

# Expected output:
# Hi [your-hms-username]! You've successfully authenticated, but GitHub does not provide shell access.

# Test Project 2 account
ssh -T github-project2

# Expected output:
# Hi [your-project2-username]! You've successfully authenticated, but GitHub does not provide shell access.
```

> ✅ SAFE: If both tests show the correct username, your SSH setup is complete. From now on, Git will automatically use the correct identity for each project based on the remote URL alias.

### SSH vs HTTPS Comparison

| Feature | HTTPS (Current) | SSH (Recommended) |
|---|---|---|
| Authentication | Browser OAuth / stored token | SSH key file per account |
| Multi-account safety | 🔴 Risky — browser caches one account | ✅ Safe — each repo uses its own key |
| Password prompts | May prompt or use cached credential | Never prompts — key-based |
| Wrong-account pushes | Very possible | Nearly impossible with aliases |
| Setup complexity | Easy initially | Medium (one-time setup) |
| Professional standard | Used by beginners | Used by professional teams |

---

## SECTION 5: Google Authentication Safety Rules

### How GitHub OAuth via Google Works

When you sign into GitHub using "Sign in with Google":
1. Your browser creates an **OAuth token** that links your Google account to a specific GitHub account
2. This token is cached in your browser session and in **Windows Credential Manager** (or macOS Keychain)
3. When Git CLI or GitHub Desktop makes a push, it looks up the cached credential
4. **The problem:** If you have TWO GitHub accounts linked to two different Google accounts, the credential manager may serve the WRONG token based on whichever was last authenticated

### Where Credentials Are Stored (Windows)

```powershell
# Check Windows Credential Manager for stored GitHub tokens
# Open: Control Panel → User Accounts → Credential Manager → Windows Credentials
# Look for entries like:
#   git:https://github.com
#   github.com

# Or via command line:
cmdkey /list | findstr github
```

> ⚠️ WARNING: If you see a generic `git:https://github.com` credential, it will be used for ALL GitHub HTTPS operations — regardless of which account you intend.

### Safety Rules

**Rule 1: Switch to SSH (Section 4) to eliminate this problem entirely.**

If you must continue with HTTPS:

**Rule 2: Use GitHub CLI for authentication management:**

```bash
# Install GitHub CLI: https://cli.github.com/
# Check which account is active:
gh auth status

# Switch accounts:
gh auth login
# Select: GitHub.com → HTTPS → Login with web browser
# Sign in with the CORRECT Google account
```

**Rule 3: Clear cached credentials before switching projects:**

```powershell
# PowerShell — Remove cached GitHub credential
cmdkey /delete:git:https://github.com

# Then when you git push, it will prompt you to re-authenticate
# Sign in with the CORRECT account for that project
```

**Rule 4: Browser profile separation:**

| Browser Profile | Purpose | GitHub Account |
|---|---|---|
| Chrome Profile 1 ("HMS Work") | HMS project GitHub | Your HMS GitHub account |
| Chrome Profile 2 ("Personal") | Project 2 GitHub | Your Project 2 GitHub account |

To create a Chrome Profile:
1. Click your profile icon (top-right of Chrome)
2. Click "Add" → Name it "HMS Work" or "Personal"
3. Sign in to the corresponding Google account in each profile
4. Always use the correct profile when accessing GitHub in the browser

**Rule 5: GitHub Desktop — check account before every session:**

1. Open GitHub Desktop
2. File → Options → Accounts
3. Verify the signed-in account matches the project you're about to work on
4. If wrong → Sign Out → Sign In with correct account

### Recommendation: CLI vs. Desktop vs. VS Code Git

| Tool | Multi-Account Safety | Recommendation |
|---|---|---|
| **Git CLI + SSH** | ✅ Safest — key-based, per-repo identity | **Use this for all push/pull operations** |
| **VS Code Git Panel** | ⚠️ Medium — uses whatever credential is cached | Use for staging/committing, but push via CLI |
| **GitHub Desktop** | ⚠️ Medium — single account at a time | Use only if you always verify account first |
| **GitHub Web** | ⚠️ Depends on browser profile | Use with separate Chrome profiles |

---

## SECTION 6: Daily Work Switching Protocol — HMS ↔ Project 2

### SWITCHING FROM HMS PROJECT TO PROJECT 2

```
□ Step 1: Save all files in VS Code (Ctrl+S in all open files)

□ Step 2: Commit any uncommitted work in HMS
```
```bash
cd C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project
git add .
git status
# Review what's being committed — make sure no garbage files
git commit -m "[INSURANCE]: WIP — save progress before context switch"
```

```
□ Step 3: Push current branch to remote
```
```bash
git push origin feature/insurance-module
```

```
□ Step 4: Run identity check (confirm you just pushed to the right place)
```
```bash
gitcheck
# Verify: remote shows HMS repo URL ✅
```

```
□ Step 5: Close HMS project in VS Code
         File → Close Folder (or close the VS Code window entirely)
         Close all HMS terminal tabs

□ Step 6: Open Project 2 folder in a NEW VS Code window
         File → Open Folder → C:\Dev\Project2\[project-2-repo]

□ Step 7: Open terminal in VS Code and verify context
```
```bash
pwd
# Expected: C:\Dev\Project2\[project-2-repo]

gitcheck
# Expected: Project 2 username, Project 2 email, Project 2 remote URL
```

```
□ Step 8: Pull latest changes
```
```bash
git pull origin main
# (or whatever Project 2's primary branch is)
```

```
□ Step 9: Start working on Project 2 ✅
```

### SWITCHING FROM PROJECT 2 BACK TO HMS

```
□ Step 1: Save all files, commit and push Project 2 work
```
```bash
git add .
git commit -m "WIP: [description of Project 2 work]"
git push origin main
```

```
□ Step 2: Close Project 2 in VS Code entirely
         Close all Project 2 terminal tabs

□ Step 3: Open HMS project in new VS Code window
         File → Open Folder → C:\Dev\HMS-Team-Project\Hospital-Management-System-Internship-Group-Project

□ Step 4: Verify context in terminal
```
```bash
gitcheck
# Expected:
# USER: Siddhant Sangram Shinde <siddhant.hms@example.com>
# BRANCH: feature/insurance-module
# REMOTE: ...codewithManishaGautam/Hospital-Management-System...
```

```
□ Step 5: Sync with team changes
```
```bash
git fetch origin
git pull origin develop
git pull origin feature/insurance-module
```

```
□ Step 6: Resume HMS work ✅
```

> 🔴 DANGER: NEVER have both projects open in VS Code simultaneously. The terminal context, Git panel, and source control can get confused. Always close one before opening the other.

---

## SECTION 7: HMS Team Repository — Siddhant's Branch Management

### 7A. Siddhant's Personal Branch Map

```
HMS Repository (Siddhant's perspective):

main ←──────────────────── Manisha controls. NEVER push here directly.
│
└── develop ←─────────────── Integration branch. All PRs merge here.
    │
    ├── feature/insurance-module ←── Siddhant's PRIMARY branch
    │   ├── feature/insurance-preauth       (sub-branch for large features)
    │   ├── feature/insurance-claims        (sub-branch for large features)
    │   └── feature/insurance-billing-api   (sub-branch for large features)
    │
    ├── feature/reception-module ←── Namrata (FE) — Siddhant contributes BE APIs
    ├── feature/billing-module ←──── Prajwal (FE) — Shared data contract
    ├── feature/lab-module ←──────── Suhas (FE) — Siddhant contributes BE APIs
    ├── feature/pharmacy-module ←─── Vaishnavi (FE) — Siddhant contributes BE APIs
    ├── feature/doctor-module ←───── Manisha (FE) — Siddhant contributes BE APIs
    ├── feature/admin-module ←────── Sakshi (FE)
    └── feature/nurse-module ←────── Trupti (FE) — Siddhant contributes BE APIs
```

### 7B. How Siddhant Delivers Backend APIs WITHOUT Touching Others' Branches

**The Golden Rule:** Siddhant NEVER commits directly to another member's feature branch. Instead:

```
BACKEND API DELIVERY WORKFLOW
=============================

1. Siddhant builds the API in his OWN branch (feature/insurance-module)
   OR in a dedicated backend branch (feature/backend-reception-api)

2. Siddhant raises a PR from his branch → develop

3. PR is reviewed and merged into develop

4. Siddhant posts a GitHub Issue or comment:
   "@Namrata — POST /api/patients/register is now available in develop. 
    Pull develop into your branch to access it."

5. Frontend member (Namrata) pulls develop into her branch:
   git checkout feature/reception-module
   git pull origin develop

6. Frontend member now has the API and can integrate it.
```

**Why NEVER commit to another member's branch:**
- It creates unexpected changes in their working copy
- They can't distinguish their own work from yours in Git log
- If you introduce a bug, it's harder to isolate
- It breaks the "single owner per branch" principle

### 7C. How to Raise a PR from Insurance Branch to Develop

**Step 1: Ensure your branch is clean and pushed:**

```bash
git checkout feature/insurance-module
git add .
git commit -m "[INSURANCE]: Complete pre-auth request API and UI"
git push origin feature/insurance-module
```

**Step 2: Create PR on GitHub (browser):**

1. Go to: `https://github.com/codewithManishaGautam/Hospital-Management-System-Internship-Group-Project`
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Set:
   - **Base:** `develop`
   - **Compare:** `feature/insurance-module`
5. Title: `[INSURANCE] Add pre-authorization request management`
6. Description (use this template):

```markdown
## Summary
Brief description of what this PR adds/changes.

## Changes
- [ ] Added POST /api/insurance/preauth endpoint
- [ ] Added PreAuthRequest Mongoose model
- [ ] Added PreAuthForm React component
- [ ] Added pre-auth status tracking on dashboard

## Testing Done
- [ ] API tested with Postman/Thunder Client
- [ ] UI tested in browser (Chrome)
- [ ] No console errors

## Dependencies
- Requires: Patient model from Reception module (already in develop)
- Affects: Billing module will need to read pre-auth status

## Reviewer Notes
@codewithManishaGautam Please review and merge to develop.
```

7. Click **"Create pull request"**

**Step 3: After PR is merged, sync your local branch:**

```bash
git checkout feature/insurance-module
git pull origin develop
```

### 7D. Daily Sync — Keep Your Branch Updated with Develop

Run these commands **every morning** (part of your Morning Checklist):

```bash
# Make sure you're on your branch
git checkout feature/insurance-module

# Fetch all remote changes
git fetch origin

# Merge develop into your branch
git merge origin/develop

# If there are conflicts:
# 1. Git will tell you which files have conflicts
# 2. Open each conflicted file in VS Code
# 3. Look for <<<<<<< HEAD and >>>>>>> markers
# 4. Choose the correct code (yours, theirs, or a combination)
# 5. Remove the conflict markers
# 6. git add [resolved-file]
# 7. git commit -m "[SYNC]: Merge develop into feature/insurance-module"
```

**Alternative: Rebase (cleaner history but more advanced):**

```bash
# Only use if you're comfortable with rebasing
git checkout feature/insurance-module
git fetch origin
git rebase origin/develop

# If conflicts during rebase:
# Resolve → git add [file] → git rebase --continue
# To abort rebase: git rebase --abort

# After rebase, force-push (since history changed):
git push origin feature/insurance-module --force-with-lease
```

> ⚠️ WARNING: Only use `--force-with-lease` (not `--force`). It prevents overwriting changes someone else pushed to your branch.
