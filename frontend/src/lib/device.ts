export type DeviceOS = 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'Other'

export function deviceOS(userAgent: string, maxTouchPoints = 0): DeviceOS {
  if (/iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)) return 'iOS'
  if (/Android/i.test(userAgent)) return 'Android'
  if (/Windows/i.test(userAgent)) return 'Windows'
  if (/Macintosh|Mac OS X/i.test(userAgent)) return 'macOS'
  if (/Linux/i.test(userAgent)) return 'Linux'
  return 'Other'
}

/** Unknown devices retain an accessible App Store link; Android prioritises reading. */
export function appOffer(os: DeviceOS | null): 'app_store' | 'desktop_app' | 'web_reading' {
  return os === 'Android' ? 'web_reading' : os === 'iOS' || os === null ? 'app_store' : 'desktop_app'
}

// Linux is a real reader's OS too. Exclude automation signals, not an entire OS.
export function isAutomatedReader(userAgent: string, webdriver = false): boolean {
  return webdriver || /HeadlessChrome|bot\b|crawler|spider|lighthouse|pagespeed|prerender/i.test(userAgent)
}
