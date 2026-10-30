import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function HiMahabharataLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="hi">
      <Nav pageName="Mahabharata HI" />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
