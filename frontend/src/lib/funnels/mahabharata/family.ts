/**
 * The Kuru family for the "Pull a thread" tree. Only well-established relations:
 * divine fathers and unnamed mothers are given in `note`, never as nodes.
 * army: which side the person is on when the fighting starts (Day 1).
 */

export type Side = 'pandava' | 'kaurava' | 'none'

export type Person = {
  id: string
  name: string
  hi: string
  role: string
  /** Parents as nodes (legal and birth parents both count). */
  parents: string[]
  spouses: string[]
  /** Other kin worth lighting (siblings named outside the parent link). */
  kin?: string[]
  note?: string
  side: Side
  sideNote?: string
  /** A real line from our Sanskrit, if we hold one. */
  lineId?: string
  /** Character page slug, if there is one. */
  page?: string
  /** Gita verse that bridges from this person, if natural. */
  gita?: { c: number; v: number; why: string }
}

export const PEOPLE: Person[] = [
  { id: 'ganga', name: 'Ganga', hi: 'गंगा', role: 'The river goddess, Shantanu\'s first wife and Bhishma\'s mother.', parents: [], spouses: ['shantanu'], side: 'none' },
  { id: 'shantanu', name: 'Shantanu', hi: 'शांतनु', role: 'King of Hastinapura, where the family\'s story starts.', parents: [], spouses: ['ganga', 'satyavati'], side: 'none' },
  { id: 'satyavati', name: 'Satyavati', hi: 'सत्यवती', role: 'Shantanu\'s second queen. Before her marriage she bore the sage Vyasa.', parents: [], spouses: ['shantanu'], side: 'none' },
  { id: 'bhishma', name: 'Bhishma', hi: 'भीष्म', role: 'Shantanu and Ganga\'s son. Gave up the throne and marriage so his father could marry Satyavati.', parents: ['shantanu', 'ganga'], spouses: [], side: 'kaurava', sideNote: 'Commands the Kaurava army for the first ten days.', lineId: 'mbh.5.147.20', page: 'bhishma', gita: { c: 2, v: 4, why: 'Arjuna asks how he can raise his bow against Bhishma.' } },
  { id: 'vyasa', name: 'Vyasa', hi: 'व्यास', role: 'Satyavati\'s son, the sage the epic names as its author. Father of Dhritarashtra, Pandu and Vidura.', parents: ['satyavati'], spouses: [], side: 'none', gita: { c: 18, v: 75, why: 'Sanjaya says he heard the Gita by Vyasa\'s grace.' } },
  { id: 'vichitravirya', name: 'Vichitravirya', hi: 'विचित्रवीर्य', role: 'Shantanu and Satyavati\'s son. Dies young, before he has children.', parents: ['shantanu', 'satyavati'], spouses: ['ambika', 'ambalika'], side: 'none' },
  { id: 'ambika', name: 'Ambika', hi: 'अंबिका', role: 'Vichitravirya\'s widow, mother of Dhritarashtra.', parents: [], spouses: ['vichitravirya'], side: 'none' },
  { id: 'ambalika', name: 'Ambalika', hi: 'अंबालिका', role: 'Vichitravirya\'s widow, mother of Pandu.', parents: [], spouses: ['vichitravirya'], side: 'none' },
  { id: 'dhritarashtra', name: 'Dhritarashtra', hi: 'धृतराष्ट्र', role: 'The blind king. He hears the whole war, the Gita included, from Sanjaya.', parents: ['vichitravirya', 'ambika', 'vyasa'], spouses: ['gandhari'], note: 'Born to Ambika and Vyasa, in Vichitravirya\'s name.', side: 'none', sideNote: 'Stays in Hastinapura.', lineId: 'mbh.5.39.9', gita: { c: 1, v: 1, why: 'The Gita opens with his question to Sanjaya.' } },
  { id: 'pandu', name: 'Pandu', hi: 'पांडु', role: 'King after Vichitravirya. Dies in the forest before the war.', parents: ['vichitravirya', 'ambalika', 'vyasa'], spouses: ['kunti', 'madri'], note: 'Born to Ambalika and Vyasa, in Vichitravirya\'s name.', side: 'none' },
  { id: 'vidura', name: 'Vidura', hi: 'विदुर', role: 'Dhritarashtra\'s half-brother and counsellor. His night of advice is the Vidura Niti.', parents: ['vyasa'], spouses: [], note: 'Son of Vyasa and a woman who served in the palace.', side: 'none', sideNote: 'Does not fight.', lineId: 'mbh.5.37.15', page: 'vidura' },
  { id: 'gandhari', name: 'Gandhari', hi: 'गांधारी', role: 'Dhritarashtra\'s queen, mother of the hundred. She binds her own eyes for life.', parents: [], spouses: ['dhritarashtra'], side: 'none', sideNote: 'Stays in Hastinapura.' },
  { id: 'kunti', name: 'Kunti', hi: 'कुंती', role: 'Pandu\'s queen, also called Pritha. Mother of Karna, Yudhishthira, Bhima and Arjuna.', parents: [], spouses: ['pandu'], side: 'none', sideNote: 'Not on the field.', lineId: 'mbh.5.145.2', page: 'kunti' },
  { id: 'madri', name: 'Madri', hi: 'माद्री', role: 'Pandu\'s second queen, mother of Nakula and Sahadeva. Dies with Pandu.', parents: [], spouses: ['pandu'], side: 'none' },
  { id: 'duryodhana', name: 'Duryodhana', hi: 'दुर्योधन', role: 'Eldest of Gandhari\'s hundred sons. He will not give the Pandavas even five villages.', parents: ['dhritarashtra', 'gandhari'], spouses: [], side: 'kaurava', sideNote: 'Leads the Kaurava side.' },
  { id: 'duhshasana', name: 'Duhshasana', hi: 'दुःशासन', role: 'Duryodhana\'s next brother. Drags Draupadi into the hall.', parents: ['dhritarashtra', 'gandhari'], spouses: [], side: 'kaurava' },
  { id: 'vikarna', name: 'Vikarna', hi: 'विकर्ण', role: 'A younger Kaurava, the one brother who speaks up for Draupadi in the hall.', parents: ['dhritarashtra', 'gandhari'], spouses: [], side: 'kaurava' },
  { id: 'duhshala', name: 'Duhshala', hi: 'दुःशला', role: 'Gandhari\'s only daughter, married to King Jayadratha.', parents: ['dhritarashtra', 'gandhari'], spouses: [], side: 'none' },
  { id: 'yuyutsu', name: 'Yuyutsu', hi: 'युयुत्सु', role: 'Dhritarashtra\'s son by a woman of the palace. The one son of the king who survives the war.', parents: ['dhritarashtra'], spouses: [], note: 'His mother was a vaishya woman who served the queen.', side: 'pandava', sideNote: 'Crosses to the Pandava side on Day 1, when Yudhishthira calls out.' },
  { id: 'karna', name: 'Karna', hi: 'कर्ण', role: 'Kunti\'s first son, by the Sun, born before her marriage. Raised by the charioteer Adhiratha and his wife Radha.', parents: ['kunti'], spouses: [], side: 'kaurava', sideNote: 'On the Kaurava side, but stays off the field until Bhishma falls.', lineId: 'mbh.5.146.23', page: 'karna', gita: { c: 2, v: 7, why: 'Arjuna, the brother Karna never stood beside, asks what his duty is.' } },
  { id: 'yudhishthira', name: 'Yudhishthira', hi: 'युधिष्ठिर', role: 'Eldest Pandava, Kunti\'s son by Dharma.', parents: ['pandu', 'kunti'], spouses: ['draupadi'], side: 'pandava', lineId: 'mbh.3.314.118', page: 'yudhishthira', gita: { c: 2, v: 47, why: 'He gives "because it should be given", the same stance the Gita teaches.' } },
  { id: 'bhima', name: 'Bhima', hi: 'भीम', role: 'Second Pandava, Kunti\'s son by Vayu, the wind.', parents: ['pandu', 'kunti'], spouses: ['draupadi', 'hidimbi'], side: 'pandava' },
  { id: 'arjuna', name: 'Arjuna', hi: 'अर्जुन', role: 'Third Pandava, Kunti\'s son by Indra. The archer who sits down in his chariot and asks Krishna for help.', parents: ['pandu', 'kunti'], spouses: ['draupadi', 'subhadra'], side: 'pandava', lineId: 'mbh.14.17.6', gita: { c: 2, v: 7, why: 'He asks Krishna to teach him; the Gita follows.' } },
  { id: 'nakula', name: 'Nakula', hi: 'नकुल', role: 'Madri\'s son by the Ashvins. The brother Yudhishthira chooses to bring back at the Yaksha\'s lake.', parents: ['pandu', 'madri'], spouses: ['draupadi'], side: 'pandava', lineId: 'mbh.3.314.135' },
  { id: 'sahadeva', name: 'Sahadeva', hi: 'सहदेव', role: 'Madri\'s second son by the Ashvins, the youngest Pandava.', parents: ['pandu', 'madri'], spouses: ['draupadi'], side: 'pandava' },
  { id: 'draupadi', name: 'Draupadi', hi: 'द्रौपदी', role: 'Daughter of King Drupada, wife of the five Pandavas, and one of the epic\'s sharpest voices.', parents: [], spouses: ['yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva'], side: 'none', sideNote: 'In the Pandava camp; does not fight.', lineId: 'mbh.3.32.58', page: 'draupadi', gita: { c: 6, v: 5, why: 'Her "never think little of yourself" is Krishna\'s 6.5 in another voice.' } },
  { id: 'subhadra', name: 'Subhadra', hi: 'सुभद्रा', role: 'Krishna\'s sister, Arjuna\'s wife, Abhimanyu\'s mother.', parents: [], spouses: ['arjuna'], kin: ['krishna'], side: 'none' },
  { id: 'krishna', name: 'Krishna', hi: 'श्रीकृष्ण', role: 'Son of Vasudeva, Kunti\'s brother, so a cousin to the Pandavas. Arjuna\'s friend and charioteer.', parents: [], spouses: [], kin: ['subhadra'], side: 'pandava', sideNote: 'Drives Arjuna\'s chariot and takes up no weapon.', lineId: 'mbh.14.17.12', gita: { c: 2, v: 47, why: 'The Gita is his answer to Arjuna.' } },
  { id: 'hidimbi', name: 'Hidimbi', hi: 'हिडिंबा', role: 'A rakshasi of the forest who marries Bhima.', parents: [], spouses: ['bhima'], side: 'none' },
  { id: 'abhimanyu', name: 'Abhimanyu', hi: 'अभिमन्यु', role: 'Arjuna and Subhadra\'s son. Killed on the thirteenth day inside the chakravyuha.', parents: ['arjuna', 'subhadra'], spouses: [], side: 'pandava' },
  { id: 'ghatotkacha', name: 'Ghatotkacha', hi: 'घटोत्कच', role: 'Bhima and Hidimbi\'s son. Falls to Karna\'s spear on the fourteenth night.', parents: ['bhima', 'hidimbi'], spouses: [], side: 'pandava' },
]

/** Rows of the tree, top to bottom. Groups inside a row wrap together on phones. */
export const ROWS: { label: string; groups: { label?: string; ids: string[] }[] }[] = [
  { label: 'Shantanu\'s generation', groups: [{ ids: ['ganga', 'shantanu', 'satyavati'] }] },
  { label: 'Their sons and daughters-in-law', groups: [{ ids: ['bhishma', 'vyasa', 'vichitravirya', 'ambika', 'ambalika'] }] },
  { label: 'The three brothers', groups: [{ ids: ['gandhari', 'dhritarashtra', 'vidura', 'pandu', 'kunti', 'madri'] }] },
  {
    label: 'The cousins',
    groups: [
      { label: 'Gandhari\'s children, and Yuyutsu', ids: ['duryodhana', 'duhshasana', 'vikarna', 'duhshala', 'yuyutsu'] },
      { label: 'Kunti\'s and Madri\'s sons', ids: ['karna', 'yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva'] },
      { label: 'Wives and kin', ids: ['draupadi', 'subhadra', 'krishna', 'hidimbi'] },
    ],
  },
  { label: 'The next generation', groups: [{ ids: ['abhimanyu', 'ghatotkacha'] }] },
]

const BY_ID = new Map(PEOPLE.map((p) => [p.id, p]))
export const person = (id: string): Person => {
  const p = BY_ID.get(id)
  if (!p) throw new Error(`[mahabharata] unknown person ${id}`)
  return p
}

export function childrenOf(id: string): string[] {
  return PEOPLE.filter((p) => p.parents.includes(id)).map((p) => p.id)
}

/** Everyone lit when this person's thread is pulled. */
export function relationsOf(id: string): { parents: string[]; spouses: string[]; children: string[]; kin: string[] } {
  const p = person(id)
  const spouses = Array.from(new Set([...p.spouses, ...PEOPLE.filter((q) => q.spouses.includes(id)).map((q) => q.id)]))
  const kin = Array.from(new Set([...(p.kin ?? []), ...PEOPLE.filter((q) => q.kin?.includes(id)).map((q) => q.id)]))
  return { parents: p.parents, spouses, children: childrenOf(id), kin }
}

export const SIDE_LABEL: Record<Side, string> = {
  pandava: 'Pandava side',
  kaurava: 'Kaurava side',
  none: 'Not on the field',
}
