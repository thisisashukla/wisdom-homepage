'use client'

/**
 * Mount once in the root layout (inside <body>). The service worker, Chrome's install offer
 * (held since <head> by lib/installBoot.ts), App Installed, visit counting and the Android
 * "add to home screen" card, all loaded after the page is interactive, so no page carries
 * lib/install or the card in its first load.
 *
 * The card picks en/hi from the URL (/hi/... is Hindi) the same way Nav does, and never shows
 * on the Dhyaan site (its own host, or the /dhyaan tree) or on INSTALL_EXCLUDE paths (/start, /app).
 * It loads only for a reader who could see it (Android Chrome, second visit or later, not
 * installed or snoozed).
 */

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { localeForPath } from '@/lib/locale'

const InstallPrompt = dynamic(() => import('./InstallPrompt'), { ssr: false })

type InstallLib = typeof import('@/lib/install')

export default function PwaRoot({ location = 'install_banner' }: { location?: string }) {
  const pathname = usePathname()
  const [lib, setLib] = useState<InstallLib | null>(null)
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    let alive = true
    const load = () =>
      import('@/lib/install')
        .then((m) => {
          m.initInstall()
          m.registerServiceWorker()
          if (!alive) return
          setLib(m)
          setEligible(m.installEligible() && !window.location.hostname.startsWith('dhyaan.'))
        })
        .catch(() => {
          // offline or a stale chunk: the site works the same without it
        })
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 3000 })
    else window.setTimeout(load, 1500)
    return () => {
      alive = false
    }
  }, [])

  const path = pathname ?? ''
  if (!lib || !eligible || path === '/dhyaan' || path.startsWith('/dhyaan/') || lib.installExcluded(path)) return null
  return <InstallPrompt lang={localeForPath(pathname)} location={location} />
}
