"""Run the house copy audit (tools/copy-audit/audit.py scoring) over the Mahabharata funnel files and data.
Run from frontend/: python3 scripts/funnels/mahabharata/audit_mbh.py"""
import glob, importlib.util, json, os

FE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
spec = importlib.util.spec_from_file_location('audit', os.path.join(FE, '..', 'tools', 'copy-audit', 'audit.py'))
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

files = sorted(
    glob.glob(os.path.join(FE, 'src/app/mahabharata/**/*.tsx'), recursive=True)
    + glob.glob(os.path.join(FE, 'src/app/hi/mahabharata/**/*.tsx'), recursive=True)
    + glob.glob(os.path.join(FE, 'src/components/funnels/mahabharata/*.tsx'))
    + glob.glob(os.path.join(FE, 'src/lib/funnels/mahabharata/*.ts'))
)
total = 0
for f in files:
    r = audit.score_text(audit.visible_text(open(f, encoding='utf8').read()))
    hits = {k: v for k, v in r['hits'].items() if v and k != 'vignette'}
    total += sum(len(v) for v in hits.values()) + r['emdash']
    print(f"{os.path.relpath(f, FE):70} words={r['words']:5} index={r['index']:5} em={r['emdash']}")
    for k, v in hits.items():
        for h in v:
            print(f'    [{k}] {h}')

d = json.load(open(os.path.join(FE, 'src/content/funnels/mahabharata/lines.json'), encoding='utf8'))
cards = json.load(open(os.path.join(FE, 'src/content/funnels/mahabharata/cards.json'), encoding='utf8'))
txt = '\n'.join(x for l in d['lines'] for x in (l['en'], l.get('context') or '', l.get('note') or '') if x)
txt += '\n' + '\n'.join(c['meaning']['en'] for c in cards)
r = audit.score_text(txt)
print(f"{'lines.json + cards.json':70} words={r['words']:5} index={r['index']:5} em={r['emdash']}")
for k, v in r['hits'].items():
    if k == 'vignette':
        continue
    for h in v:
        print(f'    [{k}] {h}')
