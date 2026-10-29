import type { Metadata } from 'next'
import { themePlanBySlug } from './themePlans'
import { themeHero } from './themeAssets'

/**
 * Metadata for a theme plan page. The global variant is what visitors outside India (and Googlebot,
 * which crawls from the US) get at the canonical URL, so it must stay indexable; only the share image differs.
 */
export function themePlanMetadata(slug: string, variant: 'in' | 'global' = 'in'): Metadata {
  const plan = themePlanBySlug(slug)!
  const url = `https://wisdomquotes.in/gita-for/${plan.slug}`
  const hero = themeHero(plan, variant)
  const img = `https://wisdomquotes.in${hero.og}`
  return {
    title: { absolute: `${plan.title} | Wisdom` },
    description: plan.description,
    keywords: plan.keywords.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: plan.title,
      description: plan.description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      images: [{ url: img, width: 1200, height: 630, alt: hero.alt }],
    },
    twitter: { card: 'summary_large_image', title: plan.title, description: plan.description, images: [img] },
  }
}
