"""Conversational synthesis: shared voice, optional sources, full recent dialogue."""
from __future__ import annotations
import json
from common.models import IntentType, VerseResult
from prompts.companion import COMPANION_VOICE
from prompts.rag_examples import render_examples_block


def build_rag_system_prompt(mode: str, intent_type: IntentType | str = "other", has_sources: bool = True) -> str:
    length = ("Usually a short paragraph; allow enough room for a useful answer or question."
              if mode == "crisp" else "Go deeper into the user's actual question. Use as much detail as it needs without repetition.")
    return "\n\n".join([COMPANION_VOICE, length,
        "The intent hint is " + str(intent_type) + ". It is tentative; the actual conversation takes precedence.",
        """Return only JSON: {"segments": [{"type":"text", "content":"..."},
{"type":"verse", "uid":"exact supplied uid"}], "source_uids": []}. Text-only answers are valid.
List source_uids for every passage used in prose, including paraphrases or stories.
Use a verse segment only when a displayed quotation itself helps; source_uids can
attribute a natural prose discussion without a large quotation card.
Use verse segments for exact quotations so the client renders the canonical source.
Do not embed scriptural quotations in text segments. Paraphrases must be identified as
paraphrases and attributed to a supplied source. Keep source UIDs in verse segments.
Do not cite any source outside Available verses or tell stories unsupported by episodePassages.
Always include a useful text segment answering the latest message; never reply with only verse cards.
No required opening, closing, verse count, or question. Natural short paragraphs; lists are
allowed when the user asks for steps or a comparison. Do not output planning/state.""",
        render_examples_block(include_sources=has_sources)])


def build_rag_user_prompt(query: str, verses: list[VerseResult], history: list | None = None,
                          plan: dict | None = None, episodes: list | None = None) -> str:
    return json.dumps({
        "latestUserMessage": query,
        "conversation": [t.model_dump() if hasattr(t, "model_dump") else t for t in (history or [])],
        "turnPlan": plan or {},
        "Available verses": [{"uid": v.uid, "scripture": v.scripture, "reference": v.verse_id,
            "sourceText": v.verse_sanskrit, "translation": v.english_translation,
            "editorialParaphrase": v.simple_meaning or v.essence,
            "editorialApplication": v.insight, "speaker": v.speaker} for v in verses],
        "episodePassages": episodes or [],
    }, ensure_ascii=False)

RAG_SYSTEM_PROMPT = build_rag_system_prompt("detailed")
RAG_SYSTEM_PROMPT_CRISP = build_rag_system_prompt("crisp")
