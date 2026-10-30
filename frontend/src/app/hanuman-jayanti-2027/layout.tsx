import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { tiroHindi } from '@/components/funnels/hanuman-chalisa/fonts'
import '@/components/funnels/hanuman-chalisa/hc.css'

export default function HanumanJayantiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`fx-hanuman-chalisa ${tiroHindi.variable}`}>
      <Nav />
      {children}
      <SiteFooter />
    </div>
  )
}
