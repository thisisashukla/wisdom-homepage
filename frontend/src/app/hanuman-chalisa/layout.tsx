import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import '@/components/funnels/hanuman-chalisa/hc.css'

export default function HanumanChalisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <SiteFooter />
    </>
  )
}
