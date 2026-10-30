"""Runs the house copy audit (tools/copy-audit/audit.py scoring) over the sayings funnel's own files and data.
Run from frontend/: python3 scripts/funnels/sayings/copy_check.py"""
import glob, importlib.util, json, os, re, sys
FE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..'))
spec = importlib.util.spec_from_file_location('audit', os.path.join(FE, '..', 'tools', 'copy-audit', 'audit.py'))
audit = importlib.util.module_from_spec(spec); spec.loader.exec_module(audit)
files = sorted(glob.glob(os.path.join(FE, 'src/components/funnels/sayings/*.tsx')) + glob.glob(os.path.join(FE, 'src/lib/funnels/sayings/copy-*.ts'))
               + glob.glob(os.path.join(FE, 'src/app/**/vivekananda-quotes/**/*.tsx'), recursive=True) + glob.glob(os.path.join(FE, 'src/app/**/kabir*/**/*.tsx'), recursive=True)
               + glob.glob(os.path.join(FE, 'src/app/hi/chanakya-niti/*.tsx')))
total = 0
for f in files:
    r = audit.score_text(audit.visible_text(open(f, encoding='utf-8').read()))
    bad = {k: v for k, v in r['hits'].items() if v and k != 'vignette'}
    if bad or r['emdash']:
        total += 1
        print('##', os.path.relpath(f, FE), r['index'], r['counts'])
        for k, v in bad.items():
            for h in v[:6]: print('   ', k, '|', h)
D = os.path.join(FE, 'src/content/funnels/sayings')
texts = []
v = json.load(open(os.path.join(D, 'vivekananda.json')))
texts += [l['meaning'].get('en', '') for l in v['lines']] + [c.get('note', {}).get('en', '') for c in v['factChecks']] + [b['note']['en'] for b in v['gitaBridge']]
k = json.load(open(os.path.join(D, 'kabir.json')))
texts += [d['meaning']['en'] for d in k['dohe']]
c = json.load(open(os.path.join(D, 'chanakya.json')))
texts += [x['meaning'].get('en', '') for x in c['verses']] + [n['finding']['en'] for n in c['notSaid']]
r = audit.score_text('\n'.join(t for t in texts if t))
print('## data', r['index'], r['counts'])
for kk, vv in r['hits'].items():
    for h in vv[:8]: print('   ', kk, '|', h)
alltext = ''.join(open(f, encoding='utf-8').read() for f in files) + ''.join(open(p, encoding='utf-8').read() for p in glob.glob(os.path.join(D, '*.json')))
print('exclamation in copy/data:', len(re.findall(r'[^\s=!]!(?!=)', ''.join(texts))))
