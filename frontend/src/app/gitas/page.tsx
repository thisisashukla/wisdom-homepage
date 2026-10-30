import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxSources from '@/components/funnels/other-gitas/FxSources'
import { abs } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE } from '@/lib/funnels/other-gitas/content'
import { GITAS, GITAS_QUICK, KIND_LABEL } from '@/lib/funnels/other-gitas/gitas'
import { articleLd, breadcrumbLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

/** The hero's visual: the names of the Gitas in Devanagari (decorative). */
const NAMES = ['श्रीमद्भगवद्गीता', 'अष्टावक्रगीता', 'अवधूतगीता', 'उद्धवगीता', 'अनुगीता', 'गुरुगीता', 'ऋभुगीता', 'देवीगीता', 'गणेशगीता', 'रामगीता']

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
      <main>
        <FxHero
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Gitas beyond the Bhagavad Gita' }]}
          eyebrow="Gita means song"
          title="Gitas beyond the Bhagavad Gita"
          facts={[`The Bhagavad Gita and ${GITAS.length - 1} more`, 'Source and speakers for each', 'Later and modern works marked']}
          cta={{ href: '#list', label: 'See all of them', location: 'gitas_hero_list' }}
          alt={{ href: '/ashtavakra-gita', label: 'Read the Ashtavakra Gita', location: 'gitas_hero_ashtavakra' }}
          art={
            <ol className="og-names" lang="sa" aria-hidden="true">
              {NAMES.map((n, i) => (
                <li key={n} style={{ '--o': String(Math.max(0.28, 1 - i * 0.09)) } as CSSProperties}>
                  {n}
                </li>
              ))}
            </ol>
          }
        />

        <section className="og-intro">
          <div className="wrap og-col">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {GITAS_QUICK}
              </p>
              <p>
                Below are twenty of them, with where each one sits, who speaks and what it is about. We say plainly when a text
                is a later anthology or a modern publication, since many are sold or shared as if they came from a Purana.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="list" aria-label="The Gitas">
          <div className="wrap">
            <ul className="og-gitas" data-stagger="40">
              {GITAS.map((g) => (
                <li
                  key={g.slug}
                  id={g.slug}
                  data-kind={g.kind}
                  className={`og-gita rv${g.slug === 'bhagavad' ? ' is-feature' : g.href ? ' is-link' : ''}`}
                >
                  <span className="og-gita-kind">{KIND_LABEL[g.kind]}</span>
                  <h2 className="og-gita-h">
                    {g.href ? (
                      <a href={g.href} className={g.slug === 'bhagavad' ? 'fx-gita-link' : undefined}>
                        {g.name}
                      </a>
                    ) : (
                      g.name
                    )}
                  </h2>
                  <p className="og-gita-gist">{g.gist}</p>
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
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Where to begin</h2>
            </div>
            <div className="og-prose rv">
              <p>
                Most readers begin with the{' '}
                <a className="fx-gita-link" href="/gita">
                  Bhagavad Gita
                </a>
                , then go to the Uddhava or Anu Gita for more of Krishna, or to the <a href="/ashtavakra-gita">Ashtavakra Gita</a>{' '}
                for the shortest statement of Advaita. Our <a href="/ashtavakra-gita-vs-bhagavad-gita">side-by-side comparison</a>{' '}
                can help you choose.
              </p>
            </div>
          </div>
        </section>

        <NextBand pageKey={PAGE} />

        <FxSources>
          <p>
            Sources, speakers and chapter ranges were checked on 30 October 2026 against the list of Gitas at
            sanskritdocuments.org, Wikipedia&apos;s articles on each text, hindupedia and wisdomlib, and the Mahabharata
            critical edition for the Hamsa Gita. Sizes vary between editions. Where sources disagree, we name both.
          </p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
