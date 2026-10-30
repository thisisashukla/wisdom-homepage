import type { MetadataRoute } from 'next'
import ramayana from './ramayana'
import hanumanChalisa from './hanuman-chalisa'
import sayings from './sayings'
import mahabharata from './mahabharata'
import upanishads from './upanishads'
import otherGitas from './other-gitas'
import ramShalaka from './ram-shalaka'

/** Each funnel owns its own module; this file only concatenates them. */
export function funnelSitemapEntries(): MetadataRoute.Sitemap {
  const all: MetadataRoute.Sitemap = []
  for (const fn of [ramayana, hanumanChalisa, sayings, mahabharata, upanishads, otherGitas, ramShalaka]) {
    try {
      all.push(...fn())
    } catch (err) {
      console.warn('[sitemap] funnel entries failed:', err)
    }
  }
  return all
}
