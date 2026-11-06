/* eslint-disable @next/next/no-img-element */
/**
 * CSS-drawn device frames around real simulator captures (Oct 2026). Screens are
 * 720 px wide WebP in /dhyaan-assets/screens; the frames carry no Apple artwork.
 */
export function Phone({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`dh-phone ${className}`}>
      <img src={src} alt={alt} width={720} height={1565} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <span className="dh-phone__island" aria-hidden="true" />
    </div>
  )
}

export function Watch({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`dh-watch ${className}`}>
      <span className="dh-watch__band dh-watch__band--top" aria-hidden="true" />
      <div className="dh-watch__case">
        <img src={src} alt={alt} width={422} height={514} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
      <span className="dh-watch__crown" aria-hidden="true" />
      <span className="dh-watch__band dh-watch__band--bottom" aria-hidden="true" />
    </div>
  )
}

/** Generic earbud and watch glyphs for small labels (not Apple product artwork). */
export function BudGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="dh-glyph">
      <path d="M7.5 3.5a3.5 3.5 0 0 0-3.5 3.6c0 2 1.4 3.4 3 3.6v8.3a1.5 1.5 0 0 0 3 0V7.2A3.6 3.6 0 0 0 7.5 3.5Z" fill="currentColor" />
      <path d="M16.5 3.5a3.5 3.5 0 0 1 3.5 3.6c0 2-1.4 3.4-3 3.6v8.3a1.5 1.5 0 0 1-3 0V7.2a3.6 3.6 0 0 1 2.5-3.7Z" fill="currentColor" opacity=".7" />
    </svg>
  )
}

export function WatchGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="dh-glyph">
      <path d="M8.5 2h7l.8 3.2H7.7L8.5 2Zm0 20h7l.8-3.2H7.7L8.5 22Z" fill="currentColor" opacity=".55" />
      <rect x="5.5" y="5" width="13" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="19" y="9.5" width="1.8" height="3.5" rx=".9" fill="currentColor" />
      <path d="M12 9v3.2l2 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}
