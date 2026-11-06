import Link from 'next/link'
import Article from '../_components/Article'
import { WISDOM_URL, pageMeta } from '../_lib/site'
import v10 from '@/content/gita/verses/6-10.json'
import v11 from '@/content/gita/verses/6-11.json'
import v12 from '@/content/gita/verses/6-12.json'
import v13 from '@/content/gita/verses/6-13.json'
import v17 from '@/content/gita/verses/6-17.json'
import v19 from '@/content/gita/verses/6-19.json'
import v25 from '@/content/gita/verses/6-25.json'
import v26 from '@/content/gita/verses/6-26.json'
import v35 from '@/content/gita/verses/6-35.json'

const PATH = '/gita'
const TITLE = 'How to meditate according to the Bhagavad Gita'
const DESC =
  'Chapter 6 of the Gita, Dhyāna Yoga, reads like a meditation manual. Nine verses take you from where to sit to what to do when the mind will not stay put.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

type V = { chapter: number | string; verse: number | string; sanskrit: string; englishTranslation: string }

const STEPS: { v: V; head: string; note: string }[] = [
  { v: v10, head: 'Sit alone, regularly', note: 'Krishna starts with logistics. Practice is daily and private, so find a time and a corner where nobody will pull you away.' },
  { v: v11, head: 'Make a steady seat', note: 'Not too high, not too low, firm and clean. Today that might be a cushion or a kitchen chair. The one real requirement is that it doesn’t wobble.' },
  { v: v12, head: 'Gather the mind on one point', note: 'Ekāgra means one-pointed. Pick a single object, the breath or a mantra, and keep coming back to that same one.' },
  { v: v13, head: 'Body, head and neck in one line', note: 'Upright and still, with the gaze soft and lowered. The Gita steadies the body first and trusts the mind to follow.' },
  { v: v17, head: 'Keep daily life balanced', note: 'Eat, sleep, work and rest in measure. Twenty minutes on a cushion can’t rescue a day with no room in it.' },
  { v: v19, head: 'The lamp in a windless place', note: 'The Gita’s picture of a settled mind is a flame that does not flicker. Read it as a glimpse of where practice leads. Nobody is grading you against it.' },
  { v: v25, head: 'Little by little', note: 'Śanaiḥ śanaiḥ, slowly, slowly. Stillness arrives by degrees, held in place by patient discernment. Forcing it pushes it away.' },
  { v: v26, head: 'Bring it back, every time', note: 'Wherever the restless mind wanders, bring it back. Every one of those returns counts as practice.' },
  { v: v35, head: 'Practice and letting go', note: 'Arjuna complains the mind is as hard to hold as the wind. Krishna agrees with him, then answers in two words: abhyāsa and vairāgya, steady practice and letting go.' },
]

export default function GitaPage() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      section="Gita"
      cover="dhyana"
      trackName="Dhyaan Gita Chapter 6"
      answer={
        <p>
          Chapter 6 keeps it simple. Sit regularly somewhere quiet on a steady seat, with body, head and neck upright and still. Gather your
          attention on one point, and whenever the mind wanders, bring it back gently. Live a balanced life around the practice. Over time the mind
          grows like a lamp in a windless place that does not flicker (6.19).
        </p>
      }
      related={[
        { href: '/nivata', label: 'Try it: be a lamp in a windless place for 60 seconds' },
        { href: '/learn/is-my-meditation-working', label: 'How to know if your meditation is working' },
        { href: `${WISDOM_URL}/gita/chapter/6`, label: 'Read all of chapter 6 on Wisdom' },
      ]}
    >
      <p>
        Most of the Bhagavad Gita is a conversation about duty, death and the self. Then chapter 6 arrives and Krishna starts talking about cushions.
      </p>
      <p>
        The chapter is called <i>Dhyāna Yoga</i>, the yoga of meditation, and it reads more like instructions than philosophy. Take verses 10 to 35 in order
        and you get a complete beginner&apos;s practice, from where to sit all the way to what to do when the whole thing feels impossible.
      </p>
      {STEPS.map(({ v, head, note }) => (
        <section key={v.verse}>
          <h2>
            {v.chapter}.{v.verse} · {head}
          </h2>
          <p className="dh-verse" lang="sa" style={{ fontSize: 19, lineHeight: 1.6 }}>{v.sanskrit}</p>
          <blockquote>{v.englishTranslation}</blockquote>
          <p>{note}</p>
          <p className="dh-small">
            <a href={`${WISDOM_URL}/gita/chapter/${v.chapter}/verse/${v.verse}`}>Read {v.chapter}.{v.verse} with Hindi meaning and commentary →</a>
          </p>
        </section>
      ))}
      <h2>Trying it tomorrow morning</h2>
      <p>
        Pick a time you can repeat, ideally the same each day, and a seat that doesn&apos;t wobble. Sit upright with your hands resting and your eyes closed or
        softly lowered.
      </p>
      <p>
        Rest your attention on the breath at the nostrils, or on a mantra repeated silently. When you notice you&apos;ve drifted, come back without scolding
        yourself. If you want to count something, count the returns.
      </p>
      <p>
        Start with ten minutes, four days a week, and let it grow the way verse 25 says, śanaiḥ śanaiḥ.
      </p>
      <p>
        <Link href="/">Dhyaan</Link> takes its name from this chapter and its lamp from 6.19. It reads the two things the Gita keeps returning to: how still
        you became, and how often you came back.
      </p>
      <p>
        If you want to know how dhyāna sits next to dhāraṇā and samādhi in the Yoga Sūtra, read <Link href="/learn/dhyana">Dhyana: the full guide</Link>.
        And if the breath feels too slippery, the chapter&apos;s cousins are waiting: <Link href="/learn/trataka">trāṭaka</Link>,{' '}
        <Link href="/learn/japa-meditation">japa</Link> and <Link href="/learn/dhyana-mudra">dhyāna mudrā</Link>.
      </p>
    </Article>
  )
}
