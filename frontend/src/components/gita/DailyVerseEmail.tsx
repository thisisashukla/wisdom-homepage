'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

interface Props {
  /** Mixpanel page attribution (matches the pageName used by BlogTracker on the host page) */
  page: string
  /** Locale for copy — 'en' | 'hi'. Defaults to 'en'. */
  locale?: 'en' | 'hi'
}

// ── Email validation (matches ScriptureAIWaitlist for consistency) ───────────
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function validateEmail(raw: string, locale: 'en' | 'hi'): { ok: boolean; email: string; error?: string } {
  const invalid = locale === 'hi' ? 'सही ईमेल दें।' : 'Enter a valid email.'
  const email = raw.trim().toLowerCase()
  if (!email) return { ok: false, email, error: invalid }
  if (email.length > 254) return { ok: false, email, error: invalid }
  if (email.includes('..')) return { ok: false, email, error: invalid }
  const [local, domain] = email.split('@')
  if (!local || !domain || !domain.includes('.')) return { ok: false, email, error: invalid }
  if (local.length > 64) return { ok: false, email, error: invalid }
  if (local.startsWith('.') || local.endsWith('.')) return { ok: false, email, error: invalid }
  if (!EMAIL_RE.test(email)) return { ok: false, email, error: invalid }
  return { ok: true, email }
}

/**
 * Zero-friction daily-verse email signup for /gita/today.
 * A separate waitlist from Ask Scripture AI — this one is for a daily
 * Sanskrit + English verse in your inbox each morning. POSTs to
 * `/api/subscribe`; that route forwards to backend or logs.
 */
export default function DailyVerseEmail({ page, locale = 'en' }: Props) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setError] = useState<string | null>(null)

  const copy = locale === 'hi'
    ? {
        eyebrow: 'रोज़ का श्लोक · ईमेल पर',
        heading: 'हर सुबह — एक श्लोक, आपकी inbox में',
        sub: 'संस्कृत, अर्थ, और एक-पंक्ति सार। कोई spam नहीं।',
        placeholder: 'आपकी ईमेल',
        button: 'रोज़ का श्लोक चाहिए →',
        buttonLoading: 'जोड़ा जा रहा है…',
        doneTitle: 'हो गया।',
        doneSub: 'जैसे ही यह शुरू होगी, आपको सबसे पहले सूचना मिलेगी।',
        errorFallback: 'कुछ गड़बड़ हुई। कृपया फिर से कोशिश करें।',
        footnote: 'मुफ़्त · कोई spam नहीं · कभी भी बंद कर सकते हैं',
      }
    : {
        eyebrow: 'Daily Verse · By Email',
        heading: 'One verse. Every morning. Straight to your inbox.',
        sub: 'Sanskrit, English translation, and the one-line essence — every day.',
        placeholder: 'your@email.com',
        button: 'Get the daily verse →',
        buttonLoading: 'Adding you…',
        doneTitle: 'You’re in.',
        doneSub: 'We’ll email you the moment the daily verse goes out.',
        errorFallback: 'Something went wrong. Please try again.',
        footnote: 'Free · No spam · Unsubscribe anytime',
      }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validation = validateEmail(email, locale)
    if (!validation.ok) {
      setError(validation.error || copy.errorFallback)
      setStatus('error')
      trackEvent('Daily Verse Waitlist Validation Failed', {
        page, locale, source: 'daily_verse',
      })
      return
    }
    setStatus('loading')
    setError(null)
    trackEvent('Daily Verse Waitlist Attempt', {
      page, locale, source: 'daily_verse', mode: 'waitlist',
    })
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: validation.email,
          source: 'gita_today_waitlist',
          locale,
          mode: 'waitlist',
        }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      setStatus('done')
      trackEvent('Daily Verse Waitlist Joined', {
        page,
        locale,
        source: 'daily_verse',
        mode: 'waitlist',
        email: validation.email,
        email_domain: validation.email.split('@')[1] || '',
      })
    } catch (err) {
      setStatus('error')
      setError(copy.errorFallback)
      trackEvent('Daily Verse Waitlist Error', {
        page, locale, source: 'daily_verse', mode: 'waitlist',
        error: err instanceof Error ? err.message : 'unknown',
      })
    }
  }

  const gold      = 'var(--gold-light, #f5c96a)'
  const goldDeep  = 'var(--gold, #c8881e)'
  const border    = 'rgba(245, 201, 106, 0.28)'
  const textDim   = 'rgba(245, 232, 204, 0.62)'

  return (
    <section
      data-mp-section="daily_verse_waitlist"
      style={{
        position: 'relative',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        padding: '30px 30px 26px',
        borderRadius: 18,
        border: `1px solid ${border}`,
        background: 'linear-gradient(180deg, rgba(245,201,106,0.05) 0%, rgba(200,136,30,0.02) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* soft ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40%',
          right: '-15%',
          width: '55%',
          height: '180%',
          background: 'radial-gradient(ellipse at center, rgba(245,201,106,0.11), transparent 60%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* header row: icon + eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div
            aria-hidden="true"
            style={{
              width: 38, height: 38,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${gold} 0%, ${goldDeep} 100%)`,
              color: '#1a0606', fontSize: 18,
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(245, 201, 106, 0.25)',
            }}
          >
            ✉
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: gold,
            }}
          >
            {copy.eyebrow}
          </div>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(22px, 3vw, 26px)',
            fontWeight: 700,
            lineHeight: 1.22,
            margin: '0 0 8px',
            color: 'var(--gold-light, #f5c96a)',
          }}
        >
          {copy.heading}
        </h3>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 14.5,
            lineHeight: 1.6,
            color: textDim,
            maxWidth: 460,
          }}
        >
          {copy.sub}
        </p>

        {status === 'done' ? (
          <div
            role="status"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(245,201,106,0.10)',
              border: '1px solid rgba(245,201,106,0.32)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 26, height: 26,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${gold} 0%, ${goldDeep} 100%)`,
                color: '#1a0606', fontSize: 14, fontWeight: 800,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 17, fontWeight: 700, color: gold, marginBottom: 2,
              }}>
                {copy.doneTitle}
              </div>
              <div style={{ fontSize: 13.5, color: textDim, lineHeight: 1.5 }}>
                {copy.doneSub}
              </div>
            </div>
          </div>
        ) : (
          <>
            <form
              onSubmit={onSubmit}
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                maxLength={254}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setError(null) } }}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                disabled={status === 'loading'}
                style={{
                  flex: '1 1 240px',
                  minWidth: 0,
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(245,201,106,0.22)',
                  background: 'rgba(0, 0, 0, 0.28)',
                  color: 'var(--text, #f5e8cc)',
                  fontSize: 15,
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 201, 106, 0.6)'
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,201,106,0.22)'
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.28)'
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading' || email.trim().length === 0}
                style={{
                  padding: '14px 22px',
                  borderRadius: 12,
                  border: 'none',
                  background: `linear-gradient(135deg, ${gold} 0%, ${goldDeep} 100%)`,
                  color: '#1a0606',
                  fontSize: 14.5,
                  fontWeight: 700,
                  cursor: status === 'loading' ? 'wait' : email.trim().length === 0 ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' || email.trim().length === 0 ? 0.6 : 1,
                  boxShadow: '0 2px 12px rgba(245, 201, 106, 0.28)',
                  transition: 'transform 0.1s, filter 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => {
                  if (status !== 'loading' && email.trim().length > 0) {
                    e.currentTarget.style.filter = 'brightness(1.06)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter = 'none'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                {status === 'loading' ? copy.buttonLoading : copy.button}
              </button>
            </form>
            {status === 'error' && errorMsg && (
              <p style={{
                marginTop: 10,
                fontSize: 13,
                color: '#f4a3a3',
                margin: '10px 0 0',
              }}>
                {errorMsg}
              </p>
            )}
            <p style={{
              marginTop: 12, marginBottom: 0,
              fontSize: 11.5,
              color: 'rgba(245, 232, 204, 0.35)',
              letterSpacing: '0.02em',
            }}>
              {copy.footnote}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
