'use client'

/**
 * Per-verse save toggle ("Save" / "सहेजें"). Writes through lib/readingProgress (wq_reading.saved),
 * so the resume card and the saved list on /gita update at once. Verses saved before Nov 2026
 * live in the older 'wisdom.bookmarks' list, which readingProgress still reads (and unsaving
 * removes from), so nobody loses a save.
 */

import { useCallback, useEffect, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { isSaved, setSaved as storeSaved, subscribeReading } from '@/lib/readingProgress'
import { verseItemId } from '@/lib/gitaUrls'

const labels = {
  en: { save: 'Save', saved: 'Saved' },
  hi: { save: 'सहेजें', saved: 'सहेजा गया' },
}

type Props = {
  chapter: number
  verse: number
  locale?: 'en' | 'hi'
}

export type Bookmark = { chapter: number; verse: number; addedAt: number }

export default function VerseBookmark({ chapter, verse, locale = 'en' }: Props) {
  const t = labels[locale]
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const check = () => setSaved(isSaved(chapter, verse))
    check()
    return subscribeReading(check)
  }, [chapter, verse])

  const toggle = useCallback(() => {
    const next = !isSaved(chapter, verse)
    storeSaved(chapter, verse, next)
    setSaved(next)
    trackEvent(next ? EVENTS.VerseBookmarked : EVENTS.VerseUnbookmarked, { chapter, verse, locale, item_id: verseItemId(chapter, verse), item_type: 'verse' })
  }, [chapter, verse, locale])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={`gita-bookmark ${saved ? 'is-saved' : ''}`}
      data-mp-location={saved ? 'bookmark_remove' : 'bookmark_add'}
    >
      <span aria-hidden>{saved ? '★' : '☆'}</span>
      {saved ? t.saved : t.save}
    </button>
  )
}
