"""Router: /api/analytics — event tracking + summary dashboard endpoint."""
from typing import Annotated

from fastapi import APIRouter, Depends, Query, status

from app.api.deps import get_analytics_service, get_client_ip, get_user_agent
from app.schemas.analytics import (
    AnalyticsEventCreate,
    AnalyticsEventResponse,
    AnalyticsSummaryResponse,
)
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.post(
    "/events",
    response_model=AnalyticsEventResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Track a frontend analytics event",
)
async def track_event(
    payload: AnalyticsEventCreate,
    service: Annotated[AnalyticsService, Depends(get_analytics_service)],
    client_ip: Annotated[str | None, Depends(get_client_ip)],
    user_agent: Annotated[str | None, Depends(get_user_agent)],
) -> AnalyticsEventResponse:
    event = await service.track_event(payload, client_ip, user_agent)
    return AnalyticsEventResponse.model_validate(event)


@router.get(
    "/summary",
    response_model=AnalyticsSummaryResponse,
    summary="Aggregate analytics summary (for an admin dashboard)",
)
async def get_summary(
    service: Annotated[AnalyticsService, Depends(get_analytics_service)],
    range_days: int = Query(default=30, ge=1, le=365),
) -> AnalyticsSummaryResponse:
    # NOTE: In production, protect this endpoint with authentication
    # (see README "Future Expansion" section) before exposing it publicly.
    return await service.get_summary(range_days=range_days)


@router.get(
    "/visitor-count",
    summary="Get total site visitor count",
)
async def get_visitor_count(
    service: Annotated[AnalyticsService, Depends(get_analytics_service)],
) -> dict:
    count = await service.get_visitor_count()
    return {"count": count}

