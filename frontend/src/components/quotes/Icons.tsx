/** Decorative icon, drawn by a CSS mask in card.css (heart: keep.css) (no inline SVG per card). */

export type IconName = 'copy' | 'check' | 'whatsapp' | 'save' | 'play' | 'pause' | 'share' | 'close' | 'heart' | 'heart-fill'

export const Icon = ({ name }: { name: IconName }) => <span className={`qi qi-${name}`} aria-hidden="true" />
