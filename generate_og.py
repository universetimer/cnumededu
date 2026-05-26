"""Generate Open Graph image for cnumededu.com — no human face, text-only branding."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
NAVY_DARK = (0, 30, 71)
NAVY = (0, 47, 108)
NAVY_LIGHT = (30, 74, 138)
GOLD = (200, 164, 92)
WHITE = (255, 255, 255)
SKY = (232, 240, 250)

img = Image.new("RGB", (W, H), NAVY_DARK)
draw = ImageDraw.Draw(img)

for y in range(H):
    t = y / H
    r = int(NAVY[0] * (1 - t) + NAVY_LIGHT[0] * t)
    g = int(NAVY[1] * (1 - t) + NAVY_LIGHT[1] * t)
    b = int(NAVY[2] * (1 - t) + NAVY_LIGHT[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

ring_x, ring_y, ring_r = W - 220, 180, 360
for r_off in range(ring_r, ring_r - 4, -1):
    draw.ellipse(
        [ring_x - r_off, ring_y - r_off, ring_x + r_off, ring_y + r_off],
        outline=(255, 255, 255, 12),
        width=1,
    )

for r_off in range(180, 176, -1):
    draw.ellipse(
        [-150 - r_off, H - 100 - r_off, -150 + r_off, H - 100 + r_off],
        outline=(200, 164, 92, 18),
        width=1,
    )

cnu_circle_r = 70
cx, cy = 100, 100
draw.ellipse(
    [cx - cnu_circle_r, cy - cnu_circle_r, cx + cnu_circle_r, cy + cnu_circle_r],
    fill=GOLD,
)
font_logo = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 32)
bbox = draw.textbbox((0, 0), "CNU", font=font_logo)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
draw.text((cx - tw / 2, cy - th / 2 - 5), "CNU", font=font_logo, fill=NAVY_DARK)

font_eyebrow = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 22)
draw.text((100, 220), "MEDICAL EDUCATION OFFICE", font=font_eyebrow, fill=GOLD)

font_main_l1 = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 64)
draw.text((100, 260), "충남대학교 의과대학", font=font_main_l1, fill=WHITE)

font_main_l2 = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 88)
draw.text((100, 340), "의학교육실", font=font_main_l2, fill=WHITE)

draw.rectangle([100, 470, 220, 474], fill=GOLD)

font_tagline = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 26)
draw.text(
    (100, 498),
    "역량 중심 의학교육으로 좋은 의사를 키웁니다",
    font=font_tagline,
    fill=(220, 230, 245),
)

font_url = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 22)
draw.text((100, 555), "cnumededu.com", font=font_url, fill=GOLD)

out_path = "images/og-image.png"
img.save(out_path, "PNG", optimize=True)
print(f"Saved {out_path}  ({os.path.getsize(out_path) // 1024} KB)")
