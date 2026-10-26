'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import {
  ASK,
  FEELINGS,
  WEB_PLAN_PRICE_INR,
  appStoreUrl,
  detectPlatform,
  situationById,
  type FeelingId,
  type Platform,
} from '@/lib/app'
import { trackEvent, trackLinkClick } from '@/lib/mixpanel'
import {
  ApiError,
  api,
  bgLink,
  identify,
  signInWithGoogle,
  startWeeklyPlanCheckout,
  takePending,
} from '@/lib/funnelClient'
import WebPlan, { type WebPlanData } from './WebPlan'
import './funnel.css'

export type HookVerse = {
  id: string
  ref: string
  speaker: string | null
  listener: string | null
  setting: string | null
  sanskrit: string | null
  line: string
  translation: string | null
  why: string | null
  story: string | null
}
type HookResult = {
  mirror: string | null
  insight: string | null
  weeks: string[]
  hook: HookVerse | null
  alternate: HookVerse | null
  safety: { message: string; lines: { region: string; name: string; contact: string }[] } | null
}

type Stage = 'intro' | 'pick' | 'gate' | 'loading' | 'revealed' | 'note' | 'paying' | 'planning' | 'plan' | 'error'

type Props = {
  /** Attribution: hero | gita-for/<slug> | verse | … */
  source: string
  /** Page name for Mixpanel's `page` property. */
  pageName: string
  initialFeeling?: FeelingId
  initialSituation?: string
  /** Compact = no intro heading (the page provides it). */
  compact?: boolean
}

export default function YourVerse({
  source,
  pageName,
  initialFeeling,
  initialSituation,
  compact,
}: Props) {
  const { user } = useAuth()
  const [platform, setPlatform] = useState<Platform>('desktop')
  const [feeling, setFeeling] = useState<FeelingId | null>(initialFeeling ?? null)
  const [situation, setSituation] = useState<string | null>(initialSituation ?? null)
  const [stage, setStage] = useState<Stage>('intro')
  const [answer, setAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<HookResult | null>(null)
  const [verse, setVerse] = useState<HookVerse | null>(null)
  const [seen, setSeen] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [plan, setPlan] = useState<WebPlanData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const isIOS = platform === 'ios'

  useEffect(() => {
    setPlatform(detectPlatform())
    // ?f=<feeling>&s=<situation> from reels / bio links preselects the chips.
    const q = new URLSearchParams(window.location.search)
    const f = q.get('f') as FeelingId | null
    if (f && FEELINGS.some((x) => x.id === f)) setFeeling(f)
    const s = q.get('s')
    if (s && situationById(s)) setSituation(s)
    // Arriving from a "Find my verse" link elsewhere: skip straight to the question.
    const openFromHash = () => {
      if (window.location.hash === '#your-verse') setStage((st) => (st === 'intro' ? 'pick' : st))
    }
    openFromHash()
    // A "Create my plan" button elsewhere on the page opens the question without a hash change.
    const open = () => setStage((st) => (st === 'intro' ? 'pick' : st))
    window.addEventListener('hashchange', openFromHash)
    window.addEventListener('yv:open', open)
    return () => {
      window.removeEventListener('hashchange', openFromHash)
      window.removeEventListener('yv:open', open)
    }
  }, [])

  const props = useCallback(
    (extra?: Record<string, unknown>) => ({ page: pageName, source, platform, feeling, situation, ...extra }),
    [pageName, source, platform, feeling, situation],
  )

  const fetchVerse = useCallback(
    async (f: FeelingId, s: string | null, exclude: string[] = []) => {
      setStage('loading')
      setError(null)
      try {
        const out = await api<HookResult>('/api/verse/hook', { body: { feeling: f, situation: s, source, exclude } })
        setResult(out)
        setVerse(out.hook)
        if (out.hook) setSeen((prev) => [...prev, out.hook!.id])
        setStage('revealed')
        trackEvent('Hook Revealed', props({ verse: out.hook?.ref, safety: Boolean(out.safety) }))
        requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          setStage('gate')
          trackEvent('Hook Signin Shown', props())
          return
        }
        setError(
          e instanceof ApiError && e.status === 429
            ? 'You have asked for a lot of verses this hour. Try again a little later.'
            : 'We could not reach the library just now. Please try again.',
        )
        setStage('error')
      }
    },
    [props, source],
  )

  // Resume after a redirect sign-in (popup blocked).
  useEffect(() => {
    getRedirectResult(auth)
      .then((cred) => {
        if (!cred?.user) return
        identify(cred.user)
        const p = takePending()
        if (p?.source === source && p.feeling) {
          setFeeling(p.feeling as FeelingId)
          setSituation((p.situation as string) ?? null)
          trackEvent('Hook Signin Completed', { page: pageName, source, method: 'redirect' })
          void fetchVerse(p.feeling as FeelingId, (p.situation as string) ?? null)
        }
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const go = (f: FeelingId, s: string | null) => {
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
    setAnswer(a.about ?? null)
    trackEvent('Hook Situation Picked', props({ answer: a.id, situation: a.situation ?? null, feeling: a.feeling }))
    go(a.feeling, a.situation ?? null)
  }

  // The plan preview's button hands over a situation: answer the question for them.
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

  const signIn = async () => {
    if (!feeling) return
    setError(null)
    try {
      const u = await signInWithGoogle({ source, feeling, situation })
      if (!u) return
      trackEvent('Hook Signin Completed', props({ method: 'popup' }))
      void fetchVerse(feeling, situation)
    } catch {
      setError('Google sign-in did not go through. Please try again.')
    }
  }

  const another = () => {
    trackEvent('Hook Another', props({ verse: verse?.ref }))
    if (result?.alternate && !seen.includes(result.alternate.id)) {
      setVerse(result.alternate)
      setSeen((prev) => [...prev, result.alternate!.id])
      return
    }
    if (feeling) void fetchVerse(feeling, situation, seen)
  }

  const share = () => {
    if (!verse) return
    const url = `https://wisdomquotes.in/?f=${feeling ?? ''}${situation ? `&s=${situation}` : ''}`
    const text = `${verse.sanskrit ? verse.sanskrit + '\n\n' : ''}“${verse.line}” (${verse.ref})\n\nA 7-day reading plan for your situation, starting with the Gita: ${url}`
    trackEvent('Verse Shared', props({ verse: verse.ref, network: 'whatsapp' }))
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const startCustomise = () => {
    trackEvent('Customise Opened', props({ verse: verse?.ref }))
    setStage('note')
  }

  const buildPlan = async () => {
    setError(null)
    if (note.trim().length < 8 && !situation) {
      setError('Write a line or two about what is going on.')
      return
    }
    try {
      const status = await api<{ active: boolean; configured?: boolean }>('/api/pay/status')
      if (!status.active) {
        setStage('paying')
        trackEvent('Paywall Viewed', props({ product: 'web_plan_weekly', price_inr: WEB_PLAN_PRICE_INR }))
        const paid = await startWeeklyPlanCheckout(source)
        if (!paid) {
          setStage('note')
          return
        }
      }
      setStage('planning')
      const out = await api<WebPlanData>('/api/verse/plan', { body: { feeling, situation, note } })
      setPlan(out)
      setStage('plan')
      trackEvent('Web Plan Generated', props({ days: out.days.length }))
      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch (e) {
      const code = e instanceof ApiError ? e.code : ''
      setError(
        code === 'payments_not_configured'
          ? 'Payments open soon. Leave your note and we will email you when your plan is ready.'
          : code === 'rate_limited'
            ? 'You have built several plans today. Try again tomorrow.'
            : 'Something went wrong while building your plan. You have not been charged twice; please try again.',
      )
      setStage('note')
    }
  }

  const appHref = appStoreUrl(`web_${source.replace(/[^a-z0-9]+/gi, '_')}`)
  const onAppClick = () => trackLinkClick(pageName, `${source}_hook_app_cta`, appHref)

  const verseLink = verse ? bgLink(verse.id) : null

  return (
    <div className={`yv${compact ? ' yv-compact' : ''}`} ref={rootRef} id="your-verse" data-stage={stage} data-mp-section={`your_verse_${source}`}>
      {stage === 'intro' && (
        <div className="yv-intro">
          <button type="button" className="btn-read-gita btn-read-gita-primary yv-go yv-cta" onClick={start}>
            Create my free Gita reading plan
          </button>
          <p className="yv-fine yv-intro-fine">Day 1 is free. One question, 30 seconds.</p>
        </div>
      )}

      {stage === 'pick' && (
        <div className="yv-pick">
          <p className="yv-q" id={`yv-q-${source}`}>What&apos;s weighing on you?</p>
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
          Creating your plan<span className="yv-dots" aria-hidden="true"><i /><i /><i /></span>
        </p>
      )}

      {stage === 'error' && (
        <div className="yv-gate">
          <p className="yv-error" role="alert">{error}</p>
          <button type="button" className="yv-link" onClick={() => setStage('pick')}>Try again</button>
        </div>
      )}

      {['revealed', 'note', 'paying', 'planning', 'plan'].includes(stage) && result && (
        <div className="yv-reveal">
          {result.safety ? (
            <div className="yv-safety" role="alert">
              <p>{result.safety.message}</p>
              <ul>
                {result.safety.lines.map((l) => (
                  <li key={l.name}>
                    <strong>{l.name}</strong> ({l.region}): {l.contact}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {verse && (
            <article key={verse.id} className="yv-card" aria-live="polite">
              {result.mirror && <p className="yv-mirror">{result.mirror}</p>}
              <div className="yv-card-ref">
                {verse.id === result.hook?.id ? 'Day 1 · ' : ''}{verse.ref}
                {verse.speaker ? ` · ${verse.speaker}${verse.listener ? ` to ${verse.listener}` : ''}` : ''}
              </div>
              {verse.sanskrit && <p className="yv-sanskrit" lang="sa">{verse.sanskrit}</p>}
              <blockquote className="yv-line">“{verse.line}”</blockquote>
              {result.insight && verse.id === result.hook?.id && <p className="yv-insight">{result.insight}</p>}
              {!result.insight && verse.why && <p className="yv-insight">{verse.why}</p>}
              <div className="yv-card-actions">
                <button type="button" className="yv-link" onClick={share}>Share on WhatsApp</button>
                <button type="button" className="yv-link" onClick={another}>Another verse</button>
                {verseLink && (
                  <a className="yv-link" href={verseLink} onClick={() => trackLinkClick(pageName, `${source}_hook_read_verse`, verseLink)}>
                    Read with commentary →
                  </a>
                )}
              </div>
            </article>
          )}

          {stage === 'revealed' && (
            <div className="yv-next">
              {isIOS ? (
                <>
                  <p className="yv-next-head">That&apos;s Day 1. Days 2 to 7 are waiting in the app.</p>
                  <p className="yv-next-sub">
                    A 7-day plan for {answer ?? (situationById(situation)?.label ?? 'what is weighing on you').toLowerCase()}, read aloud,
                    with today&apos;s shloka on your Lock Screen. Week 1 is free.
                  </p>
                  <a className="btn-read-gita btn-read-gita-primary yv-go" href={appHref} target="_blank" rel="noopener" onClick={onAppClick}>
                    Get my 7 days on the App Store
                  </a>
                </>
              ) : (
                <>
                  <p className="yv-next-head">That&apos;s Day 1. Want the other six?</p>
                  <p className="yv-next-sub">
                    Write what&apos;s going on in your own words and get seven days with it: one verse a day, what it means
                    for you, and a story from the Gita, Ramayana or Mahabharata on Day 7.
                  </p>
                  <button type="button" className="btn-read-gita btn-read-gita-primary yv-go" onClick={startCustomise}>
                    Get my 7 days · ₹{WEB_PLAN_PRICE_INR} a week
                  </button>
                  <p className="yv-fine">
                    Your bank tells you before every charge, and you can cancel from your plan in one tap. On iPhone?{' '}
                    <a href={appHref} target="_blank" rel="noopener" onClick={onAppClick}>The app&apos;s week 1 is free</a>
                  </p>
                </>
              )}
            </div>
          )}

          {(stage === 'note' || stage === 'paying' || stage === 'planning') && (
            <div className="yv-note">
              <label htmlFor={`yv-note-${source}`} className="yv-next-head">What&apos;s going on?</label>
              <p className="yv-next-sub">A few lines is enough. Your words are used once to choose your verses, and we don&apos;t store them.</p>
              <textarea
                id={`yv-note-${source}`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={800}
                rows={4}
                placeholder="e.g. I moved to Bangalore for work a year ago. My manager keeps moving the goalposts and I lie awake replaying meetings."
                disabled={stage !== 'note'}
              />
              <button
                type="button"
                className="btn-read-gita btn-read-gita-primary yv-go"
                onClick={buildPlan}
                disabled={stage !== 'note'}
              >
                {stage === 'paying'
                  ? 'Waiting for payment…'
                  : stage === 'planning'
                    ? 'Choosing your 7 verses…'
                    : `Continue · ₹${WEB_PLAN_PRICE_INR}/week`}
              </button>
              <p className="yv-fine">
                ₹{WEB_PLAN_PRICE_INR} a week through Razorpay (UPI or card). Your bank tells you before every charge, and you can cancel from your plan in one tap.
              </p>
              {error && <p className="yv-error" role="alert">{error}</p>}
            </div>
          )}

          {stage === 'plan' && plan && <WebPlan plan={plan} />}
        </div>
      )}
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}
