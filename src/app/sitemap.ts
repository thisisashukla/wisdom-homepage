import { MetadataRoute } from 'next'

const BASE = 'https://wisdomquotes.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/blogs`,
      lastModified: new Date('2026-05-05'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Chapter studies
    {
      url: `${BASE}/blogs/bhagwat-geeta-chapter-1`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/blogs/bhagwat-geeta-chapter-2`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/blogs/bhagwat-geeta-chapter-3`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/blogs/bhagwat-geeta-chapter-4`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/blogs/bhagwat-geeta-chapter-5`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // Topic guides
    {
      url: `${BASE}/blogs/bhagavad-gita-for-beginners`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/blogs/bhagavad-gita-karma-meaning`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/blogs/bhagavad-gita-anxiety-mental-peace`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/blogs/bhagavad-gita-complete-structure-all-chapters`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
