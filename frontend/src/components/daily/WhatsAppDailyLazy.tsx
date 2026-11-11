'use client'

/**
 * <WhatsAppDaily /> loaded on demand: it renders nothing on the server (it reads this device's
 * reading and dismissal state first), so its code stays out of the page's first load.
 */

import dynamic from 'next/dynamic'

const WhatsAppDailyLazy = dynamic(() => import('./WhatsAppDaily'), { ssr: false })

export default WhatsAppDailyLazy
