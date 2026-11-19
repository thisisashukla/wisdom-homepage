'use client'

/**
 * The sign-in card for readers who have stayed longer than most (AccountRoot decides when).
 * Signing in keeps their place in the Gita on every device, and (ticked by default) sends one verse
 * each morning, from where they are. Sits at the bottom of the screen, above any docked bar (verse
 * navigator, audio player, quote bar), and waits while the install card is showing.
 *
 * Events: Signin Prompt Viewed / Clicked, Signin Completed / Failed / Cancelled, Daily Email Toggled.
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { signInWithGoogle } from '@/lib/funnelClient'
import { markShown, snooze } from '@/lib/account/nudge'
import { finishSignin, NUDGE_SOURCE } from '@/lib/account/signin'
import { GoogleMark } from '@/components/onboarding/parts'
import type { NudgeTrigger } from './AccountRoot'
import '@/components/site/site.css'
import './account.css'

const COPY = {
  en: {
    place: { title: 'Keep your place in the Gita', sub: 'Pick up from this verse on any device, and wake up to the next one in your inbox.' },
    morning: { title: 'Wake up to one verse a day', sub: 'A Gita verse in your inbox each morning, and your reading kept on every device.' },
    daily: 'Send me a verse each morning',
    google: 'Continue with Google',
    later: 'Not now',
    close: 'Close',
    busy: 'One moment',
    error: 'That did not go through. Try once more?',
    doneDaily: 'You are in. Your first verse arrives tomorrow morning.',
    donePlace: 'You are in. Your reading now follows you to every device.',
  },
  hi: {
    place: { title: 'गीता में अपनी जगह संभालकर रखें', sub: 'किसी भी फ़ोन या कंप्यूटर पर यहीं से आगे पढ़ें, और हर सुबह अगला श्लोक आपके ईमेल में।' },
    morning: { title: 'हर सुबह, गीता का एक श्लोक', sub: 'हर सुबह आपके ईमेल में एक श्लोक, और आपकी पढ़ाई हर डिवाइस पर सुरक्षित।' },
    daily: 'हर सुबह एक श्लोक ईमेल पर भेजें',
    google: 'Google से जारी रखें',
    later: 'अभी नहीं',
    close: 'बंद करें',
    busy: 'एक पल',
    error: 'यह नहीं हो पाया। एक बार फिर कोशिश करें?',
    doneDaily: 'हो गया। आपका पहला श्लोक कल सुबह आएगा।',
    donePlace: 'हो गया। अब आपकी पढ़ाई हर डिवाइस पर साथ रहेगी।',
  },
} as const

const BARS = '.rd-player--docked, .vp-stickynav, .qbar'

/** Height taken at the bottom of the screen by a docked bar, so the card sits above it. */
function barOffset(): number {
  let h = 0
  for (const el of Array.from(document.querySelectorAll<HTMLElement>(BARS))) {
    if (!el.getClientRects().length || getComputedStyle(el).visibility === 'hidden') continue
    const r = el.getBoundingClientRect()
    if (r.bottom >= window.innerHeight - 4) h = Math.max(h, window.innerHeight - r.top)
  }
  return h
}
const installCardShowing = () => Boolean(document.querySelector('.ins-card'))

type Props = { lang: Locale; variant: 'place' | 'morning'; trigger: NudgeTrigger; onDone: () => void }

export default function SigninCard({ lang, variant, trigger, onDone }: Props) {
  const t = COPY[lang] ?? COPY.en
  const [ready, setReady] = useState(false)
  const [offset, setOffset] = useState(0)
  const [daily, setDaily] = useState(true)
  const [state, setState] = useState<'ask' | 'busy' | 'error' | 'done'>('ask')
  const [doneDaily, setDoneDaily] = useState(false)
  const viewed = useRef(false)

  // Wait for the install card to go, then keep clear of docked bars.
  useEffect(() => {
    const check = () => {
      setOffset(barOffset())
      setReady(!installCardShowing())
    }
    check()
    const id = window.setInterval(check, 800)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!ready || viewed.current) return
    viewed.current = true
    markShown()
    trackEvent(EVENTS.SigninPromptViewed, { ...trigger, variant })
  }, [ready, trigger, variant])

  useEffect(() => {
    if (state !== 'done') return
    const id = window.setTimeout(onDone, 4500)
    return () => window.clearTimeout(id)
  }, [state, onDone])

  if (!ready && state === 'ask') return null

  const close = (action: 'later' | 'close') => () => {
    trackEvent(EVENTS.SigninPromptClicked, { action, daily, variant })
    snooze()
    onDone()
  }

  const onGoogle = async () => {
    if (state === 'busy') return
    trackEvent(EVENTS.SigninPromptClicked, { action: 'google', daily, variant })
    setState('busy')
    try {
      const user = await signInWithGoogle({ source: NUDGE_SOURCE, daily, lang })
      if (!user) {
        trackEvent(EVENTS.SigninCancelled, { location: NUDGE_SOURCE })
        setState('ask')
        return
      }
      trackEvent(EVENTS.SigninCompleted, { location: NUDGE_SOURCE, method: 'popup', daily })
      const out = await finishSignin({ daily, lang })
      setDoneDaily(out === 'active')
      setState('done')
    } catch (e) {
      trackEvent(EVENTS.SigninFailed, { location: NUDGE_SOURCE, code: (e as { code?: string })?.code || 'unknown' })
      setState('error')
    }
  }

  const copy = t[variant]
  return (
    <div
      className={`acc-card${state === 'done' ? ' acc-card--done' : ''}`}
      style={{ bottom: `calc(${12 + offset}px + env(safe-area-inset-bottom, 0px))` }}
      role="dialog"
      aria-modal="false"
      aria-label={copy.title}
      lang={lang === 'hi' ? 'hi' : undefined}
    >
      {state === 'done' ? (
        <p className="acc-done" role="status">
          <span className="acc-done-mark" aria-hidden="true" />
          {doneDaily ? t.doneDaily : t.donePlace}
        </p>
      ) : (
        <>
          <p className="acc-title">{copy.title}</p>
          <p className="acc-sub">{copy.sub}</p>
          <label className="acc-check">
            <input type="checkbox" checked={daily} onChange={(e) => setDaily(e.target.checked)} />
            <span>{t.daily}</span>
          </label>
          {state === 'error' && <p className="acc-error">{t.error}</p>}
          <div className="acc-row">
            <button type="button" className="sx-btn sx-btn--primary sx-btn--sm acc-google" onClick={onGoogle} disabled={state === 'busy'}>
              <span className="acc-g" aria-hidden="true">
                <GoogleMark />
              </span>
              {state === 'busy' ? t.busy : t.google}
            </button>
            <button type="button" className="sx-btn sx-btn--link" onClick={close('later')}>
              {t.later}
            </button>
          </div>
          <button type="button" className="acc-x" onClick={close('close')} aria-label={t.close}>
            <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
