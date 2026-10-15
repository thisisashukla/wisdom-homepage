"""Thin Supabase Storage helper for the blur-demo endpoint.

We upload the blurred MP4 into a *private* bucket (see the SQL
migration in supabase/migrations/) under a UUID-prefixed key, then
return a short-lived signed URL. Nothing here reads or writes the
Supabase Postgres tables — the demo is stateless by design; a browser
that loses its result URL cannot recover it (that's the point of
'temporary demo').

The Supabase Python client is imported inside the class so that a
Wisdom deploy without the blur endpoint doesn't have to install it.
"""

from __future__ import annotations

import logging
import mimetypes
import uuid
from typing import TYPE_CHECKING

from server.blur_demo.config import settings as demo_settings

if TYPE_CHECKING:
    from supabase import Client  # noqa: F401

logger = logging.getLogger(__name__)


class BlurDemoStorage:
    """Uploads blurred outputs to Supabase Storage. Callers should
    treat MissingConfig as a 503 signal (endpoint disabled)."""

    class MissingConfig(RuntimeError):
        pass

    def __init__(self) -> None:
        if not demo_settings.supabase_url or not demo_settings.supabase_service_key:
            raise BlurDemoStorage.MissingConfig(
                "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set — "
                "blur-demo upload sink is disabled."
            )
        # Deferred import so requirement stays optional at project
        # level. If the package is missing, we surface a clear message
        # rather than a bare ImportError at request time.
        try:
            from supabase import create_client  # type: ignore
        except Exception as exc:  # pragma: no cover — install-time issue
            raise BlurDemoStorage.MissingConfig(
                f"The `supabase` Python package is not installed ({exc})."
            ) from exc
        self._client = create_client(
            demo_settings.supabase_url,
            demo_settings.supabase_service_key,
        )
        self._bucket = demo_settings.bucket

    def upload_and_sign(self, local_path: str, filename_hint: str = "blurred.mp4") -> tuple[str, str]:
        """Upload `local_path` and return (storage_key, signed_url).

        Uses a UUID-prefixed key so successive uploads never collide
        and the returned signed URL is unguessable even before the
        expiry check — a Supabase private bucket returns 400 on any
        object request without a matching signature, but belt-and-
        braces the key namespace anyway.
        """
        ext = ""
        if "." in filename_hint:
            ext = "." + filename_hint.rsplit(".", 1)[-1].lower()
        key = f"outputs/{uuid.uuid4().hex}{ext or '.mp4'}"

        content_type = mimetypes.guess_type(filename_hint)[0] or "video/mp4"
        with open(local_path, "rb") as fh:
            payload = fh.read()
        try:
            # supabase-py v2: .upload(path, file, file_options)
            self._client.storage.from_(self._bucket).upload(
                key, payload,
                {"content-type": content_type, "upsert": "false"},
            )
        except Exception as exc:  # pragma: no cover — network/bucket issue
            logger.exception("Supabase upload failed for %s", key)
            raise RuntimeError(f"Upload to Supabase failed: {exc}") from exc

        signed = self._client.storage.from_(self._bucket).create_signed_url(
            key, demo_settings.signed_url_seconds,
        )
        # supabase-py returns {'signedURL': ...} in v2 (older betas
        # used 'signedUrl'). Cover both.
        url = signed.get("signedURL") or signed.get("signedUrl") or signed.get("signed_url")
        if not url:
            raise RuntimeError(f"Supabase did not return a signed URL: {signed!r}")
        return key, url
