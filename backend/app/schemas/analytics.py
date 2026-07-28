"""Pydantic schemas for the /api/analytics endpoint."""
import uuid
from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field

EventType = Literal[
    "page_view",
    "project_click",
    "resume_download",
    "contact_submit",
    "chat_message",
    "external_link_click",
]


class AnalyticsEventCreate(BaseModel):
    """Payload the frontend sends to track an interaction event."""

    event_type: EventType
    path: str | None = Field(default=None, max_length=500)
    referrer: str | None = Field(default=None, max_length=500)
    session_id: str | None = Field(default=None, max_length=64)
    metadata: dict[str, Any] | None = None


class AnalyticsEventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    event_type: str
    created_at: datetime


class EventTypeCount(BaseModel):
    event_type: str
    count: int


class DailyCount(BaseModel):
    date: str
    count: int


class AnalyticsSummaryResponse(BaseModel):
    """Aggregate analytics for an admin dashboard view."""

    total_events: int
    unique_sessions: int
    by_event_type: list[EventTypeCount]
    daily_page_views: list[DailyCount]
    top_paths: list[dict[str, Any]]
    range_days: int
