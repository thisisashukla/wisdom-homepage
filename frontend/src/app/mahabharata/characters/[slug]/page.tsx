import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Shell from '@/components/funnels/mahabharata/Shell'
import LineCard from '@/components/funnels/mahabharata/LineCard'
import GitaLink from '@/components/funnels/mahabharata/GitaLink'
import ChoiceCard from '@/components/funnels/mahabharata/ChoiceCard'
import Faq from '@/components/funnels/mahabharata/Faq'
import NextBlock from '@/components/funnels/mahabharata/NextBlock'
import { CHARACTERS, characterBySlug } from '@/lib/funnels/mahabharata/characters'
import { person, relationsOf } from '@/lib/funnels/mahabharata/family'
import { line } from '@/lib/funnels/mahabharata/lines'
import { PATHS, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

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
  const page = `mbh-char-${c.slug}`
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
  const ld = graph(
    articleLd({ headline: `${c.name} in the Mahabharata`, description: c.description, path, image: card ? ogImage(card) : undefined, about: c.name }),
    faqLd(c.faq),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATHS.hub },
      { name: c.name, path },
    ]),
  )
  const others = CHARACTERS.filter((x) => x.slug !== c.slug)
  return (
    <Shell page={page} crumbs={[{ label: 'Home', href: '/' }, { label: 'Mahabharata', href: PATHS.hub }, { label: c.name }]} jsonLd={ld}>
      <header className="mb-head">
        <p className="mb-kicker">{p.role}</p>
        <h1>
          {c.h1} <span lang="hi">{p.hi}</span>
        </h1>
        <p id="quick-answer">{c.quickAnswer}</p>
        <ChoiceCard person={c.slug} moment={c.choice.moment} page={page}>
          <LineCard line={line(c.choice.lineId)} page={page} path={path} />
          <p className="mb-choice-plain">{c.choice.plain}</p>
        </ChoiceCard>
        <dl className="mb-lineage" aria-label={`${c.name}'s family`}>
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
        {p.note && <p className="mb-note">{p.note}</p>}
      </header>

      <section className="mb-sec" aria-labelledby="arc-h" data-mp-section="arc">
        <h2 id="arc-h">{c.name}&apos;s story, in {c.beats.length} turns</h2>
        <ol className="mb-arc">
          {c.beats.map((b) => (
            <li key={b.title}>
              <strong>{b.title}</strong>
              <p>
                {b.text} {b.ref && <span className="mb-ref">{b.ref}</span>}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-sec" aria-labelledby="lines-h" data-mp-section="lines">
        <h2 id="lines-h">In {c.name}&apos;s words, and to {c.name}</h2>
        {c.lineIds.map((id) => (
          <LineCard key={id} line={line(id)} page={page} path={path} />
        ))}
      </section>

      <section className="mb-sec" aria-labelledby="gita-h" data-mp-section="gita_bridge">
        <h2 id="gita-h">Where the Gita meets {c.name}</h2>
        <ul className="mb-bridge">
          {c.gita.map((g) => (
            <li key={g.label}>
              <GitaLink href={`/gita/chapter/${g.c}/verse/${g.v}`} from={`char_${c.slug}`} toRef={`${g.c}.${g.v}`} page={page} locale="en">
                {g.label}
              </GitaLink>
              <p>{g.why}</p>
            </li>
          ))}
          <li>
            <GitaLink href={PATHS.gita} from={`char_${c.slug}`} toRef="where-is-the-gita" page={page} locale="en">
              Where the Gita sits in the Mahabharata
            </GitaLink>
            <p>Book six, between the two armies, told by Sanjaya after Bhishma falls.</p>
          </li>
        </ul>
      </section>

      <Faq items={c.faq} heading={`Questions about ${c.name}`} />
      <NextBlock page={page} />

      <section className="mb-sec" aria-labelledby="more-h">
        <h2 id="more-h">More people from the epic</h2>
        <ul className="mb-links">
          {others.map((o) => (
            <li key={o.slug}>
              <a href={PATHS.character(o.slug)}>
                <strong>{o.name}</strong>
                <span>{o.choice.moment}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-sec mb-method" aria-labelledby="method-h">
        <h2 id="method-h">Sources and method</h2>
        <p>
          Lines come from the Sanskrit we hold for books 3, 5, 12, 13 and 14, a southern-recension text whose numbering runs close to the
          Kumbhakonam edition, so verse numbers can differ from the Pune critical edition. Events from books we have yet to add in Sanskrit
          carry no verse number. The English is Wisdom&apos;s own, read with Nilakantha&apos;s commentary, with K. M. Ganguli&apos;s
          public-domain translation consulted.
        </p>
        <p>Wisdom translation, edited by Ankur Shukla.</p>
      </section>
    </Shell>
  )
}
