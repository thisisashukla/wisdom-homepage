'use client'

import React, { useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { LOGO_2X } from '@/lib/onboarding/profile'

/** Copy and links for each kind of email: a 7-day plan's mornings, or the daily verse for signed-in readers. */
const KINDS = {
  plan: {
    endpoint: '/api/plan/unsubscribe',
    page: 'Plan Unsubscribe',
    done: 'No more emails for this plan. Your week stays on your plan page whenever you want it.',
    ask: 'You will get no more verses by email for this plan. Your week stays on your plan page.',
    home: (t: string) => `/plan?t=${t}`,
    homeLabel: 'Open my plan',
  },
  daily: {
    endpoint: '/api/daily/unsubscribe',
    page: 'Daily Unsubscribe',
    done: 'No more morning verses. Your place in the Gita stays saved whenever you come back.',
    ask: 'You will get no more morning verses by email. Your place in the Gita stays saved.',
    home: () => '/gita',
    homeLabel: 'Back to the Gita',
  },
} as const

export default function UnsubscribeView({ token, kind = 'plan' }: { token: string | null; kind?: keyof typeof KINDS }) {
  const k = KINDS[kind]
  const [state, setState] = useState<'ask' | 'busy' | 'done' | 'error'>(token ? 'ask' : 'error')

  const stop = async () => {
    if (!token) return
    setState('busy')
    try {
      const res = await fetch(k.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ t: token }) })
      if (!res.ok) throw new Error(String(res.status))
      trackEvent(kind === 'daily' ? EVENTS.DailyEmailUnsubscribed : EVENTS.PlanUnsubscribed, { page: k.page })
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
                  ? k.done
                  : state === 'error'
                    ? 'This link did not work. Open the button in your newest Wisdom email, or reply to it and we will stop them by hand.'
                    : k.ask}
              </p>
            </div>
          </div>
          <div className="ob-foot ob-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
            {state === 'done' || state === 'error' ? (
              token ? (
                <a className="ob-cta ob-cta-link" href={k.home(token)}>
                  <span className="ob-cta-live" aria-hidden="true" />
                  <span className="ob-cta-label">{k.homeLabel}</span>
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
                  <a className="pv-link" href={token ? k.home(token) : '/'}><span>Keep them coming</span></a>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
