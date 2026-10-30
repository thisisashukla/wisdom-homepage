import Shell, { Band, Faq, Head, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import { PRINCIPAL } from '@/content/funnels/upanishads/principal'
import { articleLd, faqLd, upMeta, DISCLOSURE_EN } from '@/lib/funnels/upanishads'

const PATH = '/upanishads/which-to-read-first'
const PAGE = 'upanishads-which-first'
const TITLE = 'Which Upanishad to Read First, and Which Translation'
const DESC =
  'An honest reading order for the Upanishads (Isha, Katha, Mandukya, Kena, Mundaka) and the English translations worth buying, with what each gets right.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH })

const ORDER = [
  {
    n: 1,
    name: 'Isha',
    href: '/upanishads/isha',
    why: 'Eighteen verses. You can read it tonight, and it holds the whole outlook in small: the Lord in everything, work without clinging, the Self in every being.',
  },
  {
    n: 2,
    name: 'Katha',
    href: '/upanishads/katha',
    why: 'A story with a hero you will remember: a boy who turns down everything Death offers him. Many readers find this the easiest way in. Two of its verses reappear in the Gita.',
  },
  {
    n: 3,
    name: 'Kena',
    why: 'Short and sharp: what is it that sees through the eye and thinks through the mind? Read it after the Katha, when the question feels like your own.',
  },
  {
    n: 4,
    name: 'Mundaka',
    href: '/upanishads/satyameva-jayate',
    why: 'Higher and lower knowledge, the two birds on one tree, and satyameva jayate. Clear verse, good for reading aloud.',
  },
  {
    n: 5,
    name: 'Mandukya',
    href: '/upanishads/mandukya',
    why: 'Only twelve verses, and the densest. Read it once now, and again with Gaudapada’s Karika when you want to go deep.',
  },
  {
    n: 6,
    name: 'Chandogya 6 and Brihadaranyaka 2 to 4',
    href: '/upanishads/tat-tvam-asi',
    why: 'Long prose texts. Read them in pieces: Uddalaka teaching his son (Chandogya 6), and Yajnavalkya with Maitreyi (Brihadaranyaka 2.4 and 4.5).',
  },
]

const BOOKS = [
  {
    title: 'Eight Upanishads, with the commentary of Shankaracharya',
    who: 'Swami Gambhirananda, 2 volumes, Advaita Ashrama',
    note: 'The closest English to Shankara’s commentary, verse by verse, with the Sanskrit. Dense, but the one to own if you want the traditional reading. Covers Isha, Kena, Katha, Taittiriya, Aitareya, Mundaka, Mandukya with the Karika, and Prashna.',
  },
  {
    title: 'The Upanishads',
    who: 'Swami Nikhilananda, 4 volumes, Ramakrishna-Vivekananda Center',
    note: 'Long introductions and notes drawn from Shankara. Good for slow study of one text at a time.',
  },
  {
    title: 'The Upanishads',
    who: 'Eknath Easwaran, Nilgiri Press',
    note: 'The gentlest first read in English, with helpful introductions. It is loose in places and gives no Sanskrit; read it next to a closer translation.',
  },
  {
    title: 'Upanisads',
    who: 'Patrick Olivelle, Oxford World’s Classics',
    note: 'Careful scholarly English of the early Upanishads, with notes on the Sanskrit. It reads them as historical documents and sets the traditional commentaries aside.',
  },
  {
    title: 'Ishadi Nau Upanishad (ईशादि नौ उपनिषद्)',
    who: 'Gita Press, Gorakhpur',
    note: 'For Hindi readers: nine Upanishads with Sanskrit, word meanings and Hindi explanation, inexpensive and widely available.',
  },
]

const FAQ = [
  { q: 'Which Upanishad should a beginner read first?', a: 'The Isha. It is eighteen verses long and covers the main ideas in small. Then the Katha, which tells them as a story.' },
  { q: 'Which English translation of the Upanishads is best?', a: 'For the traditional reading, Swami Gambhirananda’s Eight Upanishads with Shankara’s commentary. For a gentle first read, Eknath Easwaran. For scholarly accuracy, Patrick Olivelle.' },
  { q: 'Are there free translations?', a: 'Swami Paramananda’s The Upanishads (1919: Isha, Katha, Kena) is free on Project Gutenberg. Our own Isha, Katha and Mandukya pages are free with the Sanskrit.' },
  { q: 'Should I start with Max Müller?', a: 'His translations are free but use Victorian English and often read the texts through a colonial lens. Start elsewhere and come back to him later if you want the history.' },
]

export default function Page() {
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'Principal Upanishads; translations by Gambhirananda, Nikhilananda, Easwaran, Olivelle, Gita Press, Paramananda.' }),
    faqLd(FAQ),
  ]
  const order = ['isha', 'katha', 'kena', 'mundaka', 'mandukya'].map((id) => PRINCIPAL.find((u) => u.id === id)!)
  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Which to read first', path: PATH },
      ]}
      jsonLd={jsonLd}
      toggle={false}
      hero={{
        eyebrow: 'A reading order',
        title: 'Which Upanishad to read first',
        facts: ['Six steps', 'Five translations to buy', 'One free online'],
        cta: { href: '#order', label: 'See the reading order', loc: 'which_first_hero_order' },
        second: { href: '#books', label: 'Translations worth buying', loc: 'which_first_hero_books' },
        visual: (
          <figure className="fx-hline fx-hline-order" data-len="short">
            <ol lang="sa">
              {order.map((u, i) => (
                <li key={u.id}>
                  <span className="fx-hline-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="s-deva">{u.hi}</span>
                </li>
              ))}
            </ol>
            <span className="fx-hline-rule" aria-hidden="true" />
            <figcaption className="fx-hline-en" lang="en">
              {order.map((u) => u.en).join(', ')}
            </figcaption>
          </figure>
        ),
      }}
    >
      <Band labelledBy="order">
        <p id="quick-answer" className="tp-intro rv">
          Read the Isha Upanishad first: eighteen verses you can finish in one sitting. Then the Katha, which tells the same ideas as a story, then the
          Kena, Mundaka and Mandukya. Leave the long prose Upanishads, the Chandogya and Brihadaranyaka, for later and read them in sections. For a
          translation, start with Gambhirananda or Easwaran.
        </p>
        <h2 id="order" className="tp-h2 rv">
          A reading order
        </h2>
        <ol className="fx-order" data-stagger="60">
          {ORDER.map((o) => (
            <li key={o.n} className="rv">
              {o.href ? (
                <a href={o.href} data-mp-location={`which_first_${o.n}`}>
                  <span className="fx-order-n">{o.n}</span>
                  <strong className="fx-order-name">{o.name}</strong>
                  <span className="fx-order-why">{o.why}</span>
                </a>
              ) : (
                <div>
                  <span className="fx-order-n">{o.n}</span>
                  <strong className="fx-order-name">{o.name}</strong>
                  <span className="fx-order-why">{o.why}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </Band>

      <Band alt labelledBy="how">
        <div className="fx-card fx-card-story rv">
          <h2 id="how" className="tp-label">
            How to read one
          </h2>
          <p className="fx-scene">
            Read a few verses aloud, slowly, once in Sanskrit if you can and once in English. Stop when one line stays with you, and carry that line for
            the day. The Upanishads were taught this way, a little at a time, sitting close.
          </p>
        </div>
      </Band>

      <Band wide labelledBy="books">
        <Head id="books" sub="We have no arrangement with any publisher. These are the books readers of Shankara’s tradition and scholars recommend most often.">
          Translations worth buying
        </Head>
        <ul className="fx-books" data-stagger="60">
          {BOOKS.map((b) => (
            <li key={b.title + b.who} className="rv">
              <strong>{b.title}</strong>
              <em>{b.who}</em>
              {b.note}
            </li>
          ))}
        </ul>
        <p className="fx-p rv" style={{ marginTop: 22 }}>
          Free: Swami Paramananda,{' '}
          <a href="https://www.gutenberg.org/ebooks/3283" className="fx-link">
            The Upanishads (1919), on Project Gutenberg
          </a>
          .
        </p>
      </Band>

      <Band alt labelledBy="plan">
        <div className="fx-card fx-card-story rv">
          <h2 id="plan" className="fx-h3">
            If you want one line a day instead
          </h2>
          <p>Seven lines from seven Upanishads, one a day, each with one thing to notice.</p>
          <p style={{ marginTop: 18 }}>
            <a href="/upanishads/who-am-i" className="btn-read-gita" data-mp-location="which_first_plan">
              Start the Who am I plan
            </a>
          </p>
        </div>
      </Band>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="guide-end" heading="One line each morning" />

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>
          Reading order and book notes are Wisdom&apos;s own judgement, drawn from the traditional order of study (Isha first, as in the Muktika list) and from
          what readers in Shankara&apos;s tradition recommend. {DISCLOSURE_EN}
        </p>
      </SourcesNote>
    </Shell>
  )
}
