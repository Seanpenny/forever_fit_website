# Surge.sh Deployment Script for Forever Fit Website
# This script helps you deploy your website to Surge.sh for free

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Forever Fit Website - Surge.sh Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    pause
    exit
}

# Check if Surge is installed
Write-Host "Checking for Surge.sh..." -ForegroundColor Yellow
try {
    $surgeVersion = surge --version
    Write-Host "✓ Surge.sh found" -ForegroundColor Green
} catch {
    Write-Host "✗ Surge.sh not installed. Installing now..." -ForegroundColor Yellow
    npm install -g surge
    Write-Host "✓ Surge.sh installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Ready to deploy!" -ForegroundColor Green
Write-Host "When prompted, enter a unique domain name (e.g., forever-fit-gym.surge.sh)" -ForegroundColor Yellow
Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host

# Deploy to Surge
surge

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your website should now be live!" -ForegroundColor Green
Write-Host "Check the URL shown above." -ForegroundColor Yellow
Write-Host ""
pause


