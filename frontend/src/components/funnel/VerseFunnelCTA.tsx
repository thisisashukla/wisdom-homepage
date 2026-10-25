'use client'

import { useEffect, useState } from 'react'
import { appStoreUrl, detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackLinkClick } from '@/lib/mixpanel'
import './funnel-cta.css'

/**
 * Sitewide bridge from reading to the funnel (replaces the old Scripture AI
 * waitlist block on verse, chapter and blog pages). Everyone gets "Find my
 * verse" (the homepage hero); iPhone visitors also get the App Store.
 */

type Props = {
  variant: 'verse' | 'chapter' | 'inline'
  locale?: 'en' | 'hi'
  verse?: { chapter: number; verse: number } | null
  chapter?: { number: number; enName?: string; hiName?: string } | null
  pageName?: string
}

const COPY = {
  en: {
    eyebrow: 'Wisdom',
    verseHead: (c: number, v: number) => `Is ${c}.${v} speaking to something in your life? Get a week of verses picked for your situation.`,
    head: 'Say what’s going on and get a week of verses for it, starting with the Gita.',
    sub: 'One a day, with the Sanskrit and what it means for you. Week 1 is free.',
    cta: 'Create my 7-day Gita plan',
    ios: 'On iPhone, the app walks seven days with it, read aloud. Week 1 is free.',
    iosCta: 'Get the app',
  },
  hi: {
    eyebrow: 'Wisdom · आपके जीवन के लिए गीता',
    verseHead: (c: number, v: number) => `क्या ${c}.${v} आपके जीवन की किसी बात से जुड़ता है? अपनी स्थिति के लिए चुने गए एक हफ़्ते के श्लोक पाएं।`,
    head: 'बताइए मन में क्या चल रहा है। उसके लिए हम एक हफ़्ते के श्लोक चुनेंगे, शुरुआत गीता से।',
    sub: 'रोज़ एक श्लोक, संस्कृत के साथ, और आपकी बात से उसका जुड़ाव। पहला हफ़्ता मुफ़्त।',
    cta: 'मेरी 7 दिन की गीता योजना बनाएं',
    ios: 'iPhone पर: 7 दिन की ऑडियो योजना और लॉक स्क्रीन पर आज का श्लोक।',
    iosCta: 'ऐप पाएं',
  },
}

export default function VerseFunnelCTA({ variant, locale = 'en', verse, chapter, pageName }: Props) {
  const [platform, setPlatform] = useState<Platform>('desktop')
  useEffect(() => setPlatform(detectPlatform()), [])
  const t = COPY[locale]
  const where = `${variant}${verse ? `_${verse.chapter}_${verse.verse}` : ''}${chapter ? `_ch${chapter.number}` : ''}`
  const page = pageName ?? `gita_${locale}_${where}`
  const appHref = appStoreUrl(`web_${variant}_${locale}`)
  const ios = platform === 'ios'
  const href = ios ? appHref : startUrl({ ref: where })
  const head = variant === 'verse' && verse ? t.verseHead(verse.chapter, verse.verse) : t.head

  return (
    <aside className={`vfc vfc-${variant}`} aria-label={head}>
      <div className="vfc-eyebrow">{t.eyebrow}</div>
      <p className="vfc-head">{head}</p>
      {variant !== 'inline' && <p className="vfc-sub">{t.sub}</p>}
      <div className="vfc-actions">
        <a
          className="vfc-btn"
          href={href}
          target={ios ? '_blank' : undefined}
          rel={ios ? 'noopener' : undefined}
          onClick={() => trackLinkClick(page, ios ? `funnel_cta_app_${where}` : `funnel_cta_${where}`, href)}
        >
          {t.cta}
        </a>
      </div>
      {platform === 'ios' && variant !== 'inline' && <p className="vfc-fine">{t.ios}</p>}
    </aside>
  )
}

