import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { THEME_SLUGS, themePlanBySlug } from '@/lib/themePlans'
import ThemePlanPage from '../ThemePlanPage'
import { themePlanMetadata } from '@/lib/themePlanMeta'

/**
 * The same theme plan page with the "global" image set. Visitors outside India are
 * rewritten here by src/middleware.ts; the URL in the browser stays /gita-for/<slug>.
 * Canonical points at the main URL (and direct hits on /global are 308'd there), so search sees one page.
 * Not noindex: Googlebot crawls from the US and is served this variant at the canonical URL.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return THEME_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!themePlanBySlug(params.slug)) return {}
  return themePlanMetadata(params.slug, 'global')
}

export default function GlobalThemePlan({ params }: { params: { slug: string } }) {
  const plan = themePlanBySlug(params.slug)
  if (!plan) notFound()
  return <ThemePlanPage plan={plan} variant="global" />
}
