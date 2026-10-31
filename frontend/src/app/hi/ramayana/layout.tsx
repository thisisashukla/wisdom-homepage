import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import '@/components/funnels/ramayana/ramayana.css'

export default function HiRamayanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <noscript>
        <style>{'.rl-panel{display:block!important;grid-row:auto!important}'}</style>
      </noscript>
      <Nav />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
