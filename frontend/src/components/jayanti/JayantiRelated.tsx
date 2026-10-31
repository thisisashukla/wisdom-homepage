import { LinkCards, Section } from '@/components/site'
import { CLUSTER, type ClusterKey } from '@/lib/jayanti'

/** Links between the Gita Jayanti pages. Every page in the cluster renders this. */
export default function JayantiRelated({ current, heading = 'More for Gita Jayanti', tone = 'default' }: { current: ClusterKey; heading?: string; tone?: 'default' | 'band' }) {
  const items = CLUSTER.filter((c) => c.key !== current)
  return (
    <Section id="jayanti-related" title={heading} tone={tone}>
      <LinkCards columns={3} items={items.map((c) => ({ href: c.href, title: c.title, body: c.dek, location: `jayanti_related_${current}_to_${c.key}` }))} />
    </Section>
  )
}
