import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DohaPage, { dohaTitle } from '@/components/funnels/sayings/DohaPage'
import { kabirCardId } from '@/components/funnels/sayings/KabirHub'
import { doha, dohe } from '@/lib/funnels/sayings/data'
import { dohaPath } from '@/lib/funnels/sayings/copy-kabir'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return dohe().map((d) => ({ slug: d.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = doha(params.slug)
  if (!d) return {}
  const desc = `${d.lines.join(' ')} अर्थ: ${d.meaning.hi}`
  return fxMeta({
    title: dohaTitle(d),
    description: desc.length > 155 ? `${desc.slice(0, 152).replace(/\s+\S*$/, '')}...` : desc,
    path: dohaPath(d.slug),
    locale: 'hi',
    ...(kabirCardId(d) ? { ogImage: cardOg(d.id, 'hi') } : {}),
  })
}

export default function Page({ params }: { params: { slug: string } }) {
  const d = doha(params.slug)
  if (!d) notFound()
  return <DohaPage doha={d} />
}
