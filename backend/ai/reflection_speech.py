"""OpenAI transcription and Sarvam speech for private mobile reflections."""
from __future__ import annotations

import base64
import io
import re
import wave

import httpx

from common.config import settings


def _headers() -> dict[str, str]:
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")
    return {"Authorization": f"Bearer {settings.openai_api_key}"}


async def transcribe_audio(audio: bytes, mime_type: str, language: str | None = None) -> str:
    extension = "webm" if "webm" in mime_type else "wav" if "wav" in mime_type else "mp3" if "mpeg" in mime_type else "m4a"
    data: dict[str, str] = {
        "model": settings.openai_transcribe_model,
        "response_format": "json",
        "prompt": (
            "A private personal reflection which may include Indian names, Hindi, "
            "Hinglish, Sanskrit, Bhagavad Gita, dharma, karma, bhakti, viveka, "
            "vairagya, and yoga terminology. Preserve the speaker's wording."
        ),
    }
    if language:
        data["language"] = language
    async with httpx.AsyncClient(timeout=90) as client:
        response = await client.post(
            "https://api.openai.com/v1/audio/transcriptions",
            headers=_headers(),
            data=data,
            files={"file": (f"reflection.{extension}", audio, mime_type)},
        )
    if response.is_error:
        raise RuntimeError(f"Transcription failed ({response.status_code})")
    transcript = str(response.json().get("text") or "").strip()
    if not transcript:
        raise RuntimeError("Transcription was empty")
    return transcript


def speech_chunks(text: str, limit: int = 2400) -> list[str]:
    """Keep sentence boundaries when possible, without losing long passages."""
    remaining = text.strip()
    chunks = []
    while len(remaining) > limit:
        boundaries = list(re.finditer(r"[.!?।]\s+|\n+", remaining[:limit + 1]))
        end = boundaries[-1].end() if boundaries else remaining.rfind(" ", 0, limit)
        if end <= 0 or end > limit:
            end = limit
        chunks.append(remaining[:end].strip())
        remaining = remaining[end:].strip()
    if remaining:
        chunks.append(remaining)
    return chunks


def join_wave_audio(parts: list[bytes]) -> bytes:
    if not parts:
        raise RuntimeError("Speech generation returned no audio")
    output = io.BytesIO()
    expected = None
    with wave.open(output, "wb") as writer:
        for part in parts:
            with wave.open(io.BytesIO(part), "rb") as reader:
                actual = (reader.getnchannels(), reader.getsampwidth(), reader.getframerate())
                if expected is None:
                    expected = actual
                    writer.setnchannels(actual[0])
                    writer.setsampwidth(actual[1])
                    writer.setframerate(actual[2])
                elif actual != expected:
                    raise RuntimeError("Speech audio formats did not match")
                frames = reader.readframes(reader.getnframes())
                if not frames:
                    raise RuntimeError("Speech generation returned empty audio")
                writer.writeframes(frames)
    return output.getvalue()


async def synthesize_speech(text: str) -> bytes:
    if not settings.sarvam_api_key:
        raise RuntimeError("SARVAM_API_KEY is not configured")
    parts = []
    async with httpx.AsyncClient(timeout=90) as client:
        for chunk in speech_chunks(text):
            response = await client.post(
                "https://api.sarvam.ai/text-to-speech",
                headers={"api-subscription-key": settings.sarvam_api_key, "Content-Type": "application/json"},
                json={
                    "model": "bulbul:v3",
                    "speaker": settings.sarvam_tts_speaker,
                    "language_code": settings.sarvam_tts_language,
                    "pace": 0.95,
                    "speech_sample_rate": 24000,
                    "output_audio_codec": "wav",
                    "text": chunk,
                },
            )
            if response.is_error:
                raise RuntimeError(f"Speech generation failed ({response.status_code})")
            audios = response.json().get("audios")
            if not isinstance(audios, list) or not audios:
                raise RuntimeError("Speech generation returned no audio")
            parts.extend(base64.b64decode(audio, validate=True) for audio in audios)
    return join_wave_audio(parts)
