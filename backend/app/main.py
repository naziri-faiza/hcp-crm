"""
AI-First CRM - FastAPI Application
-----------------------------------
Main entry point for the backend API server.
Configures CORS, routes, database table creation,
and application lifecycle events.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api import interactions_router, chat_router
from app.database.base import Base
from app.database.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    - On startup: create database tables if they don't exist.
    - On shutdown: dispose engine connections.
    """
    # Startup — create all tables from registered models
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown — clean up engine connections
    engine.dispose()


def create_app() -> FastAPI:
    """
    Application factory for the FastAPI app.
    Creates and configures the app instance with lifespan events.
    """
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="AI-First CRM - HCP Interaction Logging Module",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # Configure CORS for frontend communication
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register API routers
    app.include_router(interactions_router, prefix="/api/v1")
    app.include_router(chat_router, prefix="/api/v1")

    # Health check endpoint
    @app.get("/health", tags=["health"])
    async def health_check():
        """Health check endpoint for monitoring."""
        return {
            "status": "healthy",
            "app": settings.APP_NAME,
            "version": settings.APP_VERSION,
        }

    return app


# Create the application instance
app = create_app()
