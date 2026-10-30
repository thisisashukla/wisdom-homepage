import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function HiBlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <Nav />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
