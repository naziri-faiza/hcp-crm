"""
Interaction Service
-------------------
Business logic and CRUD operations for HCP Interactions.
Acts as an intermediary between API routes and the database layer.
"""

from sqlalchemy.orm import Session
from sqlalchemy import func as sql_func

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate, InteractionUpdate


class InteractionService:
    """
    Service class encapsulating all Interaction-related database operations.
    Each method is a static method that accepts a database session.
    """

    @staticmethod
    def create(db: Session, data: InteractionCreate) -> Interaction:
        """
        Create a new interaction record from validated schema data.
        Converts the Pydantic model to a dict and maps it to ORM columns.
        """
        # Convert Pydantic schema to dict, excluding unset optional fields
        data_dict = data.model_dump(exclude_unset=True)

        # Map camelCase schema fields to snake_case ORM columns
        interaction = Interaction(**data_dict)

        db.add(interaction)
        db.commit()
        db.refresh(interaction)
        return interaction

    @staticmethod
    def get_by_id(db: Session, interaction_id: int) -> Interaction | None:
        """
        Retrieve a single interaction by its primary key.
        Returns None if not found.
        """
        return db.query(Interaction).filter(Interaction.id == interaction_id).first()

    @staticmethod
    def get_all(
        db: Session,
        skip: int = 0,
        limit: int = 20,
        search: str | None = None,
    ) -> tuple[list[Interaction], int]:
        """
        Retrieve a paginated list of interactions.
        Optionally filters by HCP name search.

        Returns:
            tuple: (list of interactions, total count)
        """
        query = db.query(Interaction)

        # Optional search filter on HCP name
        if search:
            query = query.filter(
                Interaction.hcp_name.ilike(f"%{search}%")
            )

        # Get total count before pagination
        total = query.count()

        # Apply ordering and pagination
        interactions = (
            query
            .order_by(Interaction.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

        return interactions, total

    @staticmethod
    def update(
        db: Session, interaction_id: int, data: InteractionUpdate
    ) -> Interaction | None:
        """
        Partially update an existing interaction.
        Only fields explicitly set in the request body are updated.
        Returns None if the interaction is not found.
        """
        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if not interaction:
            return None

        # Apply only the fields that were explicitly provided
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(interaction, field, value)

        db.commit()
        db.refresh(interaction)
        return interaction

    @staticmethod
    def delete(db: Session, interaction_id: int) -> bool:
        """
        Delete an interaction by its primary key.
        Returns True if deleted, False if not found.
        """
        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if not interaction:
            return False

        db.delete(interaction)
        db.commit()
        return True

    @staticmethod
    def count(db: Session) -> int:
        """Return the total number of interaction records."""
        return db.query(sql_func.count(Interaction.id)).scalar() or 0
