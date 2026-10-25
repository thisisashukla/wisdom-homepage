'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Nav from '@/components/Nav'
import BlogTracker from '@/components/BlogTracker'
import './search.css'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

// In production, the search experience is gated behind a "Coming Soon" state.
// NODE_ENV is inlined at build time by Next.js — `next dev` → 'development',
// `next build` → 'production'. Dev keeps the full working search.
const IS_PROD = process.env.NODE_ENV === 'production'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Intent {
  intent: string
  description: string
  // Optional (backend added these in the 2026-07-28 pipeline changes).
  intent_type?: string
  likely_scriptures?: string[]
  // HARD scripture filter. Populated by /intent when the user explicitly names
  // a scripture ("Gita", "Ramcharitmanas", ...). MUST be forwarded verbatim
  // to /search — dropping it here defeats the entire per-intent filter path.
  scripture_lock?: string[]
}

interface VerseResult {
  uid: string
  scripture: string
  scripture_slug: string
  verse_id: string
  verse_sanskrit: string
  verse_hindi: string
  english_translation: string
  essence: string
  simple_meaning: string
  insight: string
  modern_relevance: string
  speaker: string
  tags: string[]
  score: number
  intent: string
  // Audio metadata (populated by the Supabase-backed index). Null means the
  // frontend should call POST /audio/generate to lazily produce audio.
  audio_url?: string | null
  audio_timestamps?: Array<{ word: string; start: number; end: number }> | null
  meter?: string
}

interface Segment {
  type: 'text' | 'verse'
  content?: string
  uid?: string
}

type DetailPhase = 'idle' | 'loading' | 'done'
type LoadPhase   = 'intent' | 'search' | 'rag' | 'done' | 'error'

interface UserMessage {
  id: string
  role: 'user'
  text: string
}

interface AssistantMessage {
  id: string
  role: 'assistant'
  phase: LoadPhase
  query: string
  intents: Intent[]
  verses: VerseResult[]
  crispSegments: Segment[]
  detailedSegments: Segment[]
  detailPhase: DetailPhase
  error: string
}

type ChatMessage = UserMessage | AssistantMessage

// ── Helpers ───────────────────────────────────────────────────────────────────

function humanize(slug: string): string {
  return slug
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** "1,65,दोहा,1" → "1·65·दोहा·1". Comma is a join char in source data. */
function formatVerseRef(id: string): string {
  return id.replace(/,/g, '·')
}

/** True when a speaker field is worth displaying. */
function hasRealSpeaker(s: string | undefined): boolean {
  if (!s) return false
  const c = s.trim().toLowerCase()
  return c !== '' && c !== 'unknown' && c !== 'anonymous' && c !== 'na' && c !== 'n/a'
}

/** Flatten Segment[] into plain text for the clipboard. */
function segmentsToPlainText(segments: Segment[], verses: VerseResult[]): string {
  const byUid = Object.fromEntries(verses.map(v => [v.uid, v]))
  return segments.map(seg => {
    if (seg.type === 'text') return (seg.content || '').trim()
    if (seg.type === 'verse' && seg.uid) {
      const v = byUid[seg.uid]
      if (!v) return ''
      const line = v.essence || v.english_translation || ''
      const ref = `${humanize(v.scripture)} ${formatVerseRef(v.verse_id)}`.trim()
      return `"${line}"  — ${ref}`
    }
    return ''
  }).filter(Boolean).join('\n\n')
}

// ── Audio playback (Sanskrit recitation via vagdhenu) ────────────────────────
// Module-level singleton so switching between verses cleanly stops the prior
// clip without leaking listeners. React StrictMode + effect churn otherwise
// spawns duplicate <audio> instances that step on each other.
let __audioEl: HTMLAudioElement | null = null

function stopAudio(): void {
  if (__audioEl) {
    try {
      __audioEl.pause()
      __audioEl.currentTime = 0
    } catch { /* ignore */ }
  }
}

function playAudio(url: string, onEnd: () => void, onError: () => void): void {
  stopAudio()
  const el = new Audio(url)
  __audioEl = el
  el.addEventListener('ended', () => { onEnd(); if (__audioEl === el) __audioEl = null })
  el.addEventListener('error', () => { onError(); if (__audioEl === el) __audioEl = null })
  el.play().catch(onError)
}

/**
 * Resolve a verse's audio URL:
 *   - Return verse.audio_url if the backend already had one.
 *   - Otherwise POST /api/v1/audio/generate to run vagdhenu on demand.
 *
 * Throws on failure so the caller can flip UI state back to idle.
 */
async function ensureAudioUrl(verse: VerseResult): Promise<string> {
  if (verse.audio_url) return verse.audio_url

  const res = await fetch(`${BACKEND}/api/v1/audio/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uid: verse.uid,
      // meter is a hint — backend falls back to the DB row's meter, which
      // takes precedence over anything we send here.
      meter: verse.meter || 'anushtubh',
    }),
  })

  if (!res.ok) {
    let detail = ''
    try { detail = (await res.json())?.detail || '' } catch { /* ignore */ }
    throw new Error(detail || `Audio generation failed (${res.status})`)
  }

  const data = await res.json() as { audio_url?: string }
  if (!data.audio_url) throw new Error('Audio endpoint returned no URL')
  return data.audio_url
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" width="15" height="15" aria-hidden>
      <path d="M5 3.5l10 5.5-10 5.5V3.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" width="15" height="15" aria-hidden>
      <rect x="3.5" y="2.5" width="4" height="13" rx="1.2" />
      <rect x="10.5" y="2.5" width="4" height="13" rx="1.2" />
    </svg>
  )
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden>
      <path d={up ? 'M4 12l5-5 5 5' : 'M4 6l5 5 5-5'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
      <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.83L3.4 3.6c-.66-.29-1.39.2-1.39.91V9.1c0 .5.37.93.87.99l12.13 1.4-12.13 1.4c-.5.06-.87.49-.87.99v4.6c0 .71.73 1.2 1.39.91z" />
    </svg>
  )
}

/** Small oil-lamp glyph — Deepika motif from wisdom.md §11. */
function WisdomMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden>
      <path
        d="M12 3c1.1 2.2.5 3.6-.6 4.7-1 1-1.4 2.1-.7 3.3.4.7 1.3 1 2 .6.9-.5 1-1.6.5-2.6 1.6.7 2.4 2.2 2.4 3.9 0 2.4-1.9 4.3-4.3 4.3S7 15.3 7 12.9C7 10 9.5 6.8 12 3z"
        fill="currentColor"
      />
      <path d="M6.5 19.5 h11 c0 1.1-.9 2-2 2 h-7 c-1.1 0-2-.9-2-2z" fill="currentColor" opacity="0.65" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="13" height="13" aria-hidden>
      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── PullQuote ─────────────────────────────────────────────────────────────────

function PullQuote({
  verse, isPlaying, isGenerating, onPlay, animIndex,
}: {
  verse: VerseResult
  isPlaying: boolean
  isGenerating: boolean
  onPlay: () => void
  animIndex: number
}) {
  const [expanded, setExpanded] = useState(false)
  const displayText = verse.essence || verse.english_translation
  // Sanskrit is now always visible in the collapsed card, so it no longer
  // gates the expand toggle — only meaning/insight/tags do.
  const hasDetail =
    (verse.english_translation && verse.english_translation !== displayText) ||
    verse.simple_meaning ||
    verse.insight ||
    verse.tags.length > 0

  return (
    <div
      className="pull-quote"
      style={{ '--anim-delay': `${animIndex * 90}ms` } as React.CSSProperties}
    >
      <div className="pull-quote__bar" aria-hidden />
      <div className="pull-quote__inner">

        {/* Header row: scripture pill + verse ref + speaker · play + expand */}
        <div className="pull-quote__header">
          <div className="pull-quote__meta">
            <span className="pull-quote__scripture">{humanize(verse.scripture)}</span>
            {verse.verse_id && (
              <span className="pull-quote__ref-num">{formatVerseRef(verse.verse_id)}</span>
            )}
            {hasRealSpeaker(verse.speaker) && (
              <span className="pull-quote__speaker">{verse.speaker}</span>
            )}
          </div>
          <div className="pull-quote__actions">
            <button
              className={`pull-quote__play${isPlaying ? ' pull-quote__play--active' : ''}${isGenerating ? ' pull-quote__play--loading' : ''}`}
              onClick={onPlay}
              aria-label={
                isGenerating ? 'Generating recitation…'
                  : isPlaying  ? 'Pause verse'
                  : verse.audio_url ? 'Listen to verse'
                  : 'Generate & listen'
              }
              aria-busy={isGenerating}
              disabled={isGenerating}
              title={verse.audio_url ? undefined : 'First play generates recitation via vagdhenu'}
            >
              {isGenerating ? (
                <span className="btn-spinner" aria-hidden />
              ) : isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
              {isPlaying && !isGenerating && (
                <span className="pull-quote__play-ripple" aria-hidden />
              )}
            </button>
            {hasDetail && (
              <button
                className={`pull-quote__expand${expanded ? ' pull-quote__expand--open' : ''}`}
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
                aria-label={expanded ? 'Hide translation & context' : 'Show translation & context'}
              >
                <ChevronIcon up={expanded} />
              </button>
            )}
          </div>
        </div>

        {/* Body: essence line (prominent) + Devanagari (subtle). */}
        <p className="pull-quote__text">{displayText}</p>
        {verse.verse_sanskrit && (
          <p
            className="pull-quote__devanagari pull-quote__devanagari--inline"
            lang="sa"
            aria-label="Sanskrit verse"
          >
            {verse.verse_sanskrit}
          </p>
        )}

        {expanded && (
          <div className="pull-quote__detail">
            {verse.english_translation && verse.english_translation !== displayText && (
              <p className="pull-quote__translation">{verse.english_translation}</p>
            )}
            {verse.simple_meaning && <p className="pull-quote__meaning">{verse.simple_meaning}</p>}
            {verse.insight      && <p className="pull-quote__insight">{verse.insight}</p>}
            {verse.tags.length > 0 && (
              <div className="pull-quote__tags">
                {verse.tags.slice(0, 5).map(t => (
                  <span key={t} className="pull-quote__tag">{t}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Answer block ──────────────────────────────────────────────────────────────

function AnswerBlock({
  segments, verses, playingUid, generatingUids, onPlay,
}: {
  segments: Segment[]
  verses: VerseResult[]
  playingUid: string | null
  generatingUids: Set<string>
  onPlay: (uid: string) => void
}) {
  const byUid = Object.fromEntries(verses.map(v => [v.uid, v]))
  let verseCount = 0

  return (
    <div className="answer-block">
      {segments.map((seg, i) => {
        if (seg.type === 'verse') {
          const verse = byUid[seg.uid!]
          if (!verse) return null
          const idx = verseCount++
          return (
            <PullQuote
              key={i}
              verse={verse}
              animIndex={idx}
              isPlaying={playingUid === verse.uid}
              isGenerating={generatingUids.has(verse.uid)}
              onPlay={() => onPlay(verse.uid)}
            />
          )
        }
        const paras = (seg.content || '').split('\n\n').filter(p => p.trim())
        if (!paras.length) return null
        return (
          <div key={i} className="answer-block__prose">
            {paras.map((para, j) => <p key={j}>{para.trim()}</p>)}
          </div>
        )
      })}
    </div>
  )
}

// ── Phase indicator ───────────────────────────────────────────────────────────

const PHASES = [
  { id: 'intent', label: 'Understanding your question' },
  { id: 'search', label: 'Searching the scriptures' },
  { id: 'rag',    label: 'Composing an answer' },
] as const

function PhaseIndicator({ phase, intents }: { phase: LoadPhase; intents: Intent[] }) {
  const activeIdx = PHASES.findIndex(p => p.id === phase)
  return (
    <section className="phase-indicator">
      <div className="phase-indicator__steps">
        {PHASES.map((p, i) => {
          const s = i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'pending'
          return (
            <div key={p.id} className={`phase-step phase-step--${s}`}>
              <div className="phase-step__dot">
                {s === 'done' && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="8" height="8">
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {s === 'active' && <div className="phase-step__spinner" />}
              </div>
              <span className="phase-step__label">{p.label}</span>
            </div>
          )
        })}
      </div>
      {intents.length > 0 && (
        <div className="phase-indicator__intents">
          {intents.map((intent, i) => (
            <span key={i} className="phase-intent-chip">{intent.intent}</span>
          ))}
        </div>
      )}
    </section>
  )
}

// ── Suggested questions ───────────────────────────────────────────────────────
// Two-column grid of cards. Each has a title (the question the user sends)
// and a hint (what the seeker is likely feeling behind it). Six cards on
// desktop, stack single-column on mobile.

const SUGGESTED: Array<{ title: string; hint: string }> = [
  { title: 'How to be at peace during uncertainty?',        hint: 'When the ground keeps moving.' },
  { title: 'What does the Gita say about duty and action?', hint: 'Karma, dharma, and doing the work.' },
  { title: 'Verses on overcoming fear and anxiety',         hint: 'Steadying the restless mind.' },
  { title: 'How do I control my restless mind?',            hint: 'Practices from the Yoga Sutras.' },
  { title: 'What is the nature of the self?',               hint: 'Atman, Brahman, and everything between.' },
  { title: 'How to act without attachment to results?',     hint: 'Nishkama karma in practice.' },
]

// ── Chat-specific components ──────────────────────────────────────────────────

function ChatWelcome({ onSuggest }: { onSuggest: (q: string) => void }) {
  return (
    <div className="chat-welcome">
      <div className="chat-welcome__mark" aria-hidden>
        <WisdomMark />
      </div>
      <h1 className="chat-welcome__title">Ask the Scriptures</h1>
      <p className="chat-welcome__sub">
        Wisdom from 18,000+ verses — the Bhagavad Gita, Upanishads,
        Ashtavakra Gita, Ramcharitmanas, Yoga Sutras, and more.
      </p>
      <div className="chat-welcome__ornament" aria-hidden>
        <span /><span /><span />
      </div>
      <div className="chat-welcome__grid">
        {SUGGESTED.map(s => (
          <button
            key={s.title}
            className="suggestion-card"
            onClick={() => onSuggest(s.title)}
            data-mp-location="search_suggestion"
          >
            <span className="suggestion-card__title">{s.title}</span>
            <span className="suggestion-card__hint">{s.hint}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="user-bubble">
      <p>{text}</p>
    </div>
  )
}

function AssistantBubble({
  msg, playingUid, generatingUids, onPlay, onDeepen, onCopy,
}: {
  msg: AssistantMessage
  playingUid: string | null
  generatingUids: Set<string>
  onPlay: (uid: string, verses: VerseResult[]) => void
  onDeepen: (id: string, verses: VerseResult[], query: string) => void
  onCopy: (text: string) => void
}) {
  const isLoading = ['intent', 'search', 'rag'].includes(msg.phase)
  const activeSegs = msg.detailPhase === 'done' ? msg.detailedSegments : msg.crispSegments
  const boundPlay  = (uid: string) => onPlay(uid, msg.verses)
  const [justCopied, setJustCopied] = useState(false)

  const handleCopy = () => {
    const text = segmentsToPlainText(activeSegs, msg.verses)
    if (!text) return
    onCopy(text)
    setJustCopied(true)
    window.setTimeout(() => setJustCopied(false), 1600)
  }

  return (
    <div className={`assistant-bubble${isLoading ? ' assistant-bubble--thinking' : ''}`}>
      <div className="assistant-bubble__avatar" aria-hidden>
        <WisdomMark />
      </div>
      <div className="assistant-bubble__body">
        {isLoading && (
          <>
            <PhaseIndicator phase={msg.phase} intents={msg.intents} />
            {msg.phase === 'rag' && (
              <div className="typing-dots" aria-label="Composing the answer">
                <span /><span /><span />
              </div>
            )}
          </>
        )}

        {msg.phase === 'error' && (
          <div className="chat-error">{msg.error}</div>
        )}

        {msg.phase === 'done' && activeSegs.length > 0 && (
          <>
            <AnswerBlock
              segments={activeSegs}
              verses={msg.verses}
              playingUid={playingUid}
              generatingUids={generatingUids}
              onPlay={boundPlay}
            />
            <div className="assistant-bubble__actions">
              <button
                className={`icon-btn${justCopied ? ' icon-btn--active' : ''}`}
                onClick={handleCopy}
                aria-label={justCopied ? 'Copied' : 'Copy answer'}
                title={justCopied ? 'Copied' : 'Copy answer'}
              >
                {justCopied ? <CheckIcon /> : <CopyIcon />}
                <span>{justCopied ? 'Copied' : 'Copy'}</span>
              </button>
              {msg.detailPhase !== 'done' && (
                <button
                  className="explore-deeper"
                  onClick={() => onDeepen(msg.id, msg.verses, msg.query)}
                  disabled={msg.detailPhase === 'loading'}
                >
                  {msg.detailPhase === 'loading'
                    ? <><span className="btn-spinner" />Going deeper…</>
                    : 'Explore in depth →'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Coming Soon (prod only) ───────────────────────────────────────────────────

const COMING_SOON_CSS = `
  .coming-soon {
    max-width: 620px;
    margin: 80px auto 0;
    padding: 44px 32px 40px;
    text-align: center;
    border: 1px solid rgba(200, 136, 30, 0.22);
    border-radius: 16px;
    background:
      radial-gradient(120% 100% at 50% 0%, rgba(200, 136, 30, 0.08) 0%, transparent 60%),
      rgba(255, 255, 255, 0.02);
    animation: coming-soon-fade 0.5s ease-out both;
  }
  @keyframes coming-soon-fade {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .coming-soon__label {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #f5c96a;
    font-weight: 600;
    padding: 6px 12px;
    border: 1px solid rgba(200, 136, 30, 0.35);
    border-radius: 999px;
    margin-bottom: 22px;
  }
  .coming-soon__title {
    font-family: "Cormorant Garamond", "Georgia", serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 500;
    color: #f5e8cc;
    line-height: 1.15;
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }
  .coming-soon__sub {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(245, 232, 204, 0.7);
    max-width: 480px;
    margin: 0 auto 26px;
  }
  .coming-soon__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #f5c96a;
    text-decoration: none;
    padding: 10px 18px;
    border: 1px solid rgba(200, 136, 30, 0.35);
    border-radius: 999px;
    transition: background 0.15s, color 0.15s;
  }
  .coming-soon__cta:hover {
    background: rgba(200, 136, 30, 0.1);
    color: #f5e8cc;
  }
`

function ComingSoon() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />
      <section className="coming-soon" data-mp-section="search_coming_soon">
        <span className="coming-soon__label">Coming Soon</span>
        <h1 className="coming-soon__title">
          Ask the Scriptures — <br />
          arriving soon.
        </h1>
        <p className="coming-soon__sub">
          A new way to search across the Bhagavad Gita, Upanishads, and more —
          in natural language. We&apos;re polishing it now.
        </p>
        <a
          className="coming-soon__cta"
          href="/gita"
          data-mp-location="search_coming_soon_cta"
        >
          Explore the Gita in the meantime →
        </a>
      </section>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [messages, setMessages]     = useState<ChatMessage[]>([])
  const [input, setInput]           = useState('')
  const [playingUid, setPlayingUid] = useState<string | null>(null)
  // Verses whose audio is being generated right now — used to show a
  // spinner on the play button and to prevent double-clicks racing
  // /audio/generate against itself.
  const [generatingUids, setGeneratingUids] = useState<Set<string>>(new Set())
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  const isAnyLoading = messages.some(
    m => m.role === 'assistant' && ['intent', 'search', 'rag'].includes((m as AssistantMessage).phase)
  )

  // Cancel any playing audio when the page unmounts.
  useEffect(() => () => { stopAudio() }, [])

  // Scroll to bottom whenever messages array changes or loading phases update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const updateMsg = useCallback((id: string, patch: Partial<AssistantMessage>) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, ...patch } as ChatMessage : m))
  }, [])

  // Patch a verse inside every assistant message that carries it — used
  // when /audio/generate returns a fresh audio_url so subsequent play
  // clicks skip the round-trip.
  const patchVerse = useCallback((uid: string, patch: Partial<VerseResult>) => {
    setMessages(msgs => msgs.map(m => {
      if (m.role !== 'assistant') return m
      const am = m as AssistantMessage
      if (!am.verses.some(v => v.uid === uid)) return m
      return {
        ...am,
        verses: am.verses.map(v => v.uid === uid ? { ...v, ...patch } : v),
      } as ChatMessage
    }))
  }, [])

  const handlePlay = useCallback(async (uid: string, verses: VerseResult[]) => {
    // Toggle: click the already-playing verse to stop.
    if (playingUid === uid) {
      stopAudio()
      setPlayingUid(null)
      return
    }
    // Ignore repeated clicks while a generation is in-flight for this uid.
    if (generatingUids.has(uid)) return

    const verse = verses.find(v => v.uid === uid)
    if (!verse) return

    try {
      let url = verse.audio_url ?? null
      if (!url) {
        // Lazy generate via vagdhenu → Supabase Storage → return URL.
        setGeneratingUids(prev => new Set(prev).add(uid))
        url = await ensureAudioUrl(verse)
        // Persist for the rest of the session so this uid is instant next time.
        patchVerse(uid, { audio_url: url })
      }

      setPlayingUid(uid)
      playAudio(
        url,
        () => setPlayingUid(cur => cur === uid ? null : cur),
        () => setPlayingUid(cur => cur === uid ? null : cur),
      )
    } catch (err) {
      // TODO surface a toast; for now log + reset UI so the button becomes
      // clickable again.
      console.error('Audio play failed for', uid, err)
      setPlayingUid(cur => cur === uid ? null : cur)
    } finally {
      setGeneratingUids(prev => {
        if (!prev.has(uid)) return prev
        const next = new Set(prev)
        next.delete(uid)
        return next
      })
    }
  }, [playingUid, generatingUids, patchVerse])

  const handleDeepen = useCallback(async (id: string, verses: VerseResult[], query: string) => {
    updateMsg(id, { detailPhase: 'loading' })
    try {
      const res  = await fetch(`${BACKEND}/api/v1/rag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, verses, mode: 'detailed' }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      updateMsg(id, { detailPhase: 'done', detailedSegments: data.segments || [] })
    } catch {
      updateMsg(id, { detailPhase: 'idle' })
    }
  }, [updateMsg])

  // Copy-to-clipboard with a bottom-center toast confirmation.
  const [copyToast, setCopyToast] = useState(false)
  const handleCopy = useCallback((text: string) => {
    if (!text) return
    const done = () => {
      setCopyToast(true)
      window.setTimeout(() => setCopyToast(false), 1500)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => { /* ignore */ })
    } else {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'; ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select(); document.execCommand('copy')
        document.body.removeChild(ta); done()
      } catch { /* ignore */ }
    }
  }, [])

  async function handleSend(overrideQuery?: string) {
    // Prod is gated behind Coming Soon — bail early even if the input is
    // somehow triggered (e.g. programmatic focus + Enter).
    if (IS_PROD) return
    const q = (overrideQuery ?? input).trim()
    if (!q || isAnyLoading) return

    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    window.speechSynthesis?.cancel()
    setPlayingUid(null)

    const userId   = crypto.randomUUID()
    const assistId = crypto.randomUUID()

    setMessages(msgs => [
      ...msgs,
      { id: userId, role: 'user', text: q },
      {
        id: assistId, role: 'assistant', phase: 'intent', query: q,
        intents: [], verses: [],
        crispSegments: [], detailedSegments: [], detailPhase: 'idle', error: '',
      },
    ])

    try {
      // 1 — validate + extract intents
      const intentRes  = await fetch(`${BACKEND}/api/v1/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      if (!intentRes.ok) throw new Error(`Intent API: ${intentRes.status}`)
      const intentData = await intentRes.json()

      if (intentData.valid === false) {
        updateMsg(assistId, {
          phase: 'error',
          error: intentData.reason || 'I can only help with questions about life, philosophy, and scripture.',
        })
        return
      }

      const intents: Intent[] = intentData.intents || []
      updateMsg(assistId, { phase: 'search', intents })

      // 2 — retrieve verses
      //
      // Forward the intents to /search as full objects. scripture_lock is
      // the HARD filter that pins each intent's cosine retrieval to a
      // specific scripture — dropping it here would make single-scripture
      // and comparison queries silently return whatever cosine surfaces
      // across the whole corpus (Dheesh Gita, Vishnu Gita, etc.).
      const searchRes  = await fetch(`${BACKEND}/api/v1/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intents: intents.map(i => ({
            intent: i.intent,
            description: i.description,
            intent_type: i.intent_type || 'philosophical',
            likely_scriptures: i.likely_scriptures || [],
            scripture_lock: i.scripture_lock || [],
          })),
          top_k: 6,
        }),
      })
      if (!searchRes.ok) throw new Error(`Search API: ${searchRes.status}`)
      const verses: VerseResult[] = (await searchRes.json()).results || []
      updateMsg(assistId, { phase: 'rag', verses })

      // 3 — crisp synthesis
      const ragRes  = await fetch(`${BACKEND}/api/v1/rag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, verses, mode: 'crisp' }),
      })
      if (!ragRes.ok) throw new Error(`RAG API: ${ragRes.status}`)
      const crispSegments: Segment[] = (await ragRes.json()).segments || []
      updateMsg(assistId, { phase: 'done', crispSegments })

    } catch (err: any) {
      updateMsg(assistId, { phase: 'error', error: err?.message || 'Something went wrong.' })
    }
  }

  return (
    <>
      <BlogTracker pageName="search" />
      <Nav />
      <main className="chat-page">

        {/* ── Message list ─────────────────────────────────────────────── */}
        <div className="chat-messages">
          {messages.length === 0 && (
            IS_PROD
              ? <ComingSoon />
              : <ChatWelcome onSuggest={q => handleSend(q)} />
          )}

          {messages.map(msg =>
            msg.role === 'user' ? (
              <UserBubble key={msg.id} text={(msg as UserMessage).text} />
            ) : (
              <AssistantBubble
                key={msg.id}
                msg={msg as AssistantMessage}
                playingUid={playingUid}
                generatingUids={generatingUids}
                onPlay={handlePlay}
                onDeepen={handleDeepen}
                onCopy={handleCopy}
              />
            )
          )}

          <div ref={bottomRef} aria-hidden />
        </div>

        {/* ── Input bar ────────────────────────────────────────────────── */}
        {/* In production the entire search flow is gated — disable the
            textarea + send button and swap the placeholder. Dev keeps the
            full working input. */}
        <div className="chat-input-bar">
          <div className="chat-input-wrap">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => {
                setInput(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={IS_PROD ? 'Search coming soon…' : 'Ask about life, scripture, or the self…'}
              disabled={IS_PROD || isAnyLoading}
              aria-disabled={IS_PROD || isAnyLoading}
              rows={1}
            />
            <button
              className="chat-send"
              onClick={() => handleSend()}
              disabled={IS_PROD || isAnyLoading || !input.trim()}
              aria-label={IS_PROD ? 'Search coming soon' : 'Send'}
            >
              {isAnyLoading
                ? <span className="btn-spinner" />
                : <SendIcon />}
            </button>
          </div>
        </div>

        {copyToast && (
          <div className="copy-toast" role="status" aria-live="polite">Copied to clipboard</div>
        )}

      </main>
    </>
  )
}
