import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function UpanishadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
