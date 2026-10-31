import './gita.css'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function GitaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gita-shell">
      <Nav locale="en" />
      {children}
      <SiteFooter />
    </div>
  )
}
