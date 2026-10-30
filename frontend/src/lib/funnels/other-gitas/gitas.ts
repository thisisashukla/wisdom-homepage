/**
 * "Gitas beyond the Bhagavad Gita": source, speakers and a one-line gist for each.
 * Every claim was checked on 30 Oct 2026 (sources in lp/funnels/other-gitas/REVIEW.md). Leave out anything unverified.
 */
export type GitaKind = 'epic' | 'purana' | 'standalone' | 'anthology' | 'modern'
export type GitaEntry = {
  slug: string
  name: string
  source: string
  speakers: string
  size?: string
  gist: string
  kind: GitaKind
  href?: string
}

export const KIND_LABEL: Record<GitaKind, string> = {
  epic: 'In the Mahabharata',
  purana: 'In a Purana or Ramayana',
  standalone: 'Stands on its own',
  anthology: 'A later anthology',
  modern: 'Modern publication',
}

export const GITAS_QUICK =
  'Besides the Bhagavad Gita, Hindu tradition has dozens of texts called a Gita, a word that means song. The catalogue at sanskritdocuments.org lists more than a hundred. Most are teachings set inside a larger work, the Mahabharata or a Purana. A few stand alone, like the Ashtavakra and Avadhuta Gitas, and a few are modern.'

export const GITAS: GitaEntry[] = [
  { slug: 'bhagavad', name: 'Bhagavad Gita', kind: 'epic', source: 'Mahabharata, Bhishma Parva', speakers: 'Krishna and Arjuna, reported by Sanjaya to Dhritarashtra', size: '18 chapters, 700 verses', gist: 'Krishna teaches Arjuna to act without clinging to results, on the eve of a war he does not want to fight.', href: '/gita' },
  { slug: 'ashtavakra', name: 'Ashtavakra Gita', kind: 'standalone', source: 'Independent text, also called the Ashtavakra Samhita; date unknown', speakers: 'The sage Ashtavakra and King Janaka', size: '20 chapters, 298 verses', gist: 'A teacher tells a king that he is already the free witness of everything, and the king finds that it is so.', href: '/ashtavakra-gita' },
  { slug: 'avadhuta', name: 'Avadhuta Gita', kind: 'standalone', source: 'Independent text attributed to Dattatreya; surviving manuscripts date to about the 9th or 10th century CE', speakers: 'Dattatreya', size: '8 chapters, 289 verses', gist: 'A wandering sage sings of the Self that was never bound. The eighth chapter is likely a later addition.' },
  { slug: 'anu', name: 'Anu Gita', kind: 'epic', source: 'Mahabharata, Ashvamedhika Parva (Book 14), from chapter 16', speakers: 'Krishna and Arjuna after the war, narrated by Vaishampayana', gist: 'After the war Arjuna asks to hear the teaching again, and Krishna answers through older dialogues.' },
  { slug: 'brahmana', name: 'Brahmana Gita', kind: 'epic', source: 'Mahabharata, Ashvamedhika Parva, inside the Anu Gita', speakers: 'Krishna retells a conversation between a Brahmin and his wife', gist: 'A husband and wife talk about the body, the senses and rebirth.' },
  { slug: 'vyadha', name: 'Vyadha Gita', kind: 'epic', source: 'Mahabharata, Vana Parva', speakers: 'Markandeya tells Yudhishthira of a proud ascetic and the righteous meat-seller of Mithila', gist: 'No honest work is impure; dharma lies in how you do your own duty.' },
  { slug: 'hamsa-mbh', name: 'Hamsa Gita (Mahabharata)', kind: 'epic', source: 'Mahabharata, Shanti Parva (chapter 288 in the critical edition)', speakers: 'Bhishma tells Yudhishthira of a swan speaking with the Sadhyas', gist: 'On truth, self-restraint and patience under harsh words.' },
  { slug: 'uddhava', name: 'Uddhava Gita', kind: 'purana', source: 'Bhagavata Purana, Book 11, chapters 6 to 29', speakers: 'Krishna to his friend Uddhava, narrated by Shuka', size: 'About 1,100 verses', gist: "Krishna's last teaching before he leaves the world, including the story of the avadhuta and his teachers." },
  { slug: 'hamsa-bhag', name: 'Hamsa Gita (Bhagavata)', kind: 'purana', source: 'Bhagavata Purana, Book 11, chapter 13, inside the Uddhava Gita', speakers: 'Krishna tells Uddhava how he once taught the sage Sanaka and his brothers in the form of a swan', gist: 'How the mind and the objects of the senses cling to each other, and how to see past both.' },
  { slug: 'bhikshu', name: 'Bhikshu Gita', kind: 'purana', source: 'Bhagavata Purana, Book 11, chapter 23', speakers: 'Krishna tells Uddhava the song of a mendicant from Avanti', gist: 'A miser who loses everything finds that the mind alone makes happiness and sorrow.' },
  { slug: 'kapila', name: 'Kapila Gita', kind: 'purana', source: 'Bhagavata Purana, Book 3', speakers: 'The sage Kapila to his mother Devahuti', gist: 'A son teaches his mother the path of knowledge joined with devotion.' },
  { slug: 'gopi', name: 'Gopi Gita', kind: 'purana', source: 'Bhagavata Purana, Book 10, chapter 31', speakers: 'The gopis of Vrindavan', gist: 'A song of longing, sung when Krishna disappears from among them.' },
  { slug: 'guru', name: 'Guru Gita', kind: 'purana', source: 'Skanda Purana by most accounts; some place it in the Vishvasara Tantra', speakers: 'Shiva to Parvati', size: 'From about 100 to over 400 verses, by version', gist: 'On the guru, who the guru is and how to honour one.' },
  { slug: 'ribhu', name: 'Ribhu Gita', kind: 'purana', source: 'Shiva Rahasya, sixth part', speakers: 'The sage Ribhu to the sage Nidagha, on the slopes of Kedara', size: 'About 2,000 verses', gist: 'The Self is described again and again by negation and affirmation. Ramana Maharshi encouraged its study.' },
  { slug: 'devi', name: 'Devi Gita', kind: 'purana', source: 'Devi Bhagavata Purana, last ten chapters of Book 7', speakers: 'The Goddess to Himavan, king of the mountains', size: '10 chapters, 507 verses', gist: 'The Goddess teaches that she is the Self of all and shows how to worship her. C. Mackenzie Brown dates it no earlier than the 13th century.' },
  { slug: 'ganesha', name: 'Ganesha Gita', kind: 'purana', source: 'Ganesha Purana, Krida Khanda, chapters 138 to 148', speakers: 'Ganesha, as Gajanana, to King Varenya', size: 'About 412 verses', gist: 'Closely modelled on the Bhagavad Gita, with Ganesha as the teacher.' },
  { slug: 'shiva', name: 'Shiva Gita', kind: 'purana', source: 'Padma Purana', speakers: 'Shiva to Rama, relayed by Suta to the sages of Naimisha', size: '16 chapters', gist: 'Shiva teaches Rama about the Self, devotion and liberation.' },
  { slug: 'ishvara', name: 'Ishvara Gita', kind: 'purana', source: 'Kurma Purana, second part, first eleven chapters', speakers: 'Shiva to the sages gathered at Badarikashrama', size: '11 chapters', gist: 'Advaita and yoga taught by Shiva, often read beside the Bhagavad Gita.' },
  { slug: 'rama', name: 'Rama Gita', kind: 'purana', source: 'Adhyatma Ramayana, Uttara Kanda, chapter 5 (the Adhyatma Ramayana is dated to the 13th to 15th century)', speakers: 'Rama to Lakshmana', gist: 'Rama gives his brother the Advaita teaching that the Self alone is real.' },
  { slug: 'pandava', name: 'Pandava Gita', kind: 'anthology', source: 'A devotional anthology, also called the Prapanna Gita; most verses are not found in the Mahabharata', speakers: 'Prayers voiced by Yudhishthira, Arjuna, Draupadi, Kunti, Vidura and others, with gods and sages', size: '82 to 91 verses, by edition', gist: 'A garland of prayers of surrender to Krishna.' },
  { slug: 'mahamandal', name: 'Vishnu, Shambhu, Shakti, Surya and Dhish Gitas', kind: 'modern', source: '20th-century Sanskrit works published by the Shri Bharat Dharma Mahamandal of Kashi. The Hindi edition of the Dhish Gita confirms this; the other four share its form and frame and appear to belong to the same series', speakers: 'Teachings framed as questions to a guru, each centred on one deity', gist: 'Modern compositions in the style of the Puranic Gitas. They are not found in any Purana. A different Surya Gita, attributed to the Tattvasarayana, is also listed by sanskritdocuments.org.' },
]
