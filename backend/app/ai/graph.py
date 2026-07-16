"""
LangGraph Workflow Configuration
--------------------------------
Assembles nodes, conditional edges, and compiles the workflow state graph.
"""

from langgraph.graph import StateGraph, START, END

from app.ai.state import AgentState
from app.ai import nodes


def route_intent(state: AgentState) -> str:
    """
    Router function to map detected_intent to the corresponding graph node name.
    """
    intent = state.get("detected_intent", "unknown")

    # Map intent strings to node name keys
    mapping = {
        "log_interaction": "log_interaction",
        "edit_interaction": "edit_interaction",
        "search_interaction": "search_interaction",
        "generate_followup": "generate_followup",
        "summarize_interaction": "summarize_interaction",
    }

    # If it is one of our tools, route to it; otherwise go to END
    return mapping.get(intent, END)


def build_graph() -> StateGraph:
    """
    Build and compile the LangGraph StateGraph.
    """
    # 1. Initialize StateGraph with our custom AgentState
    builder = StateGraph(AgentState)

    # 2. Add workflow nodes
    builder.add_node("intent_detection", nodes.intent_detection_node)
    builder.add_node("log_interaction", nodes.log_interaction_node)
    builder.add_node("edit_interaction", nodes.edit_interaction_node)
    builder.add_node("search_interaction", nodes.search_interaction_node)
    builder.add_node("generate_followup", nodes.generate_followup_node)
    builder.add_node("summarize_interaction", nodes.summarize_interaction_node)

    # 3. Configure transitions
    builder.add_edge(START, "intent_detection")

    # Conditional routing edge from intent detection to tools or END
    builder.add_conditional_edges(
        "intent_detection",
        route_intent,
        {
            "log_interaction": "log_interaction",
            "edit_interaction": "edit_interaction",
            "search_interaction": "search_interaction",
            "generate_followup": "generate_followup",
            "summarize_interaction": "summarize_interaction",
            END: END,
        },
    )

    # Normal edges from tools directly to END
    builder.add_edge("log_interaction", END)
    builder.add_edge("edit_interaction", END)
    builder.add_edge("search_interaction", END)
    builder.add_edge("generate_followup", END)
    builder.add_edge("summarize_interaction", END)

    # 4. Compile the graph
    return builder.compile()


# Compile reusable workflow instance
workflow = build_graph()
