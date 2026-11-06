'use client'

import Link from 'next/link'
import { useState } from 'react'

export type CardData = { slug: string; pillar: string; pillarShort: string; title: string; blurb: string; mins: number; cover: React.ReactNode }

/**
 * Filterable article grid for the blog index. Chips slide an indicator between
 * pillars; cards fade and rise back in when the filter changes.
 */
export default function BlogBrowser({ cards, pillars }: { cards: CardData[]; pillars: { id: string; short: string }[] }) {
  const [f, setF] = useState('all')
  const tabs = [{ id: 'all', short: 'All' }, ...pillars]
  const shown = f === 'all' ? cards : cards.filter((c) => c.pillar === f)
  return (
    <div className="dh-browse">
      <div className="dh-chips" role="tablist" aria-label="Filter articles">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={f === t.id} className={f === t.id ? 'on' : ''} onClick={() => setF(t.id)}>
            {t.short}
          </button>
        ))}
      </div>
      <div className="dh-agrid" key={f}>
        {shown.map((c, i) => (
          <Link key={c.slug} href={`/learn/${c.slug}`} className="dh-acard" style={{ ['--k' as string]: i }}>
            {c.cover}
            <div className="dh-acard__body">
              <p className="dh-acard__meta">
                <span>{c.pillarShort}</span>
                <span>{c.mins} min read</span>
              </p>
              <h3>{c.title}</h3>
              <p className="dh-acard__blurb">{c.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
