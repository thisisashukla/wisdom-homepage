"""
sarvam.py — Sarvam AI client for the wisdom-homepage backend.

Key findings from docs (docs.sarvam.ai/api/api-guides-tutorials/chat-completion/overview):
- Thinking mode is ON by default; reasoning tokens count toward the max_tokens budget.
  With a low max_tokens, reasoning can consume all tokens leaving content empty
  with finish_reason='length'. Fix: explicitly disable via additional_body_parameters.
- response_format, reasoning_effort, and other extra params must go through
  request_options.additional_body_parameters in the Python SDK to be guaranteed sent.
- sarvam-105b (replaces deprecated sarvam-30b) max_tokens: up to 4096 (Starter) / 16384 (Pro) / 128000 (Business).
"""
from __future__ import annotations

import json
import logging
import re
import time
from typing import Any, Iterator

from sarvamai import SarvamAI

from ai import consent

logger = logging.getLogger(__name__)


def _parse_json(text: str) -> Any:
    """Strip optional markdown fences and parse JSON."""
    text = text.strip()
    text = re.sub(r"^```[a-z]*\n?", "", text)
    text = re.sub(r"\n?```$", "", text)
    return json.loads(text)


class SarvamClient:
    def __init__(self, api_key: str, model: str = "sarvam-105b"):
        self.model   = model
        self._client = SarvamAI(api_subscription_key=api_key)
        logger.info("SarvamClient ready | model=%s", model)

    def _call(
        self,
        system_prompt: str,
        user_content: str,
        temperature: float = 0.3,
        max_tokens: int = 2048,
        expect_json: bool = True,
        json_mode: bool = False,
        retries: int = 1,
    ) -> Any:
        consent.guard()
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_content},
        ]

        # Force reasoning_effort=null via additional_body_parameters so it's
        # guaranteed to be sent in the JSON body (SDK may drop None kwargs).
        additional: dict = {"reasoning_effort": None}
        if json_mode:
            additional["response_format"] = {"type": "json_object"}

        last_exc: Exception | None = None
        for attempt in range(retries + 1):
            if attempt > 0:
                wait = 1.5 * attempt
                logger.warning("Retrying Sarvam call (attempt %d) after %.1fs …", attempt + 1, wait)
                time.sleep(wait)

            try:
                resp = self._client.chat.completions(
                    model=self.model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                    request_options={
                        "additional_body_parameters": additional
                    },
                )
            except Exception as e:
                last_exc = e
                logger.error("Sarvam HTTP error (attempt %d): %s", attempt + 1, e)
                continue

            choice  = resp.choices[0]
            text    = (choice.message.content or "").strip()
            r_text  = getattr(choice.message, "reasoning_content", None) or ""

            logger.info(
                "Sarvam response | finish=%s content_len=%d reasoning_len=%d tokens=%s",
                choice.finish_reason, len(text), len(r_text), resp.usage,
            )

            if not text:
                last_exc = ValueError(
                    f"Empty content from Sarvam (finish_reason={choice.finish_reason!r}, "
                    f"reasoning_tokens={len(r_text)}). "
                    f"Increase max_tokens or check reasoning_effort."
                )
                logger.error(str(last_exc))
                continue  # retry

            if choice.finish_reason == "length":
                logger.warning("finish_reason=length — response truncated at %d tokens", max_tokens)

            if expect_json:
                try:
                    return _parse_json(text)
                except json.JSONDecodeError as e:
                    last_exc = ValueError(f"Sarvam returned invalid JSON: {e}. Raw: {text[:300]}")
                    logger.error(str(last_exc))
                    continue  # retry

            return text

        raise last_exc or RuntimeError("Sarvam call failed after all retries")

    def extract_intents(self, system_prompt: str, user_query: str) -> dict:
        """Extract 1–4 intents as JSON. Uses json_mode for reliable output."""
        return self._call(
            system_prompt, user_query,
            temperature=0.2,
            max_tokens=1024,
            expect_json=True,
            json_mode=True,
            retries=2,
        )

    def synthesize_rag(self, system_prompt: str, user_content: str, max_tokens: int = 4096) -> dict:
        """
        Generate a structured answer as JSON segments.
        Returns parsed dict: {"segments": [{type, content/uid}, ...]}.
        max_tokens: 1500 for crisp mode, 4096 for detailed mode.
        """
        return self._call(
            system_prompt, user_content,
            temperature=0.4,
            max_tokens=max_tokens,
            expect_json=True,
            json_mode=True,
            retries=1,
        )

    def synthesize_rag_stream(
        self,
        system_prompt: str,
        user_content: str,
        max_tokens: int = 4096,
    ) -> Iterator[str]:
        """
        Streaming variant of synthesize_rag. Yields raw content deltas as they
        arrive from Sarvam. The caller is responsible for accumulating the
        deltas into a JSON buffer and parsing at the end.

        The response is emitted as `json_mode` so the accumulated text is
        guaranteed to be a valid JSON object once complete. Individual deltas
        are NOT JSON-valid — do not attempt to parse them mid-stream.

        reasoning_effort is disabled (same as non-streaming path); with json
        mode Sarvam should not emit reasoning_content deltas, but we defensively
        skip anything that arrives on that channel.
        """
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_content},
        ]
        additional = {
            "reasoning_effort": None,
            "response_format":  {"type": "json_object"},
        }

        try:
            stream = self._client.chat.completions(
                model            = self.model,
                messages         = messages,
                temperature      = 0.4,
                max_tokens       = max_tokens,
                stream           = True,
                request_options  = {"additional_body_parameters": additional},
            )
        except Exception as e:
            logger.error("Sarvam stream open failed: %s", e)
            raise

        for chunk in stream:
            # Sarvam mirrors OpenAI-style SSE deltas: choices[0].delta.content
            try:
                choices = getattr(chunk, "choices", None) or []
                if not choices:
                    continue
                delta = getattr(choices[0], "delta", None)
                if delta is None:
                    continue
                content = getattr(delta, "content", None)
                if content:
                    yield content
            except Exception as e:
                # Do NOT let a malformed chunk kill the stream — log and continue.
                logger.warning("Malformed stream chunk skipped: %s", e)
                continue

    def chat_json(
        self,
        messages: list[dict],
        *,
        temperature: float = 0.2,
        max_tokens: int = 1400,
        timeout_s: int = 10,
    ) -> dict:
        """
        One JSON-mode call with a full message list (system + few-shot turns + user),
        a hard HTTP timeout and no retries: callers that sit on a user-facing path
        (onboarding) own their own deadline and fallback.
        """
        consent.guard()
        resp = self._client.chat.completions(
            model=self.model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            request_options={
                "timeout_in_seconds": int(timeout_s),
                "max_retries": 0,
                "additional_body_parameters": {"reasoning_effort": None, "response_format": {"type": "json_object"}},
            },
        )
        choice = resp.choices[0]
        text = (choice.message.content or "").strip()
        logger.info("Sarvam chat_json | finish=%s content_len=%d tokens=%s", choice.finish_reason, len(text), resp.usage)
        if not text:
            raise ValueError(f"Empty content from Sarvam (finish_reason={choice.finish_reason!r})")
        return _parse_json(text)

    def generate_json(self, system_prompt: str, user_content: str, max_tokens: int = 2048) -> dict:
        """
        Generic JSON generation — used for verse-of-day context (date_context,
        why_chosen, story). Slightly higher temperature than RAG for warmth of
        prose; json_mode on for reliable parsing.
        """
        return self._call(
            system_prompt, user_content,
            temperature=0.5,
            max_tokens=max_tokens,
            expect_json=True,
            json_mode=True,
            retries=2,
        )


# ── Module singleton ──────────────────────────────────────────────────────────

_client: SarvamClient | None = None


def get_sarvam() -> SarvamClient:
    global _client
    if _client is None:
        raise RuntimeError("Sarvam client not initialised — call init_sarvam() first")
    return _client


def init_sarvam(api_key: str, model: str = "sarvam-105b") -> SarvamClient:
    global _client
    _client = SarvamClient(api_key=api_key, model=model)
    return _client
