/** Yaksha prashna: question and answer pairs (mbh.3.314) and the 10-question quiz. */

export type QA = { q: string; a: string; topic: string }

/** In the order the Yaksha asks them. */
export const QA_PAIRS: QA[] = [
  { q: 'mbh.3.314.47', a: 'mbh.3.314.48', topic: 'The sun' },
  { q: 'mbh.3.314.49', a: 'mbh.3.314.50', topic: 'Learning and wisdom' },
  { q: 'mbh.3.314.61', a: 'mbh.3.314.62', topic: 'Heavier than the earth' },
  { q: 'mbh.3.314.63', a: 'mbh.3.314.64', topic: 'Four riddles' },
  { q: 'mbh.3.314.65', a: 'mbh.3.314.66', topic: 'Friends' },
  { q: 'mbh.3.314.75', a: 'mbh.3.314.76', topic: 'The best of things' },
  { q: 'mbh.3.314.79', a: 'mbh.3.314.80', topic: 'What to give up' },
  { q: 'mbh.3.314.89', a: 'mbh.3.314.90', topic: 'Tapas and self-control' },
  { q: 'mbh.3.314.93', a: 'mbh.3.314.94', topic: 'The hardest enemy' },
  { q: 'mbh.3.314.97', a: 'mbh.3.314.98', topic: 'The true bath' },
  { q: 'mbh.3.314.109', a: 'mbh.3.314.110', topic: 'What makes a brahmana' },
]

/** The last four questions, answered in three verses. */
export const LAST_FOUR = { q: 'mbh.3.314.116', a: ['mbh.3.314.117', 'mbh.3.314.118', 'mbh.3.314.119', 'mbh.3.314.120'] }

/** The choice: one brother may live. */
export const CHOICE = { yaksha: 'mbh.3.314.127', answer: ['mbh.3.314.131', 'mbh.3.314.132', 'mbh.3.314.135'], reveal: ['mbh.3.315.6', 'mbh.3.315.24'] }

export type QuizQ = { id: string; prompt: string; options: string[]; correct: number; why: string; lineId: string }

export const QUIZ: QuizQ[] = [
  { id: 'q1', prompt: 'What does Yudhishthira say is heavier than the earth?', options: ['Gold', 'A mother', 'Debt', 'A mountain'], correct: 1, why: '"A mother is heavier than the earth. A father is higher than the sky."', lineId: 'mbh.3.314.62' },
  { id: 'q2', prompt: 'What is faster than the wind?', options: ['Time', 'An arrow', 'The mind', 'Rumour'], correct: 2, why: '"The mind is faster than the wind."', lineId: 'mbh.3.314.62' },
  { id: 'q3', prompt: 'Who is the friend of someone about to die?', options: ['A priest', 'Their children', 'What they have given away', 'Their memories'], correct: 2, why: '"What you have given away is the friend of the dying."', lineId: 'mbh.3.314.66' },
  { id: 'q4', prompt: 'And the friend of someone far from home?', options: ['Learning', 'Money', 'A guide', 'Letters'], correct: 0, why: '"Learning is the friend of one far from home."', lineId: 'mbh.3.314.66' },
  { id: 'q5', prompt: 'What is the best of all gains?', options: ['Fame', 'Wealth', 'Sons', 'Health'], correct: 3, why: '"Health is the best gain. Contentment is the best joy."', lineId: 'mbh.3.314.76' },
  { id: 'q6', prompt: 'Give up which one, and you stop grieving?', options: ['Pride', 'Anger', 'Greed', 'Craving'], correct: 1, why: '"Give up anger and you stop grieving." Pride, craving and greed have their own answers.', lineId: 'mbh.3.314.80' },
  { id: 'q7', prompt: 'Which enemy is hardest to defeat?', options: ['Anger', 'Fear', 'Duryodhana', 'Old age'], correct: 0, why: '"Anger is the enemy hardest to defeat. Greed is the illness with no end."', lineId: 'mbh.3.314.94' },
  { id: 'q8', prompt: 'What is the true bath?', options: ['A dip in the Ganga', 'Bathing at dawn', 'Washing the mind clean', 'Fasting'], correct: 2, why: '"The true bath is washing the mind clean."', lineId: 'mbh.3.314.98' },
  { id: 'q9', prompt: 'What does Yudhishthira call the greatest wonder?', options: ['The sunrise', 'That people expect to live forever while others die every day', 'The Yaksha itself', 'The lake'], correct: 1, why: '"Day after day, living beings go to the house of death. Those left behind want to stay forever."', lineId: 'mbh.3.314.118' },
  { id: 'q10', prompt: 'Offered one brother back, whom does Yudhishthira choose?', options: ['Bhima', 'Arjuna', 'Nakula', 'Sahadeva'], correct: 2, why: 'Nakula, so that Madri, like Kunti, still has a son living.', lineId: 'mbh.3.314.135' },
]
