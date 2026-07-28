"""
Short-term conversation memory.

Persists chat turns to Postgres (via ChatRepository) so history survives
restarts, and exposes a helper to fetch the last N turns formatted for the
prompt builder. Session identity is the client-generated `session_id` from
the frontend (e.g. stored in localStorage/sessionStorage).
"""
from app.core.config import get_settings
from app.repositories.chat_repository import ChatRepository
from app.schemas.chat import ChatHistoryTurn

settings = get_settings()


class ConversationMemory:
    def __init__(self, repository: ChatRepository):
        self.repository = repository
        self._in_memory_store: dict[str, list[ChatHistoryTurn]] = {}

    async def get_history(self, session_id: str) -> list[ChatHistoryTurn]:
        """Fetch the last N turns for this session, with fallback to in-memory store."""
        try:
            messages = await self.repository.get_recent_turns(
                session_id, max_turns=settings.CONVERSATION_HISTORY_TURNS
            )
            return [ChatHistoryTurn(role=m.role, content=m.content) for m in messages]
        except Exception:
            # Database unreachable or invalid credentials — fallback to in-memory
            history = self._in_memory_store.get(session_id, [])
            return history[-settings.CONVERSATION_HISTORY_TURNS:]

    async def append_turn(
        self, session_id: str, ip_address: str | None, role: str, content: str,
        sources: list[dict] | None = None, latency_ms: int | None = None,
    ) -> None:
        if session_id not in self._in_memory_store:
            self._in_memory_store[session_id] = []
        self._in_memory_store[session_id].append(ChatHistoryTurn(role=role, content=content))

        try:
            chat_session = await self.repository.get_or_create_session(session_id, ip_address)
            await self.repository.add_message(
                session_id=chat_session.id,
                role=role,
                content=content,
                sources=sources,
                latency_ms=latency_ms,
            )
        except Exception:
            # Ignore DB write error when DB is unavailable or auth fails
            pass
