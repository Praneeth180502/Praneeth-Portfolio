"""
Text chunking utilities used by the ingestion pipeline.

Wraps `langchain_text_splitters.RecursiveCharacterTextSplitter` (a small,
standalone package — not the full `langchain` framework) configured per
the app's settings (chunk_size=700, chunk_overlap=100 by default).
"""
import hashlib
import re
from dataclasses import dataclass, field

from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import get_settings

settings = get_settings()


@dataclass
class Chunk:
    """A single indexable unit of text plus its provenance metadata."""

    id: str
    text: str
    source: str
    section: str | None = None
    metadata: dict = field(default_factory=dict)


def _extract_markdown_section(text: str, char_offset: int, full_doc: str) -> str | None:
    """
    Best-effort: find the nearest preceding markdown heading (# / ##) before
    `char_offset` in `full_doc`, so chunks can cite a section, not just a file.
    """
    preceding = full_doc[:char_offset]
    headings = re.findall(r"^#{1,3}\s+(.*)$", preceding, flags=re.MULTILINE)
    return headings[-1].strip() if headings else None


def split_document(text: str, source: str) -> list[Chunk]:
    """
    Split a raw document's text into overlapping chunks using
    RecursiveCharacterTextSplitter, attaching source + best-effort section
    metadata to each chunk for later citation.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " ", ""],
        length_function=len,
    )

    raw_chunks = splitter.split_text(text)

    chunks: list[Chunk] = []
    cursor = 0
    for i, chunk_text in enumerate(raw_chunks):
        # Locate approximate offset of this chunk in the original doc to
        # infer its nearest heading (purely cosmetic metadata, not exact).
        offset = text.find(chunk_text[:50], cursor) if chunk_text else cursor
        offset = max(offset, 0)
        section = _extract_markdown_section(text, offset, text)
        cursor = offset

        chunk_id = hashlib.sha256(f"{source}:{i}:{chunk_text[:80]}".encode()).hexdigest()[:16]
        chunks.append(
            Chunk(
                id=chunk_id,
                text=chunk_text.strip(),
                source=source,
                section=section,
                metadata={"chunk_index": i, "source": source, "section": section or ""},
            )
        )
    return [c for c in chunks if c.text]
