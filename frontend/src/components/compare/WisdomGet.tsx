'use client'

import PlatformOnly from '@/components/funnel/PlatformOnly'
import { appStoreUrl, startUrl } from '@/lib/app'

/**
 * Wisdom's own link inside a comparison: the App Store on iPhone, the web version
 * (/start) everywhere else, since the app is iPhone only.
 */
export default function WisdomGet({ location, campaign }: { location: string; campaign: string }) {
  return (
    <PlatformOnly
      on={['ios']}
      fallback={
        <a className="sx-btn sx-btn--link" href={startUrl({ ref: campaign })} data-mp-location={`${location}_web`}>
          Try a week of verses on the web
        </a>
      }
    >
      <a className="sx-btn sx-btn--link" href={appStoreUrl(campaign)} target="_blank" rel="noopener" data-mp-location={location}>
        Open Wisdom on the App Store
      </a>
    </PlatformOnly>
  )
}
