import { AUTHOR_LD, PUBLISHER_LD, abs } from '@/lib/seo'
import { CHECKED_ISO, type CompareApp } from './apps'

/** The comparison pages, for the hub, related links, the sitemap and llms.txt. */
export const COMPARE_PAGES = {
  hub: { path: '/best-apps', title: 'Gita and Hindu practice apps, compared', short: 'All app comparisons' },
  gita: { path: '/best-bhagavad-gita-apps', title: 'Best Bhagavad Gita apps', short: 'Bhagavad Gita apps' },
  prayer: { path: '/best-hindu-prayer-apps', title: 'Best Hindu prayer and practice apps', short: 'Hindu prayer apps' },
  chalisa: { path: '/best-hanuman-chalisa-apps', title: 'Best Hanuman Chalisa apps', short: 'Hanuman Chalisa apps' },
  widget: { path: '/bhagavad-gita-widget-iphone', title: 'Bhagavad Gita widgets for iPhone', short: 'Gita widgets for iPhone' },
} as const

export type ComparePageKey = keyof typeof COMPARE_PAGES
export const comparePath = (k: ComparePageKey) => COMPARE_PAGES[k].path

/**
 * Article + ItemList for a comparison page. The list names each app and links its store page,
 * in the order shown. No ratings or review markup: star ratings belong to the stores.
 */
export function compareLd(o: { path: string; headline: string; description: string; apps: CompareApp[] }) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: o.headline,
      description: o.description,
      url: abs(o.path),
      mainEntityOfPage: abs(o.path),
      datePublished: CHECKED_ISO,
      dateModified: CHECKED_ISO,
      inLanguage: 'en',
      author: AUTHOR_LD,
      publisher: PUBLISHER_LD,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: o.headline,
      itemListOrder: 'https://schema.org/ItemListUnordered',
      numberOfItems: o.apps.length,
      itemListElement: o.apps.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.name, url: a.appStoreUrl })),
    },
  ]
}
