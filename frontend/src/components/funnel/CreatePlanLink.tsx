'use client'

import React from 'react'
import { startUrl } from '@/lib/app'
import { trackLinkClick } from '@/lib/mixpanel'

/**
 * Every "Create my free Gita reading plan" on the site. Opens /start (the app's
 * onboarding on the web) on every device, iPhone included.
 */
export default function CreatePlanLink({
  children,
  className,
  campaign,
  refTag,
  situation,
  location,
  pageName = 'Home',
  style,
}: {
  children: React.ReactNode
  className?: string
  campaign: string
  refTag?: string
  situation?: string | null
  location: string
  pageName?: string
  style?: React.CSSProperties
}) {
  const href = startUrl({ s: situation, ref: refTag ?? campaign })
  return (
    <a
      href={href}
      className={className}
      style={style}
      data-mp-location={location}
      onClick={() => trackLinkClick(pageName, location, href)}
    >
      {children}
    </a>
  )
}

/** The line under a create-plan button. */
export function CreatePlanFine({ className }: { className?: string }) {
  return <p className={className}>Week 1 is free. A few questions, about two minutes.</p>
}
