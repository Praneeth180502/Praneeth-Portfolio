"""Router: POST /api/contact — receives portfolio contact form submissions."""
from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.deps import get_client_ip, get_contact_service, get_user_agent
from app.core.config import get_settings
from app.core.rate_limit import check_rate_limit
from app.schemas.contact import ContactCreatedResponse, ContactCreateRequest
from app.services.contact_service import ContactService

router = APIRouter(prefix="/contact", tags=["Contact"])
settings = get_settings()


@router.post(
    "",
    response_model=ContactCreatedResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit the portfolio contact form",
)
async def submit_contact_message(
    payload: ContactCreateRequest,
    service: Annotated[ContactService, Depends(get_contact_service)],
    client_ip: Annotated[str | None, Depends(get_client_ip)],
    user_agent: Annotated[str | None, Depends(get_user_agent)],
) -> ContactCreatedResponse:
    # Coarse in-memory rate limit (per IP) in addition to the DB-backed check
    # performed inside ContactService.
    check_rate_limit(
        key=f"contact:{client_ip or 'unknown'}",
        max_requests=settings.CONTACT_RATE_LIMIT_PER_HOUR,
        window_seconds=3600,
    )

    message = await service.submit_message(payload, client_ip, user_agent)
    return ContactCreatedResponse(id=message.id)
