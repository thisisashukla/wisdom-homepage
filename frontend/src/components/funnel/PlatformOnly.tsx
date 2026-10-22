'use client'

import React, { useEffect, useState } from 'react'
import { detectPlatform, type Platform } from '@/lib/app'

/**
 * Renders children only on the listed platforms, after detection. Nothing is
 * rendered on the server, so a phone that can't use it never sees it.
 */
export default function PlatformOnly({
  on,
  children,
  fallback = null,
}: {
  on: Platform[]
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [platform, setPlatform] = useState<Platform | null>(null)
  useEffect(() => setPlatform(detectPlatform()), [])
  if (platform === null) return null
  return <>{on.includes(platform) ? children : fallback}</>
}
