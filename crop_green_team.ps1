# PowerShell script to crop Green Team video from 15s to 21s

$videoPath = "assets\Green Team .mp4"
$outputPath = "assets\Green Team _cropped.mp4"
$startTime = "00:00:15"
$duration = "00:00:06"  # 6 seconds (from 15 to 21)

Write-Host "Cropping Green Team Video" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""

# Check if video exists
if (-not (Test-Path $videoPath)) {
    Write-Host "Error: Video file not found at $videoPath" -ForegroundColor Red
    exit 1
}

# Try to find ffmpeg in common locations
$ffmpegPath = $null
$possiblePaths = @(
    "ffmpeg",
    "$env:ProgramFiles\ffmpeg\bin\ffmpeg.exe",
    "${env:ProgramFiles(x86)}\ffmpeg\bin\ffmpeg.exe",
    "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_*\ffmpeg*\bin\ffmpeg.exe"
)

foreach ($path in $possiblePaths) {
    if ($path -like "*\*") {
        # Wildcard path - need to resolve
        $resolved = Get-ChildItem -Path (Split-Path $path) -Filter (Split-Path -Leaf $path) -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($resolved) {
            $ffmpegPath = $resolved.FullName
            break
        }
    } else {
        try {
            $result = Get-Command $path -ErrorAction SilentlyContinue
            if ($result) {
                $ffmpegPath = $result.Source
                break
            }
        } catch {
            # Continue searching
        }
    }
}

# If still not found, try downloading portable version
if (-not $ffmpegPath) {
    $tempFfmpeg = "$env:TEMP\ffmpeg.exe"
    if (Test-Path $tempFfmpeg) {
        $ffmpegPath = $tempFfmpeg
    } else {
        Write-Host "FFmpeg not found. Attempting to download portable version..." -ForegroundColor Yellow
        $ffmpegUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
        $zipPath = "$env:TEMP\ffmpeg.zip"
        
        try {
            Invoke-WebRequest -Uri $ffmpegUrl -OutFile $zipPath -UseBasicParsing
            Expand-Archive -Path $zipPath -DestinationPath "$env:TEMP\ffmpeg" -Force
            $ffmpegExe = Get-ChildItem -Path "$env:TEMP\ffmpeg" -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1
            if ($ffmpegExe) {
                Copy-Item $ffmpegExe.FullName -Destination $tempFfmpeg -Force
                $ffmpegPath = $tempFfmpeg
                Write-Host "FFmpeg downloaded successfully!" -ForegroundColor Green
            }
        } catch {
            Write-Host "Error downloading FFmpeg: $_" -ForegroundColor Red
            Write-Host ""
            Write-Host "Please install FFmpeg manually:" -ForegroundColor Yellow
            Write-Host "Run: winget install Gyan.FFmpeg" -ForegroundColor Yellow
            Write-Host "Or download from: https://www.gyan.dev/ffmpeg/builds/" -ForegroundColor Yellow
            exit 1
        }
    }
}

if (-not $ffmpegPath) {
    Write-Host "Error: Could not find or download FFmpeg" -ForegroundColor Red
    exit 1
}

Write-Host "Using FFmpeg at: $ffmpegPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cropping video from $startTime (duration: $duration)..." -ForegroundColor Yellow
Write-Host "This may take a moment..." -ForegroundColor Yellow
Write-Host ""

# Crop video: start at 15 seconds, duration 6 seconds
& $ffmpegPath -i $videoPath -ss $startTime -t $duration -c copy $outputPath -y

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Video cropped successfully!" -ForegroundColor Green
    Write-Host "Cropped video saved as: $outputPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now use this video in your HTML." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Error cropping video. Please check the error messages above." -ForegroundColor Red
    Write-Host "Trying with re-encoding (slower but more reliable)..." -ForegroundColor Yellow
    
    # Try with re-encoding if copy codec fails
    & $ffmpegPath -i $videoPath -ss $startTime -t $duration $outputPath -y
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Video cropped successfully with re-encoding!" -ForegroundColor Green
        Write-Host "Cropped video saved as: $outputPath" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "Error: Failed to crop video." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green

