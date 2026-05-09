import '../../gita/gita.css'
import GitaNav from '@/components/gita/GitaNav'

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
      <GitaNav locale="hi" />
      {children}
    </div>
  )
}
