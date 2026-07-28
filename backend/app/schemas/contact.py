"""Pydantic schemas for the /api/contact endpoint."""
import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ContactCreateRequest(BaseModel):
    """Payload submitted by the frontend contact form."""

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    # Honeypot field: real users never fill this in; bots often do.
    website: str | None = Field(default=None, max_length=200)

    @field_validator("name", "subject", "message")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Field cannot be empty or whitespace only.")
        return v

    @field_validator("website")
    @classmethod
    def honeypot_must_be_empty(cls, v: str | None) -> str | None:
        if v:
            raise ValueError("Spam detected.")
        return v


class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime


class ContactCreatedResponse(BaseModel):
    """Lightweight ack returned to the caller (avoids echoing PII back)."""

    id: uuid.UUID
    status: str = "received"
    message: str = "Thanks for reaching out! I'll get back to you soon."
