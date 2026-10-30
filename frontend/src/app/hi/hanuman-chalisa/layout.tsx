import Nav from '@/components/Nav'
import HomeAnimations from '@/components/HomeAnimations'
import SiteFooter from '@/components/SiteFooter'
import { tiroHindi } from '@/components/funnels/hanuman-chalisa/fonts'
import '@/app/home.css'
import '@/app/home-v3.css'
import '@/components/funnels/hanuman-chalisa/hc.css'

export default function HiHanumanChalisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi" className={`fx-hanuman-chalisa ${tiroHindi.variable}`}>
      <Nav />
      {children}
      <HomeAnimations />
      <SiteFooter locale="hi" />
    </div>
  )
}
