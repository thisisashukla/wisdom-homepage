import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, PageHero, Section, VerseList, type LinkCard } from '@/components/site'
import ExploreVerse, { Why } from '@/components/explore/ExploreVerse'
import Reflect from '@/components/explore/Reflect'
import { loadState, stateHref, verseCardProps, type StateData, type StateIndexItem, type StateMini, type VerseData } from '@/lib/explore'
import { EVENTS } from '@/lib/analytics/events'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD, type FaqItem } from '@/lib/seo'
import INDEX from '@/content/explore/index.json'
import '@/components/explore/explore.css'

const STATES = INDEX as StateIndexItem[]
const BY_SLUG = new Map(STATES.map((s) => [s.slug, s]))
const BY_ID = new Map(STATES.map((s) => [s.id, s]))
const UPDATED = '2026-11-14'

export const dynamicParams = false
export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }))
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)
const titleCase = (s: string) => s.split(' ').map((w) => (['a', 'of', 'the'].includes(w) ? w : cap(w))).join(' ')
const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)

function titleOf(s: StateIndexItem) {
  return `What the Scriptures Say About ${titleCase(s.en)} (${cap(s.iast)})`
}
function descOf(s: StateIndexItem, d?: StateData) {
  const n = d ? `${d.counts.verses} verses in the original, with their meaning` : 'verses in the original, with their meaning'
  return `${s.modern}. How the Gita, the Ramayana, the Upanishads and other texts name ${s.en}, what feeds it and what heals it: ${n}, and the people who lived it.`
}

export async function generateMetadata({ params }: { params: { state: string } }) {
  const s = BY_SLUG.get(params.state)
  if (!s) return {}
  const d = await loadState(s.id)
  return pageMeta({ title: titleOf(s), description: descOf(s, d), path: stateHref(s.slug) })
}

function answerOf(d: StateData): string {
  const base = `The texts call it ${d.iast} (${d.deva}). ${d.gloss ?? `${d.modern}.`}`
  if (d.val === 'afflictive' && d.healed_by.length) return `${base} They set ${list(d.healed_by.slice(0, 3).map((m) => m.en))} against it.`
  if (d.val !== 'afflictive' && d.heals_what.length) return `${base} They set it against ${list(d.heals_what.slice(0, 3).map((m) => m.en))}.`
  return base
}

function faqOf(d: StateData): FaqItem[] {
  const out: FaqItem[] = [{ q: `What is the Sanskrit word for ${d.en}?`, a: `${cap(d.iast)} (${d.deva}). ${d.modern}.` }]
  const gita = [...d.loci, ...d.depicts, ...d.heals, ...d.practices].find((v) => v.g && v.m)
  if (gita) out.push({ q: `Which Bhagavad Gita verse speaks about ${d.en}?`, a: `${gita.r}: ${gita.m}` })
  if (d.val === 'afflictive' && d.healed_by.length) {
    const why = d.antidotes.filter((a) => a.why).slice(0, 2).map((a) => `${a.why} (${a.source})`)
    out.push({ q: `How do the scriptures say to overcome ${d.en}?`, a: `They set ${list(d.healed_by.slice(0, 3).map((m) => m.en))} against it. ${why.join(' ')}`.trim() })
  }
  return out
}

function Verses({ items }: { items: VerseData[] }) {
  if (!items.length) return null
  return (
    <VerseList columns={2}>
      {items.map((v) => (
        <ExploreVerse key={v.id} v={v} as="li" rv />
      ))}
    </VerseList>
  )
}

function StateLink({ m, here }: { m: { s: string; en: string; slug?: string }; here?: boolean }) {
  const slug = m.slug ?? BY_ID.get(m.s)?.slug
  if (here || !slug) return <span>{cap(m.en)}</span>
  return (
    <a href={stateHref(slug)} data-mp-location="state_chain" data-mp-event="State Opened" data-mp-props={JSON.stringify({ item_id: m.s })}>
      {cap(m.en)}
    </a>
  )
}

export default async function Page({ params }: { params: { state: string } }) {
  const s = BY_SLUG.get(params.state)
  if (!s) notFound()
  const d = await loadState(s.id)
  const path = stateHref(d.slug)
  const name = cap(d.en)
  const hurt = d.val === 'afflictive'
  const faq = faqOf(d)

  const rel = new Map<string, { m: StateMini; body: string }>()
  const addRel = (ms: StateMini[], body: (m: StateMini) => string) => ms.forEach((m) => !rel.has(m.s) && m.s !== d.id && rel.set(m.s, { m, body: body(m) }))
  addRel(d.healed_by, () => `Heals ${d.en}`)
  addRel(d.heals_what, () => `Eased by ${d.en}`)
  addRel(d.feeds, () => `Feeds ${d.en}`)
  addRel(d.leads, () => `Grows out of ${d.en}`)
  const neighbours: LinkCard[] = Array.from(rel.values()).slice(0, 9).map(({ m, body }) => ({
    href: stateHref(m.slug),
    title: cap(m.en),
    orig: BY_ID.get(m.s)?.deva,
    body,
    location: 'state_neighbour',
    event: EVENTS.StateOpened,
    eventProps: { item_id: m.s },
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titleOf(s),
    description: descOf(s, d),
    url: abs(path),
    mainEntityOfPage: abs(path),
    dateModified: UPDATED,
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    about: { '@type': 'DefinedTerm', name: d.iast, alternateName: [d.deva, d.en], description: d.modern },
    isPartOf: { '@type': 'CollectionPage', name: 'Map of the mind', url: abs('/explore') },
  }

  const practiceTitle = hurt ? `Practices that grow ${list(d.practice_toward.map((m) => m.en))}` : `Practices that grow ${d.en}`

  return (
    <>
      <PageTracker pageName="Explore State" />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[
          { label: 'Map of the mind', href: '/explore' },
          { label: name, href: path },
        ]}
        title={`What the scriptures say about ${d.en}`}
        answer={{ question: `What do the scriptures say about ${d.en}?`, answer: answerOf(d) }}
        facts={[`${d.counts.verses} verses`, `${d.counts.stories} stories`, hurt ? 'Weighs on the mind' : d.val === 'healing' ? 'Heals the mind' : 'Where questions begin']}
        actions={[
          { href: '#own-words', label: 'Read the verses', location: 'state_hero_verses' },
          { href: `/explore?s=${d.id}`, label: 'Find it on the map', location: 'state_hero_map' },
        ]}
        verse={d.hero ? verseCardProps(d.hero) : undefined}
      />

      {(d.depicts.length > 0 || d.loci.length > 0) && (
        <Section
          id="own-words"
          title={`${name} in the texts' own words`}
          intro={hurt ? 'Someone in the verse is in it, or the text names it outright. Many readers find their own day here.' : 'Verses that show it in a person, or name it outright.'}
        >
          <Verses items={[...d.depicts, ...d.loci].slice(0, 10)} />
        </Section>
      )}

      {d.chains.length > 0 && (
        <Section id="steps" tone="band" title={hurt ? 'What feeds it, step by step' : 'How it grows, step by step'} intro="Sequences the texts state outright, in their own order.">
          {d.chains.map((c) => (
            <article key={c.id} className="ex-chain rv">
              <div className="ex-chain-head">
                <h3 className="ex-chain-title">{c.title}</h3>
                <span className="ex-chain-ref">{c.refs.join('; ')}</span>
              </div>
              <ol className="ex-steps">
                {c.steps.map((st, i) => (
                  <li key={i} className={`ex-step${i === c.at ? ' is-here' : ''}`}>
                    {st.s ? <StateLink m={{ s: st.s, en: st.en ?? st.s }} here={i === c.at} /> : <span className="ex-step-c">{st.en ?? st.c}</span>}
                  </li>
                ))}
              </ol>
              {c.summary && <p className="ex-chain-summary">{c.summary}</p>}
              <VerseList columns={c.verses.length > 1 ? 2 : 1}>
                {c.verses.map((v) => (
                  <ExploreVerse key={v.id} v={v} as="li" />
                ))}
              </VerseList>
            </article>
          ))}
        </Section>
      )}

      {hurt && (d.antidotes.length > 0 || d.heals.length > 0) && (
        <Section id="heals" title="What heals it" intro="What the texts set against it, and the verses that give footing.">
          {d.antidotes.length > 0 && (
            <ul className="ex-antidotes" data-stagger="60">
              {d.antidotes.map((a, i) => (
                <li key={i} className="ex-antidote rv">
                  <p className="ex-antidote-to">
                    {a.s ? <StateLink m={{ s: a.s, en: a.en ?? a.s }} /> : <span>{cap(a.en ?? a.c ?? '')}</span>}
                    {(a.iast || (a.en && a.c)) && <span className="ex-iast">{a.iast ?? a.c}</span>}
                  </p>
                  <Why text={a.why} prov={a.p} />
                  <p className="ex-antidote-src">{a.source}</p>
                </li>
              ))}
            </ul>
          )}
          <Verses items={d.heals} />
        </Section>
      )}

      {!hurt && d.heals_what.length > 0 && (
        <Section id="heals" title="What it heals" intro="The states the texts set it against.">
          <div className="ex-names">
            {d.heals_what.map((m) => (
              <a key={m.s} className="sx-chip" href={stateHref(m.slug)} data-mp-location="state_heals_what">
                {cap(m.en)}
              </a>
            ))}
          </div>
        </Section>
      )}

      {d.practices.length > 0 && (
        <Section id="practice" tone="band" title={practiceTitle} intro="Verses that give something to do, today or in the hard moment.">
          <Verses items={d.practices} />
        </Section>
      )}

      {d.stories.length > 0 && (
        <Section id="lived" title="People who lived it" intro={hurt ? 'Someone in the scriptures went through this, and the story shows what turned.' : 'Someone in the scriptures came to this, and the story shows how.'}>
          <ul className="ex-stories" data-stagger="60">
            {d.stories.map((st) => (
              <li key={st.id} className="ex-story rv">
                <p className="ex-story-k">From the {st.grp}</p>
                <h3 className="ex-story-t">{st.t}</h3>
                <p className="ex-story-summary">{st.s}</p>
                {st.l && <p className="ex-story-lesson">{st.l}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="reflect" tone="band" width="narrow" title="Is this where you are?" intro="Write a line about today. Your words find their place on the map, with a verse for each.">
        <Reflect compact placement="state_reflect" id="state-reflect" />
      </Section>

      {neighbours.length > 0 && (
        <Section id="nearby" title="Nearby on the map">
          <LinkCards items={neighbours} columns={3} />
          <p className="ex-after">
            <a className="sx-btn" href={`/explore?s=${d.id}`} data-mp-location="state_nearby_map">
              See {d.en} on the whole map
            </a>
          </p>
        </Section>
      )}

      <Section id="faq" tone="band" width="narrow" title="Questions people ask">
        <Faq items={faq} />
      </Section>

      <Section id="how" width="narrow" spacing="tight">
        <div className="ex-sources">
          <p>
            Verses, translations and stories come from the Wisdom library, read with the traditional commentaries. A line marked <em>stated in the text</em> is a
            link the verse or a named commentator makes; <em>our reading</em> is Wisdom&apos;s own reading of the verse.
          </p>
        </div>
      </Section>
    </>
  )
}
