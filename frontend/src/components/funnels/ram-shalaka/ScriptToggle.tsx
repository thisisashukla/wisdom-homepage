'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

/**
 * Devanagari or IAST, never both: flips data-rs-script on the target container.
 * Without JS the Devanagari stays visible and the IAST stays hidden.
 */
export default function ScriptToggle({ target, label }: { target: string; label: string }) {
  const [iast, setIast] = useState(false)
  const flip = () => {
    const v = !iast
    setIast(v)
    trackEvent('Script Toggled', { funnel: 'ram-shalaka', target, to: v ? 'iast' : 'devanagari' })
    document.getElementById(target)?.setAttribute('data-rs-script', v ? 'iast' : 'deva')
  }
  return (
    <button type="button" className="rs-chip" aria-pressed={iast} aria-controls={target} aria-label={label} onClick={flip}>
      {iast ? 'देवनागरी' : 'IAST'}
    </button>
  )
}
