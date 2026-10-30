import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function HiRamayanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <Nav />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
