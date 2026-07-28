"""
LLM client for Groq (llama-3.3-70b-versatile).

Groq exposes an OpenAI-compatible Chat Completions API, so we use the
official `openai` async SDK pointed at Groq's base URL — this keeps the
integration simple and swappable (pointing at a different OpenAI-compatible
provider later is a one-line config change).
"""
from typing import AsyncIterator

from openai import AsyncOpenAI, APIError, APITimeoutError

from app.core.config import Settings
from app.core.exceptions import LLMProviderError
from app.core.logging import get_logger

logger = get_logger(__name__)


class LLMClient:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.client = AsyncOpenAI(
            api_key=settings.GROQ_API_KEY,
            base_url=settings.GROQ_API_BASE,
            timeout=settings.LLM_REQUEST_TIMEOUT,
        )

    async def stream_completion(self, messages: list[dict]) -> AsyncIterator[str]:
        """Yield response text deltas as they arrive from the Groq API."""
        try:
            stream = await self.client.chat.completions.create(
                model=self.settings.GROQ_MODEL,
                messages=messages,
                temperature=self.settings.LLM_TEMPERATURE,
                max_tokens=self.settings.LLM_MAX_TOKENS,
                stream=True,
            )
            async for event in stream:
                if not event.choices:
                    continue
                delta = event.choices[0].delta
                if delta and delta.content:
                    yield delta.content
        except APITimeoutError as exc:
            logger.error(f"Groq request timed out: {exc}")
            raise LLMProviderError("The AI assistant took too long to respond. Please try again.")
        except APIError as exc:
            logger.error(f"Groq API error: {exc}")
            raise LLMProviderError("The AI assistant is temporarily unavailable. Please try again.")

    async def complete(self, messages: list[dict]) -> str:
        """Non-streaming convenience method (used e.g. by ingestion sanity checks)."""
        try:
            response = await self.client.chat.completions.create(
                model=self.settings.GROQ_MODEL,
                messages=messages,
                temperature=self.settings.LLM_TEMPERATURE,
                max_tokens=self.settings.LLM_MAX_TOKENS,
                stream=False,
            )
            return response.choices[0].message.content or ""
        except APIError as exc:
            logger.error(f"Groq API error: {exc}")
            raise LLMProviderError("The AI assistant is temporarily unavailable. Please try again.")
