import type { ReactNode } from 'react'
import './site.css'

export type FigureProps = {
  src: string
  alt: string
  width: number
  height: number
  caption?: ReactNode
  /** Crop to a fixed shape, e.g. '16 / 9'. Without it the picture keeps its own shape. */
  ratio?: string
  position?: string
  /** A smaller file for phones (the -800 tile). */
  srcSmall?: string
  /** Load it eagerly when it sits near the top of the page. */
  priority?: boolean
  narrow?: boolean
  className?: string
}

/** A painting or photo in the flow of a page, framed like VideoFigure: rounded card, hairline border, italic caption strip. */
export default function Figure({ src, alt, width, height, caption, ratio, position, srcSmall, priority = false, narrow = false, className }: FigureProps) {
  const style = {
    ...(ratio ? ({ '--sx-figure-ratio': ratio } as Record<string, string>) : {}),
    ...(position ? { objectPosition: position } : {}),
  }
  return (
    <figure className={['sx-figure', narrow && 'sx-figure--narrow', className].filter(Boolean).join(' ')}>
      <img
        src={src}
        srcSet={srcSmall ? `${srcSmall} 800w, ${src} ${width}w` : undefined}
        sizes={srcSmall ? '(max-width: 760px) 100vw, 720px' : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={Object.keys(style).length ? style : undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
