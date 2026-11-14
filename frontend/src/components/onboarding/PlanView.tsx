'use client'

import React, { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { LOGO_2X } from '@/lib/onboarding/profile'
import type { SavedPlan } from '@/lib/server/webPlans'
import Icon from './Icon'
import { VerseFace } from './VerseScreen'

/**
 * /plan: the saved week, opened from an email on any device (or from /start).
 * Today first: Day N is open, days already read carry a tick, days still to
 * come say which morning they arrive (they can be read ahead). Opening a day
 * marks it read; each day asks "Did this help?". The same look as /start.
 */
export const PLAN_TOKEN_KEY = 'wisdom_plan_token'

const BEAT_LABEL: Record<string, string> = { hook: 'Where you are', diagnose: "What's underneath", steady: 'What steadies you', act: 'What to do', story: 'A story' }
type Feedback = 'helped' | 'not_for_me'

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

export default function PlanView({
  token,
  plan,
  missing,
  initialDay,
  fb,
}: {
  token: string | null
  plan: SavedPlan | null
  missing: boolean
  initialDay: number | null
  fb: Feedback | null
}) {
  const [checking, setChecking] = useState(!token)
  const today = plan ? Math.min(plan.today, 8) : 1
  const current = Math.min(today, 7)
  const [open, setOpen] = useState<number>(initialDay ?? current)
  const [read, setRead] = useState<number[]>(plan?.readDays ?? [])
  const [feedback, setFeedback] = useState<Record<string, Feedback>>(plan?.feedback ?? {})
  const [thanks, setThanks] = useState<string | null>(null)
  const marked = useRef(new Set<number>())
  const source = useRef<'email' | 'web'>(initialDay ? 'email' : 'web')

  // No token in the link: use the plan this browser saved, if any.
  useEffect(() => {
    if (token) {
      try { localStorage.setItem(PLAN_TOKEN_KEY, token) } catch {}
      return
    }
    let saved: string | null = null
    try { saved = localStorage.getItem(PLAN_TOKEN_KEY) } catch {}
    if (saved && /^[0-9a-f]{48}$/.test(saved)) window.location.replace(`/plan?t=${saved}`)
    else setChecking(false)
  }, [token])

  useEffect(() => {
    if (!plan || !token) return
    trackEvent(EVENTS.PlanPageViewed, { page: 'Plan', source: source.current, today, day: initialDay ?? current, status: plan.status, read_days: plan.readDays.length, fb: fb ?? null })
    // A tap on "Yes, it helped" / "Not for me" in the email lands here; record it now (link scanners don't run this).
    if (fb && initialDay) {
      setFeedback((f) => ({ ...f, [String(initialDay)]: fb }))
      setThanks(fb === 'helped' ? 'Thank you. Glad it helped.' : 'Thank you for saying. It helps us choose better.')
      void post({ t: token, d: initialDay, read: true, feedback: fb })
      trackEvent(EVENTS.PlanDayFeedback, { page: 'Plan', day: initialDay, feedback: fb, source: 'email' })
      marked.current.add(initialDay)
      setRead((r) => (r.includes(initialDay) ? r : [...r, initialDay]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Opening a day marks it read (once a visit).
  useEffect(() => {
    if (!plan || !token || !open || marked.current.has(open)) return
    marked.current.add(open)
    setRead((r) => (r.includes(open) ? r : [...r, open]))
    void post({ t: token, d: open, read: true })
    trackEvent(EVENTS.PlanDayOpened, { page: 'Plan', day: open, today, ahead: open > today, source: source.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!plan || !token) return checking ? <Shell><div /></Shell> : <Empty missing={missing} />

  const rate = (day: number, v: Feedback) => {
    setFeedback((f) => ({ ...f, [String(day)]: v }))
    void post({ t: token, d: day, read: true, feedback: v })
    trackEvent(EVENTS.PlanDayFeedback, { page: 'Plan', day, feedback: v, source: 'web' })
  }

  const done = today > 7
  const emailsOn = plan.status === 'active'
  const sub = done
    ? 'Week 1 is complete. Every day stays here to come back to.'
    : emailsOn
      ? <>A new day arrives at <b>{plan.email}</b> each morning, around 7.</>
      : plan.status === 'unsubscribed'
        ? 'Morning emails are off. Your week stays here; open a day whenever you like.'
        : 'Your week stays here; open a day whenever you like.'

  return (
    <Shell>
      <div className="ob-scroll">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            {done ? <><span>Your seven </span><em>days</em></> : <><span>Day {current} </span><em>of 7</em></>}
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '160ms' } as React.CSSProperties}>{sub}</p>
          {plan.weekTitle && (
            <p className="ob-week-chip ob-rise" style={{ '--d': '280ms' } as React.CSSProperties}>
              <b>Week 1</b><i /><span>{plan.weekTitle}</span>
            </p>
          )}
          <ol className="pv-dots ob-rise" style={{ '--d': '360ms' } as React.CSSProperties} aria-label={`${read.length} of 7 days read`}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <li key={n} className={`${read.includes(n) ? 'is-read' : ''}${n === current && !done ? ' is-today' : ''}`}>
                <span className="sr-only">Day {n}{read.includes(n) ? ', read' : ''}</span>
              </li>
            ))}
          </ol>
        </div>
        {thanks && <p className="pv-thanks" role="status">{thanks}</p>}

        <div className="ob-plan-list">
          {plan.days.map((d, i) => {
            const isOpen = open === d.day
            const isStory = d.beat === 'story'
            const isRead = read.includes(d.day)
            const ahead = d.day > today
            const tag = d.day === today ? 'Today' : ahead ? (d.day === today + 1 ? 'Tomorrow' : weekday(plan.startDate, d.day)) : null
            const v = feedback[String(d.day)]
            return (
              <div key={d.day} className={`ob-plan-day ob-card-in${isStory ? ' is-story' : ''}${isOpen ? ' is-open' : ''}${ahead ? ' pv-ahead' : ''}`} style={{ '--d': `${420 + i * 70}ms` } as React.CSSProperties}>
                <button type="button" className="ob-plan-head" onClick={() => setOpen(isOpen ? 0 : d.day)} aria-expanded={isOpen}>
                  <b>Day {d.day}</b>
                  <span>{BEAT_LABEL[d.beat] ?? ''}</span>
                  <i />
                  {tag && <em className={`pv-tag${d.day === today ? ' is-today' : ''}`}>{tag}</em>}
                  {isRead && !isOpen ? <span className="pv-tick" aria-label="Read">✓</span> : <span className="ob-plan-caret" aria-hidden="true">{isOpen ? '−' : '+'}</span>}
                </button>
                {!isOpen && <p className="ob-plan-line">{isStory ? d.story?.title ?? d.line : d.line}</p>}
                {isOpen && (
                  <div className="ob-plan-body">
                    {ahead && <p className="pv-ahead-note">{emailsOn ? `This one arrives ${tag === 'Tomorrow' ? 'tomorrow' : tag} morning. Reading ahead is fine.` : 'Reading ahead is fine.'}</p>}
                    {isStory ? (
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
                      <span>Did this help?</span>
                      <button type="button" className={v === 'helped' ? 'is-on' : ''} aria-pressed={v === 'helped'} onClick={() => rate(d.day, 'helped')}>Yes, it helped</button>
                      <button type="button" className={v === 'not_for_me' ? 'is-on' : ''} aria-pressed={v === 'not_for_me'} onClick={() => rate(d.day, 'not_for_me')}>Not for me</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="ob-plan-foot">
          {emailsOn ? (
            <>One email a morning until Day 7, then it stops. <a href={`/plan/unsubscribe?t=${token}`}>Stop morning emails</a></>
          ) : (
            'This page keeps your week. Bookmark it, or open it from any Wisdom email.'
          )}
        </p>
      </div>
      <div className="ob-foot ob-rise" style={{ '--d': '700ms' } as React.CSSProperties}>
        <div className="pv-actions">
          <a className="pv-link" href="/start?new=1&ref=plan_page_new">
            <Icon name="sparkle" size={16} />
            <span>Start a new plan</span>
          </a>
          <a className="pv-link" href="/">
            <span>Back to Wisdom</span>
          </a>
        </div>
      </div>
    </Shell>
  )
}
