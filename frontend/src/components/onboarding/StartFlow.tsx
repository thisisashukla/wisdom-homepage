'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { trackEvent } from '@/lib/mixpanel'
import { api, ApiError, identify, signInWithGoogle, takePending } from '@/lib/funnelClient'
import { situationById } from '@/lib/app'
import {
  AGES, AGE_ART, FEELING_ART, LOGO_2X, NEEDS, SITUATION_FEELING, STAGE_ART, emotionById, stagesFor,
  type AgeId, type NeedId, type StageId,
} from '@/lib/onboarding/profile'
import { springVars, reducedMotion } from './motion'
import { BackButton } from './parts'
import SplashScreen from './SplashScreen'
import ChoiceScreen from './ChoiceScreen'
import FeelingScreen from './FeelingScreen'
import NoteScreen from './NoteScreen'
import SignInScreen from './SignInScreen'
import FindingScreen, { type FindChip } from './FindingScreen'
import VerseScreen, { type HookVerse } from './VerseScreen'
import WeekScreen, { type PreviewDay } from './WeekScreen'
import PlanScreen, { type FullDay } from './PlanScreen'
import WelcomeScreen from './WelcomeScreen'

/**
 * The Wisdom app's onboarding, on the web (every device, iPhone included). Same screens, copy, icons and motion as
 * wisdom/app/screens/onboarding on branch v3, in the same order: age, life
 * stage, feeling (in their own word), their note, "Curating your plan", the
 * week with every day sealed, then Day 1 brushed open. Value first: no
 * sign-in until Day 1 is read. Then Google sign-in sends the whole free week
 * to their inbox and opens it here (no paywall; Week 1 is free). There is no
 * Day 2 reminder screen or listen step (no push or narration on the web yet).
 * The phone-hours screen is out of the
 * flow, as in the app. The logo is drawn once by this shell and never moves;
 * each screen's words fade out and the next rise in.
 */
type Step = 'splash' | 'age' | 'stage' | 'phone' | 'feeling' | 'note' | 'signin' | 'finding' | 'verse' | 'week' | 'paywall' | 'welcome' | 'plan'
type Answers = { age?: AgeId; stages: StageId[]; phoneHours?: number; need?: NeedId; emotion?: string; note?: string; noteSource?: 'voice' | 'text'; topic?: string; follow?: string }
type Results = {
  understanding?: Record<string, unknown> & { mirror?: string; insight?: string; weeks?: string[] }
  hook?: HookVerse | null
  safety?: { message?: string; lines?: { region: string; name: string; contact: string }[]; kind?: string } | null
  preview?: PreviewDay[] | null
  weeks?: string[]
  sealed?: string
  days?: FullDay[] | null
  paid?: boolean
  seen?: boolean
  emailedTo?: string | null
}
type Saved = { v: 1; step: Step; answers: Answers; results: Results; at: number }

const KEY = 'wisdom_start_v1'
const BACK: Partial<Record<Step, Step>> = { age: 'splash', stage: 'age', feeling: 'stage', note: 'feeling', signin: 'verse', finding: 'note', week: 'note', verse: 'week' }
const PLAN_CAP = 9000 // ms "Curating your plan" waits for the week before moving on anyway
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const load = (): Saved | null => {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null') as Saved | null
    return s?.v === 1 && Date.now() - s.at < 30 * 24 * 3600 * 1000 ? s : null
  } catch {
    return null
  }
}

export default function StartFlow() {
  const { user, loading: authLoading } = useAuth()
  const [step, setStep] = useState<Step>('splash')
  const [answers, setAnswers] = useState<Answers>({ stages: [] })
  const [results, setResults] = useState<Results>({})
  const [leaving, setLeaving] = useState(false)
  const [logoUp, setLogoUp] = useState(false)
  const [logoShift, setLogoShift] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [safetyOpen, setSafetyOpen] = useState(false)
  const [hookReq, setHookReq] = useState<Promise<{ ok: boolean; mirror?: string | null; library?: { verses?: number; prasangs?: number } | null }> | null>(null)
  const weekReq = useRef<Promise<void> | null>(null)
  const logo = useRef<HTMLDivElement>(null)
  const [vars, setVars] = useState<Record<string, string>>({})
  useEffect(() => setVars(springVars()), [])
  const answersRef = useRef(answers)
  answersRef.current = answers
  const resultsRef = useRef(results)
  resultsRef.current = results

  // Resume: a returning visitor lands where they were (a fresh start begins at the splash).
  useEffect(() => {
    const s = load()
    const q = new URLSearchParams(window.location.search)
    const sit = q.get('s')
    const preset: Partial<Answers> = {}
    const situation = situationById(sit)
    if (situation) {
      preset.topic = situation.topic
      preset.follow = situation.follow
      preset.need = SITUATION_FEELING[situation.id]
    }
    if (s && ['verse', 'week', 'signin', 'paywall', 'welcome', 'plan'].includes(s.step) && s.results.hook) {
      setAnswers(s.answers)
      setResults(s.results)
      setStep(s.results.paid || s.step === 'paywall' || s.step === 'welcome' ? 'plan' : s.step)
      setLogoUp(true)
    } else if (s && s.step !== 'splash') {
      setAnswers({ ...s.answers, ...preset })
      setStep(s.step === 'finding' || s.step === 'signin' ? 'note' : s.step === 'phone' ? 'feeling' : s.step)
      setLogoUp(true)
    } else {
      setAnswers((a) => ({ ...a, ...preset }))
    }
    trackEvent('Onboarding Viewed', { page: 'Start', source: q.get('ref') ?? q.get('src') ?? 'direct', situation: sit ?? null, resumed: !!s })
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, step, answers, results, at: Date.now() } satisfies Saved))
    } catch {}
  }, [step, answers, results])

  const go = useCallback((next: Step, props?: Record<string, unknown>) => {
    trackEvent('Onboarding Step Completed', { page: 'Start', step, next, ...props })
    if (reducedMotion()) { setStep(next); setError(null); return }
    setLeaving(true)
    setTimeout(() => {
      setStep(next)
      setLogoShift(0)
      setLeaving(false)
      setError(null)
      document.querySelector('.ob-screen')?.scrollTo?.(0, 0)
    }, 180)
  }, [step])

  // ── The backend ──────────────────────────────────────────────────────────
  const profile = () => {
    const a = answersRef.current
    return { feeling: a.need ?? 'quiet', age: a.age ?? null, stages: a.stages, phoneHours: a.phoneHours ?? null, topic: a.topic ?? null, follow: a.follow ?? null }
  }
  const loadWeek = useCallback(() => {
    const r = resultsRef.current
    if (!r.understanding || !r.hook) return Promise.resolve()
    weekReq.current = api<{ weeks: string[]; preview: PreviewDay[]; sealed: string }>('/api/start/week', {
      body: { profile: profile(), understanding: r.understanding, hookId: r.hook.id },
    })
      .then((w) => setResults((p) => ({ ...p, weeks: w.weeks, preview: w.preview, sealed: w.sealed })))
      .catch(() => {})
    return weekReq.current
  }, [])
  const findVerse = useCallback(() => {
    const a = answersRef.current
    const p = api<{ understanding: Results['understanding']; hook: HookVerse | null; safety: Results['safety']; library: { verses?: number; prasangs?: number } | null }>(
      '/api/start/hook',
      { body: { profile: profile(), note: a.note || undefined, noteSource: a.noteSource } },
    ).then(async (r) => {
      setResults({ understanding: r.understanding ?? undefined, hook: r.hook, safety: r.safety })
      resultsRef.current = { understanding: r.understanding ?? undefined, hook: r.hook, safety: r.safety }
      trackEvent('Verses Generated', { page: 'Start', ok: !!r.hook, has_note: !!a.note, crisis: !!(r.safety as { crisis?: boolean } | null)?.crisis })
      if (r.safety?.message) setSafetyOpen(true)
      // The week comes next, so "Curating your plan" finishes once it is in (or the cap passes).
      if (r.hook) await Promise.race([loadWeek(), sleep(PLAN_CAP)])
      return { ok: !!r.hook, mirror: r.understanding?.mirror ?? null, library: r.library }
    }).catch((e) => {
      trackEvent('Verses Generated', { page: 'Start', ok: false, error: e instanceof ApiError ? e.code : 'network' })
      return { ok: false }
    })
    setHookReq(p)
  }, [loadWeek])

  // Arriving at "Curating" without a request (a resume, a redirect): start it. No sign-in needed yet.
  useEffect(() => {
    if (step !== 'finding' || hookReq) return
    findVerse()
  }, [step, hookReq, findVerse])

  // ── Sign-in ───────────────────────────────────────────────────────────────
  // Signed in after Day 1: a welcome, while the week opens behind it (and goes to their inbox).
  const afterSignIn = useCallback(() => {
    go('welcome', { signed_in: true })
    void openWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go])

  useEffect(() => {
    getRedirectResult(auth)
      .then((cred) => {
        if (!cred?.user) return
        identify(cred.user)
        const p = takePending()
        if (p?.source === 'start') {
          trackEvent('Onboarding Signin Completed', { page: 'Start', method: 'redirect' })
          if (p.next === 'age') go('age')
          else afterSignIn()
        }
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signIn = async (next: 'plan' | 'age') => {
    setError(null)
    setBusy(true)
    try {
      trackEvent('Onboarding Signin Started', { page: 'Start', at: next })
      const u = await signInWithGoogle({ source: 'start', next })
      if (!u) return
      trackEvent('Onboarding Signin Completed', { page: 'Start', method: 'popup' })
      if (next === 'age') go('age')
      else afterSignIn()
    } catch (e) {
      trackEvent('Onboarding Signin Failed', { page: 'Start', at: next, code: (e as { code?: string })?.code || 'unknown' })
      setError('Google sign-in did not go through. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  // ── Week 1 is free: the sealed week opens for its owner once Day 1 is read ──
  const unseal = async () => {
    const r = resultsRef.current
    if (!r.sealed) await (weekReq.current ?? loadWeek())
    const sealed = resultsRef.current.sealed
    if (!sealed) throw new Error('no_plan')
    const plan = await api<{ days: FullDay[]; weeks: string[]; emailed?: boolean; email?: string | null }>('/api/start/unseal', { body: { sealed } })
    const emailedTo = plan.emailed ? plan.email ?? null : null
    resultsRef.current = { ...resultsRef.current, emailedTo }
    setResults((p) => ({ ...p, days: plan.days, weeks: plan.weeks, paid: true, emailedTo }))
  }
  const opening = useRef(false)
  const openWeek = useCallback(async () => {
    if (opening.current) return
    opening.current = true
    setError(null)
    setBusy(true)
    try {
      await unseal()
      trackEvent('Onboarding Completed', { page: 'Start', outcome: 'free_week', emailed: !!resultsRef.current.emailedTo })
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { setStep('signin'); return }
      setError(
        e instanceof ApiError && e.status === 410
          ? 'This plan has expired. Start again and we will build a fresh one.'
          : "We couldn't open your week just now. Please try again.",
      )
    } finally {
      opening.current = false
      setBusy(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // Back on the plan with the week still sealed (a resume): open it.
  useEffect(() => {
    if (step !== 'plan' || results.paid || !results.hook || opening.current || authLoading) return
    if (user || auth.currentUser) void openWeek()
    else setStep('signin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, authLoading])

  // ── The answers flying into "Finding your verse" ───────────────────────────
  const chips = useMemo<FindChip[]>(() => {
    const a = answers
    const out: FindChip[] = []
    const ageLabel = AGES.find((x) => x.id === a.age)?.label
    if (a.age) AGE_ART[a.age].forEach((src, i) => out.push({ key: `age${i}`, src, label: i === 0 ? `Age ${ageLabel ?? ''}` : '' }))
    a.stages.forEach((id) => {
      const src = STAGE_ART[id]
      if (src) out.push({ key: `st-${id}`, src, label: stagesFor(a.age).find((x) => x.id === id)?.label ?? id })
    })
    const word = emotionById(a.emotion)
    if (a.need) out.push({ key: 'feel', src: FEELING_ART[word?.art ?? a.need], label: word?.label ?? NEEDS.find((n) => n.id === a.need)?.label ?? '' })
    if (a.phoneHours) out.push({ key: 'phone', text: `${a.phoneHours}h`, label: `${a.phoneHours} hours a day on the phone` })
    if (a.note?.trim()) out.push({ key: 'note', icon: 'quote', label: 'Your own words' })
    return out.slice(0, 10)
  }, [answers])

  const back = BACK[step]
  const weekTitle = (results.understanding?.weeks?.[0] || results.weeks?.[0] || '').trim() || null

  let screen: React.ReactNode = null
  switch (step) {
    case 'splash':
      screen = (
        <SplashScreen
          logoTarget={() => logo.current?.getBoundingClientRect() ?? null}
          onLanded={() => setLogoUp(true)}
          onBegin={() => go('age')}
          onHaveAccount={() => (user ? go('age') : signIn('age'))}
        />
      )
      break
    case 'age':
      screen = (
        <ChoiceScreen<AgeId>
          title="How old" accent="are you?" sub="So your verse fits your stage of life."
          options={AGES} art={AGE_ART}
          initial={answers.age ? [answers.age] : []}
          onToggle={(id) => setAnswers((a) => ({ ...a, age: id }))}
          onDone={([id]) => { setAnswers((a) => ({ ...a, age: id, stages: a.stages.filter((s) => stagesFor(id).some((o) => o.id === s)) })); go('stage', { age_range: id }) }}
        />
      )
      break
    case 'stage': {
      const options = stagesFor(answers.age)
      screen = (
        <ChoiceScreen<StageId>
          title="Where are you" accent="in life?" sub="Choose all that apply"
          options={options} art={STAGE_ART} multi
          initial={answers.stages.filter((id) => options.some((o) => o.id === id))}
          onDone={(ids) => { setAnswers((a) => ({ ...a, stages: ids })); go('feeling', { life_stage: ids }) }}
        />
      )
      break
    }
    case 'feeling':
      screen = (
        <FeelingScreen
          initialEmotion={answers.emotion} initialNeed={answers.need}
          onDone={(e) => { setAnswers((a) => ({ ...a, need: e.need, emotion: e.id })); go('note', { feeling: e.need, emotion: e.id, tone: e.tone }) }}
        />
      )
      break
    case 'note':
      screen = (
        <NoteScreen
          need={answers.need} emotion={answers.emotion} age={answers.age} stages={answers.stages}
          initial={answers.note} initialSource={answers.noteSource}
          onDone={(note, source) => {
            setAnswers((a) => ({ ...a, note: note || undefined, noteSource: note ? source : undefined }))
            answersRef.current = { ...answersRef.current, note: note || undefined, noteSource: note ? source : undefined }
            const props = { has_note: !!note, note_source: note ? source : 'skipped', note_chars: note.length }
            findVerse()
            go('finding', props)
          }}
        />
      )
      break
    case 'signin':
      screen = <SignInScreen busy={busy} error={error} weekTitle={weekTitle} onSignIn={() => signIn('plan')} />
      break
    case 'finding':
      screen = hookReq ? (
        <FindingScreen chips={chips} hasNote={!!answers.note} request={hookReq} onRetry={findVerse} onDone={() => go('week')} />
      ) : null
      break
    case 'verse':
      screen = (
        <VerseScreen
          hook={results.hook ?? null}
          insight={results.understanding?.insight ?? null}
          stages={answers.stages} need={answers.need} usedNote={!!answers.note?.trim()}
          seen={!!results.seen}
          onRevealed={() => setResults((p) => ({ ...p, seen: true }))}
          cta={user || auth.currentUser ? 'Open my week' : 'Email me my free week'}
          onDone={() => (user || auth.currentUser ? afterSignIn() : go('signin'))}
        />
      )
      break
    case 'week':
      screen = (
        <WeekScreen
          preview={results.preview ?? null}
          hookLine={results.hook?.line ?? null}
          hookRef={results.hook?.ref ?? null}
          weekTitle={weekTitle}
          cta="Reveal my first verse"
          onDone={() => go('verse')}
        />
      )
      break
    case 'welcome':
      screen = (
        <WelcomeScreen
          name={(user ?? auth.currentUser)?.displayName ?? null}
          weekTitle={weekTitle}
          emailedTo={results.emailedTo ?? null}
          ready={!!results.paid}
          busy={busy}
          error={error}
          onOpen={() => (results.paid ? go('plan') : openWeek())}
        />
      )
      break
    case 'plan':
      screen = (
        <PlanScreen
          days={results.days ?? null}
          preview={results.preview ?? null}
          hook={results.hook ? { sanskrit: results.hook.sanskrit, line: results.hook.line, ref: results.hook.ref } : null}
          weekTitle={weekTitle}
          open={!!results.paid}
          loading={busy}
          error={error}
          emailedTo={results.emailedTo ?? null}
          onRetry={() => (user || auth.currentUser ? openWeek() : go('signin'))}
        />
      )
      break
  }

  const safety = results.safety
  return (
    <div className="ob" style={vars as React.CSSProperties}>
      <div className="ob-glow" aria-hidden="true" />
      <div
        className="ob-phone"
        onScrollCapture={(e) => {
          const t = e.target as HTMLElement
          if (t.classList?.contains('ob-scroll')) setLogoShift(Math.min(140, t.scrollTop))
        }}
      >
        <div ref={logo} className={`ob-logo${logoUp ? ' is-up' : ''}`} style={logoShift ? { transform: `translateY(${-logoShift}px)`, opacity: Math.max(0, 1 - logoShift / 80) } : undefined} aria-hidden="true">
          <span className="ob-logo-halo" />
          <img src={LOGO_2X} alt="" width={48} height={48} />
        </div>
        {back && step !== 'finding' && step !== 'plan' && <BackButton onClick={() => go(back, { back: true })} />}
        <main key={step} className={`ob-screen ob-s-${step}${leaving ? ' is-leaving' : ''}`} aria-live="polite">
          {screen}
        </main>
      </div>
      {safetyOpen && safety?.message && (
        <div className="ob-sheet-veil" onClick={() => setSafetyOpen(false)}>
          <div className="ob-sheet" role="alertdialog" aria-modal="true" aria-label="Support" onClick={(e) => e.stopPropagation()}>
            <h2 className="ob-sheet-title">{safety.kind === 'harm_from_others' ? 'You deserve to be safe' : "You don't have to carry this alone"}</h2>
            <p className="ob-sheet-body">{safety.message}</p>
            <ul className="ob-sheet-lines">
              {(safety.lines ?? []).map((l) => <li key={l.name}><b>{l.region}:</b> {l.name}, {l.contact}</li>)}
            </ul>
            <button type="button" className="ob-cta" onClick={() => setSafetyOpen(false)}>
              <span className="ob-cta-live" aria-hidden="true" />
              <span className="ob-cta-label">OK</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
