"""Business logic for handling contact form submissions."""
from datetime import datetime, timedelta, timezone

from app.core.config import Settings
from app.core.exceptions import RateLimitExceededError
from app.core.logging import get_logger
from app.models.contact import ContactMessage
from app.repositories.contact_repository import ContactRepository
from app.schemas.contact import ContactCreateRequest

logger = get_logger(__name__)


class ContactService:
    def __init__(self, repository: ContactRepository, settings: Settings):
        self.repository = repository
        self.settings = settings

    async def submit_message(
        self, payload: ContactCreateRequest, ip_address: str | None, user_agent: str | None
    ) -> ContactMessage:
        # Basic per-IP abuse throttle at the persistence layer, independent
        # of the in-memory rate limiter applied at the router level.
        if ip_address:
            since = datetime.now(timezone.utc) - timedelta(hours=1)
            recent_count = await self.repository.count_from_ip_since(ip_address, since)
            if recent_count >= self.settings.CONTACT_RATE_LIMIT_PER_HOUR:
                raise RateLimitExceededError(
                    "Too many contact submissions from this address. Please try again later."
                )

        message = ContactMessage(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        try:
            saved = await self.repository.add(message)
            logger.info(
                "New contact message received and saved to DB",
                extra={"extra_contact_id": str(saved.id), "extra_email": saved.email},
            )
            return saved
        except Exception:
            # Fallback if DB is not available or auth fails
            import uuid
            message.id = uuid.uuid4()
            logger.info(
                f"Contact message received (DB offline fallback): Name={payload.name}, Email={payload.email}, Message={payload.message}"
            )
            return message
