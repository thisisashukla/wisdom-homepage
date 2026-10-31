import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, LinkCards, PageHero, Section } from '@/components/site'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import { GITA_FOR } from '@/lib/gitaFor'
import { THEME_SLUGS } from '@/lib/themePlans'

export const metadata: Metadata = {
  title: { absolute: 'Bhagavad Gita for Life’s Problems: 7-Verse Reading Plans | Wisdom' },
  description:
    'Free 7-verse Bhagavad Gita reading plans for overthinking, stress, grief, fear of failure, anger, guilt, loneliness and more, in Sanskrit and English.',
  alternates: { canonical: 'https://wisdomquotes.in/gita-for' },
}

export default function GitaForIndex() {
  return (
    <>
      <Nav />
      <PageHero
        crumbs={[{ label: 'Gita for life', href: '/gita-for' }]}
        eyebrow="Gita for life"
        title={
          <>
            The Bhagavad Gita for <em>what you&apos;re facing.</em>
          </>
        }
        sub="Krishna spoke the Gita to one man in one crisis. These pages gather what he said about the problems people bring to it most."
        actions={[{ href: '/reading-plans', label: 'All reading plans, with time to read →', location: 'gita_for_index_all_plans', variant: 'secondary' }]}
      />

      <main>
        <Section id="topics" spacing="tight">
          <LinkCards
            columns={3}
            items={GITA_FOR.map((p) => ({
              href: `/gita-for/${p.slug}`,
              title: p.label,
              body: THEME_SLUGS.includes(p.slug) ? '7 verses →' : `${p.verses.length} verses →`,
              location: `gita_for_index_${p.slug}`,
            }))}
          />
        </Section>

        <Section
          id="your-verse"
          tone="band"
          eyebrow="Not on the list?"
          title={
            <>
              A week of verses, picked for <em>your</em> situation.
            </>
          }
        >
          <Actions items={[planAction({ campaign: 'web_gita_for_index', location: 'gita_for_index_create_plan' })]} />
          <PlanFine />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita For Index" />
    </>
  )
}
