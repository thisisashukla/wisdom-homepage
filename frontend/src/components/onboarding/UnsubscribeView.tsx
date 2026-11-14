'use client'

import React, { useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { LOGO_2X } from '@/lib/onboarding/profile'

export default function UnsubscribeView({ token }: { token: string | null }) {
  const [state, setState] = useState<'ask' | 'busy' | 'done' | 'error'>(token ? 'ask' : 'error')

  const stop = async () => {
    if (!token) return
    setState('busy')
    try {
      const res = await fetch('/api/plan/unsubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ t: token }) })
      if (!res.ok) throw new Error(String(res.status))
      trackEvent(EVENTS.PlanUnsubscribed, { page: 'Plan Unsubscribe' })
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="ob">
      <div className="ob-glow" aria-hidden="true" />
      <div className="ob-phone">
        <div className="ob-logo is-up" aria-hidden="true">
          <span className="ob-logo-halo" />
          <img src={LOGO_2X} alt="" width={48} height={48} />
        </div>
        <main className="ob-screen">
          <div className="ob-scroll">
            <div className="ob-hero">
              <div className="ob-logo-slot" aria-hidden="true" />
              <h1 className="ob-title ob-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
                {state === 'done' ? <><span>Morning emails </span><em>stopped</em></> : <><span>Stop morning </span><em>emails?</em></>}
              </h1>
              <p className="ob-sub ob-rise" style={{ '--d': '160ms' } as React.CSSProperties}>
                {state === 'done'
                  ? 'No more emails for this plan. Your week stays on your plan page whenever you want it.'
                  : state === 'error'
                    ? 'This link did not work. Open the button in your newest Wisdom email, or reply to it and we will stop them by hand.'
                    : 'You will get no more verses by email for this plan. Your week stays on your plan page.'}
              </p>
            </div>
          </div>
          <div className="ob-foot ob-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
            {state === 'done' || state === 'error' ? (
              token ? (
                <a className="ob-cta ob-cta-link" href={`/plan?t=${token}`}>
                  <span className="ob-cta-live" aria-hidden="true" />
                  <span className="ob-cta-label">Open my plan</span>
                </a>
              ) : (
                <a className="ob-cta ob-cta-link" href="/">
                  <span className="ob-cta-live" aria-hidden="true" />
                  <span className="ob-cta-label">Back to Wisdom</span>
                </a>
              )
            ) : (
              <>
                <button type="button" className="ob-cta" onClick={stop} disabled={state === 'busy'}>
                  <span className="ob-cta-live" aria-hidden="true" />
                  <span className="ob-cta-label">{state === 'busy' ? 'One moment' : 'Stop the emails'}</span>
                </button>
                <div className="pv-actions">
                  <a className="pv-link" href={`/plan?t=${token}`}><span>Keep them coming</span></a>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
