"""
Interaction API Router
----------------------
FastAPI router for HCP Interaction CRUD endpoints.
All routes use dependency injection for the database session
and delegate business logic to InteractionService.
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.interaction_service import InteractionService
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
    InteractionListResponse,
    InteractionUpdate,
)

router = APIRouter(
    prefix="/interactions",
    tags=["interactions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=InteractionListResponse)
async def list_interactions(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=100, description="Max records to return"),
    search: str | None = Query(None, description="Search by HCP name"),
    db: Session = Depends(get_db),
):
    """
    List all HCP interactions with pagination and optional search.
    Results are ordered by creation date (newest first).
    """
    interactions, total = InteractionService.get_all(
        db, skip=skip, limit=limit, search=search
    )

    # Calculate current page from skip/limit
    page = (skip // limit) + 1 if limit else 1

    return InteractionListResponse(
        items=interactions,
        total=total,
        page=page,
        per_page=limit,
    )


@router.post(
    "/",
    response_model=InteractionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_interaction(
    data: InteractionCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new HCP interaction record.
    The hcp_name field is required; all others are optional.
    """
    interaction = InteractionService.create(db, data)
    return interaction


@router.get("/{interaction_id}", response_model=InteractionResponse)
async def get_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve a specific HCP interaction by its ID.
    Returns 404 if not found.
    """
    interaction = InteractionService.get_by_id(db, interaction_id)
    if not interaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interaction with id {interaction_id} not found",
        )
    return interaction


@router.put("/{interaction_id}", response_model=InteractionResponse)
async def update_interaction(
    interaction_id: int,
    data: InteractionUpdate,
    db: Session = Depends(get_db),
):
    """
    Partially update an existing HCP interaction.
    Only fields included in the request body are updated.
    Returns 404 if not found.
    """
    interaction = InteractionService.update(db, interaction_id, data)
    if not interaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interaction with id {interaction_id} not found",
        )
    return interaction


@router.delete(
    "/{interaction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete an HCP interaction by its ID.
    Returns 204 on success, 404 if not found.
    """
    deleted = InteractionService.delete(db, interaction_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interaction with id {interaction_id} not found",
        )
    return None
