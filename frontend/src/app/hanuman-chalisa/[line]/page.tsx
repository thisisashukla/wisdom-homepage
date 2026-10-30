import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import LineText from '@/components/funnels/hanuman-chalisa/LineText'
import LineShare from '@/components/funnels/hanuman-chalisa/LineShare'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { LineOpenedOnView } from '@/components/funnels/hanuman-chalisa/Trackers'
import { HcNextStep } from '@/components/funnels/hanuman-chalisa/Blocks'
import {
  abs,
  AUTHOR_LD,
  beads,
  breadcrumbLd,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnitBySlug,
  getUnits,
  HUB_PATH,
  LEARN_PATH,
  ldJson,
  linePath,
  neighbors,
  pageMeta,
  PUBLISHER_LD,
  UPDATED,
  type HcUnit,
} from '@/lib/funnels/hanuman-chalisa'

type Params = { line: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getUnits().map((u) => ({ line: u.slug }))
}

/** Lines with a real bridge to a Gita verse, and why. */
const GITA_BRIDGES: Record<string, { href: string; label: string; why: string }> = {
  'hc.d1': {
    href: '/gita/chapter/4/verse/34',
    label: 'Bhagavad Gita 4.34',
    why: 'Krishna tells Arjuna to learn from those who know by bowing to them, asking, and serving them. The Chalisa starts in the same place, at the guru\'s feet.',
  },
  'hc.c22': {
    href: '/gita/chapter/18/verse/66',
    label: 'Bhagavad Gita 18.66',
    why: 'Krishna\'s last word on refuge: give up every other support, take refuge in me alone, and do not grieve.',
  },
  'hc.c33': {
    href: '/gita/chapter/7/verse/19',
    label: 'Bhagavad Gita 7.19',
    why: 'Krishna says that after many births the one who knows comes to him, seeing that everything is Vasudeva.',
  },
  'hc.c34': {
    href: '/gita/chapter/8/verse/5',
    label: 'Bhagavad Gita 8.5',
    why: 'Krishna says that whoever leaves the body remembering him at the end comes to him.',
  },
}

const phraseOf = (u: HcUnit) =>
  u.slug
    .replace(/^(doha-\d-|closing-doha-|\d+-)/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

function titleFor(u: HcUnit): string {
  const p = phraseOf(u)
  const n = u.kind === 'chaupai' ? `Chaupai ${u.n}` : u.label.en
  const tries = [`${p} Meaning | Hanuman Chalisa ${n}`, `${p} Meaning, Chalisa ${n}`, `${p} Meaning | Hanuman Chalisa`, `${p} Meaning`]
  return tries.find((t) => t.length <= 60) ?? tries[tries.length - 1]
}

function descFor(u: HcUnit): string {
  const lead = `"${u.iast[0]}" (Hanuman Chalisa, ${u.label.en}) means: `
  const tail = ' Word by word, with the Awadhi.'
  const room = 155 - lead.length - tail.length
  let m = u.meaning.en
  if (m.length > room) {
    const cut = m.slice(0, room)
    m = cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '.'
  }
  const d = `${lead}${m}${tail}`
  return d.length <= 155 ? d : `${lead}${m}`.slice(0, 155)
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const u = getUnitBySlug(params.line)
  if (!u) return { title: 'Line not found', robots: { index: false } }
  return pageMeta({
    title: titleFor(u),
    description: descFor(u),
    path: linePath(u.slug),
    ogImage: u.cardId ? cardOg(u.cardId) : undefined,
  })
}

export default function ChalisaLinePage({ params }: { params: Params }) {
  const u = getUnitBySlug(params.line)
  if (!u) notFound()
  const { prev, next } = neighbors(u)
  const page = 'hanuman-chalisa-line'
  const path = linePath(u.slug)
  const bridge = GITA_BRIDGES[u.id]
  const source = `Tulsidas, Hanuman Chalisa, ${u.label.en}`

  const quoteLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    '@id': `${abs(path)}#line`,
    text: `${u.awadhi[0]} ${u.awadhi[1]}`,
    inLanguage: 'awa',
    creator: { '@type': 'Person', name: 'Goswami Tulsidas' },
    isPartOf: chalisaWorkLd,
    citation: editionCitation,
    position: u.pos,
    url: abs(path),
    workTranslation: {
      '@type': 'CreativeWork',
      text: u.meaning.en,
      inLanguage: 'en',
      author: AUTHOR_LD,
      publisher: PUBLISHER_LD,
      dateModified: UPDATED,
    },
    ...(u.cardId ? { image: cardOg(u.cardId) } : {}),
  }
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'Hanuman Chalisa', path: HUB_PATH },
    { name: u.label.en, path },
  ])

  return (
    <main className="hc-main">
      <BlogTracker pageName={page} />
      <LineOpenedOnView line={u.id} page={page} locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([quoteLd, crumbs]) }} />

      <nav className="hc-crumbs" aria-label="Breadcrumb">
        <a href="/">Wisdom</a> / <a href={HUB_PATH}>Hanuman Chalisa</a> / <span>{u.label.en}</span>
      </nav>

      <div className="hc-intro">
        <p className="hc-unit-label">Hanuman Chalisa, {u.label.en}</p>
        <h1 className="hc-h1">Meaning of &ldquo;{u.iast[0]}&rdquo;</h1>
        <p className="hc-quick" id="quick-answer">
          {u.quick}
        </p>
      </div>

      <div className="hc-hub">
        <div>
          <div className="hc-controls">
            <ScriptToggle locale="en" page={page} />
          </div>

          <article className="hc-hero" aria-label={`${u.label.en}, Awadhi and meaning`}>
            <LineText awadhi={u.awadhi} iast={u.iast} as="blockquote" className="hc-line" />
            <p className="hc-hero-meaning">{u.meaning.en}</p>
            <p className="hc-hero-src">{source}, Gita Press reading</p>
            {u.audio && (
              <audio className="hc-audio" controls preload="none" src={u.audio}>
                <track kind="captions" />
              </audio>
            )}
            <LineShare id={u.id} awadhi={u.awadhi} meaning={u.meaning.en} source={source} path={path} cardId={u.cardId} page={page} locale="en" />
          </article>

          <section className="hc-section" aria-labelledby="hc-words-h">
            <h2 className="hc-h2" id="hc-words-h">
              Word by word
            </h2>
            <dl className="hc-gloss">
              {u.words.map((w, i) => (
                <div className="hc-gloss-row" key={`${w.w}-${i}`}>
                  <dt>
                    <span className="hc-deva" lang="hi">
                      {w.w}
                    </span>
                    <span className="hc-iast" lang="hi-Latn">
                      {w.iast}
                    </span>
                  </dt>
                  <dd>{w.gloss}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="hc-section" aria-labelledby="hc-ram-h">
            <h2 className="hc-h2" id="hc-ram-h">
              Where this happens in the Ramayana
            </h2>
            {u.ramayana ? (
              <div className="hc-prose">
                <p>{u.ramayana.en}</p>
                {u.ramayana.refs.map((r) => (
                  <div className="hc-ref" key={r.id}>
                    {r.text && (
                      <p className="hc-ref-text" lang={r.id.startsWith('vr') ? 'sa' : 'hi'}>
                        {r.text}
                      </p>
                    )}
                    <p className="hc-ref-label">{r.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="hc-prose">
                <p>
                  This line praises Hanuman or speaks to the reader. It does not retell one episode, so there is no single place in the
                  Ramayana to point to.
                </p>
              </div>
            )}
          </section>

          {u.variants.length > 0 && (
            <section className="hc-section" aria-labelledby="hc-var-h">
              <h2 className="hc-h2" id="hc-var-h">
                Other readings
              </h2>
              <ul className="hc-variants">
                {u.variants.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </section>
          )}

          {bridge && (
            <section className="hc-section" aria-labelledby="hc-gita-h">
              <h2 className="hc-h2" id="hc-gita-h">
                The same thought in the Gita
              </h2>
              <div className="hc-prose">
                <p>
                  {bridge.why}{' '}
                  <a className="hc-gita" href={bridge.href} data-mp-location="line_gita_bridge">
                    Read {bridge.label}
                  </a>
                </p>
              </div>
            </section>
          )}

          <nav className="hc-pager" aria-label="Previous and next line">
            {prev && (
              <a href={linePath(prev.slug)} rel="prev" data-mp-location="line_prev">
                <small>Previous, {prev.label.en}</small>
                <span lang="hi">{prev.awadhi[0].replace(/\s*[।॥]\s*$/, '')}</span>
              </a>
            )}
            {next && (
              <a href={linePath(next.slug)} rel="next" className="hc-next" data-mp-location="line_next">
                <small>Next, {next.label.en}</small>
                <span lang="hi">{next.awadhi[0].replace(/\s*[।॥]\s*$/, '')}</span>
              </a>
            )}
          </nav>

          <ul className="hc-links">
            <li>
              <a className="hc-btn" href={`${HUB_PATH}#${u.id.replace('.', '-')}`} data-mp-location="line_hub">
                See it in the full text
              </a>
            </li>
            <li>
              <a className="hc-btn" href={LEARN_PATH} data-mp-location="line_learn">
                Learn it by heart
              </a>
            </li>
            <li>
              <a className="hc-btn" href={COUNTER_PATH} data-mp-location="line_counter">
                Count recitations
              </a>
            </li>
          </ul>

          <HcNextStep locale="en" pageName={page} pageKey={`hc-line-${u.pos}`} placement="line_end" />

          <section className="hc-section" aria-labelledby="hc-src-h">
            <h2 className="hc-h2" id="hc-src-h">
              Sources and method
            </h2>
            <p className="hc-small">
              Awadhi text: Goswami Tulsidas, Gita Press reading, checked against three Gita Press printings and Rambhadracharya&apos;s
              Mahaviri. English meaning and word glosses: Wisdom&apos;s own, following the traditional reading, edited by Ankur Shukla.
            </p>
          </section>
        </div>
        <aside className="hc-hub-aside hc-aside-end" aria-label="Mala: one bead for each line">
          <Mala
            beads={beads('en', 'page')}
            locale="en"
            page={page}
            mode="page"
            currentId={u.id}
            label="Mala of 43 beads, one for each line"
            caption="Tap a bead to open that line."
          >
            <span className="hc-mala-big">{u.pos}</span>
            <span className="hc-mala-sub">of 43</span>
          </Mala>
        </aside>
      </div>
    </main>
  )
}
