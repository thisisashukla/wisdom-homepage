"""
Generates og-image.png (1200×630) for the Wisdom homepage WhatsApp/OG preview.
Layout:
  - Dark maroon gradient background
  - Left half: branding + copy
  - Right half: two app screenshots, tilted, with glow
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os

W, H = 1200, 630
SCREENS_DIR = "/Users/ankurshukla/Documents/wisdom-homepage/assets"
LOGO_PATH  = "/Users/ankurshukla/Documents/wisdom-homepage/assets/male-logo-dark.png"
OUT = "/Users/ankurshukla/Documents/wisdom-homepage/og-image.png"

# ── colours ──────────────────────────────────────────────────────────────────
BG_TOP    = (26,  6,  6)
BG_BOT    = (10,  2,  2)
GOLD      = (200, 136, 30)
GOLD_LITE = (245, 201, 106)
WHITE     = (255, 255, 255)
TEXT_DIM  = (180, 150, 100)
MAROON_MID= (92,  26, 26)

# ── canvas ────────────────────────────────────────────────────────────────────
canvas = Image.new("RGB", (W, H), BG_BOT)

# vertical gradient background
grad = Image.new("RGB", (W, H))
for y in range(H):
    t = y / H
    r = int(BG_TOP[0] * (1-t) + BG_BOT[0] * t)
    g = int(BG_TOP[1] * (1-t) + BG_BOT[1] * t)
    b = int(BG_TOP[2] * (1-t) + BG_BOT[2] * t)
    for x in range(W):
        grad.putpixel((x, y), (r, g, b))
canvas.paste(grad)

# radial glow top-left area
glow = Image.new("RGBA", (W, H), (0,0,0,0))
gd = ImageDraw.Draw(glow)
for i in range(120, 0, -1):
    alpha = int(55 * (i / 120) ** 2)
    gd.ellipse([(40-i*3, -80-i*2), (40+i*3, -80+i*4)], fill=(*GOLD, alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), glow).convert("RGB")

draw = ImageDraw.Draw(canvas)

# ── fonts ─────────────────────────────────────────────────────────────────────
def font(size, bold=False):
    """Try system fonts, fall back gracefully."""
    candidates = []
    if bold:
        candidates = [
            "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
            "/Library/Fonts/Georgia Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
    else:
        candidates = [
            "/System/Library/Fonts/Supplemental/Georgia.ttf",
            "/Library/Fonts/Georgia.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

f_eyebrow  = font(18)
f_title1   = font(68, bold=True)
f_title2   = font(68, bold=True)
f_sub      = font(22)
f_tag      = font(17)
f_badge    = font(20, bold=True)

# ── left column: text ─────────────────────────────────────────────────────────
LX = 68

# ── logo mark ─────────────────────────────────────────────────────────────────
LOGO_SIZE = 72
logo_raw = Image.open(LOGO_PATH).convert("RGBA").resize((LOGO_SIZE, LOGO_SIZE), Image.LANCZOS)
# circular mask
logo_mask = Image.new("L", (LOGO_SIZE, LOGO_SIZE), 0)
ImageDraw.Draw(logo_mask).ellipse([0, 0, LOGO_SIZE-1, LOGO_SIZE-1], fill=255)
logo_circ = Image.new("RGBA", (LOGO_SIZE, LOGO_SIZE), (0,0,0,0))
logo_circ.paste(logo_raw, mask=logo_mask)
# gold ring
ring = Image.new("RGBA", (LOGO_SIZE, LOGO_SIZE), (0,0,0,0))
ImageDraw.Draw(ring).ellipse([0, 0, LOGO_SIZE-1, LOGO_SIZE-1],
                              fill=None, outline=(*GOLD, 160), width=2)
logo_circ = Image.alpha_composite(logo_circ, ring)
canvas.paste(logo_circ, (LX, 72), logo_circ)

# eyebrow pill
eyebrow_text = "BHAGAVAD GITA & ANCIENT SCRIPTURES"
eb_w = draw.textlength(eyebrow_text, font=f_eyebrow)
pill_pad = 14
ey_x = LX + LOGO_SIZE + 14
ey_y = 84
pill_rect = [ey_x, ey_y, ey_x + eb_w + pill_pad*2, ey_y + 32]
draw.rounded_rectangle(pill_rect, radius=16, fill=(60, 20, 0, 200), outline=(*GOLD, 100))
draw.ellipse([ey_x + pill_pad - 4, ey_y + 13, ey_x + pill_pad + 4, ey_y + 21], fill=GOLD)
draw.text((ey_x + pill_pad + 10, ey_y + 7), eyebrow_text, font=f_eyebrow, fill=GOLD_LITE)

# headline line 1
draw.text((LX, 158), "Ancient wisdom.", font=f_title1, fill=GOLD_LITE)
# headline line 2
draw.text((LX, 230), "Your daily practice.", font=f_title2, fill=WHITE)

# sub copy
sub_lines = [
    "One shloka a day, personalised to your",
    "spiritual path — with Sanskrit text,",
    "deeper meaning & space to reflect.",
]
sy = 328
for line in sub_lines:
    draw.text((LX, sy), line, font=f_sub, fill=TEXT_DIM)
    sy += 34

# tags row
tags = ["Self-Realization", "Karma & Action", "Detachment", "Peace"]
tx = LX
ty = 448
for tag in tags:
    tw = draw.textlength(tag, font=f_tag)
    draw.rounded_rectangle([tx-1, ty-1, tx + tw + 22, ty + 29], radius=14,
                            fill=(50,15,0), outline=(*GOLD, 80))
    draw.text((tx + 11, ty + 3), tag, font=f_tag, fill=GOLD_LITE)
    tx += tw + 36

# "Free to download" badge
badge_text = "Free to download on the App Store"
bw = draw.textlength(badge_text, font=f_badge)
bx, by = LX, 516
draw.rounded_rectangle([bx, by, bx + bw + 32, by + 42], radius=21,
                        fill=GOLD, outline=(0,0,0,0))
draw.text((bx + 16, by + 11), badge_text, font=f_badge, fill=(26,6,6))

# divider line between columns
draw.line([(560, 60), (560, H-60)], fill=(200,136,30,40), width=1)

# ── right column: phone screenshots ──────────────────────────────────────────
screen_files = [
    os.path.join(SCREENS_DIR, "IMG_6942.PNG"),   # main shloka feed
    os.path.join(SCREENS_DIR, "IMG_6946.PNG"),   # deeper meaning
]

PHONE_W = 210   # display width per phone
RX_CENTER = 880  # horizontal centre of right column

def rounded_phone(img_path, display_w, angle, shadow=True):
    """Load a screenshot, resize, round corners, optionally rotate."""
    img = Image.open(img_path).convert("RGBA")
    aspect = img.height / img.width
    display_h = int(display_w * aspect)
    img = img.resize((display_w, display_h), Image.LANCZOS)

    # round corners
    mask = Image.new("L", (display_w, display_h), 0)
    md = ImageDraw.Draw(mask)
    r = int(display_w * 0.12)
    md.rounded_rectangle([0, 0, display_w-1, display_h-1], radius=r, fill=255)
    img.putalpha(mask)

    # subtle gold border overlay
    border_img = Image.new("RGBA", (display_w, display_h), (0,0,0,0))
    bd = ImageDraw.Draw(border_img)
    bd.rounded_rectangle([0, 0, display_w-1, display_h-1], radius=r,
                          fill=None, outline=(200,136,30,90), width=2)
    img = Image.alpha_composite(img, border_img)

    # rotate
    img = img.rotate(angle, expand=True, resample=Image.BICUBIC)
    return img

phone_left  = rounded_phone(screen_files[0], PHONE_W, angle=6)
phone_right = rounded_phone(screen_files[1], PHONE_W, angle=-6)

# shadow helper
def drop_shadow(size, blur=18, color=(0,0,0)):
    sh = Image.new("RGBA", (size[0]+blur*2, size[1]+blur*2), (0,0,0,0))
    core = Image.new("RGBA", size, (*color, 160))
    sh.paste(core, (blur, blur))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    return sh

# place left phone (slightly behind)
lx = RX_CENTER - PHONE_W // 2 - 55
ly = H // 2 - phone_left.height // 2 + 10
sh_l = drop_shadow(phone_left.size, blur=22)
canvas.paste(sh_l, (lx - 22, ly - 22), sh_l)
canvas.paste(phone_left, (lx, ly), phone_left)

# place right phone (slightly in front / overlap)
rx = RX_CENTER - PHONE_W // 2 + 70
ry = H // 2 - phone_right.height // 2 - 10
sh_r = drop_shadow(phone_right.size, blur=22)
canvas.paste(sh_r, (rx - 22, ry - 22), sh_r)
canvas.paste(phone_right, (rx, ry), phone_right)

# ── subtle bottom vignette ────────────────────────────────────────────────────
vig = Image.new("RGBA", (W, H), (0,0,0,0))
vd = ImageDraw.Draw(vig)
for i in range(80):
    alpha = int(120 * (i / 80) ** 2)
    vd.rectangle([0, H-i-1, W, H-i], fill=(0,0,0,alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), vig).convert("RGB")

# ── save ──────────────────────────────────────────────────────────────────────
canvas.save(OUT, "PNG", optimize=True)
print(f"Saved: {OUT}  ({W}×{H})")
