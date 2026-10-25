import { CLUSTER, type ClusterKey } from '@/lib/jayanti'

/** Links between the Gita Jayanti pages. Every page in the cluster renders this. */
export default function JayantiRelated({ current, heading = 'More for Gita Jayanti' }: { current: ClusterKey; heading?: string }) {
  const items = CLUSTER.filter((c) => c.key !== current)
  return (
    <section className="section gjg-related">
      <div className="wrap">
        <h2 className="gjg-h2">{heading}</h2>
        <div className="gjg-related-grid">
          {items.map((c) => (
            <a key={c.key} href={c.href} className="gjg-related-card" data-mp-location={`jayanti_related_${current}_to_${c.key}`}>
              <span className="gjg-related-title">{c.title}</span>
              <span className="gjg-related-dek">{c.dek}</span>
              <span className="gjg-related-go" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
