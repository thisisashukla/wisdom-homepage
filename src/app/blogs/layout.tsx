export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login wall removed — all blog pages are publicly accessible.
  return <>{children}</>
}
