'use client'

import { useEffect } from 'react'
import { trackEvent, trackAppStoreClick } from '@/lib/mixpanel'

interface BlogTrackerProps {
  pageName: string
}

export function BlogTracker({ pageName }: BlogTrackerProps) {
  useEffect(() => {
    trackEvent(`${pageName} Page Viewed`, {})
  }, [pageName])

  useEffect(() => {
    const links = document.querySelectorAll('a[data-mp-location]')

    const handleLinkClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement
      const location = link.getAttribute('data-mp-location')
      const href = link.getAttribute('href') || ''

      if (location) {
        trackAppStoreClick(location, pageName, href)
      }
    }

    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick)
      })
    }
  }, [pageName])

  return null
}

export default BlogTracker
