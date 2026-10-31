import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import '@/components/funnels/other-gitas/other-gitas.css'

export default function OtherGitasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <SiteFooter />
    </>
  )
}
