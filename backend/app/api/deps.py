"""
Centralized FastAPI dependency providers.

Keeps route handlers thin: they declare `Depends(get_x_service)` and get a
fully-wired service instance, with repositories/DB sessions injected
underneath. Singletons (embedding model, vector store, reranker, etc.) are
cached at module scope so heavy ML models load exactly once per process.
"""
from functools import lru_cache
from typing import Annotated

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings, get_settings
from app.core.database import get_db
from app.repositories.analytics_repository import AnalyticsRepository
from app.repositories.chat_repository import ChatRepository
from app.repositories.contact_repository import ContactRepository
from app.services.analytics_service import AnalyticsService
from app.services.contact_service import ContactService
from app.services.rag.chat_service import ChatService
from app.services.rag.embeddings import get_embedding_model
from app.services.rag.hybrid_retriever import HybridRetriever
from app.services.rag.llm_client import LLMClient
from app.services.rag.memory import ConversationMemory
from app.services.rag.reranker import get_reranker
from app.services.rag.sparse_retriever import get_sparse_retriever
from app.services.rag.vector_store import get_vector_store
from app.services.resume_service import ResumeService

SettingsDep = Annotated[Settings, Depends(get_settings)]
DBSessionDep = Annotated[AsyncSession, Depends(get_db)]


def get_client_ip(request: Request) -> str | None:
    """Extract client IP, respecting X-Forwarded-For when behind a proxy/load balancer."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else None


def get_user_agent(request: Request) -> str | None:
    return request.headers.get("User-Agent")


# --------------------------------------------------------------- Contact
def get_contact_service(db: DBSessionDep, settings: SettingsDep) -> ContactService:
    return ContactService(ContactRepository(db), settings)


# ------------------------------------------------------------- Analytics
def get_analytics_service(db: DBSessionDep) -> AnalyticsService:
    return AnalyticsService(AnalyticsRepository(db))


# ---------------------------------------------------------------- Resume
def get_resume_service(settings: SettingsDep) -> ResumeService:
    return ResumeService(settings)


# ------------------------------------------------------------------ RAG
# Heavy ML singletons (models, vector store, BM25 index) are cached via
# lru_cache in their own modules; here we just assemble them per-request.
def get_hybrid_retriever(settings: SettingsDep) -> HybridRetriever:
    return HybridRetriever(
        vector_store=get_vector_store(),
        sparse_retriever=get_sparse_retriever(),
        embedding_model=get_embedding_model(),
        dense_weight=settings.DENSE_WEIGHT,
        sparse_weight=settings.SPARSE_WEIGHT,
    )


@lru_cache
def get_llm_client(settings: SettingsDep) -> LLMClient:
    return LLMClient(settings)


def get_conversation_memory(db: DBSessionDep) -> ConversationMemory:
    return ConversationMemory(ChatRepository(db))


def get_chat_service(
    settings: SettingsDep,
    retriever: Annotated[HybridRetriever, Depends(get_hybrid_retriever)],
    llm_client: Annotated[LLMClient, Depends(get_llm_client)],
    memory: Annotated[ConversationMemory, Depends(get_conversation_memory)],
) -> ChatService:
    return ChatService(
        retriever=retriever,
        reranker=get_reranker(),
        llm_client=llm_client,
        memory=memory,
        settings=settings,
    )
