'use client'

import React from 'react'
import Icon from './Icon'
import { Cta, Hero } from './parts'

/**
 * Right after Google sign-in: a welcome, not a request. Their week opens in
 * the background while they read this; the button takes them into it.
 */
export default function WelcomeScreen({
  name,
  weekTitle,
  emailedTo,
  daily,
  ready,
  busy,
  error,
  onOpen,
}: {
  name: string | null
  weekTitle: string | null
  emailedTo: string | null
  daily?: boolean
  ready: boolean
  busy: boolean
  error: string | null
  onOpen: () => void
}) {
  const first = name?.trim().split(/\s+/)[0] || null
  const rows = [
    { icon: 'lotus', text: 'One verse each morning. A few quiet minutes is enough.' },
    { icon: 'journal', text: 'Stay with the line that speaks to you, and carry it into your day.' },
    daily && emailedTo
      ? { icon: 'map', text: <>Each morning&apos;s verse comes to <b>{emailedTo}</b> around 7. Day 1 is there now.</> }
      : daily
        ? { icon: 'map', text: 'Each morning’s verse comes to your inbox around 7, and opens on any device.' }
        : emailedTo
          ? { icon: 'map', text: <>Your week is in your inbox at <b>{emailedTo}</b>, for the mornings you are away.</> }
          : { icon: 'map', text: 'Come back here each morning to open the next day.' },
  ]
  return (
    <>
      <div className="ob-scroll">
        <Hero
          title={first ? <>Welcome, {first}</> : 'Welcome'}
          accent="your week has begun"
          sub="You have read Day 1. Six more days are waiting, chosen for where you are right now."
        >
          {weekTitle && (
            <p className="ob-week-chip ob-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
              <b>Week 1</b><i /><span>{weekTitle}</span>
            </p>
          )}
        </Hero>
        <div className="ob-kept ob-rise" style={{ '--d': '440ms', '--dy': '12px' } as React.CSSProperties}>
          {rows.map((r, i) => (
            <div key={i} className="ob-kept-row">
              <span className="ob-kept-icon"><Icon name={r.icon} weight="duotone" size={16} /></span>
              <span>{r.text}</span>
            </div>
          ))}
        </div>
        {error && <p className="ob-error" role="alert">{error}</p>}
      </div>
      <Cta delay={640} busy={busy && !ready} onClick={onOpen}>
        {ready ? 'Begin my week' : busy ? 'Preparing your week' : 'Begin my week'}
      </Cta>
    </>
  )
}
