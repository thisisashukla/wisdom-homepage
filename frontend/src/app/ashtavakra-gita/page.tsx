import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxFaq from '@/components/funnels/other-gitas/FxFaq'
import FxSources from '@/components/funnels/other-gitas/FxSources'
import {
  abs,
  agChapterPath,
  agVersePath,
  getChapters,
  getVerseByKey,
  HUB_PATH,
  TOTAL_VERSES,
} from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, HUB_FAQ, HUB_QUICK, SOURCES_NOTE, START_HERE } from '@/lib/funnels/other-gitas/content'
import { articleLd, breadcrumbLd, cardOg, faqLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'ag-hub'

export const metadata: Metadata = pageMeta({
  path: HUB_PATH,
  title: 'Ashtavakra Gita: all 20 chapters in Sanskrit and English',
  description:
    'All 298 verses of the Ashtavakra Gita, the dialogue of Ashtavakra and King Janaka, in Sanskrit and plain English, with where to start.',
  image: cardOg('ag-1-11'),
})

export default function AshtavakraHubPage() {
  const chapters = getChapters()
  const hero = getVerseByKey('1.11')!
  const famous = FAMOUS.slice(0, 6).map((k) => getVerseByKey(k)!)
  const ld = [
    breadcrumbLd([{ name: 'Ashtavakra Gita', path: HUB_PATH }]),
    articleLd({ path: HUB_PATH, headline: 'Ashtavakra Gita: all 20 chapters in Sanskrit and English', description: HUB_QUICK, about: 'Ashtavakra Gita' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ashtavakra Gita chapters',
      numberOfItems: chapters.length,
      itemListElement: chapters.map((c) => ({
        '@type': 'ListItem',
        position: c.n,
        name: `Chapter ${c.n}: ${c.title}`,
        url: abs(agChapterPath(c.n)),
      })),
    },
    faqLd(HUB_FAQ),
  ]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main>
        <FxHero
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Ashtavakra Gita' }]}
          eyebrow="Ashtavakra and King Janaka"
          title="Ashtavakra Gita"
          facts={['20 chapters', `${TOTAL_VERSES} verses`, 'Sanskrit and plain English']}
          cta={{ href: agChapterPath(1), label: 'Read chapter 1', location: 'ag_hub_hero_chapter_1' }}
          alt={{ href: '#start', label: 'Where to start', location: 'ag_hub_hero_start' }}
          art={
            <section className="og-hero-verse" aria-label="Ashtavakra Gita 1.11">
              <ScriptToggle page={PAGE} />
              <p className="og-hero-ref">
                The line people know, <a href={agVersePath(1, 11)}>1.11</a>, Ashtavakra to Janaka:
              </p>
              <VerseLines verse={hero} />
              <hr className="og-rule" aria-hidden="true" />
            </section>
          }
        />

        <section className="og-intro">
          <div className="wrap">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {HUB_QUICK}
              </p>
              <p>
                The whole text is one conversation. A king who has everything asks how to be free. A young sage, named for the
                eight bends in his body, tells him he already is: he is the witness of body and mind, and bondage is only the
                belief that he is bound. Janaka sees it, and spends the rest of the text testing it against wealth, desire,
                practice and death. There is almost no ritual, no story and no instruction to do anything. That is why some
                readers find it bare, and others carry one line from it for years.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="start">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Where to start</h2>
            </div>
            <ul className="og-rows" data-stagger="60">
              {START_HERE.map((s) => (
                <li key={s.key} className="rv">
                  <a className="og-row" href={agVersePath(Number(s.key.split('.')[0]), Number(s.key.split('.')[1]))}>
                    <span className="og-row-n">{s.key}</span>
                    <span className="og-row-t">
                      <strong className="og-row-h is-quote">{getVerseByKey(s.key)!.en}</strong>
                      <em className="og-row-s">{s.why}</em>
                    </span>
                    <span className="og-row-go" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="og-small">
              Want one a day? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a>.
            </p>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap">
            <div className="og-head rv">
              <h2 className="heading">The lines people quote</h2>
            </div>
            <ul className="og-lines" data-stagger="60">
              {famous.map((x) => (
                <li key={x.id} style={{ display: 'contents' }}>
                  <a className="og-line rv" href={agVersePath(x.c, x.v)}>
                    <span className="og-line-q">{x.en}</span>
                    <span className="og-line-ref">
                      {x.c}.{x.v}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="og-small">
              <a href="/ashtavakra-gita/quotes">All twenty, as cards you can copy or share</a>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="og-head rv">
              <h2 className="heading">The 20 chapters</h2>
              <p className="subtext">
                {TOTAL_VERSES} verses. Janaka asks in 1.1; Ashtavakra teaches most chapters; Janaka answers in chapters 2, 4, 6, 7,
                12, 13, 14, 19 and 20. Chapter titles here are our own plain descriptions.
              </p>
            </div>
            <ol className="og-chapters" data-stagger="40">
              {chapters.map((c) => (
                <li key={c.n} className="rv">
                  <a className="og-ch" href={agChapterPath(c.n)}>
                    <span className="og-ch-n">{c.n}</span>
                    <span>
                      <strong className="og-ch-h">
                        {c.title}
                      </strong>
                      <span className="og-ch-p">
                        {c.gist}
                      </span>
                      <em className="og-ch-m">
                        {c.count} verses
                      </em>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Next to the Bhagavad Gita</h2>
            </div>
            <div className="og-prose rv">
              <p>
                The Bhagavad Gita teaches through a crisis on a battlefield and joins action, devotion and knowledge. The
                Ashtavakra Gita has no crisis and keeps to knowledge alone. Most readers start with the{' '}
                <a className="fx-gita-link" href="/gita">
                  Bhagavad Gita
                </a>
                .{' '}
                <a href="/ashtavakra-gita-vs-bhagavad-gita">Compare the two side by side</a>, or see the{' '}
                <a href="/gitas">other Gitas in Hindu tradition</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Questions people ask</h2>
            </div>
            <FxFaq items={HUB_FAQ} />
          </div>
        </section>

        <NextBand pageKey={PAGE} />

        <FxSources>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
