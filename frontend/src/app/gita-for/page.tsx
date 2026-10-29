import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import { GITA_FOR } from '@/lib/gitaFor'
import { THEME_SLUGS } from '@/lib/themePlans'
import '../home.css'
import '../home-v3.css'
import './gita-for.css'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: { absolute: 'Bhagavad Gita for Life’s Problems: 7-Verse Reading Plans | Wisdom' },
  description:
    'Free 7-verse Bhagavad Gita reading plans for overthinking, stress, grief, fear of failure, anger, guilt, loneliness and more, in Sanskrit and English.',
  alternates: { canonical: 'https://wisdomquotes.in/gita-for' },
}

export default function GitaForIndex() {
  return (
    <>
      <Nav pageName="Gita For Index" />
      <section className="section gf-hero">
        <div className="wrap">
          <div className="eyebrow">Gita for life</div>
          <h1 className="heading">The Bhagavad Gita for <em>what you&apos;re facing.</em></h1>
          <p className="subtext">
            Krishna spoke the Gita to one man in one crisis. These pages gather what he said about the problems people
            bring to it most.
          </p>
          <div className="gita-for-grid gf-index-grid">
            {GITA_FOR.map((p) => (
              <a key={p.slug} href={`/gita-for/${p.slug}`} className="gita-for-tile" data-mp-location={`gita_for_index_${p.slug}`}>
                <span className="gita-for-label">{p.label}</span>
                <span className="gita-for-count">{THEME_SLUGS.includes(p.slug) ? '7 verses →' : `${p.verses.length} verses →`}</span>
              </a>
            ))}
          </div>
          <p style={{ marginTop: '22px' }}><a href="/reading-plans" className="btn-ghost" data-mp-location="gita_for_index_all_plans">All reading plans, with time to read →</a></p>
        </div>
      </section>
      <section className="section section-alt">
        <div className="wrap gf-widget">
          <div className="eyebrow">Not on the list?</div>
          <h2 className="heading">A week of verses, picked for <em>your</em> situation.</h2>
          <div id="your-verse"><HeroPlanCTA campaign="web_gita_for_index" location="gita_for_index_create_plan" pageName="Gita For Index" /></div>
        </div>
      </section>
      <SiteFooter />
      <BlogTracker pageName="Gita For Index" />
      <HomeAnimations />
    </>
  )
}
