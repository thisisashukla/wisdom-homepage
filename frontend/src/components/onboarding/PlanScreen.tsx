'use client'

import React, { useState } from 'react'
import Icon from './Icon'
import { VerseFace } from './VerseScreen'
import { Cta } from './parts'
import type { PreviewDay } from './WeekScreen'

/**
 * The week, after Day 1. Week 1 is free: all seven days open, each one
 * tapped open to its Sanskrit, what it says and what it says to them. While
 * the week is opening (or if that fails), Day 1 is open and the rest show as
 * on the week screen.
 */
export type FullDay = {
  day: number
  beat: string
  phase: string
  ref: string | null
  sanskrit: string | null
  line: string | null
  meaning: string | null
  forYou: string | null
  story: { title: string | null; summary: string | null; lesson: string | null } | null
}
const BEAT_LABEL: Record<string, string> = { hook: 'Where you are', diagnose: "What's underneath", steady: 'What steadies you', act: 'What to do', story: 'A story' }

export default function PlanScreen({
  days,
  preview,
  hook,
  weekTitle,
  open: paid,
  loading,
  error,
  emailedTo,
  onRetry,
}: {
  days: FullDay[] | null
  preview: PreviewDay[] | null
  hook: { sanskrit: string | null; line: string; ref: string | null } | null
  weekTitle: string | null
  open: boolean
  loading: boolean
  error: string | null
  emailedTo: string | null
  onRetry: () => void
}) {
  const [open, setOpen] = useState<number>(1)
  const list: (FullDay | (PreviewDay & { locked: true }))[] = paid && days ? days : (preview ?? []).map((d) => ({ ...d, locked: true as const }))
  return (
    <>
      <div className="ob-scroll">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise ob-fit" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span>Your seven</span>
            <em>days</em>
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>
            {paid ? 'Week 1 is yours, free. One a day is enough: open each on its morning.' : loading ? 'Opening your week…' : 'Day 1 is open. The rest of your week is a moment away.'}
          </p>
          {weekTitle && (
            <p className="ob-week-chip ob-rise" style={{ '--d': '320ms' } as React.CSSProperties}>
              <b>Week 1</b><i /><span>{weekTitle}</span>
            </p>
          )}
        </div>
        <div className="ob-plan-list">
          {list.map((d, i) => {
            const locked = 'locked' in d && d.day !== 1
            const isOpen = !locked && open === d.day
            const full = 'sanskrit' in d ? d : null
            const isStory = d.beat === 'story'
            const face = d.day === 1 && hook ? hook : full ? { sanskrit: full.sanskrit, line: full.line, ref: full.ref } : null
            return (
              <div key={d.day} className={`ob-plan-day ob-card-in${isStory ? ' is-story' : ''}${locked ? ' is-locked' : ''}${isOpen ? ' is-open' : ''}`} style={{ '--d': `${400 + i * 90}ms` } as React.CSSProperties}>
                <button type="button" className="ob-plan-head" onClick={() => !locked && setOpen(isOpen ? 0 : d.day)} aria-expanded={isOpen} disabled={locked}>
                  <b>Day {d.day}</b>
                  <span>{BEAT_LABEL[d.beat] ?? ''}</span>
                  <i />
                  {locked ? <Icon name="lock" size={14} /> : <span className="ob-plan-caret" aria-hidden="true">{isOpen ? '−' : '+'}</span>}
                </button>
                {!isOpen && <p className={`ob-plan-line${locked && !isStory ? ' is-glimpse' : ''}`}>{d.line}</p>}
                {isOpen && (
                  <div className="ob-plan-body">
                    {isStory && full?.story ? (
                      <>
                        <p className="ob-story-title">{full.story.title ?? full.line}</p>
                        {full.story.summary && <p className="ob-plan-meaning">{full.story.summary}</p>}
                        {(full.forYou || full.story.lesson) && (
                          <div className="ob-for-you"><span className="ob-eyebrow">For you</span><p>{full.forYou || full.story.lesson}</p></div>
                        )}
                        {full.ref && <p className="ob-ref">{full.ref}</p>}
                      </>
                    ) : (
                      <>
                        {face && <VerseFace verse={face} />}
                        {full?.meaning && <><span className="ob-eyebrow">What it says</span><p className="ob-plan-meaning">{full.meaning}</p></>}
                        {full?.forYou && <div className="ob-for-you"><span className="ob-eyebrow">For you</span><p>{full.forYou}</p></div>}
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {paid && (
          <p className="ob-plan-foot">
            {emailedTo ? <>All seven days are in your inbox at <b>{emailedTo}</b>. They&apos;re saved in this browser too.</> : 'Your week is saved in this browser.'}
          </p>
        )}
        {error && <p className="ob-error" role="alert">{error}</p>}
      </div>
      {!paid ? (
        <Cta delay={700} busy={loading} onClick={onRetry}>{loading ? 'Opening your week' : 'Open my week'}</Cta>
      ) : (
        <div className="ob-foot ob-rise" style={{ '--d': '700ms' } as React.CSSProperties}>
          <a className="ob-cta ob-cta-link" href="/">
            <span className="ob-cta-live" aria-hidden="true" />
            <span className="ob-cta-label">Back to Wisdom</span>
          </a>
        </div>
      )}
    </>
  )
}
