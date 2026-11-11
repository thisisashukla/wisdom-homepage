'use client'

import { useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { EVENTS, trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import {
  INDEX_URL,
  itemHref,
  parseRef,
  prepareIndex,
  queryScript,
  search,
  type PreparedIndex,
  type SearchIndex,
  type SearchItem,
} from '@/lib/search/match'
import { toIast } from '@/lib/search/translit'
import type { Locale } from '@/lib/locale'
import { SearchIcon } from './VerseJump'
import './search.css'

export type VerseSearchProps = {
  lang: Locale
  /** Analytics location of search events. A ?from= in the URL (set by VerseJump) wins. */
  location?: string
}

const COPY = {
  en: {
    label: 'Search the verses',
    placeholder: 'A verse number, a line you remember, or a word',
    clear: 'Clear',
    loading: 'Opening the verses...',
    failed: 'The verses did not load. Check your connection and try again.',
    retry: 'Try again',
    found: (n: number) => (n === 1 ? '1 verse' : `${n} verses`),
    none: 'Nothing matched yet. Try fewer words, another spelling, or a verse number like 2.47.',
    tryTitle: 'Try one of these',
    tryNote: 'Or type a verse number, like 2.47 or chapter 12.',
    chapter: (n: number) => `Open chapter ${n}`,
    open: 'Open verse',
  },
  hi: {
    label: 'श्लोक खोजें',
    placeholder: 'श्लोक संख्या, याद रही पंक्ति, या कोई शब्द',
    clear: 'मिटाएँ',
    loading: 'श्लोक खुल रहे हैं...',
    failed: 'श्लोक लोड नहीं हुए। इंटरनेट देखकर फिर से कोशिश करें।',
    retry: 'फिर कोशिश करें',
    found: (n: number) => `${n} श्लोक मिले`,
    none: 'अभी कुछ नहीं मिला। कम शब्द, दूसरी वर्तनी, या 2.47 जैसी श्लोक संख्या लिखकर देखें।',
    tryTitle: 'इनमें से कोई खोजें',
    tryNote: 'या श्लोक संख्या लिखें, जैसे 2.47 या अध्याय 12।',
    chapter: (n: number) => `अध्याय ${n} खोलें`,
    open: 'श्लोक खोलें',
  },
} as const

/** Three famous lines for the empty state, one from each of three texts. */
const SUGGEST: Record<Locale, string[]> = {
  en: ['karmanye vadhikaraste', 'yada yada hi dharmasya', 'prabisi nagar kije'],
  hi: ['कर्मण्येवाधिकारस्ते', 'यदा यदा हि धर्मस्य', 'पोथी पढ़-पढ़ जग मुआ'],
}

/** Sanskrit sources keep every a in IAST; Awadhi and Kabir drop the last one, as they are sung. */
const MODE: Record<SearchItem['k'], 'sa' | 'hi'> = { bg: 'sa', ag: 'sa', up: 'sa', hc: 'hi', rs: 'hi', kb: 'hi' }
const LINE_LANG: Record<SearchItem['k'], string> = { bg: 'sa', ag: 'sa', up: 'sa', hc: 'awa', rs: 'awa', kb: 'hi' }
/** item_type for analytics, by source. */
const ITEM_TYPE: Record<SearchItem['k'], string> = { bg: 'verse', ag: 'verse', up: 'line', hc: 'line', rs: 'chaupai', kb: 'doha' }

// One fetch per page load, shared by every instance.
let indexPromise: Promise<PreparedIndex> | null = null
function loadIndex(): Promise<PreparedIndex> {
  if (!indexPromise) {
    indexPromise = fetch(INDEX_URL)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<SearchIndex>
      })
      .then(prepareIndex)
      .catch((err) => {
        indexPromise = null
        throw err
      })
  }
  return indexPromise
}

export default function VerseSearch({ lang, location: locationProp = 'search_page' }: VerseSearchProps) {
  const c = COPY[lang]
  const [location, setLocation] = useState(locationProp)
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<PreparedIndex | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const deferred = useDeferredValue(query)
  const lastTracked = useRef('')

  const ensureIndex = useCallback(() => {
    if (index || state === 'loading') return
    setState('loading')
    loadIndex()
      .then((ix) => {
        setIndex(ix)
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [index, state])

  // ?q= in the URL: fill the box and load straight away.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const from = params.get('from')
    if (from) setLocation(from.slice(0, 64))
    const q = params.get('q')
    if (q) {
      setQuery(q)
      ensureIndex()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const result = useMemo(() => (index ? search(index, deferred) : null), [index, deferred])
  const trimmed = deferred.trim()

  // Keep ?q= in step with the box, without adding history entries.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const url = new URL(window.location.href)
      if (trimmed) url.searchParams.set('q', trimmed)
      else url.searchParams.delete('q')
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url.href)
    }, 350)
    return () => window.clearTimeout(t)
  }, [trimmed])

  const trackSearch = useCallback(
    (q: string, results: number) => {
      if (!q || q === lastTracked.current) return
      lastTracked.current = q
      trackEvent(EVENTS.SearchCompleted, { query: q, results, script: queryScript(q), location })
    },
    [location],
  )

  // Search Completed once the reader pauses on a query.
  useEffect(() => {
    if (!result || !trimmed) return
    const t = window.setTimeout(() => trackSearch(trimmed, result.hits.length), 1200)
    return () => window.clearTimeout(t)
  }, [result, trimmed, trackSearch])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      inputRef.current?.focus()
      return
    }
    // A verse number goes straight to the verse, even before the index has loaded.
    const ref = parseRef(q)
    if (ref?.valid && ref.verse !== undefined) {
      trackEventBeacon(EVENTS.VerseJumpCompleted, { query: q, result: 'verse', item_id: ref.id, location })
      window.location.assign(lang === 'hi' ? ref.hiUrl : ref.url)
      return
    }
    if (!index) {
      ensureIndex()
      return
    }
    trackSearch(q, search(index, q).hits.length)
  }

  const pick = (q: string, position: number) => {
    trackEvent(EVENTS.SearchResultClicked, { query: q, item_type: 'suggestion', position, location: 'suggestion' })
    setQuery(q)
    ensureIndex()
    inputRef.current?.focus()
  }

  const onResultClick = (item: SearchItem, position: number) => {
    trackSearch(trimmed, result?.hits.length ?? 0)
    trackEventBeacon(EVENTS.SearchResultClicked, {
      query: trimmed,
      item_id: item.id,
      item_type: ITEM_TYPE[item.k],
      position,
      location: 'results',
    })
  }

  const hits = result?.hits ?? []
  const ref = result?.ref ?? null

  let status = ''
  if (state === 'loading' && trimmed) status = c.loading
  else if (state === 'error') status = c.failed
  else if (result && trimmed) status = hits.length ? c.found(hits.length) : ref?.message?.[lang] ?? c.none

  return (
    <div className="vs" lang={lang}>
      <form role="search" action={lang === 'hi' ? '/hi/search' : '/search'} method="get" onSubmit={onSubmit}>
        <label htmlFor={id} className="vs-visually-hidden">
          {c.label}
        </label>
        <div className="vs-field">
          <SearchIcon />
          <input
            ref={inputRef}
            id={id}
            name="q"
            type="search"
            className="vs-input"
            placeholder={c.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={ensureIndex}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            aria-controls={`${id}-results`}
          />
          {query && (
            <button
              type="button"
              className="vs-clear"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
            >
              {c.clear}
            </button>
          )}
        </div>
      </form>

      <p className="vs-status" aria-live="polite">
        {status}
        {state === 'error' && (
          <>
            {' '}
            <button type="button" className="vs-retry" onClick={ensureIndex}>
              {c.retry}
            </button>
          </>
        )}
      </p>

      {ref?.valid && ref.verse === undefined && (
        <p className="vs-chapter">
          <a href={lang === 'hi' ? ref.hiUrl : ref.url} className="sx-btn sx-btn--link" data-mp-location={`${location}_chapter`}>
            {c.chapter(ref.chapter)}
          </a>
        </p>
      )}

      {hits.length > 0 && (
        <ol className="vs-results" id={`${id}-results`}>
          {hits.map((h, i) => {
            const it = h.item
            const snippet = lang === 'hi' ? it.h ?? it.e : it.e ?? it.h
            const snippetLang = lang === 'hi' ? (it.h ? 'hi' : 'en') : it.e ? 'en' : 'hi'
            return (
              <li key={it.id}>
                <a
                  href={itemHref(it, lang)}
                  className="vs-hit"
                  data-mp-tracked=""
                  onClick={() => onResultClick(it, i + 1)}
                >
                  <span className="vs-ref">{lang === 'hi' ? it.rh : it.r}</span>
                  <span className={`vs-line vs-line--${LINE_LANG[it.k]}`} lang={LINE_LANG[it.k]}>
                    <span className="sx-deva">{it.s}</span>
                    <span className="sx-iast" lang="sa-Latn">
                      {toIast(it.s, MODE[it.k])}
                    </span>
                  </span>
                  {snippet && (
                    <span className="vs-snip" lang={snippetLang}>
                      {snippet}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ol>
      )}

      {!trimmed && (
        <div className="vs-empty">
          <p className="vs-empty-title">{c.tryTitle}</p>
          <ul className="vs-suggest">
            {SUGGEST[lang].map((s, i) => (
              <li key={s}>
                <button type="button" className="sx-chip vs-chip" onClick={() => pick(s, i + 1)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
          <p className="vs-empty-note">{c.tryNote}</p>
        </div>
      )}
    </div>
  )
}
