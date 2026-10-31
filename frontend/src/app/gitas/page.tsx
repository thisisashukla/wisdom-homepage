import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import PageTracker from '@/components/BlogTracker'
import { GitaBridge, JsonLd, NextStep, PageHero, Section } from '@/components/site'
import { abs } from '@/lib/seo'
import { DISCLOSURE, NEXT_COPY } from '@/lib/funnels/other-gitas/content'
import { GITAS, GITAS_QUICK, KIND_LABEL } from '@/lib/funnels/other-gitas/gitas'
import { articleLd, pageMeta } from '@/lib/funnels/other-gitas/seo'

/** The hero's visual: the names of the Gitas in Devanagari (decorative). */
const NAMES = ['श्रीमद्भगवद्गीता', 'अष्टावक्रगीता', 'अवधूतगीता', 'उद्धवगीता', 'अनुगीता', 'गुरुगीता', 'ऋभुगीता', 'देवीगीता', 'गणेशगीता', 'रामगीता']

const PAGE_KEY = 'gitas-hub'
const PATH = '/gitas'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Gitas beyond the Bhagavad Gita: 20 Gitas and their sources',
  description:
    'Ashtavakra, Avadhuta, Uddhava, Anu, Guru, Ribhu, Devi, Ganesha and other Gitas: where each comes from, who speaks, and what it teaches in one line.',
})

export default function GitasHubPage() {
  const ld = [
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
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Gitas Hub" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[{ label: 'Gitas beyond the Bhagavad Gita', href: PATH }]}
          eyebrow="Gita means song"
          title="Gitas beyond the Bhagavad Gita"
          facts={[`The Bhagavad Gita and ${GITAS.length - 1} more`]}
          actions={[
            { href: '#list', label: 'See all of them', location: 'gitas_hero_list' },
            { href: '/ashtavakra-gita', label: 'Read the Ashtavakra Gita', location: 'gitas_hero_ashtavakra' },
          ]}
          visual={
            <ol className="og-names" lang="sa" aria-hidden="true">
              {NAMES.map((n, i) => (
                <li key={n} style={{ '--o': String(Math.max(0.28, 1 - i * 0.09)) } as CSSProperties}>
                  {n}
                </li>
              ))}
            </ol>
          }
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{GITAS_QUICK}</p>
            <p>
              Below are twenty of them, with where each one sits, who speaks and what it is about. We say plainly when a text
              is a later anthology or a modern publication, since many are sold or shared as if they came from a Purana.
            </p>
          </div>
        </Section>

        <Section id="list" track="gitas_list">
          <ul className="og-gitas" data-stagger="40" aria-label="The Gitas">
            {GITAS.map((g) => (
              <li
                key={g.slug}
                id={g.slug}
                data-kind={g.kind}
                className={`og-gita rv${g.slug === 'bhagavad' ? ' is-feature' : g.href ? ' is-link' : ''}`}
              >
                <span className="og-gita-kind">{KIND_LABEL[g.kind]}</span>
                <h2 className="og-gita-h">
                  {g.href && g.slug === 'bhagavad' ? (
                    <GitaBridge variant="inline" href={g.href} location="gitas_list" label={g.name} />
                  ) : g.href ? (
                    <a href={g.href}>{g.name}</a>
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
        </Section>

        <Section tone="band" track="where_to_begin" title="Where to begin" width="narrow">
          <div className="sx-prose rv">
            <p>
              Most readers begin with the <GitaBridge variant="inline" href="/gita" location="gitas_begin" label="Bhagavad Gita" />
              , then go to the Uddhava or Anu Gita for more of Krishna, or to the <a href="/ashtavakra-gita">Ashtavakra Gita</a>{' '}
              for the shortest statement of Advaita. Our <a href="/ashtavakra-gita-vs-bhagavad-gita">side-by-side comparison</a>{' '}
              can help you choose.
            </p>
          </div>
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT_COPY} />
          </div>
        </Section>

        <Section tone="band" className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>
            Sources, speakers and chapter ranges were checked on 30 October 2026 against the list of Gitas at
            sanskritdocuments.org, Wikipedia&apos;s articles on each text, hindupedia and wisdomlib, and the Mahabharata
            critical edition for the Hamsa Gita. Sizes vary between editions. Where sources disagree, we name both.
          </p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
