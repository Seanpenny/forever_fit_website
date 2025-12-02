# Convert Videos to Animated GIFs - Step by Step

## ✅ Code Updated!
Your website is now ready to use GIFs instead of videos. Just convert your videos and add the GIF files!

---

## Step 1: Convert Videos to GIF

### Option 1: EZGIF (Easiest - Recommended)
1. Go to: **https://ezgif.com/video-to-gif**
2. Click "Choose File" and upload:
   - `assets/Green Team .mp4`
   - `assets/mma_kids_vid.mp4`
3. Click "Convert to GIF"
4. **Settings:**
   - **Start time:** 0 seconds (or 15 seconds for Green Team video)
   - **Duration:** 10-15 seconds (shorter = smaller file)
   - **Size:** 1200px width (or keep original)
   - **FPS:** 15-20 (lower = smaller file)
5. Click "Convert to GIF"
6. Click "Save" to download

### Option 2: CloudConvert
1. Go to: **https://cloudconvert.com/mp4-to-gif**
2. Upload your MP4 files
3. Set duration: 10-15 seconds
4. Set size: 1200px width
5. Convert and download

### Option 3: FFmpeg (Command Line)
```bash
ffmpeg -i "assets/Green Team .mp4" -ss 15 -t 10 -vf "fps=15,scale=1200:-1" "assets/Green Team .gif"
ffmpeg -i "assets/mma_kids_vid.mp4" -t 10 -vf "fps=15,scale=1200:-1" "assets/mma_kids_vid.gif"
```

---

## Step 2: Save GIF Files

Save the converted GIFs in your `assets/` folder with these exact names:
- ✅ `assets/Green Team .gif`
- ✅ `assets/mma_kids_vid.gif`

---

## Step 3: Done!

The code is already updated! Your website will automatically use the GIFs when you add them.

**GIFs will:**
- ✅ Auto-play automatically
- ✅ Loop forever
- ✅ Work in all browsers
- ✅ No JavaScript needed

---

## File Size Tips:

**To reduce GIF size:**
- Shorter duration (10 seconds instead of 30)
- Lower FPS (15 instead of 30)
- Smaller dimensions (1200px instead of 1920px)
- Use EZGIF's "Optimize" feature after conversion

**Expected sizes:**
- Original MP4: ~10-20 MB
- Optimized GIF: ~5-15 MB (depends on settings)

---

## ✅ What Changed:

1. ✅ HTML: Videos replaced with `<img>` tags pointing to `.gif` files
2. ✅ CSS: Updated to work with images (same styling)
3. ✅ JavaScript: Removed all video control code (GIFs don't need it)

**Your moving backgrounds will work perfectly!**

