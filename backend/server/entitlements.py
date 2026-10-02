"""RevenueCat entitlement endpoints for the Wisdom mobile app."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Annotated, Any

import httpx
from fastapi import APIRouter, Depends, Header, HTTPException, Request

from common.auth import AuthenticatedUser, require_user
from common.config import settings
from common.supabase_client import get_supabase

router = APIRouter(tags=["mobile-entitlements"])
User = Annotated[AuthenticatedUser, Depends(require_user)]


def _active_entitlement(payload: dict[str, Any]) -> dict[str, Any] | None:
    entitlements = ((payload.get("subscriber") or {}).get("entitlements") or {}).values()
    now = datetime.now(timezone.utc)
    for entitlement in entitlements:
        expiry = entitlement.get("expires_date")
        if not expiry or datetime.fromisoformat(str(expiry).replace("Z", "+00:00")) > now:
            return entitlement
    return None


@router.post("/app/entitlements/sync")
async def sync_entitlement(user: User):
    if not settings.revenuecat_secret_api_key:
        raise HTTPException(status_code=503, detail="Subscription sync is not configured.")
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(
            f"https://api.revenuecat.com/v1/subscribers/{user.id}",
            headers={"Authorization": f"Bearer {settings.revenuecat_secret_api_key}"},
        )
    if response.is_error:
        raise HTTPException(status_code=502, detail="Subscription status could not be refreshed.")
    active = _active_entitlement(response.json())
    get_supabase().table("user_entitlements").upsert({
        "user_id": user.id,
        "is_pro": bool(active),
        "product_id": (active or {}).get("product_identifier"),
        "expires_at": (active or {}).get("expires_date"),
        "source": "revenuecat_api",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }, on_conflict="user_id").execute()
    return {"isPro": bool(active), "expiresAt": (active or {}).get("expires_date")}


@router.post("/webhooks/revenuecat")
async def revenuecat_webhook(
    request: Request,
    authorization: Annotated[str | None, Header()] = None,
):
    expected = settings.revenuecat_webhook_authorization
    if not expected or authorization != expected:
        raise HTTPException(status_code=401, detail="Invalid webhook authorization.")
    body = await request.json()
    event = body.get("event") or {}
    app_user_id = event.get("app_user_id")
    event_type = event.get("type")
    if not app_user_id or not event_type:
        raise HTTPException(status_code=400, detail="RevenueCat event is incomplete.")
    expiration_ms = event.get("expiration_at_ms")
    active_until = datetime.fromtimestamp(expiration_ms / 1000, timezone.utc) if expiration_ms else None
    still_active = event_type != "EXPIRATION" and (not active_until or active_until > datetime.now(timezone.utc))
    get_supabase().table("user_entitlements").upsert({
        "user_id": app_user_id,
        "is_pro": still_active,
        "product_id": event.get("product_id"),
        "expires_at": active_until.isoformat() if active_until else None,
        "source": "revenuecat_webhook",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }, on_conflict="user_id").execute()
    return {"received": True}
