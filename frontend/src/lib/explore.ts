/**
 * The map of the mind (/explore): data types, loaders and the helpers that turn a verse record into
 * VerseCard props. The data is static JSON written by scripts/build-explore-data.py into
 * src/content/explore (see the README there). Pure, so server pages and client components share it.
 */
import { normaliseDevanagari, sanskritPadas } from '@/lib/devanagari'
import { verseUrl } from '@/lib/gitaUrls'
import { toIast } from '@/lib/search/translit'
import type { VerseCardProps } from '@/components/site'

export type Prov = 'text' | 'ours'
export type Valence = 'afflictive' | 'healing' | 'seeking'

/** One verse as the pages show it. `sa` is the original (Sanskrit, Awadhi, Braj, or English for Vivekananda). */
export type VerseData = {
  id: string
  r: string
  sa: string
  lang: 'sa' | 'awa' | 'bra' | 'hi' | 'en'
  m?: string
  sp?: string
  /** Gita chapter.verse, when it is a Gita verse (links to its verse page). */
  g?: string
  /** The edge's caption, rewritten by Sarvam; absent when there is none to show. */
  why?: string
  p?: Prov
  /** For a practice: the healing state it grows. */
  to?: string
}

export type StateMini = { s: string; en: string; iast: string; slug: string; val: 'a' | 'h' | 's' }
export type ChainStep = { s?: string; c?: string; en?: string; iast?: string }
export type ChainData = { id: string; title: string; refs: string[]; kind?: string; steps: ChainStep[]; at: number; summary: string | null; verses: VerseData[] }
export type StoryData = { id: string; t: string; s: string; l: string; who: string; grp: string; roles?: [string, string][] }
export type AntidoteData = { s?: string; c?: string; en?: string; iast?: string; source: string; level?: string; p: Prov; why?: string; verses: string[] }

export type StateData = {
  id: string
  slug: string
  en: string
  iast: string
  deva: string
  modern: string
  val: Valence
  gloss: string | null
  loci: VerseData[]
  depicts: VerseData[]
  heals: VerseData[]
  practices: VerseData[]
  practice_toward: StateMini[]
  antidotes: AntidoteData[]
  chains: ChainData[]
  stories: StoryData[]
  feeds: StateMini[]
  leads: StateMini[]
  healed_by: StateMini[]
  heals_what: StateMini[]
  hero: VerseData | null
  counts: { verses: number; stories: number }
}

export type StateIndexItem = { id: string; slug: string; en: string; iast: string; deva: string; modern: string; val: Valence }

/** map.json: compact arrays so the client download stays small. */
export type MapState = [id: string, slug: string, en: string, iast: string, deva: string, val: 'a' | 'h' | 's', x: number, y: number]
export type MapNode = [id: string, kind: 0 | 1, group: number, x: number, y: number, ref: string, line: string]
export type MapData = {
  v: number
  groups: [id: string, label: string][]
  roles: Role[]
  states: MapState[]
  nodes: MapNode[]
  /** Flat triples: node index, state index, role index. */
  edges: number[]
  /** State to state: [from, to, kind] with kind 0 leads to (stated in a text), 1 rooted in, 2 heals. */
  links: [number, number, number][]
}

export type Role = 'depicts' | 'heals' | 'cultivates' | 'locus_of' | 'enacts_in' | 'enacts_turn'
export type VerseDetail = VerseData & {
  roles: [Role, string, string?, Prov?][]
  next?: string[]
  prev?: string[]
  answers?: string[]
  answered_by?: string[]
  scene?: { t: string; s: string }
}
export type StoryDetail = StoryData & { roles: [Role, string][] }
export type NodeDetail = VerseDetail | StoryDetail

export type ReflectData = {
  words: Record<string, { states: string[]; tone: 'heavy' | 'light' }>
  syn: Record<string, string[]>
  phrases: Record<string, string[]>
  states: Record<string, StateMini & { v: VerseData | null }>
}

export const EXPLORE_PATH = '/explore'
export const stateHref = (slug: string) => `${EXPLORE_PATH}/${slug}`

/** How a verse or story relates to a state, as a short label beside the state's name. */
export const ROLE_LABEL: Record<Role, string> = {
  depicts: 'Names it from inside',
  locus_of: 'Where the texts name it',
  heals: 'Eases',
  cultivates: 'Grows',
  enacts_in: 'Lived through',
  enacts_turn: 'Found their way to',
}

export const PROV_LABEL: Record<Prov, string> = { text: 'stated in the text', ours: 'our reading' }

export const isStory = (d: NodeDetail): d is StoryDetail => 't' in d && !('sa' in d)

/** VerseCard props for a verse record: padas of the original, their IAST, the meaning and its source link. */
export function verseCardProps(v: VerseData): Pick<VerseCardProps, 'original' | 'iast' | 'lang' | 'meaning' | 'source' | 'sourceHref' | 'label'> {
  if (v.lang === 'en') return { original: [v.sa], lang: 'en', source: v.r, label: undefined }
  const rows = sanskritPadas(normaliseDevanagari(v.sa))
  const mode = v.lang === 'sa' ? 'sa' : 'hi'
  const [c, n] = (v.g || '').split('.').map(Number)
  return {
    original: rows,
    iast: rows.map((r) => toIast(r, mode)),
    lang: v.lang,
    meaning: v.m,
    source: v.r,
    sourceHref: c && n ? verseUrl(c, n) : undefined,
    label: v.sp,
  }
}

/** The Gita verse page for a Gita verse record, else null. */
export function gitaHref(v: { g?: string }): string | null {
  const [c, n] = (v.g || '').split('.').map(Number)
  return c && n ? verseUrl(c, n) : null
}

export const loadMap = (): Promise<MapData> => import('@/content/explore/map.json').then((m) => m.default as unknown as MapData)
export const loadReflect = (): Promise<ReflectData> => import('@/content/explore/reflect.json').then((m) => m.default as unknown as ReflectData)
export const loadGroup = (group: string): Promise<Record<string, NodeDetail>> =>
  import(`@/content/explore/nodes/${group}.json`).then((m) => m.default as Record<string, NodeDetail>)
export const loadState = (id: string): Promise<StateData> => import(`@/content/explore/states/${id}.json`).then((m) => m.default as StateData)

/** Lowercase, no diacritics, no apostrophes: how search and the reflect box compare words. */
export const fold = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9ऀ-ॿ.]+/g, ' ')
    .trim()

/**
 * Words to states, by the feeling-word map and each state's synonyms. No network, no model:
 * a negated word ("not angry") is skipped. Returns at most three states, strongest first.
 */
export function matchFeeling(text: string, data: ReflectData): { states: string[]; words: number } {
  let norm = ` ${fold(text).replace(/\./g, ' ')} `
  const score = new Map<string, number>()
  const first = new Map<string, number>()
  const add = (st: string, w: number, pos: number) => {
    score.set(st, (score.get(st) ?? 0) + w)
    if (!first.has(st)) first.set(st, pos)
  }
  // phrases first ("not good enough", "took credit"), then their words are taken out so they do not count twice
  for (const [ph, sts] of Object.entries(data.phrases)) {
    const at = norm.indexOf(` ${ph} `)
    if (at < 0) continue
    sts.forEach((st) => add(st, 1.5, at))
    norm = norm.split(` ${ph} `).join('  ')
  }
  const tokens = norm.trim().split(/\s+/).filter(Boolean)
  const NEG = new Set(['not', 'no', 'never', 'dont', 'didnt', 'isnt', 'wasnt', 'arent', 'without'])
  const synIndex = new Map<string, string[]>()
  for (const [st, words] of Object.entries(data.syn)) for (const w of words) synIndex.set(w, [...(synIndex.get(w) ?? []), st])
  tokens.forEach((t, i) => {
    if (i > 0 && NEG.has(tokens[i - 1])) return
    const stem = t.length > 4 ? t.replace(/(ing|ed|ness|ly|s)$/, '') : t
    const word = data.words[t] ?? data.words[stem]
    if (word) word.states.forEach((st, k) => add(st, 1.6 - k * 0.3, 100 + i))
    for (const key of new Set([t, stem])) for (const st of synIndex.get(key) ?? []) add(st, 1, 100 + i)
  })
  const words = fold(text).split(/\s+/).filter(Boolean).length
  const states = Array.from(score.entries())
    .filter(([, s]) => s >= 1)
    .sort((a, b) => b[1] - a[1] || (first.get(a[0]) ?? 0) - (first.get(b[0]) ?? 0))
    .slice(0, 3)
    .map(([st]) => st)
  return { states, words }
}
