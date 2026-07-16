"""
Interaction Model (Placeholder)
--------------------------------
SQLAlchemy ORM model for HCP Interactions.
Represents a single logged interaction between a sales rep and an HCP.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Enum
from sqlalchemy.sql import func
import enum

from app.database.base import Base


class InteractionType(str, enum.Enum):
    """Enum for interaction types."""
    IN_PERSON = "in_person"
    VIRTUAL = "virtual"
    PHONE = "phone"
    EMAIL = "email"
    CONFERENCE = "conference"


class MeetingMode(str, enum.Enum):
    """Enum for meeting modes."""
    OFFICE = "office"
    HOSPITAL = "hospital"
    VIRTUAL = "virtual"
    CONFERENCE = "conference"
    DINNER = "dinner"
    OTHER = "other"


class SentimentType(str, enum.Enum):
    """Enum for HCP sentiment."""
    VERY_POSITIVE = "very_positive"
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"
    VERY_NEGATIVE = "very_negative"


class PriorityLevel(str, enum.Enum):
    """Enum for interaction priority."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class Interaction(Base):
    """
    Interaction model placeholder.
    Represents a logged HCP interaction in the CRM system.

    TODO: Implement full model with relationships and constraints.
    """

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)

    # HCP Information
    hcp_name = Column(String(255), nullable=False, index=True)
    hospital_clinic_name = Column(String(255), nullable=True)
    hcp_specialty = Column(String(100), nullable=True)

    # Interaction Details
    interaction_type = Column(String(50), nullable=True)
    date = Column(DateTime, nullable=True)
    time = Column(String(10), nullable=True)
    interaction_duration = Column(Float, nullable=True)  # Duration in minutes
    meeting_mode = Column(String(50), nullable=True)
    location = Column(String(255), nullable=True)

    # Content
    attendees = Column(Text, nullable=True)  # JSON string of attendees
    topics_discussed = Column(Text, nullable=True)
    materials_shared = Column(Text, nullable=True)
    samples_distributed = Column(Text, nullable=True)
    product_discussed = Column(String(255), nullable=True)

    # Assessment
    hcp_sentiment = Column(String(50), nullable=True)
    priority = Column(String(20), nullable=True)
    outcomes = Column(Text, nullable=True)

    # Follow-up
    follow_up_actions = Column(Text, nullable=True)
    next_follow_up_date = Column(DateTime, nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Interaction(id={self.id}, hcp_name='{self.hcp_name}')>"
