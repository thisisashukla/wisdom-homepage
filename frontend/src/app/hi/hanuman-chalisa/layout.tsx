import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import '@/components/funnels/hanuman-chalisa/hc.css'

export default function HiHanumanChalisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <Nav />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
