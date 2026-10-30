import { PEOPLE, relationsOf, person, SIDE_LABEL } from '@/lib/funnels/mahabharata/family'

const join = (ids: string[]) => ids.map((id) => person(id).name).join(', ')

/** The family tree as text, for screen readers, crawlers and anyone without JS. */
export default function FamilyList() {
  return (
    <details className="mb-family-list" id="family-list" data-mp-disclosure="family_list">
      <summary>Read the family as a list</summary>
      <dl>
        {PEOPLE.map((p) => {
          const r = relationsOf(p.id)
          const parts = [
            r.parents.length ? `Parents: ${join(r.parents)}.` : '',
            r.spouses.length ? `Married to: ${join(r.spouses)}.` : '',
            r.children.length ? `Children: ${join(r.children)}.` : '',
            r.kin.length ? `Kin: ${join(r.kin)}.` : '',
            p.note ?? '',
            `Day 1: ${p.sideNote ?? SIDE_LABEL[p.side]}`,
          ].filter(Boolean)
          return (
            <div key={p.id} id={`fam-${p.id}`}>
              <dt>
                {p.page ? <a href={`/mahabharata/characters/${p.page}`}>{p.name}</a> : p.name} <span lang="hi">({p.hi})</span>
              </dt>
              <dd>
                {p.role} {parts.join(' ')}
              </dd>
            </div>
          )
        })}
      </dl>
    </details>
  )
}
