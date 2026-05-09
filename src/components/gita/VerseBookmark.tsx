'use client'

/**
 * Per-verse bookmark toggle. Persists to localStorage under 'wisdom.bookmarks'.
 * Used on verse pages; the saved list is rendered by <SavedVersesPanel/> on /gita.
 */

import { useEffect, useState, useCallback } from 'react'
import { trackEvent } from '@/lib/mixpanel'

const KEY = 'wisdom.bookmarks'

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

const read = (): Bookmark[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Bookmark[]) : []
  } catch {
    return []
  }
}
const write = (bms: Bookmark[]) => {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(KEY, JSON.stringify(bms)) } catch { /* quota */ }
}

export default function VerseBookmark({ chapter, verse, locale = 'en' }: Props) {
  const t = labels[locale]
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const list = read()
    setSaved(list.some((b) => b.chapter === chapter && b.verse === verse))
  }, [chapter, verse])

  const toggle = useCallback(() => {
    const list = read()
    const exists = list.some((b) => b.chapter === chapter && b.verse === verse)
    const next = exists
      ? list.filter((b) => !(b.chapter === chapter && b.verse === verse))
      : [...list, { chapter, verse, addedAt: Date.now() }].slice(-100)
    write(next)
    setSaved(!exists)
    trackEvent(exists ? 'Verse Unbookmarked' : 'Verse Bookmarked', { chapter, verse, locale })
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
