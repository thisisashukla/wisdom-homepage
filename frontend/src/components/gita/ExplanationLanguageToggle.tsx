'use client'

/**
 * "अंग्रेज़ी में पढ़ें" switch on Hindi verse pages that have Hindi commentary. The English
 * explanation stays in the HTML (hidden) and opens under the button.
 * Sends Explanation Language Toggled { to: 'en' | 'hi', item_id: 'bg-2-47', item_type: 'verse', location }.
 */

import { useId, useState, type ReactNode } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { verseItemId } from '@/lib/gitaUrls'

type Props = {
  chapter: number
  verse: number
  children: ReactNode
  location?: string
}

export default function ExplanationLanguageToggle({ chapter, verse, children, location = 'verse_page' }: Props) {
  const [open, setOpen] = useState(false)
  const id = useId()

  const toggle = () => {
    const next = !open
    setOpen(next)
    trackEvent(EVENTS.ExplanationLanguageToggled, { to: next ? 'en' : 'hi', item_id: verseItemId(chapter, verse), item_type: 'verse', location })
  }

  return (
    <div className="gv-lang-toggle">
      <button
        type="button"
        className="gita-share-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        lang="hi"
      >
        {open ? 'अंग्रेज़ी व्याख्या बंद करें' : 'अंग्रेज़ी में पढ़ें'}
      </button>
      <div id={id} hidden={!open} lang="en">
        {children}
      </div>
    </div>
  )
}
