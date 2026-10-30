import { notFound } from 'next/navigation'
import LinePage, { lineMetadata } from '@/components/funnels/upanishads/LinePage'
import { LINE_SLUGS } from '@/content/funnels/upanishads/lines'

type Params = { line: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return LINE_SLUGS.map((line) => ({ line }))
}

export function generateMetadata({ params }: { params: Params }) {
  return lineMetadata(params.line, 'en')
}

export default function Page({ params }: { params: Params }) {
  if (!LINE_SLUGS.includes(params.line)) notFound()
  return <LinePage slug={params.line} locale="en" />
}
