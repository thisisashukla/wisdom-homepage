'use client'

/**
 * "How do you feel?" The visitor types in their own words; the words are matched here, in the
 * browser, to states on the map through the feeling-word map and each state's synonyms
 * (no network, no model). One to three states come back, each with a verse, then the next step
 * to a plan made for them. Event: Reflection Submitted { words, states, results } (never the text).
 */

import { useRef, useState } from 'react'
import { NextStep } from '@/components/site'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { loadReflect, matchFeeling, stateHref, type ReflectData } from '@/lib/explore'
import ExploreVerse from './ExploreVerse'
import './explore.css'

const QUICK = ['anxious', 'overthinking', 'hurt', 'angry', 'lonely', 'stuck', 'guilty', 'lost', 'hopeful', 'grateful']

let cache: Promise<ReflectData> | null = null
const data = () => (cache ??= loadReflect())

export default function Reflect({
  compact = false,
  placement,
  onMap = false,
  id = 'reflect',
}: {
  compact?: boolean
  placement: string
  /** On /explore: each result can open its state on the map above. */
  onMap?: boolean
  id?: string
}) {
  const [text, setText] = useState('')
  const [res, setRes] = useState<{ states: string[]; d: ReflectData } | null>(null)
  const [busy, setBusy] = useState(false)
  const outRef = useRef<HTMLDivElement>(null)

  const run = async (value: string) => {
    const t = value.trim()
    if (!t) return
    setBusy(true)
    const d = await data()
    const m = matchFeeling(t, d)
    setRes({ states: m.states, d })
    setBusy(false)
    trackEvent(EVENTS.ReflectionSubmitted, { words: m.words, states: m.states.join(','), results: m.states.length, location: placement })
    requestAnimationFrame(() => outRef.current?.focus({ preventScroll: false }))
  }

  const openOnMap = (st: string) => {
    window.dispatchEvent(new CustomEvent('explore:open', { detail: { state: st } }))
    document.getElementById('map')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className={`ex-reflect${compact ? ' ex-reflect--compact' : ''}`}>
      <form
        className="ex-reflect-form"
        onSubmit={(e) => {
          e.preventDefault()
          run(text)
        }}
      >
        <label htmlFor={`${id}-input`} className="ex-reflect-label">
          How do you feel right now?
        </label>
        <textarea
          id={`${id}-input`}
          className="ex-reflect-input"
          rows={compact ? 2 : 3}
          maxLength={500}
          placeholder="In your own words. For example: I keep replaying what my manager said and I can't sleep."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => void data()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) run(text)
          }}
        />
        <div className="ex-reflect-actions">
          <button type="submit" className="sx-btn sx-btn--primary" disabled={busy || !text.trim()}>
            Find where I am
          </button>
        </div>
        {!compact && (
          <div className="ex-quick" role="group" aria-label="Or start with a word">
            {QUICK.map((w) => (
              <button
                key={w}
                type="button"
                className="sx-chip"
                onClick={() => {
                  setText(w)
                  run(w)
                }}
              >
                {w}
              </button>
            ))}
          </div>
        )}
        <p className="ex-reflect-note">What you type stays on this page. It is matched word by word to the map, and nothing is sent anywhere.</p>
      </form>

      <div className="ex-reflect-out" ref={outRef} tabIndex={-1} aria-live="polite">
        {res && res.states.length === 0 && (
          <p className="ex-reflect-none">
            None of these words is on the map yet. Try a feeling word, like worried, lonely, angry or grateful.
          </p>
        )}
        {res && res.states.length > 0 && (
          <>
            <p className="ex-reflect-lead">
              {res.states.length === 1 ? 'Your words come closest to this place on the map.' : 'Your words come closest to these places on the map.'}
            </p>
            <ol className="ex-matches">
              {res.states.map((st) => {
                const s = res.d.states[st]
                if (!s) return null
                return (
                  <li key={st} className="ex-match">
                    <div className="ex-match-head">
                      <h3 className="ex-match-title">
                        <a
                          href={stateHref(s.slug)}
                          data-mp-location={`${placement}_state`}
                          data-mp-event="State Opened"
                          data-mp-props={JSON.stringify({ item_id: st })}
                        >
                          {s.en[0].toUpperCase() + s.en.slice(1)}
                        </a>
                      </h3>
                      <span className="ex-iast">{s.iast}</span>
                      {onMap && (
                        <button type="button" className="sx-btn sx-btn--link ex-match-map" onClick={() => openOnMap(st)}>
                          Show it on the map
                        </button>
                      )}
                    </div>
                    {s.v && <ExploreVerse v={s.v} why={false} />}
                  </li>
                )
              })}
            </ol>
            <p className="ex-reflect-plain">
              This match goes by single words. A plan made for you reads everything you write and brings one verse a day for it, in order.
            </p>
            <NextStep
              locale="en"
              placement={placement}
              pageKey="explore"
              copy={{
                email: { line: 'Seven days of verses for what you wrote, one each morning.', cta: 'Make my plan' },
                app: { line: 'The Wisdom app reads what you write and makes a plan of verses for it.', cta: 'Make my plan in the app' },
                whatsapp: { line: 'One verse each morning on WhatsApp, for days like this one.', cta: 'Join on WhatsApp' },
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
