/**
 * The Katha Upanishad as a conversation, for "Sit closer".
 * Every one of the 119 verses belongs to exactly one exchange (checked by
 * scripts/funnels/upanishads/check.py). `ask` is the student's side (or the
 * scene), `answer` is the teacher's. Where the text has no new question, `cue`
 * is a short editorial line in Wisdom's words, shown as such, never as a verse.
 */
export type Exchange = {
  id: string
  title: string
  ask: string[]
  answer: string[]
  cue?: string
}

const range = (prefix: string, a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => `${prefix}.${a + i}`)

export const KATHA_EXCHANGES: Exchange[] = [
  { id: 'door', title: 'Three nights at Death’s door', ask: range('1.1', 1, 8), answer: ['1.1.9'] },
  { id: 'first-wish', title: 'The first wish', ask: ['1.1.10'], answer: ['1.1.11'] },
  { id: 'second-wish', title: 'The second wish', ask: ['1.1.12', '1.1.13'], answer: range('1.1', 14, 19) },
  { id: 'third-wish', title: 'The third wish', ask: ['1.1.20'], answer: ['1.1.21'] },
  { id: 'no-other', title: 'Only the third wish', ask: ['1.1.22'], answer: range('1.1', 23, 25) },
  { id: 'keep-your-horses', title: 'Keep your horses', ask: range('1.1', 26, 29), answer: range('1.2', 1, 13) },
  { id: 'beyond', title: 'What lies beyond', ask: ['1.2.14'], answer: range('1.2', 15, 25) },
  {
    id: 'chariot',
    title: 'The chariot',
    cue: 'Nachiketa listens. Yama gives him an image he can hold.',
    ask: [],
    answer: range('1.3', 1, 17),
  },
  {
    id: 'outward',
    title: 'The senses face outward',
    cue: 'The second part begins. Yama turns to why the Self is missed.',
    ask: [],
    answer: range('2.1', 1, 15),
  },
  {
    id: 'city',
    title: 'The city with eleven gates',
    cue: 'Yama speaks of the body as a city and of what lives in it.',
    ask: [],
    answer: range('2.2', 1, 15),
  },
  {
    id: 'tree',
    title: 'The tree with its roots above',
    cue: 'The last teaching, and what became of Nachiketa.',
    ask: [],
    answer: range('2.3', 1, 18),
  },
]
