import Nav from '@/components/Nav'

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}
