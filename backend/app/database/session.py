"""
Database Session Configuration
------------------------------
SQLAlchemy engine and session factory setup for PostgreSQL.
Provides dependency injection for FastAPI routes.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings


# SQLAlchemy engine - connects to PostgreSQL
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before use
    pool_size=10,         # Connection pool size
    max_overflow=20,      # Max overflow connections
    echo=settings.DEBUG,  # Log SQL in debug mode
)

# Session factory for creating database sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db():
    """
    Dependency that provides a database session per request.
    Ensures proper cleanup after each request.

    Usage in FastAPI:
        @router.get("/items")
        def get_items(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
