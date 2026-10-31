'use client'

/**
 * "Sit closer": the Katha as a conversation. The student's side shows; each tap
 * brings the teacher's answer in, hanging off a gold thread. Progress is
 * exchanges heard. Without JS (and before mount) every verse is visible.
 */
import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { TextVerse, type VerseView } from './parts'

export type SCVerse = VerseView
export type SCExchange = { id: string; title: string; cue?: string; ask: SCVerse[]; answer: SCVerse[] }

type Props = { exchanges: SCExchange[]; text: string; refPrefix: string }

export default function SitCloser({ exchanges, text, refPrefix }: Props) {
  const [enhanced, setEnhanced] = useState(false)
  const [heard, setHeard] = useState(0)
  const [all, setAll] = useState(false)
  const lastAnswer = useRef<HTMLDivElement>(null)
  const total = exchanges.length

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && hash !== 'sit-closer') setAll(true)
    setEnhanced(true)
  }, [])

  // Move focus to the answer that just arrived, without scrolling past it.
  useEffect(() => {
    if (heard > 0) lastAnswer.current?.focus({ preventScroll: true })
  }, [heard])

  const sitCloser = () => {
    const next = heard + 1
    setHeard(next)
    trackEvent(EVENTS.SitCloserClicked, { item_id: exchanges[next - 1]?.id, item_type: 'exchange', position: next, text })
  }

  const readAll = () => {
    setAll(true)
    trackEvent(EVENTS.SitCloserCompleted, { item_id: text, item_type: 'text', heard, method: 'read_all' })
  }

  const showAll = !enhanced || all
  const done = heard >= total

  return (
    <div className={`sc${enhanced && !all ? ' sc-on' : ''}`} id="sit-closer">
      {enhanced && !all && (
        <p className="sc-progress" aria-live="polite">
          {heard === 0 ? `${total} exchanges. The student speaks first.` : `${Math.min(heard, total)} of ${total} exchanges heard`}
        </p>
      )}
      {exchanges.map((ex, i) => {
        const visible = showAll || i <= heard
        const answered = showAll || i < heard
        if (!visible) return null
        return (
          <section key={ex.id} className="sc-ex" aria-labelledby={`sc-${ex.id}`} data-new={!showAll && i === heard - 1 ? '' : undefined}>
            <h3 className="sx-h3 sc-title" id={`sc-${ex.id}`}>
              {ex.title}
            </h3>
            <div className="sc-ask">
              {ex.cue && <p className="sc-cue">{ex.cue}</p>}
              {ex.ask.map((v) => (
                <TextVerse key={v.ref} v={v} label={refPrefix} />
              ))}
            </div>
            {answered ? (
              <div className="sc-answer" tabIndex={-1} ref={!showAll && i === heard - 1 ? lastAnswer : undefined}>
                {ex.answer.map((v) => (
                  <TextVerse key={v.ref} v={v} label={refPrefix} />
                ))}
              </div>
            ) : (
              <div className="sc-cta">
                <button type="button" className="sx-btn sx-btn--primary" onClick={sitCloser}>
                  Sit closer
                </button>
                <button type="button" className="sx-btn sx-btn--link" onClick={readAll}>
                  Read the whole text straight through
                </button>
              </div>
            )}
          </section>
        )
      })}
      {enhanced && !all && done && <p className="sc-progress sc-done">All {total} exchanges heard.</p>}
    </div>
  )
}
