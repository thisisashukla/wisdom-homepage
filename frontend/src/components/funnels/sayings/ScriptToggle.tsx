'use client'

/**
 * Devanagari or Roman for every card on the page (never both on one card).
 * Sets data-script on the funnel root; remembered for the session. Without JS
 * the page shows Devanagari and this control is not rendered.
 */

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/funnels/sayings/shared'

const KEY = 'wq_fx_script'
const T = {
  en: { label: 'Script', deva: 'Devanagari', roman: 'Roman' },
  hi: { label: 'लिपि', deva: 'देवनागरी', roman: 'रोमन' },
}

export default function ScriptToggle({ locale }: { locale: Locale }) {
  const [mounted, setMounted] = useState(false)
  const [script, setScript] = useState<'deva' | 'roman'>('deva')
  useEffect(() => {
    setMounted(true)
    try {
      const s = window.sessionStorage.getItem(KEY)
      if (s === 'roman') apply('roman')
    } catch {
      // storage blocked
    }
  }, [])
  const apply = (s: 'deva' | 'roman') => {
    setScript(s)
    document.querySelectorAll<HTMLElement>('.fx-sayings').forEach((el) => (el.dataset.script = s))
    try {
      window.sessionStorage.setItem(KEY, s)
    } catch {
      // ignore
    }
  }
  if (!mounted) return null
  const t = T[locale]
  return (
    <div className="fx-script" role="group" aria-label={t.label}>
      <button type="button" aria-pressed={script === 'deva'} onClick={() => apply('deva')} lang="hi">
        {t.deva}
      </button>
      <button type="button" aria-pressed={script === 'roman'} onClick={() => apply('roman')}>
        {t.roman}
      </button>
    </div>
  )
}
