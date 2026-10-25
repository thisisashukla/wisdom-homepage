'use client'

import React, { useEffect, useState } from 'react'
import { appStoreUrl, detectPlatform } from '@/lib/app'
import { trackEvent, trackLinkClick } from '@/lib/mixpanel'
import CreatePlanLink from './CreatePlanLink'

/**
 * Section 3 of the homepage: where you read the plan and what it costs, for
 * the visitor's own device. Defaults to "Android or computer" on the server
 * and switches to iPhone after detection, so nobody is shown a feature their
 * phone can't get.
 */
type Device = 'ios' | 'web'

export default function DevicePlans({ pageName = 'Home' }: { pageName?: string }) {
  const [device, setDevice] = useState<Device>('web')
  const [android, setAndroid] = useState(false)
  useEffect(() => {
    const p = detectPlatform()
    if (p === 'ios') setDevice('ios')
    if (p === 'android') setAndroid(true)
  }, [])

  const pick = (d: Device) => {
    if (d === device) return
    setDevice(d)
    trackEvent('Device Plan Switch', { page: pageName, device: d })
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = device === 'ios' ? 'web' : 'ios'
    pick(next)
    document.getElementById(`dp-tab-${next}`)?.focus()
  }

  const appHref = appStoreUrl('web_home_devices')
  return (
    <div className="dp">
      <div className="dp-switch" role="tablist" aria-label="Your device" onKeyDown={onKey}>
        {(
          [
            ['ios', 'iPhone'],
            ['web', 'Android or computer'],
          ] as const
        ).map(([d, label]) => (
          <button
            key={d}
            id={`dp-tab-${d}`}
            type="button"
            role="tab"
            aria-selected={device === d}
            aria-controls={`dp-panel-${d}`}
            tabIndex={device === d ? 0 : -1}
            className={`dp-tab${device === d ? ' is-on' : ''}`}
            onClick={() => pick(d)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Both panels are in the HTML (readable without JS and by search); the other one is hidden. */}
      <div className="dp-panel" role="tabpanel" id="dp-panel-ios" aria-labelledby="dp-tab-ios" hidden={device !== 'ios'}>
        <div className="dp-art dp-art-phone">
          <img
            src="/assets/app-v3/store-2.webp"
            alt="Wisdom's 7-day plans for overthinking, sleep, being far from home and guilt, each read aloud"
            loading="lazy"
            width={640}
            height={1391}
          />
        </div>
        <div className="dp-body">
          <p className="dp-price">Week 1 free</p>
          <ul className="dp-facts">
            <li>Each day is read aloud, with the Sanskrit woven in.</li>
            <li>Today&apos;s shloka sits on your Lock Screen.</li>
            <li>Pro opens weeks 2 and 3.</li>
          </ul>
          {android ? (
            <p className="dp-note">The app is on iPhone only. On this phone, your plan opens right here.</p>
          ) : (
            <a
              href={appHref}
              target="_blank"
              rel="noopener"
              className="btn-read-gita btn-read-gita-primary"
              data-mp-location="home_devices_app_store"
              onClick={() => trackLinkClick(pageName, 'home_devices_app_store', appHref)}
            >
              Download on the App Store
            </a>
          )}
        </div>
      </div>
      <div className="dp-panel" role="tabpanel" id="dp-panel-web" aria-labelledby="dp-tab-web" hidden={device !== 'web'}>
        <div className="dp-art dp-art-note" aria-hidden="true">
          <div className="dp-note-label">What&apos;s going on? <span>Example</span></div>
          <div className="dp-note-box">
            I moved to Bangalore for work a year ago. My manager keeps moving the goalposts and I lie awake replaying
            meetings.
          </div>
        </div>
        <div className="dp-body">
          <p className="dp-price">Week 1 free</p>
          <ul className="dp-facts">
            <li>Answer a few questions and say what&apos;s going on in your own words. The seven verses are chosen for it.</li>
            <li>We don&apos;t store what you write.</li>
            <li>Your first verse comes before any sign-in. Then sign in with Google and all seven days come to your inbox. No card needed.</li>
          </ul>
          <CreatePlanLink className="btn-read-gita btn-read-gita-primary" campaign="web_home_devices" location="home_devices_create_plan" pageName={pageName}>
            Create my 7-day Gita plan · Week 1 free
          </CreatePlanLink>
        </div>
      </div>
      <p className="dp-foot">No streaks, no badges. If you miss a day, the plan waits.</p>
    </div>
  )
}
