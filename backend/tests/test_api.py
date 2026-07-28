"""
Basic API tests. These focus on non-ML endpoints (health, projects, contact
validation) since embedding/reranker models are heavy to load in CI without
GPU/caching; the RAG pipeline is better covered with integration tests that
pre-warm models (see README "Testing" section).
"""
import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_health_check():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_list_projects():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/projects")
    assert response.status_code == 200
    body = response.json()
    assert "items" in body
    assert isinstance(body["items"], list)


@pytest.mark.asyncio
async def test_contact_validation_rejects_short_message():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/contact",
            json={
                "name": "Jo",
                "email": "not-an-email",
                "subject": "Hi",
                "message": "short",
            },
        )
    assert response.status_code == 422
