import type { Metadata } from 'next'
import Shell from '@/components/funnels/mahabharata/Shell'
import FamilyTree, { type TreeLine } from '@/components/funnels/mahabharata/FamilyTree'
import FamilyList from '@/components/funnels/mahabharata/FamilyList'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import { PEOPLE, ROWS } from '@/lib/funnels/mahabharata/family'
import { PARVAS } from '@/lib/funnels/mahabharata/parvas'
import { CHARACTERS } from '@/lib/funnels/mahabharata/characters'
import { domIdOf, line } from '@/lib/funnels/mahabharata/lines'
import { PATHS, abs, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-hub'
const PATH = PATHS.hub
const CARD = 'mbh-3-314-119'
const TITLE = 'Mahabharata: Family Tree, Characters and the Gita'
const DESC =
  "The Mahabharata's 18 books in brief, an interactive Kuru family tree, the people who matter, and where the Bhagavad Gita sits. Sanskrit with verse numbers."

export const metadata: Metadata = meta({ title: TITLE, description: DESC, path: PATH, cardId: CARD })

const FAQ = [
  { q: 'Is the Mahabharata a true story?', a: 'The epic calls itself itihasa, "so it was". Many in the tradition read it as history; scholars differ on what memory of real events lies behind it. We present the text and the tradition and leave that question open.' },
  { q: 'Who wrote the Mahabharata?', a: 'Tradition names the sage Vyasa, who is also a character: grandfather of both the Pandavas and the Kauravas. The Adi Parva says Ganesha wrote it down as Vyasa recited. Vaishampayana tells it at King Janamejaya\'s sacrifice, and the bard Ugrashravas retells it in the Naimisha forest. Scholars describe a text that grew over a long time.' },
  { q: 'Is the Mahabharata longer than the Bible?', a: 'Yes, by a wide margin. Tradition calls it the collection of a hundred thousand verses. K. M. Ganguli\'s complete English translation runs past two million words; the King James Bible has under 800,000.' },
  { q: 'Who are the 100 Kauravas?', a: 'Gandhari\'s hundred sons with Dhritarashtra, led by Duryodhana and Duhshasana, and one daughter, Duhshala. The Adi Parva lists all hundred names. Dhritarashtra also had a son, Yuyutsu, by a woman who served the queen; he crossed to the Pandava side on the first day.' },
  { q: 'Is Ashwatthama still alive?', a: 'In the Sauptika Parva, after his night raid on the sleeping camp, Krishna curses him to wander the earth for three thousand years, alone and in pain. Popular tradition counts him among the chiranjivis, the long-lived ones. The epic does not say where he is now.' },
  { q: 'Where is the Bhagavad Gita in the Mahabharata?', a: 'In the Bhishma Parva, the sixth book: chapters 23 to 40 in the Pune critical edition, 25 to 42 in the vulgate. Sanjaya tells it to the blind king Dhritarashtra.' },
  { q: 'Why did Karna side with Duryodhana?', a: 'He tells Krishna: the charioteer\'s family raised him, and Duryodhana stood by him for thirteen years. Not for the whole earth could he make those bonds false (MBh 5.141.12).' },
]

export default function Page() {
  const lines: Record<string, TreeLine> = {}
  for (const p of PEOPLE) {
    if (!p.lineId) continue
    const l = line(p.lineId)
    lines[p.lineId] = { deva: l.deva, iast: l.iast, en: l.en, ref: l.ref, speaker: l.speaker.en, anchor: domIdOf(l.id) }
  }
  const ld = graph(
    articleLd({ headline: 'The Mahabharata: family tree, characters and where the Gita sits', description: DESC, path: PATH, image: ogImage(CARD), about: 'Mahabharata' }),
    {
      '@type': 'ItemList',
      name: 'The eighteen books of the Mahabharata',
      itemListElement: PARVAS.map((p) => ({ '@type': 'ListItem', position: p.n, name: p.name, description: p.summary, ...(p.href ? { url: abs(p.href) } : {}) })),
    },
    faqLd(FAQ),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATH },
    ]),
  )
  return (
    <Shell page={PAGE} crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata' }]} jsonLd={ld}>
      <header className="mb-head">
        <p className="mb-kicker">Eighteen books, one family, eighteen days</p>
        <h1>The Mahabharata</h1>
        <p id="quick-answer">
          The Mahabharata is a Sanskrit epic in eighteen books about one family, the Kurus, and the war between its two branches. Tradition names
          the sage Vyasa as its author; he is also grandfather to both sides. The Bhagavad Gita sits in book six, and its lines echo elsewhere:
          Vidura speaks Gita 16.21 word for word (MBh 5.33.73).
        </p>
      </header>

      <section className="mb-sec mb-wide" id="tree" aria-labelledby="tree-h" data-mp-section="family_tree">
        <h2 id="tree-h">Pull a thread</h2>
        <p className="mb-lede">
          Tap a name and their parents, husbands or wives, and children light up in bronze. Switch on Day 1 to see who stood on which side when
          the war began.
        </p>
        <FamilyTree people={PEOPLE} rows={ROWS} lines={lines} page={PAGE} />
        <FamilyList />
      </section>

      <section className="mb-sec" aria-labelledby="start-h" data-mp-section="start_here">
        <h2 id="start-h">Start here</h2>
        <ul className="mb-links">
          <li>
            <a href={PATHS.gita}>
              <strong>Where the Gita sits</strong>
              <span>Book six, chapters 23 to 40, told by Sanjaya after Bhishma falls.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.yaksha}>
              <strong>The Yaksha&apos;s questions</strong>
              <span>What is heavier than the earth? Every answer, and a 10-question quiz.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.vidura}>
              <strong>Vidura Niti</strong>
              <span>A sleepless king and the counsellor who told him the truth. Seven verses on anger.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.quotes}>
              <strong>25 lines from the Mahabharata</strong>
              <span>Each with its Sanskrit, speaker and verse number.</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-sec" aria-labelledby="people-h" data-mp-section="characters">
        <h2 id="people-h">Six people and the choice each one made</h2>
        <ul className="mb-links">
          {CHARACTERS.map((c) => (
            <li key={c.slug}>
              <a href={PATHS.character(c.slug)}>
                <strong>{c.name}</strong>
                <span>{c.choice.moment}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-sec" id="books" aria-labelledby="books-h" data-mp-section="parvas">
        <h2 id="books-h">The eighteen books</h2>
        <p className="mb-lede">
          Books marked &quot;Sanskrit here&quot; are the ones we hold in Sanskrit and quote from: 3, 5, 12, 13 and 14. More will follow.
        </p>
        <ol className="mb-parvas">
          {PARVAS.map((p) => (
            <li key={p.n} className="mb-parva" data-held={p.held ? '' : undefined} data-gita={p.gita ? '' : undefined}>
              <span className="mb-parva-n" aria-hidden="true">
                {p.n}
              </span>
              <div>
                <h3>
                  {p.href ? <a href={p.href}>{p.name}</a> : p.name} <span lang="hi" className="mb-note">{p.hi}</span>
                </h3>
                <p>{p.summary}</p>
                {p.held && <span className="mb-parva-tag">Sanskrit here</span>}
                {p.gita && (
                  <p>
                    <GitaLink href="/gita" from="hub_parvas" toRef="gita" page={PAGE} locale="en">
                      Read the Bhagavad Gita
                    </GitaLink>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-sec" aria-labelledby="screen-h" data-mp-section="screen">
        <h2 id="screen-h">If you came here from a series</h2>
        <p>
          BR Chopra&apos;s Mahabharat (1988), the Star Plus serial (2013) and Kurukshetra, the animated series on Netflix since October 2025,
          all draw on these books, closely in places and freely in others. Kurukshetra tells the war in 18 episodes, each from one
          warrior&apos;s side. Switch on Day 1 in the tree above to see where the family stood, then read what the Sanskrit has them say.
        </p>
      </section>

      <Faq items={FAQ} heading="Questions people ask" />
      <NextBlock page={PAGE} />

      <section className="mb-sec mb-method" aria-labelledby="method-h">
        <h2 id="method-h">Sources and method</h2>
        <p>
          The family tree uses only well-established relations. Divine fathers and mothers the epic leaves unnamed are given in words, never as
          names on the tree. Lines come from the Sanskrit we hold for books 3, 5, 12, 13 and 14, a southern-recension text whose numbering runs
          close to the Kumbhakonam edition. The English is Wisdom&apos;s own, read with Nilakantha&apos;s commentary, with K. M. Ganguli&apos;s
          public-domain translation consulted.
        </p>
        <p>Wisdom translation, edited by Ankur Shukla.</p>
      </section>
    </Shell>
  )
}
