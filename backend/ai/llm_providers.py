"""
llm_providers.py — one chat_json() contract, several providers, chosen per role.

    reader   the reading of the person (ai/understanding.py): JSON-heavy, must be reliable and not copy examples
    writer   everything the person reads or hears (ai/personalize.py, ai/depth.py, ai/narration_script.py)
    rerank   the hook, story and week checks (ai/llm_rerank.py): short, cheap, many

Each role is a spec "provider:model" (settings.llm_reader / llm_writer / llm_rerank), e.g. "sarvam:sarvam-105b",
"openai:gpt-5.4-mini", "openai:gpt-5.5". An empty spec means the Sarvam client. OpenAI-compatible endpoints
(OpenAI, Gemini's compat layer, OpenRouter) share one client: set `openai_base_url` for a different host.

Every client exposes  chat_json(messages, *, temperature, max_tokens, timeout_s) -> dict  with a hard timeout and
no retries: the callers own their deadlines and fallbacks (that is the contract SarvamClient set).
"""
from __future__ import annotations

import json
import logging
import re
from typing import Any, Optional

import httpx

from ai import consent

logger = logging.getLogger(__name__)


def _parse_json(text: str) -> Any:
    text = text.strip()
    text = re.sub(r"^```[a-z]*\n?", "", text)
    text = re.sub(r"\n?```$", "", text)
    return json.loads(text)


class OpenAICompatClient:
    """chat/completions in JSON mode over httpx. Reasoning models (gpt-5 family) take no temperature and use
    max_completion_tokens; their reasoning effort is kept minimal: these calls sit on a user-facing path."""

    def __init__(self, api_key: str, model: str, base_url: str = "https://api.openai.com/v1", reasoning: str = "minimal"):
        self.model, self.base_url, self.reasoning = model, base_url.rstrip("/"), reasoning
        self._h = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        logger.info("OpenAICompatClient ready | model=%s", model)

    @property
    def _reasoning_model(self) -> bool:
        return self.model.startswith(("gpt-5", "gpt-6", "o1", "o3", "o4")) and "chat" not in self.model

    def chat_json(self, messages: list[dict], *, temperature: float = 0.2, max_tokens: int = 1400, timeout_s: int = 10) -> dict:
        consent.guard()
        body: dict = {"model": self.model, "messages": messages, "response_format": {"type": "json_object"}}
        if self._reasoning_model:
            body["max_completion_tokens"] = max_tokens + 400     # a little headroom for the reasoning tokens
            body["reasoning_effort"] = self.reasoning
        else:
            body["temperature"] = temperature
            body["max_tokens"] = max_tokens
        with httpx.Client(timeout=httpx.Timeout(timeout_s, connect=5.0)) as c:
            r = c.post(f"{self.base_url}/chat/completions", headers=self._h, json=body)
        if r.status_code != 200:
            raise RuntimeError(f"{self.model}: HTTP {r.status_code} {r.text[:200]}")
        d = r.json()
        choice = d["choices"][0]
        text = (choice["message"].get("content") or "").strip()
        logger.info("%s chat_json | finish=%s content_len=%d usage=%s", self.model, choice.get("finish_reason"), len(text), d.get("usage"))
        if not text:
            raise ValueError(f"Empty content from {self.model} (finish_reason={choice.get('finish_reason')!r})")
        return _parse_json(text)


def make_client(spec: str, *, sarvam=None, openai_key: str = "", openai_base_url: str = "", reasoning: str = "minimal"):
    """A client for a role spec. Unknown provider or missing key → the Sarvam client (never None when Sarvam exists)."""
    spec = (spec or "").strip()
    if not spec or spec.startswith("sarvam"):
        return sarvam
    provider, _, model = spec.partition(":")
    if provider in ("openai", "gemini", "openrouter") and model:
        key = openai_key
        base = openai_base_url or {"openai": "https://api.openai.com/v1",
                                    "gemini": "https://generativelanguage.googleapis.com/v1beta/openai",
                                    "openrouter": "https://openrouter.ai/api/v1"}[provider]
        if key:
            return OpenAICompatClient(api_key=key, model=model, base_url=base, reasoning=reasoning)
        logger.warning("llm spec %s has no key; using Sarvam", spec)
    return sarvam
