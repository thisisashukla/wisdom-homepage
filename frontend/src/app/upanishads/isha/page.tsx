import type { ReactNode } from 'react'
import Shell, { Faq, GitaBridge, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import VerseBlock from '@/components/funnels/upanishads/VerseBlock'
import { articleLd, faqLd, TEXTS, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'

const PATH = '/upanishads/isha'
const PAGE = 'upanishads-isha'
const TITLE = 'Isha Upanishad: Full Text in Sanskrit and English'
const DESC =
  'All 18 verses of the Isha Upanishad with the purnamadah invocation: Sanskrit (Devanagari or IAST), plain English, and Shankara’s reading of hard verses.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, ogCard: 'up-ishavasyam-idam-sarvam' })

const NOTES: Record<string, ReactNode> = {
  '1': (
    <>
      Shankara: &quot;cover&quot; means seeing every moving thing as the Lord, the Self. Give up the three cravings, for children, wealth and higher
      worlds, and sustain yourself by that letting go.{' '}
      <a href="/upanishads/ishavasyam-idam-sarvam" data-mp-location="isha_v1_line">
        More on this verse
      </a>
      .
    </>
  ),
  '2': 'Shankara: this verse is for the person who cannot yet take up the renunciation of verse 1 and wants to live out a full life. For them the way is the work the Vedas prescribe; done that way, it does not bind.',
  '3': 'Shankara reads "those who kill the Self" as those who ignore it. Not knowing the Self hides it, as if it were dead.',
  '6': 'Shankara: the one who sees this way feels no aversion to anyone, since nothing is seen as other than the Self.',
  '9': 'Verses 9 to 11 are the hardest in the Isha. Shankara reads avidya here as ritual action and vidya as meditation on the gods, and holds that knowledge of the Self cannot be combined with ritual. Done together, ritual carries one past ordinary death and meditation brings the deathless state of the gods. Some popular Hindi readings take vidya here as Self-knowledge joined with karma; Shankara argues against that.',
  '12': 'Verses 12 to 14 repeat the pattern. Shankara reads the unmanifest as prakriti, the unmanifest cause of the world, and the manifest as Hiranyagarbha, the first born; worship of the two together brings what each can give.',
  '15': 'Verses 15 to 18 are prayers at the hour of death. The golden lid is the bright disc of the sun hiding the person within it.',
  '16': 'Shankara takes "I am he" as the worshipper’s own identity with the person in the sun.',
  '18': 'नमौक्तिं, as the editions print it, is read nama uktim: words of homage.',
}

const FAQ = [
  { q: 'How many verses are in the Isha Upanishad?', a: 'Eighteen, with the purnamadah invocation recited before and after them.' },
  {
    q: 'Which Veda does the Isha Upanishad belong to?',
    a: 'The Shukla Yajur Veda. It is chapter 40 of the Vajasaneyi Samhita, which makes it the only principal Upanishad that sits inside a Samhita.',
  },
  {
    q: 'Why is it called Isha or Ishavasya?',
    a: 'From its first words, ईशा वास्यम्, "to be covered by the Lord". Both names are used.',
  },
]

export default function Page() {
  const isha = TEXTS.isha
  const inv = isha.invocation!
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'Isha Upanishad (Shukla Yajur Veda, Vajasaneyi Samhita 40); Shankara’s commentary.', about: 'Isha Upanishad' }),
    faqLd(FAQ),
  ]
  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Isha', path: PATH },
      ]}
      jsonLd={jsonLd}
    >
      <header>
        <p className="fx-ref">Shukla Yajur Veda</p>
        <h1>The Isha Upanishad, all eighteen verses</h1>
        <p className="fx-lede" style={{ marginTop: 14 }}>
          Start with eighteen verses. Finish them tonight.
        </p>
        <p id="quick-answer" className="fx-quick">
          The Isha Upanishad is eighteen verses long and is chapter 40 of the Shukla Yajur Veda Samhita. It opens with ishavasyam idam sarvam, &quot;all
          this is to be covered by the Lord&quot;, and is recited between two readings of the purnamadah invocation. Below is the whole text, verse by
          verse, with Shankara&apos;s reading of the hard ones.
        </p>
      </header>

      <nav className="fx-sec" aria-label="Verses" style={{ marginTop: 28 }}>
        <p className="fx-ref">
          Go to a verse:{' '}
          {isha.verses.map((v) => (
            <a key={v.ref} href={`#${v.anchor}`} style={{ display: 'inline-block', minWidth: 32, padding: '6px 4px' }}>
              {v.ref}
            </a>
          ))}
        </p>
      </nav>

      <section className="fx-part" aria-labelledby="text">
        <h2 id="text">The text</h2>
        <VerseBlock v={{ ref: 'Invocation', anchor: 'invocation', sa: inv.sa, iast: inv.iast, en: inv.en, who: null }} label="Isha" note={<a href="/upanishads/purnamadah-purnamidam">More on purnamadah</a>} />
        {isha.verses.map((v) => (
          <VerseBlock key={v.ref} v={{ ...v, who: null }} label="Isha" note={NOTES[v.ref]} />
        ))}
      </section>

      <section className="fx-sec" aria-labelledby="gita">
        <h2 id="gita">The Isha and the Gita</h2>
        <GitaBridge c={5} v={10} note="act and offer the work, untouched like a lotus leaf by water; compare verses 1 and 2." />
        <GitaBridge c={6} v={29} note="the one who sees the Self in all beings and all beings in the Self; compare verse 6." />
        <GitaBridge c={3} v={8} note="do your work; compare verse 2." />
      </section>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="text-end" heading="One line each morning" />

      <section className="fx-sec" aria-labelledby="next-text">
        <h2 id="next-text">Read next</h2>
        <ul className="fx-links">
          <li>
            <a href="/upanishads/katha" data-mp-location="isha_next_katha">
              <strong>The Katha Upanishad</strong>
              <span>A boy at Death&apos;s door, as a conversation</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/mandukya" data-mp-location="isha_next_mandukya">
              <strong>The Mandukya Upanishad</strong>
              <span>Twelve verses on Om and the four states</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/who-am-i" data-mp-location="isha_next_plan">
              <strong>Who am I: a 7-verse plan</strong>
              <span>Isha 6 is day 4</span>
            </a>
          </li>
        </ul>
      </section>

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} Verse 12 in the corpus repeated verse 9 by mistake; it is restored here from the edition (असम्भूतिम्, सम्भूत्याम्).
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
