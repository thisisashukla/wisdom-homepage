import type { MetadataRoute } from 'next'
import { VIV_THEMES, dohe, vivChecks } from '@/lib/funnels/sayings/data'
import { VIV_PATH, VIV_PATH_HI, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { KAB_PATH, KAB_PATH_EN, dohaPath } from '@/lib/funnels/sayings/copy-kabir'
import { CHK_PATH } from '@/lib/funnels/sayings/copy-chanakya'

const SITE = 'https://wisdomquotes.in'
const lastModified = new Date('2026-10-30')

const twin = (en: string, hi: string) => ({
  languages: { en: `${SITE}${en}`, 'en-IN': `${SITE}${en}`, hi: `${SITE}${hi}`, 'hi-IN': `${SITE}${hi}`, 'x-default': `${SITE}${en}` },
})

/** Sitemap entries for the sayings funnel (Vivekananda, Kabir, Chanakya). Absolute URLs on https://wisdomquotes.in. */
export default function entries(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = []
  const add = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly', alternates?: ReturnType<typeof twin>) =>
    out.push({ url: `${SITE}${path}`, lastModified, changeFrequency, priority, ...(alternates ? { alternates } : {}) })

  add(VIV_PATH, 0.9, 'weekly', twin(VIV_PATH, VIV_PATH_HI))
  add(VIV_PATH_HI, 0.85, 'weekly', twin(VIV_PATH, VIV_PATH_HI))
  for (const t of VIV_THEMES) add(vivThemePath(t), 0.75, 'monthly')
  for (const c of vivChecks()) add(vivCheckPath(c.slug), c.verdict === 'in-his-words' ? 0.5 : 0.65, 'monthly')

  add(KAB_PATH, 0.9, 'weekly', twin(KAB_PATH_EN, KAB_PATH))
  add(KAB_PATH_EN, 0.8, 'weekly', twin(KAB_PATH_EN, KAB_PATH))
  for (const d of dohe()) add(dohaPath(d.slug), 0.6, 'monthly')

  add(CHK_PATH, 0.85, 'weekly')
  return out
}
