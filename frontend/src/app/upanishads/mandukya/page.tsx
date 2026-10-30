import type { ReactNode } from 'react'
import Shell, { Faq, GitaBridge, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import VerseBlock from '@/components/funnels/upanishads/VerseBlock'
import NetiNeti, { type NetiItem } from '@/components/funnels/upanishads/NetiNeti'
import { articleLd, faqLd, TEXTS, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'

const PATH = '/upanishads/mandukya'
const PAGE = 'upanishads-mandukya'
const TITLE = 'Mandukya Upanishad: Full Text in Sanskrit and English'
const DESC =
  'All 12 verses of the Mandukya Upanishad: Om, waking, dream, deep sleep and turiya, the fourth. Sanskrit, plain English, and Shankara’s reading.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH })

const NETI: NetiItem[] = [
  { sa: 'नान्तःप्रज्ञम्', iast: 'nāntaḥprajñam', en: 'not turned inward' },
  { sa: 'न बहिष्प्रज्ञम्', iast: 'na bahiṣprajñam', en: 'not turned outward' },
  { sa: 'नोभयतःप्रज्ञम्', iast: 'nobhayataḥprajñam', en: 'not both ways' },
  { sa: 'न प्रज्ञानघनम्', iast: 'na prajñānaghanam', en: 'not a mass of knowing' },
  { sa: 'न प्रज्ञम्', iast: 'na prajñam', en: 'not knowing' },
  { sa: 'नाप्रज्ञम्', iast: 'nāprajñam', en: 'not unknowing' },
  { sa: 'अदृष्टम्', iast: 'adṛṣṭam', en: 'unseen' },
  { sa: 'अव्यवहार्यम्', iast: 'avyavahāryam', en: 'not to be used' },
  { sa: 'अग्राह्यम्', iast: 'agrāhyam', en: 'not to be grasped' },
  { sa: 'अलक्षणम्', iast: 'alakṣaṇam', en: 'without marks' },
  { sa: 'अचिन्त्यम्', iast: 'acintyam', en: 'beyond thought' },
  { sa: 'अव्यपदेश्यम्', iast: 'avyapadeśyam', en: 'beyond naming' },
]
const REST: NetiItem = { sa: 'शान्तं शिवमद्वैतम्', iast: 'śāntaṃ śivam advaitam', en: 'peace, the good, one without a second' }

const NOTES: Record<string, ReactNode> = {
  '2': (
    <>
      Ayam atma brahma, &quot;this Self is Brahman&quot;, is one of the four{' '}
      <a href="/upanishads/mahavakyas" data-mp-location="mandukya_v2_mahavakyas">
        mahavakyas
      </a>
      .
    </>
  ),
  '3': 'Shankara lists the nineteen mouths as the five senses, the five organs of action, the five breaths, and mind, intellect, ego and memory. The seven limbs are the cosmic body described in the Chandogya (5.18.2).',
  '5': 'Prajna is the self in deep sleep: nothing is divided there, and it wakes up saying, "I slept well, I knew nothing."',
  '7': 'Turiya, "the fourth", is described only by taking away. Shankara: it is the same Self present through waking, dream and sleep, never a fourth place one travels to. Try setting the descriptions aside one at a time below.',
  '12': 'Gaudapada, the teacher of Shankara’s teacher, wrote verses on the Mandukya (the Karika), and Shankara commented on both together.',
}

const FAQ = [
  { q: 'How many verses are in the Mandukya Upanishad?', a: 'Twelve, which makes it the shortest of the principal Upanishads. It belongs to the Atharva Veda.' },
  { q: 'What is turiya?', a: '"The fourth": the Self described in verse 7, apart from waking, dream and deep sleep, and present through all three. The verse calls it peace, the good, one without a second.' },
  { q: 'What does the Mandukya say about Om?', a: 'Its three sounds, a, u and m, stand for waking, dream and deep sleep, and the silence after them stands for the fourth (verses 8 to 12).' },
]

export default function Page() {
  const t = TEXTS.mandukya
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'Mandukya Upanishad (Atharva Veda); Gaudapada’s Karika and Shankara’s commentary.', about: 'Mandukya Upanishad' }),
    faqLd(FAQ),
  ]
  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Mandukya', path: PATH },
      ]}
      jsonLd={jsonLd}
    >
      <header>
        <p className="fx-ref">Atharva Veda</p>
        <h1>The Mandukya Upanishad, all twelve verses</h1>
        <p id="quick-answer" className="fx-quick">
          The Mandukya Upanishad is twelve verses long, from the Atharva Veda. It says all of this is Om, that &quot;this Self is Brahman&quot; (verse
          2), and maps the Self through waking, dream and deep sleep to a fourth, turiya, which verse 7 describes by taking every description away.
        </p>
      </header>

      <section className="fx-part" aria-labelledby="text">
        <h2 id="text">The text</h2>
        {t.verses.map((v) => (
          <div key={v.ref}>
            <VerseBlock v={{ ...v, who: null }} label="Mandukya" note={NOTES[v.ref]} />
            {v.ref === '7' && (
              <div id="neti-neti" data-mp-section="neti">
                <h3>Neti, neti: not this, not this</h3>
                <p>Each tap sets one description aside. What is left is what the verse calls the fourth.</p>
                <NetiNeti items={NETI} rest={REST} page={PAGE} locale="en" />
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="fx-sec" aria-labelledby="gita">
        <h2 id="gita">The Mandukya and the Gita</h2>
        <GitaBridge c={8} v={13} note="Krishna on leaving the body while saying Om, the one syllable that is Brahman." />
        <GitaBridge c={2} v={69} note="what is night for all beings is where the steady one is awake." />
      </section>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="text-end" heading="One line each morning" />

      <section className="fx-sec" aria-labelledby="next-text">
        <h2 id="next-text">Read next</h2>
        <ul className="fx-links">
          <li>
            <a href="/upanishads/mahavakyas" data-mp-location="mandukya_next_mahavakyas">
              <strong>The four mahavakyas</strong>
              <span>Ayam atma brahma and the other three great sentences</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/katha" data-mp-location="mandukya_next_katha">
              <strong>The Katha Upanishad</strong>
              <span>The same Self, taught by Death to a boy</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/who-am-i" data-mp-location="mandukya_next_plan">
              <strong>Who am I: a 7-verse plan</strong>
              <span>Mandukya 2 is day 5</span>
            </a>
          </li>
        </ul>
      </section>

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>{SOURCES_NOTE_EN}</p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
