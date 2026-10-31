import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, JsonLd, LinkCards, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import { GITA_FOR, gitaForBySlug } from '@/lib/gitaFor'
import { getVerse, verseUrl } from '@/lib/gita'
import { appStoreUrl } from '@/lib/app'
import { THEME_SLUGS, themePlanBySlug } from '@/lib/themePlans'
import { themePlanMetadata } from '@/lib/themePlanMeta'
import ThemePlanPage from './ThemePlanPage'
import '../gita-for.css'

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = new Set([...GITA_FOR.map((p) => p.slug), ...THEME_SLUGS])
  return Array.from(slugs).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plan = themePlanBySlug(params.slug)
  if (plan) return themePlanMetadata(params.slug)
  const p = gitaForBySlug(params.slug)
  if (!p) return {}
  const url = `https://wisdomquotes.in/gita-for/${p.slug}`
  return {
    title: { absolute: `${p.title} | Wisdom` },
    description: p.description,
    keywords: p.keywords.join(', '),
    alternates: { canonical: url },
    openGraph: { title: p.title, description: p.description, url, type: 'article', siteName: 'Wisdom' },
  }
}

export default async function GitaForPage({ params }: { params: { slug: string } }) {
  const plan = themePlanBySlug(params.slug)
  if (plan) return <ThemePlanPage plan={plan} variant="in" />
  const page = gitaForBySlug(params.slug)
  if (!page) notFound()
  const verses = (
    await Promise.all(page.verses.map(async (v) => ({ ref: v, data: await getVerse(v.chapter, v.verse) })))
  ).filter((v) => v.data)
  const pageName = `Gita For ${page.label}`
  const related = GITA_FOR.filter((p) => p.slug !== page.slug).slice(0, 6)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: page.h1,
        description: page.description,
        inLanguage: 'en',
        author: { '@type': 'Person', name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' },
        publisher: { '@type': 'Organization', name: 'Wisdom', logo: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
        mainEntityOfPage: `https://wisdomquotes.in/gita-for/${page.slug}`,
        about: page.keywords,
      },
      {
        '@type': 'ItemList',
        name: page.h1,
        itemListElement: verses.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://wisdomquotes.in${verseUrl(v.ref.chapter, v.ref.verse)}`,
          name: `Bhagavad Gita ${v.ref.chapter}.${v.ref.verse}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wisdomquotes.in' },
          { '@type': 'ListItem', position: 2, name: 'Gita for life', item: 'https://wisdomquotes.in/gita-for' },
          { '@type': 'ListItem', position: 3, name: page.label, item: `https://wisdomquotes.in/gita-for/${page.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={schema} />
      <Nav />

      <article className="gf">
        <PageHero
          crumbs={[
            { label: 'Gita for life', href: '/gita-for' },
            { label: page.label, href: `/gita-for/${page.slug}` },
          ]}
          crumbsLd={false}
          title={page.h1}
          sub={page.intro}
          actions={[{ href: '#your-verse', label: 'Skip to the verse for your situation ↓', location: `gita_for_${page.slug}_jump`, variant: 'secondary' }]}
        />

        <Section id="verses" title={`${verses.length} verses from the Gita`} width="narrow">
          <VerseList>
            {verses.map(({ ref, data }) => (
              <li key={`${ref.chapter}.${ref.verse}`} className="gf-item rv">
                <h3 className="gf-why">{ref.why}</h3>
                <VerseCard
                  as="div"
                  size="compact"
                  original={data!.sanskrit}
                  meaning={`“${data!.englishTranslation}”`}
                  source={`Bhagavad Gita ${ref.chapter}.${ref.verse}${data!.speaker ? ` · ${data!.speaker}` : ''}`}
                  sourceHref={verseUrl(ref.chapter, ref.verse)}
                >
                  {data!.hindiTranslation && (
                    <p className="gf-hi" lang="hi">
                      {data!.hindiTranslation}
                    </p>
                  )}
                  {data!.simpleInsight && <p className="gf-insight">{data!.simpleInsight}</p>}
                  <a className="sx-link gf-more" href={verseUrl(ref.chapter, ref.verse)} data-mp-location={`gita_for_${page.slug}_${ref.chapter}_${ref.verse}`}>
                    Meaning and commentary →
                  </a>
                </VerseCard>
              </li>
            ))}
          </VerseList>
          {page.note && <p className="gf-note">{page.note}</p>}
        </Section>

        <Section
          id="find"
          tone="band"
          width="narrow"
          eyebrow="Your situation is your own"
          title={
            <>
              A week of verses, picked for <em>your</em> {page.label.toLowerCase()}.
            </>
          }
          intro="These verses are for everyone. Tell us a little about yours and Wisdom will pick the one that speaks to it."
        >
          <div id="your-verse">
            <Actions items={[planAction({ campaign: `web_gita_for_${page.slug}`, location: `gita_for_${page.slug}_create_plan`, situation: page.situation })]} />
            <PlanFine />
          </div>
          <p className="plan-app">
            On iPhone, Wisdom turns this into a 7-day plan, read aloud.{' '}
            <a href={appStoreUrl(`web_gita_for_${page.slug.replace(/-/g, '_')}`)} target="_blank" rel="noopener" data-mp-location={`gita_for_${page.slug}_app`}>
              Get the app →
            </a>
          </p>
        </Section>

        <Section id="more" title="More from the Gita">
          <LinkCards
            columns={3}
            items={related.map((p) => ({ href: `/gita-for/${p.slug}`, title: p.label, body: `${p.verses.length} verses →`, location: `gita_for_${page.slug}_related_${p.slug}` }))}
          />
        </Section>
      </article>

      <SiteFooter />
      <BlogTracker pageName={pageName} />
    </>
  )
}
