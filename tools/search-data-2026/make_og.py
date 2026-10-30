"""OG image for /most-searched-gita-verses-2026 (1200x630 webp).

python3 make_og.py <chapter4.webp> <new-light-logo.webp> <PlayfairDisplay.ttf> <PlayfairDisplay-Italic.ttf> <out.webp>
Fonts: Playfair Display (Google Fonts, OFL) and Inter.
"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

bg_path, logo_path, pf_path, pfi_path, out = sys.argv[1:6]
INTER = '/usr/share/fonts/opentype/inter/Inter-Regular.otf'
INTER_SB = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
W, H = 1200, 630
GOLD, GOLD_L, CREAM, DIM = (196, 134, 28), (245, 201, 106), (253, 243, 220), (200, 180, 150)
BLUE = (107, 127, 214)


def pf(size, italic=False, weight='Bold'):
    f = ImageFont.truetype(pfi_path if italic else pf_path, size)
    f.set_variation_by_name(weight)
    return f


bg = Image.open(bg_path).convert('RGB')
scale = max(W / bg.width, H / bg.height)
bg = bg.resize((int(bg.width * scale), int(bg.height * scale)), Image.LANCZOS)
bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 3, (bg.width - W) // 2 + W, (bg.height - H) // 3 + H))
bg = bg.filter(ImageFilter.GaussianBlur(2))

shade = Image.new('L', (W, H))
d = ImageDraw.Draw(shade)
for x in range(W):
    d.line([(x, 0), (x, H)], fill=int(250 - 70 * (x / W)))
canvas = Image.composite(Image.new('RGB', (W, H), (18, 5, 5)), bg, shade)
draw = ImageDraw.Draw(canvas)

x0 = 72
draw.text((x0, 92), 'SEARCH DATA · 2026', font=ImageFont.truetype(INTER_SB, 20), fill=GOLD_L, spacing=4)
draw.text((x0, 128), 'The Gita verses', font=pf(64), fill=CREAM)
draw.text((x0, 202), 'people searched most', font=pf(64, italic=True, weight='Italic'), fill=GOLD_L)
draw.line([(x0, 300), (x0 + 110, 300)], fill=GOLD, width=2)
draw.text((x0, 322), 'Google search interest for 42 famous verses,', font=ImageFont.truetype(INTER, 24), fill=DIM)
draw.text((x0, 354), 'January to October 2026', font=ImageFont.truetype(INTER, 24), fill=DIM)

# Mini ranking (worldwide index, 2.47 = 100)
rows = [('4.7', 'Yada yada hi dharmasya', 120), ('2.47', 'Karmanye vadhikaraste', 100), ('11.32', 'Now I am become death', 88), ('4.8', 'Sambhavami yuge yuge', 24)]
bx, by, bw = 690, 112, 420
lab = ImageFont.truetype(INTER_SB, 19)
sub = ImageFont.truetype(INTER, 17)
for i, (ref, line, val) in enumerate(rows):
    y = by + i * 96
    draw.text((bx, y), ref, font=lab, fill=GOLD_L)
    draw.text((bx + 64, y + 1), line, font=sub, fill=CREAM)
    w = int(bw * val / 120)
    draw.rounded_rectangle([bx, y + 34, bx + w, y + 52], radius=4, fill=GOLD)
    draw.rectangle([bx, y + 34, bx + 4, y + 52], fill=GOLD)
    draw.text((bx + w + 10, y + 32), str(val), font=lab, fill=CREAM)
draw.text((bx, by + 4 * 96 - 6), 'Index: 2.47 = 100, worldwide', font=ImageFont.truetype(INTER, 15), fill=DIM)

logo = Image.open(logo_path).convert('RGBA')
logo.thumbnail((44, 44))
canvas.paste(logo, (x0, 548), logo)
draw.text((x0 + 56, 552), 'Wisdom', font=pf(28), fill=GOLD_L)
draw.text((W - 72, 560), 'wisdomquotes.in', font=ImageFont.truetype(INTER, 19), fill=DIM, anchor='ra')

canvas.save(out, 'WEBP', quality=86)
print(out)
