'use client'

/**
 * The two next steps after a shalaka: a custom 7-day Gita plan on /start (every device),
 * and on iPhone the Wisdom app. Used on the answer, the day-done screen, below the tool and on line pages.
 * The server renders the plan only; the App Store row appears after mount on iPhone.
 */

import { useEffect, useRef, useState } from 'react'
import { appStoreUrl, detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackAppStoreClick, trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import { RS_FUNNEL, type RsLocale } from '@/lib/funnels/ram-shalaka/core'

export type RsNextCopy = { planTitle: string; planSub: string; planBtn: string; planFree: string; appLine: string; appBtn: string }

type Props = {
  locale: RsLocale
  pageKey: string
  placement: 'answer' | 'done' | 'page' | 'line'
  copy: RsNextCopy
  n?: number | null
  k?: number | null
  situation?: string | null
  signedIn?: boolean
}

export default function RsNext({ locale, pageKey, placement, copy, n = null, k = null, situation = null, signedIn }: Props) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  const rootRef = useRef<HTMLElement>(null)
  const shown = useRef(false)
  useEffect(() => setPlatform(detectPlatform()), [])

  const ref = n ? `rs-${n}-${placement}` : `rs-${placement}`
  const planHref = startUrl({ s: situation, ref })
  const appHref = appStoreUrl(ref)
  const ios = platform === 'ios'
  const base = { funnel: RS_FUNNEL, page: pageKey, locale, placement, platform: platform ?? 'desktop', k, n, situation, ...(signedIn === undefined ? {} : { signed_in: signedIn }) }

  useEffect(() => {
    if (platform === null || shown.current) return
    const el = rootRef.current
    if (!el) return
    const fire = () => {
      if (shown.current) return
      shown.current = true
      trackEvent('Shalaka Next Shown', { ...base, app: ios })
    }
    if (typeof IntersectionObserver === 'undefined') return fire()
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && (fire(), io.disconnect()), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform])

  return (
    <section ref={rootRef} className="rs-plan" lang={locale} aria-label={copy.planTitle}>
      <span className="rs-plan-mark" aria-hidden="true">
        {locale === 'hi' ? '७' : '7'}
      </span>
      <h3 className="rs-plan-title">{copy.planTitle}</h3>
      <p className="rs-plan-sub">{copy.planSub}</p>
      <a
        className="rs-cta gold rs-plan-btn"
        href={planHref}
        data-mp-location={`rs_plan_${placement}`}
        onClick={() => trackEventBeacon('Plan From Chaupai', { ...base, ref })}
      >
        <span>{copy.planBtn}</span>
        <small>{copy.planFree}</small>
      </a>
      {ios && (
        <a data-mp-tracked=""
          className="rs-applink"
          href={appHref}
          target="_blank"
          rel="noopener"
          onClick={() => {
            trackEventBeacon('Shalaka App Tapped', { ...base, ref })
            trackAppStoreClick(pageKey, `rs_app_${placement}`, appHref)
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9ZM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z"
            />
          </svg>
          <span>{copy.appLine}</span>
          <b>{copy.appBtn}</b>
        </a>
      )}
    </section>
  )
}
