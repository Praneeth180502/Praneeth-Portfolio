"""Aggregates all v1 routers under a single APIRouter mounted at API_V1_PREFIX."""
from fastapi import APIRouter

from app.api.v1 import analytics, chat, contact, health, projects, resume

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(contact.router)
api_router.include_router(projects.router)
api_router.include_router(resume.router)
api_router.include_router(analytics.router)
api_router.include_router(chat.router)
