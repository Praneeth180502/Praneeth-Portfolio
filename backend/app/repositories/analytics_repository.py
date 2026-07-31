"""Data-access layer for analytics events, including aggregate queries."""
from datetime import datetime, timedelta, timezone

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.analytics import AnalyticsEvent
from app.repositories.base import BaseRepository


class AnalyticsRepository(BaseRepository[AnalyticsEvent]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, AnalyticsEvent)

    async def count_total(self, since: datetime) -> int:
        stmt = select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.created_at >= since)
        return (await self.session.execute(stmt)).scalar_one()

    async def get_total_visitor_count(self) -> int:
        stmt = select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "page_view")
        count = (await self.session.execute(stmt)).scalar_one()
        return max(count, 1)

    async def count_unique_sessions(self, since: datetime) -> int:
        stmt = select(func.count(func.distinct(AnalyticsEvent.session_id))).where(
            AnalyticsEvent.created_at >= since, AnalyticsEvent.session_id.is_not(None)
        )
        return (await self.session.execute(stmt)).scalar_one()

    async def count_by_event_type(self, since: datetime) -> list[tuple[str, int]]:
        stmt = (
            select(AnalyticsEvent.event_type, func.count(AnalyticsEvent.id))
            .where(AnalyticsEvent.created_at >= since)
            .group_by(AnalyticsEvent.event_type)
            .order_by(func.count(AnalyticsEvent.id).desc())
        )
        result = await self.session.execute(stmt)
        return list(result.all())

    async def daily_page_views(self, since: datetime) -> list[tuple[str, int]]:
        day_bucket = func.to_char(AnalyticsEvent.created_at, "YYYY-MM-DD")
        stmt = (
            select(day_bucket.label("day"), func.count(AnalyticsEvent.id))
            .where(AnalyticsEvent.created_at >= since, AnalyticsEvent.event_type == "page_view")
            .group_by(day_bucket)
            .order_by(day_bucket)
        )
        result = await self.session.execute(stmt)
        return list(result.all())

    async def top_paths(self, since: datetime, limit: int = 10) -> list[tuple[str, int]]:
        stmt = (
            select(AnalyticsEvent.path, func.count(AnalyticsEvent.id))
            .where(
                AnalyticsEvent.created_at >= since,
                AnalyticsEvent.event_type == "page_view",
                AnalyticsEvent.path.is_not(None),
            )
            .group_by(AnalyticsEvent.path)
            .order_by(func.count(AnalyticsEvent.id).desc())
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.all())

    @staticmethod
    def since_days_ago(days: int) -> datetime:
        return datetime.now(timezone.utc) - timedelta(days=days)
