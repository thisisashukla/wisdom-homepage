'use client'

import { useEffect, useState } from 'react'
import { appStoreUrl, detectPlatform } from '@/lib/app'
import { trackLinkClick } from '@/lib/mixpanel'

const APPLE =
  'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'

/**
 * The App Store badge, server-rendered for everyone. On Android it becomes a
 * link to the web plan, since the app is iPhone only.
 */
export default function StoreCTA({
  campaign,
  location,
  androidRef,
  size = 'lg',
}: {
  campaign: string
  location: string
  androidRef: string
  size?: 'lg' | 'md'
}) {
  const [android, setAndroid] = useState(false)
  useEffect(() => setAndroid(detectPlatform() === 'android'), [])

  if (android) {
    const href = `/start?ref=${androidRef}`
    return (
      <a href={href} className="ap-webbtn" onClick={() => trackLinkClick('App Landing', `${location}_android`, href)}>
        Get my free 7-day plan
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    )
  }

  return (
    <a
      href={appStoreUrl(campaign)}
      target="_blank"
      rel="noopener"
      className={`ap-badge ap-badge--${size}`}
      data-mp-location={location}
      aria-label="Download Wisdom on the App Store"
    >
      <svg viewBox="0 0 24 24" className="ap-badge-apple" aria-hidden="true">
        <path d={APPLE} fill="currentColor" />
      </svg>
      <span className="ap-badge-text" aria-hidden="true">
        <small>Download on the</small>
        <strong>App Store</strong>
      </span>
    </a>
  )
}
