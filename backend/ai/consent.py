"""
consent.py — whether this request may use third-party AI (App Review 5.1.2(i)).

The app asks the person once before anything they wrote is sent to an AI model. When they say
"Not now", every request carries `ai: false`. For that request:

    - the note, questions and other free text are dropped before anything reads them;
    - every LLM call (SarvamClient, OpenAICompatClient) raises AIOff, so each caller takes the
      deterministic path it already has for a timeout or a missing key (chips → template reading,
      template lines, template narration script).

Embedding and reranking (Cloudflare Workers AI on Vercel) then only ever see the library's own
template text built from the chips, never words the person wrote.

The flag lives in a ContextVar set at the top of each endpoint. asyncio.to_thread copies the
context, so LLM calls made from worker threads see it too.
"""
from __future__ import annotations

import contextvars

_allowed: contextvars.ContextVar[bool] = contextvars.ContextVar("wisdom_ai_allowed", default=True)


class AIOff(RuntimeError):
    """Raised by an LLM client when the person has not allowed third-party AI for this request."""


def set_allowed(value: bool) -> None:
    _allowed.set(bool(value))


def allowed() -> bool:
    return _allowed.get()


def guard() -> None:
    if not _allowed.get():
        raise AIOff("third-party AI is off for this request")
