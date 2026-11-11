'use client'

/**
 * A small "add to home screen" card for Android Chrome readers.
 * Shows only when: Android Chrome (never iOS, never in-app browsers), not
 * already installed or opened from the home screen, the reader's second visit
 * or later, not snoozed, and Chrome has offered an install (beforeinstallprompt).
 * Closing it, or closing Chrome's dialog, snoozes it for 14 days.
 * It waits while another bar sits at the bottom of the screen (the docked Play-All player,
 * the verse navigator, the quote LineBar), so two bars never stack.
 * Events: Install Prompt Viewed / Clicked { location, action: 'add' | 'later' | 'close' },
 * App Installed (lib/install).
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import {
  bottomBarVisible,
  canInstall,
  initInstall,
  installEligible as eligible,
  onInstallAvailability,
  promptInstall,
  snoozeInstall,
  visitCount,
} from '@/lib/install'
import '@/components/site/site.css'
import './install.css'

export type InstallPromptProps = {
  lang: Locale
  /** Analytics location (default "install_banner"). */
  location?: string
  className?: string
}

export const INSTALL_COPY = {
  en: {
    title: 'Keep the Gita one tap away',
    sub: 'Open your verse straight from your home screen, like any other app.',
    add: 'Add to home screen',
    later: 'Not now',
    close: 'Close',
  },
  hi: {
    title: 'गीता, बस एक टैप दूर',
    sub: 'होम स्क्रीन से सीधे अपना श्लोक खोलें, बाकी ऐप्स की तरह।',
    add: 'होम स्क्रीन पर जोड़ें',
    later: 'अभी नहीं',
    close: 'बंद करें',
  },
} as const


export default function InstallPrompt({ lang, location = 'install_banner', className = '' }: InstallPromptProps) {
  const t = INSTALL_COPY[lang] ?? INSTALL_COPY.en
  const [available, setAvailable] = useState(false)
  const [barBusy, setBarBusy] = useState(true)
  const viewed = useRef(false)

  useEffect(() => {
    initInstall()
    if (!eligible()) return
    setAvailable(canInstall())
    return onInstallAvailability((a) => setAvailable(a && eligible()))
  }, [])

  // While the offer stands, check about once a second whether another bottom bar is showing.
  useEffect(() => {
    if (!available) return
    const check = () => setBarBusy(bottomBarVisible())
    check()
    const id = window.setInterval(check, 800)
    return () => window.clearInterval(id)
  }, [available])

  const show = available && !barBusy

  useEffect(() => {
    if (!show || viewed.current) return
    viewed.current = true
    trackEvent(EVENTS.InstallPromptViewed, { location, visit: visitCount(), source: 'banner' })
  }, [show, location])

  if (!show) return null

  const onAdd = async () => {
    trackEvent(EVENTS.InstallPromptClicked, { location, action: 'add', source: 'banner' })
    setAvailable(false)
    const outcome = await promptInstall()
    if (outcome === 'dismissed') snoozeInstall()
  }

  const onClose = (action: 'later' | 'close') => () => {
    trackEvent(EVENTS.InstallPromptClicked, { location, action, source: 'banner' })
    snoozeInstall()
    setAvailable(false)
  }

  return (
    <div className={`ins-card ${className}`.trim()} role="dialog" aria-modal="false" aria-label={t.title} lang={lang === 'hi' ? 'hi' : undefined}>
      <img className="ins-icon" src="/icons/icon-192.webp" alt="" width={44} height={44} />
      <div className="ins-body">
        <p className="ins-title">{t.title}</p>
        <p className="ins-sub">{t.sub}</p>
        <div className="ins-row">
          <button type="button" className="sx-btn sx-btn--primary sx-btn--sm" onClick={onAdd}>
            {t.add}
          </button>
          <button type="button" className="sx-btn sx-btn--link" onClick={onClose('later')}>
            {t.later}
          </button>
        </div>
      </div>
      <button type="button" className="ins-x" onClick={onClose('close')} aria-label={t.close}>
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
