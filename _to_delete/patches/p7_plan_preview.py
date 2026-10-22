"""p7: replace the three-notes section with the plan preview; honest 'starting with the Gita' copy;
ASK labels that match what the backend plans for. Idempotent. Usage: python3 p7_plan_preview.py <frontend dir> <assets dir>"""
import os, re, shutil, sys

FE, ASSETS = sys.argv[1], sys.argv[2]
P = lambda *a: os.path.join(FE, 'src', *a)

def edit(path, pairs, must=True):
    s = open(path, encoding='utf-8').read()
    o = s
    for old, new in pairs:
        if new in s and old not in s:
            continue
        assert (old in s) or not must, f'{path}: missing {old[:70]!r}'
        s = s.replace(old, new)
    if s != o:
        open(path, 'w', encoding='utf-8').write(s)
        print('edited', path)

# new files
shutil.copy(os.path.join(ASSETS, 'samplePlans.ts'), P('lib', 'samplePlans.ts'))
shutil.copy(os.path.join(ASSETS, 'PlanPreview.tsx'), P('components', 'funnel', 'PlanPreview.tsx'))

# css
css = P('app', 'home-v3.css')
s = open(css, encoding='utf-8').read()
if 'Plan preview (section 2)' not in s:
    open(css, 'a', encoding='utf-8').write(open(os.path.join(ASSETS, 'plan-preview.css'), encoding='utf-8').read())
    print('appended plan-preview.css')

# page.tsx
page = P('app', 'page.tsx')
s = open(page, encoding='utf-8').read()
if 'home_plan_preview' not in s:
    a = s.index('      {/* ── ONE VERSE, THREE NOTES (real output) ── */}')
    b = s.index('      {/* ── SEVEN DAYS (plan + offer) ── */}')
    s = s[:a] + '''      {/* ── PLAN PREVIEW: pick a situation, see the real week, create yours ── */}
      <section className="section" id="plans" data-mp-section="home_plan_preview">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Real plans</div>
            <h2 className="heading">Pick one. See all <em>seven days.</em></h2>
          </div>
          <div className="rv">
            <PlanPreview />
          </div>
        </div>
      </section>

''' + s[b:]
    a = s.index('// Unedited output of POST /api/v1/recommend/depth')
    b = s.index('const BLOGS = [')
    s = s[:a] + s[b:]
    s = s.replace("import YourVerse from '@/components/funnel/YourVerse'\n",
                  "import YourVerse from '@/components/funnel/YourVerse'\nimport PlanPreview from '@/components/funnel/PlanPreview'\n")
    open(page, 'w', encoding='utf-8').write(s)
    print('edited', page)
edit(page, [
    ('Seven verses from the Gita, picked for your situation and explained for your life. One a day.',
     'Seven verses picked for your situation, starting with the Gita. Each one explained for your life.'),
    ('Or get seven Gita verses picked for your situation, one a day.',
     'Or get a 7-day reading plan for your situation, starting with the Gita.'),
    ("Day 7 is a story from the Gita, the Ramayana or the Mahabharata.",
     "Day 7 is a story from the Ramayana, the Mahabharata or the Yoga Vasishtha."),
])

# ASK labels: the backend plans "didnt_work_out" as something that failed, and "partner" as a relationship

# YourVerse: accept a situation from the preview's button; honest share text
yv = P('components', 'funnel', 'YourVerse.tsx')
edit(yv, [
    ('Seven Gita verses picked for your situation, one a day: ${url}',
     'A 7-day reading plan for your situation, starting with the Gita: ${url}'),
])
s = open(yv, encoding='utf-8').read()
if 'yv:choose' not in s:
    anchor = '  const signIn = async () => {'
    s = s.replace(anchor, '''  // The plan preview's button hands over a situation: answer the question for them.
  const chooseRef = useRef(choose)
  chooseRef.current = choose
  useEffect(() => {
    if (source !== 'hero') return
    const onChoose = (e: Event) => {
      const id = (e as CustomEvent<{ ask?: string }>).detail?.ask
      if (id) chooseRef.current(id)
    }
    window.addEventListener('yv:choose', onChoose)
    return () => window.removeEventListener('yv:choose', onChoose)
  }, [source])

''' + anchor, 1)
    open(yv, 'w', encoding='utf-8').write(s)
    print('edited', yv)

edit(P('components', 'funnel', 'VerseFunnelCTA.tsx'), [
    ("head: 'Seven Gita verses, picked for your situation and explained for your life.',",
     "head: 'Seven verses picked for your situation, starting with the Gita. Each one explained for your life.',"),
    ("head: 'गीता के सात श्लोक, आपकी स्थिति के लिए चुने और आपके जीवन के लिए समझाए गए।',",
     "head: 'आपकी स्थिति के लिए चुने गए सात श्लोक, गीता से शुरू। हर एक आपके जीवन के लिए समझाया गया।',"),
])

# ASK: each answer carries the phrase the plan is "for", so the echo reads naturally
app = P('lib', 'app.ts')
s = open(app, encoding='utf-8').read()
if 'about?: string' not in s:
    s = s.replace("export type AskOption = { id: string; label: string; feeling: FeelingId; situation?: string }",
                  "export type AskOption = { id: string; label: string; feeling: FeelingId; situation?: string; about?: string }")
    a = s.index('export const ASK: AskOption[] = [')
    b = s.index('\n]', a) + 2
    s = s[:a] + """export const ASK: AskOption[] = [
  { id: 'overthinking', label: 'Overthinking', feeling: 'quiet', situation: 'overthinking', about: 'overthinking' },
  { id: 'result', label: "It didn't work out", feeling: 'nerve', situation: 'didnt_work_out', about: "something that didn't work out" },
  { id: 'boss', label: 'My boss', feeling: 'replay', situation: 'boss', about: 'trouble with your boss' },
  { id: 'breakup', label: 'My relationship', feeling: 'replay', situation: 'partner', about: 'your relationship' },
  { id: 'family', label: 'Family or in-laws', feeling: 'replay', situation: 'in_laws', about: 'family or in-laws' },
  { id: 'lost', label: 'Someone I lost', feeling: 'faith', situation: 'someone_lost', about: 'someone you lost' },
  { id: 'compare', label: "Everyone's ahead of me", feeling: 'nerve', situation: 'everyone_ahead', about: 'feeling everyone is ahead of you' },
  { id: 'sleep', label: "Can't sleep", feeling: 'quiet', situation: 'cant_sleep', about: "nights you can't sleep" },
  { id: 'home', label: 'Far from home', feeling: 'faith', situation: 'far_from_home', about: 'being far from home' },
  { id: 'else', label: 'Something else', feeling: 'replay' },
]""" + s[b:]
    open(app, 'w', encoding='utf-8').write(s)
    print('edited', app)
edit(yv, [
    ("setAnswer(a.id === 'else' ? null : a.label)", "setAnswer(a.about ?? null)"),
    ("{(answer ?? situationById(situation)?.label ?? 'what is weighing on you').toLowerCase()}",
     "{answer ?? (situationById(situation)?.label ?? 'what is weighing on you').toLowerCase()}"),
])
print('p7 done')
