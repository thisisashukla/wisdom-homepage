import './gita.css'
import GitaNav from '@/components/gita/GitaNav'
import SiteFooter from '@/components/SiteFooter'

export default function GitaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gita-shell">
      <GitaNav locale="en" />
      {children}
      <SiteFooter />
    </div>
  )
}
