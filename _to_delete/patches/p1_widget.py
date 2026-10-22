import sys, os
os.chdir(sys.argv[1])
p='lib/app.ts'; s=open(p).read()
if 'export const ASK' not in s:
    s+='''
/**
 * The one question the website asks ("What's keeping you up?"), in the
 * customer's own words (lp/01-icp.md word bank). Each answer carries the
 * backend feeling + situation so one tap is enough.
 */
export type AskOption = { id: string; label: string; feeling: FeelingId; situation?: string }
export const ASK: AskOption[] = [
  { id: 'overthinking', label: 'Overthinking', feeling: 'quiet', situation: 'overthinking' },
  { id: 'result', label: 'Waiting on a result', feeling: 'nerve', situation: 'didnt_work_out' },
  { id: 'boss', label: 'My boss', feeling: 'replay', situation: 'boss' },
  { id: 'breakup', label: 'A breakup', feeling: 'replay', situation: 'partner' },
  { id: 'family', label: 'Family or in-laws', feeling: 'replay', situation: 'in_laws' },
  { id: 'lost', label: 'Someone I lost', feeling: 'faith', situation: 'someone_lost' },
  { id: 'compare', label: "Everyone's ahead of me", feeling: 'nerve', situation: 'everyone_ahead' },
  { id: 'sleep', label: "Can't sleep", feeling: 'quiet', situation: 'cant_sleep' },
  { id: 'home', label: 'Far from home', feeling: 'faith', situation: 'far_from_home' },
  { id: 'else', label: 'Something else', feeling: 'replay' },
]
'''
    open(p,'w').write(s)

p='components/funnel/YourVerse.tsx'; s=open(p).read()
if 'yv-intro' in s:
    print('widget already patched'); sys.exit(0)
def rep(a,b):
    global s
    assert a in s, a[:70]; s=s.replace(a,b)
rep("import {\n  FEELINGS,\n  SITUATIONS,","import {\n  ASK,\n  FEELINGS,")
rep("type Stage = 'pick' | 'gate'","type Stage = 'intro' | 'pick' | 'gate'")
a=s.index("const PRIMARY_SITUATIONS = ["); b=s.index("export default function YourVerse")
s=s[:a]+s[b:]
rep("  const [showAll, setShowAll] = useState(false)\n","")
rep("  const [stage, setStage] = useState<Stage>('pick')","  const [stage, setStage] = useState<Stage>('intro')")
a=s.index("  const chips = useMemo(() => {"); b=s.index("  const props = useCallback(")
s=s[:a]+s[b:]
rep("""    const s = q.get('s')
    if (s && situationById(s)) setSituation(s)
  }, [])""","""    const s = q.get('s')
    if (s && situationById(s)) setSituation(s)
    // Arriving from a "Find my verse" link elsewhere: skip straight to the question.
    const openFromHash = () => {
      if (window.location.hash === '#your-verse') setStage((st) => (st === 'intro' ? 'pick' : st))
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])""")
rep("""  const reveal = () => {
    if (!feeling) return
    trackEvent('Hook Requested', props())
    if (!isIOS && !user) {
      setStage('gate')
      trackEvent('Hook Signin Shown', props())
      return
    }
    void fetchVerse(feeling, situation)
  }""","""  const go = (f: FeelingId, s: string | null) => {
    setFeeling(f)
    setSituation(s)
    trackEvent('Hook Requested', props({ feeling: f, situation: s }))
    if (!isIOS && !user) {
      setStage('gate')
      trackEvent('Hook Signin Shown', props({ feeling: f, situation: s }))
      return
    }
    void fetchVerse(f, s)
  }

  // The hero's one button. With a preset (a /gita-for page or ?s= from a reel) it goes straight to the verse.
  const start = () => {
    trackEvent('Hook Started', props())
    if (feeling || situation) {
      const preset = ASK.find((a) => a.situation === situation)
      go(feeling ?? preset?.feeling ?? 'replay', situation)
      return
    }
    setStage('pick')
  }

  const choose = (id: string) => {
    const a = ASK.find((x) => x.id === id)
    if (!a) return
    trackEvent('Hook Situation Picked', props({ answer: a.id, situation: a.situation ?? null, feeling: a.feeling }))
    go(a.feeling, a.situation ?? null)
  }""")
a=s.index("      {(stage === 'pick' || stage === 'gate' || stage === 'loading' || stage === 'error') && (")
b=s.index("      {stage !== 'pick' && stage !== 'gate' && stage !== 'loading' && stage !== 'error' && result && (")
s=s[:a]+'''      {stage === 'intro' && (
        <div className="yv-intro">
          <button type="button" className="btn-read-gita btn-read-gita-primary yv-go yv-cta" onClick={start}>
            Find my verse
          </button>
          <p className="yv-fine yv-intro-fine">Free. One question, about 30 seconds.</p>
        </div>
      )}

      {stage === 'pick' && (
        <div className="yv-pick">
          <p className="yv-q" id={`yv-q-${source}`}>What&apos;s keeping you up?</p>
          <div className="yv-chips" role="group" aria-labelledby={`yv-q-${source}`}>
            {ASK.map((a, i) => (
              <button
                key={a.id}
                type="button"
                style={{ '--i': i } as React.CSSProperties}
                className={`yv-chip${a.id === 'else' ? ' yv-chip-else' : ''}`}
                onClick={() => choose(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'gate' && (
        <div className="yv-gate">
          <p className="yv-gate-head">Sign in with Google to see your verse.</p>
          <p className="yv-gate-sub">It&apos;s free. We don&apos;t post anything or send you marketing email.</p>
          <button type="button" className="yv-google" onClick={signIn}>
            <GoogleMark />
            Continue with Google
          </button>
          {error && <p className="yv-error" role="alert">{error}</p>}
        </div>
      )}

      {stage === 'loading' && (
        <p className="yv-status" role="status">
          Finding your verse<span className="yv-dots" aria-hidden="true"><i /><i /><i /></span>
        </p>
      )}

      {stage === 'error' && (
        <div className="yv-gate">
          <p className="yv-error" role="alert">{error}</p>
          <button type="button" className="yv-link" onClick={() => setStage('pick')}>Try again</button>
        </div>
      )}

'''+s[b:]
rep("{stage !== 'pick' && stage !== 'gate' && stage !== 'loading' && stage !== 'error' && result && (","{['revealed', 'note', 'paying', 'planning', 'plan'].includes(stage) && result && (")
s=s.replace("  const shownChips = chips\n","")
s=s.replace("<div className={`yv${compact ? ' yv-compact' : ''}`} ref={rootRef} id=\"your-verse\" data-mp-section={`your_verse_${source}`}>","<div className={`yv${compact ? ' yv-compact' : ''}`} ref={rootRef} id=\"your-verse\" data-stage={stage} data-mp-section={`your_verse_${source}`}>")
s=s.replace("import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'","import React, { useCallback, useEffect, useRef, useState } from 'react'")
s=s.replace("  /** Situation chips to show first (others behind \"More\"). */\n  situationIds?: string[]\n","")
s=s.replace("  situationIds,\n","")
open(p,'w').write(s)
print('widget patched')
