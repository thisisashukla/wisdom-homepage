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

/**
 * Tracking ids for the backend's plan_runs row (backend ai/run_log.py), from the browser's `client`
 * (lib/onboarding/trace.ts) plus what only this server knows: the signed-in uid and the visitor's country.
 * Never changes the answer.
 */
export type StartClient = {
  requestId?: string
  onboardingId?: string
  distinctId?: string
  context?: string
  emotion?: string
  emotionTrail?: string[]
  dev?: boolean
}
const ID_RE = /^[A-Za-z0-9:_.$-]{1,128}$/
const WORD_RE = /^[a-z_]{1,40}$/
const id = (v: unknown, max = 64) => (typeof v === 'string' && ID_RE.test(v) ? v.slice(0, max) : null)

export function clientBody(c: StartClient | undefined, req: Request, uid?: string | null) {
  const x = c ?? {}
  const country = (req.headers.get('x-vercel-ip-country') || '').trim().slice(0, 8) || null
  return {
    request_id: id(x.requestId),
    onboarding_id: id(x.onboardingId),
    distinct_id: id(x.distinctId, 128),
    user_id: uid ? uid.slice(0, 128) : null,
    platform: 'web' as const,
    app_version: null,
    context: typeof x.context === 'string' && WORD_RE.test(x.context) ? x.context : 'onboarding',
    emotion: typeof x.emotion === 'string' && WORD_RE.test(x.emotion) ? x.emotion : null,
    emotion_trail: Array.isArray(x.emotionTrail) ? x.emotionTrail.filter((w) => typeof w === 'string' && WORD_RE.test(w)).slice(-20) : [],
    note_withheld: null,
    country,
    dev: !!x.dev,
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

