"""Router: GET /api/projects — serves portfolio project listings."""
from typing import Annotated

from fastapi import APIRouter, Depends, Query

from app.schemas.project import Project, ProjectListResponse
from app.services.project_service import ProjectService, get_project_service

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=ProjectListResponse, summary="List portfolio projects")
async def list_projects(
    service: Annotated[ProjectService, Depends(get_project_service)],
    category: str | None = Query(default=None, description="Filter by category"),
    featured_only: bool = Query(default=False, description="Only return featured projects"),
) -> ProjectListResponse:
    items = service.list_projects(category=category, featured_only=featured_only)
    return ProjectListResponse(total=len(items), items=items)


@router.get("/{slug}", response_model=Project, summary="Get a single project by slug")
async def get_project(
    slug: str,
    service: Annotated[ProjectService, Depends(get_project_service)],
) -> Project:
    return service.get_project(slug)
