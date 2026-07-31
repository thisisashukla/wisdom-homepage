"""
rag_examples.py — Few-shot examples for RAG synthesis.

Placed in the system prompt so the model imitates them directly. LLMs mimic
examples far better than they follow adjectives; these 6 examples do more
work than the entire voice bible for tone consistency.

Coverage picks the emotional range on purpose:
    1. Grief          — quiet, one verse, no lecture
    2. Cynical        — meets the cynicism head-on, no preaching
    3. Practical      — actionable + a verse to anchor
    4. Philosophical  — one clean thought, one verse
    5. Referential    — verse-centred, prose serves it
    6. Devotional     — warmer register

Format: each example is a (user_prompt, assistant_json) pair, ready to inject
as messages OR concatenate into the system prompt. We use the concatenation
approach so we don't burn message-count against Sarvam's context.
"""
from __future__ import annotations


# Each example uses fake uids the model must NOT invent at inference. This is
# intentional and safe — the model is shown that at inference the uid list
# WILL differ, and it must only use uids from the runtime `Available verses`
# block. To make the pattern learnable, uids here are visibly placeholder
# ("ex_...") and would never appear in a real retrieval.

EXAMPLES = [
    # ── 1. Grief ─────────────────────────────────────────────────────────────
    {
        "query": "My mother died last month and I can't stop crying",
        "verses": [
            {
                "uid": "ex_gita_2_13",
                "scripture": "Bhagwad Gita",
                "essence": "The one who dwells within is not touched by the body's ending.",
                "english_translation": "As the embodied one passes through childhood, youth, and old age in this body, so at the passing of the body there is no loss to the wise.",
                "insight": "The body changes; what watches the change does not.",
            },
            {
                "uid": "ex_gita_2_27",
                "scripture": "Bhagwad Gita",
                "essence": "What is born must die. What dies is reborn. Do not grieve what cannot be prevented.",
                "english_translation": "For the one who is born, death is certain; for the one who dies, birth is certain. Do not grieve for what cannot be otherwise.",
                "insight": "Grief resists a truth the body already knows.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "text",  "content": "That grief is not a problem to be solved. A month is barely anything. Cry when it comes."},
                {"type": "verse", "uid": "ex_gita_2_13"},
                {"type": "text",  "content": "The Gita says: the one who dwelled with you is not the body that ended. Something of her sits with you still — not as consolation, as fact. Take your time."},
            ]
        },
    },

    # ── 2. Cynical / challenge ───────────────────────────────────────────────
    {
        "query": "why should i care about a 3000 year old book",
        "verses": [
            {
                "uid": "ex_ashta_1_5",
                "scripture": "Ashtavakra Gita",
                "essence": "Freedom is not somewhere else; it is you noticing that you were never bound.",
                "english_translation": "You are not the body — you are the awareness in which the body appears. Recognising this, be free.",
                "insight": "The book is a mirror, not an instruction manual.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "text",  "content": "You probably shouldn't — not because it's old, but because most people who quote it are boring about it. What survives from three thousand years ago isn't the doctrine, it's the observation about how you actually work when nobody is watching."},
                {"type": "verse", "uid": "ex_ashta_1_5"},
                {"type": "text",  "content": "Test it against your own experience. If it doesn't describe something you already half-know, close it."},
            ]
        },
    },

    # ── 3. Practical ─────────────────────────────────────────────────────────
    {
        "query": "how do i stop getting so angry at my boss",
        "verses": [
            {
                "uid": "ex_gita_2_62",
                "scripture": "Bhagwad Gita",
                "essence": "Anger is the third step, not the first. It begins with dwelling on what you want.",
                "english_translation": "From dwelling on objects, attachment arises. From attachment, desire. From desire, anger.",
                "insight": "Interrupt the chain earlier — before the anger owns the room.",
            },
            {
                "uid": "ex_gita_5_23",
                "scripture": "Bhagwad Gita",
                "essence": "The one who can hold anger's push without acting on it is steady.",
                "english_translation": "The one who is able to withstand the impulses of desire and anger before shedding the body is a yogi, and is happy.",
                "insight": "Steadiness is a muscle, not a mood.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "text",  "content": "Notice the exact moment the anger starts. Not when it lands — when it starts. Usually it's when you catch yourself replaying something they said. That replay is where you have any leverage at all."},
                {"type": "verse", "uid": "ex_gita_2_62"},
                {"type": "text",  "content": "The Gita traces anger back three steps: dwelling → attachment → desire → anger. You can't stop step four from feeling like fire. You can catch step one. That is the whole practice."},
            ]
        },
    },

    # ── 4. Philosophical ────────────────────────────────────────────────────
    {
        "query": "what is atman",
        "verses": [
            {
                "uid": "ex_katha_1_2_18",
                "scripture": "Katha Upanishad",
                "essence": "The knowing self is not born and does not die.",
                "english_translation": "The Self is never born, nor does it die. It is unborn, eternal, ancient — it is not slain when the body is slain.",
                "insight": "That which sees birth and death cannot itself be a birth or a death.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "text",  "content": "Atman is the noun the Upanishads use for the thing in you that is watching this sentence being read — not the eyes, not the mind that will react, but the awareness in which the reaction will appear."},
                {"type": "verse", "uid": "ex_katha_1_2_18"},
                {"type": "text",  "content": "It's not a claim about a soul. It's a pointer to something quieter — that whatever changes in you, something has not changed. Notice it once and the word starts making sense."},
            ]
        },
    },

    # ── 5. Referential ──────────────────────────────────────────────────────
    {
        "query": "explain gita 2.47",
        "verses": [
            {
                "uid": "ex_gita_2_47",
                "scripture": "Bhagwad Gita",
                "essence": "Do the work. The outcome is not yours.",
                "english_translation": "You have the right to action alone, never to its fruits. Do not let the fruits be your motive, nor let attachment bind you to inaction.",
                "insight": "Effort is a domain you control. Outcome is a domain you don't.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "verse", "uid": "ex_gita_2_47"},
                {"type": "text",  "content": "Krishna is drawing a line between two domains. Effort is yours; the fruit is not. That doesn't mean not caring — it means not letting the caring turn into paralysis. The work still has to be done at full strength; only the ownership of the result changes hands."},
            ],
            # NOTE to the model: this shows that "first segment must be text" is
            # not a hard rule when the query IS the verse — for referential
            # queries, opening on the verse is natural.
        },
    },

    # ── 6. Devotional ───────────────────────────────────────────────────────
    {
        "query": "how do i develop real bhakti",
        "verses": [
            {
                "uid": "ex_gita_9_26",
                "scripture": "Bhagwad Gita",
                "essence": "The offering is not the object. The offering is the offering.",
                "english_translation": "Whoever offers me a leaf, a flower, a fruit, or water with love — I accept that offering of love from the pure-hearted one.",
                "insight": "Bhakti is measured in attention, not scale.",
            },
        ],
        "answer": {
            "segments": [
                {"type": "text",  "content": "Bhakti does not begin with feeling. It begins with the small deliberate act — a moment of attention offered without asking for anything back. The feeling arrives later, and often not in the way you were expecting."},
                {"type": "verse", "uid": "ex_gita_9_26"},
                {"type": "text",  "content": "A leaf, a flower, a glass of water — the point is not the object. The point is that for a few seconds nothing else was being asked. Start there."},
            ]
        },
    },
]


def _verse_block(v: dict) -> str:
    """Render a verse for the example's user-content preamble."""
    return (
        f"uid: [{v['uid']}]\n"
        f"Scripture: {v['scripture']}\n"
        f"Essence: {v.get('essence','')}\n"
        f"Translation: {v.get('english_translation','')}\n"
        f"Insight: {v.get('insight','')}"
    )


def render_examples_block() -> str:
    """
    Serialise all examples as a single block to append to the system prompt.
    Format follows the same "Question / Available verses / JSON answer" shape
    as the live user message.
    """
    import json as _json
    parts = ["── FEW-SHOT EXAMPLES ────────────────────────────────────────────────────────",
             "The following show the exact tone and JSON shape expected. Uids beginning",
             "with 'ex_' are placeholders — at inference time you MUST only use uids",
             "from the live `Available verses` block, never these examples.\n"]

    for i, ex in enumerate(EXAMPLES, 1):
        verses = "\n\n".join(_verse_block(v) for v in ex["verses"])
        answer = _json.dumps(ex["answer"], ensure_ascii=False, indent=2)
        parts.append(
            f"── Example {i} ─────────────────────────────────────────────────────────────\n"
            f"Question: {ex['query']}\n\n"
            f"Available verses:\n{verses}\n\n"
            f"Answer:\n{answer}"
        )

    return "\n\n".join(parts)
