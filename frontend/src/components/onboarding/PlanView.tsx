'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { LOGO_2X } from '@/lib/onboarding/profile'
import { findMyPlan, keepToken, savedToken } from '@/lib/planClient'
import type { PlanDay, SavedPlan } from '@/lib/server/webPlans'
import Icon from './Icon'
import { VerseFace } from './VerseScreen'

/**
 * /plan: the home of a web plan, where every email leads.
 *
 * One day at a time, as in the app: the day they came for (?d=N, or the newest
 * open day) is open in full: the verse, what it says, what it says to them,
 * "Did this help?". Below it, tomorrow sealed with when it arrives, then the
 * week. Days open on their morning (the server sends only open days in full),
 * so the page and the morning email always agree. After Day 7: the week is
 * complete, and the next step is a new week.
 *
 * No token in the link: this browser's plan, else the signed-in account's,
 * else /start.
 */
const BEAT_LABEL: Record<string, string> = { hook: 'Where you are', diagnose: "What's underneath", steady: 'What steadies you', act: 'What to do', story: 'A story' }
type Feedback = 'helped' | 'not_for_me'
type OpenDay = Extract<PlanDay, { locked?: false }>

const weekday = (startDate: string, day: number) => {
  const d = new Date(`${startDate}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + day - 1)
  return d.toLocaleDateString('en', { weekday: 'long', timeZone: 'UTC' })
}

async function post(body: Record<string, unknown>) {
  try {
    await fetch('/api/plan/mark', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true })
  } catch {}
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ob">
      <div className="ob-glow" aria-hidden="true" />
      <div className="ob-phone">
        <div className="ob-logo is-up" aria-hidden="true">
          <span className="ob-logo-halo" />
          <img src={LOGO_2X} alt="" width={48} height={48} />
        </div>
        <main className="ob-screen ob-s-plan">{children}</main>
      </div>
    </div>
  )
}

function Empty({ missing }: { missing: boolean }) {
  return (
    <Shell>
      <div className="ob-scroll">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span>{missing ? 'We could not find' : 'No plan here'} </span>
            <em>{missing ? 'this plan' : 'yet'}</em>
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>
            {missing
              ? 'The link may be cut short. Open the newest email from Wisdom and tap its button, or make a fresh plan.'
              : 'A few questions, then a verse chosen for what is on your mind and a week built around it. Week 1 is free.'}
          </p>
        </div>
      </div>
      <div className="ob-foot ob-rise" style={{ '--d': '400ms' } as React.CSSProperties}>
        <a className="ob-cta ob-cta-link" href="/start?ref=plan_page_empty">
          <span className="ob-cta-live" aria-hidden="true" />
          <span className="ob-cta-label">Create my free Gita reading plan</span>
        </a>
      </div>
    </Shell>
  )
}

/** The open day, in full. */
function DayCard({ d, feedback, onRate }: { d: OpenDay; feedback: Feedback | undefined; onRate: (v: Feedback) => void }) {
  const story = d.beat === 'story'
  return (
    <section className={`ob-plan-day is-open pv-focus ob-card-in${story ? ' is-story' : ''}`} style={{ '--d': '360ms' } as React.CSSProperties} aria-label={`Day ${d.day}`}>
      <div className="ob-plan-head" role="heading" aria-level={2}>
        <b>Day {d.day}</b>
        <span>{BEAT_LABEL[d.beat] ?? ''}</span>
      </div>
      <div className="ob-plan-body">
        {story ? (
          <>
            <p className="ob-story-title">{d.story?.title ?? d.line}</p>
            {d.story?.summary && <p className="ob-plan-meaning">{d.story.summary}</p>}
            {(d.forYou || d.story?.lesson) && (
              <div className="ob-for-you"><span className="ob-eyebrow">For you</span><p>{d.forYou || d.story?.lesson}</p></div>
            )}
            {d.ref && <p className="ob-ref">{d.ref}</p>}
          </>
        ) : (
          <>
            <VerseFace verse={{ sanskrit: d.sanskrit, line: d.line, ref: d.ref }} />
            {d.meaning && <><span className="ob-eyebrow">What it says</span><p className="ob-plan-meaning">{d.meaning}</p></>}
            {d.forYou && <div className="ob-for-you"><span className="ob-eyebrow">For you</span><p>{d.forYou}</p></div>}
          </>
        )}
        <div className="pv-fb" role="group" aria-label="Did this help?">
          <span>Did this {story ? 'story' : 'verse'} help?</span>
          <button type="button" className={feedback === 'helped' ? 'is-on' : ''} aria-pressed={feedback === 'helped'} onClick={() => onRate('helped')}>Yes, it helped</button>
          <button type="button" className={feedback === 'not_for_me' ? 'is-on' : ''} aria-pressed={feedback === 'not_for_me'} onClick={() => onRate('not_for_me')}>Not for me</button>
        </div>
      </div>
    </section>
  )
}

export default function PlanView({
  token,
  plan,
  missing,
  initialDay,
  src,
  fb,
  welcome,
}: {
  token: string | null
  plan: SavedPlan | null
  missing: boolean
  initialDay: number | null
  src: string | null
  fb: Feedback | null
  welcome: boolean
}) {
  const { user, loading: authLoading } = useAuth()
  const [checking, setChecking] = useState(!token)
  const unlocked = plan ? Math.max(1, Math.min(plan.unlocked, 7)) : 1
  const complete = !!plan?.complete
  const first = initialDay && initialDay <= unlocked ? initialDay : complete && !initialDay ? null : unlocked
  const [focus, setFocus] = useState<number | null>(first)
  const [read, setRead] = useState<number[]>(plan?.readDays ?? [])
  const [feedback, setFeedback] = useState<Record<string, Feedback>>(plan?.feedback ?? {})
  const [thanks, setThanks] = useState<string | null>(null)
  const marked = useRef(new Set<number>())
  const source = useRef(src ?? 'web')
  const top = useRef<HTMLDivElement>(null)

  // No token in the link: this browser's plan, else the signed-in account's (any device), else /start.
  useEffect(() => {
    if (token) { keepToken(token); return }
    const local = savedToken()
    if (local) { window.location.replace(`/plan?t=${local}`); return }
    if (authLoading) return
    if (!user) { setChecking(false); return }
    findMyPlan().then((p) => (p?.token ? window.location.replace(`/plan?t=${p.token}`) : setChecking(false)))
  }, [token, user, authLoading])

  useEffect(() => {
    if (!plan || !token) return
    trackEvent(EVENTS.PlanPageViewed, { page: 'Plan', source: source.current, day: first, unlocked, complete, status: plan.status, read_days: plan.readDays.length, welcome })
    // An old email's "Yes, it helped" / "Not for me" link (fb=…): recorded here, where link scanners don't run.
    if (fb && initialDay && initialDay <= unlocked) {
      setFeedback((f) => ({ ...f, [String(initialDay)]: fb }))
      setThanks(fb === 'helped' ? 'Thank you. Glad it helped.' : 'Thank you for saying. It helps us choose better.')
      void post({ t: token, d: initialDay, read: true, feedback: fb })
      trackEvent(EVENTS.PlanDayFeedback, { page: 'Plan', day: initialDay, feedback: fb, source: source.current })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The open day counts as read once it has been on screen a moment.
  useEffect(() => {
    if (!plan || !token || !focus || marked.current.has(focus)) return
    const t = setTimeout(() => {
      marked.current.add(focus)
      setRead((r) => (r.includes(focus) ? r : [...r, focus]))
      void post({ t: token, d: focus, read: true })
      trackEvent(EVENTS.PlanDayOpened, { page: 'Plan', day: focus, unlocked, source: source.current, first_open: !plan.readDays.includes(focus) })
    }, 2500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  if (!plan || !token) return checking ? <Shell><div /></Shell> : <Empty missing={missing} />

  const open = (day: number) => {
    setFocus(day)
    source.current = 'web'
    try { window.history.replaceState(null, '', `/plan?t=${token}&d=${day}`) } catch {}
    top.current?.closest('.ob-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const rate = (day: number, v: Feedback) => {
    setFeedback((f) => ({ ...f, [String(day)]: v }))
    void post({ t: token, d: day, read: true, feedback: v })
    trackEvent(EVENTS.PlanDayFeedback, { page: 'Plan', day, feedback: v, source: 'web' })
  }

  const emailsOn = plan.status === 'active'
  const day = plan.days.find((d) => d.day === focus && !d.locked) as OpenDay | undefined
  const nextLocked = plan.days.find((d) => d.day === unlocked + 1 && d.locked)
  const when = (n: number) => (n <= plan.today ? 'This morning' : n === plan.today + 1 ? 'Tomorrow' : weekday(plan.startDate, n))
  const arrives = (n: number) => (n <= plan.today ? 'this morning' : n === plan.today + 1 ? 'tomorrow morning' : `${weekday(plan.startDate, n)} morning`)
  const sub = welcome
    ? emailsOn
      ? <>Day 1 is yours. Day 2 arrives at <b>{plan.email}</b> tomorrow morning, around 7.</>
      : 'Day 1 is yours. Day 2 opens here tomorrow morning.'
    : complete
      ? 'Seven mornings, together. Open any day again, or begin a new week.'
      : null

  return (
    <Shell>
      <div className="ob-scroll">
        <div className="ob-hero" ref={top}>
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            {complete && !focus ? <><span>Your week is </span><em>complete</em></> : <><span>Day {focus ?? unlocked} </span><em>of 7</em></>}
          </h1>
          {sub && <p className="ob-sub ob-rise" style={{ '--d': '140ms' } as React.CSSProperties}>{sub}</p>}
          {plan.weekTitle && (
            <p className="ob-week-chip ob-rise" style={{ '--d': '240ms' } as React.CSSProperties}>
              <b>Week 1</b><i /><span>{plan.weekTitle}</span>
            </p>
          )}
          <ol className="pv-dots ob-rise" style={{ '--d': '300ms' } as React.CSSProperties} aria-label={`${read.length} of 7 days read`}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <li key={n} className={`${read.includes(n) ? 'is-read' : ''}${n === focus ? ' is-today' : ''}${n > unlocked ? ' is-locked' : ''}`}>
                <span className="sr-only">Day {n}{read.includes(n) ? ', read' : n > unlocked ? ', not yet open' : ''}</span>
              </li>
            ))}
          </ol>
        </div>
        {thanks && <p className="pv-thanks" role="status">{thanks}</p>}

        {complete && (
          <div className="pv-done ob-card-in" style={{ '--d': '340ms' } as React.CSSProperties}>
            <span className="ob-eyebrow">Week 1 is complete</span>
            <p>{read.length >= 7 ? 'You opened all seven days.' : `You opened ${read.length} of seven days.`} What is on your mind now? A new week can be chosen for it.</p>
            <a className="ob-cta ob-cta-link" href="/start?new=1&ref=plan_week_complete">
              <span className="ob-cta-live" aria-hidden="true" />
              <span className="ob-cta-label">Start a new week</span>
            </a>
          </div>
        )}

        {day && <DayCard key={day.day} d={day} feedback={feedback[String(day.day)]} onRate={(v) => rate(day.day, v)} />}

        {!complete && focus === unlocked && (
          nextLocked ? (
            <div className={`pv-next ob-card-in${nextLocked.beat === 'story' ? ' is-story' : ''}`} style={{ '--d': '460ms' } as React.CSSProperties}>
              <div className="pv-next-head">
                <b>Day {nextLocked.day}</b>
                <span>{BEAT_LABEL[nextLocked.beat] ?? ''}</span>
                <i />
                <Icon name="lock" size={14} />
              </div>
              <p className="pv-next-line">{nextLocked.line}</p>
              <p className="pv-next-when">{emailsOn ? `Arrives in your inbox ${arrives(nextLocked.day)}, around 7.` : `Opens here ${arrives(nextLocked.day)}.`}</p>
            </div>
          ) : unlocked === 7 ? (
            <div className="pv-next ob-card-in" style={{ '--d': '460ms' } as React.CSSProperties}>
              <p className="pv-next-when">The last day of Week 1. Tomorrow morning: your seven days, together, and what comes next.</p>
            </div>
          ) : null
        )}

        <div className="pv-week">
          <span className="ob-eyebrow">Your week</span>
          <ol>
            {plan.days.map((d) => {
              const locked = !!d.locked
              const isRead = read.includes(d.day)
              const line = d.locked ? d.line : d.beat === 'story' ? d.story?.title ?? d.line : d.line
              return (
                <li key={d.day}>
                  <button
                    type="button"
                    className={`pv-row${d.day === focus ? ' is-on' : ''}${locked ? ' is-locked' : ''}${d.beat === 'story' ? ' is-story' : ''}`}
                    onClick={() => !locked && open(d.day)}
                    disabled={locked}
                    aria-current={d.day === focus ? 'true' : undefined}
                  >
                    <span className="pv-row-n">{isRead ? '✓' : d.day}</span>
                    <span className="pv-row-text">
                      <span className="pv-row-label">Day {d.day} · {BEAT_LABEL[d.beat] ?? ''}</span>
                      <span className={`pv-row-line${locked ? ' is-glimpse' : ''}`}>{line}</span>
                    </span>
                    {locked ? <span className="pv-row-when">{when(d.day)}</span> : null}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <p className="ob-plan-foot">
          {emailsOn && !complete ? (
            <>One verse each morning, around 7, until Day 7. <a href={`/plan/unsubscribe?t=${token}`}>Stop morning emails</a></>
          ) : plan.status === 'unsubscribed' ? (
            'Morning emails are off. Each day still opens here on its morning.'
          ) : (
            'This page keeps your week. Open it from any Wisdom email.'
          )}
        </p>
      </div>
      <div className="ob-foot ob-rise" style={{ '--d': '600ms' } as React.CSSProperties}>
        <div className="pv-actions">
          {!complete && (
            <a className="pv-link" href="/start?new=1&ref=plan_page_new">
              <Icon name="sparkle" size={16} />
              <span>Start a new plan</span>
            </a>
          )}
          <a className="pv-link" href="/"><span>Back to Wisdom</span></a>
        </div>
      </div>
    </Shell>
  )
}
