'use client'

/**
 * One "get the app" control for every device.
 *  - iPhone and desktop (and the server render): the existing App Store button,
 *    passed as children (or a plain App Store link when none is given).
 *  - Android: "Add to home screen" when Chrome has offered an install, else a
 *    link to /start (the app's onboarding on the web), since the app is iPhone only.
 * The server renders the iPhone/desktop version; Android swaps after mount.
 * Events: Install Prompt Viewed / Clicked { location, source: 'app_button' };
 * the /start and App Store links send Link Clicked / App Store Button Clicked via data-mp-location.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { appStoreUrl, startUrl } from '@/lib/app'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { canInstall, initInstall, isAndroid, isStandalone, onInstallAvailability, promptInstall } from '@/lib/install'
import { Button } from '@/components/site/Button'
import '@/components/site/site.css'
import './install.css'

export type AppButtonForPlatformProps = {
  lang: Locale
  /** data-mp-location of the replaced button; Android links get "<location>_android". */
  location: string
  /** The existing App Store button, shown on iPhone and desktop. */
  children?: ReactNode
  /** App Store campaign for the default link when no children are given (default "web_<location>"). */
  campaign?: string
  /** ref on the Android /start link (default: location). */
  androidRef?: string
  /** Optional situation id carried to /start. */
  startSituation?: string
  /** Class for the Android control, to match the button it replaces (default "sx-btn sx-btn--primary"). */
  androidClassName?: string
  /** Label overrides for the Android controls. */
  installLabel?: string
  startLabel?: string
}

const T = {
  en: { install: 'Add Wisdom to your home screen', start: 'Get my free 7-day plan', app: 'Get the app' },
  hi: { install: 'Wisdom को होम स्क्रीन पर जोड़ें', start: 'मेरा 7 दिन का मुफ़्त प्लान', app: 'ऐप पाएं' },
} as const

export default function AppButtonForPlatform({
  lang,
  location,
  children,
  campaign,
  androidRef,
  startSituation,
  androidClassName = 'sx-btn sx-btn--primary',
  installLabel,
  startLabel,
}: AppButtonForPlatformProps) {
  const t = T[lang] ?? T.en
  const [android, setAndroid] = useState(false)
  const [installable, setInstallable] = useState(false)
  const viewed = useRef(false)

  useEffect(() => {
    if (!isAndroid()) return
    setAndroid(true)
    initInstall()
    if (isStandalone()) return
    setInstallable(canInstall())
    return onInstallAvailability(setInstallable)
  }, [])

  useEffect(() => {
    if (!android || !installable || viewed.current) return
    viewed.current = true
    trackEvent(EVENTS.InstallPromptViewed, { location, source: 'app_button' })
  }, [android, installable, location])

  const startHref = startUrl({ s: startSituation, ref: androidRef ?? location })

  if (android && installable) {
    const onInstall = async () => {
      trackEvent(EVENTS.InstallPromptClicked, { location, action: 'add', source: 'app_button' })
      const outcome = await promptInstall()
      if (outcome === 'unavailable') window.location.assign(startHref)
    }
    return (
      <button type="button" className={`${androidClassName} ins-appbtn`.trim()} onClick={onInstall}>
        <img src="/icons/icon-192.webp" alt="" width={22} height={22} className="ins-appbtn-ico" />
        <span>{installLabel ?? t.install}</span>
      </button>
    )
  }

  if (android) {
    return (
      <a href={startHref} className={androidClassName} data-mp-location={`${location}_android`}>
        {startLabel ?? t.start}
      </a>
    )
  }

  if (children) return <>{children}</>

  return <Button href={appStoreUrl(campaign ?? `web_${location}`)} label={t.app} location={location} variant="primary" external />
}
