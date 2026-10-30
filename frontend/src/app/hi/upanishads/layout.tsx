import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function HiUpanishadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <Nav />
      <main>{children}</main>
      <SiteFooter locale="hi" />
    </div>
  )
}
