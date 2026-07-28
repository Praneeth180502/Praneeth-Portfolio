"""Business logic for tracking and summarizing analytics events."""
from app.core.logging import get_logger
from app.models.analytics import AnalyticsEvent
from app.repositories.analytics_repository import AnalyticsRepository
from app.schemas.analytics import (
    AnalyticsEventCreate,
    AnalyticsSummaryResponse,
    DailyCount,
    EventTypeCount,
)

logger = get_logger(__name__)


class AnalyticsService:
    def __init__(self, repository: AnalyticsRepository):
        self.repository = repository

    async def track_event(
        self, payload: AnalyticsEventCreate, ip_address: str | None, user_agent: str | None
    ) -> AnalyticsEvent:
        event = AnalyticsEvent(
            event_type=payload.event_type,
            path=payload.path,
            referrer=payload.referrer,
            session_id=payload.session_id,
            ip_address=ip_address,
            user_agent=user_agent,
            metadata_json=payload.metadata,
        )
        return await self.repository.add(event)

    async def get_summary(self, range_days: int = 30) -> AnalyticsSummaryResponse:
        since = self.repository.since_days_ago(range_days)

        total = await self.repository.count_total(since)
        unique_sessions = await self.repository.count_unique_sessions(since)
        by_type = await self.repository.count_by_event_type(since)
        daily_views = await self.repository.daily_page_views(since)
        top_paths = await self.repository.top_paths(since)

        return AnalyticsSummaryResponse(
            total_events=total,
            unique_sessions=unique_sessions,
            by_event_type=[EventTypeCount(event_type=t, count=c) for t, c in by_type],
            daily_page_views=[DailyCount(date=d, count=c) for d, c in daily_views],
            top_paths=[{"path": p, "count": c} for p, c in top_paths],
            range_days=range_days,
        )
