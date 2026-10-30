/** A link from an Ashtavakra verse to the Bhagavad Gita verse that carries the same thread (Wisdom gold). */
import { gitaVersePath, type AgBridge } from '@/lib/funnels/other-gitas/data'

export default function BridgeLink({ from, bridge }: { from: string; bridge: AgBridge }) {
  const to = `${bridge.c}.${bridge.v}`
  return (
    <a
      className="fx-bridge"
      href={gitaVersePath(bridge.c, bridge.v)}
      data-fx-event="Gita Bridge Tapped"
      data-fx-props={JSON.stringify({ from, to_ref: to })}
    >
      <strong>Bhagavad Gita {to}</strong>
      <span>{bridge.note}</span>
    </a>
  )
}
