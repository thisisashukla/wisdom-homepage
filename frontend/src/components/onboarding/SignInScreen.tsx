'use client'

import React from 'react'
import Icon from './Icon'
import { GoogleMark, Hero } from './parts'

/**
 * After Day 1 (the app's Ob22b "Keep what you've begun", with Google in place
 * of Apple): they have had their verse; signing in sends the whole free week
 * to their inbox and opens it here.
 */
const KEPT = [
  { icon: 'journal', text: 'All seven days in your inbox, to read each morning' },
  { icon: 'map', text: 'Your week opens here too, right away' },
  { icon: 'phone', text: 'Week 1 is free. No card needed.' },
]

export default function SignInScreen({ onSignIn, busy, error, weekTitle }: { onSignIn: () => void; busy: boolean; error: string | null; weekTitle?: string | null }) {
  return (
    <>
      <Hero title="Get your week" accent="by email" sub={weekTitle ? <>Week 1, <i>{weekTitle.toLowerCase()}</i>: a week of verses chosen for you, free.</> : 'A week of verses chosen for you, free. Sign in and we send them to you.'} />
      <div className="ob-kept ob-rise" style={{ '--d': '320ms', '--dy': '12px' } as React.CSSProperties}>
        {KEPT.map((k) => (
          <div key={k.text} className="ob-kept-row">
            <span className="ob-kept-icon"><Icon name={k.icon} weight="duotone" size={16} /></span>
            <span>{k.text}</span>
          </div>
        ))}
      </div>
      <div className="ob-flex" />
      <div className="ob-foot ob-rise" style={{ '--d': '480ms', '--dy': '12px' } as React.CSSProperties}>
        <button type="button" className="ob-google" onClick={onSignIn} disabled={busy}>
          <GoogleMark />
          <span>{busy ? 'One moment' : 'Email me with Google'}</span>
        </button>
        {error && <p className="ob-error" role="alert">{error}</p>}
        <p className="ob-privacy">
          <Icon name="lock" weight="bold" size={12} />
          <span>Only your plan. No marketing email, and we never post anything.</span>
        </p>
      </div>
    </>
  )
}
