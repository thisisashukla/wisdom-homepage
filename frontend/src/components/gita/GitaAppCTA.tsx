'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Verse, Chapter } from '@/lib/gita'
import { deviceOS, appOffer, type DeviceOS } from '@/lib/device'
import { appStoreUrl, pageContext } from '@/lib/funnel'
import { nextPlace, readPlace, readingUrl } from '@/lib/reading-progress'
import { trackEvent, trackCTAImpression } from '@/lib/mixpanel'

type Props = {
  variant: 'inline' | 'verse' | 'chapter' | 'hero'
  placement?: 'hero' | 'article_inline' | 'verse_end' | 'chapter_end' | 'hub_intro' | 'footer'
  locale?: 'en' | 'hi'
  verse?: Pick<Verse, 'chapter' | 'verse'> | null
  chapter?: Pick<Chapter, 'number' | 'enName' | 'hiName' | 'totalVerses'> | null
  pageName?: string
}

export default function GitaAppCTA({ variant, placement, locale = 'en', verse, chapter }: Props) {
  const path = usePathname()
  const [os, setOS] = useState<DeviceOS | null>(null)
  const [savedUrl, setSavedUrl] = useState<string | null>(null)
  const node = useRef<HTMLElement>(null)
  const shown = useRef('')
  const position = placement || (variant === 'verse' ? 'verse_end' : variant === 'inline' ? 'article_inline' : variant === 'hero' ? 'hero' : 'chapter_end')
  useEffect(() => {
    setOS(deviceOS(navigator.userAgent, navigator.maxTouchPoints))
    const saved = readPlace()
    setSavedUrl(saved ? readingUrl(saved) : null)
  }, [path])
  const offer = appOffer(os)
  const app = offer !== 'web_reading'
  const desktop = offer === 'desktop_app'
  const context = pageContext(path)
  useEffect(() => {
    if (!os || !node.current) return
    const key = `${path}:${offer}:${position}`
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && shown.current !== key) {
        shown.current = key
        trackCTAImpression(path, { ...pageContext(path), os, variant: offer, placement: position })
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(node.current)
    return () => observer.disconnect()
  }, [path, os, offer, position])
  const hi = locale === 'hi'
  const prefix = hi ? '/hi' : ''
  const next = verse ? nextPlace({ ...verse, locale }) : null
  const webUrl = next ? readingUrl(next) : verse ? `${prefix}/gita` : savedUrl || (chapter && chapter.number < 18 ? `${prefix}/gita/chapter/${chapter.number + 1}/verse/1` : `${prefix}/gita/chapter/1/verse/1`)
  const translation = path.includes('best-bhagavad-gita-translation')
  const karma = path.includes('karma-quotes')
  const heading = app
    ? hi ? 'रोज़ एक श्लोक, आपके iPhone पर' : karma ? 'Carry a teaching into your day.' : translation ? 'Make time for a little Gita, every day.' : 'Keep a verse with you.'
    : hi ? 'पढ़ना जारी रखें' : verse ? next ? 'Read the next verse.' : 'Explore another chapter.' : 'A little reading, every day.'
  const description = app
    ? hi ? 'संस्कृत श्लोक, अंग्रेज़ी अर्थ और होम स्क्रीन विजेट। शुरुआत मुफ़्त है; अधिक सुविधाओं के लिए सशुल्क प्लान है।' : 'Sanskrit verses, English meaning, and a home screen widget. Free to start, with an optional paid plan.'
    : hi ? 'हिंदी में यहीं पढ़ें। यह ब्राउज़र आपका आखिरी पढ़ा श्लोक याद रखता है।' : 'Read free on the web. Your place is saved in this browser. The app is available for iPhone and iPad.'
  const props = { ...context, os, variant: offer, placement: position, ...(verse ? { verse: `${verse.chapter}.${verse.verse}` } : {}) }
  return <aside ref={node} className={`reader-cta reader-cta--${variant}`} data-reader-cta data-placement={position} data-offer={os ? offer : 'loading'} aria-label={hi ? 'पढ़ना जारी रखें' : 'Daily reading with Wisdom'}>
    <div className="reader-cta-copy">
      {app && <div className="reader-cta-brand"><img src="/assets/new-light-logo.webp" width="28" height="28" alt="" /><span>{hi ? 'Wisdom · iPhone और iPad के लिए' : 'Wisdom for iPhone & iPad'}</span></div>}
      {variant !== 'hero' && <h3>{heading}</h3>}
      <p>{description}</p>
    </div>
    <div className="reader-cta-actions">
      <a className={app ? 'reader-cta-store' : 'reader-cta-link'} href={app ? appStoreUrl(path, process.env.NEXT_PUBLIC_APP_STORE_PROVIDER_ID) : webUrl}
        {...(app ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={() => trackEvent(app ? 'App Store Button Clicked' : 'Continue Reading Clicked', props)}>
        {app ? <img src="/assets/app-store-badge.svg" width="162" height="48" alt={hi ? 'App Store से Wisdom डाउनलोड करें' : 'Download Wisdom on the App Store'} /> : hi ? 'पढ़ना जारी रखें →' : 'Continue reading →'}
      </a>
      {desktop && <details className="reader-cta-qr" onToggle={event => { if (event.currentTarget.open) trackEvent('App QR Shown', props) }}>
        <summary>{hi ? 'iPhone से स्कैन करें' : 'Scan with your iPhone'} <span aria-hidden="true">↗</span></summary>
        <div className="reader-cta-qr-panel"><img src="/assets/wisdom-app-qr.svg" width="160" height="160" alt="QR code to download Wisdom on the App Store" /><p>{hi ? 'iPhone का कैमरा खोलकर स्कैन करें।' : 'Open your iPhone camera and scan to get Wisdom.'}</p></div>
      </details>}
    </div>
  </aside>
}
