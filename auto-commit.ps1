# Auto-commit script for Forever Fit Website
# Run this regularly to save your work to GitHub

Write-Host "=== Forever Fit Website - Auto Commit ===" -ForegroundColor Green
Write-Host ""

# Check if there are changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

# Show current changes
Write-Host "Current changes:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Add all changes
Write-Host "Staging all changes..." -ForegroundColor Yellow
git add .

# Create commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-save: $timestamp"

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Changes committed successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Ask if user wants to push
    $push = Read-Host "Push to GitHub? (Y/N)"
    if ($push -eq "Y" -or $push -eq "y") {
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Pushed to GitHub successfully!" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to push to GitHub" -ForegroundColor Red
        }
    }
} else {
    Write-Host "✗ Failed to commit changes" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green


