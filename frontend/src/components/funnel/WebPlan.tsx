'use client'

import { useState } from 'react'
import { api, bgLink } from '@/lib/funnelClient'
import { trackEvent } from '@/lib/mixpanel'

export type WebPlanData = {
  mirror: string | null
  insight: string | null
  week: { week: number; title: string } | null
  weeks: { week: number; title: string; level: string }[]
  safety: { message: string; lines: { region: string; name: string; contact: string }[] } | null
  days: {
    day: number
    phase: string
    verse: {
      id: string
      ref: string
      sanskrit: string | null
      line: string
      meaning: string | null
      forYou: string | null
      setting: string | null
    } | null
    story: { title: string | null; summary: string | null; lesson: string | null } | null
  }[]
}

const PHASE: Record<string, string> = { see: 'See it', steady: 'Steady it', act: 'Act on it', story: 'A story' }

/** The paid 7-day plan, one card per day. Day 1 opens; the rest unfold. */
export default function WebPlan({ plan }: { plan: WebPlanData }) {
  return (
    <section className="yv-plan" aria-label="Your 7-day plan">
      <div className="yv-plan-head">
        <div className="yv-step">Your 7 days</div>
        <h3>{plan.week?.title ?? 'Your week'}</h3>
        {plan.insight && <p className="yv-insight">{plan.insight}</p>}
      </div>
      {plan.safety && (
        <div className="yv-safety" role="alert">
          <p>{plan.safety.message}</p>
          <ul>
            {plan.safety.lines.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong> ({l.region}): {l.contact}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ol className="yv-days">
        {plan.days.map((d) => {
          const link = d.verse ? bgLink(d.verse.id) : null
          return (
            <li key={d.day}>
              <details open={d.day === 1}>
                <summary>
                  <span className="yv-day-n">Day {d.day}</span>
                  <span className="yv-day-phase">{PHASE[d.phase] ?? d.phase}</span>
                  <span className="yv-day-title">{d.story?.title ?? d.verse?.line ?? ''}</span>
                </summary>
                {d.verse && (
                  <div className="yv-day-body">
                    <div className="yv-card-ref">{d.verse.ref}</div>
                    {d.verse.sanskrit && <p className="yv-sanskrit" lang="sa">{d.verse.sanskrit}</p>}
                    <blockquote className="yv-line">“{d.verse.line}”</blockquote>
                    {d.verse.meaning && <p>{d.verse.meaning}</p>}
                    {d.verse.forYou && (
                      <p className="yv-foryou">
                        <strong>For you: </strong>
                        {d.verse.forYou}
                      </p>
                    )}
                    {link && <a className="yv-link" href={link}>Read with commentary →</a>}
                  </div>
                )}
                {d.story && (
                  <div className="yv-day-body">
                    {d.story.summary && <p>{d.story.summary}</p>}
                    {d.story.lesson && (
                      <p className="yv-foryou">
                        <strong>What it teaches: </strong>
                        {d.story.lesson}
                      </p>
                    )}
                  </div>
                )}
              </details>
            </li>
          )
        })}
      </ol>
      {plan.weeks.length > 1 && (
        <p className="yv-fine">
          Next: week 2, {plan.weeks[1].title.toLowerCase()}. It opens when you finish this week.
        </p>
      )}
      <CancelLink />
    </section>
  )
}

function CancelLink() {
  const [state, setState] = useState<'idle' | 'confirm' | 'done' | 'error'>('idle')
  if (state === 'done') return <p className="yv-fine">Cancelled. You keep access until the end of this paid week.</p>
  if (state === 'confirm')
    return (
      <p className="yv-fine">
        Stop the weekly ₹89?{' '}
        <button
          type="button"
          className="yv-link"
          onClick={async () => {
            try {
              await api('/api/pay/cancel', { body: {} })
              trackEvent('Subscription Cancelled', { product: 'web_plan_weekly' })
              setState('done')
            } catch {
              setState('error')
            }
          }}
        >
          Yes, cancel
        </button>{' '}
        <button type="button" className="yv-link" onClick={() => setState('idle')}>Keep it</button>
      </p>
    )
  return (
    <p className="yv-fine">
      {state === 'error' ? 'Could not cancel just now. Write to work.ankurshukla@gmail.com and we will stop it today. ' : null}
      <button type="button" className="yv-link" onClick={() => setState('confirm')}>Cancel subscription</button>
    </p>
  )
}
