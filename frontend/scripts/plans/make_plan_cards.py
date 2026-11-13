#!/usr/bin/env python3
"""
Plan pictures for the reading-plan cluster (1200x630 WebP): the plan drawn on the verse map, with its
title. Used as the hub cards (lib/readingPlans.ts LENGTH_PLANS.img), the OG images of the new plan
pages, and the image entries in /sitemap-plans.xml.

The map is taken from the live page (the same VerseMap the reader sees), so the picture always matches
the plan data. Run against a dev server:

    npx next dev -p 3000          (in frontend/)
    pip install playwright pillow && playwright install chromium
    python3 scripts/plans/make_plan_cards.py [--base http://localhost:3000] [--chrome /path/to/chrome]

Writes public/og/*.webp and public/plans/*.webp. Fonts come from Google Fonts (Playfair Display, Inter),
the site's display and UI faces.
"""
import argparse
import io
import os
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

# (source page whose map to use, output file, title, subline, the plan's facts)
CARDS = [
    ('/bhagavad-gita-in-30-days', 'og/bhagavad-gita-in-30-days.webp', 'The Bhagavad Gita in 30 days', 'All 700 verses, a few minutes each morning.', ['30 days', '3 to 6 min a day']),
    ('/bhagavad-gita-in-7-days', 'og/bhagavad-gita-in-7-days.webp', 'The Bhagavad Gita in 7 days', 'The whole story in seven verses, one a day.', ['7 days', '3 min a day']),
    ('/bhagavad-gita-one-verse-a-day', 'og/bhagavad-gita-one-verse-a-day.webp', 'The Bhagavad Gita, one verse a day', 'Thirty mornings, in the order they come.', ['30 mornings', '1 min a day']),
    ('/how-to-read-bhagavad-gita', 'og/how-to-read-bhagavad-gita.webp', 'How to read the Bhagavad Gita', 'Where to start, how long it takes, and a plan for your time.', ['18 chapters', '700 verses']),
    ('/reading-plans', 'og/reading-plans.webp', 'Bhagavad Gita reading plans', 'A week, a month, a chapter a day, or one verse each morning.', ['Free', 'Sanskrit and English']),
]

# Map-only pictures for the hub and "more plans" cards (16:9): (source page, output, chapter to ring)
MAPS = [
    ('/bhagavad-gita-one-verse-a-day', 'plans/bhagavad-gita-one-verse-a-day-plan.webp', None),
    ('/bhagavad-gita-in-7-days', 'plans/bhagavad-gita-7-day-reading-plan.webp', None),
    ('/bhagavad-gita-in-30-days', 'plans/bhagavad-gita-30-day-reading-plan.webp', None),
    ('/reading-plans', 'plans/bhagavad-gita-18-day-reading-plan.webp', None),
    ('/reading-plans', 'plans/gita-jayanti-reading-plan.webp', 18),
]

MAP_CSS = """
  .vm-ch { font: 600 9px/1 Georgia, serif; fill: rgba(245,232,204,.35); }
  .vm-row.is-focus .vm-ch { fill: #e0884f; }
  .vm-d { fill: rgba(245,232,204,.04); stroke: rgba(245,232,204,.16); stroke-width: .9; }
  .vm-a { fill: rgba(245,201,106,.16); stroke: rgba(245,201,106,.72); }
  .vm-b { fill: rgba(245,232,204,.03); stroke: rgba(245,232,204,.3); }
  .vm-p { opacity: 0; }
  .vm-row.is-focus .vm-d { stroke: #e0884f; fill: rgba(224,136,79,.2); }
  .vm-halo { fill: rgba(245,201,106,.1); stroke: rgba(245,201,106,.42); stroke-width: .8; }
  .vm-core { fill: #f5c96a; }
  .vm-n { font: 600 7.5px/1 sans-serif; fill: #f5c96a; text-anchor: middle; }
"""

MAP_TEMPLATE = """<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 675px; }
  body { background: #120505; overflow: hidden; position: relative; display: grid; place-items: center; }
  .glow { position: absolute; inset: 0; background: radial-gradient(60% 70% at 60% 30%, rgba(200,136,30,.15), rgba(0,0,0,0) 70%), radial-gradient(45% 55% at 0% 0%, rgba(92,26,26,.5), rgba(0,0,0,0) 70%); }
  .map { position: relative; width: 640px; }
  .map svg { display: block; width: 100%; height: auto; }
  __MAPCSS__
</style></head><body><div class="glow"></div><div class="map">__SVG__</div></body></html>"""


TEMPLATE = """<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@600&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body { background: #120505; color: #f5e8cc; font-family: Inter, sans-serif; overflow: hidden; position: relative; }
  .glow { position: absolute; inset: 0; background: radial-gradient(55% 60% at 78% 35%, rgba(200,136,30,.16), rgba(0,0,0,0) 70%), radial-gradient(45% 55% at 0% 0%, rgba(92,26,26,.55), rgba(0,0,0,0) 70%); }
  .wrap { position: relative; display: grid; grid-template-columns: 430px 1fr; gap: 48px; height: 100%; padding: 64px 64px 56px; align-items: center; }
  .brand { display: flex; align-items: center; gap: 12px; font: 600 22px/1 'Playfair Display', serif; color: #f5c96a; margin-bottom: 40px; }
  .brand img { width: 40px; height: 40px; border-radius: 50%; }
  h1 { font: 600 52px/1.08 'Playfair Display', serif; color: #fff; letter-spacing: -0.005em; }
  p { margin-top: 20px; font-size: 23px; line-height: 1.45; color: rgba(245,232,204,.72); text-wrap: balance; }
  h1, p { text-wrap: balance; }
  .facts { display: flex; gap: 10px; margin-top: 30px; flex-wrap: wrap; }
  .facts span { font-size: 17px; padding: 8px 16px; border: 1px solid rgba(200,136,30,.35); border-radius: 999px; color: rgba(245,232,204,.8); }
  .map { padding: 26px 26px 22px; border-radius: 22px; border: 1px solid rgba(245,201,106,.18); background: radial-gradient(120% 120% at 70% 0%, rgba(245,201,106,.07), rgba(0,0,0,0) 60%), rgba(0,0,0,.25); }
  .map svg { display: block; width: 100%; height: auto; }
  .vm-ch { font: 600 9px/1 'Playfair Display', serif; fill: rgba(245,232,204,.35); }
  .vm-row.is-focus .vm-ch { fill: #e0884f; }
  .vm-d { fill: rgba(245,232,204,.04); stroke: rgba(245,232,204,.16); stroke-width: .9; }
  .vm-a { fill: rgba(245,201,106,.16); stroke: rgba(245,201,106,.72); }
  .vm-b { fill: rgba(245,232,204,.03); stroke: rgba(245,232,204,.3); }
  .vm-p { opacity: 0; }
  .vm-row.is-focus .vm-d { stroke: rgba(224,136,79,.85); }
  .vm-halo { fill: rgba(245,201,106,.1); stroke: rgba(245,201,106,.42); stroke-width: .8; }
  .vm-core { fill: #f5c96a; }
  .vm-n { font: 600 7.5px/1 Inter, sans-serif; fill: #f5c96a; text-anchor: middle; }
</style></head><body><div class="glow"></div>
<div class="wrap"><div>
  <div class="brand"><img src="__BASE__/assets/new-light-logo.webp" alt="">Wisdom</div>
  <h1>__TITLE__</h1><p>__SUB__</p><div class="facts">__FACTS__</div>
</div><div class="map">__SVG__</div></div></body></html>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='http://localhost:3000')
    ap.add_argument('--chrome', default=os.environ.get('CHROME_PATH'))
    a = ap.parse_args()
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=a.chrome, args=['--no-sandbox']) if a.chrome else p.chromium.launch()
        page = b.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
        maps = {}
        for src, *_ in CARDS:
            if src in maps:
                continue
            page.goto(a.base + src, wait_until='networkidle', timeout=180000)
            svg = page.eval_on_selector('.vm svg', 'e => e.outerHTML')
            if not svg:
                sys.exit(f'no verse map on {src}')
            maps[src] = svg
        for src, out, title, sub, facts in CARDS:
            html = (TEMPLATE.replace('__BASE__', a.base).replace('__TITLE__', title).replace('__SUB__', sub)
                    .replace('__FACTS__', ''.join(f'<span>{f}</span>' for f in facts)).replace('__SVG__', maps[src]))
            page.set_content(html, wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            png = page.screenshot(type='png')
            path = os.path.join(ROOT, 'public', out)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            Image.open(io.BytesIO(png)).convert('RGB').save(path, 'WEBP', quality=86, method=6)
            print('wrote', out, os.path.getsize(path) // 1024, 'KB')
        page.set_viewport_size({'width': 1200, 'height': 675})
        for src, out, ring in MAPS:
            svg = maps.get(src)
            if svg is None:
                page.goto(a.base + src, wait_until='networkidle', timeout=180000)
                svg = maps[src] = page.eval_on_selector('.vm svg', 'e => e.outerHTML')
            if ring:
                parts = svg.split('class="vm-row')
                parts[ring] = ' is-focus' + parts[ring]
                svg = 'class="vm-row'.join(parts)
            page.set_content(MAP_TEMPLATE.replace('__MAPCSS__', MAP_CSS).replace('__SVG__', svg), wait_until='load')
            png = page.screenshot(type='png')
            path = os.path.join(ROOT, 'public', out)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            Image.open(io.BytesIO(png)).convert('RGB').save(path, 'WEBP', quality=86, method=6)
            print('wrote', out, os.path.getsize(path) // 1024, 'KB')
        b.close()


if __name__ == '__main__':
    main()
