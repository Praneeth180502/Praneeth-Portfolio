"""Data-access layer for chat sessions/messages (RAG conversation persistence)."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.chat import ChatMessage, ChatSession
from app.repositories.base import BaseRepository


class ChatRepository(BaseRepository[ChatSession]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, ChatSession)

    async def get_or_create_session(self, session_key: str, ip_address: str | None) -> ChatSession:
        stmt = select(ChatSession).where(ChatSession.session_key == session_key)
        result = await self.session.execute(stmt)
        chat_session = result.scalar_one_or_none()
        if chat_session:
            return chat_session

        chat_session = ChatSession(session_key=session_key, ip_address=ip_address)
        self.session.add(chat_session)
        await self.session.commit()
        await self.session.refresh(chat_session)
        return chat_session

    async def get_recent_turns(self, session_key: str, max_turns: int) -> list[ChatMessage]:
        """Return the last `max_turns` messages (user+assistant combined) for context."""
        stmt = (
            select(ChatSession)
            .where(ChatSession.session_key == session_key)
            .options(selectinload(ChatSession.messages))
        )
        result = await self.session.execute(stmt)
        chat_session = result.scalar_one_or_none()
        if not chat_session:
            return []
        return chat_session.messages[-max_turns:]

    async def add_message(
        self,
        session_id,
        role: str,
        content: str,
        sources: list | None = None,
        latency_ms: int | None = None,
    ) -> ChatMessage:
        message = ChatMessage(
            session_id=session_id, role=role, content=content, sources=sources, latency_ms=latency_ms
        )
        self.session.add(message)
        await self.session.commit()
        await self.session.refresh(message)
        return message
