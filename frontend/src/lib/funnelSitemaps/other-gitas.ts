import type { MetadataRoute } from 'next'
import { abs, agChapterPath, agVersePath, getChapters, getVerses, HUB_PATH, isIndexable } from '@/lib/funnels/other-gitas/data'

/** Sitemap entries for the other-gitas funnel: indexable pages only (verse pages need their own notes). */
export default function entries(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-30')
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { en: abs(path), 'en-IN': abs(path), 'x-default': abs(path) } },
  })
  return [
    page(HUB_PATH, 0.8, 'weekly'),
    page('/ashtavakra-gita-vs-bhagavad-gita', 0.7),
    page('/ashtavakra-gita/quotes', 0.7),
    page('/ashtavakra-gita/seven-mornings', 0.6),
    page('/gitas', 0.6),
    ...getChapters().map((c) => page(agChapterPath(c.n), 0.6)),
    ...getVerses()
      .filter(isIndexable)
      .map((x) => page(agVersePath(x.c, x.v), x.c === 1 && x.v === 11 ? 0.7 : 0.5)),
  ]
}
