# How to Fix GitHub Pages Setup

## Option 1: Use GitHub Actions (Recommended - Already Fixed!)

The workflow file is already created and pushed. Just change the Pages settings:

1. Go to: https://github.com/Seanpenny/forever-_website
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Source**, change from "Deploy from a branch" to **"GitHub Actions"**
5. Click **Save**
6. Wait 2-3 minutes for deployment

Your site will be at: **https://seanpenny.github.io/forever-_website/**

---

## Option 2: Delete GitHub Actions & Use Simple Branch Method

If you want to delete the workflow and use the simpler method:

### Step 1: Delete the Workflow File
Run this in PowerShell:
```powershell
git rm .github/workflows/static.yml
git commit -m "Remove GitHub Actions workflow"
git push origin main
```

### Step 2: Change Pages Settings
1. Go to: https://github.com/Seanpenny/forever-_website
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select **main** branch
5. Select **/ (root)** folder
6. Click **Save**

---

## Which Should You Use?

- **GitHub Actions**: More control, automatic deployments, better for future updates
- **Deploy from branch**: Simpler, works immediately, less configuration

**Recommendation:** Use GitHub Actions (Option 1) since the workflow is already fixed and working!



