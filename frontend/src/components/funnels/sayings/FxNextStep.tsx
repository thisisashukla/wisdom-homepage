'use client'

/**
 * Next step for the sayings hubs.
 * Vivekananda and Chanakya: the shared NextStep with our own lines (the app has Gita lines only).
 * Kabir: WhatsApp on every phone, iPhone included (the app has no Kabir, so sending these
 * readers to a Gita app would be a bait and switch), /start on desktop. Same events as NextStep.
 */

import { useEffect, useRef, useState } from 'react'
import NextStep from '@/components/quotes/NextStep'
import { detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackEvent, trackEventBeacon, trackLinkClick } from '@/lib/mixpanel'
import { slugify } from '@/lib/quotes-shared'
import { FUNNEL, type Hub, type Locale } from '@/lib/funnels/sayings/shared'
import '@/components/quotes/card.css'

type Kind = 'app' | 'whatsapp' | 'email'
type Copy = Partial<Record<Kind, { line: string; cta: string }>>

const COPY: Record<'vivekananda' | 'chanakya', Record<Locale, Copy>> = {
  vivekananda: {
    en: {
      app: {
        line: 'He kept going back to the Gita. Get one Gita line on your phone each morning.',
        cta: 'Get one line each morning',
      },
      whatsapp: { line: 'One line each morning, on WhatsApp.', cta: 'Join' },
      email: {
        line: 'A week of Gita lines for what you are facing, in your inbox.',
        cta: 'Send my week',
      },
    },
    hi: {
      app: {
        line: 'स्वामीजी बार-बार गीता की ओर लौटते थे। हर सुबह गीता की एक पंक्ति अपने फ़ोन पर पाएं।',
        cta: 'हर सुबह एक श्लोक पाएं',
      },
      whatsapp: { line: 'हर सुबह एक पंक्ति, WhatsApp पर।', cta: 'जुड़ें' },
      email: {
        line: 'आपकी बात के लिए एक हफ़्ते के गीता श्लोक, ईमेल पर।',
        cta: 'मेरा हफ़्ता भेजें',
      },
    },
  },
  chanakya: {
    hi: {
      app: {
        line: 'हर सुबह फ़ोन पर गीता का एक श्लोक, सीधी भाषा में।',
        cta: 'हर सुबह एक श्लोक पाएं',
      },
      whatsapp: {
        line: 'हर सुबह काम की एक पंक्ति, WhatsApp पर।',
        cta: 'जुड़ें',
      },
      email: {
        line: 'एक हफ़्ते तक रोज़ एक श्लोक, आपकी बात के लिए, ईमेल पर।',
        cta: 'मेरा हफ़्ता भेजें',
      },
    },
    en: {
      app: {
        line: 'One Gita line on your phone each morning, in plain words.',
        cta: 'Get one line each morning',
      },
      whatsapp: {
        line: 'One useful line each morning, on WhatsApp.',
        cta: 'Join',
      },
      email: {
        line: 'A week of lines for what you are facing, in your inbox.',
        cta: 'Send my week',
      },
    },
  },
}

const KABIR: Record<
  Locale,
  {
    whatsapp: { line: string; cta: string }
    email: { line: string; cta: string }
  }
> = {
  hi: {
    whatsapp: {
      line: 'हर सुबह मन के लिए एक पंक्ति, WhatsApp पर।',
      cta: 'WhatsApp पर जुड़ें',
    },
    email: {
      line: 'एक हफ़्ते तक रोज़ एक पंक्ति, आपकी बात के लिए, ईमेल पर।',
      cta: 'मेरा हफ़्ता भेजें',
    },
  },
  en: {
    whatsapp: {
      line: 'One line for the mind each morning, on WhatsApp.',
      cta: 'Join on WhatsApp',
    },
    email: {
      line: 'A week of lines for what you are facing, in your inbox.',
      cta: 'Send my week',
    },
  },
}

const WHATSAPP_CHANNEL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || ''

export type FxNextStepProps = {
  hub: Hub
  locale: Locale
  pageName: string
  pageKey: string
  placement: string
  className?: string
}

function KabirNextStep({ locale, pageName, pageKey, placement, className }: FxNextStepProps) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const shown = useRef(false)
  useEffect(() => setPlatform(detectPlatform()), [])

  const p: Platform = platform ?? 'desktop'
  const kind: 'whatsapp' | 'email' = p !== 'desktop' && WHATSAPP_CHANNEL ? 'whatsapp' : 'email'
  const slug = slugify(`q-${pageKey}-${placement}`)
  const href = kind === 'whatsapp' ? WHATSAPP_CHANNEL : startUrl({ ref: slug })
  const target = kind === 'whatsapp' ? 'whatsapp' : 'start'
  const t = KABIR[locale][kind]

  useEffect(() => {
    if (platform === null || shown.current) return
    const el = rootRef.current
    if (!el) return
    const fire = () => {
      if (shown.current) return
      shown.current = true
      trackEvent('Next Step Shown', {
        platform,
        placement,
        target,
        page: pageName,
        page_key: pageKey,
        locale,
        funnel: FUNNEL,
        hub: 'kabir',
      })
    }
    if (typeof IntersectionObserver === 'undefined') return fire()
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          fire()
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [platform, placement, target, pageName, pageKey, locale])

  const onTap = () => {
    trackEventBeacon('Next Step Tapped', {
      platform: p,
      placement,
      target,
      page: pageName,
      page_key: pageKey,
      ref: slug,
      locale,
      funnel: FUNNEL,
      hub: 'kabir',
    })
    trackLinkClick(pageName, `next_step_${placement}`, href)
  }

  return (
    <div ref={rootRef} className={`qns${className ? ` ${className}` : ''}`} data-kind={kind} lang={locale}>
      <p className="qns-line">{t.line}</p>
      <a className="qns-btn" data-mp-tracked="next_step" href={href} target={kind === 'whatsapp' ? '_blank' : undefined} rel={kind === 'whatsapp' ? 'noopener' : undefined} onClick={onTap}>
        {t.cta}
      </a>
    </div>
  )
}

export default function FxNextStep(props: FxNextStepProps) {
  if (props.hub === 'kabir' || props.hub === 'rahim') return <KabirNextStep {...props} />
  const copy = COPY[props.hub][props.locale]
  return <NextStep locale={props.locale} pageName={props.pageName} pageKey={props.pageKey} placement={props.placement} className={props.className} copy={copy} funnel="sayings" />
}
