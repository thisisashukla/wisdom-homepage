'use client'

import React from 'react'
import type { PlanSummary } from '@/lib/planClient'
import Icon from './Icon'
import { Hero } from './parts'

/**
 * /start for someone who already has a plan (this browser's, or their
 * account's when signed in). Nobody replays the onboarding by accident:
 *  - week in progress: Continue (to /plan) first, a new plan second;
 *  - arrived from a situation (?s=…): a plan for that first, Continue second;
 *  - week complete: Start a new week first, revisit second.
 * A new plan replaces the current week (its emails stop), and says so.
 */
export default function BackScreen({
  plan,
  name,
  situationLabel,
  onContinue,
  onNew,
}: {
  plan: PlanSummary
  name: string | null
  situationLabel: string | null
  onContinue: () => void
  onNew: () => void
}) {
  const first = name?.trim().split(/\s+/)[0] || plan.name || null
  const day = Math.max(1, Math.min(plan.unlocked, 7))
  const done = plan.complete
  const unread = !done && !plan.readDays.includes(day)
  const title = plan.weekTitle ? <i>{plan.weekTitle.toLowerCase()}</i> : 'your week'

  const primary = done
    ? { label: 'Start a new week', go: onNew, kind: 'new' }
    : situationLabel
      ? { label: `Start a plan for ${situationLabel.toLowerCase()}`, go: onNew, kind: 'new' }
      : { label: unread ? `Open Day ${day}` : `Continue · Day ${day} of 7`, go: onContinue, kind: 'continue' }
  const secondary = done
    ? { label: 'Revisit your seven days', go: onContinue, icon: 'quote' }
    : situationLabel
      ? { label: `Continue my week · Day ${day} of 7`, go: onContinue, icon: 'quote' }
      : { label: 'Start a new plan', go: onNew, icon: 'sparkle' }

  return (
    <>
      <div className="ob-scroll">
        <Hero
          title={done ? 'Your week is' : first ? <>Welcome back, {first}</> : 'Welcome back'}
          accent={done ? 'complete' : undefined}
          sub={
            done
              ? <>Seven mornings with {title}. What is on your mind now? A new week can be chosen for it.</>
              : situationLabel
                ? <>You are on Day {day} of 7, with {title}. Or begin a new week for {situationLabel.toLowerCase()}.</>
                : <>You are on Day {day} of 7, with {title}.{unread ? ' Today’s verse is waiting.' : ' Tomorrow’s arrives in the morning.'}</>
          }
        />
        <div className="pv-back-days ob-rise" style={{ '--d': '320ms' } as React.CSSProperties} aria-hidden="true">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n} className={`${plan.readDays.includes(n) ? 'is-read' : ''}${n === day && !done ? ' is-today' : ''}${n > day ? ' is-locked' : ''}`}>{plan.readDays.includes(n) ? '✓' : n}</span>
          ))}
        </div>
      </div>
      <div className="ob-foot ob-rise" style={{ '--d': '480ms', '--dy': '12px' } as React.CSSProperties}>
        <button type="button" className="ob-cta" onClick={primary.go}>
          <span className="ob-cta-live" aria-hidden="true" />
          <span className="ob-cta-label">{primary.label}</span>
        </button>
        <div className="pv-actions">
          <button type="button" className="pv-link" onClick={secondary.go}>
            <Icon name={secondary.icon} size={16} />
            <span>{secondary.label}</span>
          </button>
        </div>
        {(primary.kind === 'new' || secondary.icon === 'sparkle') && !done && (
          <p className="ob-privacy">A new plan replaces this week, and its morning emails stop.</p>
        )}
      </div>
    </>
  )
}
