import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VivCheckPage, { checkAnswer, checkShort } from '@/components/funnels/sayings/VivCheckPage'
import { vivCheck, vivChecks } from '@/lib/funnels/sayings/data'
import { vivCheckPath } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return vivChecks().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = vivCheck(params.slug)
  if (!c) return {}
  const title = `Did Vivekananda Say "${checkShort(c.shared, 30)}"?`
  const desc = checkAnswer(c)
  return fxMeta({
    title,
    description: desc.length > 155 ? `${desc.slice(0, 152).replace(/\s+\S*$/, '')}...` : desc,
    path: vivCheckPath(c.slug),
    locale: 'en',
    ...(c.hubLine ? { ogImage: cardOg(`viv-${c.hubLine}`) } : {}),
  })
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = vivCheck(params.slug)
  if (!c) notFound()
  return <VivCheckPage check={c} />
}
