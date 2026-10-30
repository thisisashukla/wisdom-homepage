/** Sources and method, set quietly at the foot of every page. */
import type { ReactNode } from 'react'

export default function FxSources({ children }: { children: ReactNode }) {
  return (
    <section className="og-sources" data-fx-fade="">
      <div className="wrap">
        <div className="og-sources-in">
          <h2>Sources and method</h2>
          {children}
        </div>
      </div>
    </section>
  )
}
