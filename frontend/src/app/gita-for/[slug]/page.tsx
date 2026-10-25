import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import { GITA_FOR, gitaForBySlug } from '@/lib/gitaFor'
import { getVerse, verseUrl } from '@/lib/gita'
import { appStoreUrl } from '@/lib/app'
import '../../home.css'
import '../../home-v3.css'
import '../gita-for.css'

export const dynamicParams = false

export function generateStaticParams() {
  return GITA_FOR.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName={pageName} />

      <article className="gf">
        <header className="section gf-hero">
          <div className="wrap gf-col">
            <nav className="gf-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> / <a href="/gita-for">Gita for life</a> / <span>{page.label}</span>
            </nav>
            <h1 className="heading">{page.h1}</h1>
            <p className="subtext">{page.intro}</p>
            <a href="#your-verse" className="btn-ghost" data-mp-location={`gita_for_${page.slug}_jump`}>
              Skip to the verse for your situation ↓
            </a>
          </div>
        </header>

        <section className="section gf-verses">
          <div className="wrap gf-col">
            <h2 className="gf-h2">{verses.length} verses from the Gita</h2>
            <ol className="gf-list">
              {verses.map(({ ref, data }) => (
                <li key={`${ref.chapter}.${ref.verse}`} className="gf-verse">
                  <div className="gf-ref">
                    <a href={verseUrl(ref.chapter, ref.verse)} data-mp-location={`gita_for_${page.slug}_${ref.chapter}_${ref.verse}`}>
                      Bhagavad Gita {ref.chapter}.{ref.verse}
                    </a>
                    {data!.speaker ? <span> · {data!.speaker}</span> : null}
                  </div>
                  <h3 className="gf-why">{ref.why}</h3>
                  {data!.sanskrit && <p className="gf-sanskrit" lang="sa">{data!.sanskrit}</p>}
                  <p className="gf-en">“{data!.englishTranslation}”</p>
                  {data!.hindiTranslation && <p className="gf-hi" lang="hi">{data!.hindiTranslation}</p>}
                  {data!.simpleInsight && <p className="gf-insight">{data!.simpleInsight}</p>}
                  <a className="gf-more" href={verseUrl(ref.chapter, ref.verse)}>Meaning and commentary →</a>
                </li>
              ))}
            </ol>
            {page.note && <p className="gf-note">{page.note}</p>}
          </div>
        </section>

        <section className="section section-alt" id="find">
          <div className="wrap gf-col gf-widget">
            <div className="eyebrow">Your situation is your own</div>
            <h2 className="heading">A week of verses, picked for <em>your</em> {page.label.toLowerCase()}.</h2>
            <p className="subtext">
              These verses are for everyone. Tell us a little about yours and Wisdom will pick the one that speaks to it.
            </p>
            <div id="your-verse"><HeroPlanCTA campaign={`web_gita_for_${page.slug}`} location={`gita_for_${page.slug}_create_plan`} pageName="Gita For" situation={page.situation} /></div>
            <p className="gf-app">
              On iPhone, Wisdom turns this into a 7-day plan, read aloud.{' '}
              <a href={appStoreUrl(`web_gita_for_${page.slug.replace(/-/g, '_')}`)} target="_blank" rel="noopener" data-mp-location={`gita_for_${page.slug}_app`}>
                Get the app, week 1 free →
              </a>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap gf-col">
            <h2 className="gf-h2">More from the Gita</h2>
            <div className="gita-for-grid">
              {related.map((p) => (
                <a key={p.slug} href={`/gita-for/${p.slug}`} className="gita-for-tile" data-mp-location={`gita_for_${page.slug}_related_${p.slug}`}>
                  <span className="gita-for-label">{p.label}</span>
                  <span className="gita-for-count">{p.verses.length} verses →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>

      <BlogTracker pageName={pageName} />
      <HomeAnimations />
    </>
  )
}
