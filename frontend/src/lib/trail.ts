/**
 * Trails: the ordered list of Gita verses a reader came from.
 *
 * A reader who opens a verse from a list page (a quote hub, a blog, a topic or a feeling page)
 * keeps that list on the verse page, so "next" can mean the next verse of the list as well as
 * the next verse of the Gita. The list is read from the page itself at click time: every link to
 * a verse page, in document order. No page has to declare its list.
 *
 * Stored in sessionStorage (one tab, one visit). Expires after TRAIL_TTL_MS.
 */

import { verseUrl, type GitaLang } from './gitaUrls'

export type TrailRef = { ch: number; vs: number }

export type Trail = {
  /** The list page, e.g. "/blogs/karma-quotes-bhagavad-gita". */
  from: string
  /** Its H1, trimmed, shown on the bar. */
  label: string
  refs: TrailRef[]
  at: number
}

const KEY = 'wq_trail'
const TRAIL_TTL_MS = 2 * 60 * 60 * 1000
const MIN_REFS = 3
const MAX_REFS = 60
const LABEL_MAX = 64

const VERSE_PATH = /^\/(?:hi\/)?gita\/chapter\/(\d+)\/verse\/(\d+)\/?$/

/** Chapter and verse of a verse-page href (absolute or relative), else null. */
export function parseVerseHref(href: string | null | undefined): TrailRef | null {
  if (!href) return null
  let path = href
  try {
    path = new URL(href, 'https://wisdomquotes.in').pathname
  } catch {
    return null
  }
  const m = VERSE_PATH.exec(path)
  return m ? { ch: Number(m[1]), vs: Number(m[2]) } : null
}

export const isVersePath = (path: string): boolean => VERSE_PATH.test(path)

const same = (a: TrailRef, b: TrailRef) => a.ch === b.ch && a.vs === b.vs

/** Verse links on the page, in document order, de-duplicated. */
function collectRefs(root: ParentNode): TrailRef[] {
  const out: TrailRef[] = []
  root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
    if (a.closest('nav, header.site-nav, footer, [data-trail-ignore]')) return
    const r = parseVerseHref(a.getAttribute('href'))
    if (r && !out.some((x) => same(x, r))) out.push(r)
  })
  return out.slice(0, MAX_REFS)
}

function pageLabel(): string {
  const h1 = document.querySelector('main h1, h1')
  const raw = (h1?.textContent || document.title || '').replace(/\s+/g, ' ').trim()
  return raw.length > LABEL_MAX ? raw.slice(0, LABEL_MAX - 1).trimEnd() + '…' : raw
}

/**
 * Called on every click. Starts a trail when a verse link is clicked on a page that is not
 * itself a verse page and lists at least MIN_REFS verses. Clicks on verse pages leave the
 * current trail alone, so walking the list keeps it.
 */
export function captureTrail(link: HTMLAnchorElement): void {
  if (typeof window === 'undefined') return
  const target = parseVerseHref(link.getAttribute('href'))
  if (!target) return
  if (isVersePath(window.location.pathname)) return
  const root = document.querySelector('main') ?? document.body
  const refs = collectRefs(root)
  if (refs.length < MIN_REFS || !refs.some((r) => same(r, target))) return
  const trail: Trail = { from: window.location.pathname, label: pageLabel(), refs, at: Date.now() }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(trail))
  } catch {
    // storage full or blocked
  }
}

export function readTrail(): Trail | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const t = JSON.parse(raw) as Trail
    if (!t || !Array.isArray(t.refs) || Date.now() - t.at > TRAIL_TTL_MS) return null
    return t
  } catch {
    return null
  }
}

/** Where this verse sits in the trail, with its neighbours on the list. */
export function placeInTrail(t: Trail, here: TrailRef): { index: number; prev: TrailRef | null; next: TrailRef | null } | null {
  const i = t.refs.findIndex((r) => same(r, here))
  if (i === -1) return null
  return { index: i, prev: i > 0 ? t.refs[i - 1] : null, next: i < t.refs.length - 1 ? t.refs[i + 1] : null }
}

export const trailVerseUrl = (r: TrailRef, lang: GitaLang) => verseUrl(r.ch, r.vs, lang)
