"""
Application Settings
--------------------
Centralized configuration using pydantic-settings.
Loads environment variables from .env file.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    APP_NAME: str = "AI-First CRM"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/crm_hcp"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # AI Configuration (placeholders)
    GROQ_API_KEY: Optional[str] = None
    AI_MODEL_DEFAULT: str = "gemma2-9b-it"
    AI_MODEL_FALLBACK: str = "llama-3.3-70b-versatile"

    # Pydantic Settings v2 Configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",  # Ignore extra env vars if any
    )


# Singleton settings instance
settings = Settings()
