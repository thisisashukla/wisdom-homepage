'use client'

import { useEffect, useState } from 'react'
import { appStoreUrl, detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackLinkClick } from '@/lib/mixpanel'

/** Nav CTA: iPhone → App Store; everyone else → /start (the app's onboarding on the web). */
export default function GetAppButton({ pageName = 'unknown' }: { pageName?: string }) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  useEffect(() => setPlatform(detectPlatform()), [])
  const ios = platform === 'ios'
  const href = ios ? appStoreUrl('web_nav') : startUrl({ ref: 'nav' })
  return (
    <a
      href={href}
      className="nav-cta"
      target={ios ? '_blank' : undefined}
      rel={ios ? 'noopener' : undefined}
      onClick={() => trackLinkClick(pageName, ios ? 'nav_get_app' : 'nav_find_verse', href)}
    >
      {ios ? 'Get the app' : 'Week 1 free'}
    </a>
  )
}
