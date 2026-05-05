'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  // Only gate individual blog pages — /blogs index is public
  const isProtected = pathname !== '/blogs'

  useEffect(() => {
    if (isProtected && !loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router, isProtected])

  if (isProtected && loading) {
    return <div className="page-loading">॥</div>
  }

  if (isProtected && !user) {
    return null
  }

  return <>{children}</>
}
