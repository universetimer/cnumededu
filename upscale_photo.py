"""Upscale 이명원 교수 photo using LANCZOS + light sharpening.

The source is only 245x206px, so we cannot recover detail that was never
captured. We can only smooth the upscale and apply a mild sharpen to
compensate for resampling blur.
"""
from PIL import Image, ImageFilter, ImageEnhance
import shutil

SRC = "images/prof-lee-myungwon.jpg"
DST = "images/prof-lee-myungwon.jpg"
BACKUP = "images/_backup_prof-lee-myungwon.jpg"

shutil.copy(SRC, BACKUP)
img = Image.open(SRC)
print(f"Source: {img.size[0]}x{img.size[1]}")

TARGET_W = 1200
scale = TARGET_W / img.size[0]
target_h = int(img.size[1] * scale)
print(f"Target: {TARGET_W}x{target_h}  (scale x{scale:.2f})")

upscaled = img.resize((TARGET_W, target_h), Image.LANCZOS)
upscaled = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=130, threshold=3))
contrast = ImageEnhance.Contrast(upscaled).enhance(1.05)
final = ImageEnhance.Color(contrast).enhance(1.08)

final.save(DST, "JPEG", quality=92, optimize=True, progressive=True)
print(f"Saved: {DST}")

import os
print(f"Size: {os.path.getsize(DST) // 1024} KB")
