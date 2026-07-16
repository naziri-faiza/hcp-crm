"""
LangGraph Nodes
---------------
Defines the workflow nodes including Intent Detection and tool executors.
Processes node states and updates the graph state.
"""

from typing import Dict, Any
from app.ai.state import AgentState
from app.ai.llm import invoke_llm_with_fallback
from app.ai import prompts
from app.ai import tools


async def intent_detection_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Analyzes user input to classify the intent.
    Sets 'detected_intent' and clears/configures state error if classification is low confidence.
    """
    user_msg = state.get("user_message", "").strip()

    if not user_msg:
        return {
            "detected_intent": "unknown",
            "ai_response": "I didn't receive any message. How can I help you today?",
            "errors": ["Empty user message"],
        }

    try:
        result = await invoke_llm_with_fallback(
            system_prompt=prompts.INTENT_DETECTION_SYSTEM_PROMPT,
            user_message=user_msg,
            json_mode=True,
        )

        intent = result.get("intent", "unknown")
        confidence = result.get("confidence", 0.0)
        clarification_needed = result.get("clarification_needed", False)

        if clarification_needed or confidence < 0.7 or intent == "unknown":
            return {
                "detected_intent": "unknown",
                "ai_response": (
                    "I'm not completely sure what you'd like to do. "
                    "You can log a new interaction, search past meetings, "
                    "edit a record, summarize, or generate follow-up recommendations. "
                    "Could you please clarify?"
                ),
            }

        return {
            "detected_intent": intent,
            "errors": [],
        }

    except Exception as exc:
        return {
            "detected_intent": "unknown",
            "ai_response": "Sorry, I encountered an issue identifying your request. Can you try again?",
            "errors": [f"Intent detection failed: {str(exc)}"],
        }


async def log_interaction_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Tool 1 - Log Interaction executor.
    Extracts structured fields from natural language and prompts the frontend to update fields.
    """
    user_msg = state.get("user_message", "")

    try:
        extracted = await tools.tool_log_interaction(user_msg)

        # Build user friendly confirmation message
        hcp = extracted.get("hcp_name")
        hospital = extracted.get("hospital_clinic_name")
        specialty = extracted.get("hcp_specialty")

        confirmation_details = []
        if hcp:
            confirmation_details.append(f"• **HCP Name**: {hcp}")
        if hospital:
            confirmation_details.append(f"• **Hospital/Clinic**: {hospital}")
        if specialty:
            confirmation_details.append(f"• **Specialty**: {specialty}")

        if confirmation_details:
            details_str = "\n".join(confirmation_details)
            reply = (
                f"I've successfully parsed the interaction details and populated the form for you:\n\n"
                f"{details_str}\n\n"
                "Please review the form values and click **Save Interaction** at the bottom to commit."
            )
        else:
            reply = (
                "I analyzed your message but couldn't confidently extract the key HCP details (like Name). "
                "Please enter the HCP Name manually in the form."
            )

        return {
            "extracted_data": extracted,
            "ai_response": reply,
        }

    except Exception as exc:
        return {
            "ai_response": "I encountered an error while trying to extract the interaction details. Please try again.",
            "errors": [f"Log Interaction tool failed: {str(exc)}"],
        }


async def edit_interaction_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Tool 2 - Edit Interaction executor.
    Extracts updates to apply to the current form state.
    """
    user_msg = state.get("user_message", "")

    try:
        updates = await tools.tool_edit_interaction(user_msg)

        if updates:
            update_lines = [f"• **{k.replace('_', ' ').title()}** updated to `{v}`" for k, v in updates.items()]
            reply = (
                "I've updated the following fields in your current form draft:\n\n"
                + "\n".join(update_lines)
            )
        else:
            reply = "I couldn't identify any specific fields to edit from your request. (e.g. try saying 'Change priority to High')"

        return {
            "extracted_data": updates,
            "ai_response": reply,
        }

    except Exception as exc:
        return {
            "ai_response": "I encountered an error trying to process your edits. Please try again.",
            "errors": [f"Edit Interaction tool failed: {str(exc)}"],
        }


async def search_interaction_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Tool 3 - Search Interaction executor.
    Identifies structured search filters for frontend or backend queries.
    """
    user_msg = state.get("user_message", "")

    try:
        filters = await tools.tool_search_interaction(user_msg)

        filter_lines = []
        for k, v in filters.items():
            if v:
                filter_lines.append(f"• **{k.replace('_', ' ').title()}**: `{v}`")

        if filter_lines:
            reply = (
                "I've prepared a search query filter for you:\n\n"
                + "\n".join(filter_lines)
                + "\n\n(Searching database...)"
            )
        else:
            reply = "I couldn't extract any specific filters for searching. What are you looking for?"

        return {
            "extracted_data": filters,
            "ai_response": reply,
        }

    except Exception as exc:
        return {
            "ai_response": "I encountered an error preparing the search filters.",
            "errors": [f"Search Interaction tool failed: {str(exc)}"],
        }


async def generate_followup_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Tool 4 - Follow-up recommendations.
    Provides follow-up actions based on the user's meeting context.
    """
    user_msg = state.get("user_message", "")

    try:
        suggestions_data = await tools.tool_generate_followup(user_msg)
        suggestions = suggestions_data.get("suggestions", [])
        reasoning = suggestions_data.get("reasoning", "")

        if suggestions:
            suggest_lines = [f"{i+1}. {s}" for i, s in enumerate(suggestions)]
            reply = (
                "Based on the meeting context, here are my follow-up suggestions:\n\n"
                + "\n".join(suggest_lines)
            )
            if reasoning:
                reply += f"\n\n*Reasoning: {reasoning}*"
        else:
            reply = "I couldn't generate follow-up recommendations. Please describe the interaction first."

        return {
            "ai_response": reply,
        }

    except Exception as exc:
        return {
            "ai_response": "I couldn't generate follow-up suggestions due to an error.",
            "errors": [f"Generate Follow-up tool failed: {str(exc)}"],
        }


async def summarize_interaction_node(state: AgentState) -> Dict[str, Any]:
    """
    Node: Tool 5 - Summarize Interaction.
    Provides concise bullet points and sentiment summary.
    """
    user_msg = state.get("user_message", "")

    try:
        summary_data = await tools.tool_summarize_interaction(user_msg)
        points = summary_data.get("summary_points", [])
        sentiment = summary_data.get("sentiment_summary", "")

        if points:
            bullet_lines = [f"• {p}" for p in points]
            reply = (
                "Here is a professional summary for your CRM notes:\n\n"
                + "\n".join(bullet_lines)
            )
            if sentiment:
                reply += f"\n\n**HCP Stance**: {sentiment}"
        else:
            reply = "I couldn't generate a summary. Please provide more details about the meeting."

        return {
            "ai_response": reply,
        }

    except Exception as exc:
        return {
            "ai_response": "I encountered an error generating the summary.",
            "errors": [f"Summarize Interaction tool failed: {str(exc)}"],
        }
