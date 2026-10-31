import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import { SourcesNote, UpNext } from '@/components/funnels/upanishads/parts'
import { articleLd, SITE, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
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
  ]
  return (
    <>
      <PageTracker pageName="Upanishads Mahavakyas" />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[
          { label: 'Upanishads', href: '/upanishads' },
          { label: 'Mahavakyas', href: PATH },
        ]}
        eyebrow="Four Upanishads, four Vedas"
        title="The four mahavakyas"
        facts={['Rig, Yajur, Sama, Atharva']}
        actions={[{ href: `#${slug(MAHAVAKYAS[0].iast)}`, label: 'Read the four', location: 'mahavakyas_hero_read' }]}
        verse={{ original: MAHAVAKYAS.map((m) => m.sa), iast: MAHAVAKYAS.map((m) => m.iast) }}
      />

      <Section id="the-four" width="wide" className="up-maha-band">
        <p id="quick-answer" className="sx-intro up-maha-intro rv">
          The mahavakyas are four &quot;great sentences&quot; from four Upanishads, one from each Veda: prajnanam brahma (Aitareya 3.1.3), aham
          brahmasmi (Brihadaranyaka 1.4.10), tat tvam asi (Chandogya 6.8.7) and ayam atma brahma (Mandukya 2). Each says, in its own way, that the
          Self and Brahman are one.
        </p>
        <VerseList columns={2}>
          {MAHAVAKYAS.map((m) => (
            <VerseCard
              key={m.iast}
              as="li"
              id={slug(m.iast)}
              rv
              label={`${m.ref}, ${m.veda}`}
              original={m.sa}
              iast={m.iast}
              meaning={m.en}
            >
              <h2 className="up-sr">
                {m.iast}: {m.en}
              </h2>
              <p className="up-who-chip">{m.kind}</p>
              <p className="up-maha-note">{m.note}</p>
              {!m.href.startsWith(PATH) && (
                <p>
                  <a href={m.href} className="sx-link" data-mp-location={`mahavakya_${slug(m.iast)}`}>
                    Read it in its place
                  </a>
                </p>
              )}
            </VerseCard>
          ))}
        </VerseList>
      </Section>

      <UpNext locale="en" pageKey={PAGE} placement="mahavakyas-end" heading="One line each morning" />

      <Section id="faq" width="narrow" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <SourcesNote heading="Sources and method">
        <p>{SOURCES_NOTE_EN}</p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </>
  )
}
