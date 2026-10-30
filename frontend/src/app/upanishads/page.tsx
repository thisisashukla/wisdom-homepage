import Shell, { Faq, GitaBridge, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import Sanskrit from '@/components/funnels/upanishads/Sanskrit'
import { articleLd, faqLd, SITE, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
import { LINES } from '@/content/funnels/upanishads/lines'
import { PRINCIPAL, SHVETASHVATARA, GITA_DHYANAM } from '@/content/funnels/upanishads/principal'

const PATH = '/upanishads'
const PAGE = 'upanishads-hub'
const TITLE = 'The Upanishads: What They Are and Where to Start'
const DESC =
  'What the Upanishads are, how many there are (108, with 10 principal), which Veda each belongs to, which to read first, and their famous lines in Sanskrit.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, twin: '/hi/upanishad', ogCard: 'up-tat-tvam-asi' })

const FAQ = [
  {
    q: 'How many Upanishads are there?',
    a: 'Tradition counts 108, following the list in the Muktika Upanishad, though well over 200 texts carry the name. Ten are called the principal Upanishads because Shankara wrote commentaries on them: Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya and Brihadaranyaka.',
  },
  {
    q: 'Who wrote the Upanishads?',
    a: 'In the Hindu tradition the Upanishads are shruti, "what was heard": seen by rishis, never composed by an author. The texts name many teachers, among them Yajnavalkya, Uddalaka Aruni, Angiras, Pippalada and Yama, the god of death.',
  },
  {
    q: 'When were the Upanishads composed?',
    a: 'Tradition holds them to be without beginning. Most scholars place the oldest, the Brihadaranyaka and the Chandogya, before the Buddha, around the 7th to 6th century BCE, with the others following over several centuries.',
  },
  {
    q: 'Are the Upanishads part of the Vedas?',
    a: 'Yes. Each belongs to one of the four Vedas and comes at its end, which is why the Upanishads are called Vedanta, "the end of the Veda". The Isha is even a chapter of the Shukla Yajur Veda Samhita itself.',
  },
  {
    q: 'What is the difference between the Vedas, the Upanishads and the Gita?',
    a: 'The Vedas are the whole body of hymns, rites and teachings. The Upanishads are their closing, philosophical part. The Bhagavad Gita is in the Mahabharata; tradition calls it the milk drawn from the Upanishads, and each of its chapters names itself an Upanishad.',
  },
]

export default function Page() {
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'The principal Upanishads; Shankara’s commentaries; Muktika Upanishad list.' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Famous lines from the Upanishads',
      itemListElement: LINES.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/upanishads/${l.slug}`, name: `${l.h1} (${l.ref})` })),
    },
    faqLd(FAQ),
  ]
  return (
    <Shell pageName={PAGE} locale="en" crumbs={[{ name: 'Home', path: '/' }, { name: 'Upanishads', path: PATH }]} jsonLd={jsonLd}>
      <header>
        <p className="fx-ref">Upa-ni-shad: to sit down near</p>
        <h1>The Upanishads, and where to start</h1>
        <p className="fx-lede" style={{ marginTop: 14 }}>
          Sit with the questions they asked in the forest. One line at a time.
        </p>
        <p id="quick-answer" className="fx-quick">
          The Upanishads are the closing part of the Vedas, which is why they are called Vedanta, &quot;the end of the Veda&quot;. They teach about the Self
          and Brahman, often as conversations between a teacher and a student. Tradition counts 108; ten are called the principal Upanishads because
          Shankara wrote commentaries on them.
        </p>
      </header>

      <div className="fx-line">
        <p className="fx-ref">Katha Upanishad 1.3.14</p>
        <Sanskrit sa={'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।'} iast={'uttiṣṭhata jāgrata prāpya varān nibodhata |'} size="hero" />
        <p className="fx-en-line">Arise. Awake. Go to the great teachers and learn.</p>
      </div>

      <section className="fx-sec" aria-labelledby="word">
        <h2 id="word">What the word means</h2>
        <p>
          Upa-ni-shad is &quot;sitting down near&quot;: a student sitting close to a teacher, close enough for a teaching that was never shouted from a
          stage. Shankara gives a second sense from the same root, sad, &quot;to loosen&quot;: the knowledge that loosens the hold of not knowing who
          you are.
        </p>
      </section>

      <section className="fx-sec" aria-labelledby="how-many">
        <h2 id="how-many">How many there are, and the ten principal</h2>
        <p>
          The Muktika Upanishad lists 108. Ten have always been read first, because Shankara wrote commentaries on them, and every school of Vedanta
          reads them closely.
        </p>
        <div className="fx-table-wrap">
          <table className="fx-table">
            <thead>
              <tr>
                <th scope="col">Upanishad</th>
                <th scope="col">Veda</th>
                <th scope="col">Length</th>
                <th scope="col">What it holds</th>
              </tr>
            </thead>
            <tbody>
              {PRINCIPAL.map((u) => (
                <tr key={u.id}>
                  <th scope="row">{u.href ? <a href={u.href} data-mp-location={`principal_${u.id}`}>{u.en}</a> : u.en}</th>
                  <td>{u.veda.en}</td>
                  <td>{u.size.en}</td>
                  <td>{u.about.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 14 }}>{SHVETASHVATARA.en}</p>
      </section>

      <section className="fx-sec" aria-labelledby="first">
        <h2 id="first">Which to read first</h2>
        <p>
          Start with the Isha. It is eighteen verses and you can finish it tonight. Then the Katha, which is a story: a boy waits three nights at
          Death&apos;s door and will not leave without an answer. After that, the Mandukya, twelve verses on waking, dream and deep sleep.
        </p>
        <ul className="fx-links">
          <li>
            <a href="/upanishads/isha" data-mp-location="hub_isha">
              <strong>Read the Isha Upanishad</strong>
              <span>18 verses and the invocation, Sanskrit and plain English</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/katha" data-mp-location="hub_katha">
              <strong>Read the Katha Upanishad, as a conversation</strong>
              <span>119 verses. Tap Sit closer to hear each answer.</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/mandukya" data-mp-location="hub_mandukya">
              <strong>Read the Mandukya Upanishad</strong>
              <span>12 verses on Om and the four states</span>
            </a>
          </li>
          <li>
            <a href="/upanishads/which-to-read-first" data-mp-location="hub_which_first">
              <strong>Which Upanishad to read first, and which translations to buy</strong>
              <span>An honest order, and the books worth owning</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="fx-sec" aria-labelledby="lines">
        <h2 id="lines">Lines people search for</h2>
        <ul className="fx-links">
          {LINES.map((l) => (
            <li key={l.slug}>
              <a href={`/upanishads/${l.slug}`} data-mp-location={`hub_line_${l.slug}`}>
                <span className="fx-links-sa" lang="sa">
                  {l.writing.forms[0].sa}
                </span>
                <strong>{l.h1}</strong>
                <span>{l.ref}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="/upanishads/mahavakyas" data-mp-location="hub_mahavakyas">
              <strong>The four mahavakyas</strong>
              <span>Four great sentences from four Upanishads and four Vedas</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="fx-sec" aria-labelledby="gita">
        <h2 id="gita">The Upanishads and the Gita</h2>
        <p>The verse recited before the Gita says where the Gita comes from.</p>
        <p className="fx-ref">{GITA_DHYANAM.ref}</p>
        <Sanskrit sa={GITA_DHYANAM.sa} iast={GITA_DHYANAM.iast} size="small" />
        <p className="fx-v-en" style={{ marginTop: 12 }}>
          {GITA_DHYANAM.en}
        </p>
        <p>Some lines cross over almost word for word. Death says to Nachiketa what Krishna later says to Arjuna:</p>
        <GitaBridge c={2} v={20} note="the Self is not born and does not die; compare Katha 1.2.18." />
        <GitaBridge c={2} v={19} note="neither the killer nor the killed understands; compare Katha 1.2.19." />
      </section>

      <section className="fx-sec" aria-labelledby="plan">
        <h2 id="plan">Seven lines on who you are</h2>
        <p>
          A short plan through seven Upanishads: Kena, Mundaka, Katha, Isha, Mandukya, Chandogya and Brihadaranyaka. One line a day, with one thing to
          notice.
        </p>
        <p>
          <a href="/upanishads/who-am-i" data-mp-location="hub_plan">
            Start the Who am I plan
          </a>
        </p>
      </section>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="hub-end" heading="One line each morning" />

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>{SOURCES_NOTE_EN}</p>
        <p>{DISCLOSURE_EN}</p>
        <p>
          <a href="/hi/upanishad" hrefLang="hi">
            यह पेज हिंदी में पढ़ें
          </a>
        </p>
      </SourcesNote>
    </Shell>
  )
}
