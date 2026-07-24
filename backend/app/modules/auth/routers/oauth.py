"""
app/modules/auth/routers/oauth.py

Google OAuth 2.0 Authorization Code Flow.
Supports new account creation and linking to existing accounts by email.
"""

from __future__ import annotations

import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse, RedirectResponse

from app.core.config import get_settings
from app.core.logging import get_logger
from app.dependencies.auth import get_auth_service
from app.modules.auth.services.auth_service import AuthService
from app.modules.user.schemas.user import UserResponse
from app.modules.auth.schemas.auth import AuthResponse
from app.utils.response import success_response

logger = get_logger(__name__)

router = APIRouter()


GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


@router.get("/google/login", summary="Initiate Google OAuth login")
async def google_login():
    """Redirect user to Google's OAuth 2.0 authorization page."""
    settings = get_settings()
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth is not configured. Set GOOGLE_CLIENT_ID in environment."
        )

    params = {
        "response_type": "code",
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "select_account"
    }

    param_str = "&".join(f"{k}={v}" for k, v in params.items())
    return RedirectResponse(url=f"{GOOGLE_AUTH_URL}?{param_str}")


@router.get("/google/callback", summary="Google OAuth callback")
async def google_callback(
    code: str,
    auth: AuthService = Depends(get_auth_service),
):
    """Handle Google OAuth callback and issue JWT tokens."""
    from urllib.parse import urlencode

    settings = get_settings()
    frontend_url = settings.FRONTEND_URL

    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        return RedirectResponse(
            url=f"{frontend_url}/login?error=oauth_not_configured",
            status_code=status.HTTP_302_FOUND,
        )

    try:
        # Exchange code for tokens
        logger.info("Google OAuth: exchanging authorization code")
        async with httpx.AsyncClient() as client:
            token_response = await client.post(
                GOOGLE_TOKEN_URL,
                data={
                    "code": code,
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                    "grant_type": "authorization_code"
                }
            )

        if token_response.status_code != 200:
            logger.error(
                "Google token exchange failed | status=%d | response=%s",
                token_response.status_code,
                token_response.text,
            )
            return RedirectResponse(
                url=f"{frontend_url}/login?error=google_token_exchange_failed",
                status_code=status.HTTP_302_FOUND,
            )

        token_data = token_response.json()
        google_access_token = token_data.get("access_token")

        if not google_access_token:
            logger.error("Google returned no access_token in response")
            return RedirectResponse(
                url=f"{frontend_url}/login?error=no_google_token",
                status_code=status.HTTP_302_FOUND,
            )

        # Fetch user info from Google
        logger.info("Google OAuth: fetching user info")
        async with httpx.AsyncClient() as client:
            userinfo_response = await client.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {google_access_token}"}
            )

        if userinfo_response.status_code != 200:
            logger.error("Google userinfo fetch failed | status=%d", userinfo_response.status_code)
            return RedirectResponse(
                url=f"{frontend_url}/login?error=google_userinfo_failed",
                status_code=status.HTTP_302_FOUND,
            )

        google_user = userinfo_response.json()
        google_id = google_user.get("sub")
        email = google_user.get("email")
        given_name = google_user.get("given_name", "")
        family_name = google_user.get("family_name", "")
        picture = google_user.get("picture", "")
        email_verified = google_user.get("email_verified", False)

        if not email or not google_id:
            logger.error("Google did not provide email or sub")
            return RedirectResponse(
                url=f"{frontend_url}/login?error=google_no_email",
                status_code=status.HTTP_302_FOUND,
            )

        # Delegate to auth service for upsert + token generation
        logger.info("Google OAuth: creating/finding user for email=%s", email)
        user, tokens = await auth.login_or_register_with_google(
            google_id=google_id,
            email=email,
            first_name=given_name,
            last_name=family_name,
            profile_image=picture,
            email_verified=email_verified
        )

        logger.info(
            "Google OAuth success | user_id=%s | has_access=%s | has_refresh=%s",
            user.id,
            bool(tokens.access_token),
            bool(tokens.refresh_token),
        )

        # Redirect to frontend with tokens (properly URL-encoded)
        params = urlencode({
            "access_token": tokens.access_token,
            "refresh_token": tokens.refresh_token,
            "token_type": tokens.token_type,
        })
        redirect_url = f"{frontend_url}/auth/oauth-callback?{params}"
        return RedirectResponse(url=redirect_url, status_code=status.HTTP_302_FOUND)

    except Exception as exc:
        logger.exception("Google OAuth callback failed: %s", exc)
        return RedirectResponse(
            url=f"{frontend_url}/login?error=oauth_failed",
            status_code=status.HTTP_302_FOUND,
        )


@router.post("/google/token", summary="Exchange Google ID token directly (mobile)")
async def google_token_exchange(
    id_token: str,
    auth: AuthService = Depends(get_auth_service),
):
    """For mobile clients that already have a Google ID token."""
    # Verify ID token with Google
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Google ID token."
        )

    payload = response.json()
    settings = get_settings()

    # Validate audience
    if payload.get("aud") != settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID token audience mismatch."
        )

    user, tokens = await auth.login_or_register_with_google(
        google_id=payload.get("sub"),
        email=payload.get("email"),
        first_name=payload.get("given_name", ""),
        last_name=payload.get("family_name", ""),
        profile_image=payload.get("picture", ""),
        email_verified=payload.get("email_verified", False)
    )

    body = AuthResponse(user=UserResponse.model_validate(user), tokens=tokens)
    return success_response(data=body.model_dump(mode="json"), message="Google authentication successful.")
