# Backup & Safety Instructions

## ⚠️ IMPORTANT: Protect Your Work

This project has been set up with safeguards to prevent accidental file deletion. Follow these guidelines:

## 🛡️ Safeguards Installed

1. **VS Code Settings** (`.vscode/settings.json`)
   - Auto-save disabled (prevents accidental overwrites)
   - Format on save disabled
   - Delete confirmation enabled
   - Local history enabled

2. **Git Pre-commit Hook** (`.git/hooks/pre-commit`)
   - Prevents deletion of critical files (index.html, styles.css, main.js)
   - Warns if files appear empty

## 📝 Regular Backup Routine

### Option 1: Manual Backup (Recommended)
Run this script regularly (after each work session):
```powershell
.\auto-commit.ps1
```

### Option 2: Schedule Auto-Backup
Set up a Windows Task Scheduler to run `auto-commit.ps1` every hour.

### Option 3: Manual Git Commands
```powershell
git add .
git commit -m "Work in progress - [describe changes]"
git push origin main
```

## 🔄 Recovery Steps

If files get deleted again:

1. **Check Git History:**
   ```powershell
   git log --oneline
   ```

2. **Restore from Last Commit:**
   ```powershell
   git restore index.html css/styles.css js/main.js
   ```

3. **Restore from Specific Commit:**
   ```powershell
   git show [commit-hash]:index.html > index.html
   ```

4. **Check VS Code Local History:**
   - Right-click file → "Open Timeline"
   - Restore from local history

## ⚡ Quick Commands

- **Save to GitHub:** `.\auto-commit.ps1`
- **Check Status:** `git status`
- **View History:** `git log --oneline -10`
- **Restore Files:** `git restore index.html css/styles.css js/main.js`

## 🚨 If Files Get Deleted Again

1. **DON'T PANIC** - Your work is in Git
2. Run: `git restore index.html css/styles.css js/main.js`
3. Check: `git log` to see when it happened
4. Commit immediately: `git add . && git commit -m "Emergency restore" && git push`

## 💡 Best Practices

- ✅ Commit after every major change
- ✅ Push to GitHub daily
- ✅ Use `auto-commit.ps1` script regularly
- ✅ Check `git status` before closing VS Code
- ❌ Don't disable the safeguards
- ❌ Don't use `--no-verify` unless absolutely necessary

---

**Remember:** Git is your safety net. Commit often, push regularly!

