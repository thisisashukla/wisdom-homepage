"""
vagdhenu.py — Sanskrit chant TTS client.

Vagdhenu (research project by Prof. Prathosh, IISc — https://prathosh.in/vagdhenu/)
is a Sanskrit shloka chant TTS that requires Python 3.10 + CUDA GPU. The
wisdom-homepage FastAPI backend almost certainly runs on a CPU-only box, so
this module wraps the model behind a client abstraction with three backends:

  hf_space  (DEFAULT)
      Calls the public HF Space `prathoshap/vagdhenu-demo` via gradio_client.
      Works from anywhere with network. Free tier is rate-limited and
      first-request cold-starts a ZeroGPU (up to ~90s). Best for MVP.

  http
      Calls an HTTP endpoint you host (Modal, Replicate, RunPod, a plain
      Python service — anything that accepts JSON and returns audio bytes).
      Contract:
          POST {VAGDHENU_HTTP_URL}
          Body: {"text": "<devanagari>", "meter": "anushtubh"}
          → 200: audio/wav bytes
          → non-2xx: JSON {"detail": "..."} propagated to the caller.
      Add Authorization via VAGDHENU_HTTP_AUTH if the endpoint requires it.

  stub
      Returns a NotImplementedError. Useful when developing without any
      audio backend configured — /audio/generate returns 501.

Every backend returns the SAME shape: bytes of a WAV file. Uploading to
Supabase Storage + patching verses.audio_url happens in server/audio.py so
the client stays deployment-agnostic.
"""
from __future__ import annotations

import io
import logging
import os
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


# ── Interface ────────────────────────────────────────────────────────────────

class VagdhenuClient(ABC):
    """
    Abstract Sanskrit chant client. Every implementation must produce a WAV
    bytes payload for a Devanagari shloka + meter.
    """

    @abstractmethod
    def render(self, text: str, meter: str = "anushtubh", seed: Optional[int] = None) -> bytes:
        """
        Args:
            text: Devanagari shloka text (with dandas). Vagdhenu's frontend
                  routes Devanagari through SLP1 → Kannada; we pass raw
                  Devanagari through unchanged.
            meter: Sanskrit meter name. "anushtubh" covers most Gita verses;
                   "trishtubh" for BG 11 / 15 and many Upanishad passages.
            seed: Optional deterministic seed. Ignored by backends that don't
                  support it.
        Returns:
            WAV file contents as bytes. 22050 or 44100 Hz mono is typical.
        """

    def health(self) -> bool:
        """Best-effort readiness check. Default = optimistic True."""
        return True


# ── HF Space backend (default) ───────────────────────────────────────────────

class HFSpaceVagdhenuClient(VagdhenuClient):
    """
    Calls `prathoshap/vagdhenu-demo` on Hugging Face Spaces via gradio_client.

    The demo Space UI has one text box (Devanagari) and one meter dropdown.
    The gradio_client `.predict()` call resolves the same endpoint the UI
    posts to. If the Space UI changes, you may need to update `api_name`
    below — check with `Client(space).view_api()`.

    Cold starts are painful on Spaces (ZeroGPU may sleep). Consider using
    the `http` backend for a warm self-hosted deployment.
    """

    def __init__(self, space_id: str = "prathoshap/vagdhenu-demo", api_name: str = "/predict"):
        self.space_id = space_id
        self.api_name = api_name
        self._client = None

    def _client_lazy(self):
        if self._client is not None:
            return self._client
        try:
            from gradio_client import Client
        except ImportError as e:
            raise ImportError(
                "gradio_client not installed. `pip install gradio_client`."
            ) from e
        hf_token = os.environ.get("HF_TOKEN") or None
        logger.info("Connecting to HF Space %s (api_name=%s) …", self.space_id, self.api_name)
        self._client = Client(self.space_id, hf_token=hf_token)
        return self._client

    def render(self, text: str, meter: str = "anushtubh", seed: Optional[int] = None) -> bytes:
        client = self._client_lazy()
        try:
            # The demo Space's predict signature may vary — check
            # client.view_api() if the call fails. Common shape:
            #   predict(text, meter, api_name="/predict") -> filepath (wav)
            result = client.predict(text, meter, api_name=self.api_name)
        except Exception as e:
            raise RuntimeError(
                f"HF Space call failed for space={self.space_id} api_name={self.api_name}: {e}. "
                f"Check the Space's public API with Client(space).view_api()."
            ) from e

        # gradio_client returns a filesystem path (str) or a tuple of paths
        # when the Space returns audio. Handle both shapes.
        wav_path: Optional[str] = None
        if isinstance(result, str):
            wav_path = result
        elif isinstance(result, (list, tuple)) and result:
            for item in result:
                if isinstance(item, str) and item.lower().endswith((".wav", ".mp3", ".flac", ".ogg")):
                    wav_path = item
                    break
            if not wav_path and isinstance(result[0], str):
                wav_path = result[0]

        if not wav_path or not Path(wav_path).exists():
            raise RuntimeError(f"HF Space returned unexpected shape: {type(result).__name__}={str(result)[:200]}")

        return Path(wav_path).read_bytes()


# ── HTTP backend (self-hosted) ───────────────────────────────────────────────

class HttpVagdhenuClient(VagdhenuClient):
    """
    POST to a self-hosted vagdhenu HTTP endpoint.

    Expected contract:
        POST {url}
        Content-Type: application/json
        Body: {"text": "<devanagari>", "meter": "anushtubh", "seed": <int|null>}
        → 200 audio/wav (or audio/mpeg): raw audio bytes
        → non-2xx: caller raises with the response body

    Auth (optional): set VAGDHENU_HTTP_AUTH to a full header value, e.g.
        "Bearer sk-abcd…"       (bearer token)
        "Basic dXNlcjpwYXNz"    (basic auth)
    """

    def __init__(self, url: str, auth_header: Optional[str] = None, timeout_seconds: int = 120):
        self.url = url
        self.auth_header = auth_header
        self.timeout = timeout_seconds

    def render(self, text: str, meter: str = "anushtubh", seed: Optional[int] = None) -> bytes:
        try:
            import requests
        except ImportError as e:
            raise ImportError("requests not installed. `pip install requests`.") from e

        headers = {"Content-Type": "application/json", "Accept": "audio/wav"}
        if self.auth_header:
            headers["Authorization"] = self.auth_header

        payload = {"text": text, "meter": meter}
        if seed is not None:
            payload["seed"] = int(seed)

        try:
            resp = requests.post(self.url, json=payload, headers=headers, timeout=self.timeout)
        except Exception as e:
            raise RuntimeError(f"HTTP request to {self.url} failed: {e}") from e

        if resp.status_code // 100 != 2:
            # Try to surface the server's error body verbatim.
            body_preview = resp.text[:300] if resp.text else "<empty>"
            raise RuntimeError(f"Vagdhenu HTTP {resp.status_code}: {body_preview}")

        if not resp.content:
            raise RuntimeError("Vagdhenu HTTP returned empty body.")

        return resp.content


# ── Stub backend (dev / disabled) ────────────────────────────────────────────

class StubVagdhenuClient(VagdhenuClient):
    """Refuses to render. Used when no backend is configured."""

    def render(self, text: str, meter: str = "anushtubh", seed: Optional[int] = None) -> bytes:
        raise NotImplementedError(
            "Vagdhenu is not configured. Set VAGDHENU_BACKEND to 'hf_space' or 'http' and restart."
        )

    def health(self) -> bool:
        return False


# ── Factory + module singleton ───────────────────────────────────────────────

_client: Optional[VagdhenuClient] = None


def get_vagdhenu() -> VagdhenuClient:
    global _client
    if _client is None:
        raise RuntimeError("Vagdhenu client not initialised — call init_vagdhenu() first")
    return _client


def init_vagdhenu(
    backend: str = "hf_space",
    hf_space_id: str = "prathoshap/vagdhenu-demo",
    hf_api_name: str = "/predict",
    http_url: Optional[str] = None,
    http_auth: Optional[str] = None,
    http_timeout: int = 120,
) -> VagdhenuClient:
    """
    Wire the concrete client. `backend` is one of hf_space | http | stub.

    Unknown backend falls back to `stub` so the app still boots but
    /audio/generate returns 501 for clear diagnostics.
    """
    global _client
    b = (backend or "stub").lower()
    if b == "hf_space":
        _client = HFSpaceVagdhenuClient(space_id=hf_space_id, api_name=hf_api_name)
    elif b == "http":
        if not http_url:
            logger.error("VAGDHENU_BACKEND=http but VAGDHENU_HTTP_URL is empty — falling back to stub.")
            _client = StubVagdhenuClient()
        else:
            _client = HttpVagdhenuClient(url=http_url, auth_header=http_auth, timeout_seconds=http_timeout)
    elif b == "stub":
        _client = StubVagdhenuClient()
    else:
        logger.error("Unknown VAGDHENU_BACKEND=%r — falling back to stub.", backend)
        _client = StubVagdhenuClient()

    logger.info("Vagdhenu client ready (backend=%s, kind=%s)", b, type(_client).__name__)
    return _client
