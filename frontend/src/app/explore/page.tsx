import PageTracker from '@/components/BlogTracker'
import { JsonLd, PageHero, Section } from '@/components/site'
import ExploreMap from '@/components/explore/ExploreMap'
import Reflect from '@/components/explore/Reflect'
import { stateHref, verseCardProps, type StateIndexItem, type VerseData } from '@/lib/explore'
import { abs, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import INDEX from '@/content/explore/index.json'
import GITA_NODES from '@/content/explore/nodes/gita.json'
import META from '@/content/explore/meta.json'
import '@/components/explore/explore.css'

const PATH = '/explore'
const TITLE = 'Map of the Mind: What the Scriptures Say About How You Feel'
const DESC =
  'Find where you are on a map of 46 inner states the Gita, the Ramayana, the Upanishads and other texts name, from worry and envy to steadiness and joy, with what feeds each one and what heals it.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'website' })

const STATES = INDEX as StateIndexItem[]
const HERO = (GITA_NODES as unknown as Record<string, VerseData>)['bg.6.5']
const nVerses = META.verses
const nStories = META.stories

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

function StateList({ items }: { items: StateIndexItem[] }) {
  return (
    <ul>
      {items.map((s) => (
        <li key={s.id}>
          <a href={stateHref(s.slug)} data-mp-location="explore_index" data-mp-event="State Opened" data-mp-props={JSON.stringify({ item_id: s.id })}>
            {cap(s.en)} <span>{s.iast}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Page() {
  const weigh = STATES.filter((s) => s.val === 'afflictive')
  const heal = STATES.filter((s) => s.val !== 'afflictive')
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESC,
      url: abs(PATH),
      publisher: PUBLISHER_LD,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Inner states the scriptures name',
        itemListElement: STATES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(stateHref(s.slug)), name: `${cap(s.en)} (${s.iast})` })),
      },
    },
  ]
  return (
    <>
      <PageTracker pageName="Explore Map" />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[{ label: 'Map of the mind', href: PATH }]}
        title="Find where you are on the map of the mind"
        sub="The scriptures name the states a mind passes through, from worry and envy to steadiness and joy, and they say what feeds each one and what heals it. Start from how you feel and walk to the verses and stories that answer it."
        facts={[`${STATES.length} inner states`, `${nVerses.toLocaleString('en-IN')} verses`, `${nStories} stories`]}
        actions={[
          { href: '#reflect', label: 'Start from how you feel', location: 'explore_hero_reflect' },
          { href: '#map', label: 'Open the map', location: 'explore_hero_map' },
        ]}
        verse={HERO ? verseCardProps(HERO) : undefined}
      />

      <Section
        id="map"
        title="Every state, and the verses around it"
        intro="Every light here is a state the mind passes through, with the verses and stories that speak to it gathered close. Open the one you are in and follow it to what eases it."
        track="explore_map"
      >
        <ExploreMap />
      </Section>

      <Section id="reflect" tone="band" title="Start from how you feel" intro="Write a line about today. Your words find their place on the map, with a verse for each." track="explore_reflect">
        <Reflect placement="explore_reflect" onMap />
      </Section>

      <Section id="states" title="All the states on the map" intro="Each has its own page: the verses that name it, the steps the texts say lead to it, what heals it and the people who lived it.">
        <div className="ex-index">
          <div>
            <h3>What weighs on the mind</h3>
            <StateList items={weigh} />
          </div>
          <div>
            <h3>What heals it</h3>
            <StateList items={heal} />
          </div>
        </div>
      </Section>

      <Section id="how" tone="band" width="narrow" title="How the map is drawn">
        <div className="ex-sources">
          <p>
            The states are the texts&apos; own words, such as chintā for worry and dhṛti for steadiness. The verses, their translations and the stories come from
            the Wisdom library, read with the traditional commentaries.
          </p>
          <p>
            A line marked <em>stated in the text</em> is a link the verse or a named commentator makes. A line marked <em>our reading</em> is Wisdom&apos;s
            own reading of the verse. Read each verse in its place for the whole teaching.
          </p>
        </div>
      </Section>
    </>
  )
}
