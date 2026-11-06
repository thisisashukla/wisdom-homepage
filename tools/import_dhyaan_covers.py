"""Unzip Grok blog covers into public/dhyaan-assets/blog as WebP. Run from the wisdom-homepage folder."""
import io, os, sys, zipfile
from PIL import Image
src = sys.argv[1] if len(sys.argv) > 1 else 'dhyaan-blog-covers.zip'
out = os.path.join('frontend', 'public', 'dhyaan-assets', 'blog')
os.makedirs(out, exist_ok=True)
with zipfile.ZipFile(src) as z:
    for n in z.namelist():
        if not n.endswith('.png'):
            continue
        im = Image.open(io.BytesIO(z.read(n))).convert('RGB')
        if im.width != 1280:
            im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
        dst = os.path.join(out, os.path.basename(n)[:-4] + '.webp')
        im.save(dst, 'WEBP', quality=82, method=6)
        print(dst, im.size, os.path.getsize(dst) // 1024, 'KB')
