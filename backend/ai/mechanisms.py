"""
mechanisms.py — the root causes a plan can be built around, in the library's own vocabulary.

Why a closed list: the retrieval statement for the "diagnose" and "act" beats has to
land inside what the verses actually talk about. The texts explain suffering through
a small set of mechanisms (attachment to results, craving, the untrained mind,
needing praise and fearing blame, expectation of others, self-contempt, fear of loss,
ego, inertia, separation). Every situation in the library maps to one or two of them.

Each mechanism carries:
  diagnose  a statement in the register of the card lines (plain, timeless, causal)
  act       the practice the texts prescribe for it (imperative, safe, doable)
  themes    library themes that tend to carry it (a small boost, never a filter)

These templates are the anchors: the LLM's statements are blended toward them, and
they replace an LLM statement that fails the guardrails or when the LLM is down.

For the deeper weeks of a plan each mechanism also carries:
  steady    the inner footing the texts give for it (week 1's steady days)
  pattern   the same struggle seen as a pattern across life, from the inside (week 2's "see" days)
  self      the truth about the self that this pattern forgets (week 3's "see" days)
  self_act  acting from that self (week 3's "act" days)
"""
from __future__ import annotations

from typing import Dict, List

MECHANISMS: Dict[str, dict] = {
    "attachment_to_results": {
        "label": "Holding on to how it turns out",
        "diagnose": "The mind suffers when it clings to results it cannot control; gripping the outcome turns honest effort into anxiety.",
        "act": "Do your work fully and well, then let the result go; your part is the effort, not the fruit.",
        "steady": "Your part is the effort, not the outcome; work done well is already complete, whatever result comes.",
        "pattern": "Again and again, at work, at home and in every plan, I cannot rest until I know how it will turn out.",
        "self": "You are not the result of your work; success and failure come and go, while the one who acts stays whole through both.",
        "self_act": "Act as an offering, without the claim that the result is yours, and stay the same in success and failure.",
        "themes": ["worry", "effort", "duty", "contentment"],
    },
    "need_for_approval": {
        "label": "Needing their approval",
        "diagnose": "When your worth depends on others' praise, every word of blame shakes you; craving approval keeps the mind unsteady.",
        "act": "Stay the same in praise and blame; do what is right, speak truthfully and gently, and let your worth rest on your own conduct.",
        "steady": "Praise and blame are only words that come and go; your worth rests on your own conduct, not on their opinion.",
        "pattern": "In every room and every relationship, I wait for someone to say I did well before I can believe it myself.",
        "self": "The self is not made larger by praise or smaller by blame; it is complete in itself and needs no one's approval to be whole.",
        "self_act": "Do what is right because it is right, from fullness rather than need, and let praise and blame pass over you like weather.",
        "themes": ["self_worth", "humility", "speech", "boundaries", "saying_no"],
    },
    "expectation_of_others": {
        "label": "Expecting them to be different",
        "diagnose": "Hurt grows from expecting others to act as we want; no one else can give us sorrow unless we hand them the reins of our peace.",
        "act": "Do your own duty toward them with patience and respect, accept what is theirs to choose, and keep your peace in your own hands.",
        "steady": "Each person acts from their own nature; what they do is theirs to carry, and how you respond is yours.",
        "pattern": "With parents, partners and friends alike, I keep waiting for people to become who I need them to be, and keep getting hurt.",
        "self": "The same self lives in them and in you; seen that way, there is less to demand of them and less to resent.",
        "self_act": "Love and serve without bargaining for a return; see the one self in everyone, and give from that without keeping score.",
        "themes": ["family", "patience", "forgiveness", "anger", "boundaries"],
    },
    "anger_reactivity": {
        "label": "Anger that takes over",
        "diagnose": "Anger rises from blocked wanting; it clouds judgement, and a clouded mind says and does what it later regrets.",
        "act": "Pause before you speak, hold back the harsh word, and answer anger with calm; forgive so the fire does not keep burning in you.",
        "steady": "Anger is a passing fire in the mind; you can watch it rise and fall without letting it speak for you.",
        "pattern": "Whenever things do not go my way, the anger rises before I can choose, and I say what I later regret.",
        "self": "You are the witness of the anger, not the anger; the fire rises in the mind, but the one who sees it is untouched.",
        "self_act": "Rest as the witness when anger rises; let it pass without acting on it, and answer from calm instead of heat.",
        "themes": ["anger", "speech", "forgiveness", "self_control"],
    },
    "comparison_envy": {
        "label": "Measuring yourself against others",
        "diagnose": "Comparison and envy burn at another's success; measuring your life against theirs steals the contentment in your own.",
        "act": "Walk your own path, even imperfectly, rather than someone else's well; be grateful for what is yours and rejoice in others' good.",
        "steady": "Your own path, walked imperfectly, is better than another's walked well; what is yours is enough to begin with.",
        "pattern": "Wherever I look, I measure my life against someone else's, and mine always seems to come up short.",
        "self": "There is no smaller or larger self; the same light shines in every being, so another's good takes nothing from you.",
        "self_act": "Rejoice in the good of others as your own, and do your own duty with a full heart, without looking sideways.",
        "themes": ["envy", "contentment", "gratitude", "self_worth"],
    },
    "desire_craving": {
        "label": "Wanting that never settles",
        "diagnose": "Desire feeds on itself; the more the senses chase, the more they want, and the mind is never satisfied.",
        "act": "Restrain the senses gently and steadily, practise contentment with what is here, and replace the habit with something better.",
        "steady": "Desire is never satisfied by feeding it; contentment with what is here is the only fullness that lasts.",
        "pattern": "Each time I get what I wanted, the wanting moves on to something new, and the restlessness never ends.",
        "self": "The joy you chase outside is already within; the self is full by nature, and wanting comes from forgetting that.",
        "self_act": "Turn inward and rest content in the self; let the senses move among things without being ruled by them.",
        "themes": ["greed", "self_control", "contentment", "happiness"],
    },
    "restless_mind": {
        "label": "A mind that won't settle",
        "diagnose": "The untrained mind runs like the wind, replaying and imagining; left to itself it becomes its own enemy.",
        "act": "Bring the mind back each time it wanders, with practice and letting go; make the mind your friend through steady practice.",
        "steady": "The mind can be trained slowly, by practice and letting go; each time it wanders, it can be gently brought back.",
        "pattern": "Day and night my mind runs ahead, replaying and imagining, and it will not stop when I ask it to.",
        "self": "You are not the mind; thoughts come and go before the silent witness that watches them and is never disturbed.",
        "self_act": "Sit still and watch the thoughts without following them; rest as the awareness in which they rise and fade.",
        "themes": ["mind", "worry", "self_control", "patience"],
    },
    "fear_of_loss": {
        "label": "Fear of what might happen",
        "diagnose": "Fear grows from imagining the future and from forgetting that what is real in us cannot be lost; worry multiplies what has not happened.",
        "act": "Do what you can today, take refuge in what does not change, and meet each moment with courage instead of rehearsing the worst.",
        "steady": "Most fears never come true; what is truly yours cannot be taken, and today asks only for today's courage.",
        "pattern": "In everything I love and everything I build, I live in fear of what might be lost or might go wrong.",
        "self": "What is real in you cannot be taken or lost; only what changes can be taken, and you are more than what changes.",
        "self_act": "Take refuge in what does not change, and act with courage, knowing the self cannot be harmed by what may come.",
        "themes": ["fear", "courage", "impermanence", "worry"],
    },
    "grief_attachment": {
        "label": "Missing someone you love",
        "diagnose": "Grief is love with nowhere to go; everything that comes together must part, and the heart aches because the bond was real.",
        "act": "Let yourself grieve, honour them by living well, and remember that the self they loved in you, and in them, does not perish.",
        "steady": "Love does not end when a life does; grieve fully, and let the bond keep living in how you live.",
        "pattern": "I hold so tightly to the people I love that losing them, or the fear of it, swallows everything else.",
        "self": "The self in the one you love and the self in you were never born and never pass away; love was a meeting of what lasts.",
        "self_act": "Honour them by living well and fully; see what is lasting in them and in you, and let love keep acting through you.",
        "themes": ["grief", "impermanence", "family", "acceptance"],
    },
    "self_blame": {
        "label": "Not feeling good enough",
        "diagnose": "Guilt and shame turn the mind against itself; the one who keeps pushing themselves down becomes their own enemy.",
        "act": "Be on your own side: lift yourself up, make amends where you can, and begin again; no one who does good is lost.",
        "steady": "A mistake is something you did, not who you are; no one who tries to do good is ever lost.",
        "pattern": "Whatever goes wrong, at work or at home, I turn on myself first and keep replaying where I failed.",
        "self": "The self is untouched by your mistakes; it was never stained and cannot be made less, whatever you have done.",
        "self_act": "Be on your own side as the self is on yours; make amends, learn, and begin again without carrying the old verdict.",
        "themes": ["self_worth", "forgiveness", "courage", "humility"],
    },
    "inertia_doubt": {
        "label": "Stuck and not starting",
        "diagnose": "Doubt and delay feed each other; waiting to feel ready keeps us stuck, and the unacted-on decision weighs more than the work.",
        "act": "Rise and do the next right thing; act without waiting for certainty, and keep at it day by day.",
        "steady": "No effort on the right path is ever wasted; even a little of it protects you and carries you forward.",
        "pattern": "Again and again I wait to feel ready, and the days pass while the things that matter stay undone.",
        "self": "The self is never stuck; it is the mind that hesitates, while what you truly are is already free and able.",
        "self_act": "Act from the self, not from the mood of the mind; rise and do the next right thing without waiting for certainty.",
        "themes": ["effort", "decision", "courage", "time"],
    },
    "ego_pride": {
        "label": "The ego that wants credit",
        "diagnose": "Pride and the need to be seen as the doer make us fragile; ego takes credit, resents others, and falls hard.",
        "act": "Work without needing the credit, stay humble in success, and offer what you do to something larger than yourself.",
        "steady": "Credit and recognition come and go; the work itself is what remains, and the humble stand steadiest.",
        "pattern": "In every success and every slight, I need to be seen as the one who did it, and it stings when I am not.",
        "self": "The real doer is not the small self that wants credit; actions happen through you, and the self behind them needs no name.",
        "self_act": "Work without the thought that you are the doer; offer the action and its fruit to something larger, and let the credit go.",
        "themes": ["humility", "leadership", "self_worth", "duty"],
    },
    "disconnection": {
        "label": "Feeling cut off",
        "diagnose": "Loneliness and emptiness come from feeling separate from people, purpose and the divine; the heart is searching for where it belongs.",
        "act": "Reach out to the people and the practice that hold you; seek good company, and remember you are never truly alone.",
        "steady": "You belong more than you feel right now; the people and the practice that hold you are still within reach.",
        "pattern": "Even among people, at home and at work, I feel unseen and apart, as if I belong nowhere.",
        "self": "The one self lives in every heart; seen truly, you were never separate from others or from the divine.",
        "self_act": "See yourself in all beings and all beings in yourself; reach out and serve, knowing there is no true distance.",
        "themes": ["friendship", "good_company", "gratitude", "family"],
    },
    "duty_conflict": {
        "label": "Torn between duties",
        "diagnose": "Confusion comes when duties pull in different directions and fear clouds which one is truly yours.",
        "act": "Ask what is right, not what is easy; choose your own duty with a clear mind and carry it out without fear.",
        "steady": "Your own duty, done imperfectly, is better than another's; when the mind clears, the right step becomes plain.",
        "pattern": "Over and over I am pulled between what others expect of me and what I feel is mine to do, and I freeze.",
        "self": "The self is not the roles you play; when you act from who you are, your duty is not a burden but your own nature.",
        "self_act": "Do your own duty as an offering, from the self rather than from fear or pressure, and leave the rest to the divine.",
        "themes": ["duty", "decision", "truth", "courage"],
    },
    "no_meaning": {
        "label": "Searching for what it's all for",
        "diagnose": "When life is lived only for what passes, the heart feels empty; meaning is missing when we forget what does not pass.",
        "act": "Turn toward what lasts: serve, study, reflect daily, and offer your work to something beyond yourself.",
        "steady": "What passes cannot fill the heart; turning toward what lasts gives each day a quiet purpose.",
        "pattern": "However much I do and have, it all starts to feel empty, and I keep asking what any of it is for.",
        "self": "Meaning is not out there to be found; it is the self itself, the unchanging ground beneath everything that passes.",
        "self_act": "Turn inward, come to know the self, and let your work become service and offering; a life lived from there is full.",
        "themes": ["wisdom", "impermanence", "duty", "gratitude"],
    },
    # ── Not a struggle: an aspiration. The "diagnose" line is what tests a resolve, not a cause of pain. ──
    "resolve_begin": {
        "label": "Starting what is yours to build",
        "diagnose": "Resolve fades when the mind runs ahead to the prize or looks sideways at others; it holds when the work itself is the reward.",
        "act": "Rise and act; do your work fully and well each day, let the result go, and keep at it when no one is watching.",
        "steady": "No honest effort on the right path is ever wasted; even a little of it protects you and carries you forward.",
        "pattern": "Every time I begin something that is mine, the first weeks are fire, and then the mind starts counting results and watching others.",
        "self": "The one who acts is not the result of the work; success and failure pass through, and the self that chose to begin stays whole.",
        "self_act": "Act as an offering, with full effort and no claim on the fruit, and stay the same whether the work is praised or ignored.",
        "themes": ["effort", "courage", "duty", "decision"],
    },
    # ── Not a struggle: being wronged. The cause is in the other person; the texts give footing and courage. ──
    "dignity_denied": {
        "label": "Being seen as less than you are",
        "diagnose": "When others see only a role, their picture is their smallness and not your measure; the harm deepens only when their picture begins to replace your own.",
        "act": "Speak the true thing gently and firmly, hold your ground on what is yours, and do your own duty without shrinking to fit the picture they hold.",
        "steady": "What you are cannot be cut smaller by what they see; your worth was never theirs to grant, and standing in your own truth is itself the duty.",
        "pattern": "In more than one room of my life, people have handed me a smaller role than the one I live, and expected me to fit it.",
        "self": "The self cannot be cut, burned or made less; what they see is a role, and you were never only a role.",
        "self_act": "Stand in your own truth and do your own duty from it; let their picture stay theirs, and let your conduct speak.",
        "themes": ["courage", "truth", "self_worth", "duty", "speech"],
    },
}

# Every library situation → its mechanisms (first = primary).
SITUATION_MECHANISMS: Dict[str, List[str]] = {
    "credit_taken": ["ego_pride", "need_for_approval"], "burnout": ["attachment_to_results", "duty_conflict"],
    "layoff": ["fear_of_loss", "self_blame"], "not_promoted": ["attachment_to_results", "comparison_envy"],
    "toxic_boss": ["expectation_of_others", "anger_reactivity"], "hard_conversation": ["need_for_approval", "fear_of_loss"],
    "quit_or_stay": ["duty_conflict", "inertia_doubt"], "career_switch": ["inertia_doubt", "fear_of_loss"],
    "imposter": ["self_blame", "need_for_approval"], "failure_project": ["attachment_to_results", "self_blame"],
    "side_project": ["inertia_doubt", "attachment_to_results"], "outcome_anxiety": ["attachment_to_results", "fear_of_loss"],
    "comparison": ["comparison_envy", "self_blame"], "envy": ["comparison_envy", "desire_craving"],
    "fear_failure": ["fear_of_loss", "attachment_to_results"], "overthinking": ["restless_mind", "fear_of_loss"],
    "restless_mind": ["restless_mind", "desire_craving"], "anxiety_general": ["fear_of_loss", "restless_mind"],
    "anger_outburst": ["anger_reactivity", "expectation_of_others"], "resentment": ["expectation_of_others", "anger_reactivity"],
    "forgive": ["anger_reactivity", "expectation_of_others"], "betrayal": ["expectation_of_others", "grief_attachment"],
    "criticism": ["need_for_approval", "self_blame"], "people_pleasing": ["need_for_approval", "fear_of_loss"],
    "boundaries_family": ["need_for_approval", "duty_conflict"], "parents_aging": ["fear_of_loss", "duty_conflict"],
    "parents_expectations": ["need_for_approval", "duty_conflict"], "parent_conflict": ["expectation_of_others", "need_for_approval"],
    "present_parent": ["restless_mind", "duty_conflict"], "new_parent": ["fear_of_loss", "disconnection"],
    "raising_kids_values": ["duty_conflict", "expectation_of_others"], "teen_conflict": ["expectation_of_others", "anger_reactivity"],
    "marriage_conflict": ["expectation_of_others", "anger_reactivity"], "marriage_distance": ["disconnection", "expectation_of_others"],
    "breakup": ["grief_attachment", "self_blame"], "loneliness": ["disconnection", "grief_attachment"],
    "inlaws": ["expectation_of_others", "need_for_approval"], "sibling_rift": ["expectation_of_others", "anger_reactivity"],
    "grief_parent": ["grief_attachment", "self_blame"], "grief_general": ["grief_attachment", "fear_of_loss"],
    "pet_loss": ["grief_attachment"], "fear_death": ["fear_of_loss", "no_meaning"],
    "illness_family": ["fear_of_loss", "grief_attachment"], "diaspora_identity": ["disconnection", "duty_conflict"],
    "homesick": ["disconnection", "grief_attachment"], "interfaith": ["disconnection", "duty_conflict"],
    "reconnect_faith": ["disconnection", "no_meaning"], "doubt_faith": ["no_meaning", "disconnection"],
    "no_meaning": ["no_meaning", "disconnection"], "purpose_search": ["no_meaning", "duty_conflict"],
    "midlife": ["no_meaning", "comparison_envy"], "money_stress": ["fear_of_loss", "desire_craving"],
    "greed_more": ["desire_craving", "comparison_envy"], "procrastination": ["inertia_doubt", "restless_mind"],
    "discipline": ["inertia_doubt", "desire_craving"], "phone_addiction": ["desire_craving", "restless_mind"],
    "craving": ["desire_craving", "restless_mind"], "guilt": ["self_blame", "grief_attachment"],
    "shame": ["self_blame", "need_for_approval"], "self_worth": ["self_blame", "comparison_envy"],
    "uncertainty": ["fear_of_loss", "inertia_doubt"], "big_decision": ["duty_conflict", "inertia_doubt"],
    "moral_dilemma": ["duty_conflict", "fear_of_loss"], "change_life": ["inertia_doubt", "fear_of_loss"],
    "retirement": ["no_meaning", "fear_of_loss"], "empty_nest": ["grief_attachment", "no_meaning"],
    "success_pride": ["ego_pride", "desire_craving"], "gratitude": ["desire_craving", "no_meaning"],
    "morning_calm": ["restless_mind", "no_meaning"], "sleep_mind": ["restless_mind", "fear_of_loss"],
}

# The onboarding's problem chips (app/constants/onboardingSituations.ts) → library situations.
# Topic chips are broad; follow-up chips are specific and weigh more.
CHIP_SITUATIONS: Dict[str, Dict[str, float]] = {
    # topics
    "work": {"burnout": 0.5, "outcome_anxiety": 0.4, "toxic_boss": 0.3, "not_promoted": 0.3},
    "mind": {"overthinking": 0.6, "restless_mind": 0.5, "anxiety_general": 0.4},
    "someone": {"parent_conflict": 0.35, "marriage_conflict": 0.35, "toxic_boss": 0.3, "people_pleasing": 0.3},
    "missing": {"loneliness": 0.5, "homesick": 0.4, "grief_general": 0.4},
    "enough": {"self_worth": 0.6, "guilt": 0.4, "shame": 0.4},
    "compare": {"comparison": 0.6, "money_stress": 0.4, "envy": 0.4},
    "meaning": {"purpose_search": 0.6, "no_meaning": 0.5, "midlife": 0.3},
    # follow-ups
    "cant_switch_off": {"burnout": 1.0, "sleep_mind": 0.4}, "might_lose_job": {"layoff": 1.0, "money_stress": 0.4},
    "didnt_work_out": {"failure_project": 1.0, "fear_failure": 0.4}, "passed_over": {"not_promoted": 1.0, "comparison": 0.4},
    "cant_start": {"procrastination": 1.0, "discipline": 0.5}, "overthinking": {"overthinking": 1.0},
    "cant_sleep": {"sleep_mind": 1.0, "restless_mind": 0.4}, "cant_focus": {"restless_mind": 1.0, "phone_addiction": 0.4},
    "phone": {"phone_addiction": 1.0, "craving": 0.4}, "anxious": {"anxiety_general": 1.0},
    "partner": {"marriage_conflict": 1.0, "marriage_distance": 0.6}, "parents": {"parent_conflict": 1.0, "parents_expectations": 0.7, "boundaries_family": 0.5},
    "boss": {"toxic_boss": 1.0, "credit_taken": 0.4}, "in_laws": {"inlaws": 1.0, "boundaries_family": 0.5},
    "kids": {"teen_conflict": 0.8, "raising_kids_values": 0.7, "present_parent": 0.5}, "cant_say_no": {"people_pleasing": 1.0, "boundaries_family": 0.5},
    "far_from_home": {"homesick": 1.0, "diaspora_identity": 0.5}, "parent_health": {"illness_family": 1.0, "parents_aging": 0.7},
    "lonely": {"loneliness": 1.0}, "someone_left": {"breakup": 1.0, "betrayal": 0.4},
    "someone_lost": {"grief_general": 1.0, "grief_parent": 0.6}, "new_baby": {"new_parent": 1.0, "loneliness": 0.4},
    "guilt": {"guilt": 1.0}, "shame": {"shame": 1.0}, "fraud": {"imposter": 1.0}, "drifted": {"reconnect_faith": 1.0, "doubt_faith": 0.4},
    "everyone_ahead": {"comparison": 1.0, "envy": 0.4}, "money_tight": {"money_stress": 1.0},
    "want_more": {"greed_more": 1.0, "craving": 0.4}, "criticism": {"criticism": 1.0},
    "midlife": {"midlife": 1.0}, "after_kids": {"empty_nest": 1.0}, "after_retiring": {"retirement": 1.0},
    "decision": {"big_decision": 1.0, "quit_or_stay": 0.5},
    # devotee follow-ups
    "health": {"illness_family": 1.0, "fear_death": 0.3}, "control": {"uncertainty": 1.0, "outcome_anxiety": 0.5},
    "lost_way": {"purpose_search": 0.8, "reconnect_faith": 0.7}, "closer": {"reconnect_faith": 1.0},
}

# How each onboarding feeling sounds, for the fallback hook statement.
FEELING_STATE = {
    "quiet": "my mind won't settle",
    "nerve": "I keep going over it again and again",
    "replay": "something doesn't sit right and I can't name it",
    "stick": "I have decided, and I am ready to begin",
    "faith": "I'm looking for something deeper to lean on",
    "gita": "I want to understand what the Gita teaches",
}

# "What's really going on": one second-person line under the revealed verse, naming the
# root cause as a small reveal. The reading writes a personal one; these stand in when it
# can't (no LLM, junk note, or its line fails the checks). No advice, no labels.
INSIGHTS = {
    "default": "Nothing is wrong with you. Something underneath has been asking for your attention, and it has been getting louder.",
    "attachment_to_results": "The tiredness comes from needing the work to turn out a certain way before you let yourself rest.",
    "need_for_approval": "What weighs on you is waiting for someone else to tell you the work was enough.",
    "expectation_of_others": "What they did hurts, and so does the picture you hold of how they were meant to be, which keeps breaking.",
    "anger_reactivity": "The anger arrives before you choose it. By the time you notice, it has already spoken for you.",
    "comparison_envy": "Your life looks small only next to the lives you keep measuring it against.",
    "desire_craving": "Each time you get what you wanted, the wanting moves somewhere new.",
    "restless_mind": "Your mind was never taught to rest, so it keeps running long after you've asked it to stop.",
    "fear_of_loss": "Most of what you fear hasn't happened. Your mind keeps living it in advance, again and again.",
    "grief_attachment": "You miss them every day, and the ache is as big as the love was.",
    "self_blame": "You hold yourself to a standard you'd never put on someone you love, and you pay for it every day.",
    "inertia_doubt": "Doubt is spending the energy you would use to begin.",
    "ego_pride": "What happened stings, and so does the picture of yourself it cracked.",
    "disconnection": "Even among people, you've felt unseen, and the distance has grown without anyone saying so.",
    "duty_conflict": "You're pulled between two things that both feel right, and you've been carrying the choice alone.",
    "no_meaning": "Nothing is exactly wrong, and that's the hard part. You've outgrown the reasons that used to carry you.",
    "resolve_begin": "You have decided, and the decision is your own. The hard part comes on the morning the work stops being exciting.",
    "dignity_denied": "You are being handed a smaller picture of yourself than the one you live, and the smallness is theirs.",
}

# The three levels a plan goes through, one per week (see ai/planner.py).
LEVELS = {
    "situation": {"week": 1, "label": "Your situation"},
    "pattern":   {"week": 2, "label": "The pattern underneath"},
    "self":      {"week": 3, "label": "Who you are beyond it"},
}
LEVEL_BY_WEEK = {1: "situation", 2: "pattern", 3: "self"}

# Week 3 statements shared by every mechanism, blended with the mechanism's own `self` lines.
SELF_HOOK = ("Beneath all my roles, worries and wants, something in me only watches, and I want to know who I really am.")
SELF_STEADY = ("The self does not change; the body and mind change, gain and loss come and go, and it remains the same through all of it.")


def level_story(level: str, mechanism: str) -> str:
    """The story statement for weeks 2 and 3 (week 1 uses the reading's own)."""
    label = MECHANISMS[mechanism]["label"].lower()
    if level == "pattern":
        return f"A story of someone caught again and again in the same struggle, {label}, who finally sees the pattern behind it."
    return "A story of someone who discovers who they truly are beyond their role and their fears, and acts from that freedom."


# Week titles per mechanism, one per level: their situation → the pattern underneath → who they are beyond it.
# The reading writes personal ones; these stand in when it can't.
WEEK_TITLES = {
    "default": ["Seeing it clearly", "The pattern underneath", "Who you are beyond it"],
    "attachment_to_results": ["When the outcome holds you", "Effort without the grip", "More than the result"],
    "need_for_approval": ["When their words shake you", "Waiting for their yes", "Whole without their praise"],
    "expectation_of_others": ["When they don't see you", "What's yours, what's theirs", "The same self in them"],
    "anger_reactivity": ["When anger takes over", "Where the fire starts", "The one who watches"],
    "comparison_envy": ["Measuring yourself", "Your own path", "No smaller, no larger"],
    "desire_craving": ["The pull you can't stop", "How wanting grows", "Already enough"],
    "restless_mind": ["A mind that won't settle", "Why it races", "Watching the mind"],
    "fear_of_loss": ["When you're afraid", "How fear grows", "What can't be lost"],
    "grief_attachment": ["Missing them", "Love that holds on", "Love that doesn't end"],
    "self_blame": ["Not feeling enough", "The verdict you keep passing", "Whole as you are"],
    "inertia_doubt": ["Stuck at the start", "Why we wait", "Already free to begin"],
    "ego_pride": ["Wanting to be seen", "The doer and the work", "Beyond the one who wants credit"],
    "disconnection": ["Feeling alone", "Why you feel apart", "Never truly separate"],
    "duty_conflict": ["Torn both ways", "Which duty is yours", "Acting as yourself"],
    "no_meaning": ["What's it all for", "What does not pass", "What gives it meaning"],
    "resolve_begin": ["Your turn to begin", "What tests a resolve", "The one who acts"],
    "dignity_denied": ["Seen as less", "Whose picture it is", "No smaller than you are"],
}
