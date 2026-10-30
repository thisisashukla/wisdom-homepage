/** Decorative icon, drawn by a CSS mask in card.css (no inline SVG per card). */

export type IconName = 'copy' | 'check' | 'whatsapp' | 'save' | 'play' | 'pause' | 'share' | 'close'

export const Icon = ({ name }: { name: IconName }) => <span className={`qi qi-${name}`} aria-hidden="true" />
