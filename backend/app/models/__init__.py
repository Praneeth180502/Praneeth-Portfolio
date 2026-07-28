"""SQLAlchemy ORM models. Import all models here so Alembic autogenerate
can discover them via Base.metadata."""
from app.models.contact import ContactMessage  # noqa: F401
from app.models.analytics import AnalyticsEvent  # noqa: F401
from app.models.chat import ChatSession, ChatMessage  # noqa: F401
