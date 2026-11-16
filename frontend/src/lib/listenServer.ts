import fs from 'fs'
import path from 'path'
import { LISTEN_DATA_VERSION, type ListenLang, type ListenSessionData, type SessionIndexEntry } from './listen'

/** Server-only reads for Listen mode (build time). */

let _index: SessionIndexEntry[] | null = null
export function getListenSessions(): SessionIndexEntry[] {
  if (_index) return _index
  try {
    const p = path.join(process.cwd(), 'src/content/gita/listen/sessions.json')
    _index = (JSON.parse(fs.readFileSync(p, 'utf-8')) as { sessions: SessionIndexEntry[] }).sessions
  } catch {
    _index = []
  }
  return _index
}

export function getListenSession(chapter: number, n: number, lang: ListenLang): ListenSessionData | null {
  try {
    const p = path.join(process.cwd(), 'public/listen', LISTEN_DATA_VERSION, lang, `${chapter}-${n}.json`)
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as ListenSessionData
  } catch {
    return null
  }
}

/** The session a verse sits in, for the verse page's "Listen with meaning". */
export function listenSessionForVerse(chapter: number, verse: number, lang: ListenLang): { id: string; n: number; title: string; minutes: number } | null {
  const s = getListenSessions().find((x) => x.chapter === chapter && verse >= x.from && verse <= x.to)
  if (!s) return null
  return { id: s.id, n: s.n, title: s.title[lang], minutes: Math.max(1, Math.round(s.dur[lang] / 60)) }
}

export function listenSessionsForChapter(chapter: number): SessionIndexEntry[] {
  return getListenSessions().filter((s) => s.chapter === chapter)
}
