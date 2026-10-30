import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function RamShalakaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <Nav />
      {children}
      <SiteFooter locale="en" />
    </div>
  )
}
