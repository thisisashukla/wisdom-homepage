import type { ReactNode } from 'react'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, PageHero, Section } from '@/components/site'
import { Bridge, Bridges, SourcesNote, TextVerse, UpNext } from '@/components/funnels/upanishads/parts'
import { articleLd, padas, TEXTS, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'

const PATH = '/upanishads/isha'
const PAGE = 'upanishads-isha'
const TITLE = 'Isha (Ishavasya) Upanishad: All 18 Verses in Sanskrit and English'
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
  ]
  const v1 = isha.verses[0]
  return (
    <>
      <PageTracker pageName="Upanishads Text" />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[
          { label: 'Upanishads', href: '/upanishads' },
          { label: 'Isha', href: PATH },
        ]}
        eyebrow="Shukla Yajur Veda"
        title="The Isha Upanishad, all eighteen verses"
        sub="You can read all eighteen verses tonight, slowly, before you sleep."
        facts={['18 verses', 'The purnamadah invocation']}
        actions={[
          { href: '#v1', label: 'Read verse 1', location: 'isha_hero_v1' },
          { href: '#invocation', label: 'The invocation', location: 'isha_hero_invocation' },
        ]}
        verse={{ original: padas(v1.sa.split('\n')[0]), iast: padas(v1.iast.split('\n')[0]), meaning: v1.en.split('. ')[0] + '.', source: 'Isha Upanishad 1' }}
      />

      <Section id="answer" width="narrow" spacing="tight">
        <p id="quick-answer" className="sx-intro rv">
          The Isha Upanishad is eighteen verses long and is chapter 40 of the Shukla Yajur Veda Samhita. It opens with ishavasyam idam sarvam, &quot;all
          this is to be covered by the Lord&quot;, and is recited between two readings of the purnamadah invocation. Read it verse by verse,
          and lean on Shankara&apos;s reading where it gets hard.
        </p>
      </Section>

      <Section id="text" tone="band" width="narrow" title="The text" className="up-text">
        <nav aria-label="Verses" className="rv">
          <ul className="up-jump">
            {isha.verses.map((v) => (
              <li key={v.ref}>
                <a className="sx-chip" href={`#${v.anchor}`} aria-label={`Go to verse ${v.ref}`}>
                  {v.ref}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="up-verses">
          <TextVerse v={{ ref: 'Invocation', anchor: 'invocation', sa: inv.sa, iast: inv.iast, en: inv.en, who: null }} label="Isha" note={<a href="/upanishads/purnamadah-purnamidam">More on purnamadah</a>} />
          {isha.verses.map((v) => (
            <TextVerse key={v.ref} v={{ ...v, who: null }} label="Isha" note={NOTES[v.ref]} />
          ))}
        </div>
      </Section>

      <Section id="gita" width="narrow" title="The Isha and the Gita">
        <Bridges>
          <Bridge c={5} v={10} note="act and offer the work, untouched like a lotus leaf by water; compare verses 1 and 2." />
          <Bridge c={6} v={29} note="the one who sees the Self in all beings and all beings in the Self; compare verse 6." />
          <Bridge c={3} v={8} note="do your work; compare verse 2." />
        </Bridges>
      </Section>

      <UpNext locale="en" pageKey={PAGE} placement="text-end" heading="One line each morning" />

      <Section id="next-text" title="Read next">
        <LinkCards
          columns={3}
          items={[
            { href: '/upanishads/katha', title: 'The Katha Upanishad', body: <>A boy at Death&apos;s door, as a conversation</>, location: 'isha_next_katha' },
            { href: '/upanishads/mandukya', title: 'The Mandukya Upanishad', body: 'Twelve verses on Om and the four states', location: 'isha_next_mandukya' },
            { href: '/upanishads/who-am-i', title: 'Who am I: a 7-verse plan', body: 'Isha 6 is day 4', location: 'isha_next_plan' },
          ]}
        />
      </Section>

      <Section id="faq" tone="band" width="narrow" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} Verse 12 in the corpus repeated verse 9 by mistake; it is restored here from the edition (असम्भूतिम्, सम्भूत्याम्).
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </>
  )
}
