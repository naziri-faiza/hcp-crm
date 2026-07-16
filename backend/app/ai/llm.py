"""
LLM Client Wrapper
------------------
Initializes ChatGroq instances and implements API failure handling
with single-retry fallback to a secondary model (llama-3.3-70b-versatile).
"""

import json
import logging
from typing import Any, Dict, List, Optional, Type
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage

from app.config import settings

logger = logging.getLogger(__name__)


def get_llm(model_name: Optional[str] = None, temperature: float = 0.0) -> ChatGroq:
    """
    Instantiate a ChatGroq LLM client.
    Uses the provided model name, or falls back to settings.AI_MODEL_DEFAULT.
    """
    model = model_name or settings.AI_MODEL_DEFAULT
    api_key = settings.GROQ_API_KEY

    if not api_key or api_key == "your_groq_api_key_here":
        raise ValueError(
            "GROQ_API_KEY is not set or is using the default placeholder value in .env."
        )

    return ChatGroq(
        model=model,
        temperature=temperature,
        groq_api_key=api_key,
        max_retries=1,  # Built-in LangChain retry
    )


async def invoke_llm_with_fallback(
    system_prompt: str,
    user_message: str,
    response_model: Optional[Type[BaseModel]] = None,
    json_mode: bool = True,
) -> Dict[str, Any]:
    """
    Invoke the ChatGroq model with a system prompt and user input.
    If the primary model (gemma2-9b-it) fails, falls back to the secondary model (llama-3.3-70b-versatile).

    Args:
        system_prompt: Guidelines and formatting instructions.
        user_message: User input content.
        response_model: Optional Pydantic schema for structured output.
        json_mode: If True, request JSON formatting from LLM.

    Returns:
        dict: Parsed JSON response.
    """
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_message),
    ]

    # Try primary model first
    primary_model = settings.AI_MODEL_DEFAULT
    fallback_model = settings.AI_MODEL_FALLBACK

    try:
        logger.info(f"Invoking LLM with primary model: {primary_model}")
        return await _execute_call(primary_model, messages, response_model, json_mode)
    except Exception as exc:
        logger.warning(
            f"Primary model {primary_model} invocation failed: {exc}. Retrying once with fallback model {fallback_model}."
        )
        try:
            return await _execute_call(fallback_model, messages, response_model, json_mode)
        except Exception as fallback_exc:
            logger.error(f"Fallback model {fallback_model} also failed: {fallback_exc}")
            raise fallback_exc


async def _execute_call(
    model: str,
    messages: List[Any],
    response_model: Optional[Type[BaseModel]] = None,
    json_mode: bool = True,
) -> Dict[str, Any]:
    """Execute the LLM call using LangChain ChatGroq."""
    llm = get_llm(model_name=model)

    if response_model:
        # Use structured output mapping
        structured_llm = llm.with_structured_output(response_model)
        result = await structured_llm.ainvoke(messages)
        if isinstance(result, BaseModel):
            return result.model_dump()
        return result

    # Standard JSON mode invocation
    if json_mode:
        llm = llm.bind(response_format={"type": "json_object"})

    response = await llm.ainvoke(messages)
    content = str(response.content).strip()

    # Parse JSON output
    try:
        return json.loads(content)
    except json.JSONDecodeError as exc:
        logger.error(f"Failed to decode JSON from LLM response: {content}")
        raise ValueError("LLM response did not contain valid JSON.") from exc
