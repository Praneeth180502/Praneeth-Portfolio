"""Pydantic schemas for the /api/chat RAG endpoint."""
from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Incoming chat request from the frontend widget."""

    session_id: str = Field(
        ..., min_length=8, max_length=64,
        description="Client-generated stable ID identifying the conversation.",
    )
    message: str = Field(..., min_length=1, max_length=2000)


class SourceCitation(BaseModel):
    """A single retrieved-and-cited knowledge chunk backing an answer."""

    source: str = Field(..., description="Origin file, e.g. resume.md")
    section: str | None = Field(default=None, description="Heading/section within the source")
    snippet: str = Field(..., description="Short excerpt of the cited chunk")
    relevance_score: float = Field(..., ge=0.0, le=1.0)


class ChatStreamEvent(BaseModel):
    """
    Shape of each Server-Sent Event payload emitted during streaming.
    `type` distinguishes token deltas from the final sources/done event.
    """

    type: Literal["token", "sources", "done", "error"]
    content: str | None = None
    sources: list[SourceCitation] | None = None
    error: str | None = None


class ChatHistoryTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatHistoryResponse(BaseModel):
    session_id: str
    turns: list[ChatHistoryTurn]
