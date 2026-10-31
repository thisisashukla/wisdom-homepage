import { ldJson } from '@/lib/seo'

/** One <script type="application/ld+json"> for any schema object or array. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />
}
