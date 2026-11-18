'use client'

import { useId, useState, type FormEvent } from 'react'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'
import { parseRef } from '@/lib/search/parseRef'
import { currentEntryPath, ENTRY_PATH_PARAM } from '@/lib/search/entry'
import type { Locale } from '@/lib/locale'
import '@/components/site/site.css'
import './search.css'

export type VerseJumpProps = {
  lang: Locale
  /** Where the box sits, sent with Verse Jump Completed (e.g. "gita_hub", "hi_gita_hub", "nav"). */
  location: string
  className?: string
}

const COPY = {
  en: {
    label: 'Find a verse',
    placeholder: 'Verse number or a line you remember',
    go: 'Go',
    hint: 'Try 2.47 or karmanye vadhikaraste',
  },
  hi: {
    label: 'श्लोक खोजें',
    placeholder: 'श्लोक संख्या या पंक्ति लिखें',
    go: 'खोजें',
    hint: 'जैसे 2.47 या कर्मण्येवाधिकारस्ते',
  },
} as const

/**
 * A small box that goes straight to a verse when you type its number (2.47, bg 2:47,
 * अध्याय 2 श्लोक 47) and opens the search page for anything else. It never loads the search
 * index: numbers are read by lib/search/parseRef (verse counts are built in).
 * Without JavaScript it still submits to /search?q=.
 * Event: Verse Jump Completed { query, result: 'verse' | 'chapter' | 'invalid' | 'search', item_id, location }.
 */
export default function VerseJump({ lang, location, className = '' }: VerseJumpProps) {
  const c = COPY[lang]
  const id = useId()
  const [q, setQ] = useState('')
  const [note, setNote] = useState<string | null>(null)
  const searchPath = lang === 'hi' ? '/hi/search' : '/search'

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    const ref = parseRef(query)
    if (ref) {
      if (!ref.valid) {
        trackEventBeacon(EVENTS.VerseJumpCompleted, { query, result: 'invalid', item_id: ref.id, location })
        setNote(ref.message?.[lang] ?? null)
        return
      }
      trackEventBeacon(EVENTS.VerseJumpCompleted, { query, result: ref.verse === undefined ? 'chapter' : 'verse', item_id: ref.id, location })
      window.location.assign(lang === 'hi' ? ref.hiUrl : ref.url)
      return
    }
    trackEventBeacon(EVENTS.VerseJumpCompleted, { query, result: 'search', location })
    window.location.assign(`${searchPath}?q=${encodeURIComponent(query)}&from=${encodeURIComponent(location)}&${ENTRY_PATH_PARAM}=${encodeURIComponent(currentEntryPath())}`)
  }

  return (
    <form
      role="search"
      action={searchPath}
      method="get"
      className={`vs-jump ${className}`.trim()}
      onSubmit={onSubmit}
      lang={lang}
      data-mp-section={location}
    >
      <label htmlFor={id} className="vs-visually-hidden">
        {c.label}
      </label>
      <div className="vs-field vs-field--compact">
        <SearchIcon />
        <input
          id={id}
          name="q"
          type="search"
          className="vs-input"
          placeholder={c.placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            if (note) setNote(null)
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
          aria-describedby={`${id}-hint`}
        />
        <button type="submit" className="sx-btn sx-btn--primary sx-btn--sm vs-go">
          {c.go}
        </button>
      </div>
      <p id={`${id}-hint`} className={`vs-hint${note ? ' vs-hint--note' : ''}`} aria-live="polite">
        {note ?? c.hint}
      </p>
    </form>
  )
}

export function SearchIcon() {
  return (
    <svg className="vs-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}
