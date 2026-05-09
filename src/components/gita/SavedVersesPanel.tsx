'use client'

/**
 * Renders a user's bookmarked verses on /gita and /hi/gita.
 * Reads localStorage on mount; nothing renders until we have data, so SSR isn't broken.
 */

import { useEffect, useState } from 'react'
import indexJson from '@/content/gita/index.json'
import type { IndexEntry } from '@/lib/gita'
import { trackEvent } from '@/lib/mixpanel'

const KEY = 'wisdom.bookmarks'

const labels = {
  en: { title: 'Your saved verses', empty: '', cta: 'Continue reading →', subtitle: 'Verses you’ve bookmarked, kept on this device.' },
  hi: { title: 'आपके सहेजे गए श्लोक', empty: '', cta: 'पढ़ना जारी रखें →', subtitle: 'इस device पर रखे गए श्लोक।' },
}

type Bookmark = { chapter: number; verse: number; addedAt: number }

export default function SavedVersesPanel({ locale = 'en' as 'en' | 'hi' }) {
  const t = labels[locale]
  const [items, setItems] = useState<(IndexEntry & { addedAt: number })[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    try {
      const raw = window.localStorage.getItem(KEY)
      if (!raw) return
      const bms = JSON.parse(raw) as Bookmark[]
      const idx = indexJson as IndexEntry[]
      const matched = bms
        .map((b) => {
          const e = idx.find((x) => x.chapter === b.chapter && x.verse === b.verse)
          return e ? { ...e, addedAt: b.addedAt } : null
        })
        .filter((x): x is IndexEntry & { addedAt: number } => !!x)
        .sort((a, b) => b.addedAt - a.addedAt)
      setItems(matched.slice(0, 6))
    } catch {
      /* ignore */
    }
  }, [])

  // Empty bookmarks → render nothing (panel only appears when there's something to show)
  if (!ready || items.length === 0) return null

  const path = (c: number, v: number) =>
    locale === 'hi' ? `/hi/gita/chapter/${c}/verse/${v}` : `/gita/chapter/${c}/verse/${v}`

  return (
    <section className="gita-saved-panel" aria-label={t.title}>
      <div className="gita-saved-head">
        <h2 className="gita-h2" style={{ margin: 0 }}>{t.title}</h2>
        <span className="gita-saved-sub">{t.subtitle}</span>
      </div>
      <ul className="gita-verse-list">
        {items.map((v) => (
          <li key={`${v.chapter}-${v.verse}`}>
            <a
              href={path(v.chapter, v.verse)}
              data-mp-location="saved_verse"
              onClick={() => trackEvent('Saved Verse Opened', { chapter: v.chapter, verse: v.verse, locale })}
            >
              <span className="gita-verse-num">{v.chapter}.{v.verse}</span>
              <span className="gita-verse-snippet">{v.essence || v.snippet}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
