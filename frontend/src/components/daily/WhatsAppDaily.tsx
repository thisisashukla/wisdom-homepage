'use client'

/**
 * A calm card that invites the reader to get one shlok every morning on WhatsApp.
 *
 * Renders nothing until NEXT_PUBLIC_WHATSAPP_CHANNEL_URL is set.
 * trigger:
 *  - 'inline' (default): shows on mount.
 *  - 'after-read': shows once the reader has read AFTER_READ_THRESHOLD verses
 *    (lib/readingProgress readCount, refreshed live through subscribeReading).
 *  - 'after-download': same card, worded for someone who just saved a PDF or image.
 * Closing it hides it for the rest of the day; tapping Join (here or on the kit's NextStep)
 * hides it for good. Pages load it with next/dynamic (ssr: false): it renders nothing on the server.
 * Events: WhatsApp Join Viewed / Clicked { location, trigger, verses_read }.
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { AFTER_READ_THRESHOLD, dismissForToday, dismissedToday, hasJoined, markJoined, whatsappChannelUrl } from '@/lib/whatsapp'
import { readCount, subscribeReading } from '@/lib/readingProgress'
import { Icon } from '@/components/quotes/Icons'
import '@/components/site/site.css'
import '@/components/quotes/card.css'
import './daily.css'

export type WhatsAppDailyTrigger = 'after-read' | 'after-download' | 'inline'

export type WhatsAppDailyProps = {
  lang: Locale
  /** Where the card sits, for analytics (e.g. "verse_end", "pdf_thanks"). */
  location: string
  trigger?: WhatsAppDailyTrigger
  className?: string
}

const COPY = {
  en: {
    lead: {
      inline: 'Every morning',
      'after-read': (n: number) => `You have read ${n} verses here`,
      'after-download': 'For the mornings ahead',
    },
    title: 'One shlok every morning, on your WhatsApp',
    sub: 'A quiet minute before the day begins. The verse with its meaning, easy to read over tea.',
    join: 'Join on WhatsApp',
    later: 'Not now',
    note: 'Free. Leave whenever you like.',
    close: 'Close',
  },
  hi: {
    lead: {
      inline: 'रोज़ सुबह',
      'after-read': (n: number) => `आपने यहाँ ${n} श्लोक पढ़े`,
      'after-download': 'आने वाली सुबहों के लिए',
    },
    title: 'हर सुबह एक श्लोक, आपके WhatsApp पर',
    sub: 'दिन शुरू होने से पहले एक शांत पल। श्लोक और उसका अर्थ, सुबह की चाय के साथ पढ़ लें।',
    join: 'WhatsApp पर जुड़ें',
    later: 'अभी नहीं',
    note: 'मुफ़्त। जब चाहें छोड़ दें।',
    close: 'बंद करें',
  },
} as const

export default function WhatsAppDaily({ lang, location, trigger = 'inline', className = '' }: WhatsAppDailyProps) {
  const href = whatsappChannelUrl()
  const t = COPY[lang] ?? COPY.en
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const viewed = useRef(false)

  // Decide whether to show (client only: dismissal and reading live in localStorage).
  useEffect(() => {
    if (!href) return
    if (hasJoined() || dismissedToday()) return
    if (trigger !== 'after-read') {
      setVisible(true)
      return
    }
    const check = () => {
      const n = readCount()
      setCount(n)
      if (n >= AFTER_READ_THRESHOLD && !dismissedToday() && !hasJoined()) setVisible(true)
    }
    check()
    return subscribeReading(check)
  }, [href, trigger])

  // Viewed: once, when at least half the card is on screen.
  useEffect(() => {
    if (!visible || viewed.current) return
    const el = rootRef.current
    const fire = () => {
      if (viewed.current) return
      viewed.current = true
      trackEvent(EVENTS.WhatsAppJoinViewed, { location, trigger, verses_read: count || null })
    }
    if (!el || typeof IntersectionObserver === 'undefined') {
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
  }, [visible, location, trigger, count])

  if (!href || !visible) return null

  const lead = trigger === 'after-read' ? t.lead['after-read'](Math.max(count, AFTER_READ_THRESHOLD)) : t.lead[trigger]

  const onJoin = () => {
    trackEvent(EVENTS.WhatsAppJoinClicked, { location, trigger, verses_read: count || null })
    markJoined()
    // Let the new tab open before the card leaves.
    setTimeout(() => setVisible(false), 400)
  }

  const onDismiss = () => {
    dismissForToday()
    setVisible(false)
  }

  return (
    <aside
      ref={rootRef}
      className={`dly-wa dly-wa--${trigger} ${className}`.trim()}
      lang={lang === 'hi' ? 'hi' : undefined}
      aria-label={t.title}
    >
      <button type="button" className="dly-wa-x" onClick={onDismiss} aria-label={t.close}>
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <p className="dly-wa-lead">{lead}</p>
      <p className="dly-wa-title">{t.title}</p>
      <p className="dly-wa-sub">{t.sub}</p>
      <div className="dly-wa-row">
        <a
          className="sx-btn sx-btn--primary dly-wa-join"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-mp-tracked=""
          onClick={onJoin}
        >
          <Icon name="whatsapp" />
          <span>{t.join}</span>
        </a>
        <button type="button" className="sx-btn sx-btn--link" onClick={onDismiss}>
          {t.later}
        </button>
      </div>
      <p className="dly-wa-note">{t.note}</p>
    </aside>
  )
}
