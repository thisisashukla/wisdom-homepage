import Shell, { Band, Faq, GitaBridge, Head, HeroLine, SourcesNote, Tiles, UpNext } from '@/components/funnels/upanishads/Shell'
import VerseBlock from '@/components/funnels/upanishads/VerseBlock'
import SitCloser, { type SCExchange } from '@/components/funnels/upanishads/SitCloser'
import { articleLd, faqLd, TEXTS, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
import { KATHA_EXCHANGES } from '@/content/funnels/upanishads/katha-exchanges'

const PATH = '/upanishads/katha'
const PAGE = 'upanishads-katha'
const TITLE = 'Katha Upanishad: Nachiketa and Death, Full Text'
const DESC =
  'The whole Katha Upanishad, 119 verses, as the conversation it is: Nachiketa’s questions and Yama’s answers in Sanskrit and plain English.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, ogCard: 'up-uttishthata-jagrata' })

const WHO: Record<string, string | null> = {
  n: null,
  T: null,
  N: 'Nachiketa',
  Y: 'Yama',
  V: 'Yama’s household',
  s: 'Teacher and student',
}

const FAQ = [
  {
    q: 'What is the Katha Upanishad about?',
    a: 'A boy, Nachiketa, is given to Death by his angry father. He waits three nights at Yama’s door, is offered three wishes, and uses the third to ask what happens after death. Yama tries to buy him off with wealth and long life; Nachiketa refuses, and Yama teaches him the Self.',
  },
  { q: 'How many verses does the Katha Upanishad have?', a: '119, in two chapters of three sections (vallis) each. It belongs to the Krishna Yajur Veda.' },
  {
    q: 'Which Gita verses come from the Katha?',
    a: 'Gita 2.19 and 2.20 are close to Katha 1.2.19 and 1.2.18; Gita 8.11 echoes Katha 1.2.15; the upside-down fig tree of Gita 15.1 is the tree of Katha 2.3.1.',
  },
]

export default function Page() {
  const k = TEXTS.katha
  const byRef = new Map(k.verses.map((v) => [v.ref, v]))
  const view = (ref: string) => {
    const v = byRef.get(ref)
    if (!v) throw new Error(`katha ${ref}`)
    return { ref: v.ref, anchor: v.anchor, sa: v.sa, iast: v.iast, en: v.en, who: WHO[v.speaker ?? 'n'] ?? null }
  }
  const exchanges: SCExchange[] = KATHA_EXCHANGES.map((ex) => ({
    id: ex.id,
    title: ex.title,
    cue: ex.cue,
    ask: ex.ask.map(view),
    answer: ex.answer.map(view),
  }))
  const inv = k.invocation!
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'Katha Upanishad (Krishna Yajur Veda); Shankara’s commentary.', about: 'Katha Upanishad' }),
    faqLd(FAQ),
  ]

  const q = view('1.1.20')
  const half = (x: string) => x.split('\n')[0]

  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Katha', path: PATH },
      ]}
      jsonLd={jsonLd}
      hero={{
        eyebrow: 'Krishna Yajur Veda',
        title: 'The Katha Upanishad: Nachiketa and Death',
        sub: <>A boy walks to Death&apos;s door and waits three nights for an answer.</>,
        facts: ['119 verses', 'Two chapters, six vallis', 'Sanskrit and plain English'],
        cta: { href: '#sit-closer', label: 'Sit closer', loc: 'katha_hero_sit' },
        second: { href: '#how', label: 'How to read it here', loc: 'katha_hero_how' },
        visual: (
          <HeroLine
            still
            sa={half(q.sa)}
            iast={half(q.iast)}
            meaning={q.en.split(' I want')[0]}
            cite="Nachiketa, Katha Upanishad 1.1.20"
          />
        ),
      }}
    >
      <Band labelledBy="how">
        <p id="quick-answer" className="tp-intro rv">
          The Katha Upanishad belongs to the Krishna Yajur Veda and has 119 verses in two chapters. Nachiketa, given away to Death by his father, waits
          three nights at Yama&apos;s door and is offered three wishes. With the third he asks what happens after death. Yama&apos;s answer is the
          teaching.
        </p>
        <div className="fx-card fx-card-story rv">
          <h2 id="how" className="tp-label">
            How to read it here
          </h2>
          <p className="fx-scene">
            Upanishad means sitting down near. The text below is laid out as the conversation it is: the student&apos;s side first, then the
            teacher&apos;s answer when you tap Sit closer. Take one exchange at a sitting if you like. The whole text is always one tap away.
          </p>
        </div>
      </Band>

      <Band alt labelledBy="text" className="fx-text-band">
        <Head id="text">The text</Head>
        <VerseBlock v={{ ref: 'Invocation', anchor: 'invocation', sa: inv.sa, iast: inv.iast, en: inv.en, who: 'Teacher and student' }} label="Katha" />
        <SitCloser exchanges={exchanges} text="katha" page={PAGE} locale="en" refPrefix="Katha" />
      </Band>

      <Band labelledBy="acharyas" className="fx-acharya">
        <Head id="acharyas">Where the acharyas read it differently</Head>
        <div className="fx-verses" data-stagger="60">
          <div className="fx-card rv">
            <h3 className="tp-label">1.2.20: whose clearness</h3>
            <p>
              Shankara reads dhatu-prasadat as &quot;through the clearness of the senses and mind&quot;: the Self is seen when the instruments are calm.
              Readers in Ramanuja&apos;s and Madhva&apos;s lines read it as dhatuh prasadat, &quot;by the grace of the creator&quot;.
            </p>
          </div>
          <div className="fx-card rv">
            <h3 className="tp-label">1.2.23: who chooses whom</h3>
            <p>
              Shankara: the person who chooses the Self, and nothing else, gains it, and to that person the Self shows itself. Ramanuja and Madhva: the Lord chooses the
              one he favours, and grace decides.
            </p>
          </div>
          <div className="fx-card rv">
            <h3 className="tp-label">1.3.14: arise, awake</h3>
            <p>
              The verbs are plural. Shankara hears Yama speaking past Nachiketa to everyone asleep in not knowing the Self.{' '}
              <a href="/upanishads/uttishthata-jagrata" data-mp-location="katha_line_uttishthata">
                More on this line
              </a>
              .
            </p>
          </div>
        </div>
      </Band>

      <Band alt labelledBy="gita">
        <Head id="gita">The Katha and the Gita</Head>
        <div className="fx-bridges" data-stagger="60">
          <GitaBridge c={2} v={20} note="the Self is not born and does not die; Katha 1.2.18 in almost the same words." />
          <GitaBridge c={2} v={19} note="neither the killer nor the killed understands; Katha 1.2.19." />
          <GitaBridge c={8} v={11} note="the word the knowers of the Veda speak of, for which people live as students; Katha 1.2.15." />
          <GitaBridge c={15} v={1} note="the fig tree with roots above and branches below; Katha 2.3.1." />
        </div>
      </Band>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="text-end" heading="One line each morning" />

      <Band wide labelledBy="next-text">
        <Head id="next-text">Read next</Head>
        <Tiles
          cols={3}
          items={[
            { href: '/upanishads/who-am-i', title: 'Who am I: a 7-verse plan', sub: 'Katha 1.2.18 is day 3', loc: 'katha_next_plan' },
            { href: '/upanishads/isha', title: 'The Isha Upanishad', sub: 'Eighteen verses, one sitting', loc: 'katha_next_isha' },
            { href: '/blogs/atman-not-soul-bhagavad-gita', title: 'Atman vs soul', sub: 'Why the Gita and the Katha say the Self is never born', loc: 'katha_next_atman' },
          ]}
        />
      </Band>

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} The corpus text of 1.1.4 to 1.2.11 had many OCR errors (1.2.9 was a prose paraphrase); those verses follow the proofread
          sanskritdocuments.org edition, and the old readings are kept in our review notes.
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
