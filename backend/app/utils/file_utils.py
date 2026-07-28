"""Small filesystem helpers used across services."""
from pathlib import Path

SUPPORTED_EXTENSIONS = {".md", ".txt"}


def iter_knowledge_files(knowledge_dir: Path) -> list[Path]:
    """Return all supported knowledge documents under `knowledge_dir`, sorted."""
    if not knowledge_dir.exists():
        return []
    files = [
        p for p in knowledge_dir.rglob("*")
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXTENSIONS
    ]
    return sorted(files)


def read_text_file(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")
