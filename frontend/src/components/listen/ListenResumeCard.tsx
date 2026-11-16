'use client'

/** "Continue where you stopped" on the Listen hub, for a returning listener (localStorage wq_listen). */

import { useEffect, useState } from 'react'
import { readResume, sessionUrl, type ListenLang, type ListenResume } from '@/lib/listen'
import '@/components/site/site.css'

export default function ListenResumeCard({ lang }: { lang: ListenLang }) {
  const [r, setR] = useState<ListenResume | null>(null)
  useEffect(() => setR(readResume()), [])
  if (!r) return null
  const hi = lang === 'hi'
  return (
    <section className="lh-resume" aria-label={hi ? 'जहाँ रुके थे' : 'Continue listening'}>
      <div className="lh-resume-text">
        <p className="lh-resume-k">{hi ? 'जहाँ रुके थे, वहीं से' : 'Pick up where you stopped'}</p>
        <p className="lh-resume-t">{hi ? `अध्याय ${r.c}, श्लोक ${r.v}` : `Chapter ${r.c}, verse ${r.v}`}</p>
      </div>
      <a className="sx-btn sx-btn--primary" href={`${sessionUrl(r.chapter, r.n, r.lang)}?from=${r.v}&play=1`} data-mp-location="listen_hub_resume">
        {hi ? 'सुनना जारी रखें' : 'Keep listening'}
      </a>
    </section>
  )
}
