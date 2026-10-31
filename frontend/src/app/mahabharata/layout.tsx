import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function MahabharataLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <SiteFooter />
    </>
  )
}
