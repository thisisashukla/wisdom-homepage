import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import { abs } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE } from '@/lib/funnels/other-gitas/content'
import { GITAS, GITAS_QUICK, KIND_LABEL } from '@/lib/funnels/other-gitas/gitas'
import { articleLd, breadcrumbLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'gitas-hub'
const PATH = '/gitas'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Gitas beyond the Bhagavad Gita: 20 Gitas and their sources',
  description:
    'Ashtavakra, Avadhuta, Uddhava, Anu, Guru, Ribhu, Devi, Ganesha and other Gitas: where each comes from, who speaks, and what it teaches in one line.',
})

export default function GitasHubPage() {
  const ld = [
    breadcrumbLd([{ name: 'Gitas beyond the Bhagavad Gita', path: PATH }]),
    articleLd({
      path: PATH,
      headline: 'Gitas beyond the Bhagavad Gita',
      description: GITAS_QUICK,
      about: 'Gita literature',
      citation: [
        { '@type': 'CreativeWork', name: 'List of Gitas, sanskritdocuments.org', url: 'https://sanskritdocuments.org/' },
        { '@type': 'CreativeWork', name: 'Mahabharata' },
        { '@type': 'CreativeWork', name: 'Bhagavata Purana' },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Gitas beyond the Bhagavad Gita',
      numberOfItems: GITAS.length,
      itemListElement: GITAS.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.name,
        ...(g.href ? { url: abs(g.href) } : { url: `${abs(PATH)}#${g.slug}` }),
      })),
    },
  ]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main className="fx-main">
        <h1 className="fx-h1">Gitas beyond the Bhagavad Gita</h1>
        <p id="quick-answer" className="fx-quick">
          {GITAS_QUICK}
        </p>
        <hr className="fx-rule" aria-hidden="true" />
        <p className="fx-body">
          Below are twenty of them, with where each one sits, who speaks and what it is about. We say plainly when a text
          is a later anthology or a modern publication, since many are sold or shared as if they came from a Purana.
        </p>

        <ul className="fx-gitas">
          {GITAS.map((g) => (
            <li key={g.slug} id={g.slug}>
              <span className="fx-kind" data-kind={g.kind}>
                {KIND_LABEL[g.kind]}
              </span>
              <h2 className="fx-h3" style={{ margin: '0 0 6px', fontFamily: 'var(--fx-verse)', fontWeight: 500, fontSize: '1.4rem' }}>
                {g.href ? (
                  <a href={g.href} className={g.slug === 'bhagavad' ? 'fx-gita-link' : undefined}>
                    {g.name}
                  </a>
                ) : (
                  g.name
                )}
              </h2>
              <p className="fx-body" style={{ margin: 0 }}>
                {g.gist}
              </p>
              <dl>
                <dt>Source</dt>
                <dd>{g.source}</dd>
                <dt>Speakers</dt>
                <dd>{g.speakers}</dd>
                {g.size && (
                  <>
                    <dt>Length</dt>
                    <dd>{g.size}</dd>
                  </>
                )}
              </dl>
            </li>
          ))}
        </ul>

        <h2 className="fx-h2">Where to begin</h2>
        <p className="fx-body">
          Most readers begin with the{' '}
          <a className="fx-gita-link" href="/gita">
            Bhagavad Gita
          </a>
          , then go to the Uddhava or Anu Gita for more of Krishna, or to the <a href="/ashtavakra-gita">Ashtavakra Gita</a>{' '}
          for the shortest statement of Advaita. Our <a href="/ashtavakra-gita-vs-bhagavad-gita">side-by-side comparison</a>{' '}
          can help you choose.
        </p>

        <NextBand pageKey={PAGE} />

        <section className="fx-sources">
          <h2 className="fx-h3">Sources and method</h2>
          <p>
            Sources, speakers and chapter ranges were checked on 30 October 2026 against the list of Gitas at
            sanskritdocuments.org, Wikipedia&apos;s articles on each text, hindupedia and wisdomlib, and the Mahabharata
            critical edition for the Hamsa Gita. Sizes vary between editions. Where sources disagree, we name both.
          </p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
