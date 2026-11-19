'use client'

/**
 * Mount once in the root layout. For a signed-in reader: their Gita progress syncs across devices
 * (lib/readingSync). For everyone else: the sign-in card, loaded only when a reader has stayed longer
 * than most (lib/account/nudge), so no page carries it in its first load.
 *
 * Also finishes a sign-in that went through Google's redirect (popup blocked): the morning-verse choice
 * made on the card was kept in sessionStorage (lib/funnelClient savePending) and is applied here.
 */

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { getRedirectResult } from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { identify, takePending } from '@/lib/funnelClient'
import { localeForPath } from '@/lib/locale'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { startEngagedClock } from '@/lib/analytics/engagedClock'
import {
  IDLE_MS,
  SESSION_SEC,
  addSessionSecond,
  nudgeExcluded,
  nudgeVariant,
  pageThreshold,
  sessionEngaged,
  shownThisVisit,
  snoozed,
} from '@/lib/account/nudge'
import { finishSignin, NUDGE_SOURCE } from '@/lib/account/signin'

const SigninCard = dynamic(() => import('./SigninCard'), { ssr: false })

export type NudgeTrigger = { trigger: 'page' | 'session'; dwell_sec: number; session_sec: number; threshold_sec: number }

export default function AccountRoot() {
  const pathname = usePathname() ?? '/'
  const { user, loading } = useAuth()
  const [due, setDue] = useState<NudgeTrigger | null>(null)

  // Signed in: keep progress in sync.
  useEffect(() => {
    if (!user) return
    let stop: (() => void) | undefined
    let alive = true
    import('@/lib/readingSync').then((m) => {
      if (alive) stop = m.startReadingSync()
    })
    return () => {
      alive = false
      stop?.()
    }
  }, [user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  // Back from Google's redirect after the card's button.
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (cred) => {
        if (!cred?.user) return
        const p = takePending()
        if (p?.source !== NUDGE_SOURCE) return
        identify(cred.user)
        const daily = p.daily === true
        trackEvent(EVENTS.SigninCompleted, { location: NUDGE_SOURCE, method: 'redirect', daily })
        await finishSignin({ daily, lang: p.lang === 'hi' ? 'hi' : 'en' })
      })
      .catch(() => {})
  }, [])

  // Not signed in: watch engaged time on this page and across the visit.
  useEffect(() => {
    if (user) return // a card showing its "you're in" note stays until it closes itself
    setDue(null)
    if (loading || nudgeExcluded(pathname) || snoozed() || shownThisVisit()) return
    if (typeof window !== 'undefined' && window.location.hostname.startsWith('dhyaan.')) return
    const threshold = pageThreshold(pathname)
    const clock = startEngagedClock((dwell) => {
      const total = addSessionSecond()
      const trigger = dwell >= threshold ? 'page' : total >= SESSION_SEC ? 'session' : null
      if (!trigger) return
      clock.stop()
      setDue({ trigger, dwell_sec: dwell, session_sec: sessionEngaged(), threshold_sec: trigger === 'page' ? threshold : SESSION_SEC })
    }, IDLE_MS)
    return () => clock.stop()
  }, [pathname, loading, user])

  if (!due) return null
  return <SigninCard lang={localeForPath(pathname)} variant={nudgeVariant(pathname)} trigger={due} onDone={() => setDue(null)} />
}
