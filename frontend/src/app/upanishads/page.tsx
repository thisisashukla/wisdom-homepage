import PageTracker from '@/components/BlogTracker'
import { Button, Faq, JsonLd, LinkCards, PageHero, Section, VerseCard } from '@/components/site'
import { Bridge, Bridges, SourcesNote, UpNext } from '@/components/funnels/upanishads/parts'
import { articleLd, padas, SITE, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
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
  ]
  return (
    <>
      <PageTracker pageName="Upanishads Hub" />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[{ label: 'Upanishads', href: PATH }]}
        eyebrow="Upa-ni-shad: to sit down near"
        title="The Upanishads, and where to start"
        sub="Start with the questions students brought to their teachers in the forest, and read the answers slowly."
        facts={['108 in the Muktika list', '10 principal']}
        actions={[
          { href: '#first', label: 'Which to read first', location: 'hub_hero_first' },
          { href: '#lines', label: 'Lines people search for', location: 'hub_hero_lines' },
        ]}
        verse={{
          original: padas('उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।'),
          iast: padas('uttiṣṭhata jāgrata prāpya varān nibodhata |'),
          meaning: 'Arise. Awake. Go to the great teachers and learn.',
          source: 'Katha Upanishad 1.3.14',
        }}
      />

      <Section id="word" width="narrow">
        <p id="quick-answer" className="sx-intro rv">
          The Upanishads are the closing part of the Vedas, which is why they are called Vedanta, &quot;the end of the Veda&quot;. They teach about the Self
          and Brahman, often as conversations between a teacher and a student. Tradition counts 108; ten are called the principal Upanishads because
          Shankara wrote commentaries on them.
        </p>
        <div className="up-card up-card--story rv">
          <h2 id="word-h" className="sx-eyebrow">
            What the word means
          </h2>
          <p className="up-scene">
            Upa-ni-shad is &quot;sitting down near&quot;: a student sitting close to a teacher to
            listen. Shankara gives a second sense from the same root, sad, &quot;to loosen&quot;: the knowledge that loosens the hold of not knowing who
            you are.
          </p>
        </div>
      </Section>

      <Section
        id="how-many"
        tone="band"
        title="How many there are, and the ten principal"
        intro="The Muktika Upanishad lists 108. Ten have always been read first, because Shankara wrote commentaries on them, and every school of Vedanta reads them closely."
      >
        <ul className="up-ten" data-stagger="40">
          {PRINCIPAL.map((u) => (
            <li key={u.id} className={`rv${u.href ? ' has-link' : ''}`}>
              <span className="up-ten-name">
                {u.href ? (
                  <a href={u.href} data-mp-location={`principal_${u.id}`}>
                    {u.en}
                  </a>
                ) : (
                  u.en
                )}
              </span>
              <span className="up-ten-meta">
                {u.veda.en}, {u.size.en}
              </span>
              <span className="up-ten-about">{u.about.en}</span>
            </li>
          ))}
        </ul>
        <p className="sx-prose up-after rv">{SHVETASHVATARA.en}</p>
      </Section>

      <Section
        id="first"
        title="Which to read first"
        intro={
          <>
            Start with the Isha. It is eighteen verses and you can finish it tonight. Then the Katha, which is a story: a boy waits three nights at
            Death&apos;s door and will not leave without an answer. After that, the Mandukya, twelve verses on waking, dream and deep sleep.
          </>
        }
      >
        <LinkCards
          items={[
            { href: '/upanishads/isha', orig: 'ईशा वास्यमिदं सर्वं', title: 'Read the Isha Upanishad', body: '18 verses you can read in one sitting', location: 'hub_isha' },
            { href: '/upanishads/katha', orig: 'उत्तिष्ठत जाग्रत', title: 'Read the Katha Upanishad, as a conversation', body: '119 verses. A boy asks Death what happens after we die.', location: 'hub_katha' },
            { href: '/upanishads/mandukya', orig: 'ॐ', title: 'Read the Mandukya Upanishad', body: '12 verses on Om and the four states', location: 'hub_mandukya' },
            { href: '/upanishads/which-to-read-first', title: 'Which Upanishad to read first, and which translations to buy', body: 'An honest order, and the books worth owning', location: 'hub_which_first' },
          ]}
        />
      </Section>

      <Section id="lines" tone="band" title="Lines people search for">
        <LinkCards
          columns={3}
          items={[
            ...LINES.map((l) => ({ href: `/upanishads/${l.slug}`, orig: l.writing.forms[0].sa, title: l.h1, body: l.ref, location: `hub_line_${l.slug}` })),
            { href: '/upanishads/mahavakyas', title: 'The four mahavakyas', body: 'Four great sentences from four Upanishads and four Vedas', location: 'hub_mahavakyas' },
          ]}
        />
      </Section>

      <Section id="gita" width="narrow" title="The Upanishads and the Gita" intro="The verse recited before the Gita says where the Gita comes from.">
        <VerseCard align="left" label={GITA_DHYANAM.ref} original={padas(GITA_DHYANAM.sa)} iast={padas(GITA_DHYANAM.iast)} meaning={GITA_DHYANAM.en} rv />
        <p className="sx-prose up-after rv">Some lines cross over almost word for word. Death says to Nachiketa what Krishna later says to Arjuna:</p>
        <Bridges>
          <Bridge c={2} v={20} note="the Self is not born and does not die; compare Katha 1.2.18." />
          <Bridge c={2} v={19} note="neither the killer nor the killed understands; compare Katha 1.2.19." />
        </Bridges>
      </Section>

      <Section id="plan" tone="band" width="narrow" title="Seven lines on who you are">
        <p className="sx-prose rv">
          A short plan through seven Upanishads: Kena, Mundaka, Katha, Isha, Mandukya, Chandogya and Brihadaranyaka. One line a day, with one thing to
          notice.
        </p>
        <p className="up-after rv">
          <Button href="/upanishads/who-am-i" label="Start the Who am I plan" location="hub_plan" />
        </p>
      </Section>

      <UpNext locale="en" pageKey={PAGE} placement="hub-end" heading="One line each morning" />

      <Section id="faq" width="narrow" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <SourcesNote heading="Sources and method">
        <p>{SOURCES_NOTE_EN}</p>
        <p>{DISCLOSURE_EN}</p>
        <p>
          <a href="/hi/upanishad" hrefLang="hi">
            यह पेज हिंदी में पढ़ें
          </a>
        </p>
      </SourcesNote>
    </>
  )
}
