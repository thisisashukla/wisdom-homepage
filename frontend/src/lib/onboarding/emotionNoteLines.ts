// Example notes for the "Say it in your own words" screen, written for the exact word
// picked on the feeling screen. The note screen used to show the lines of the word's
// need, so "Grateful" (need: faith) got "Searching" lines about emptiness and envy.
//
// Words that are their need's own word (Restless, Stuck, Uneasy, Determined, Curious)
// are not here: they keep the age × life stage set in noteLines.ts, written for them.
// Every other word gets three lines for the life stage (morning, afternoon, night),
// then three of its general lines. Keep each note ≤ 68 characters and in the word's
// own feeling: nothing in "Grateful" should read as envy, emptiness or regret.
//
// The app (wisdom/app/constants/emotionNoteLines.ts) and the web
// (wisdom-homepage/frontend/src/lib/onboarding/emotionNoteLines.ts) share this file. Keep in sync.

type Triple = readonly [morning: string, afternoon: string, night: string];
type Stage = "studying" | "working" | "own_thing" | "raising_kids" | "caring_parents" | "retired";
export type EmotionLines = { general: readonly string[]; byStage: Record<Stage, Triple> };

export const EMOTION_LINES: Record<string, EmotionLines> = {
  // ── heavy ──
  anxious: {
    general: [
      "My heart races before I've even opened my email.",
      "I keep checking my bank app, as if the number will change.",
      "I lie awake running through everything that could go wrong.",
      "I wake at 4 with my chest tight about the week ahead.",
      "Every time my phone buzzes I expect bad news.",
      "I've rehearsed tomorrow's meeting ten times in my head.",
    ],
    byStage: {
      studying: ["Exam in three days and my stomach knots before breakfast.", "Results are out Friday. I've refreshed the portal all afternoon.", "At 1am I'm still sure I failed the paper I wrote today."],
      working: ["Appraisal week, and I feel sick before I've opened my laptop.", "My manager said 'quick chat at 4' and I can't focus on anything.", "Layoff rumours again, and I'm awake doing the sums at midnight."],
      own_thing: ["Rent on the shop is due Monday and sales are slow this month.", "A client hasn't paid in 60 days and I keep checking the account.", "At night I picture the business folding and can't breathe easy."],
      raising_kids: ["My son's fever is back and I'm dreading the call from school.", "Every time the school's number flashes up, my heart jumps.", "She's coughing in the next room and I can't stop listening."],
      caring_parents: ["Dad's reports come today and I haven't eaten since waking.", "Every missed call from home makes my hands go cold.", "Mum lives alone in Lucknow and I lie awake picturing her falling."],
      retired: ["Prices keep rising and I check our savings every morning.", "My scan results are due this week and the days drag.", "At night I worry about who will look after us when we're older."],
    },
  },
  overthinking: {
    general: [
      "I sent 'okay' and spent the morning wondering if it sounded rude.",
      "One small comment at lunch, and I've thought about it all day.",
      "I run tomorrow's conversation five different ways before I sleep.",
      "I've read one text from her six times, trying to decode the tone.",
      "I make a list of pros and cons, then a list about the list.",
      "I can't pick a restaurant without reading every single review.",
    ],
    byStage: {
      studying: ["I rewrote one email to my professor eight times before sending.", "I keep wondering if my friends were laughing at me or with me.", "Lights off, and I'm still choosing between two elective courses."],
      working: ["My boss replied 'noted.' I've read meaning into it all morning.", "I keep rethinking a slide I already presented on Tuesday.", "In bed I rehearse what I should have said in the meeting."],
      own_thing: ["I've changed the price on my website three times since breakfast.", "One customer frowned at the menu. I've redesigned it in my head.", "At midnight I'm still weighing two logos that look almost the same."],
      raising_kids: ["Did I pick the right school? I'm asking myself again at breakfast.", "Another parent said something about screen time. I'm still on it.", "She cried at drop-off and I've wondered why all evening."],
      caring_parents: ["Mum sounded different on the call. I've replayed every word.", "I keep weighing whether Papa should move in or stay in Jaipur.", "At 2am I'm comparing hospitals for Dad's knee, tab after tab."],
      retired: ["My son said 'we'll see' about visiting. I've thought of little else.", "I keep going back and forth on selling the house.", "Lying awake wondering if I said too much at the family lunch."],
    },
  },
  guilty: {
    general: [
      "I snapped at my mother on the phone and she went quiet.",
      "I promised to call a friend back and didn't. That was a week ago.",
      "I said something cruel in an argument and can't unsay it.",
      "I missed my friend's wedding for work. I still think about it.",
      "I lied to cover a small mistake and it has grown since.",
      "I keep thinking about how I treated my brother when we were kids.",
    ],
    byStage: {
      studying: ["I told my parents I was studying. I spent the week gaming.", "I copied part of a classmate's assignment. Nobody knows.", "Papa pays my fees from his savings and I skipped class again."],
      working: ["I took credit in the meeting for work my junior did.", "I said yes to my team, then forgot. They covered for me.", "I worked through my daughter's birthday dinner. Again."],
      own_thing: ["I let an employee go last week and I keep seeing her face.", "I promised a supplier I'd pay this month and I can't.", "I've missed every family dinner since I started this business."],
      raising_kids: ["I shouted at my son this morning over a lost shoe.", "I was on my phone the whole time at her school play.", "He asked me to play after dinner. I said tomorrow. Third time."],
      caring_parents: ["Dad asked me to stay longer. I took the earlier flight anyway.", "I lost my temper when Mum asked the same thing twice.", "I live abroad and my sister does everything for our parents."],
      retired: ["I was never home when my kids were small. Now they're busy.", "I never visited my friend in hospital. He passed last month.", "I was hard on my son about his career. He barely calls now."],
    },
  },
  hurt: {
    general: [
      "My best friend didn't invite me to her wedding.",
      "My sister told the family something I said in confidence.",
      "My father said I was a disappointment. I can't shake it.",
      "A friend I helped through everything stopped replying.",
      "They made plans in the group chat and left me out.",
      "He forgot my birthday, and so did everyone at home.",
    ],
    byStage: {
      studying: ["My roommates planned a trip. I found out from their photos.", "My professor mocked my answer in front of the whole class.", "My parents compared my marks to my cousin's again tonight."],
      working: ["My manager thanked everyone in the email except me.", "A colleague I trusted took my idea to the director.", "I heard what my team says about me when they think I've left."],
      own_thing: ["My old partner opened a rival shop down the same street.", "A friend left a one-star review after I gave her a discount.", "My family still calls my business 'your little hobby'."],
      raising_kids: ["My mother-in-law said I'm raising the kids wrong. In front of them.", "My husband laughed when I said I need a break.", "My teenager said she wishes her friend's mum was her mum."],
      caring_parents: ["I moved home to care for Papa and he still praises my brother.", "My siblings send money and think that's enough.", "Mum forgot my name today. I know it's the illness. It still hurts."],
      retired: ["My children made big plans and didn't think to ask me.", "My old colleagues stopped calling the day I retired.", "My son's family went on holiday. I saw it on WhatsApp."],
    },
  },
  angry: {
    general: [
      "I did the work and someone else got the promotion.",
      "My brother never helps, then tells me how to do things.",
      "I'm tired of being the only one who ever says sorry.",
      "My landlord kept my deposit for no reason at all.",
      "Someone cut me off in traffic and I was furious all day.",
      "I keep getting blamed for things I didn't do.",
    ],
    byStage: {
      studying: ["Our group project got a C because two people did nothing.", "My parents chose my course for me and won't hear otherwise.", "The warden fined me for something my roommate did."],
      working: ["My manager cancelled my leave after I'd booked my tickets.", "He talks over me in every meeting and nobody says a word.", "I found out the new hire earns more than me for the same job."],
      own_thing: ["A big client is 90 days late paying and still sending work.", "They shut my stall over a rule nobody else is held to.", "My cousin copied my whole business and calls it his idea."],
      raising_kids: ["I do every school run and my husband gets the credit.", "My in-laws undo every rule I set for the kids.", "The school punished my son and won't tell me what happened."],
      caring_parents: ["My brother lives ten minutes away and still won't visit Papa.", "The hospital moved Mum's surgery again without telling us.", "Relatives who never help have opinions about Dad's care."],
      retired: ["The pension office has lost my papers for the third time.", "My son decided to sell our family land without asking me.", "Nobody at the bank listens to me because I'm old."],
    },
  },
  lonely: {
    general: [
      "I moved for this job and haven't made one friend here.",
      "Everyone's busy, and I've stopped asking them to meet.",
      "I eat dinner with the TV on so the flat isn't so quiet.",
      "Weekends are the hardest. Nobody texts on a Sunday.",
      "I'm in a room full of family and still feel on my own.",
      "My phone is full of contacts and no one I can call at night.",
    ],
    byStage: {
      studying: ["New city, new college, and I eat breakfast alone every day.", "Everyone went home for Diwali. The hostel is silent.", "I call my mum at night just to hear another voice."],
      working: ["I work from home and some days I don't say a word aloud.", "I eat lunch at my desk while everyone goes out together.", "Back to an empty flat at 9, and nobody asks how my day was."],
      own_thing: ["Nobody to talk decisions through with. It's all on me.", "My friends have office jobs. Nobody gets what my day is like.", "I lock up the shop at 10 and there's no one to tell about it."],
      raising_kids: ["Up with the baby at 4, and the whole world is asleep.", "New city, two kids, and no family nearby to help.", "Kids asleep, husband on night shift, and the house is so quiet."],
      caring_parents: ["I'm the only one looking after Dad. Nobody asks about me.", "My friends stopped inviting me out once Mum got sick.", "After Ma sleeps, I sit in the kitchen with no one to talk to."],
      retired: ["My wife passed two years ago. Mornings are the hardest.", "The children are abroad and the house feels too big now.", "The phone hasn't rung all day. I checked it was working."],
    },
  },
  lost: {
    general: [
      "I don't know if I want this career or just got used to it.",
      "Everyone seems to know where they're headed except me.",
      "I don't know what I want, only what I don't.",
      "I've changed plans three times this year. None feel right.",
      "I can't tell if I'm being patient or just stuck.",
      "I keep starting over and never know which way is right.",
    ],
    byStage: {
      studying: ["Final year and I still don't know what I want to do.", "Engineering was Papa's dream. I don't know what mine is.", "Friends are applying abroad. I can't decide if I should."],
      working: ["Good job, good pay, and no idea if this is my path.", "I was offered a transfer and I can't tell what I want.", "I lie awake wondering whether to stay or start over."],
      own_thing: ["I quit my job for this business. Now I don't know what's next.", "Should I grow the shop or close it? I can't decide.", "Every advice video says something different. I'm lost."],
      raising_kids: ["I left work for the kids. I don't know who I am outside them.", "Should I go back to work? Every answer feels wrong.", "The kids are growing up and I don't know what comes after."],
      caring_parents: ["I moved back home for Dad and put my own life on hold.", "Do I bring Mum to live with us, or move back to India?", "I don't know how to plan a future around her illness."],
      retired: ["Forty years of work, and now I don't know what my days are for.", "My wife has her routine. I'm still looking for mine.", "Should we move near the children? We keep going back and forth."],
    },
  },
  empty: {
    general: [
      "I go through the morning on autopilot and can't feel much.",
      "Something's missing and I can't put a name to it.",
      "I laugh with friends, then come home feeling hollow.",
      "I got everything I planned for and it feels like nothing.",
      "Festivals used to mean something. Now it's just a holiday.",
      "I scroll for hours at night and feel emptier after.",
    ],
    byStage: {
      studying: ["I topped the exam and felt nothing when the results came.", "College is meant to be the best years. Mine feel flat.", "I scroll past midnight just to feel something."],
      working: ["I hit my targets again and couldn't feel glad about it.", "Same desk, same meetings. I can't recall the last good day.", "I come home tired and empty, and do it again tomorrow."],
      own_thing: ["The business is doing well and I feel hollow running it.", "I built this from nothing. Now it feels like just a job.", "Closing at 10, counting the cash, and feeling nothing."],
      raising_kids: ["I love my kids, but my days feel like a list of chores.", "I can't remember the last thing I did just for me.", "Everyone's fed and settled, and I feel empty inside."],
      caring_parents: ["Every day is medicines, meals and appointments. Nothing else.", "I give everything to Papa's care and have nothing left.", "I sit by Mum's bed at night and feel completely drained."],
      retired: ["No work, no rush, and the mornings feel hollow.", "The house has been quiet since the kids left. Something's gone.", "I have the time I always wanted and nothing to fill it."],
    },
  },
  // ── light ──
  hopeful: {
    general: [
      "For the first time in months, I woke up looking forward to today.",
      "I got a call back for the job I really wanted.",
      "The hard year is behind me. I want this one to be different.",
      "I slept through the night for the first time in weeks.",
      "Things with my father are finally getting better.",
      "We're expecting a baby in spring and I can't stop smiling.",
    ],
    byStage: {
      studying: ["My marks are finally going up. I want to keep it going.", "I got shortlisted for the scholarship. Interview next week.", "I think I've finally found the subject I want to study."],
      working: ["My new manager actually listens. Work feels lighter.", "The interview for the role I want is on Monday.", "I got through the week without dreading Sunday night."],
      own_thing: ["Three new customers this week. It's finally picking up.", "The bank approved the loan. I can open the second shop.", "A big client said yes today. This could change everything."],
      raising_kids: ["My son read a whole page out loud today. He's getting there.", "The baby's finally sleeping longer. I feel human again.", "My daughter and I talked properly tonight. First time in ages."],
      caring_parents: ["Papa's reports came back better than we feared.", "Mum walked to the gate on her own today.", "Dad laughed on our call tonight. I hadn't heard that in months."],
      retired: ["My grandson is coming to stay for the whole summer.", "I start a course at the community centre next week.", "My knee is healing. I'll be walking in the park again soon."],
    },
  },
  inspired: {
    general: [
      "I watched a talk this morning and haven't stopped thinking about it.",
      "A friend started over at 40. I think I can too.",
      "I read one Gita verse tonight and want to change how I work.",
      "My grandmother's story made me want to do something real.",
      "I came back from the trip full of ideas I want to start.",
      "Someone I admire replied to my message. I want to build on it.",
    ],
    byStage: {
      studying: ["Our guest lecturer built a company from her dorm. I want that.", "I finally found a project I'd work on for free.", "I stayed up sketching an app idea after the hackathon."],
      working: ["A senior leader shared her story today. I want to grow like her.", "I solved a problem everyone gave up on. I want more of that.", "I've started a side project after work. I can't wait to get to it."],
      own_thing: ["A customer told me my shop changed her mornings.", "I met a founder today who started with less than me.", "I'm up late planning a new product line I believe in."],
      raising_kids: ["My daughter painted for an hour. It made me want to paint too.", "Watching my son try again after falling made me braver.", "I want to be the parent my kids talk about with pride."],
      caring_parents: ["Papa still does his yoga at 82. I want that discipline.", "Mum's faith through all this is teaching me something.", "After Dad's old stories tonight, I want to write them down."],
      retired: ["My friend started painting at 70. I bought brushes today.", "I want to teach the kids in our lane to read.", "I'm finally writing the book I've talked about for years."],
    },
  },
  grateful: {
    general: [
      "My mother's voice on the phone this morning made my whole day.",
      "A stranger helped me with my bags today. I'm still smiling.",
      "We sat together for dinner tonight, phones away.",
      "I have a roof, work and people who love me. I want to remember it.",
      "My friend stayed on the call until I felt better.",
      "Rain in the evening, a cup of chai, and nothing to rush.",
    ],
    byStage: {
      studying: ["Papa sends my fees on time and never complains. I see it now.", "My friend shared her notes before the exam. I passed.", "My teacher stayed back to explain it again. She didn't have to."],
      working: ["My team covered for me when I was unwell. I won't forget it.", "My manager took my side in the meeting today. It meant a lot.", "Home by 7 and dinner with family. I don't take that for granted."],
      own_thing: ["My very first customer still comes back every week.", "My wife kept us going when the shop had no sales.", "I paid every bill this month. A year ago I couldn't."],
      raising_kids: ["My son hugged me at the school gate in front of his friends.", "My mother-in-law took the kids so I could rest.", "Both kids asleep, healthy and safe. That's everything."],
      caring_parents: ["Mum blessed me with her hand on my head this morning.", "Dad is still here, and still telling the same jokes.", "Another evening with my parents. I know these are precious."],
      retired: ["Forty years married, and still chai together every morning.", "My grandchildren called just to say hello.", "I have my health, my garden and my time. I'm thankful."],
    },
  },
  peaceful: {
    general: [
      "I sat by the window with my chai and didn't touch my phone.",
      "I let go of an old argument this week. I feel lighter.",
      "I read one verse tonight and slept better than in weeks.",
      "I walked to the temple at sunrise and felt still.",
      "The house is quiet and, for once, so is my mind.",
      "A few minutes of silence before bed changes how I sleep.",
    ],
    byStage: {
      studying: ["I studied in the garden this morning and felt calm.", "Exams are done. I spent the afternoon doing nothing, happily.", "I've started reading a few verses before bed. It settles me."],
      working: ["Ten minutes of quiet before work changed my whole day.", "I took my lunch outside today with no phone. It helped.", "A quiet evening, no emails. I want more of these."],
      own_thing: ["I open the shop early just to sit in the quiet first.", "The busy season is over and the days feel easy again.", "Books closed, bills paid, and my mind is still."],
      raising_kids: ["Early morning, kids asleep, just me and my tea.", "We sat in the park and watched the kids play. No rush.", "Bedtime prayers with my daughter calm us both."],
      caring_parents: ["Mum and I did her morning prayers together today.", "Papa and I sat on the porch all afternoon, barely talking.", "Ma slept well tonight, and so will I."],
      retired: ["Morning walk, chai and the newspaper. I need nothing more.", "Afternoons in the garden are my quiet place now.", "I light a diya at dusk and sit with it for a while."],
    },
  },
};
