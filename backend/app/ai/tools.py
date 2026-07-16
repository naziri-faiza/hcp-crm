"""
AI Extraction and Processing Tools
----------------------------------
Implements the 5 tools for Log, Edit, Search, Suggestions, and Summarization.
Uses Pydantic schemas and ChatGroq with retry/fallback logic.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime

from app.ai.llm import invoke_llm_with_fallback
from app.ai import prompts

# ======================================================================
# PYDANTIC SCHEMAS FOR STRUCTURED OUTPUT
# ======================================================================

class LogInteractionSchema(BaseModel):
    """Schema for extracting a logged interaction from natural language."""
    hcp_name: Optional[str] = Field(None, description="Full name of the Healthcare Professional")
    hospital_clinic_name: Optional[str] = Field(None, description="Name of the hospital, clinic, or facility")
    hcp_specialty: Optional[str] = Field(None, description="HCP's medical specialty (e.g. Cardiology, Oncology)")
    interaction_type: Optional[str] = Field(None, description="Must be one of: 'In-Person', 'Virtual', 'Phone', 'Email', 'Conference'")
    date: Optional[str] = Field(None, description="ISO format date (YYYY-MM-DD)")
    time: Optional[str] = Field(None, description="Time of the meeting")
    interaction_duration: Optional[float] = Field(None, description="Duration of interaction in minutes")
    meeting_mode: Optional[str] = Field(None, description="Must be one of: 'Office', 'Hospital', 'Virtual', 'Conference', 'Dinner', 'Other'")
    location: Optional[str] = Field(None, description="Physical location or link")
    attendees: Optional[str] = Field(None, description="Other attendees present")
    topics_discussed: Optional[str] = Field(None, description="Key topics discussed")
    materials_shared: Optional[str] = Field(None, description="Brochures, slides, or clinical papers shared")
    samples_distributed: Optional[str] = Field(None, description="Samples of products/drugs distributed")
    product_discussed: Optional[str] = Field(None, description="Specific pharmaceutical product or therapy discussed")
    hcp_sentiment: Optional[str] = Field(None, description="Must be one of: 'Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'")
    priority: Optional[str] = Field(None, description="Must be one of: 'Low', 'Medium', 'High', 'Urgent'")
    outcomes: Optional[str] = Field(None, description="Direct decisions or meeting outcomes")
    follow_up_actions: Optional[str] = Field(None, description="Required follow-up actions")
    next_follow_up_date: Optional[str] = Field(None, description="ISO format next follow-up date (YYYY-MM-DD)")


class SearchInteractionFilters(BaseModel):
    """Schema for translating search queries into filters."""
    hcp_name: Optional[str] = Field(None, description="HCP name keyword to search")
    hcp_specialty: Optional[str] = Field(None, description="HCP medical specialty filter")
    priority: Optional[str] = Field(None, description="Interaction priority filter")
    interaction_type: Optional[str] = Field(None, description="Interaction type filter")
    timeframe: Optional[str] = Field(None, description="Relational timeframe: 'today', 'yesterday', 'this_week', 'last_month'")
    general_query: Optional[str] = Field(None, description="Fallback general keyword query search")


class FollowupSuggestionsSchema(BaseModel):
    """Schema for actionable follow-up recommendations."""
    suggestions: List[str] = Field(description="Actionable 3-5 follow-up suggestions")
    reasoning: Optional[str] = Field(None, description="Reasoning for these recommendations")


class SummarizeInteractionSchema(BaseModel):
    """Schema for CRM meeting summaries."""
    summary_points: List[str] = Field(description="3-5 short bulleted points summarizing the interaction")
    sentiment_summary: Optional[str] = Field(None, description="One-line summary of the HCP's stance")


# ======================================================================
# TOOL IMPLEMENTATIONS
# ======================================================================

async def tool_log_interaction(user_message: str) -> Dict[str, Any]:
    """
    Tool 1: Extracts 19 fields from meeting description.
    """
    current_time_str = datetime.now().strftime("%Y-%m-%d %H:%M (Local Time)")
    system_prompt = prompts.LOG_INTERACTION_SYSTEM_PROMPT.format(
        current_time=current_time_str
    )
    return await invoke_llm_with_fallback(
        system_prompt=system_prompt,
        user_message=user_message,
        response_model=LogInteractionSchema
    )


async def tool_edit_interaction(user_message: str) -> Dict[str, Any]:
    """
    Tool 2: Extracts only the fields user wants to change.
    """
    current_time_str = datetime.now().strftime("%Y-%m-%d (Local Date)")
    system_prompt = prompts.EDIT_INTERACTION_SYSTEM_PROMPT.format(
        current_time=current_time_str
    )
    return await invoke_llm_with_fallback(
        system_prompt=system_prompt,
        user_message=user_message,
        json_mode=True
    )


async def tool_search_interaction(user_message: str) -> Dict[str, Any]:
    """
    Tool 3: Extracts search query filters.
    """
    return await invoke_llm_with_fallback(
        system_prompt=prompts.SEARCH_INTERACTION_SYSTEM_PROMPT,
        user_message=user_message,
        response_model=SearchInteractionFilters
    )


async def tool_generate_followup(user_message: str) -> Dict[str, Any]:
    """
    Tool 4: Generates follow-up suggestion items.
    """
    return await invoke_llm_with_fallback(
        system_prompt=prompts.SUGGESTIONS_SYSTEM_PROMPT,
        user_message=user_message,
        response_model=FollowupSuggestionsSchema
    )


async def tool_summarize_interaction(user_message: str) -> Dict[str, Any]:
    """
    Tool 5: Summarizes interaction details into short notes.
    """
    return await invoke_llm_with_fallback(
        system_prompt=prompts.SUMMARY_SYSTEM_PROMPT,
        user_message=user_message,
        response_model=SummarizeInteractionSchema
    )
