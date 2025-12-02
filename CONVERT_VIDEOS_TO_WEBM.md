# Convert Videos to WebM - Step by Step

## Why WebM?
- ✅ 50-70% smaller file size than MP4
- ✅ Better compression
- ✅ Faster loading
- ✅ Same quality
- ✅ Works in all modern browsers

## How to Convert:

### Option 1: Online Converter (Easiest)
1. Go to: https://cloudconvert.com/mp4-to-webm
2. Upload your MP4 files:
   - `Green Team .mp4`
   - `mma_kids_vid.mp4`
3. Click "Convert"
4. Download WebM files
5. Save them in `assets/` folder with same names:
   - `Green Team .webm`
   - `mma_kids_vid.webm`

### Option 2: FFmpeg (Command Line)
```bash
# Install FFmpeg first, then:
ffmpeg -i "assets/Green Team .mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "assets/Green Team .webm"
ffmpeg -i "assets/mma_kids_vid.mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "assets/mma_kids_vid.webm"
```

### Option 3: HandBrake (Free Software)
1. Download: https://handbrake.fr/
2. Open video file
3. Format: WebM
4. Quality: RF 28-30
5. Convert

## After Converting:
✅ Place WebM files in `assets/` folder
✅ HTML already updated to use WebM first, MP4 as fallback
✅ Videos will load faster automatically!

## File Size Comparison:
- MP4: ~10-20 MB
- WebM: ~3-7 MB (much smaller!)

**The code is ready - just add the WebM files!**

