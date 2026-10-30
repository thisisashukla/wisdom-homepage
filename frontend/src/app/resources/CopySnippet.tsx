'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

export default function CopySnippet({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
    try {
      trackEvent('Resources Link Snippet Copied', { page: 'resources' })
    } catch {}
  }

  return (
    <div className="res-snippet">
      <code>{text}</code>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
