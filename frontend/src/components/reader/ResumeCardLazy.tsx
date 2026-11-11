'use client'

/**
 * <ResumeCard /> loaded on demand: it renders nothing on the server (it needs this device's
 * reading progress), so its code stays out of the page's first load.
 */

import dynamic from 'next/dynamic'

const ResumeCardLazy = dynamic(() => import('./ResumeCard'), { ssr: false })

export default ResumeCardLazy
