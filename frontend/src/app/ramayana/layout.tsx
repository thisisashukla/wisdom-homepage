import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import '@/components/funnels/ramayana/ramayana.css'

export default function RamayanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <noscript>
        <style>{'.rl-panel{display:block!important;grid-row:auto!important}'}</style>
      </noscript>
      <Nav />
      {children}
      <SiteFooter />
    </>
  )
}
