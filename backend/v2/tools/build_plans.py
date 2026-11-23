"""
Builds backend/v2/data/plans.json: the prebuilt reading plans /api/v2/day1 matches people to.

    python v2/tools/build_plans.py

Sources:
  - the 15 reviewed web theme plans (frontend/src/content/plans/*.json), with library substitutes where a verse is
    missing from the 1,765-verse library or unsafe for the people the plan serves (OVERRIDES)
  - NEW_PLANS below, drafted from v2/tools/plan_candidates.py (reviewed: false until Ankur reviews them)
  - PROFILES below: what each plan is for, in the words matching uses (feelings, situations, example notes, stages)
"""
import json
import os
import sys

BACKEND = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WEB = os.path.join(os.path.dirname(BACKEND), "frontend", "src", "content", "plans")
OUT = os.path.join(BACKEND, "v2", "data", "plans.json")
sys.path.insert(0, BACKEND)

JOB = {"see": "see", "understand": "why", "steady": "steady", "act": "act", "story": "story"}
NEW_JOBS = ["see", "why", "steady", "steady", "act", "act", "story"]

# web plan day -> library verse, where the web verse is missing from the library or unsafe for this plan's readers
OVERRIDES = {
    ("decision-making", 3): "bg.4.17",
    ("devotion", 4): "bg.10.11",
    ("gratitude", 1): "bh.vairagya.82", ("gratitude", 2): "up_taittiriya.146",
    ("gratitude", 4): "mbh.3.314.75", ("gratitude", 5): "mbh.12.172.20",  # 5 was 3.13, flagged reproach
    ("new-beginnings", 1): "vr.4.1.101",
    ("losing-hope", 2): "viv.5.bob_up_soon",  # was 2.3, a rebuke that dismisses fear, in a crisis plan
    ("grief", 5): "yv.2.16.8",  # was 2.28 "why lament?", the stop-grieving verse banned in week 1
}

# Day 1 alternatives for web plans. comparison: 18.47 is 3.35's svadharma teaching without "better is death in one's own
# duty", so an anxious reader can meet it on Day 1; 3.35 stays on Day 2. A later day whose verse Day 1 took shows the
# plan's own Day 1 verse instead (api.day).
WEB_ALTS = {"comparison": ["bg.18.47"]}

# slug: (title, [(verse_id, heading)] * 6, story_id, day1 alternatives)
NEW_PLANS = {
    "running-on-empty": ("Running on empty", [
        ("yv.5.22.34", "The same day, again"), ("viv.1.misery_attachment", "What really wears you out"),
        ("bh.vairagya.61", "Stop running for approval"), ("up_mundaka.3.1.4", "Busy, and still at rest"),
        ("bg.6.17", "Food, sleep, work, rest"), ("up_isha.2", "Work that doesn't cling")],
        "st.bhakti.sur_danced_enough", ["bh.vairagya.44", "yv.5.66.34"]),
    "work-feels-unsafe": ("When work feels unsafe", [
        ("bg.1.29", "Fear in the body"), ("yv.5.11.6", "How worry grows"),
        ("vr.4.7.9", "Think it through"), ("viv.4.hold_on_brave_heart", "Hold on a while"),
        ("mbh.5.136.1", "Don't let fear decide"), ("rcm.2.163.doha.1", "Do what today asks")],
        "st.mbh.three_fish", ["vishnu_gita.1.60"]),
    "passed-over": ("Passed over, not seen", [
        ("bh.niti.58", "Nothing you do is right"), ("bh.niti.54", "It isn't you"),
        ("mbh.12.114.15", "What running others down shows"), ("up_brihadaranyak.86", "What is right holds you up"),
        ("rcm.6.19.chaupai.4", "Have the conversation"), ("mbh.3.28.6", "Choose your response")],
        "st.rcm.hanuman_bound_before_ravana", ["mbh.5.39.63", "bh.vairagya.4"]),
    "hurt-by-someone-close": ("When someone close hurts you", [
        ("mbh.12.81.6", "Words that keep burning"), ("vr.6.21.6", "When kindness is read as weakness"),
        ("mbh.3.28.6", "You don't have to forgive yet"), ("mbh.14.53.15", "You can't force peace"),
        ("up_brihadaranyak.86", "Stand on what is right"), ("vr.3.72.7", "You don't carry this alone")],
        "st.rcm.vibhishan_tongue_among_teeth", ["vr.2.19.6", "viv.3.dares_to_differ"]),
    "someone-left": ("When someone leaves", [
        ("rcm.5.13.chaupai.3", "No one to tell"), ("mbh.12.27.12", "Where this pain comes from"),
        ("bh.niti.87", "The moon fills again"), ("yv.2.16.8", "Keep good company"),
        ("bg.6.26", "Bring the mind back, gently"), ("mbh.12.338.12", "Don't feed the ache")],
        "st.mbh.damayanti_alone_sets_her_terms", ["vr.5.38.32", "sur.bgs.316"]),
    "far-from-parents": ("Far from my parents", [
        ("sur.bgs.10", "No one calls me by my pet name"), ("yv.5.11.6", "The worry that spins at night"),
        ("vr.5.26.39", "Love survives distance"), ("kabir.kk.66", "Never far"),
        ("mbh.13.161.45", "Begin the day with them"), ("vr.2.58.18", "Let them still lead")],
        "st.bhakti.sur_krishna_misses_his_mother", ["mbh.3.314.61", "vr.2.34.28"]),
    "raising-kids": ("Raising kids, running thin", [
        ("yv.5.66.34", "The list that never ends"), ("ashtavakra.16.3", "Everyone is straining"),
        ("up_aitareya.33", "Born a second time"), ("shambhu_gita.4.83", "Help before punishing"),
        ("up_aitareya.31", "Nourish the one who nourishes"), ("viv.2.child_teaches_himself", "Make room, remove obstacles")],
        "st.viv.boy_gopala_and_his_mother", ["viv.7.want_a_bit_of_peace", "mbh.12.81.11"]),
    "cant-get-started": ("Can't get started", [
        ("yv.1.16.22", "Pounce, then drop it"), ("up_chhandogya.582", "We act where we find joy"),
        ("rcm.4.15.chaupai.4", "Drop by drop"), ("bg.18.37", "Bitter first, sweet later"),
        ("bg.3.8", "Doing something beats nothing"), ("viv.6.one_thing_at_a_time", "One thing at a time")],
        "st.bg.if_you_cannot_then", ["bg.6.37"]),
    "wanting-more": ("Wanting that never settles", [
        ("bh.vairagya.18", "We know, and still"), ("mbh.12.178.26", "Fire fed with more wood"),
        ("up_kath.1.2.2", "The good and the pleasant"), ("mbh.12.176.25", "Desire, I know your root"),
        ("bg.2.58", "Like a tortoise"), ("yv.2.7.12", "Steer it back")],
        "st.mbh.manki_and_the_two_young_bulls", ["up_maha.113", "bg.3.36"]),
    "nothing-matters": ("When nothing feels like it matters", [
        ("yv.1.12.15", "What is all this for?"), ("ashtavakra.16.2", "Where wanting stops"),
        ("surya_gita.3.36", "Where wisdom begins"), ("up_mundaka.3.1.2", "The calm one beside you"),
        ("yv.2.14.50", "Ask the real question"), ("bg.3.20", "For the good of the world")],
        "st.yv.rama_speaks_what_is_the_point", ["yv.1.10.19", "up_chhandogya.526"]),
    "not-good-enough": ("Not good enough", [
        ("rcm.1.141.chaupai.3", "Afraid to ask"), ("vishnu_gita.1.98", "Every gain brings a fear"),
        ("bh.niti.106", "The flame still rises"), ("mbh.3.32.58", "Never look down on yourself"),
        ("yv.2.9.33", "Raise your mind like a child"), ("vr.6.22.42", "I can build this")],
        "st.viv.lion_among_sheep", ["rcm.3.7.chaupai.3"]),
    "keeping-a-resolve": ("Keeping a resolve", [
        ("mbh.3.297.7", "Begun with determination"), ("up_brihadaranyak.477", "As your will, so you become"),
        ("vr.5.12.10", "Refuse to lose heart"), ("rcm.6.79.chaupai.3", "Courage and patience are the wheels"),
        ("yv.2.7.17", "Effort bears fruit"), ("bh.niti.81", "Past the poison to the nectar")],
        "st.vr.bhagiratha_finishes_what_three_generations_could_not", ["viv.5.ridicule_opposition"]),
    "first-week-with-the-gita": ("Your first week with the Gita", [
        ("bg.7.16", "All four are welcome"), ("bg.2.7", "Arjuna asks to be taught"),
        ("bg.2.14", "What comes and goes"), ("bg.2.47", "Your work, not its results"),
        ("bg.6.5", "Be your own friend"), ("bg.4.34", "Ask real questions")],
        "st.bg.reflect_and_do_as_you_wish", []),
    # safety plans: chosen by risk, never by matching, and never with a model call
    "too-heavy": ("When everything is too heavy", [
        ("yv.1.12.22", "Heavy as stone"), ("up_mundaka.3.1.2", "The calm one beside you"),
        ("viv.5.bob_up_soon", "Waiting for the next turn"), ("bh.niti.87", "The moon fills again"),
        ("yv.2.16.8", "Don't let go of good company"), ("vr.3.72.7", "You won't get through this alone")],
        "st.vr.kabandha_find_one_who_has_lost_the_same", []),
    "someone-hurting-you": ("When someone is hurting you", [
        ("rcm.5.6.chaupai.1", "Like a tongue among teeth"), ("mbh.5.36.37", "If you must tiptoe around them"),
        ("rcm.5.44.chaupai.3", "You kept your goodness"), ("up_brihadaranyak.86", "What is right holds you up"),
        ("bh.niti.53", "A snake wearing a jewel"), ("vr.3.72.7", "You don't carry this alone")],
        "st.vr.shunahshepa_the_middle_son", []),
}

ALL_STAGES = ["studying", "working", "own_thing", "raising_kids", "caring_parents", "retired"]


def P(primary, also, stance, light, for_whom, situations, notes, fit=(), avoid=(), require=(), not_for=(), safety=None):
    return {"feelings": {"primary": list(primary), "also": list(also)}, "stance": stance, "light": light,
            "for_whom": for_whom, "situations": list(situations), "example_notes": list(notes),
            "stages": {"fit": list(fit), "avoid": list(avoid), "require": list(require)},
            "not_for": [{"who": w, "go_to": g} for w, g in not_for], "safety": safety}


PROFILES = {
    "overthinking": P(["overthinking", "anxious", "restless"], ["uneasy"], "struggle", False,
        "For a mind that won't switch off: replaying conversations, rehearsing what might go wrong, lying awake with thoughts that loop.",
        ["replaying a conversation", "can't sleep because the mind races", "rehearsing worst cases", "checking the phone for bad news", "can't stop thinking about something said"],
        ["I keep going over what I said in the meeting and can't sleep", "My mind runs through every way tomorrow could go wrong",
         "I lie awake at 2am replaying things from years ago", "Every small message from my boss sends me spiralling",
         "Dimaag band hi nahi hota, raat bhar sochta rehta hoon", "I overthink every text I send"]),
    "stress": P(["restless", "anxious"], ["overthinking", "stuck"], "struggle", False,
        "For pressure from all sides: deadlines, demands and a body that never gets to stand down. Steadiness through ups and downs, not escape from them.",
        ["too much on my plate", "deadline pressure", "juggling work and home", "constant pressure at work", "feeling stretched thin"],
        ["Too many deadlines and everyone wants something from me today", "The pressure at work is constant and I feel wound up all the time",
         "Between office and home I never get a minute to breathe", "Exams, assignments and my part-time job are piling up",
         "I am tense all the time, even on weekends", "Business is busy and every day is a fire to put out"],
        fit=["working", "own_thing", "studying"]),
    "fear-of-failure": P(["anxious"], ["overthinking", "uneasy", "stuck"], "struggle", False,
        "For dread about a result that isn't in your hands yet: an exam, an interview, a launch, a review. The Gita's answer to doing the work without holding on to the outcome.",
        ["waiting on exam results", "a job interview coming up", "a performance review", "launching something and fearing it flops", "fear of disappointing parents"],
        ["My results come out on Friday and I feel sick thinking about it", "I have an interview next week and I'm sure I'll mess it up",
         "Launching my product next month and terrified nobody will want it", "My appraisal is coming and I keep imagining the worst",
         "What if I fail and let my parents down", "I studied hard but I'm scared it won't be enough"],
        fit=["studying", "working", "own_thing"], avoid=["retired"]),
    "grief": P(["empty", "lonely", "hurt"], ["lost"], "struggle", False,
        "For someone grieving a death: a parent, a partner, a friend, someone who mattered. Lets the loss be as big as it is before anything else.",
        ["a parent died", "losing a spouse", "death of a close friend", "the first anniversary of a death", "grieving and nobody understands"],
        ["My father passed away last month and I can't believe he's gone", "It's been a year since my mother died and it still hurts like the first day",
         "My husband died and the house is so quiet", "My best friend died suddenly and I keep reaching for my phone to call him",
         "Papa ke jaane ke baad sab khaali lagta hai", "My grandmother who raised me passed away"],
        not_for=[("a breakup or someone who left but is alive", "someone-left"), ("parents who are alive but far away", "far-from-parents")]),
    "anger": P(["angry"], ["restless", "uneasy"], "struggle", False,
        "For anger that flares and leaves damage: snapping at people, losing your temper, irritation that builds. Starts where the Gita starts, with what the mind keeps dwelling on.",
        ["snapping at family", "losing temper at work", "irritation when things don't go my way", "angry when someone blocks what I want", "regret after shouting"],
        ["I snapped at my kids again and felt terrible afterwards", "I lose my temper at work over small things",
         "When I can't get what I want I get really angry", "I shouted at my mother and can't take it back",
         "Little things make me furious and I don't know why", "Gussa bahut jaldi aa jata hai, phir pachtata hoon"],
        not_for=[("someone angry because they were wronged or treated unfairly", "hurt-by-someone-close"), ("anger at being passed over at work", "passed-over")]),
    "losing-hope": P(["lost", "empty"], ["stuck"], "struggle", False,
        "For when it all feels like too much and you've sat down like Arjuna did: hope running low after setbacks, but not in danger.",
        ["setback after setback", "giving up on a goal", "feeling defeated", "nothing is working out", "lost the will to keep trying"],
        ["Nothing I try works out and I'm close to giving up", "After years of trying I feel defeated",
         "I failed again and I don't know if I can keep going", "Everything went wrong this year and I've lost hope",
         "I feel like sitting down and not getting up", "Kuch theek nahi ho raha, ummeed khatam ho rahi hai"],
        not_for=[("someone thinking of ending their life", "too-heavy")]),
    "guilt": P(["guilty", "uneasy"], [], "struggle", False,
        "For something you did that you keep going back to: a mistake, a hurt you caused, a choice you regret.",
        ["regret over a mistake", "hurt someone I love", "can't forgive myself", "a wrong choice in the past", "ashamed of what I did"],
        ["I hurt someone I love and I can't stop going back to it", "I made a mistake at work that cost a lot and I can't forgive myself",
         "I said things to my father before he died that I regret", "I cheated and the guilt is eating me",
         "I keep thinking about how I treated my friend", "I wasn't there when my family needed me"]),
    "comparison": P(["uneasy", "stuck", "anxious"], ["hurt"], "struggle", False,
        "For measuring yourself against others and coming up short, and the anxiety it brings: friends' successes, batchmates placed or settled first, social media, the cousin who is always ahead.",
        ["friend's success hurts", "comparing on social media", "everyone ahead of me", "batchmates got jobs first", "envy of a colleague", "family comparisons"],
        ["My friend got into Harvard and I cried in the bathroom", "Everyone my age seems to be doing better than me",
         "I scroll Instagram and feel like a failure", "My colleague got promoted and I can't be happy for him",
         "Half my class has jobs lined up and I'm still waiting to hear back",
         "My parents keep comparing me to my cousin", "Sab aage nikal gaye, main wahin ka wahin"]),
    "decision-making": P(["lost", "stuck"], ["overthinking", "uneasy"], "struggle", False,
        "For being torn and unable to choose: two offers, stay or leave, a move, a choice with no clean answer. Arjuna's own confusion and the Gita's way through it.",
        ["two job offers", "stay or quit", "whether to move abroad", "big life decision", "torn between duty and want"],
        ["I have two job offers and I change my mind every hour", "Should I quit my job or stay, I can't decide",
         "We're deciding whether to move back to India and I'm torn", "I don't know whether to marry the person my parents chose",
         "Every option feels wrong and I'm frozen", "Samajh nahi aa raha kya karun"]),
    "loneliness": P(["lonely"], ["empty"], "struggle", False,
        "For feeling alone: in a new city, far from home, among people who don't really know you.",
        ["moved to a new city", "no friends here", "lonely abroad", "feeling unseen", "weekends alone"],
        ["I moved to a new city and don't know anyone", "I'm surrounded by people and still feel alone",
         "Living abroad and I miss having people who know me", "Weekends are the hardest, I have no one to call",
         "After retirement the days are empty and quiet", "Naye shehar mein koi apna nahi hai"]),
    "gratitude": P(["grateful"], ["peaceful"], "seeking", True,
        "For when life feels good and you want to hold on to it: health, family, a quiet morning. Gratitude kept as a practice.",
        ["thankful for family", "things are going well", "grateful for health", "a peaceful phase", "want to stay grateful"],
        ["My family is healthy and I feel so thankful", "Life is good right now and I want to remember it",
         "Grateful for my parents and everything they gave me", "Things finally worked out and I want to stay humble",
         "I woke up today just feeling blessed", "Bhagwan ka shukriya, sab achha chal raha hai"]),
    "success": P(["inspired"], ["grateful", "hopeful", "determined"], "aspiration", True,
        "For when things are going well: a promotion, a win, money coming in. Staying grounded so success doesn't go to your head.",
        ["just got promoted", "business is growing", "a big win", "worried success will change me", "staying humble"],
        ["I just got promoted and want to stay grounded", "My business is finally doing well",
         "I won the award and don't want it to change me", "Money is coming in for the first time and I feel different",
         "Things are going great at work", "I hit my target this year"],
        fit=["working", "own_thing"], avoid=["retired"]),
    "new-beginnings": P(["hopeful"], ["determined", "inspired", "curious"], "aspiration", True,
        "For starting something new: a job, a city, a marriage, a fresh chapter. Hope with the steadiness to see it through.",
        ["starting a new job", "moving to a new place", "a fresh start", "new chapter after a hard time", "beginning something I care about"],
        ["Starting a new job on Monday and I'm hopeful", "We just moved and I want this to be a fresh start",
         "After a tough year I'm ready to begin again", "Getting married next month and excited for the new life",
         "Starting college soon and want to do it right", "Naya kaam shuru kar raha hoon"]),
    "devotion": P(["peaceful", "curious"], ["grateful"], "seeking", True,
        "For someone drawn to devotion: wanting to feel close to God, to pray with feeling, to love the divine.",
        ["want to feel closer to God", "deepen my prayer", "devotion and bhakti", "turning to faith", "love for Krishna"],
        ["I want to feel closer to Krishna", "I pray every day but want it to mean more",
         "I'm drawn to bhakti and don't know where to start", "I feel peaceful when I do puja and want more of that",
         "I want to love God, not just ask for things", "Bhakti mein mann lagana chahta hoon"]),
    "joy": P(["peaceful"], ["grateful", "hopeful"], "seeking", True,
        "For a calm, good phase where you want to go deeper: joy that doesn't depend on things going your way.",
        ["feeling calm and want to go deeper", "a peaceful phase", "joy that lasts", "inner happiness", "contentment"],
        ["I feel calm lately and want to go deeper", "I'm in a good place and want a joy that lasts",
         "Things are peaceful and I want to understand that peace", "Happy without any big reason, want to keep this",
         "Meditation has been helping and I feel lighter", "Mann shaant hai, aur gehraai chahta hoon"]),
    "running-on-empty": P(["empty", "restless"], ["stuck"], "struggle", False,
        "For burnout: long days for years, running on autopilot, tired in a way sleep doesn't fix, work that has lost its meaning.",
        ["burnout from long hours", "exhausted all the time", "working on autopilot", "no energy left", "same routine every day"],
        ["14 hour days for years and I feel completely empty", "I'm exhausted all the time and sleep doesn't help",
         "Same tasks every day, I feel like a machine", "Work and home leave nothing for me, I'm burnt out",
         "Running my business has drained everything out of me", "Thak gaya hoon, har din wahi kaam"],
        fit=["working", "own_thing", "raising_kids", "caring_parents"]),
    "work-feels-unsafe": P(["anxious"], ["uneasy", "lost"], "struggle", False,
        "For fear about work and money: layoff rumours, a shaky job, a business that might not make it, bills that don't wait.",
        ["layoff rumours", "might lose my job", "money worries", "business struggling", "job market fear"],
        ["Layoffs are happening at my company and I can't stop worrying", "I think I'm going to lose my job",
         "Sales are down and I don't know how I'll pay salaries", "I got laid off and the EMIs keep coming",
         "My visa depends on this job and it feels shaky", "Naukri ka bharosa nahi raha"],
        fit=["working", "own_thing"], avoid=["retired"]),
    "passed-over": P(["hurt", "angry"], ["uneasy"], "wronged", False,
        "For being treated unfairly at work: passed over for promotion, credit taken, criticised in front of others, a boss who never values you.",
        ["passed over for promotion", "manager took credit", "criticised in public", "toxic boss", "not valued at work"],
        ["My manager took credit for my work in front of the team", "I was passed over for promotion again",
         "My boss criticised me in front of everyone", "Whatever I do at work is never good enough for him",
         "They promoted someone junior over me", "Office mein meri koi value nahi hai"],
        fit=["working", "own_thing"], avoid=["retired"],
        not_for=[("anger that is about their own temper", "anger")]),
    "hurt-by-someone-close": P(["hurt"], ["angry", "lonely"], "wronged", False,
        "For being hurt by family or someone close: harsh words from parents or in-laws, a sibling's betrayal, a partner who belittles you. Not about forgiving yet.",
        ["in-laws taunt me", "sibling betrayed me", "parents' harsh words", "partner belittles me", "family took my share", "someone I trusted cheated me"],
        ["My in-laws taunt me every day", "My brother took my share of the house",
         "My mother's words still hurt years later", "My husband belittles me in front of others",
         "My sister turned the family against me", "Apne hi log sabse zyada dukh dete hain"],
        not_for=[("someone being hit, threatened or controlled", "someone-hurting-you")]),
    "someone-left": P(["hurt", "lonely"], ["empty"], "struggle", False,
        "For a living loss: a breakup, a divorce, a partner growing distant, someone who left.",
        ["breakup", "divorce", "partner left", "marriage feels distant", "missing an ex"],
        ["She left me after five years and I can't move on", "My divorce is final and I feel lost",
         "My partner and I live together but feel like strangers", "He ended it by text and I keep checking my phone",
         "I miss her every day even though it's over", "Breakup ke baad sab adhoora lagta hai"],
        not_for=[("someone who died", "grief")]),
    "far-from-parents": P(["anxious", "lonely", "guilty"], ["uneasy"], "struggle", False,
        "For worry about parents: living far from them, their health, guilt about not being there, homesickness.",
        ["parents ageing back home", "parent's health scare", "guilt about living abroad", "homesick", "caring for an ill parent"],
        ["My parents are getting old in Lucknow and I'm in London", "Dad's reports came back and I'm worried sick",
         "I feel guilty for living so far from my mother", "Every call from home at night makes my heart jump",
         "I look after my mother alone and I'm scared of what's coming", "Mummy papa akele hain, chinta hoti hai"],
        fit=["caring_parents", "working", "studying"]),
    "raising-kids": P(["restless", "overthinking"], ["angry", "guilty", "anxious"], "struggle", False,
        "For parents running thin: little sleep, endless to-dos, worry about the kids, snapping and then feeling guilty.",
        ["new baby and no sleep", "toddler tantrums", "teenager won't talk", "worried about my kids", "no time for myself"],
        ["New baby, no sleep and no family nearby", "I yell at my kids and then feel terrible",
         "My teenager doesn't talk to me anymore", "Between work and kids I have no time for myself",
         "Worried my son is falling behind at school", "Bachchon ke saath sabr khatam ho jata hai"],
        fit=["raising_kids"], require=["raising_kids"]),
    "cant-get-started": P(["stuck"], ["lost", "restless"], "struggle", False,
        "For procrastination and lost discipline: knowing what to do and not starting, starting and dropping it, a side project that never moves.",
        ["procrastinating", "can't start studying", "side project stalled", "no discipline", "start and quit"],
        ["I know what I need to do but I just don't start", "I keep putting off studying for my exam",
         "My side project hasn't moved in months", "I start every habit with energy and drop it in a week",
         "I waste the whole day on my phone and feel useless", "Shuru karne ka mann hi nahi karta"]),
    "wanting-more": P(["restless"], ["guilty", "stuck", "overthinking"], "struggle", False,
        "For craving that never settles: the phone, food, shopping, more money, wanting the next thing and never feeling full.",
        ["can't stop scrolling", "food cravings", "shopping to feel better", "always wanting more money", "habit I can't control"],
        ["I can't stop scrolling even when I want to sleep", "I keep thinking about food all day",
         "I buy things I don't need just to feel something", "No matter how much I earn it never feels enough",
         "I know this habit is bad for me and still can't stop", "Phone haath se chhoot-ta hi nahi"]),
    "nothing-matters": P(["empty", "lost"], [], "seeking", False,
        "For emptiness and lost meaning: doing everything right and feeling nothing, asking what the point of it all is. Not for someone in danger.",
        ["what is the point", "feel empty despite success", "midlife questions", "no purpose", "going through the motions"],
        ["I have everything I worked for and feel nothing", "What is the point of all this running",
         "I'm 45 and wondering what my life has been for", "I go through the motions every day",
         "Nothing excites me anymore", "Sab kuch hai phir bhi khaali lagta hai"],
        not_for=[("someone thinking of ending their life", "too-heavy")]),
    "not-good-enough": P(["anxious", "uneasy"], ["stuck"], "struggle", False,
        "For self-doubt: feeling like a fraud at work, afraid to speak up, sure others are better, waiting to be found out.",
        ["imposter syndrome", "feel like a fraud", "afraid to speak up", "low confidence", "everyone is smarter than me"],
        ["I got promoted past people with MBAs and feel like a fraud", "I'm scared to speak in meetings in case I sound stupid",
         "Everyone in my class seems smarter than me", "I feel I don't deserve this job",
         "I hesitate to ask for what I want", "Mujhe lagta hai main kisi layak nahi"]),
    "keeping-a-resolve": P(["determined"], ["inspired", "hopeful"], "aspiration", True,
        "For someone determined to see something through: a new habit, a hard goal, a long project, a change they've committed to.",
        ["committed to a goal", "building a habit", "long project", "training for something", "sticking with it"],
        ["I've decided to get fit this year and I want to stick with it", "I'm building my startup and want to keep going",
         "Preparing for UPSC and I need to stay consistent", "I've started waking at 5am and want to keep it up",
         "I want to finish what I started this time", "Is baar haar nahi maanunga"]),
    "first-week-with-the-gita": P(["curious"], ["peaceful"], "seeking", True,
        "For someone curious about the Gita itself: where to start, what it actually says, how it speaks to ordinary life.",
        ["want to read the Gita", "curious about Krishna's teaching", "where to start with scripture", "learning about Hinduism", "reconnecting with roots"],
        ["I want to finally read the Gita", "I've always been curious what Krishna told Arjuna",
         "Where do I start with the Gita", "I grew up with these stories and want to understand them",
         "I want to know what the Gita says about everyday life", "Gita padhna chahta hoon, kahan se shuru karun"]),
    "too-heavy": P([], [], "struggle", False,
        "Safety plan for someone whose note shows they may be thinking of ending their life. Shown with help lines. Never matched or written by a model.",
        [], [], safety="self_harm"),
    "someone-hurting-you": P([], [], "wronged", False,
        "Safety plan for someone being hit, threatened or controlled. Shown with help lines. No verse about enduring or forgiving.",
        [], [], safety="harm_from_others"),
}


def web_plan(slug):
    p = json.load(open(os.path.join(WEB, f"{slug}.json")))
    days = []
    for d in p["days"]:
        o = {"day": d["day"], "job": JOB.get(d["phase"], d["phase"]), "heading": d.get("heading")}
        if (slug, d["day"]) in OVERRIDES:
            o["verse"] = OVERRIDES[(slug, d["day"])]
            o["replaced"] = "bg.%d.%d" % tuple(d["ref"]) if d.get("ref") else None
        elif d.get("ref"):
            o["verse"] = "bg.%d.%d" % tuple(d["ref"])
            o.update({k2: d[k1] for k1, k2 in (("forYou", "for_you"), ("today", "today"), ("note", "note")) if d.get(k1)})
        elif d.get("story"):
            o["story"] = d["story"]
            o.update({k2: d[k1] for k1, k2 in (("forYou", "for_you"), ("today", "today")) if d.get(k1)})
        days.append(o)
    return {"slug": slug, "title": p["label"], "source": "web_theme", "reviewed": True, "intro": p.get("intro"), "days": days}


def new_plan(slug):
    title, verses, story, alts = NEW_PLANS[slug]
    days = [{"day": i + 1, "job": NEW_JOBS[i], "heading": h, "verse": v} for i, (v, h) in enumerate(verses)]
    days.append({"day": 7, "job": "story", "story": {"id": story}})
    return {"slug": slug, "title": title, "source": "drafted", "reviewed": False, "days": days, "day1_alts": alts}


def main():
    from ai import plan_v3 as V
    E = V.engine()
    web = sorted(f[:-5] for f in os.listdir(WEB) if f.endswith(".json"))
    plans = [web_plan(s) for s in web] + [new_plan(s) for s in NEW_PLANS]
    problems = []
    for p in plans:
        p.setdefault("day1_alts", WEB_ALTS.get(p["slug"], []))
        p["profile"] = PROFILES[p["slug"]]
        for d in p["days"]:
            v = d.get("verse")
            if v and v not in E.verses:
                problems.append(f"{p['slug']} day {d['day']}: {v} not in the library")
            sid = (d.get("story") or {}).get("id")
            if sid and sid not in E.stories and sid not in E.G.N:
                problems.append(f"{p['slug']} day 7: story {sid} not found")
        for v in p["day1_alts"]:
            if v not in E.verses:
                problems.append(f"{p['slug']} day1 alt {v} not in the library")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump({"version": 1, "plans": plans}, open(OUT, "w"), ensure_ascii=False, indent=1)
    print(f"{len(plans)} plans -> {OUT}")
    print("problems:", problems or "none")


if __name__ == "__main__":
    main()
