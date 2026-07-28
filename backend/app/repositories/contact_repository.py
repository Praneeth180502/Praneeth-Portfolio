"""Data-access layer for contact messages."""
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contact import ContactMessage
from app.repositories.base import BaseRepository


class ContactRepository(BaseRepository[ContactMessage]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, ContactMessage)

    async def list_recent(self, limit: int = 50, offset: int = 0) -> list[ContactMessage]:
        stmt = (
            select(ContactMessage)
            .order_by(desc(ContactMessage.created_at))
            .offset(offset)
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def count_from_ip_since(self, ip_address: str, since) -> int:
        """Used for basic abuse/spam throttling at the DB level."""
        stmt = select(ContactMessage).where(
            ContactMessage.ip_address == ip_address,
            ContactMessage.created_at >= since,
        )
        result = await self.session.execute(stmt)
        return len(result.scalars().all())
