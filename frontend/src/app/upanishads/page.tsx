import Shell, { Band, Faq, GitaBridge, Head, HeroLine, SourcesNote, Tiles, UpNext } from '@/components/funnels/upanishads/Shell'
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
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Upanishads', path: PATH }]}
      jsonLd={jsonLd}
      hero={{
        eyebrow: 'Upa-ni-shad: to sit down near',
        title: 'The Upanishads, and where to start',
        sub: 'Sit with the questions they asked in the forest. One line at a time.',
        facts: ['108 in the Muktika list', '10 principal', 'Sanskrit and plain English'],
        cta: { href: '#first', label: 'Which to read first', loc: 'hub_hero_first' },
        second: { href: '#lines', label: 'Lines people search for', loc: 'hub_hero_lines' },
        visual: (
          <HeroLine
            sa={'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।'}
            iast={'uttiṣṭhata jāgrata prāpya varān nibodhata |'}
            meaning="Arise. Awake. Go to the great teachers and learn."
            cite="Katha Upanishad 1.3.14"
          />
        ),
      }}
    >
      <Band labelledBy="word">
        <p id="quick-answer" className="tp-intro rv">
          The Upanishads are the closing part of the Vedas, which is why they are called Vedanta, &quot;the end of the Veda&quot;. They teach about the Self
          and Brahman, often as conversations between a teacher and a student. Tradition counts 108; ten are called the principal Upanishads because
          Shankara wrote commentaries on them.
        </p>
        <div className="fx-card fx-card-story rv">
          <h2 id="word" className="tp-label">
            What the word means
          </h2>
          <p className="fx-scene">
            Upa-ni-shad is &quot;sitting down near&quot;: a student sitting close to a teacher, close enough for a teaching that was never shouted from a
            stage. Shankara gives a second sense from the same root, sad, &quot;to loosen&quot;: the knowledge that loosens the hold of not knowing who
            you are.
          </p>
        </div>
      </Band>

      <Band alt wide labelledBy="how-many">
        <Head
          id="how-many"
          sub="The Muktika Upanishad lists 108. Ten have always been read first, because Shankara wrote commentaries on them, and every school of Vedanta reads them closely."
        >
          How many there are, and the ten principal
        </Head>
        <ul className="fx-ten" data-stagger="40">
          {PRINCIPAL.map((u) => (
            <li key={u.id} className={`rv${u.href ? ' has-link' : ''}`}>
              <span className="fx-ten-name">
                {u.href ? (
                  <a href={u.href} data-mp-location={`principal_${u.id}`}>
                    {u.en}
                  </a>
                ) : (
                  u.en
                )}
              </span>
              <span className="fx-ten-meta">
                {u.veda.en}, {u.size.en}
              </span>
              <span className="fx-ten-about">{u.about.en}</span>
            </li>
          ))}
        </ul>
        <p className="fx-p rv" style={{ marginTop: 20 }}>
          {SHVETASHVATARA.en}
        </p>
      </Band>

      <Band wide labelledBy="first">
        <Head
          id="first"
          sub={
            <>
              Start with the Isha. It is eighteen verses and you can finish it tonight. Then the Katha, which is a story: a boy waits three nights at
              Death&apos;s door and will not leave without an answer. After that, the Mandukya, twelve verses on waking, dream and deep sleep.
            </>
          }
        >
          Which to read first
        </Head>
        <Tiles
          cols={2}
          items={[
            { href: '/upanishads/isha', sa: 'ईशा वास्यमिदं सर्वं', title: 'Read the Isha Upanishad', sub: '18 verses and the invocation, Sanskrit and plain English', loc: 'hub_isha' },
            { href: '/upanishads/katha', sa: 'उत्तिष्ठत जाग्रत', title: 'Read the Katha Upanishad, as a conversation', sub: '119 verses. Tap Sit closer to hear each answer.', loc: 'hub_katha' },
            { href: '/upanishads/mandukya', sa: 'ॐ', title: 'Read the Mandukya Upanishad', sub: '12 verses on Om and the four states', loc: 'hub_mandukya' },
            { href: '/upanishads/which-to-read-first', title: 'Which Upanishad to read first, and which translations to buy', sub: 'An honest order, and the books worth owning', loc: 'hub_which_first' },
          ]}
        />
      </Band>

      <Band alt wide labelledBy="lines">
        <Head id="lines">Lines people search for</Head>
        <Tiles
          cols={3}
          items={[
            ...LINES.map((l) => ({ href: `/upanishads/${l.slug}`, sa: l.writing.forms[0].sa, title: l.h1, sub: l.ref, loc: `hub_line_${l.slug}` })),
            { href: '/upanishads/mahavakyas', title: 'The four mahavakyas', sub: 'Four great sentences from four Upanishads and four Vedas', loc: 'hub_mahavakyas' },
          ]}
        />
      </Band>

      <Band labelledBy="gita">
        <Head id="gita" sub="The verse recited before the Gita says where the Gita comes from.">
          The Upanishads and the Gita
        </Head>
        <div className="fx-v rv">
          <p className="fx-v-ref-plain">{GITA_DHYANAM.ref}</p>
          <Sanskrit sa={GITA_DHYANAM.sa} iast={GITA_DHYANAM.iast} size="small" />
          <p className="fx-v-en">{GITA_DHYANAM.en}</p>
        </div>
        <p className="fx-p rv" style={{ marginTop: 28 }}>
          Some lines cross over almost word for word. Death says to Nachiketa what Krishna later says to Arjuna:
        </p>
        <div className="fx-bridges" data-stagger="60">
          <GitaBridge c={2} v={20} note="the Self is not born and does not die; compare Katha 1.2.18." />
          <GitaBridge c={2} v={19} note="neither the killer nor the killed understands; compare Katha 1.2.19." />
        </div>
      </Band>

      <Band alt labelledBy="plan">
        <div className="fx-card fx-card-story rv">
          <h2 id="plan" className="fx-h3">
            Seven lines on who you are
          </h2>
          <p>
            A short plan through seven Upanishads: Kena, Mundaka, Katha, Isha, Mandukya, Chandogya and Brihadaranyaka. One line a day, with one thing to
            notice.
          </p>
          <p style={{ marginTop: 18 }}>
            <a href="/upanishads/who-am-i" className="btn-read-gita" data-mp-location="hub_plan">
              Start the Who am I plan
            </a>
          </p>
        </div>
      </Band>

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
