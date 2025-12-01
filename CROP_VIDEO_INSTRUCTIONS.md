# Video Cropping Instructions

## Quick Method (if ffmpeg is installed):

1. Double-click `crop_video.bat` to automatically crop the video
2. The script will remove the first 2 seconds from the video

## Manual Method:

### Step 1: Install FFmpeg

**Option A - Using Winget (Windows 10/11):**
```powershell
winget install Gyan.FFmpeg
```

**Option B - Download manually:**
1. Go to https://www.gyan.dev/ffmpeg/builds/
2. Download the latest release build
3. Extract and add to your system PATH

**Option C - Using Chocolatey:**
```powershell
choco install ffmpeg
```

### Step 2: Crop the Video

Open PowerShell or Command Prompt in this folder and run:

**To remove first 2 seconds:**
```bash
ffmpeg -i "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4" -ss 00:00:02 -c copy "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4"
```

**To remove last 2 seconds:**
```bash
ffmpeg -i "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4" -t 00:00:XX -c copy "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4"
```
(Replace XX with total duration minus 2 seconds)

**To remove 2 seconds from a specific time:**
```bash
ffmpeg -i "assets\WhatsApp Video 2025-12-01 at 12.04.31.mp4" -ss 00:00:START -t 00:00:DURATION -c copy "assets\WhatsApp Video 2025-12-01 at 12.04.31_cropped.mp4"
```

### Step 3: Replace Original

After cropping, replace the original file with the cropped version.

## Online Alternative:

If you prefer not to install software, you can use online tools:
- https://www.freeconvert.com/video-trimmer
- https://clideo.com/cut-video
- https://www.kapwing.com/tools/trim-video



