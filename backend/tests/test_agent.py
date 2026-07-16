"""
LangGraph Agent E2E Test Suite
------------------------------
Verifies intent detection and tool output extraction across the 5 CRM intents.
"""

import asyncio
import os
import sys

# Ensure backend folder is in PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.ai.graph import workflow


async def run_test_case(name: str, message: str):
    """Run a single test case through the LangGraph StateGraph workflow."""
    print(f"\n========================================================")
    print(f"RUNNING TEST CASE: {name}")
    print(f"INPUT MESSAGE: '{message}'")
    print(f"========================================================")

    initial_state = {
        "user_message": message,
        "conversation_history": [],
        "detected_intent": None,
        "extracted_data": None,
        "ai_response": None,
        "database_result": None,
        "errors": [],
    }

    try:
        final_state = await workflow.ainvoke(initial_state)

        print(f"DETECTED INTENT: {final_state.get('detected_intent')}")
        print(f"AI RESPONSE: {final_state.get('ai_response')}")
        print(f"EXTRACTED DATA: {final_state.get('extracted_data')}")
        print(f"ERRORS: {final_state.get('errors')}")

    except Exception as exc:
        print(f"TEST CASE FAILED WITH EXCEPTION: {exc}")


async def main():
    # Verify GROQ_API_KEY is present
    from app.config import settings
    print(f"Configured Default Model: {settings.AI_MODEL_DEFAULT}")
    print(f"Configured Fallback Model: {settings.AI_MODEL_FALLBACK}")

    # 1. Log Interaction Test
    await run_test_case(
        "Log Interaction Tool",
        "Today I met Dr. Priya Sharma at Apollo Hospital. We discussed CardioX, "
        "shared brochures, distributed 10 samples, and scheduled a follow-up next Tuesday."
    )

    # 2. Edit Interaction Test
    await run_test_case(
        "Edit Interaction Tool",
        "Change the meeting priority level to Urgent."
    )

    # 3. Search Interaction Test
    await run_test_case(
        "Search Interaction Tool",
        "Find high priority interactions with Dr. Sharma."
    )

    # 4. Suggestions Test
    await run_test_case(
        "Suggestions Tool",
        "Give me follow-up suggestions for my meeting with Dr. Chambers."
    )

    # 5. Summarization Test
    await run_test_case(
        "Summarization Tool",
        "Summarize my visit with Dr. Sharma. We discussed oncology trial results."
    )


if __name__ == "__main__":
    asyncio.run(main())
