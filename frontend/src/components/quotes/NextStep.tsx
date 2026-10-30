'use client'

/**
 * Device-aware next step after someone uses a line.
 * iPhone: the app (App Store, campaign ct = q-<pagekey>-<placement>).
 * Every link carries the same slug (ref on /start), lowercase a to z, 0 to 9 and hyphens, at most 40 characters.
 * Android: the WhatsApp channel when NEXT_PUBLIC_WHATSAPP_CHANNEL_URL is set, else /start.
 * Desktop (and the server render): /start, a week of lines by email.
 * The server renders the desktop version so nothing jumps on desktop; phones swap after mount.
 */

import { useEffect, useRef, useState } from 'react'
import { appStoreUrl, detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackEvent, trackEventBeacon, trackLinkClick } from '@/lib/mixpanel'
import { slugify, type Locale } from '@/lib/quotes-shared'
import './card.css'

export type NextStepProps = {
  locale: Locale
  pageName: string
  /** QuotePageConfig.key, used in the attribution slug. Falls back to pageName. */
  pageKey?: string
  placement: string
  startSituation?: string
  className?: string
  /** Funnel pages override the Krishna-specific lines per kind (e.g. a Ramayana or Upanishad line). */
  copy?: Partial<Record<Kind, { line: string; cta: string }>>
  /** Funnel slug added to Next Step Shown / Tapped so funnel pages can be split in Mixpanel. */
  funnel?: string
}

type Kind = 'app' | 'whatsapp' | 'email'

/** iPhone button: on a line ('hook', 'sheet') it starts with that line; elsewhere it offers the daily line. */
const LINE_PLACEMENTS = new Set(['hook', 'sheet'])
const IOS_DAILY_CTA: Record<Locale, string> = { en: 'Get one line each morning', hi: 'हर सुबह एक श्लोक पाएं' }

const COPY: Record<Locale, Record<Kind, { line: string; cta: string }>> = {
  en: {
    app: { line: 'See a line from Krishna each time you pick up your phone.', cta: 'Start with this line' },
    whatsapp: { line: 'One line from Krishna each morning, on WhatsApp.', cta: 'Join' },
    email: { line: "A week of lines for what you're going through, in your inbox.", cta: 'Send my week' },
  },
  hi: {
    app: { line: 'फ़ोन उठाएं तो कृष्ण का एक श्लोक दिखे।', cta: 'इसी श्लोक से शुरू करें' },
    whatsapp: { line: 'हर सुबह कृष्ण का एक श्लोक, WhatsApp पर।', cta: 'जुड़ें' },
    email: { line: 'आपकी बात के लिए एक हफ़्ते के श्लोक, ईमेल पर।', cta: 'मेरा हफ़्ता भेजें' },
  },
}

const WHATSAPP_CHANNEL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || ''

export default function NextStep({ locale, pageName, pageKey, placement, startSituation, className, copy: copyOverride, funnel }: NextStepProps) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const shown = useRef(false)

  useEffect(() => setPlatform(detectPlatform()), [])

  const p: Platform = platform ?? 'desktop'
  const kind: Kind = p === 'ios' ? 'app' : p === 'android' && WHATSAPP_CHANNEL ? 'whatsapp' : 'email'
  const slug = slugify(`q-${pageKey || pageName}-${placement}`)
  const href =
    kind === 'app' ? appStoreUrl(slug) : kind === 'whatsapp' ? WHATSAPP_CHANNEL : startUrl({ s: startSituation, ref: slug })
  const target = kind === 'app' ? 'app_store' : kind === 'whatsapp' ? 'whatsapp' : 'start'
  const external = kind !== 'email'
  const copy = copyOverride?.[kind] ?? COPY[locale][kind]
  const t = kind === 'app' && !LINE_PLACEMENTS.has(placement) && !copyOverride?.app ? { ...copy, cta: IOS_DAILY_CTA[locale] } : copy

  useEffect(() => {
    if (platform === null || shown.current) return
    const el = rootRef.current
    if (!el) return
    const fire = () => {
      if (shown.current) return
      shown.current = true
      trackEvent('Next Step Shown', { platform, placement, target, page: pageName, page_key: pageKey ?? null, locale, funnel: funnel ?? null })
    }
    if (typeof IntersectionObserver === 'undefined') {
      fire()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fire()
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [platform, placement, target, pageName, pageKey, locale, funnel])

  const onTap = () => {
    trackEventBeacon('Next Step Tapped', { platform: p, placement, target, page: pageName, page_key: pageKey ?? null, ref: slug, locale, funnel: funnel ?? null })
    trackLinkClick(pageName, `next_step_${placement}`, href)
  }

  return (
    <div ref={rootRef} className={`qns${className ? ` ${className}` : ''}`} data-kind={kind} lang={locale}>
      <p className="qns-line">{t.line}</p>
      <a
        className="qns-btn"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        onClick={onTap}
      >
        {t.cta}
      </a>
    </div>
  )
}
