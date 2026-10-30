import type { Metadata } from 'next'
import Shell from '@/components/funnels/mahabharata/Shell'
import LineCard from '@/components/funnels/mahabharata/LineCard'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import { line } from '@/lib/funnels/mahabharata/lines'
import data from '@/content/funnels/mahabharata/lines.json'
import { PATHS, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-vidura-niti'
const PATH = PATHS.vidura
const CARD = 'mbh-5-37-15'
const TITLE = 'Vidura Niti: Sanskrit Verses With Meaning'
const DESC =
  "Vidura's counsel to Dhritarashtra (MBh 5.33 to 5.40) in Sanskrit with plain English: seven verses on anger, and his lines on speech, the self and dharma."

export const metadata: Metadata = meta({ title: TITLE, description: DESC, path: PATH, cardId: CARD })

const ANGER = ['mbh.5.33.73', 'mbh.5.34.67', 'mbh.5.36.5', 'mbh.5.36.68', 'mbh.5.37.51', 'mbh.5.39.43', 'mbh.5.39.73']
const GROUPS: { id: string; h: string; lede: string; ids: string[]; gita?: { c: number; v: number; why: string } }[] = [
  { id: 'speech', h: 'On speech', lede: 'What to say, and when to keep quiet.', ids: ['mbh.5.37.15', 'mbh.5.34.79', 'mbh.5.36.12'] },
  {
    id: 'self',
    h: 'On the self',
    lede: 'Where the trouble starts, and the boat across it.',
    ids: ['mbh.5.34.65', 'mbh.5.33.85', 'mbh.5.36.13', 'mbh.5.40.22'],
    gita: { c: 6, v: 5, why: 'The self alone is its own friend and its own enemy: Vidura\'s second half is Krishna\'s.' },
  },
  {
    id: 'dharma',
    h: 'On dharma',
    lede: 'The counsel ends where it began: do what is right, and do it now.',
    ids: ['mbh.5.40.12', 'mbh.5.40.13', 'mbh.5.35.70', 'mbh.5.39.72', 'mbh.5.33.56'],
    gita: { c: 2, v: 14, why: 'Pleasure and pain come and go, Krishna says; bear them. Vidura: dharma lasts, pleasure and pain do not.' },
  },
  { id: 'answer', h: 'What the king answered', lede: 'Vidura asks for one thing all night. Dhritarashtra agrees with every word, and does not do it.', ids: ['mbh.5.33.130', 'mbh.5.39.5', 'mbh.5.39.9'] },
]

const FAQ = [
  { q: 'What is Vidura Niti?', a: 'The counsel Vidura gives King Dhritarashtra through a sleepless night, eight chapters of the Udyoga Parva (MBh 5.33 to 5.40). It covers speech, anger, friendship, wealth and kingship, and keeps returning to one request: give the Pandavas their share.' },
  { q: 'How many verses are in Vidura Niti?', a: 'About six hundred in the Sanskrit we hold, across eight chapters. Editions differ by a few dozen verses.' },
  { q: 'What does Vidura say about anger?', a: 'That it is a gate to ruin with desire and greed (MBh 5.33.73), that the good drink it down like bitter medicine (MBh 5.36.68), and that anger is won over with calm (MBh 5.39.73).' },
  { q: 'Is Vidura Niti the same as Chanakya Niti?', a: 'No. Vidura Niti is part of the Mahabharata, spoken by Vidura to one king about one decision. Chanakya Niti is a separate collection of sayings attributed to Chanakya.' },
  { q: 'Why did Dhritarashtra ignore Vidura?', a: 'He tells Vidura he cannot give up his son, even while agreeing that where dharma is, there is victory (MBh 5.39.9).' },
]

export default function Page() {
  const screened = (data.excluded as { id: string; exclude: { reason: string } }[]).filter((x) => x.id.startsWith('mbh.5.'))
  const ld = graph(
    articleLd({ headline: 'Vidura Niti, in Sanskrit with meaning', description: DESC, path: PATH, image: ogImage(CARD), about: 'Vidura Niti' }),
    {
      '@type': 'ItemList',
      name: 'Seven verses on anger from Vidura Niti',
      itemListElement: ANGER.map((id, i) => ({ '@type': 'ListItem', position: i + 1, name: line(id).ref, url: `https://wisdomquotes.in${PATH}#mbh-${id.slice(4).replace(/\./g, '-')}` })),
    },
    faqLd(FAQ),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATHS.hub },
      { name: 'Vidura Niti', path: PATH },
    ]),
  )
  return (
    <Shell page={PAGE} crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata', href: PATHS.hub }, { label: 'Vidura Niti' }]} jsonLd={ld}>
      <header className="mb-head">
        <p className="mb-kicker">Udyoga Parva, the night before the message</p>
        <h1>Vidura Niti</h1>
        <p id="quick-answer">
          Vidura Niti is the counsel Vidura gives the sleepless King Dhritarashtra in eight chapters of the Udyoga Parva (MBh 5.33 to 5.40).
          Its best-known line: people who say pleasant things are easy to find, but rare is the one who says the hard, helpful thing, and rare the
          one who listens (MBh 5.37.15).
        </p>
        <p className="mb-sub">
          Sanjaya has come back from the Pandavas and will deliver their message in the hall tomorrow. The king cannot sleep, and sends for his
          half-brother. <a href={PATHS.character('vidura')}>Who Vidura was</a>.
        </p>
      </header>

      <section className="mb-sec" id="anger" aria-labelledby="anger-h" data-mp-section="vidura_anger">
        <h2 id="anger-h">Seven verses on anger</h2>
        <p className="mb-lede">From the gate anger opens to the ways it is won over.</p>
        {ANGER.map((id) => (
          <LineCard key={id} line={line(id)} page={PAGE} path={PATH} />
        ))}
        <ul className="mb-bridge">
          <li>
            <GitaLink href="/gita/chapter/16/verse/21" from="vidura_anger" toRef="16.21" page={PAGE} locale="en">
              Gita 16.21
            </GitaLink>
            <p>The first verse above appears again in the Gita, word for word, in Krishna&apos;s mouth.</p>
          </li>
          <li>
            <GitaLink href="/gita/chapter/2/verse/63" from="vidura_anger" toRef="2.63" page={PAGE} locale="en">
              Gita 2.63
            </GitaLink>
            <p>From anger comes confusion, and from confusion a lost memory. The Gita traces where anger leads.</p>
          </li>
        </ul>
      </section>

      {GROUPS.map((g) => (
        <section className="mb-sec" key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} data-mp-section={`vidura_${g.id}`}>
          <h2 id={`${g.id}-h`}>{g.h}</h2>
          <p className="mb-lede">{g.lede}</p>
          {g.ids.map((id) => (
            <LineCard key={id} line={line(id)} page={PAGE} path={PATH} />
          ))}
          {g.gita && (
            <ul className="mb-bridge">
              <li>
                <GitaLink href={`/gita/chapter/${g.gita.c}/verse/${g.gita.v}`} from={`vidura_${g.id}`} toRef={`${g.gita.c}.${g.gita.v}`} page={PAGE} locale="en">
                  Gita {g.gita.c}.{g.gita.v}
                </GitaLink>
                <p>{g.gita.why}</p>
              </li>
            </ul>
          )}
        </section>
      ))}

      <Faq items={FAQ} heading="Questions people ask" />
      <NextBlock page={PAGE} />

      <section className="mb-sec mb-method" aria-labelledby="method-h">
        <h2 id="method-h">Sources and method</h2>
        <p>
          Sanskrit from a southern-recension text of the Udyoga Parva, chapters 33 to 40. Where the digital text had obvious typing errors we
          restored the standard reading and kept a record. The English is Wisdom&apos;s own, read with Nilakantha&apos;s commentary, with K. M.
          Ganguli&apos;s public-domain translation consulted.
        </p>
        <p id="left-out" className="mb-screened">
          Lines we leave out. Some verses in these chapters demean or confine women. The epic&apos;s own women answer them: Draupadi&apos;s question
          of law, Vidula, Kunti, Gandhari. We do not show these lines or make cards of them: {screened.map((s) => s.id.replace('mbh.', 'MBh ')).join(', ')}.
          The same goes for a handful of Anushasana Parva lines, a book many scholars read as a late teaching layer.
        </p>
        <p>Wisdom translation, edited by Ankur Shukla.</p>
      </section>
    </Shell>
  )
}
