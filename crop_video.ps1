# PowerShell script to crop video using portable FFmpeg

$videoPath = "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4"
$outputPath = "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4"
$ffmpegPath = "$env:TEMP\ffmpeg.exe"

Write-Host "Video Cropping Script" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green
Write-Host ""

# Check if video exists
if (-not (Test-Path $videoPath)) {
    Write-Host "Error: Video file not found at $videoPath" -ForegroundColor Red
    exit 1
}

# Download portable FFmpeg if not exists
if (-not (Test-Path $ffmpegPath)) {
    Write-Host "Downloading portable FFmpeg..." -ForegroundColor Yellow
    $ffmpegUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    $zipPath = "$env:TEMP\ffmpeg.zip"
    
    try {
        Invoke-WebRequest -Uri $ffmpegUrl -OutFile $zipPath -UseBasicParsing
        Expand-Archive -Path $zipPath -DestinationPath "$env:TEMP\ffmpeg" -Force
        $ffmpegExe = Get-ChildItem -Path "$env:TEMP\ffmpeg" -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1
        Copy-Item $ffmpegExe.FullName -Destination $ffmpegPath -Force
        Write-Host "FFmpeg downloaded successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Error downloading FFmpeg: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install FFmpeg manually:" -ForegroundColor Yellow
        Write-Host "1. Go to https://www.gyan.dev/ffmpeg/builds/"
        Write-Host "2. Download the latest release build"
        Write-Host "3. Extract and add to PATH, or place ffmpeg.exe in this folder"
        exit 1
    }
}

# Backup original video
$backupPath = "assets\WhatsApp Video 2025-12-01 at 12.04.31_original.mp4"
if (-not (Test-Path $backupPath)) {
    Copy-Item $videoPath -Destination $backupPath
    Write-Host "Original video backed up." -ForegroundColor Green
}

# Crop video - remove first 2 seconds
Write-Host ""
Write-Host "Cropping video (removing first 2 seconds)..." -ForegroundColor Yellow
Write-Host "This may take a moment..." -ForegroundColor Yellow
Write-Host ""

& $ffmpegPath -i $videoPath -ss 00:00:02 -c copy $outputPath -y

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Video cropped successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Original saved as: WhatsApp Video 2025-12-01 at 12.04.31_original.mp4" -ForegroundColor Cyan
    Write-Host "Cropped video saved as: WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4" -ForegroundColor Cyan
    Write-Host ""
    
    $replace = Read-Host "Replace the original with the cropped version? (Y/N)"
    if ($replace -eq "Y" -or $replace -eq "y") {
        Remove-Item $videoPath -Force
        Rename-Item $outputPath -NewName "WhatsApp Video 2025-12-01 at 12.04.31.mp4"
        Write-Host "Original replaced with cropped version." -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "Error cropping video. Please check the error messages above." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")



