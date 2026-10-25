'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { Cta, Hero } from './parts'
import { haptic, reducedMotion } from './motion'
import { noteExamplesFor } from '@/lib/onboarding/noteExamples'
import { noteHeading, type AgeId, type NeedId, type StageId } from '@/lib/onboarding/profile'

/**
 * In their own words, optional (wisdom/app/screens/onboarding/Ob04_NoteScreen.tsx).
 * Example notes drift in from the right as paper cards and keep gliding,
 * looping; a touch pauses them. Below, a large mic: it breathes at rest;
 * tapped, it deepens, rings ripple out and a waveform follows while their
 * words appear where the examples were (Web Speech API where the browser has
 * it). "Type it instead" grows a text box into that space. The heading is an
 * instruction in their own word ("Hurt" → "Tell us what hurt you."). Continue
 * ("Curate my plan") is live from the start.
 */
const MAX = 1000
const BARS = 29
const DRIFT = 22 // px per second
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const join = (a: string, b: string) => [a.trim(), b.trim()].filter(Boolean).join(' ')

type Rec = { start: () => void; stop: () => void; abort: () => void; onresult: unknown; onend: unknown; onerror: unknown; onaudiostart: unknown; continuous: boolean; interimResults: boolean; lang: string }
const SpeechCtor = (): (new () => Rec) | null => {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export default function NoteScreen({
  need,
  emotion,
  age,
  stages,
  initial,
  initialSource,
  onDone,
}: {
  need?: NeedId
  emotion?: string
  age?: AgeId
  stages: StageId[]
  initial?: string
  initialSource?: 'voice' | 'text'
  onDone: (note: string, source?: 'voice' | 'text') => void
}) {
  const heading = noteHeading(emotion, need)
  const examples = useMemo(() => noteExamplesFor(need, age, stages), [need, age, stages])
  const [note, setNote] = useState(initial ?? '')
  const [source, setSource] = useState<'voice' | 'text' | undefined>(initialSource)
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [voice, setVoice] = useState<'idle' | 'listening' | 'unavailable' | 'denied'>('idle')
  const [take, setTake] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [levels, setLevels] = useState<number[]>(() => Array(BARS).fill(0.12))
  const base = useRef('')
  const rec = useRef<Rec | null>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const recording = voice === 'listening'
  const shown = recording ? join(base.current, take) : note

  useEffect(() => {
    if (!SpeechCtor()) setVoice('unavailable')
    return () => rec.current?.abort()
  }, [])

  // The example rail glides on its own, looping; a touch hands it over for 2.5 s.
  const rail = useRef<HTMLDivElement>(null)
  const held = useRef(false)
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const el = rail.current
    if (!el || typing || recording || reducedMotion()) return
    let raf = 0
    let last = 0
    let pos = el.scrollLeft
    const loopW = el.scrollWidth / 2
    const step = (t: number) => {
      if (last && !held.current) {
        pos += (DRIFT * (t - last)) / 1000
        if (pos >= loopW) pos -= loopW
        el.scrollLeft = pos
      } else if (held.current) pos = el.scrollLeft
      last = t
      raf = requestAnimationFrame(step)
    }
    const begin = setTimeout(() => { raf = requestAnimationFrame(step) }, 1440)
    return () => { clearTimeout(begin); cancelAnimationFrame(raf) }
  }, [typing, recording])
  const hold = () => { held.current = true; if (resume.current) clearTimeout(resume.current) }
  const letGo = () => {
    if (resume.current) clearTimeout(resume.current)
    resume.current = setTimeout(() => { held.current = false }, 2500)
  }

  // Recording: a clock, and a waveform tallest in the middle that lifts as words arrive.
  useEffect(() => {
    if (!recording) { setLevels(Array(BARS).fill(0.12)); return }
    setSeconds(0)
    const clockT = setInterval(() => setSeconds((s) => s + 1), 1000)
    let energy = 0.35
    const wave = setInterval(() => {
      energy = Math.max(0.15, energy * 0.86)
      setLevels(Array.from({ length: BARS }, (_, i) => {
        const env = Math.pow(Math.sin((Math.PI * (i + 0.5)) / BARS), 0.6)
        return 0.12 + 0.88 * energy * env * (0.55 + 0.45 * Math.random())
      }))
    }, 90)
    const lift = () => { energy = 0.9 }
    window.addEventListener('ob-speech', lift)
    return () => { clearInterval(clockT); clearInterval(wave); window.removeEventListener('ob-speech', lift) }
  }, [recording])

  const startVoice = () => {
    const Ctor = SpeechCtor()
    if (!Ctor) { setVoice('unavailable'); openTyping(); return }
    base.current = note
    setTake('')
    const r = new Ctor()
    r.continuous = true
    r.interimResults = true
    r.lang = 'en-IN'
    r.onresult = (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
      let text = ''
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript
      setTake(text)
      window.dispatchEvent(new Event('ob-speech'))
    }
    r.onerror = (e: { error?: string }) => {
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') setVoice('denied')
    }
    r.onend = () => setVoice((v) => (v === 'listening' ? 'idle' : v))
    rec.current = r
    try {
      r.start()
      setVoice('listening')
      haptic(12)
    } catch {
      setVoice('unavailable')
    }
  }
  // When a recording ends, keep what was said.
  const wasRecording = useRef(false)
  useEffect(() => {
    if (wasRecording.current && !recording) {
      const said = join(base.current, take)
      if (said !== base.current.trim()) { setNote(said.slice(0, MAX)); setSource('voice') }
    }
    wasRecording.current = recording
  }, [recording, take])

  const onMic = () => {
    if (recording) { haptic(); rec.current?.stop(); return }
    if (voice === 'unavailable' || voice === 'denied') { openTyping(); return }
    startVoice()
  }
  const openTyping = () => {
    if (recording) rec.current?.stop()
    haptic()
    setDraft(note)
    setTyping(true)
    setTimeout(() => input.current?.focus(), 180)
  }
  const closeTyping = () => {
    const text = draft.trim()
    setNote(text)
    setSource(text ? (text === note.trim() && source ? source : 'text') : undefined)
    setTyping(false)
  }
  const clearNote = () => { haptic(); setNote(''); setSource(undefined) }

  const status =
    voice === 'denied' ? 'The microphone is off for this site. Type it instead, or allow it in your browser settings.'
    : voice === 'unavailable' ? "Voice isn't available in this browser yet. Type it instead."
    : recording ? `Listening  ·  ${clock(seconds)}  ·  tap to stop`
    : note ? 'Tap to say more'
    : 'Tap to speak'

  return (
    <>
      <Hero title={heading.lead} accent={heading.accent} sub={<>Tap the mic and talk, or type it.<br />Your story shapes your reading plan.</>} />
      <div className={`ob-stage${typing ? ' is-typing' : ''}`}>
        <div className="ob-slot">
          {recording ? (
            <div className="ob-mine" aria-live="polite">
              <div className="ob-eyebrow-row">
                <span className="ob-dot" />
                <span className="ob-eyebrow">LISTENING</span>
              </div>
              <p className={`ob-mine-text${shown ? '' : ' is-waiting'}`}>{shown || "Start whenever you're ready."}</p>
            </div>
          ) : (
            <div className="ob-rail" ref={rail} onPointerDown={hold} onPointerUp={letGo} onPointerCancel={letGo} onTouchStart={hold} onTouchEnd={letGo} onWheel={() => { hold(); letGo() }} aria-label="Example notes">
              {[...examples, ...examples].map((e, i) => (
                <div
                  key={i}
                  className="ob-example ob-drift"
                  style={{ '--d': `${500 + (i % examples.length) * 100}ms` } as React.CSSProperties}
                  aria-hidden={i >= examples.length}
                >
                  <span className="ob-quote-glyph" aria-hidden="true">“</span>
                  <span className="ob-eyebrow">{e.tag.toUpperCase()}</span>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ob-voice">
          <div className={`ob-wave${recording ? ' is-live' : ''}`} aria-hidden="true">
            {levels.map((l, i) => <span key={i} style={{ transform: `scaleY(${l})` }} />)}
          </div>
          <div className="ob-mic-wrap ob-pop" style={{ '--d': '800ms' } as React.CSSProperties}>
            <span className={`ob-mic-ring${recording ? ' is-off' : ''}`} aria-hidden="true" />
            {recording && <><span className="ob-mic-ripple" aria-hidden="true" /><span className="ob-mic-ripple is-late" aria-hidden="true" /></>}
            <button type="button" className={`ob-mic${recording ? ' is-live' : ''}`} onClick={onMic} aria-label={recording ? 'Stop recording' : 'Speak your note'}>
              <span className="ob-mic-icon is-mic"><Icon name="mic" weight="fill" size={36} /></span>
              <span className="ob-mic-icon is-stop"><Icon name="stop" weight="fill" size={28} /></span>
            </button>
          </div>
          <p className="ob-status ob-rise" style={{ '--d': '800ms', '--dy': '0px' } as React.CSSProperties} aria-live="polite">{status}</p>
          <div className="ob-link-zone ob-rise" style={{ '--d': '960ms', '--dy': '4px' } as React.CSSProperties}>
            {note && !recording ? (
              <div className="ob-preview">
                <button type="button" className="ob-preview-body" onClick={openTyping} aria-label={`Your note: ${note}. Edit`}>
                  <Icon name="edit" size={16} />
                  <span>“{note}”</span>
                </button>
                <button type="button" className="ob-preview-clear" onClick={clearNote} aria-label="Clear your note">
                  <Icon name="close" size={14} />
                </button>
              </div>
            ) : (
              <button type="button" className="ob-link" onClick={openTyping}>
                <Icon name="keyboard" size={18} />
                <span>Type it instead</span>
              </button>
            )}
          </div>
        </div>

        {typing && (
          <div className="ob-type">
            <div className="ob-mine ob-typing-card">
              <div className="ob-mine-top">
                <span className="ob-eyebrow">YOUR NOTE</span>
                <button type="button" className="ob-action" onClick={closeTyping}>Done</button>
              </div>
              <textarea
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX))}
                placeholder="Say what's going on. A line is enough, a page is fine."
                maxLength={MAX}
                aria-label="Your note"
              />
              {draft.length > MAX * 0.8 && <span className="ob-count">{MAX - draft.length} left</span>}
            </div>
          </div>
        )}
      </div>
      <Cta
        delay={960}
        onClick={() => {
          if (recording) rec.current?.stop()
          haptic(12)
          const final = (typing ? draft : shown).trim()
          onDone(final, final ? (typing ? 'text' : source ?? (recording ? 'voice' : 'text')) : undefined)
        }}
      >
        Curate my plan
      </Cta>
    </>
  )
}
