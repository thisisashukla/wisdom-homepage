import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, JsonLd, PageHero, Section } from '@/components/site'
import PlanFilterTabs from '@/components/plan/PlanFilterTabs'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import { PLAN_GROUPS, THEME_PLANS, planGroupOf, planMinutesTotal, planOpening, planSources } from '@/lib/themePlans'
import { themeHero, type ThemeVariant } from '@/lib/themeAssets'
import { LENGTH_PLANS, eighteenDaySegments } from '@/lib/readingPlans'
import VerseMap from '@/components/plan/VerseMap'
import '@/components/plan/length-plans.css'
import { TimePicker } from '@/components/plan/LengthPlanParts'
import { HUB_DESCRIPTION, HUB_URL } from './meta'
import './reading-plans.css'

const BASE = 'https://wisdomquotes.in'
const PAGE = 'Reading Plans'

const LONGER = LENGTH_PLANS

const plan = (location: string) => planAction({ campaign: 'web_reading_plans', location })

export default function ReadingPlansHub({ variant }: { variant: ThemeVariant }) {
  const cards = THEME_PLANS.map((p) => ({ p, hero: themeHero(p, variant), min: planMinutesTotal(p), group: planGroupOf(p.slug), opening: planOpening(p), sources: planSources(p) }))
  const tabs = PLAN_GROUPS.map((g) => ({ id: g.id, label: g.label, count: g.slugs.length }))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Bhagavad Gita reading plans',
        url: HUB_URL,
        description: HUB_DESCRIPTION,
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: 'Wisdom', url: BASE },
        about: { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
        isAccessibleForFree: true,
      },
      {
        '@type': 'ItemList',
        name: 'Bhagavad Gita reading plans',
        itemListElement: [
          ...LONGER.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `${BASE}${l.href}`, name: l.title, description: `${l.sub} ${l.span}, ${l.daily}.`, image: `${BASE}${l.img}` })),
          ...cards.map(({ p, min }, i) => ({
            '@type': 'ListItem',
            position: LONGER.length + i + 1,
            url: `${BASE}/gita-for/${p.slug}`,
            name: p.title,
            description: `${p.subtitle} 7 verses, about ${min} minutes in all.`,
          })),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Reading plans', item: `${BASE}/reading-plans` },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={schema} />
      <Nav />

      <PageHero
        crumbs={[{ label: 'Reading plans', href: '/reading-plans' }]}
        crumbsLd={false}
        eyebrow="Free, in Sanskrit and plain English"
        title="Bhagavad Gita reading plans"
        sub="Read the whole Gita in a week, a month or a chapter a day, or one verse each morning. Or take seven verses for what’s on your mind today: a racing mind, a loss, a hard choice."
        actions={[
          { href: '#by-time', label: 'Find a plan for my time', location: 'reading_plans_hero_by_time' },
          { ...plan('reading_plans_hero_create'), variant: 'link' },
        ]}
        below={<PlanFine />}
        visual={
          <div className="rpl-maphold">
            <span className="rpl-maphold-k">The Gita: 18 chapters, 700 verses</span>
            <VerseMap
              plan="hub"
              segments={eighteenDaySegments()}
              selectable={false}
              label="Map of the Bhagavad Gita’s 700 verses, one row per chapter"
              caption="Each circle is a verse, each row a chapter. Every plan below walks through them."
            />
          </div>
        }
      />

      <main>
        <Section id="by-time" width="narrow" title="How much time do you have each day?" intro="Each one follows the Gita in order, and each can start today.">
          <TimePicker location="reading_plans_pick" />
          <p className="sx-intro" style={{ marginTop: 18 }}>
            New to the Gita?{' '}
            <a className="sx-link" href="/how-to-read-bhagavad-gita" data-mp-location="reading_plans_how_to_read">
              Start with how to read it
            </a>
            : where to begin, how long it takes, and where readers get stuck.
          </p>
        </Section>

        <Section
          id="whole-gita"
          tone="band"
          eyebrow={`${LONGER.length} plans`}
          title="Read the whole Gita"
          intro="Each picture is the plan drawn on the Gita’s 700 verses."
        >
          <div className="rp-grid" data-stagger="60">
            {LONGER.map((l) => (
              <a key={l.href} href={l.href} className="rp-card rv" data-mp-location={`reading_plans_${l.key.replace(/\W+/g, '_')}`}>
                <div className="rp-thumb rp-thumb--map">
                  <img src={l.img} alt={`${l.title}: Bhagavad Gita reading plan, ${l.span}, drawn on a map of all 700 verses`} loading="lazy" decoding="async" width={1200} height={675} />
                </div>
                <div className="rp-body">
                  <div className="rp-meta">
                    <span>{l.span}</span>
                    <span>{l.daily}</span>
                  </div>
                  <h3 className="rp-title">{l.title}</h3>
                  <p className="rp-desc">{l.sub}</p>
                  <span className="rp-go">
                    See the plan <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="plans"
          eyebrow={`${cards.length} plans`}
          title="Seven verses for what’s on your mind"
          intro="Each plan gives you seven verses for one feeling or situation, the Gita first and then the epics and Upanishads, with one thing to try. Read one a day or all seven at once."
        >
          <PlanFilterTabs tabs={tabs} total={cards.length} variant={variant} />

          <div className="rp-grid" data-stagger="40">
            {cards.map(({ p, hero, min, group, opening, sources }) => (
              <a
                key={p.slug}
                href={`/gita-for/${p.slug}`}
                className="rp-card rv"
                data-group={group}
                data-theme={p.slug}
                data-mp-location={`reading_plans_card_${p.slug}`}
                data-mp-event="Reading Plan Card Clicked"
                data-mp-props={JSON.stringify({ theme: p.slug, variant, group })}
              >
                <div className="rp-thumb">
                  <img src={hero.tile} alt={hero.alt} loading="lazy" decoding="async" width={800} height={450} />
                  <span className="rp-badge">7 verses</span>
                </div>
                <div className="rp-body">
                  <div className="rp-meta">
                    <span>{min} min read</span>
                    {opening && <span>Starts with {opening}</span>}
                  </div>
                  <h3 className="rp-title">{p.label}</h3>
                  <p className="rp-desc">{p.subtitle}</p>
                  <p className="rp-src">{sources}</p>
                  <span className="rp-go">
                    Read the plan <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="your-plan"
          tone="band"
          eyebrow="Not on the list?"
          title={
            <>
              Seven verses picked for <em>your</em> situation.
            </>
          }
          intro="Tell Wisdom what's going on in a sentence or two. It picks verses for you, Gita first, and explains each one for your life."
        >
          <Actions items={[plan('reading_plans_final_create')]} />
          <PlanFine />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName={PAGE} />
    </>
  )
}
