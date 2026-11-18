'use client'

import { useEffect, useRef, type FormEvent } from 'react'
import type { Locale } from '@/lib/locale'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'
import { queryScript } from '@/lib/search/match'
import { currentEntryPath, ENTRY_PATH_PARAM } from '@/lib/search/entry'

const COPY = {
  open: { en: 'Find a verse', hi: 'श्लोक खोजें' },
  close: { en: 'Close search', hi: 'खोज बंद करें' },
  placeholder: { en: 'Verse number or a line', hi: 'श्लोक संख्या या कोई पंक्ति' },
  submit: { en: 'Search', hi: 'खोजें' },
} as const

const SEARCH_PATH: Record<Locale, string> = { en: '/search', hi: '/hi/search' }

/** Magnifier in the nav bar. Rendered once for desktop and once for phones; both drive the same panel. */
export function NavSearchButton({ open, onToggle, locale, className = '' }: { open: boolean; onToggle: () => void; locale: Locale; className?: string }) {
  return (
    <button
      type="button"
      className={`nav-search-btn ${className}`.trim()}
      aria-label={COPY.open[locale]}
      aria-expanded={open}
      aria-controls="nav-search-panel"
      data-nav-search-btn=""
      onClick={onToggle}
    >
      <SearchIcon />
    </button>
  )
}

/** The bar that drops below the nav. A plain GET form, so it reaches /search?q= even before JS loads. */
export function NavSearchPanel({ open, onClose, locale }: { open: boolean; onClose: () => void; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element
      if (root.current?.contains(t) || t.closest?.('[data-nav-search-btn]')) return
      onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      onClose()
      const btns = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-search-btn]'))
      btns.find((b) => b.offsetParent !== null)?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const entryPath = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const query = input.current?.value.trim() ?? ''
    if (!query) {
      e.preventDefault()
      input.current?.focus()
      return
    }
    if (entryPath.current) entryPath.current.value = currentEntryPath()
    // Beacon: the page unloads right after, and this is the one event that knows the query for sure.
    trackEventBeacon(EVENTS.SearchSubmitted, { query, script: queryScript(query), location: 'nav' })
  }

  return (
    <div id="nav-search-panel" className="nav-search-panel" ref={root} hidden={!open}>
      <form className="nav-search-form" action={SEARCH_PATH[locale]} method="get" role="search" onSubmit={onSubmit}>
        <span className="nav-search-field">
          <SearchIcon />
          <input
            ref={input}
            type="search"
            name="q"
            className="nav-search-input"
            placeholder={COPY.placeholder[locale]}
            aria-label={COPY.open[locale]}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            lang={locale}
          />
        </span>
        <input type="hidden" name="from" value="nav_search" />
        <input ref={entryPath} type="hidden" name={ENTRY_PATH_PARAM} defaultValue="" />
        <button type="submit" className="nav-search-submit">
          {COPY.submit[locale]}
        </button>
        <button type="button" className="nav-search-close" aria-label={COPY.close[locale]} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="nav-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  )
}
