#!/usr/bin/env python3
"""Copy audit: automated slop metrics for wisdom-homepage.

usage: python3 tools/copy-audit/audit.py [--save NAME] [--compare NAME] [--page SUBSTR] [--hits CLASS]
Run from the repo root. Scores visible text of every page/component and the verse JSON fields.
See RUBRIC.md for what the numbers mean and the pass thresholds.
"""
import re, os, sys, json, glob, argparse, collections

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FE = os.path.join(ROOT, 'frontend')
OUT = os.path.join(os.path.dirname(__file__), 'runs')

PAGES = {
    'home': 'src/app/page.tsx',
    'home-plans': 'src/lib/samplePlans.ts',
    'home-funnel': ['src/components/funnel/HeroPlanCTA.tsx', 'src/components/funnel/CreatePlanLink.tsx',
                    'src/components/funnel/PlanPreview.tsx', 'src/components/funnel/DevicePlans.tsx'],
    'home-schema': 'src/lib/homeSchemas.ts',
    'app': 'src/app/app/page.tsx',
    'about': 'src/app/about/page.tsx',
    'methodology': 'src/app/methodology/page.tsx',
    'gita-index': 'src/app/gita/page.tsx',
    'gita-today': 'src/app/gita/today/page.tsx',
    'gita-for': ['src/app/gita-for/page.tsx', 'src/app/gita-for/[slug]/page.tsx', 'src/lib/gitaFor.ts'],
    'verse-template': 'src/app/gita/chapter/[chapter]/verse/[verse]/page.tsx',
    'hi-index': ['src/app/hi/gita/page.tsx', 'src/app/hi/gita/today/page.tsx'],
    'blog-cta': 'src/components/funnel/VerseFunnelCTA.tsx',
    'onboarding': sorted(glob.glob(os.path.join(FE, 'src/components/onboarding/*.tsx'))) + ['src/lib/onboarding/profile.ts'],
    'blogs-index': 'src/app/blogs/page.tsx',
    'gita-jayanti': ['src/app/gita-jayanti/page.tsx', 'src/components/jayanti/JayantiCountdown.tsx',
                     'src/components/jayanti/JayantiStartCTA.tsx', 'src/components/jayanti/ChapterRun.tsx'],
    'jayanti-18-days': ['src/app/read-gita-in-18-days/page.tsx', 'src/lib/jayanti.ts'],
    'jayanti-plan': ['src/app/gita-jayanti/reading-plan/page.tsx', 'src/components/jayanti/PlanFromToday.tsx'],
    'jayanti-which': 'src/app/gita-jayanti/which-chapter-to-read/page.tsx',
    'searched-2026': ['src/app/most-searched-gita-verses-2026/page.tsx', 'src/components/searched/VerseIndexChart.tsx', 'src/components/searched/WeeklyChart.tsx'],
    'jayanti-related': 'src/components/jayanti/JayantiRelated.tsx',
}
for p in sorted(glob.glob(os.path.join(FE, 'src/app/blogs/*/page.tsx'))):
    PAGES['blog/' + p.split('/')[-2]] = p

BANNED = r"unlock|journey|elevat\w*|holistic|transform\w*|seekers?|purport|divine guidance|ancient wisdom|timeless|5,?000 years|five thousand years|profound\w*|delv\w+|embark|empower\w*|curat\w+|seamless|ai-powered|wellness|mindful\w*|whatever you(?:'|&apos;|’)re carrying|not just\b|more than just"
CLASSES = {
    # weight, regex (applied per sentence or whole text)
    'superlative': (3, r"\b(the|its|his) most (?!of\b|people\b|common\b|likely\b)\w+ (verse|verses|chapter|line|text|teaching|passage|mantra|sentence|image|moment|statement|claim|section|book)\b|\bmost[- ]quoted\b|no (other|equivalent)\b|\bany (other )?(scripture|tradition|religion|sacred text|wisdom literature|text)\b|changes everything|reframes everything|\bon earth\b|\bin the world\b|in (all|the history of) |of all time|\bin history\b|every educated|never been wrong"),
    'banned': (2, r"\b(" + BANNED + r")"),
    'intensifier': (1, r"\b(actually|quietly|deeply|truly|profoundly|precisely|remarkabl\w+|extraordinar\w+|devastating|staggering|breathtaking|surgical|radical\w*|powerful|perfect(ly)?|genius|ruthless)\b"),
    'clinical': (2, r"\b(clinical\w*|nervous system|neural|therapeutic|co-regulation|rumination|cognitive|vasoconstriction|self-compassion|emotional (intelligence|resilience)|holds? space|psycholog\w+)\b"),
    'vignette': (1, r"\b(phone|scroll\w*|email|inbox|notification\w*|2 ?a\.?m|3 ?a\.?m|whatsapp|slack|refresh\w*)\b"),
    'formula': (2, r"here(?:'|&apos;|’)s (what|why|the|how)|the (truth|reality) is\b|\blet(?:'|&apos;|’)s (explore|dive|look|unpack|break)|what you think|the answer might|in essence|at its (core|heart)|key takeaway|why (this|it) (matters|still matters)|that(?:'|&apos;|’)s the whole|everything else is (commentary|elaboration)"),
}
SENT_SPLIT = re.compile(r'(?<=[.!?])\s+(?=[A-Z"“‘\'])')

def visible_text(t):
    t = re.sub(r'\{/\*.*?\*/\}', '', t, flags=re.S)
    t = re.sub(r'/\*.*?\*/', '', t, flags=re.S)
    t = re.sub(r'(^|[^:"\'])//[^\n]*', r'\1', t)
    t = re.sub(r'^import .*$', '', t, flags=re.M)
    t = re.sub(r'style=\{\{.*?\}\}', '', t, flags=re.S)
    t = re.sub(r'(className|href|src|data-[\w-]+|aria-[\w-]+|id|key|role|target|rel|loading|type|campaign|location|pageName|refTag)=("[^"]*"|\{[^{}]*\})', '', t)
    out = []
    for m in re.finditer(r'>([^<>{}]*[A-Za-z][^<>{}]*)<', t):
        s = re.sub(r'\s+', ' ', m.group(1)).strip()
        if len(s) > 2: out.append(s)
    for m in re.finditer(r'(["\'`])((?:(?!\1)[^\\\n]|\\.){12,}?)\1', t):
        s = m.group(2)
        if ' ' in s and not re.search(r'[{};=]|^\s*[\w-]+:\s|\bvar\(|px\b|rgba|@media|cubic-bezier|https?://\S+$', s):
            out.append(s)
    seen, res = set(), []
    for s in out:
        s = s.replace('&apos;', "'").replace('&rsquo;', '’').replace('&mdash;', '—').replace('&ldquo;', '“').replace('&rdquo;', '”').replace('&amp;', '&').replace('&quot;', '"')
        if s not in seen: seen.add(s); res.append(s)
    return '\n'.join(res)

def score_text(txt):
    words = max(1, len(re.findall(r"[A-Za-z][A-Za-z'’-]*", txt)))
    hits = collections.defaultdict(list)
    for k, (w, rx) in CLASSES.items():
        for m in re.finditer(rx, txt, flags=re.I):
            a, b = max(0, m.start() - 50), min(len(txt), m.end() + 50)
            hits[k].append(txt[a:b].replace('\n', ' '))
    sents = []
    for line in txt.split('\n'):
        sents += [s.strip() for s in SENT_SPLIT.split(line) if s.strip()]
    for i in range(len(sents) - 1):
        s1, s2 = sents[i], sents[i + 1]
        if re.search(r"\bnot\b|n['’]t\b", s1) and len(s1.split()) <= 22 and re.match(r"(It|This|That|They|He|She|Krishna|Guilt|Grief|The \w+)\b", s2) and len(s2.split()) <= 25:
            hits['reveal'].append(s1 + ' ' + s2)
    for s in sents:
        if re.search(r"\bnot (a|an|the|about|merely|simply|only|just)?\s?\w+[^.;]{0,40}\bbut\b", s, re.I):
            hits['reveal'].append(s)
    for line in txt.split('\n'):
        ls = [x.strip() for x in SENT_SPLIT.split(line) if x.strip()]
        if len(ls) < 2:
            continue
        run = 0
        for s in ls:
            n = len(s.split())
            if n <= 3 and re.match(r"Not\b", s):
                hits['fragment'].append(s)
            run = run + 1 if n <= 4 else 0
            if run == 3:
                hits['fragment'].append(' '.join(ls))
    em = txt.count('—')
    weights = dict({k: v[0] for k, v in CLASSES.items()}, reveal=3, fragment=3)
    per_k = {k: round(1000 * len(hits[k]) / words, 2) for k in weights}
    index = round(sum(weights[k] * per_k[k] for k in weights) + 0.2 * 1000 * em / words, 1)
    return {'words': words, 'index': index, 'counts': {k: len(hits[k]) for k in weights}, 'emdash': em, 'hits': {k: v for k, v in hits.items()}}

def verse_metrics():
    V = [json.load(open(f)) for f in glob.glob(os.path.join(FE, 'src/content/gita/verses/*.json'))]
    n = len(V)
    def share(field, rx):
        return round(100 * sum(1 for v in V if re.search(rx, v.get(field) or '')) / n, 1)
    def top_opener_share(field, k=3):
        c = collections.Counter(' '.join((v.get(field) or '').split()[:k]) for v in V)
        return round(100 * c.most_common(1)[0][1] / n, 1), c.most_common(1)[0][0]
    allv = ' '.join((v.get('modernRelevance') or '') + ' ' + (v.get('detailedMeaning') or '') + ' ' + (v.get('simpleInsight') or '') + ' ' + (v.get('insight') or '') for v in V)
    return {
        'insight_starts_It_shifts_%': share('insight', r'^It shifts'),
        'insight_top_opener_%': top_opener_share('insight', 2),
        'simpleInsight_There_is_relief_%': share('simpleInsight', r'^There is relief'),
        'simpleInsight_top_opener_%': top_opener_share('simpleInsight', 3),
        'modernRelevance_starts_You_%': share('modernRelevance', r'^You\b'),
        'modernRelevance_about_to_send_or_send_message_%': share('modernRelevance', r'^You (are about to send|send the)'),
        'modernRelevance_ends_This_verse_%': share('modernRelevance', r'(This|The) verse (says|asks|points|reminds|cuts|names)[^.]*\.\s*$'),
        'modernRelevance_phone_vignette_%': share('modernRelevance', CLASSES['vignette'][1]),
        'detailedMeaning_opens_battlefield_%': share('detailedMeaning', r'^On (the )?(battlefield|Kurukshetra|the Kurukshetra)'),
        'commentary_slop_index': score_text(allv)['index'],
    }

def run(args):
    res = {}
    for name, paths in PAGES.items():
        paths = paths if isinstance(paths, list) else [paths]
        txt = '\n'.join(visible_text(open(p if os.path.isabs(p) else os.path.join(FE, p), encoding='utf-8').read()) for p in paths)
        res[name] = score_text(txt)
    res['_verses'] = verse_metrics()
    return res

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--save'); ap.add_argument('--compare'); ap.add_argument('--page'); ap.add_argument('--hits')
    a = ap.parse_args()
    res = run(a)
    os.makedirs(OUT, exist_ok=True)
    if a.save:
        json.dump(res, open(os.path.join(OUT, a.save + '.json'), 'w'), ensure_ascii=False, indent=1)
    base = json.load(open(os.path.join(OUT, a.compare + '.json'))) if a.compare else None
    if a.page and a.hits:
        for k, r in res.items():
            if a.page in k and not k.startswith('_'):
                for h in r['hits'].get(a.hits, []): print(f'[{k}] {h}')
        return
    rows = [(k, r) for k, r in res.items() if not k.startswith('_') and (not a.page or a.page in k)]
    print(f"{'page':48} {'words':>6} {'index':>6} {'base':>6} {'chg%':>6}  rev frg sup ban cli frm  em")
    tot_w = tot_i = tot_b = 0
    for k, r in rows:
        b = base.get(k, {}).get('index') if base else None
        chg = f"{round(100 * (r['index'] - b) / b):+d}" if b else ''
        c = r['counts']
        print(f"{k[:48]:48} {r['words']:6} {r['index']:6} {b if b is not None else '':>6} {chg:>6}  {c['reveal']:3} {c['fragment']:3} {c['superlative']:3} {c['banned']:3} {c['clinical']:3} {c['formula']:3} {r['emdash']:3}")
        tot_w += r['words']; tot_i += r['index'] * r['words']
        if b is not None: tot_b += b * base[k]['words']
    print(f"{'WORD-WEIGHTED SITE INDEX':48} {tot_w:6} {round(tot_i / tot_w, 1):6} {round(tot_b / sum(base[k]['words'] for k, _ in rows if k in base), 1) if base else '':>6}")
    print('\nverse fields:')
    for k, v in res['_verses'].items():
        bv = base['_verses'].get(k) if base else ''
        print(f'  {k:52} {v}   (base {bv})' if base else f'  {k:52} {v}')

if __name__ == '__main__':
    main()
