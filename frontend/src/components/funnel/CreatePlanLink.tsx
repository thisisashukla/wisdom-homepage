'use client'

import React, { useEffect, useState } from 'react'
import { appStoreUrl, detectPlatform, startUrl, type Platform } from '@/lib/app'
import { trackLinkClick } from '@/lib/mixpanel'

/**
 * Every "Create my 7-day Gita plan" on the site. On iPhone it opens the App
 * Store; on Android and computers it opens /start (the app's onboarding on the
 * web). The server renders the /start link; iPhones switch after hydration.
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
  const [platform, setPlatform] = useState<Platform>('desktop')
  useEffect(() => setPlatform(detectPlatform()), [])
  const ios = platform === 'ios'
  const href = ios ? appStoreUrl(campaign) : startUrl({ s: situation, ref: refTag ?? campaign })
  return (
    <a
      href={href}
      className={className}
      style={style}
      target={ios ? '_blank' : undefined}
      rel={ios ? 'noopener' : undefined}
      data-mp-location={location}
      onClick={() => trackLinkClick(pageName, location, href)}
    >
      {children}
    </a>
  )
}

/** The line under a create-plan button: honest about what happens on this device. */
export function CreatePlanFine({ className }: { className?: string }) {
  const [platform, setPlatform] = useState<Platform>('desktop')
  useEffect(() => setPlatform(detectPlatform()), [])
  return (
    <p className={className}>
      {platform === 'ios' ? 'Opens the App Store. Week 1 is free.' : 'Week 1 is free. A few questions, about two minutes.'}
    </p>
  )
}
