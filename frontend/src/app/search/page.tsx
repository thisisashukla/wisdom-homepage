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

function speakVerse(verse: VerseResult, onEnd: () => void): void {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const text = [
    verse.essence || verse.english_translation,
    verse.english_translation !== verse.essence ? verse.english_translation : '',
  ].filter(Boolean).join('. ')
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.82
  utt.pitch = 0.96
  utt.onend = onEnd
  utt.onerror = onEnd
  window.speechSynthesis.speak(utt)
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ── PullQuote ─────────────────────────────────────────────────────────────────

function PullQuote({
  verse, isPlaying, onPlay, animIndex,
}: {
  verse: VerseResult
  isPlaying: boolean
  onPlay: () => void
  animIndex: number
}) {
  const [expanded, setExpanded] = useState(false)
  const displayText = verse.essence || verse.english_translation
  const hasDetail =
    verse.verse_sanskrit ||
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
        <p className="pull-quote__text">{displayText}</p>
        <div className="pull-quote__footer">
          <span className="pull-quote__ref">
            {humanize(verse.scripture)}
            {verse.verse_id && <> · <em>{verse.verse_id}</em></>}
            {verse.speaker && <span className="pull-quote__speaker"> · {verse.speaker}</span>}
          </span>
          <div className="pull-quote__actions">
            <button
              className={`pull-quote__play${isPlaying ? ' pull-quote__play--active' : ''}`}
              onClick={onPlay}
              aria-label={isPlaying ? 'Pause verse' : 'Listen to verse'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              {isPlaying && <span className="pull-quote__play-ripple" aria-hidden />}
            </button>
            {hasDetail && (
              <button
                className={`pull-quote__expand${expanded ? ' pull-quote__expand--open' : ''}`}
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
              >
                <ChevronIcon up={expanded} />
              </button>
            )}
          </div>
        </div>
        {expanded && (
          <div className="pull-quote__detail">
            {verse.verse_sanskrit && (
              <p className="pull-quote__devanagari">{verse.verse_sanskrit}</p>
            )}
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
  segments, verses, playingUid, onPlay,
}: {
  segments: Segment[]
  verses: VerseResult[]
  playingUid: string | null
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

const SUGGESTED = [
  'How to be at peace during uncertainty?',
  'What does the Gita say about duty and action?',
  'Verses on overcoming fear and anxiety',
  'How do I control my restless mind?',
  'What is the nature of the self?',
  'How to act without attachment to results?',
]

// ── Chat-specific components ──────────────────────────────────────────────────

function ChatWelcome({ onSuggest }: { onSuggest: (q: string) => void }) {
  return (
    <div className="chat-welcome">
      <h1 className="chat-welcome__title">Ask the Scriptures</h1>
      <p className="chat-welcome__sub">
        Wisdom from 18,000+ verses — Bhagavad Gita, Upanishads, Ashtavakra Gita, and more.
      </p>
      <div className="chat-welcome__suggestions">
        {SUGGESTED.map(s => (
          <button key={s} className="search-suggestion" onClick={() => onSuggest(s)}>
            {s}
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
  msg, playingUid, onPlay, onDeepen,
}: {
  msg: AssistantMessage
  playingUid: string | null
  onPlay: (uid: string, verses: VerseResult[]) => void
  onDeepen: (id: string, verses: VerseResult[], query: string) => void
}) {
  const isLoading = ['intent', 'search', 'rag'].includes(msg.phase)
  const activeSegs = msg.detailPhase === 'done' ? msg.detailedSegments : msg.crispSegments
  const boundPlay  = (uid: string) => onPlay(uid, msg.verses)

  return (
    <div className="assistant-bubble">
      {isLoading && (
        <PhaseIndicator phase={msg.phase} intents={msg.intents} />
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
            onPlay={boundPlay}
          />
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
        </>
      )}
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
    font-size: 10px;
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
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  const isAnyLoading = messages.some(
    m => m.role === 'assistant' && ['intent', 'search', 'rag'].includes((m as AssistantMessage).phase)
  )

  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  // Scroll to bottom whenever messages array changes or loading phases update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const updateMsg = useCallback((id: string, patch: Partial<AssistantMessage>) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, ...patch } as ChatMessage : m))
  }, [])

  const handlePlay = useCallback((uid: string, verses: VerseResult[]) => {
    if (playingUid === uid) {
      window.speechSynthesis?.cancel()
      setPlayingUid(null)
      return
    }
    const verse = verses.find(v => v.uid === uid)
    if (!verse) return
    setPlayingUid(uid)
    speakVerse(verse, () => setPlayingUid(null))
  }, [playingUid])

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
      const searchRes  = await fetch(`${BACKEND}/api/v1/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intents: intents.map(i => i.intent), top_k: 6 }),
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
                onPlay={handlePlay}
                onDeepen={handleDeepen}
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
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
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

      </main>
    </>
  )
}
