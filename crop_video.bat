@echo off
echo Cropping video - Removing first 2 seconds...
echo.

REM Check if ffmpeg is available
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo FFmpeg is not installed. Please install it first.
    echo.
    echo Option 1: Download from https://ffmpeg.org/download.html
    echo Option 2: Install using winget: winget install Gyan.FFmpeg
    echo Option 3: Install using chocolatey: choco install ffmpeg
    echo.
    pause
    exit /b 1
)

REM Backup original video
if not exist "assets\WhatsApp Video 2025-12-01 at 12.04.31_original.mp4" (
    copy "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4" "assets\WhatsApp Video 2025-12-01 at 12.04.31_original.mp4"
    echo Original video backed up.
)

REM Crop video - remove first 2 seconds
ffmpeg -i "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4" -ss 00:00:02 -c copy "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Video cropped successfully!
    echo Original saved as: WhatsApp Video 2025-12-01 at 12.04.31_original.mp4
    echo Cropped video saved as: WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4
    echo.
    echo Replace the original with the cropped version? (Y/N)
    set /p replace="> "
    if /i "%replace%"=="Y" (
        del "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4"
        ren "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4" "WhatsApp Video 2025-12-01 at 12.04.31.mp4"
        echo Original replaced with cropped version.
    )
) else (
    echo.
    echo Error cropping video. Please check if ffmpeg is properly installed.
)

echo.
pause



