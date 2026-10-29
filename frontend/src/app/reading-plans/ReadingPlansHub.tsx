import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import PlanFilterTabs from '@/components/plan/PlanFilterTabs'
import { PLAN_GROUPS, THEME_PLANS, planGroupOf, planMinutesTotal, planOpening, planSources } from '@/lib/themePlans'
import { themeHero, type ThemeVariant } from '@/lib/themeAssets'
import '../home.css'
import '../home-v3.css'
import './reading-plans.css'

const BASE = 'https://wisdomquotes.in'
const PAGE = 'Reading Plans'

const LONGER = [
  {
    href: '/read-gita-in-18-days',
    img: '/og/read-gita-in-18-days.webp',
    title: 'Read the whole Gita in 18 days',
    sub: 'One chapter a day, with what each covers and one verse from it.',
    meta: '18 days · 4 to 13 min a day',
  },
  {
    href: '/gita-jayanti/reading-plan',
    img: '/og/gita-jayanti-reading-plan.webp',
    title: 'Finish the Gita by Gita Jayanti',
    sub: 'Schedules that end on 20 December, from whatever day you start.',
    meta: '3 to 18 days',
  },
]

/** The homepage hero button, unchanged, so every "create a plan" looks and tracks the same. */
function BigCTA({ location }: { location: string }) {
  return (
    <div className="rp-cta">
      <HeroPlanCTA campaign="web_reading_plans" location={location} pageName={PAGE} />
    </div>
  )
}

export default function ReadingPlansHub({ variant }: { variant: ThemeVariant }) {
  const cards = THEME_PLANS.map((p) => ({ p, hero: themeHero(p, variant), min: planMinutesTotal(p), group: planGroupOf(p.slug), opening: planOpening(p), sources: planSources(p) }))
  const tabs = PLAN_GROUPS.map((g) => ({ id: g.id, label: g.label, count: g.slugs.length }))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Bhagavad Gita reading plans',
        url: `${BASE}/reading-plans`,
        description: 'Free 7-verse reading plans by topic, from the Bhagavad Gita first and then the Ramayana, Mahabharata, Upanishads and Yoga Vasishtha. Plus the whole Gita in 18 days.',
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: 'Wisdom', url: BASE },
        about: { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
        isAccessibleForFree: true,
      },
      {
        '@type': 'ItemList',
        name: 'Bhagavad Gita reading plans',
        itemListElement: [
          ...cards.map(({ p, min }, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${BASE}/gita-for/${p.slug}`,
            name: p.title,
            description: `${p.subtitle} 7 verses, about ${min} minutes in all.`,
          })),
          ...LONGER.map((l, i) => ({ '@type': 'ListItem', position: cards.length + i + 1, url: `${BASE}${l.href}`, name: l.title })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName={PAGE} />

      <header className="rp-hero">
        <div className="rp-hero-glow" aria-hidden="true" />
        <div className="rp-wrap rp-hero-inner">
          <nav className="rp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Reading plans</span></nav>
          <div className="rp-label">Bhagavad Gita reading plans</div>
          <h1 className="rp-h1">Seven verses <em>for what you&apos;re carrying.</em></h1>
          <p className="rp-sub">
            A racing mind, a loss, a hard choice, a good day you want to keep. Each plan gives you seven verses for one of them, from the
            Gita first and then the epics and Upanishads, with the Sanskrit, plain English and one thing to try. Read one a day or all seven
            at once.
          </p>
          <BigCTA location="reading_plans_hero_create" />
        </div>
      </header>

      <main className="rp-wrap rp-main">
        <div className="rp-head">
          <h2 className="rp-h2">Pick what&apos;s <em>on your mind</em></h2>
          <span className="rp-count">{cards.length} plans</span>
        </div>
        <PlanFilterTabs tabs={tabs} total={cards.length} variant={variant} />

        <div className="rp-grid">
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
                <span className="rp-go">Read the plan <span aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>

        <div className="rp-head rp-head-2">
          <h2 className="rp-h2">Read the <em>whole Gita</em></h2>
          <span className="rp-count">{LONGER.length} plans</span>
        </div>
        <div className="rp-grid rp-grid-2">
          {LONGER.map((l) => (
            <a key={l.href} href={l.href} className="rp-card rp-card-wide rv" data-mp-location={`reading_plans_${l.href.replace(/\W+/g, '_')}`}>
              <div className="rp-thumb"><img src={l.img} alt="" loading="lazy" decoding="async" width={1200} height={630} /></div>
              <div className="rp-body">
                <div className="rp-meta"><span>{l.meta}</span></div>
                <h3 className="rp-title">{l.title}</h3>
                <p className="rp-desc">{l.sub}</p>
                <span className="rp-go">See the schedule <span aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>

        <section className="rp-final rv">
          <div className="rp-label">Not on the list?</div>
          <h2 className="rp-h2 rp-final-h">Seven verses picked for <em>your</em> situation.</h2>
          <p>
            Tell Wisdom what&apos;s going on in a sentence or two. It picks verses for you, Gita first, and explains each one for your life.
          </p>
          <BigCTA location="reading_plans_final_create" />
        </section>
      </main>

      <SiteFooter />
      <BlogTracker pageName={PAGE} />
      <HomeAnimations />
    </>
  )
}
