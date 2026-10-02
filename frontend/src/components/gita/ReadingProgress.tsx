'use client'
import { useEffect, useState } from 'react'
import { readPlace, readingUrl, READING_KEY, validPlace } from '@/lib/reading-progress'
import type { ReadingPlace } from '@/lib/reading-progress'
import { trackEvent } from '@/lib/mixpanel'

export function SaveReadingPlace(place: ReadingPlace) {
  useEffect(() => {
    if (!validPlace(place)) return
    try { localStorage.setItem(READING_KEY, JSON.stringify(place)) } catch { /* Reading works without storage. */ }
  }, [place.chapter, place.verse, place.locale])
  return null
}

export default function ContinueReading({ locale = 'en' }: { locale?: 'en' | 'hi' }) {
  const [place, setPlace] = useState<ReadingPlace | null>(null)
  useEffect(() => {
    const refresh = () => setPlace(readPlace())
    refresh()
    window.addEventListener('pageshow', refresh)
    window.addEventListener('storage', refresh)
    return () => { window.removeEventListener('pageshow', refresh); window.removeEventListener('storage', refresh) }
  }, [])
  return <div className="continue-reading-slot">
    {place && <a className="continue-reading" href={readingUrl(place)} onClick={() => trackEvent('Continue Reading Clicked', { verse: `${place.chapter}.${place.verse}`, reading_locale: place.locale })}>
      <span>{locale === 'hi' ? 'जहाँ पढ़ना छोड़ा था' : 'Your last verse'}</span>
      <strong>{locale === 'hi' ? `${place.chapter}.${place.verse} से आगे पढ़ें` : `Continue at ${place.chapter}.${place.verse}`} →</strong>
    </a>}
  </div>
}
