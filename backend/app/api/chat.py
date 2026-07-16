"""
Chat Endpoint Router
--------------------
FastAPI router for the AI assistant chat, forwarding inputs to the LangGraph workflow.
"""

from fastapi import APIRouter, HTTPException, status
from app.ai.graph import workflow
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


@router.post("/", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat_with_assistant(request: ChatRequest):
    """
    POST endpoint for user messages to the AI assistant.
    Runs the input through the LangGraph StateGraph pipeline.
    """
    # Transform schemas to TypedDict format expected by State
    history = [
        {"role": msg.role, "content": msg.content}
        for msg in request.history
    ]

    initial_state = {
        "user_message": request.message,
        "conversation_history": history,
        "detected_intent": None,
        "extracted_data": None,
        "ai_response": None,
        "database_result": None,
        "errors": [],
    }

    try:
        # Execute the StateGraph pipeline asynchronously
        final_state = await workflow.ainvoke(initial_state)

        # Handle fallback response if state didn't generate one
        reply = final_state.get("ai_response")
        if not reply:
            reply = "I've processed your message but couldn't generate a conversational response. Please try again."

        return ChatResponse(
            reply=reply,
            detected_intent=final_state.get("detected_intent", "unknown"),
            extracted_data=final_state.get("extracted_data"),
            errors=final_state.get("errors", []),
        )

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LangGraph execution error: {str(exc)}",
        )
