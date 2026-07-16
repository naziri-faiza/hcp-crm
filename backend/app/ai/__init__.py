"""
AI Module
---------
LangGraph workflow and Groq model configurations for CRM AI Assistant tools.
"""

from app.ai.graph import workflow
from app.ai.state import AgentState, ConversationMessage

__all__ = ["workflow", "AgentState", "ConversationMessage"]
