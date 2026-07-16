"""
Interaction Schemas (Placeholder)
---------------------------------
Pydantic schemas for request/response validation
of HCP Interaction data.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class InteractionBase(BaseModel):
    """Base schema with shared fields for Interaction."""

    hcp_name: str = Field(..., min_length=1, max_length=255, description="Name of the HCP")
    hospital_clinic_name: Optional[str] = Field(None, max_length=255, description="Hospital or clinic name")
    hcp_specialty: Optional[str] = Field(None, max_length=100, description="HCP's medical specialty")
    interaction_type: Optional[str] = Field(None, description="Type of interaction")
    date: Optional[datetime] = Field(None, description="Date of interaction")
    time: Optional[str] = Field(None, description="Time of interaction")
    interaction_duration: Optional[float] = Field(None, ge=0, description="Duration in minutes")
    meeting_mode: Optional[str] = Field(None, description="Mode of meeting")
    location: Optional[str] = Field(None, max_length=255, description="Meeting location")
    attendees: Optional[str] = Field(None, description="List of attendees (JSON)")
    topics_discussed: Optional[str] = Field(None, description="Topics discussed during interaction")
    materials_shared: Optional[str] = Field(None, description="Materials shared with HCP")
    samples_distributed: Optional[str] = Field(None, description="Product samples distributed")
    product_discussed: Optional[str] = Field(None, max_length=255, description="Product discussed")
    hcp_sentiment: Optional[str] = Field(None, description="HCP's sentiment assessment")
    priority: Optional[str] = Field(None, description="Interaction priority level")
    outcomes: Optional[str] = Field(None, description="Interaction outcomes")
    follow_up_actions: Optional[str] = Field(None, description="Required follow-up actions")
    next_follow_up_date: Optional[datetime] = Field(None, description="Next follow-up date")


class InteractionCreate(InteractionBase):
    """Schema for creating a new interaction."""
    pass


class InteractionUpdate(BaseModel):
    """Schema for updating an existing interaction. All fields optional."""

    hcp_name: Optional[str] = Field(None, min_length=1, max_length=255)
    hospital_clinic_name: Optional[str] = None
    hcp_specialty: Optional[str] = None
    interaction_type: Optional[str] = None
    date: Optional[datetime] = None
    time: Optional[str] = None
    interaction_duration: Optional[float] = None
    meeting_mode: Optional[str] = None
    location: Optional[str] = None
    attendees: Optional[str] = None
    topics_discussed: Optional[str] = None
    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None
    product_discussed: Optional[str] = None
    hcp_sentiment: Optional[str] = None
    priority: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    next_follow_up_date: Optional[datetime] = None


class InteractionResponse(InteractionBase):
    """Schema for interaction response with database fields."""

    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class InteractionListResponse(BaseModel):
    """Schema for paginated interaction list response."""

    items: list[InteractionResponse] = []
    total: int = 0
    page: int = 1
    per_page: int = 20
