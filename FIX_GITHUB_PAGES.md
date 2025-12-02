# 5 Steps to Fix GitHub Pages Error

## Step 1: Push All Files to GitHub
Open PowerShell in your project folder and run:
```powershell
git push origin main
```
This uploads your restored website files to GitHub.

## Step 2: Enable GitHub Pages
1. Go to: https://github.com/Seanpenny/forever-_website
2. Click **Settings** (top right of repo)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**

## Step 3: Wait 2-3 Minutes
GitHub needs a few minutes to build and publish your site.

## Step 4: Check Your Site URL
Your website will be at:
**https://seanpenny.github.io/forever-_website/**

## Step 5: Test the Link
Open the URL on your phone or send it to your friend. It should work!

---

**If it still doesn't work after 5 minutes:**
- Make sure `index.html` is in the root folder (it is ✓)
- Make sure `.nojekyll` file exists (it does ✓)
- Check GitHub Pages settings show "Published" status



