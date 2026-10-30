import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VivThemePage from '@/components/funnels/sayings/VivTheme'
import { VIV_THEMES, vivByTheme, type VivTheme } from '@/lib/funnels/sayings/data'
import { VIV_THEME_COPY, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return VIV_THEMES.map((theme) => ({ theme }))
}

const isTheme = (t: string): t is VivTheme => (VIV_THEMES as string[]).includes(t)

export function generateMetadata({ params }: { params: { theme: string } }): Metadata {
  if (!isTheme(params.theme)) return {}
  const c = VIV_THEME_COPY[params.theme]
  const first = vivByTheme(params.theme).find((l) => l.card)
  return fxMeta({ title: c.title, description: c.description, path: vivThemePath(params.theme), locale: 'en', ...(first ? { ogImage: cardOg(first.id) } : {}) })
}

export default function Page({ params }: { params: { theme: string } }) {
  if (!isTheme(params.theme)) notFound()
  return <VivThemePage theme={params.theme} />
}
