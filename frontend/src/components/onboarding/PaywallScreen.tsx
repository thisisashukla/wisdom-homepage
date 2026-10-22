'use client'

import React, { useState } from 'react'
import Icon from './Icon'
import { haptic } from './motion'

/**
 * The paywall, web edition (the app's Ob22 layout: fixed hero, what you get,
 * the plan as a tile with its badge, one saffron button whose glow breathes,
 * terms / privacy and "Maybe later" with an honest sheet). The app sells a
 * free trial of Pro; the web sells the week: ₹89, weekly, cancel any time.
 */
export default function PaywallScreen({
  price,
  weekTitle,
  day1,
  busy,
  error,
  onPay,
  onSkip,
}: {
  price: number
  weekTitle: string | null
  day1?: { line: string; ref: string | null } | null
  busy: boolean
  error: string | null
  onPay: () => void
  onSkip: () => void
}) {
  const [sheet, setSheet] = useState(false)
  return (
    <>
      <div className="ob-scroll">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise ob-fit" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span>Get a plan</span>
            <em>for your week</em>
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>
            {weekTitle ? <>Week 1, <i>{weekTitle.toLowerCase()}</i>: a verse each morning, chosen for you, and the story that ties it together.</> : 'A verse each morning, chosen for you, and the story that ties it together.'}
          </p>
        </div>
        <div className="ob-strip" aria-label="Day 1 is open; days 2 to 7 open with the week">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className={`ob-strip-day${i === 0 ? ' is-open' : ''}${i === 6 ? ' is-story' : ''}`} style={{ '--d': `${400 + i * 45}ms`, '--l': `${780 + i * 90}ms` } as React.CSSProperties}>
              <span className="ob-strip-n">{i === 6 ? 'Story' : `Day ${i + 1}`}</span>
              <span className="ob-strip-mark">{i === 0 ? <Icon name="check" weight="bold" size={10} /> : <Icon name="lock" size={12} />}</span>
            </div>
          ))}
        </div>
        <p className="ob-strip-caption ob-rise" style={{ '--d': '700ms' } as React.CSSProperties}>Day 1 is yours. Six more days are ready.</p>
        {day1 && (
          <div className="ob-pay-day1 ob-card-in" style={{ '--d': '900ms' } as React.CSSProperties}>
            <span className="ob-eyebrow">Your Day 1</span>
            <p>{day1.line}</p>
            {day1.ref && <span className="ob-pay-ref">{day1.ref}</span>}
          </div>
        )}
      </div>

      <div className="ob-foot ob-rise" style={{ '--d': '480ms', '--dy': '12px' } as React.CSSProperties}>
        <div className="ob-plan-tile ob-card-in" style={{ '--d': '800ms' } as React.CSSProperties} role="radio" aria-checked="true" tabIndex={-1}>
          <span className="ob-plan-ring"><span /></span>
          <span className="ob-plan-label">Weekly</span>
          <span className="ob-plan-price">₹{price}</span>
          <span className="ob-plan-per">a week</span>
          <span className="ob-plan-badge ob-pop" style={{ '--d': '1200ms' } as React.CSSProperties}>Cancel anytime</span>
        </div>
        <div className="ob-cta-breathe">
          <button type="button" className="ob-cta" onClick={() => { haptic(12); onPay() }} disabled={busy}>
            <span className="ob-cta-live" aria-hidden="true" />
            <span className="ob-cta-label">{busy ? 'One moment' : 'Get all seven days'}</span>
          </button>
        </div>
        {error && <p className="ob-error" role="alert">{error}</p>}
        <p className="ob-trust">₹{price} a week. Your bank tells you before every charge. Cancel from your plan in one tap.</p>
        <div className="ob-links">
          <a href="/terms" target="_blank" rel="noopener">Terms</a>
          <span>·</span>
          <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
          <i />
          <button type="button" onClick={() => { haptic(); setSheet(true) }}>Maybe later</button>
        </div>
      </div>

      {sheet && (
        <div className="ob-sheet-veil" onClick={() => setSheet(false)}>
          <div className="ob-sheet" role="dialog" aria-modal="true" aria-label="Stop at Day 1?" onClick={(e) => e.stopPropagation()}>
            <span className="ob-sheet-grip" aria-hidden="true" />
            <h2 className="ob-sheet-title">Stop at<br /><em>Day 1?</em></h2>
            <p className="ob-sheet-body">
              Day 1 is yours to keep. Days 2 to 7, and the story that ties them together, stay locked.
            </p>
            <button type="button" className="ob-cta" onClick={() => setSheet(false)}>
              <span className="ob-cta-live" aria-hidden="true" />
              <span className="ob-cta-label">Keep going</span>
            </button>
            <button type="button" className="ob-sheet-secondary" onClick={() => { setSheet(false); onSkip() }}>Stop at Day 1</button>
          </div>
        </div>
      )}
    </>
  )
}
