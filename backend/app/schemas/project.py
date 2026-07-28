"""Pydantic schemas for the /api/projects endpoint.

Projects are treated as (mostly) static portfolio content. They're modeled
here rather than in the DB so they can live in version control alongside
the code and be edited without a migration. Swapping to a DB-backed
CRUD-able table later only requires changing ProjectService's data source.
"""
from pydantic import BaseModel, Field, HttpUrl


class ProjectLink(BaseModel):
    label: str
    url: HttpUrl


class Project(BaseModel):
    slug: str = Field(..., description="URL-friendly unique identifier")
    title: str
    tagline: str
    description: str
    tech_stack: list[str] = Field(default_factory=list)
    category: str = Field(default="general")
    featured: bool = False
    thumbnail_url: str | None = None
    links: list[ProjectLink] = Field(default_factory=list)
    year: int | None = None


class ProjectListResponse(BaseModel):
    total: int
    items: list[Project]
