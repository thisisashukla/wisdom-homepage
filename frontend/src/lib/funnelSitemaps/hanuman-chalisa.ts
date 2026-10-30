import type { MetadataRoute } from 'next'
import { getUnits } from '@/lib/funnels/hanuman-chalisa'

const SITE = 'https://wisdomquotes.in'
const LAST = new Date('2026-10-30')

/** Sitemap entries for the hanuman-chalisa funnel. Owned by the hanuman-chalisa build; return absolute URLs on https://wisdomquotes.in. */
export default function entries(): MetadataRoute.Sitemap {
  const hubLangs = {
    languages: {
      en: `${SITE}/hanuman-chalisa`,
      'en-IN': `${SITE}/hanuman-chalisa`,
      hi: `${SITE}/hi/hanuman-chalisa`,
      'hi-IN': `${SITE}/hi/hanuman-chalisa`,
      'x-default': `${SITE}/hanuman-chalisa`,
    },
  }
  const out: MetadataRoute.Sitemap = [
    { url: `${SITE}/hanuman-chalisa`, lastModified: LAST, changeFrequency: 'monthly', priority: 0.9, alternates: hubLangs },
    { url: `${SITE}/hi/hanuman-chalisa`, lastModified: LAST, changeFrequency: 'monthly', priority: 0.8, alternates: hubLangs },
    { url: `${SITE}/hanuman-chalisa/learn`, lastModified: LAST, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/hanuman-chalisa/108`, lastModified: LAST, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/hanuman-chalisa/how-many-times`, lastModified: LAST, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/hanuman-jayanti-2027`, lastModified: LAST, changeFrequency: 'weekly', priority: 0.7 },
  ]
  for (const u of getUnits()) {
    out.push({ url: `${SITE}/hanuman-chalisa/${u.slug}`, lastModified: LAST, changeFrequency: 'yearly', priority: 0.5 })
  }
  return out
}
