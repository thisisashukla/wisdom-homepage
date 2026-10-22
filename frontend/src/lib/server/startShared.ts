/**
 * Shared by /api/start/*: the onboarding answers as the backend reads them
 * (the same body the Wisdom app sends, see wisdom/app/services/VersePlanApi.ts).
 */
const NEEDS = ['quiet', 'nerve', 'replay', 'stick', 'faith', 'gita']
const AGES = ['u25', '25_34', '35_44', '45_54', '55p']
const STAGES = ['studying', 'working', 'own_thing', 'raising_kids', 'caring_parents', 'between', 'retired']
const CHIP_RE = /^[a-z_]{1,40}$/

export type StartProfile = {
  feeling?: string
  age?: string | null
  stages?: string[]
  phoneHours?: number | null
  topic?: string | null
  follow?: string | null
}

export function profileBody(p: StartProfile | undefined) {
  const x = p ?? {}
  const hours = Number(x.phoneHours)
  return {
    feeling: NEEDS.includes(String(x.feeling)) ? x.feeling : 'quiet',
    age: AGES.includes(String(x.age)) ? x.age : null,
    stages: Array.isArray(x.stages) ? x.stages.filter((s) => STAGES.includes(s)).slice(0, 6) : [],
    phone_hours: Number.isFinite(hours) && hours >= 1 && hours <= 12 ? Math.round(hours) : null,
    topic: x.topic && CHIP_RE.test(x.topic) ? x.topic : null,
    follow: x.follow && CHIP_RE.test(x.follow) ? x.follow : null,
    exclude: [] as string[],
    journey: null,
  }
}

/** Some sources fuse the speaker label onto the first word ("अर्जुन उवाचयोऽयं"): drop it for display. */
export function cleanSanskrit(s?: string | null): string | null {
  if (!s) return null
  return s.replace(/^\s*(श्री\s*भगवानुवाच|[ऀ-ॿ]+\s+उवाच)\s*/, '').trim() || null
}

export type BackendVerse = {
  id: string
  ref: string
  ref_iast?: string | null
  sanskrit?: string | null
  line: string
  translation?: string | null
  meaning?: string | null
  for_you?: string | null
  why?: string | null
  setting?: string | null
  prasang?: { lesson?: string | null } | null
}
export type BackendStory = {
  id: string
  title?: string | null
  hook_title?: string | null
  teaser?: string | null
  story_hook?: string | null
  summary?: string | null
  lesson?: string | null
  for_you?: string | null
  anchor?: { ref?: string; ref_iast?: string | null } | null
}

export const refOf = (v?: { ref?: string; ref_iast?: string | null } | null) => (v ? v.ref_iast || v.ref || null : null)

export type FullDay = {
  day: number
  beat: string
  phase: string
  ref: string | null
  sanskrit: string | null
  line: string | null
  meaning: string | null
  forYou: string | null
  story: { title: string | null; summary: string | null; lesson: string | null } | null
}

