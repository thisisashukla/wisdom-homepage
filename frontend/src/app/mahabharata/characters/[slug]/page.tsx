import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, Section, VerseList } from '@/components/site'
import Line from '@/components/funnels/mahabharata/Line'
import ChoiceCard from '@/components/funnels/mahabharata/ChoiceCard'
import { CHARACTERS, characterBySlug } from '@/lib/funnels/mahabharata/characters'
import { person, relationsOf } from '@/lib/funnels/mahabharata/family'
import { heroVerseOf, line } from '@/lib/funnels/mahabharata/lines'
import { NEXT } from '@/lib/funnels/mahabharata/next'
import { PATHS, articleLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'
import '@/components/funnels/mahabharata/mbh.css'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return CHARACTERS.map((c) => ({ slug: c.slug }))
}

const cardFor = (lineIds: string[]): string | undefined => lineIds.map((id) => line(id).cardId).find(Boolean) ?? undefined

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = characterBySlug(params.slug)
  if (!c) return {}
  return meta({ title: c.title, description: c.description, path: PATHS.character(c.slug), cardId: cardFor([c.choice.lineId, ...c.lineIds]) })
}

export default function Page({ params }: { params: Params }) {
  const c = characterBySlug(params.slug)
  if (!c) notFound()
  const path = PATHS.character(c.slug)
  const pageKey = `mbh-char-${c.slug}`
  const p = person(c.personId)
  const rel = relationsOf(c.personId)
  const names = (ids: string[]) =>
    ids.map((id, i) => {
      const q = person(id)
      return (
        <span key={id}>
          {q.page ? <a href={PATHS.character(q.page)}>{q.name}</a> : q.name}
          {i < ids.length - 1 ? ', ' : ''}
        </span>
      )
    })
  const card = cardFor([c.choice.lineId, ...c.lineIds])
  const ld = graph(articleLd({ headline: `${c.name} in the Mahabharata`, description: c.description, path, image: card ? ogImage(card) : undefined, about: c.name }))
  const others = CHARACTERS.filter((x) => x.slug !== c.slug)
  const side = p.side === 'pandava' ? 'Pandava side' : p.side === 'kaurava' ? 'Kaurava side' : 'not fighting'
  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Mahabharata Character" />
      <main className="fx-mbh" lang="en">
        <PageHero
          crumbs={[
            { label: 'Mahabharata', href: PATHS.hub },
            { label: c.name, href: path },
          ]}
          eyebrow="People of the Mahabharata"
          title={
            <>
              {c.h1} <span lang="hi" className="mb-h1-hi">{p.hi}</span>
            </>
          }
          sub={p.role}
          facts={[`${c.beats.length} turns in the story`, `${c.lineIds.length} lines in Sanskrit`, `On Day 1: ${side}`]}
          actions={[{ href: '#choice', label: <>Read {c.name}&apos;s choice</>, location: 'char_hero_choice' }]}
          verse={heroVerseOf(c.heroLineId)}
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{c.quickAnswer}</p>
          </div>
          <div className="mb-stack">
            <ChoiceCard person={c.slug} moment={c.choice.moment}>
              <Line line={line(c.choice.lineId)} path={path} pageKey={pageKey} />
              <p className="mb-choice-plain">{c.choice.plain}</p>
            </ChoiceCard>
            <dl className="mb-lineage rv" aria-label={`${c.name}'s family`}>
              {rel.parents.length > 0 && (
                <div>
                  <dt>Parents</dt>
                  <dd>{names(rel.parents)}</dd>
                </div>
              )}
              {rel.spouses.length > 0 && (
                <div>
                  <dt>Married to</dt>
                  <dd>{names(rel.spouses)}</dd>
                </div>
              )}
              {rel.children.length > 0 && (
                <div>
                  <dt>Children</dt>
                  <dd>{names(rel.children)}</dd>
                </div>
              )}
              <div>
                <dt>On Day 1</dt>
                <dd>{p.sideNote ?? (p.side === 'pandava' ? 'Pandava side' : p.side === 'kaurava' ? 'Kaurava side' : 'Not fighting')}</dd>
              </div>
              <div>
                <dd>
                  <a href={`${PATHS.hub}?person=${p.id}#tree`} data-mp-location="lineage_tree">
                    Pull {c.name}&apos;s thread in the family tree
                  </a>
                </dd>
              </div>
            </dl>
            {p.note && <p className="mb-note rv">{p.note}</p>}
          </div>
        </Section>

        <Section tone="band" track="arc" title={<>{c.name}&apos;s story, in {c.beats.length} turns</>} width="narrow">
          <ol className="mb-arc" data-stagger="60">
            {c.beats.map((b) => (
              <li key={b.title} className="rv">
                <strong>{b.title}</strong>
                <p>
                  {b.text} {b.ref && <span className="mb-ref">{b.ref}</span>}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section track="lines" title={<>In {c.name}&apos;s words, and to {c.name}</>} width="narrow">
          <VerseList>
            {c.lineIds.map((id) => (
              <Line key={id} as="li" line={line(id)} path={path} pageKey={pageKey} />
            ))}
          </VerseList>
        </Section>

        <Section tone="band" track="gita_bridge" title={<>Where the Gita meets {c.name}</>} width="narrow">
          <ul className="mb-bridges" data-stagger="60">
            {c.gita.map((g) => (
              <li key={g.label} className="rv">
                <GitaBridge href={`/gita/chapter/${g.c}/verse/${g.v}`} location={`char_${c.slug}`} label={g.label} why={g.why} />
              </li>
            ))}
            <li className="rv">
              <GitaBridge
                href={PATHS.gita}
                location={`char_${c.slug}`}
                label="Where the Gita sits in the Mahabharata"
                why="Book six, between the two armies, told by Sanjaya after Bhishma falls."
              />
            </li>
          </ul>
        </Section>

        <Section track="faq" title={`Questions about ${c.name}`} width="narrow">
          <Faq items={c.faq} />
        </Section>

        <Section tone="band" track="next_step" title={NEXT.en.head} width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={pageKey} placement="end" copy={NEXT.en.copy} />
          </div>
        </Section>

        <Section track="more_people" title="More people from the epic">
          <LinkCards columns={3} items={others.map((o) => ({ href: PATHS.character(o.slug), title: o.name, body: o.choice.moment, location: 'char_more_people' }))} />
        </Section>

        <Section tone="band" className="mb-method" title="Sources and method" width="narrow">
          <p>
            Lines come from the Sanskrit we hold for books 3, 5, 12, 13 and 14, a southern-recension text whose numbering runs close to the
            Kumbhakonam edition, so verse numbers can differ from the Pune critical edition. Events from books we have yet to add in Sanskrit
            carry no verse number. The English is Wisdom&apos;s own, read with Nilakantha&apos;s commentary, with K. M. Ganguli&apos;s
            public-domain translation consulted.
          </p>
          <p>Wisdom translation, edited by Ankur Shukla.</p>
        </Section>
      </main>
    </>
  )
}
