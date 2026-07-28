"""Router: POST /api/chat — RAG chatbot with Server-Sent Events streaming."""
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.api.deps import get_chat_service, get_client_ip
from app.core.config import get_settings
from app.core.rate_limit import check_rate_limit
from app.schemas.chat import ChatRequest
from app.services.rag.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["Chat"])
settings = get_settings()


@router.post(
    "",
    summary="Ask the RAG-powered portfolio chatbot a question (streamed via SSE)",
    response_description="text/event-stream of token/sources/done events",
)
async def chat(
    payload: ChatRequest,
    service: Annotated[ChatService, Depends(get_chat_service)],
    client_ip: Annotated[str | None, Depends(get_client_ip)],
) -> StreamingResponse:
    # Prevent abuse of the (comparatively expensive) LLM + embedding pipeline.
    check_rate_limit(
        key=f"chat:{client_ip or 'unknown'}",
        max_requests=settings.CHAT_RATE_LIMIT_PER_MINUTE,
        window_seconds=60,
    )

    generator = service.stream_answer(
        session_id=payload.session_id, message=payload.message, ip_address=client_ip
    )

    return StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            # Prevent buffering by proxies (nginx) so tokens stream immediately.
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
