'use client'

import { useEffect, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { DHYAAN_URL } from '../_lib/site'

type Joined = { code: string; spot: number; referrals: number; total: number }

const LS_CODE = 'dhyaan_wl_code'
const LS_REF = 'dhyaan_wl_ref'
const DEVICES = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'watch', label: 'Apple Watch' },
  { id: 'airpods', label: 'AirPods' },
] as const

const read = (k: string) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v)
  } catch {
    /* private mode: the spot still shows for this visit */
  }
}

function utmFromUrl(): Record<string, string> {
  const out: Record<string, string> = {}
  const q = new URLSearchParams(window.location.search)
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const v = q.get(k)
    if (v) out[k] = v.slice(0, 80)
  }
  return out
}

/**
 * Email waitlist with a referral queue. Every sign-up gets a link; each friend who
 * joins through it moves them up 10 places. The code is the only thing kept in the
 * browser, so a returning visitor sees their spot without signing in.
 */
export default function WaitlistForm({ source, compact = false, cta = 'Join the waitlist' }: { source: string; compact?: boolean; cta?: string }) {
  const [email, setEmail] = useState('')
  const [devices, setDevices] = useState<string[]>(['iphone', 'watch'])
  const [trap, setTrap] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [error, setError] = useState('')
  const [joined, setJoined] = useState<Joined | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref && /^[A-Za-z0-9]{6}$/.test(ref)) write(LS_REF, ref.toUpperCase())
    const code = read(LS_CODE)
    if (!code) return
    fetch(`/api/dhyaan-waitlist?code=${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.ok && d.code && setJoined(d))
      .catch(() => {})
  }, [])

  const toggle = (id: string) => setDevices((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const clean = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setState('error')
      setError('That email doesn’t look right.')
      return
    }
    setState('sending')
    trackEvent(EVENTS.DhyaanWaitlistSubmitted, { location: source, devices })
    try {
      const res = await fetch('/api/dhyaan-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean, devices, source, ref: read(LS_REF), utm: utmFromUrl(), company: trap }),
      })
      const d = await res.json().catch(() => null)
      if (!res.ok || !d?.ok || !d.code) throw new Error(d?.error || 'unavailable')
      write(LS_CODE, d.code)
      setJoined(d)
      setState('idle')
      trackEvent(EVENTS.DhyaanWaitlistJoined, { location: source, is_new: d.isNew, spot: d.spot, referred: Boolean(read(LS_REF)) })
    } catch (err) {
      setState('error')
      setError('We couldn’t save that just now. Please try again in a minute.')
      trackEvent(EVENTS.DhyaanWaitlistFailed, { location: source, error: String((err as Error).message) })
    }
  }

  if (joined) {
    const link = `${DHYAAN_URL}/?ref=${joined.code}`
    const msg = `I’m on the waitlist for Dhyaan, a silent meditation app that reads your sit back to you: how still you were and how your heart settled. Join me: ${link}`
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        /* clipboard blocked: the link is visible to copy by hand */
      }
      trackEvent(EVENTS.DhyaanReferralCopied, { location: source })
    }
    return (
      <div className={`dh-joined ${compact ? 'dh-joined--compact' : ''}`} role="status">
        <p className="dh-joined__k">You’re on the list</p>
        <p className="dh-joined__spot">
          #{joined.spot.toLocaleString()}
          <span> of {joined.total.toLocaleString()}</span>
        </p>
        <p className="dh-muted">
          Each friend who joins with your link moves you up 10 places.
          {joined.referrals > 0 && ` ${joined.referrals} ${joined.referrals === 1 ? 'friend has' : 'friends have'} joined so far.`}
        </p>
        <div className="dh-share">
          <code className="dh-share__link">{link.replace('https://', '')}</code>
          <button type="button" className="dh-btn dh-btn--ghost" onClick={copy}>
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <a
            className="dh-btn dh-btn--ghost"
            href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noopener"
            onClick={() => trackEvent(EVENTS.DhyaanReferralShared, { location: source, channel: 'whatsapp' })}
          >
            Share on WhatsApp
          </a>
        </div>
        <p className="dh-small dh-muted">While you wait: try the <a href="/nivata">60-second stillness test</a> on your phone.</p>
      </div>
    )
  }

  return (
    <form className={`dh-form ${compact ? 'dh-form--compact' : ''}`} onSubmit={submit} noValidate>
      <label className="dh-sr" htmlFor={`dh-email-${source}`}>Email</label>
      <div className="dh-form__row">
        <input
          id={`dh-email-${source}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="dh-btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Saving…' : cta}
        </button>
      </div>
      {!compact && (
        <fieldset className={`dh-form__devices${email ? ' is-open' : ''}`}>
          <legend>What do you have? (helps us plan the beta)</legend>
          {DEVICES.map((d) => (
            <label key={d.id} className={devices.includes(d.id) ? 'on' : ''}>
              <input type="checkbox" checked={devices.includes(d.id)} onChange={() => toggle(d.id)} />
              {d.label}
            </label>
          ))}
        </fieldset>
      )}
      <input className="dh-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="company" />
      {state === 'error' && <p className="dh-form__err" role="alert">{error}</p>}
      <p className="dh-small dh-muted">One email when the beta opens, one at launch. No spam, unsubscribe any time.</p>
    </form>
  )
}
