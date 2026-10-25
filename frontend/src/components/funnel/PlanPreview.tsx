'use client'

import React, { useRef, useState } from 'react'
import { SAMPLE_PLANS, SAMPLE_PLANS_DATE } from '@/lib/samplePlans'
import { trackEvent } from '@/lib/mixpanel'
import CreatePlanLink from './CreatePlanLink'

/**
 * Section 2 of the homepage: pick a situation, see the real 7-day plan Wisdom
 * makes for it, then create your own. The button opens the onboarding with the
 * tab's situation (/start?s=…), or the App Store on iPhone.
 */
export default function PlanPreview({ pageName = 'Home' }: { pageName?: string }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const plan = SAMPLE_PLANS[active]
  const [day1, ...rest] = plan.days

  const select = (i: number, focus = false) => {
    if (i === active) return
    setActive(i)
    if (focus) tabs.current[i]?.focus()
    trackEvent('Plan Preview Tab', { page: pageName, situation: SAMPLE_PLANS[i].situation })
  }

  const onKey = (e: React.KeyboardEvent) => {
    const n = SAMPLE_PLANS.length
    if (e.key === 'ArrowRight') select((active + 1) % n, true)
    else if (e.key === 'ArrowLeft') select((active - 1 + n) % n, true)
    else return
    e.preventDefault()
  }

  return (
    <div className="pp">
      <div className="pp-tabs" role="tablist" aria-label="Situations" onKeyDown={onKey}>
        {SAMPLE_PLANS.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`pp-tab-${p.id}`}
            aria-selected={i === active}
            aria-controls="pp-panel"
            tabIndex={i === active ? 0 : -1}
            className={`pp-tab${i === active ? ' is-on' : ''}`}
            onClick={() => select(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="pp-card" role="tabpanel" id="pp-panel" aria-labelledby={`pp-tab-${plan.id}`} key={plan.id}>
        <div className="pp-day1">
          <div className="pp-meta" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="pp-dn">Day 1</span> · {day1.phase} ·{' '}
            {day1.href ? (
              <a href={day1.href} data-mp-location={`home_plan_preview_verse_${plan.id}`}>
                {day1.source}
              </a>
            ) : (
              day1.source
            )}
          </div>
          {day1.sanskrit && (
            <p className="pp-sa" lang="sa" style={{ '--i': 1 } as React.CSSProperties}>
              {day1.sanskrit}
            </p>
          )}
          <p className="pp-line" style={{ '--i': 2 } as React.CSSProperties}>
            {day1.line}
          </p>
          {day1.forYou && (
            <p className="pp-for" style={{ '--i': 3 } as React.CSSProperties}>
              <span>For you</span> {day1.forYou}
            </p>
          )}
        </div>

        <div className="pp-week">
          <div className="pp-week-title">
            Week 1 · <em>{plan.title}</em>
          </div>
          <ol className="pp-days">
            {rest.map((d, i) => (
              <li key={d.day} className={d.phase === 'A story' ? 'is-story' : undefined} style={{ '--i': i + 1 } as React.CSSProperties}>
                <span className="pp-n" aria-hidden="true">{d.day}</span>
                <div>
                  <div className="pp-meta">
                    <span className="sr-only">Day {d.day} · </span>
                    {d.phase} · {d.source}
                  </div>
                  <p className="pp-l">{d.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="pp-cta">
        <CreatePlanLink
          className="btn-read-gita btn-read-gita-primary"
          campaign="web_plan_preview"
          refTag={`plan_preview_${plan.id}`}
          situation={plan.situation}
          location={`home_plan_preview_create_${plan.id}`}
          pageName={pageName}
        >
          Create my 7-day Gita plan · Week 1 free
        </CreatePlanLink>
        <p className="pp-fine">Yours is made for what you tell it. Week 1 is free.</p>
      </div>
      <p className="pp-foot">
        Real plans Wisdom made on {SAMPLE_PLANS_DATE}, one tap each, shown as returned. Day 1 is always from the Gita.
      </p>
    </div>
  )
}
