import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { Actions, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, Section, VerseCard } from '@/components/site'
import LineShare from '@/components/funnels/hanuman-chalisa/LineShare'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import { LineOpenedOnView } from '@/components/funnels/hanuman-chalisa/Trackers'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  anchorId,
  beads,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnitBySlug,
  getUnits,
  HUB_PATH,
  LEARN_PATH,
  linePath,
  NEXT_COPY,
  neighbors,
  START_SITUATION,
  unitVerse,
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
  const path = linePath(u.slug)
  const bridge = GITA_BRIDGES[u.id]
  const source = `Tulsidas, Hanuman Chalisa, ${u.label.en}`
  const pageKey = `hc-line-${u.pos}`

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

  // Sections after the hero alternate grounds; some are only there for some lines.
  let n = 0
  const tone = () => (n++ % 2 === 0 ? 'band' : 'default') as 'band' | 'default'

  const card = (
    <VerseCard
      as="article"
      label={u.label.en}
      toggle
      {...unitVerse(u)}
      meaning={u.meaning.en}
      source={`${source}, Gita Press reading`}
      actions={<LineShare id={u.id} awadhi={u.awadhi} meaning={u.meaning.en} source={source} path={path} cardId={u.cardId} audioSrc={u.audio} pageKey={pageKey} locale="en" />}
    >
      <h2 className="hc-gloss-h" id="hc-words-h">
        Word by word
      </h2>
      <dl className="hc-gloss" aria-labelledby="hc-words-h">
        {u.words.map((w, i) => (
          <div className="hc-gloss-row" key={`${w.w}-${i}`}>
            <dt className="sx-deva" lang="awa">
              {w.w}
            </dt>
            <dt className="sx-iast" lang="awa-Latn">
              {w.iast}
            </dt>
            <dd>{w.gloss}</dd>
          </div>
        ))}
      </dl>
    </VerseCard>
  )

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Line" />
      <LineOpenedOnView line={u.id} />
      <JsonLd data={quoteLd} />

      <PageHero
        className="hc-line-hero"
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: u.label.en, href: path },
        ]}
        eyebrow={`Hanuman Chalisa, ${u.label.en}`}
        title={<>Meaning of &ldquo;{u.iast[0]}&rdquo;</>}
        sub={<span id="quick-answer">{u.quick}</span>}
        actions={[
          next
            ? { href: linePath(next.slug), label: `Next: ${next.label.en}`, location: 'hero_next' }
            : { href: HUB_PATH, label: 'Read the whole Chalisa', location: 'hero_hub' },
        ]}
        below={card}
        visual={
          <div className="hc-line-mala">
            <Mala beads={beads('en', 'page')} locale="en" mode="page" currentId={u.id} label="Mala of 43 beads, one for each line" caption="Tap a bead to open that line.">
              <span className="hc-mala-big">{u.pos}</span>
              <span className="hc-mala-sub">of 43</span>
            </Mala>
          </div>
        }
      />

      <Section id="hc-ram" tone={tone()} title="Where this happens in the Ramayana">
        {u.ramayana ? (
          <>
            <p className="sx-prose rv">{u.ramayana.en}</p>
            <div className="hc-refs">
              {u.ramayana.refs.map((r) =>
                r.text ? (
                  <VerseCard
                    key={r.id}
                    size="compact"
                    align="left"
                    lang={r.id.startsWith('vr') ? 'sa' : 'awa'}
                    original={r.text.match(/[^।॥]+[।॥]*/gu) ?? [r.text]}
                    source={r.label}
                    rv
                  />
                ) : (
                  <p className="hc-ref-label" key={r.id}>
                    {r.label}
                  </p>
                ),
              )}
            </div>
          </>
        ) : (
          <p className="sx-prose rv">
            This line praises Hanuman or speaks to the reader. It does not retell one episode, so there is no single place in the Ramayana to
            point to.
          </p>
        )}
      </Section>

      {u.variants.length > 0 && (
        <Section id="hc-var" tone={tone()} title="Other readings">
          <ul className="hc-variants rv">
            {u.variants.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </Section>
      )}

      {bridge && (
        <Section id="hc-gita" tone={tone()} eyebrow="The thread to the Gita" title="The same thought in the Gita">
          <GitaBridge href={bridge.href} label={`Read ${bridge.label}`} why={bridge.why} location="line_gita_bridge" from={u.id} className="rv" />
        </Section>
      )}

      <Section tone={tone()}>
        <nav aria-label="Previous and next line">
          <LinkCards
            items={[
              ...(prev ? [{ href: linePath(prev.slug), title: `Previous, ${prev.label.en}`, orig: prev.awadhi[0].replace(/\s*[।॥]\s*$/, ''), location: 'line_prev' }] : []),
              ...(next ? [{ href: linePath(next.slug), title: `Next, ${next.label.en}`, orig: next.awadhi[0].replace(/\s*[।॥]\s*$/, ''), location: 'line_next' }] : []),
            ]}
          />
        </nav>
        <Actions
          className="hc-gap rv"
          items={[
            { href: `${HUB_PATH}#${anchorId(u.id)}`, label: 'See it in the full text', location: 'line_hub', variant: 'secondary' },
            { href: LEARN_PATH, label: 'Learn it by heart', location: 'line_learn', variant: 'secondary' },
            { href: COUNTER_PATH, label: 'Count recitations', location: 'line_counter', variant: 'secondary' },
          ]}
        />
      </Section>

      <Section tone={tone()} className="hc-next">
        <NextStep locale="en" pageKey={pageKey} placement="line_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />

        <section className="hc-sources" aria-labelledby="hc-src-h">
          <h2 className="sx-h3" id="hc-src-h">
            Sources and method
          </h2>
          <p className="hc-small">
            Awadhi text: Goswami Tulsidas, Gita Press reading, checked against three Gita Press printings and Rambhadracharya&apos;s
            Mahaviri. English meaning and word glosses: Wisdom&apos;s own, following the traditional reading, edited by Ankur Shukla.
          </p>
        </section>
      </Section>
    </main>
  )
}
