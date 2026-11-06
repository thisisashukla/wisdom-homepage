import { Title } from './Words'

/**
 * The shared top of every inner page: a kicker pill, a two-tone serif title whose
 * words rise in, a standfirst, and an optional slot (form, art) on the right or below.
 * Same type, glow and motion as the home hero.
 */
export default function PageHero({
  kicker,
  soft,
  ink,
  sub,
  children,
  aside,
  center = false,
}: {
  kicker: string
  soft?: string
  ink: string
  sub?: React.ReactNode
  children?: React.ReactNode
  aside?: React.ReactNode
  center?: boolean
}) {
  return (
    <section className={`dh-ph${center ? ' dh-ph--center' : ''}${aside ? ' dh-ph--split' : ''}`}>
      <div className="dh-ph__glow" aria-hidden="true" />
      <div className="dh-wrap dh-ph__grid">
        <div className="dh-ph__copy">
          <p className="dh-pill dh-ph__kicker">{kicker}</p>
          <Title soft={soft} ink={ink} />
          {sub && <div className="dh-ph__sub">{sub}</div>}
          {children && <div className="dh-ph__slot">{children}</div>}
        </div>
        {aside && <div className="dh-ph__aside">{aside}</div>}
      </div>
    </section>
  )
}
