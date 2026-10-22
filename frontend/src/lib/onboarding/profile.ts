// The web onboarding's answers, labels and art. Copied from the Wisdom app
// (wisdom/app/constants/onboardingProfile.ts, onboardingGoals.ts, ageArt.ts,
// stageArt.ts, feelingArt.ts, verseCopy.ts on branch v3). Ids are the app's,
// so the backend reads web and app answers the same way. Keep in sync.

export type AgeId = 'u25' | '25_34' | '35_44' | '45_54' | '55p'
export type StageId = 'studying' | 'working' | 'own_thing' | 'raising_kids' | 'caring_parents' | 'between' | 'retired'
export type NeedId = 'quiet' | 'nerve' | 'replay' | 'stick' | 'faith' | 'gita'
export type Option<T extends string> = { id: T; label: string; line?: string }

export const AGES: Option<AgeId>[] = [
  { id: 'u25', label: 'Under 25' },
  { id: '25_34', label: '25–34' },
  { id: '35_44', label: '35–44' },
  { id: '45_54', label: '45–54' },
  { id: '55p', label: '55 or older' },
]

const STAGES: Option<StageId>[] = [
  { id: 'studying', label: 'Studying' },
  { id: 'working', label: 'Working' },
  { id: 'own_thing', label: 'Running my own thing' },
  { id: 'raising_kids', label: 'Raising kids' },
  { id: 'caring_parents', label: 'Caring for my parents' },
  { id: 'retired', label: 'Retired' },
]
const L = (id: StageId, label?: string): Option<StageId> => ({ id, label: label ?? STAGES.find((s) => s.id === id)!.label })
const STAGES_BY_AGE: Record<AgeId, Option<StageId>[]> = {
  u25: [L('studying'), L('working'), L('own_thing', 'Building my own thing'), L('caring_parents'), L('raising_kids')],
  '25_34': [L('working'), L('own_thing'), L('studying'), L('raising_kids'), L('caring_parents')],
  '35_44': [L('working'), L('own_thing'), L('raising_kids'), L('caring_parents'), L('studying'), L('retired')],
  '45_54': [L('working'), L('own_thing'), L('raising_kids'), L('caring_parents'), L('studying'), L('retired')],
  '55p': [L('retired'), L('working'), L('own_thing'), L('caring_parents'), L('raising_kids', 'Kids still at home')],
}
export const stagesFor = (age?: AgeId | null): Option<StageId>[] => (age ? STAGES_BY_AGE[age] : STAGES)

export const PHONE_HOURS = { min: 1, max: 12, fallback: 2 } as const

export const NEEDS: (Option<NeedId> & { line: string })[] = [
  { id: 'quiet', label: 'Restless', line: "My mind won't settle." },
  { id: 'nerve', label: 'Stuck', line: 'I keep going over something.' },
  { id: 'replay', label: 'Uneasy', line: "Something doesn't sit right." },
  { id: 'stick', label: 'Determined', line: "I'm ready to stick with it." },
  { id: 'faith', label: 'Searching', line: "I'm looking for something deeper." },
  { id: 'gita', label: 'Curious', line: 'I want to read the Gita.' },
]

const A = '/assets/onboarding'
export const AGE_ART: Record<AgeId, string[]> = {
  u25: [`${A}/age/age-u25-f.webp`, `${A}/age/age-u25-m.webp`],
  '25_34': [`${A}/age/age-25_34-f.webp`, `${A}/age/age-25_34-m.webp`],
  '35_44': [`${A}/age/age-35_44-f.webp`, `${A}/age/age-35_44-m.webp`],
  '45_54': [`${A}/age/age-45_54-f.webp`, `${A}/age/age-45_54-m.webp`],
  '55p': [`${A}/age/age-55p-f.webp`, `${A}/age/age-55p-m.webp`],
}
export const STAGE_ART: Partial<Record<StageId, string>> = {
  studying: `${A}/stage/stage-studying.webp`,
  working: `${A}/stage/stage-working.webp`,
  own_thing: `${A}/stage/stage-own_thing.webp`,
  raising_kids: `${A}/stage/stage-raising_kids.webp`,
  caring_parents: `${A}/stage/stage-caring_parents.webp`,
  retired: `${A}/stage/stage-retired.webp`,
}
export const FEELING_ART: Record<NeedId, string> = {
  quiet: `${A}/feelings/restless.webp`,
  nerve: `${A}/feelings/stuck.webp`,
  replay: `${A}/feelings/uneasy.webp`,
  stick: `${A}/feelings/determined.webp`,
  faith: `${A}/feelings/searching.webp`,
  gita: `${A}/feelings/curious.webp`,
}
export const LOGO = `${A}/logo.webp`
export const LOGO_2X = `${A}/logo-2x.webp`
export const LOGO_SPLASH = `${A}/logo-splash.webp`
export const SAND = [`${A}/sand/sand-clump-1.webp`, `${A}/sand/sand-clump-2.webp`, `${A}/sand/sand-clump-3.webp`]

// The verse reveal's headline: line 1 = life stage, line 2 (gold italic) = feeling.
const STAGE_ORDER: StageId[] = ['caring_parents', 'raising_kids', 'own_thing', 'studying', 'retired', 'working']
const STAGE_LINE: Partial<Record<StageId, string>> = {
  caring_parents: 'Caring for parents,',
  raising_kids: 'Raising kids,',
  own_thing: 'Building something,',
  studying: 'Studying hard,',
  retired: 'In a new season,',
  working: 'Working hard,',
}
const FEELING_LINE: Record<NeedId, string> = {
  quiet: 'and a restless mind',
  nerve: 'and stuck in a loop',
  replay: 'and quietly uneasy',
  stick: 'and ready to rise',
  faith: 'and searching deeper',
  gita: 'and drawn to the Gita',
}
export function verseHeadline(stages: StageId[] = [], need?: NeedId | null, usedNote = false) {
  const stage = STAGE_ORDER.find((s) => stages.includes(s))
  return {
    title: stage ? STAGE_LINE[stage]! : 'Right where you are,',
    accent: FEELING_LINE[need ?? 'quiet'],
    sub: usedNote ? 'We found a verse for exactly what you shared.' : 'We found a verse for exactly where you are.',
  }
}

// Homepage situations (?s=) → the app's feeling, so the feeling is preselected.
export const SITUATION_FEELING: Record<string, NeedId> = {
  overthinking: 'quiet', cant_sleep: 'quiet', anxious: 'quiet',
  didnt_work_out: 'nerve', everyone_ahead: 'nerve', might_lose_job: 'nerve', fraud: 'nerve', decision: 'nerve',
  boss: 'replay', partner: 'replay', in_laws: 'replay', guilt: 'replay', money_tight: 'replay', cant_say_no: 'replay', midlife: 'replay',
  someone_lost: 'faith', far_from_home: 'faith',
}
