'use client'

/**
 * iPhone only: how to keep the Chalisa one tap away (Share, then Add to Home Screen).
 * Hidden on the server render, on other devices and when the site is already opened from
 * the Home Screen, so nobody else sees it and nothing jumps on desktop.
 */

import { useEffect, useState } from 'react'
import { detectPlatform } from '@/lib/app'

export default function IosTip({ className = '' }: { className?: string }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const standalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setShow(detectPlatform() === 'ios' && !standalone)
  }, [])
  if (!show) return null
  return (
    <p className={`hc-ios-tip hc-noprint ${className}`.trim()}>
      <span aria-hidden="true" className="hc-ios-icon">
        <svg viewBox="0 0 20 20" width="16" height="16" focusable="false">
          <path
            d="M10 2.5v10M6.5 6 10 2.5 13.5 6M5 9H4a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      On iPhone, tap Share and then Add to Home Screen. The Chalisa opens in one tap on Tuesday morning.
    </p>
  )
}
