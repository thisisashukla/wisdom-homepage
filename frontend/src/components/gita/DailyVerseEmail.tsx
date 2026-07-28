'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

interface Props {
  /** Mixpanel page attribution (matches the pageName used by BlogTracker on the host page) */
  page: string
  /** Locale for copy — 'en' | 'hi'. Defaults to 'en'. */
  locale?: 'en' | 'hi'
}

/**
 * Single-field email capture for the daily verse.
 * Zero-friction: no account, no double opt-in, one field.
 * POSTs to `/api/subscribe`; that route forwards to backend or logs.
 */
export default function DailyVerseEmail({ page, locale = 'en' }: Props) {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setError]  = useState<string | null>(null)

  const copy = locale === 'hi'
    ? {
        eyebrow: 'जल्द आ रहा है · वेटलिस्ट',
        heading: 'रोज़ एक श्लोक — सीधे आपकी ईमेल पर',
        sub: 'हम रोज़ का श्लोक ईमेल पर भेजने की सुविधा तैयार कर रहे हैं — संस्कृत, हिन्दी अर्थ और एक-पंक्ति सार। अपनी ईमेल दीजिए, जैसे ही यह शुरू हो, आप सबसे पहले जुड़ेंगे।',
        placeholder: 'आपकी ईमेल',
        button: 'वेटलिस्ट में जुड़ें',
        buttonLoading: 'जोड़ा जा रहा है…',
        done: 'आप वेटलिस्ट में हैं। जैसे ही यह सुविधा शुरू होगी, आपको सबसे पहले सूचना मिलेगी।',
        errorFallback: 'कुछ गड़बड़ हुई। कृपया फिर से कोशिश करें।',
      }
    : {
        eyebrow: 'Coming soon · waitlist',
        heading: 'Daily verse by email — join the waitlist',
        sub: 'We’re building a daily Bhagavad Gita verse email — Sanskrit, English meaning, and the one-line essence, in your inbox each morning. Drop your email and you’ll be first on when it opens.',
        placeholder: 'your@email.com',
        button: 'Join the waitlist',
        buttonLoading: 'Adding you…',
        done: 'You’re on the waitlist. We’ll email you the moment daily verses go live.',
        errorFallback: 'Something went wrong. Please try again.',
      }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setError(locale === 'hi' ? 'कृपया सही ईमेल दें।' : 'Please enter a valid email.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setError(null)
    trackEvent('Waitlist Join Attempt', { page, locale, source: 'daily_verse', mode: 'waitlist' })
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'gita_today_waitlist', locale, mode: 'waitlist' }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      setStatus('done')
      trackEvent('Waitlist Joined', { page, locale, source: 'daily_verse', mode: 'waitlist' })
    } catch (err) {
      setStatus('error')
      setError(copy.errorFallback)
      trackEvent('Waitlist Join Error', { page, locale, source: 'daily_verse', mode: 'waitlist' })
    }
  }

  return (
    <section
      data-mp-section="daily_verse_waitlist"
      style={{
        marginTop: '2rem',
        marginBottom: '1.5rem',
        padding: '22px 24px',
        borderRadius: '14px',
        border: '1px solid rgba(245,201,106,0.28)',
        background: 'linear-gradient(180deg, rgba(200,136,30,0.06), rgba(200,136,30,0.02))',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--gold-light, #f5c96a)',
          marginBottom: 10,
        }}
      >
        {copy.eyebrow}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 24,
          lineHeight: 1.2,
          margin: '0 0 8px',
          color: 'var(--text, #f5e8cc)',
        }}
      >
        {copy.heading}
      </h3>
      <p
        style={{
          margin: '0 0 16px',
          fontSize: 14.5,
          lineHeight: 1.6,
          color: 'var(--text-dim, rgba(245,232,204,0.65))',
        }}
      >
        {copy.sub}
      </p>

      {status === 'done' ? (
        <div
          role="status"
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            background: 'rgba(245,201,106,0.12)',
            border: '1px solid rgba(245,201,106,0.3)',
            color: 'var(--gold-pale, #f5e6b8)',
            fontSize: 14.5,
          }}
        >
          {copy.done}
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            disabled={status === 'loading'}
            style={{
              flex: '1 1 220px',
              minWidth: 0,
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid rgba(245,201,106,0.25)',
              background: 'rgba(0,0,0,0.25)',
              color: 'var(--text, #f5e8cc)',
              fontSize: 15,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '12px 22px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--gold, #c8881e)',
              color: '#1a0606',
              fontSize: 14.5,
              fontWeight: 700,
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
            }}
          >
            {status === 'loading' ? copy.buttonLoading : copy.button}
          </button>
        </form>
      )}
      {status === 'error' && errorMsg && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#f4a3a3' }}>{errorMsg}</p>
      )}
    </section>
  )
}
