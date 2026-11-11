/**
 * Answer-first blocks for the character pages: the question people ask about each person, a one
 * or two sentence answer drawn from the page's own copy (characters.ts quickAnswer, beats, faq),
 * and the id of the line in lines.json it rests on (never the hero line or the choice line, which
 * the page sets elsewhere).
 */
export type CharacterAnswer = { question: string; answer: string; lineId: string }

export const CHARACTER_ANSWERS: Record<string, CharacterAnswer> = {
  karna: {
    question: 'Why did Karna stay with Duryodhana?',
    answer:
      'Karna tells Krishna that the charioteer Adhiratha and his wife Radha raised him, and that Duryodhana stood by him for thirteen years. Not for the whole earth, he says, could he make those bonds false.',
    lineId: 'mbh.5.141.5',
  },
  draupadi: {
    question: 'What did Draupadi ask of Krishna before the war?',
    answer:
      'Draupadi asked Krishna to remember her hair, which Duhshasana’s hand had pulled, whenever the other side asked for peace. Krishna promised that she would soon see the women of the Bharatas weeping.',
    lineId: 'mbh.5.81.36',
  },
  vidura: {
    question: 'What did Vidura advise Dhritarashtra?',
    answer:
      'On a sleepless night before the war, Vidura tells the blind king to give the Pandavas their kingdom, and counsels him at length on how to live and rule. Above all, he says, never give up dharma for desire, fear or greed, not even to save your life.',
    lineId: 'mbh.5.40.12',
  },
  kunti: {
    question: 'What did Kunti tell Karna?',
    answer:
      'Before the war Kunti went to Karna and told him he was her firstborn, born before her marriage, and asked him to join his brothers. He refused, and she asked him to keep his promise to spare four of her sons.',
    lineId: 'mbh.5.145.3',
  },
  bhishma: {
    question: 'What was Bhishma’s vow?',
    answer:
      'Bhishma vowed to give up the throne and never have children, so that his father Shantanu could marry Satyavati. The name Bhishma, the terrible one, comes from that vow.',
    lineId: 'mbh.5.172.17',
  },
  yudhishthira: {
    question: 'What did Yudhishthira call the greatest wonder?',
    answer:
      'Asked by the Yaksha at the poisoned lake, Yudhishthira says the greatest wonder is that every day living beings go to the house of death, and those left behind still want to stay forever.',
    lineId: 'mbh.3.314.118',
  },
}
