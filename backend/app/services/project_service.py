"""Business logic for serving portfolio project data.

Projects are stored as a static JSON file under app/data/projects.json so
they can be version-controlled and edited without a DB migration. The file
is parsed once and cached in-process; call `refresh()` to force a reload
(e.g. from an admin endpoint in a future iteration).
"""
import json
from functools import lru_cache
from pathlib import Path

from app.core.exceptions import NotFoundError
from app.core.logging import get_logger
from app.schemas.project import Project

logger = get_logger(__name__)

PROJECTS_FILE = Path(__file__).resolve().parent.parent / "data" / "projects.json"


class ProjectService:
    def __init__(self):
        self._projects: list[Project] = self._load()

    def _load(self) -> list[Project]:
        if not PROJECTS_FILE.exists():
            logger.warning(f"Projects file not found at {PROJECTS_FILE}; returning empty list.")
            return []
        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            raw = json.load(f)
        return [Project.model_validate(item) for item in raw]

    def list_projects(self, category: str | None = None, featured_only: bool = False) -> list[Project]:
        items = self._projects
        if category:
            items = [p for p in items if p.category.lower() == category.lower()]
        if featured_only:
            items = [p for p in items if p.featured]
        return items

    def get_project(self, slug: str) -> Project:
        for p in self._projects:
            if p.slug == slug:
                return p
        raise NotFoundError(f"Project '{slug}' not found.")


@lru_cache
def get_project_service() -> ProjectService:
    return ProjectService()
