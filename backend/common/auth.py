"""Authentication helpers shared by the mobile-only API routes."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Annotated

from fastapi import Header, HTTPException

from common.supabase_client import get_supabase


@dataclass(frozen=True)
class AuthenticatedUser:
    id: str
    email: str | None = None


def require_user(
    authorization: Annotated[str | None, Header()] = None,
) -> AuthenticatedUser:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Please sign in again.")
    token = authorization.removeprefix("Bearer ").strip()
    try:
        result = get_supabase().auth.get_user(token)
        user = result.user
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Please sign in again.") from exc
    if not user:
        raise HTTPException(status_code=401, detail="Please sign in again.")
    return AuthenticatedUser(id=str(user.id), email=getattr(user, "email", None))
