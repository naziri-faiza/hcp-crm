"""
SQLAlchemy Declarative Base
---------------------------
All models inherit from this Base class.
Models are imported here to ensure they are registered
with the metadata before Alembic migrations or auto-creation.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models."""
    pass


# Import all models here for Alembic auto-discovery and metadata registration
from app.models.interaction import Interaction  # noqa: E402, F401
