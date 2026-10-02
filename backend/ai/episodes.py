"""Small source-backed episode library. No generated story prose is treated as evidence.
Ranges were inspected against the bundled source passages. A missing or changed passage
makes the entire episode unavailable. Expand this registry only after source review.
"""
from ai.index import get_index
from ai.conversation import source_view

EPISODES = [
    {"id": "arjuna-overwhelmed", "title": "Arjuna describes his distress",
     "keywords": ("arjuna", "overwhelmed", "conflict", "grief", "battle", "anger", "credit", "recognition"),
     "passages": [(28, "Seeing my own people"), (29, "My limbs are failing"), (30, "My bow slips")],
     "limits": "Describe only Arjuna's words and physical distress. Do not call his grief anger. Do not equate an ordinary disagreement with a war or prescribe fighting."},
    {"id": "arjuna-asks-for-help", "title": "Arjuna admits uncertainty and asks for guidance",
     "keywords": ("arjuna", "guidance", "uncertain", "confused", "duty", "help"),
     "passages": [(54, "My nature is overwhelmed"), (55, "Even if I gained"), (56, "Sanjaya said")],
     "limits": "His request is specific to this dialogue. Do not demand surrender to the app or imply it is a guru."},
    {"id": "restless-mind", "title": "Arjuna questions whether steadiness is possible",
     "keywords": ("mind", "restless", "meditat", "practice", "wind", "arjuna"),
     "passages": [(266, "Arjuna said"), (267, "The mind is restless"), (268, "The mind is hard"), (269, "Yoga is hard")],
     "limits": "Krishna acknowledges difficulty. Do not promise a cure, blame lack of discipline, or invent gestures or dialogue."},
]


def episode_context(query: str, index=None) -> tuple[list[dict], list[dict]]:
    index = index or get_index()
    ranked = sorted(EPISODES, key=lambda e: sum(word in query.lower() for word in e["keywords"]), reverse=True)
    if not any(word in query.lower() for word in ranked[0]["keywords"]):
        return [], []
    episode = ranked[0]
    passages = []
    for order, expected in episode["passages"]:
        verse = index.get_verse(f"bhagwad_gita::{order}")
        if not verse or expected.casefold() not in verse.get("english_translation", "").casefold():
            return [], []
        passages.append(verse)
    return [{"id": episode["id"], "title": episode["title"], "interpretiveLimits": episode["limits"],
             "passages": [source_view(v) for v in passages]}], passages
