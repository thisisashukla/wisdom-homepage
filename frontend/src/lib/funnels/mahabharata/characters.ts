/** Character pages: /mahabharata/characters/[slug]. All copy reviewed: false. */

export type Beat = { title: string; text: string; ref?: string }
export type GitaBridge = { c: number; v: number; label: string; why: string }
export type Character = {
  slug: string
  personId: string
  name: string
  title: string
  description: string
  h1: string
  quickAnswer: string
  choice: { moment: string; lineId: string; plain: string }
  /** The line set large in the page hero (never the choice line, which the choice card reveals). */
  heroLineId: string
  beats: Beat[]
  lineIds: string[]
  gita: GitaBridge[]
  faq: { q: string; a: string }[]
}

export const CHARACTERS: Character[] = [
  {
    slug: 'karna',
    heroLineId: 'mbh.5.141.12',
    personId: 'karna',
    name: 'Karna',
    title: 'Karna in the Mahabharata: His Choice, in Sanskrit',
    description: 'Who Karna was, why he stayed with Duryodhana, and what he promised Kunti, with the Sanskrit lines he speaks (MBh 5.141 and 5.146).',
    h1: 'Karna',
    quickAnswer:
      'Karna is Kunti\'s first son, born before her marriage and raised by the charioteer Adhiratha and his wife Radha. On the eve of war Kunti tells him the truth (MBh 5.145.2). He stays with Duryodhana, and promises her she will always have five sons (MBh 5.146.23).',
    choice: {
      moment: 'Kunti asks him to cross over to his brothers before the war.',
      lineId: 'mbh.5.146.23',
      plain: 'He refuses to change sides, and spares four of her sons. Only Arjuna, he says, will meet him in battle.',
    },
    beats: [
      { title: 'Let go at birth', text: 'Kunti, still unmarried, bears him by the Sun and sets him adrift. Adhiratha finds him and gives him to Radha, who nurses him as her own.', ref: 'MBh 5.141.3 to 6' },
      { title: 'A friend who stands by him', text: 'Mocked for his birth at the tournament, he is made king of Anga by Duryodhana. That debt shapes everything after.' },
      { title: 'In the dice hall', text: 'He sides with the Kauravas and speaks against Draupadi. On his last day Krishna throws those words back at him.' },
      { title: 'Krishna\'s offer', text: 'Krishna tells him he is Kunti\'s eldest and could be king. He says he already knows, and refuses: the bonds of the family that raised him cannot be made false.', ref: 'MBh 5.141.12' },
      { title: 'Kunti\'s visit', text: 'Kunti comes to him by the river. He tells her what her choice cost him, then promises to spare four of her sons.', ref: 'MBh 5.146.5 to 23' },
      { title: 'The seventeenth day', text: 'He fights once Bhishma has fallen, commands the Kaurava army, and is killed by Arjuna.' },
    ],
    lineIds: ['mbh.5.141.5', 'mbh.5.141.12', 'mbh.5.141.21', 'mbh.5.146.5', 'mbh.5.146.19', 'mbh.5.146.23'],
    gita: [
      { c: 2, v: 7, label: 'Gita 2.7', why: 'Arjuna, the brother Karna never stood beside, admits he cannot see his duty and asks to be taught.' },
      { c: 3, v: 35, label: 'Gita 3.35', why: 'Krishna on keeping to one\'s own dharma, imperfect as it may be. Readers have long tested Karna\'s loyalty against it.' },
    ],
    faq: [
      { q: 'Why did Karna side with Duryodhana?', a: 'He tells Krishna himself: Adhiratha and Radha raised him, his own wives and sons came through that life, and Duryodhana stood by him for thirteen years. Not for the whole earth, he says, could he make those bonds false (MBh 5.141.12).' },
      { q: 'Did Karna know he was a Pandava?', a: 'When Krishna tells him, he answers that he already knows he is Kunti\'s son (MBh 5.141.2 to 3). He adds that if Yudhishthira learned it, he would hand Karna the kingdom, which Karna would give to Duryodhana.' },
      { q: 'What did Karna promise Kunti?', a: 'That he would not kill Yudhishthira, Bhima, Nakula or Sahadeva, and that she would always have five sons: with Karna if Arjuna fell, or with Arjuna if Karna fell (MBh 5.146.20 to 23).' },
      { q: 'Who killed Karna?', a: 'Arjuna, on the seventeenth day of the war, in the Karna Parva.' },
    ],
  },
  {
    slug: 'draupadi',
    heroLineId: 'mbh.3.32.3',
    personId: 'draupadi',
    name: 'Draupadi',
    title: 'Draupadi in the Mahabharata: Her Own Words',
    description: 'Draupadi in her own voice: the boon that freed her husbands, her case for action, and what she asked of Krishna, with Sanskrit (MBh 3.32, 5.81).',
    h1: 'Draupadi',
    quickAnswer:
      'Draupadi, daughter of King Drupada, is wife to the five Pandavas and one of the epic\'s sharpest voices. After the dice game her boon frees her husbands (MBh 5.81.28). In the forest she argues that whoever is born must act (MBh 3.32.3), and before the war she asks Krishna to remember what was done to her.',
    choice: {
      moment: 'After the dice game, Dhritarashtra offers her a boon.',
      lineId: 'mbh.5.81.28',
      plain: 'She asks for her husbands\' freedom, with their chariots and weapons. They walk out free because of her.',
    },
    beats: [
      { title: 'Born from the fire altar', text: 'She rises from the middle of the altar at her father Drupada\'s sacrifice, as she herself reminds Krishna.', ref: 'MBh 5.81.21' },
      { title: 'Wife of five', text: 'Arjuna wins her at the svayamvara, and she becomes the wife of all five brothers.' },
      { title: 'A question of law', text: 'Staked and lost at dice, she asks the hall whether Yudhishthira, having lost himself first, still had the right to stake her. No elder gives her a clear answer.' },
      { title: 'The argument in the forest', text: 'She tells Yudhishthira that whoever is born must act, and that no one should hold themselves cheap. She learned statecraft, she says, sitting on her father\'s lap.', ref: 'MBh 3.32.3 to 62' },
      { title: 'Before the war', text: 'When peace talks begin, she holds up her hair and asks Krishna to remember it whenever the other side asks for peace. He promises she will see justice.', ref: 'MBh 5.81.36 to 44' },
      { title: 'After the war', text: 'Her five sons are killed in Ashwatthama\'s night raid. She demands justice, and the jewel from his forehead is brought to her.' },
    ],
    lineIds: ['mbh.3.32.3', 'mbh.3.32.58', 'mbh.3.32.62', 'mbh.5.81.28', 'mbh.5.81.40', 'mbh.5.81.36', 'mbh.5.81.44'],
    gita: [
      { c: 3, v: 8, label: 'Gita 3.8', why: '"Do your work; action is better than inaction." Draupadi makes the same case to Yudhishthira years before Krishna makes it to Arjuna.' },
      { c: 6, v: 5, label: 'Gita 6.5', why: '"Lift yourself by yourself; do not let yourself sink." Her line on never holding yourself cheap says the same.' },
    ],
    faq: [
      { q: 'Why did Draupadi have five husbands?', a: 'Arjuna wins her at the svayamvara, and she is married to all five brothers. The Adi Parva gives more than one account of why, including a boon from a past life.' },
      { q: 'What question did Draupadi ask in the dice hall?', a: 'Whether Yudhishthira had lost himself before he staked her, and if so, whether a man who was no longer free could stake her at all. The elders could not answer her.' },
      { q: 'Was Draupadi educated?', a: 'She says so herself. A learned brahmana her father kept taught Brihaspati\'s statecraft to her brothers, and she heard it too, sitting on her father\'s lap (MBh 3.32.60 to 62). Her speeches in the forest draw on it.' },
      { q: 'What did Krishna promise Draupadi?', a: 'That soon she would see the women of the Bharatas weeping, and her husbands victorious. The mountains might move, he says, but his word would not fail (MBh 5.81.44 to 48).' },
    ],
  },
  {
    slug: 'vidura',
    heroLineId: 'mbh.5.33.85',
    personId: 'vidura',
    name: 'Vidura',
    title: 'Vidura in the Mahabharata: Counsel, in Sanskrit',
    description: 'Who Vidura was, what he told Dhritarashtra on a sleepless night, and the lines of Vidura Niti, with Sanskrit (MBh 5.33 to 5.40).',
    h1: 'Vidura',
    quickAnswer:
      'Vidura is Dhritarashtra\'s half-brother and counsellor, son of the sage Vyasa and a woman of the palace. On a sleepless night the blind king calls him in, and Vidura tells him to give the Pandavas their kingdom (MBh 5.33.130). That night of advice is the Vidura Niti.',
    choice: {
      moment: 'The king cannot sleep and asks for counsel.',
      lineId: 'mbh.5.33.130',
      plain: 'Vidura tells him the thing he does not want to hear: give the Pandavas their rightful share and live at peace with your sons.',
    },
    beats: [
      { title: 'Born of Vyasa', text: 'He is Vyasa\'s son by a woman who served in the palace, raised with Dhritarashtra and Pandu. Dharma himself later tells Yudhishthira that Vidura is born of a part of him.', ref: 'MBh 3.315.22' },
      { title: 'Warnings unheeded', text: 'He warns against the dice game and reminds the king of it later: "I told you at the time of the dice."' },
      { title: 'The sleepless night', text: 'Eight chapters of counsel on speech, anger, friendship and kingship, ending again and again in one request: make peace with Pandu\'s sons.', ref: 'MBh 5.33 to 5.40' },
      { title: 'The hard advice', text: 'He reminds Dhritarashtra that he said it the day Duryodhana was born: give up the one son to save the hundred.', ref: 'MBh 5.39.5' },
      { title: 'The war and after', text: 'He takes no part in the fighting. After the war he goes to the forest with Dhritarashtra, Gandhari and Kunti.' },
    ],
    lineIds: ['mbh.5.37.15', 'mbh.5.33.85', 'mbh.5.39.73', 'mbh.5.34.79', 'mbh.5.39.5', 'mbh.5.40.12'],
    gita: [
      { c: 16, v: 21, label: 'Gita 16.21', why: 'Vidura\'s three gates of hell, desire, anger and greed (MBh 5.33.73), are the same verse, word for word.' },
      { c: 6, v: 5, label: 'Gita 6.5', why: '"The self alone is the self\'s friend, and the self alone its enemy" (MBh 5.34.65) is half of this verse.' },
    ],
    faq: [
      { q: 'What is Vidura Niti?', a: 'The counsel Vidura gives Dhritarashtra on the night before Sanjaya reports from the Pandavas, eight chapters of the Udyoga Parva (MBh 5.33 to 5.40). It is a book of practical ethics, aimed at one king who will not act on it.' },
      { q: 'Did Vidura fight in the war?', a: 'No. He takes no side on the field. After the war he goes to the forest with Dhritarashtra.' },
      { q: 'Who was Vidura\'s father?', a: 'The sage Vyasa. Tradition, and Dharma\'s own words to Yudhishthira (MBh 3.315.22), hold that Vidura is born of a part of Dharma.' },
    ],
  },
  {
    slug: 'kunti',
    heroLineId: 'mbh.5.133.15',
    personId: 'kunti',
    name: 'Kunti',
    title: 'Kunti in the Mahabharata: Her Secret, in Sanskrit',
    description: 'Kunti\'s message to Yudhishthira through the story of Vidula, and the day she told Karna he was her son, with Sanskrit (MBh 5.133, 5.145).',
    h1: 'Kunti',
    quickAnswer:
      'Kunti, also called Pritha, is Pandu\'s queen and mother of Karna, Yudhishthira, Bhima and Arjuna. Before the war she sends Yudhishthira the story of Vidula, who told her son to blaze rather than smoulder (MBh 5.133.15), and she goes to Karna to tell him he is her son (MBh 5.145.2).',
    choice: {
      moment: 'Days before the war, Kunti goes to Karna by the river.',
      lineId: 'mbh.5.145.2',
      plain: 'She tells him the secret she has kept all his life, and asks him to join his brothers.',
    },
    beats: [
      { title: 'A mantra and a son', text: 'As a girl in King Kuntibhoja\'s house she receives a mantra from the sage Durvasa. She calls the Sun and bears Karna, and lets him go.', ref: 'MBh 5.141.3' },
      { title: 'Five sons to raise', text: 'Married to Pandu, she bears Yudhishthira, Bhima and Arjuna, and raises Madri\'s twins as her own after Madri dies.' },
      { title: 'A message for her son', text: 'Through Krishna she sends Yudhishthira the story of Vidula, a mother who would not let her defeated son lie down.', ref: 'MBh 5.132 to 5.133' },
      { title: 'The secret told', text: 'She goes to Karna and tells him he is her firstborn. He refuses to change sides but promises to spare four of her sons.', ref: 'MBh 5.145 to 5.146' },
      { title: 'The forest', text: 'After the war she leaves the palace with Dhritarashtra and Gandhari to live in the forest.' },
    ],
    lineIds: ['mbh.5.145.2', 'mbh.5.145.3', 'mbh.5.132.5', 'mbh.5.133.15', 'mbh.5.133.7', 'mbh.5.146.26'],
    gita: [
      { c: 2, v: 3, label: 'Gita 2.3', why: 'Krishna\'s first words to Arjuna, "Stand up," are Vidula\'s words to her son, and Kunti\'s to Yudhishthira.' },
      { c: 2, v: 38, label: 'Gita 2.38', why: 'Vidula says the wise grieve over neither gain nor loss (MBh 5.133.17), the evenness the Gita asks for.' },
    ],
    faq: [
      { q: 'Why did Kunti abandon Karna?', a: 'She was unmarried and young when she bore him. Karna himself tells Krishna that she let him go at the Sun\'s word (MBh 5.141.3). He also tells her plainly what it cost him (MBh 5.146.5).' },
      { q: 'What did Kunti ask Karna?', a: 'To come over to the Pandavas and take his place as the eldest (MBh 5.145.8 to 12). He refused, and she asked him to keep his promise to spare four of her sons (MBh 5.146.26).' },
      { q: 'Who is Vidula?', a: 'A queen in an older story that Kunti tells, who rouses her defeated son to fight again. Kunti sends the story to Yudhishthira through Krishna.' },
    ],
  },
  {
    slug: 'bhishma',
    heroLineId: 'mbh.5.147.20',
    personId: 'bhishma',
    name: 'Bhishma',
    title: 'Bhishma in the Mahabharata: The Vow He Kept',
    description: 'Bhishma\'s vow, why he kept it when the kingdom begged him to rule, and his teaching from the bed of arrows, with Sanskrit (MBh 5.147, 12, 13).',
    h1: 'Bhishma',
    quickAnswer:
      'Bhishma, son of King Shantanu and the river Ganga, gave up the throne and marriage so that his father could marry Satyavati. In the Udyoga Parva he reminds Duryodhana of that vow (MBh 5.147.20). He commands the Kaurava army for ten days, then teaches Yudhishthira from a bed of arrows.',
    choice: {
      moment: 'The kingdom has no king, and the people and Satyavati beg him to rule.',
      lineId: 'mbh.5.147.34-35',
      plain: 'He refuses. He will not make his vow false, least of all for the mother he made it for.',
    },
    beats: [
      { title: 'Devavrata', text: 'Born to Shantanu and Ganga, he is named Devavrata and trained as heir.' },
      { title: 'The vow', text: 'So his father can marry Satyavati, he gives up the throne and swears never to have children. The terrible vow gives him his name, Bhishma.', ref: 'MBh 5.172.17' },
      { title: 'Serving his brother', text: 'He places his half-brother Vichitravirya on the throne and serves him.', ref: 'MBh 5.147.22' },
      { title: 'Refusing the throne again', text: 'When Vichitravirya dies and the kingdom starves, he still will not rule.', ref: 'MBh 5.147.29 to 35' },
      { title: 'Ten days in command', text: 'He leads the Kaurava army for ten days and will not fight Shikhandi. On the tenth day he falls.', ref: 'MBh 5.172.16 to 20' },
      { title: 'The bed of arrows', text: 'Lying on the arrows, he teaches Yudhishthira through the Shanti and Anushasana Parvas, and dies when the sun turns north.' },
    ],
    lineIds: ['mbh.5.147.20', 'mbh.5.147.34-35', 'mbh.5.172.17', 'mbh.12.305.20', 'mbh.13.175.8'],
    gita: [
      { c: 2, v: 4, label: 'Gita 2.4', why: 'Arjuna asks how he can shoot arrows at Bhishma and Drona, who deserve his worship.' },
      { c: 1, v: 12, label: 'Gita 1.12', why: 'Bhishma blows his conch, and the war, and the Gita, begin.' },
    ],
    faq: [
      { q: 'Why is he called Bhishma?', a: 'Bhishma means "the terrible one". He takes the name from his vow to give up the throne and never have children, so that his father could marry Satyavati.' },
      { q: 'How did Bhishma die?', a: 'He falls on the tenth day of the war, pierced by Arjuna\'s arrows with Shikhandi in front, and lies on a bed of arrows. Granted the choice of when to die, he waits for the sun to turn north.' },
      { q: 'What did Bhishma teach Yudhishthira?', a: 'Kingship, conduct in hard times, and the way to release, across the Shanti and Anushasana Parvas. He often teaches through older stories, like the golden swan\'s talk with the Sadhyas (MBh 12.305).' },
    ],
  },
  {
    slug: 'yudhishthira',
    heroLineId: 'mbh.3.314.131',
    personId: 'yudhishthira',
    name: 'Yudhishthira',
    title: 'Yudhishthira: The Yaksha and the Choice',
    description: 'Yudhishthira at the Yaksha\'s lake, why he chose Nakula, and what he told Draupadi about dharma, with Sanskrit (MBh 3.31, 3.314).',
    h1: 'Yudhishthira',
    quickAnswer:
      'Yudhishthira, eldest of the Pandavas, is Kunti\'s son by Dharma. At the poisoned lake he answers the Yaksha\'s questions. Asked for the greatest wonder, he says that people watch others die every day and still act as if they will live forever (MBh 3.314.118).',
    choice: {
      moment: 'The Yaksha offers to bring back one of his four brothers.',
      lineId: 'mbh.3.314.135',
      plain: 'He picks Nakula, Madri\'s son, over his own mother\'s Bhima and Arjuna, so that both his mothers keep a son.',
    },
    beats: [
      { title: 'Son of Dharma', text: 'Kunti calls Dharma with her mantra, and Yudhishthira is born.' },
      { title: 'The dice', text: 'He accepts the challenge to play, and stakes and loses his kingdom, his brothers, himself and Draupadi.' },
      { title: 'The forest', text: 'Draupadi presses him to act. He answers that he gives because it should be given, without an eye on the reward.', ref: 'MBh 3.31.2' },
      { title: 'The Yaksha\'s lake', text: 'His four brothers lie dead by the water. He answers every question, and the Yaksha turns out to be Dharma, his father.', ref: 'MBh 3.314 to 3.315' },
      { title: 'After the war', text: 'Grief-stricken, he wants to give up the throne. Bhishma teaches him from the bed of arrows.' },
      { title: 'The last walk', text: 'He walks toward the mountains with his brothers and Draupadi, and will not enter heaven without the dog that followed him.' },
    ],
    lineIds: ['mbh.3.314.118', 'mbh.3.314.119', 'mbh.3.314.131', 'mbh.3.314.132', 'mbh.3.31.2', 'mbh.3.315.24'],
    gita: [
      { c: 2, v: 47, label: 'Gita 2.47', why: '"I give because it should be given" (MBh 3.31.2) is the Gita\'s act without craving the fruit, said in the forest years before.' },
      { c: 2, v: 27, label: 'Gita 2.27', why: 'His greatest wonder, that we forget we will die, meets Krishna\'s "for the born, death is certain".' },
    ],
    faq: [
      { q: 'Why is Yudhishthira called Dharmaraja?', a: 'He is Dharma\'s son, and he is known for holding to dharma. At the Yaksha\'s lake Dharma himself tests him and calls him his son (MBh 3.315.6).' },
      { q: 'What did Yudhishthira answer the Yaksha?', a: 'Dozens of questions, from what is heavier than the earth (a mother) to the greatest wonder. See all of them, with the Sanskrit, on our Yaksha prashna page.' },
      { q: 'Why did Yudhishthira choose Nakula?', a: 'Kunti still had a living son in him; Madri had none. "As Kunti is, so is Madri," he says. "I want the same for both my mothers" (MBh 3.314.135).' },
      { q: 'Why did Yudhishthira gamble?', a: 'He was challenged to play, and a king of his time was bound to accept a challenge. The Sabha Parva shows him unable to stop once the game began.' },
    ],
  },
]

export const characterBySlug = (slug: string): Character | undefined => CHARACTERS.find((c) => c.slug === slug)
