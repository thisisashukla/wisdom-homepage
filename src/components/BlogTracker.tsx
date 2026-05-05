'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageViewed, trackAppStoreClick } from '@/lib/mixpanel'

interface BlogTrackerProps {
  /** Page identifier used as the `page` attribution property on every event. */
  pageName: string
}

export function BlogTracker({ pageName }: BlogTrackerProps) {
  const pathname = usePathname()

  // Page Viewed — fired once per page, with the page name as the attribution.
  useEffect(() => {
    trackPageViewed(pageName, pathname)
  }, [pageName, pathname])

  // App Store Button Clicked — wires up every <a data-mp-location="..."> on the page.
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[data-mp-location]')

    const handleLinkClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement
      const location = link.getAttribute('data-mp-location') || 'unknown'
      const href = link.getAttribute('href') || ''
      trackAppStoreClick(pageName, location, href)
    }

    links.forEach((link) => link.addEventListener('click', handleLinkClick))
    return () => {
      links.forEach((link) => link.removeEventListener('click', handleLinkClick))
    }
  }, [pageName])

  return null
}

export default BlogTracker
