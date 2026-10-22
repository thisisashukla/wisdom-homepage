'use client'

import React from 'react'
import Icon from './Icon'
import { GoogleMark, Hero } from './parts'

/**
 * Sign-up, once the questions are done (the app's Ob22b "Keep what you've
 * begun", with Google in place of Apple). It comes before the verse is
 * chosen, because the verse is chosen for this account.
 */
const KEPT = [
  { icon: 'map', text: 'Your plan, and every verse you uncover' },
  { icon: 'journal', text: 'What you said, used once to choose your verses' },
  { icon: 'phone', text: 'Day 1 is free. No card to see it.' },
]

export default function SignInScreen({ onSignIn, busy, error }: { onSignIn: () => void; busy: boolean; error: string | null }) {
  return (
    <>
      <Hero title="Keep what" accent="you've begun" sub="Sign in so your seven days stay yours." />
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
          <span>{busy ? 'One moment' : 'Continue with Google'}</span>
        </button>
        {error && <p className="ob-error" role="alert">{error}</p>}
        <p className="ob-privacy">
          <Icon name="lock" weight="bold" size={12} />
          <span>We don&apos;t post anything or send you marketing email.</span>
        </p>
      </div>
    </>
  )
}
