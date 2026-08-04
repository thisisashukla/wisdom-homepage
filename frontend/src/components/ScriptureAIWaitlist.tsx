'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { trackEvent } from '@/lib/mixpanel'
import './scripture-ai-waitlist.css'

// ── Query options — trimmed to 4 for low cognitive load ──────────────────────
const QUERY_OPTIONS = [
  { id: 'guidance', icon: '🧭', label: 'Guidance for a life decision' },
  { id: 'verse',    icon: '📖', label: "Explain a specific verse's meaning" },
  { id: 'topic',    icon: '🔍', label: 'Find verses on a topic or feeling' },
  { id: 'modern',   icon: '🌐', label: "The Gita's view on a modern problem" },
] as const

type OptionId = typeof QUERY_OPTIONS[number]['id']

// ── Email validation (stricter than the loose regex) ─────────────────────────
// - trims
// - lowercases for comparison
// - enforces standard email shape
// - caps length (RFC 5321: 254 chars max)
// - blocks common typos like double-dot or leading/trailing dots in local part
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function validateEmail(raw: string): { ok: boolean; email: string; error?: string } {
  const email = raw.trim().toLowerCase()
  if (!email) return { ok: false, email, error: 'Enter your email.' }
  if (email.length > 254) return { ok: false, email, error: 'Email is too long.' }
  if (email.includes('..')) return { ok: false, email, error: 'Enter a valid email.' }
  const [local, domain] = email.split('@')
  if (!local || !domain) return { ok: false, email, error: 'Enter a valid email.' }
  if (local.length > 64) return { ok: false, email, error: 'Email is too long.' }
  if (local.startsWith('.') || local.endsWith('.')) return { ok: false, email, error: 'Enter a valid email.' }
  if (!domain.includes('.')) return { ok: false, email, error: 'Enter a valid email.' }
  if (!EMAIL_RE.test(email)) return { ok: false, email, error: 'Enter a valid email.' }
  return { ok: true, email }
}

// ── Modal ────────────────────────────────────────────────────────────────────
// Rendered via a React portal into <body> so ancestor styles (backdrop-filter,
// transform, filter, etc.) can't create a containing block that traps the
// `position: fixed` overlay.
function WaitlistModal({
  onClose,
  mpLocation,
  pageName,
}: {
  onClose: () => void
  mpLocation: string
  pageName: string
}) {
  const [selected, setSelected] = useState<Set<OptionId>>(new Set())
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only mount on the client (portals need document)
  useEffect(() => { setMounted(true) }, [])

  // ── Mixpanel: fire "Opened" once when the modal first appears ───────────────
  useEffect(() => {
    trackEvent('Scripture AI Waitlist Opened', {
      page: pageName,
      location: mpLocation,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        trackEvent('Scripture AI Waitlist Dismissed', {
          page: pageName,
          location: mpLocation,
          method: 'esc',
          had_email: email.trim().length > 0,
          interest_count: selected.size,
        })
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, pageName, mpLocation, email, selected])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function toggleOption(id: OptionId) {
    setSelected(prev => {
      const next = new Set(prev)
      const wasSelected = next.has(id)
      if (wasSelected) next.delete(id)
      else next.add(id)
      trackEvent('Scripture AI Interest Toggled', {
        page: pageName,
        location: mpLocation,
        interest: id,
        action: wasSelected ? 'removed' : 'added',
        interest_count_after: next.size,
      })
      return next
    })
  }

  async function handleSubmit() {
    setError('')

    const validation = validateEmail(email)
    if (!validation.ok) {
      setError(validation.error || 'Enter a valid email.')
      trackEvent('Scripture AI Waitlist Validation Failed', {
        page: pageName,
        location: mpLocation,
        reason: validation.error,
      })
      return
    }

    const interests = Array.from(selected)
    setSubmitting(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: validation.email,
          interests,
          source: mpLocation,
        }),
      })
      if (!res.ok) throw new Error('server_' + res.status)

      trackEvent('Scripture AI Waitlist Submitted', {
        page: pageName,
        location: mpLocation,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        email: validation.email,
        email_domain: validation.email.split('@')[1] || '',
        interests,
        interest_count: interests.length,
        picked_no_interests: interests.length === 0,
      })
      setDone(true)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown'
      trackEvent('Scripture AI Waitlist Submit Failed', {
        page: pageName,
        location: mpLocation,
        error: msg,
      })
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleClose() {
    if (!done) {
      trackEvent('Scripture AI Waitlist Dismissed', {
        page: pageName,
        location: mpLocation,
        method: 'close',
        had_email: email.trim().length > 0,
        interest_count: selected.size,
      })
    }
    onClose()
  }

  if (!mounted) return null

  return createPortal(
    <div
      className="sai-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="presentation"
    >
      <div className="sai-modal" role="dialog" aria-modal="true" aria-label="Join the Ask Scripture AI waitlist">
        <button className="sai-modal-close" onClick={handleClose} aria-label="Close">✕</button>

        {done ? (
          <div className="sai-done">
            <div className="sai-done-icon" aria-hidden="true">✓</div>
            <h3 className="sai-done-title">You&apos;re on the list.</h3>
            <p className="sai-done-sub">
              We&apos;ll reach you when Ask Scripture AI is ready.
            </p>
            <button className="sai-done-close" onClick={handleClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="sai-modal-header">
              <span className="sai-soon-badge">Coming Soon</span>
              <h2 className="sai-modal-title">Ask Scripture AI</h2>
              <p className="sai-modal-sub">
                An AI that reads the Gita like a teacher. Get on the waitlist in seconds.
              </p>
            </div>

            <p className="sai-q">What would you use it for?</p>
            <div className="sai-chips">
              {QUERY_OPTIONS.map(opt => {
                const on = selected.has(opt.id)
                return (
                  <button
                    key={opt.id}
                    className={`sai-chip${on ? ' sai-chip--selected' : ''}`}
                    onClick={() => toggleOption(opt.id)}
                    type="button"
                    aria-pressed={on}
                  >
                    <span className="sai-chip-icon" aria-hidden="true">{opt.icon}</span>
                    <span className="sai-chip-label">{opt.label}</span>
                    <span className="sai-chip-check" aria-hidden="true">✓</span>
                  </button>
                )
              })}
            </div>

            {error && <p className="sai-error" role="alert">{error}</p>}

            <div className="sai-email-row">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={254}
                className="sai-email-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError('') }}
                onKeyDown={e => { if (e.key === 'Enter' && !submitting) handleSubmit() }}
                autoFocus
                aria-label="Email address"
              />
              <button
                className="sai-submit"
                onClick={handleSubmit}
                disabled={submitting || email.trim().length === 0}
                type="button"
              >
                {submitting ? 'Joining…' : 'Join →'}
              </button>
            </div>
            <p className="sai-footnote">No spam · One email when it ships</p>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

// ── Public API ────────────────────────────────────────────────────────────────
export type ButtonVariant = 'nav' | 'primary' | 'hero-secondary' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  /** Placement identifier used as the `location` prop on all Mixpanel events. */
  mpLocation: string
  /** Page identifier used as the `page` prop on all Mixpanel events. */
  pageName?: string
}

function useOpener() {
  const [open, setOpen] = useState(false)
  return { open, setOpen }
}

/** Trigger button — opens the waitlist modal. */
export function ScriptureAIWaitlistButton({
  variant = 'primary',
  mpLocation,
  pageName = 'unknown',
}: ButtonProps) {
  const { open, setOpen } = useOpener()

  const trackedOnClick = () => setOpen(true)

  let button: React.ReactNode

  if (variant === 'nav') {
    button = (
      <button type="button" className="btn-nav-scripture" onClick={trackedOnClick}>
        <span className="sai-pulse-dot" aria-hidden="true" />
        Ask Scripture AI
      </button>
    )
  } else if (variant === 'ghost') {
    button = (
      <button type="button" className="sai-ghost-btn" onClick={trackedOnClick}>
        Join the waitlist →
      </button>
    )
  } else if (variant === 'primary') {
    button = (
      <button type="button" className="sai-teaser-btn" onClick={trackedOnClick}>
        Join the Waitlist →
      </button>
    )
  } else {
    button = (
      <button type="button" className="sai-ghost-btn" onClick={trackedOnClick}>
        Ask Scripture AI →
      </button>
    )
  }

  return (
    <>
      {button}
      {open && (
        <WaitlistModal
          onClose={() => setOpen(false)}
          mpLocation={mpLocation}
          pageName={pageName}
        />
      )}
    </>
  )
}

// ── Homepage inline teaser ────────────────────────────────────────────────────
export function ScriptureAITeaser({
  mpLocation,
  pageName = 'Home',
}: {
  mpLocation: string
  pageName?: string
}) {
  const { open, setOpen } = useOpener()

  return (
    <>
      <div className="sai-teaser">
        <div className="sai-teaser-inner">
          <div className="sai-teaser-left">
            <span className="sai-soon-badge">Coming Soon</span>
            <h3 className="sai-teaser-title">Ask Scripture AI</h3>
            <p className="sai-teaser-sub">
              An AI built on the Gita — not just keyword search, but real understanding.
              Ask it anything you&apos;d ask a teacher who has read every verse.
            </p>
          </div>
          <div className="sai-teaser-examples" aria-label="Example questions">
            {[
              '"Why does Krishna tell Arjuna to fight?"',
              '"What does the Gita say about anxiety?"',
              '"Find every verse on the restless mind."',
            ].map(q => (
              <div key={q} className="sai-teaser-example">{q}</div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="sai-teaser-btn"
          onClick={() => setOpen(true)}
        >
          Join the Waitlist →
        </button>
      </div>
      {open && (
        <WaitlistModal
          onClose={() => setOpen(false)}
          mpLocation={mpLocation}
          pageName={pageName}
        />
      )}
    </>
  )
}

// ── Hero inline row ───────────────────────────────────────────────────────────
export function ScriptureAIHeroCTA({
  mpLocation,
  pageName = 'Home',
}: {
  mpLocation: string
  pageName?: string
}) {
  const { open, setOpen } = useOpener()

  return (
    <>
      <div className="sai-hero-cta">
        <button
          type="button"
          className="sai-hero-btn"
          onClick={() => setOpen(true)}
        >
          <span className="sai-hero-btn-icon" aria-hidden="true">✦</span>
          <span className="sai-hero-btn-body">
            <span className="sai-hero-btn-eyebrow">Coming Soon</span>
            <span>Ask Scripture AI — Join the Waitlist</span>
          </span>
          <span className="sai-hero-btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      {open && (
        <WaitlistModal
          onClose={() => setOpen(false)}
          mpLocation={mpLocation}
          pageName={pageName}
        />
      )}
    </>
  )
}

// ── Gita page CTA — drop-in replacement for <GitaAppCTA /> ────────────────────
// Same signature: variant (inline | verse | chapter), locale (en | hi), verse, chapter.
// Renders inside gita/verse/chapter/topic pages with matching visual weight.
type GitaVariant = 'inline' | 'verse' | 'chapter'

interface GitaCTAProps {
  variant: GitaVariant
  locale?: 'en' | 'hi'
  verse?: { chapter: number; verse: number } | null
  chapter?: { number: number; enName?: string; hiName?: string; totalVerses?: number } | null
  /** Page identifier for Mixpanel; falls back to the pathname if omitted. */
  pageName?: string
}

const GITA_COPY = {
  en: {
    inlineHead: 'Ask the Gita — coming soon',
    inlineSub: 'An AI that reads all 700 verses like a teacher. Join the waitlist.',
    verseHead: (c?: number, v?: number) =>
      c && v ? `Have a question about verse ${c}.${v}?` : 'Have a question about this verse?',
    chapterHead: (name?: string) =>
      name ? `Have a question about ${name}?` : 'Have a question about the Gita?',
    sub: 'Ask Scripture AI when it launches. One line — your email — that\'s it.',
    eyebrow: 'Coming Soon — Ask Scripture AI',
    placeholder: 'your@email.com',
    cta: 'Notify me',
    ctaLoading: 'Joining…',
    doneTitle: 'You\'re on the list.',
    doneSub: 'We\'ll email you the moment it launches.',
    errorFallback: 'Something went wrong. Try again.',
    invalid: 'Enter a valid email.',
    footnote: 'No spam · One email when it ships',
    chipsLabel: 'What would you ask? (optional)',
  },
  hi: {
    inlineHead: 'गीता से पूछें — जल्द आ रहा है',
    inlineSub: 'एक AI जो सभी 700 श्लोकों को शिक्षक की तरह पढ़ता है। waitlist में जुड़ें।',
    verseHead: (c?: number, v?: number) =>
      c && v ? `श्लोक ${c}.${v} पर कोई सवाल है?` : 'इस श्लोक पर कोई सवाल है?',
    chapterHead: (name?: string) =>
      name ? `${name} पर कोई सवाल है?` : 'गीता पर कोई सवाल है?',
    sub: 'Ask Scripture AI तैयार होते ही पूछें। सिर्फ आपकी ईमेल — बस।',
    eyebrow: 'जल्द आ रहा है — Ask Scripture AI',
    placeholder: 'आपकी ईमेल',
    cta: 'सूचित करें',
    ctaLoading: 'जोड़ा जा रहा है…',
    doneTitle: 'आप वेटलिस्ट में हैं।',
    doneSub: 'तैयार होते ही आपको ईमेल मिलेगी।',
    errorFallback: 'कुछ गड़बड़ हुई। फिर से कोशिश करें।',
    invalid: 'सही ईमेल दें।',
    footnote: 'कोई spam नहीं · एक ईमेल जब यह शुरू हो',
    chipsLabel: 'आप क्या पूछेंगे? (वैकल्पिक)',
  },
}

// Short labels for the inline chip variant (compact one-liners for the pill row).
const QUERY_OPTIONS_SHORT: Record<'en' | 'hi', Record<OptionId, string>> = {
  en: {
    guidance: 'Life guidance',
    verse:    'Explain a verse',
    topic:    'Find by topic',
    modern:   'Modern problems',
  },
  hi: {
    guidance: 'जीवन मार्गदर्शन',
    verse:    'श्लोक समझें',
    topic:    'विषय से खोजें',
    modern:   'आधुनिक समस्या',
  },
}

export function ScriptureAIGitaCTA({
  variant,
  locale = 'en',
  verse,
  chapter,
  pageName,
}: GitaCTAProps) {
  const { open, setOpen } = useOpener()
  const t = GITA_COPY[locale]

  const resolvedPageName =
    pageName ??
    (variant === 'verse' && verse
      ? `Gita ${locale} Verse ${verse.chapter}.${verse.verse}`
      : variant === 'chapter' && chapter
        ? `Gita ${locale} Chapter ${chapter.number}`
        : `Gita ${locale} ${variant}`)

  const mpLocation = `gita_${locale}_${variant}${
    variant === 'verse' && verse ? `_${verse.chapter}.${verse.verse}` : ''
  }${variant === 'chapter' && chapter ? `_ch${chapter.number}` : ''}_scripture_ai`

  // ── Inline (thin one-liner) ────────────────────────────────────────────────
  if (variant === 'inline') {
    return (
      <>
        <aside className="sai-gita-inline" aria-label={t.inlineHead}>
          <div className="sai-gita-inline-copy">
            <div className="sai-gita-inline-head">
              <span className="sai-gita-inline-dot" aria-hidden="true" />
              {t.inlineHead}
            </div>
            <div className="sai-gita-inline-sub">{t.inlineSub}</div>
          </div>
          <button
            type="button"
            className="sai-gita-inline-btn"
            onClick={() => setOpen(true)}
          >
            {t.cta}
          </button>
        </aside>
        {open && (
          <WaitlistModal
            onClose={() => setOpen(false)}
            mpLocation={mpLocation}
            pageName={resolvedPageName}
          />
        )}
      </>
    )
  }

  // ── Verse / Chapter — inline email capture (low cognitive load) ───────────
  // No modal, no example cards, no long copy. Just: eyebrow → one-line question
  // → email + button. Auto-tags the waitlist entry with an interest derived from
  // the surface (verse pages → 'verse', chapter pages → 'topic') so we still
  // capture product signal without asking the user for it.
  return (
    <InlineGitaSignup
      variant={variant}
      locale={locale}
      verse={verse}
      chapter={chapter}
      mpLocation={mpLocation}
      pageName={resolvedPageName}
    />
  )
}

// ── Inline signup block — the low-friction verse/chapter CTA ─────────────────
function InlineGitaSignup({
  variant,
  locale,
  verse,
  chapter,
  mpLocation,
  pageName,
}: {
  variant: Exclude<GitaVariant, 'inline'>
  locale: 'en' | 'hi'
  verse?: { chapter: number; verse: number } | null
  chapter?: { number: number; enName?: string; hiName?: string; totalVerses?: number } | null
  mpLocation: string
  pageName: string
}) {
  const t = GITA_COPY[locale]
  const shortLabels = QUERY_OPTIONS_SHORT[locale]
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState<Set<OptionId>>(new Set())
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const head =
    variant === 'verse'
      ? t.verseHead(verse?.chapter, verse?.verse)
      : t.chapterHead(locale === 'hi' ? chapter?.hiName : chapter?.enName)

  // Auto-derived interest based on surface — used as a fallback if the user
  // submits without picking any chips, so we still capture *some* signal.
  const autoInterest: OptionId = variant === 'verse' ? 'verse' : 'topic'

  function toggleOption(id: OptionId) {
    setSelected(prev => {
      const next = new Set(prev)
      const wasSelected = next.has(id)
      if (wasSelected) next.delete(id)
      else next.add(id)
      trackEvent('Scripture AI Interest Toggled', {
        page: pageName,
        location: mpLocation,
        interest: id,
        action: wasSelected ? 'removed' : 'added',
        interest_count_after: next.size,
        surface: 'inline_gita',
      })
      return next
    })
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    const validation = validateEmail(email)
    if (!validation.ok) {
      setErrorMsg(t.invalid)
      setStatus('error')
      trackEvent('Scripture AI Waitlist Validation Failed', {
        page: pageName,
        location: mpLocation,
        reason: validation.error,
        surface: 'inline_gita',
      })
      return
    }

    // Interests: user picks → what they picked. No picks → fall back to the
    // surface-derived interest so every entry has at least one tag.
    const userPickedInterests = Array.from(selected)
    const interestsToSend = userPickedInterests.length > 0 ? userPickedInterests : [autoInterest]

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: validation.email,
          interests: interestsToSend,
          source: mpLocation,
        }),
      })
      if (!res.ok) throw new Error('server_' + res.status)

      trackEvent('Scripture AI Waitlist Submitted', {
        page: pageName,
        location: mpLocation,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        email: validation.email,
        email_domain: validation.email.split('@')[1] || '',
        interests: interestsToSend,
        interests_user_picked: userPickedInterests,
        interest_count: interestsToSend.length,
        interest_count_user_picked: userPickedInterests.length,
        picked_no_interests: userPickedInterests.length === 0,
        auto_interest_used: userPickedInterests.length === 0 ? autoInterest : null,
        surface: 'inline_gita',
        variant,
        locale,
        verse_ref: verse ? `${verse.chapter}.${verse.verse}` : undefined,
        chapter_number: chapter?.number,
      })
      setStatus('done')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown'
      trackEvent('Scripture AI Waitlist Submit Failed', {
        page: pageName,
        location: mpLocation,
        error: msg,
        surface: 'inline_gita',
      })
      setErrorMsg(t.errorFallback)
      setStatus('error')
    }
  }

  return (
    <aside className="sai-gita-inline-card" aria-label={head} data-mp-section="scripture_ai_inline">
      <div className="sai-gita-inline-glow" aria-hidden="true" />
      <div className="sai-gita-inline-body">
        <div className="sai-gita-inline-eyebrow">
          <span className="sai-gita-inline-eyebrow-dot" aria-hidden="true" />
          {t.eyebrow}
        </div>
        <h3 className="sai-gita-inline-head">{head}</h3>

        {status === 'done' ? (
          <div className="sai-gita-inline-done">
            <div className="sai-gita-inline-done-icon" aria-hidden="true">✓</div>
            <div>
              <div className="sai-gita-inline-done-title">{t.doneTitle}</div>
              <div className="sai-gita-inline-done-sub">{t.doneSub}</div>
            </div>
          </div>
        ) : (
          <>
            <p className="sai-gita-inline-sub-line">{t.sub}</p>

            {/* Optional chip row — compact, secondary, but visible enough to
                capture product signal from users who want to tell us more. */}
            <div className="sai-gita-inline-chips-label">{t.chipsLabel}</div>
            <div className="sai-gita-inline-chips" role="group" aria-label={t.chipsLabel}>
              {QUERY_OPTIONS.map(opt => {
                const on = selected.has(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`sai-gita-inline-chip${on ? ' sai-gita-inline-chip--on' : ''}`}
                    onClick={() => toggleOption(opt.id)}
                    aria-pressed={on}
                  >
                    <span aria-hidden="true">{opt.icon}</span>
                    {shortLabels[opt.id]}
                  </button>
                )
              })}
            </div>

            <form onSubmit={onSubmit} className="sai-gita-inline-form">
              <input
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                maxLength={254}
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (status === 'error') { setStatus('idle'); setErrorMsg('') }
                }}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                disabled={status === 'loading'}
                className="sai-gita-inline-input"
              />
              <button
                type="submit"
                disabled={status === 'loading' || email.trim().length === 0}
                className="sai-gita-inline-submit"
              >
                {status === 'loading' ? t.ctaLoading : t.cta}
              </button>
            </form>
            {status === 'error' && errorMsg && (
              <p className="sai-gita-inline-error" role="alert">{errorMsg}</p>
            )}
            <p className="sai-gita-inline-footnote">{t.footnote}</p>
          </>
        )}
      </div>
    </aside>
  )
}
