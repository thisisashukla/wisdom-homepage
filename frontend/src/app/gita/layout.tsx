import './gita.css'
import GitaNav from '@/components/gita/GitaNav'

export default function GitaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gita-shell">
      <GitaNav locale="en" />
      {children}
    </div>
  )
}
