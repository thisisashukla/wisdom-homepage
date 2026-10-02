'use client'

import { useEffect } from 'react'
import { isAutomatedReader } from '@/lib/device'
import { initMixpanel } from '@/lib/mixpanel'

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!isAutomatedReader(navigator.userAgent, navigator.webdriver)) initMixpanel()
  }, [])

  // Page-view tracking happens in <BlogTracker /> on each page so we get a
  // proper `page` attribution property. This provider only handles init.
  return children
}

export default MixpanelProvider
