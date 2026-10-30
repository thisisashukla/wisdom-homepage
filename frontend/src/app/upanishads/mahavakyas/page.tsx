import Shell, { Faq, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import Sanskrit from '@/components/funnels/upanishads/Sanskrit'
import { articleLd, faqLd, SITE, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
import { MAHAVAKYAS } from '@/content/funnels/upanishads/mahavakyas'

const PATH = '/upanishads/mahavakyas'
const PAGE = 'upanishads-mahavakyas'
const TITLE = 'The 4 Mahavakyas of the Upanishads, with Meaning'
const DESC =
  'Prajnanam brahma, aham brahmasmi, tat tvam asi, ayam atma brahma: the four great sentences, one from each Veda, with Sanskrit, source and meaning.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, ogCard: 'up-aham-brahmasmi' })

const slug = (iast: string) =>
  iast
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, '-')
    .replace(/^-|-$/g, '')

const FAQ = [
  {
    q: 'What are the four mahavakyas?',
    a: 'Prajnanam brahma (Aitareya 3.1.3, Rig Veda), aham brahmasmi (Brihadaranyaka 1.4.10, Yajur Veda), tat tvam asi (Chandogya 6.8.7, Sama Veda) and ayam atma brahma (Mandukya 2, Atharva Veda).',
  },
  {
    q: 'Who grouped the four together?',
    a: 'The grouping comes from the later Advaita tradition. Vidyaranya’s Panchadashi gives a chapter to them, and they are taught at sannyasa initiation in Shankara’s order.',
  },
  {
    q: 'Do all schools of Vedanta read them as identity?',
    a: 'No. Advaita reads them as the identity of the self and Brahman. Ramanuja reads them as Brahman being the inner Self of the individual; Madhva reads them as dependence and likeness.',
  },
]

export default function Page() {
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'Aitareya 3.1.3; Brihadaranyaka 1.4.10; Chandogya 6.8.7; Mandukya 2.' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'The four mahavakyas',
      itemListElement: MAHAVAKYAS.map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: `${m.iast} (${m.ref})`, url: `${SITE}${PATH}#${slug(m.iast)}` })),
    },
    faqLd(FAQ),
  ]
  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Mahavakyas', path: PATH },
      ]}
      jsonLd={jsonLd}
    >
      <header>
        <h1>The four mahavakyas</h1>
        <p id="quick-answer" className="fx-quick">
          The mahavakyas are four &quot;great sentences&quot; from four Upanishads, one from each Veda: prajnanam brahma (Aitareya 3.1.3), aham
          brahmasmi (Brihadaranyaka 1.4.10), tat tvam asi (Chandogya 6.8.7) and ayam atma brahma (Mandukya 2). Each says, in its own way, that the
          Self and Brahman are one.
        </p>
      </header>

      {MAHAVAKYAS.map((m) => (
        <section key={m.iast} id={slug(m.iast)} className="fx-sec" aria-labelledby={`h-${slug(m.iast)}`}>
          <p className="fx-ref">
            {m.ref}, {m.veda}
          </p>
          <h2 id={`h-${slug(m.iast)}`} className="fx-sr">
            {m.iast}: {m.en}
          </h2>
          <Sanskrit sa={m.sa} iast={m.iast} size="hero" />
          <p className="fx-en-line" style={{ fontFamily: 'var(--fx-serif)', fontSize: 22, margin: '8px 0 10px' }}>
            {m.en}
          </p>
          <p className="fx-who">{m.kind}</p>
          <p>{m.note}</p>
          {!m.href.startsWith(PATH) && (
            <p>
              <a href={m.href} data-mp-location={`mahavakya_${slug(m.iast)}`}>
                Read it in its place
              </a>
            </p>
          )}
        </section>
      ))}

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="mahavakyas-end" heading="One line each morning" />

      <Faq items={FAQ} heading="Questions people ask" />

      <SourcesNote heading="Sources and method">
        <p>{SOURCES_NOTE_EN}</p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
