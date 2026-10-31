import '../../gita/gita.css'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  alternates: {
    languages: {
      'en-IN': 'https://wisdomquotes.in/gita',
      'hi-IN': 'https://wisdomquotes.in/hi/gita',
    },
  },
}

export default function HiGitaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gita-shell" lang="hi">
      <Nav locale="hi" />
      {children}
      <SiteFooter locale="hi" />
    </div>
  )
}
