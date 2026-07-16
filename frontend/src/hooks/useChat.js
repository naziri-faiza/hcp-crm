/**
 * useChat Hook
 * ------------
 * Custom hook for managing AI assistant chat state via Redux.
 * Handles API invocation, conversational replies, and structured form auto-fill.
 */

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessage,
  setInputText,
  setIsTyping,
  setIsLoading,
  setError,
  clearMessages,
  resetChat,
} from '../features/chatSlice';
import {
  updateMultipleFields,
  setAiFilledFields,
} from '../features/interactionSlice';
import { showSnackbar } from '../features/uiSlice';
import { sendChatMessage } from '../api/chat';

/**
 * Maps snake_case backend keys to camelCase frontend form keys.
 */
const keyMap = {
  hcp_name: 'hcpName',
  hospital_clinic_name: 'hospitalClinicName',
  hcp_specialty: 'hcpSpecialty',
  interaction_type: 'interactionType',
  date: 'date',
  time: 'time',
  interaction_duration: 'interactionDuration',
  meeting_mode: 'meetingMode',
  location: 'location',
  attendees: 'attendees',
  topics_discussed: 'topicsDiscussed',
  materials_shared: 'materialsShared',
  samples_distributed: 'samplesDistributed',
  product_discussed: 'productDiscussed',
  hcp_sentiment: 'hcpSentiment',
  priority: 'priority',
  outcomes: 'outcomes',
  follow_up_actions: 'followUpActions',
  next_follow_up_date: 'nextFollowUpDate',
};

/**
 * Helper to format ISO date string (YYYY-MM-DDThh:mm:ss) into YYYY-MM-DD for text/date fields.
 */
const formatDateVal = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
};

/**
 * Hook that encapsulates chat assistant logic and form auto-fill synchronization.
 */
const useChat = () => {
  const dispatch = useDispatch();
  const { messages, inputText, isTyping, isLoading, error, suggestions } =
    useSelector((state) => state.chat);

  /** Handle input text changes. */
  const handleInputChange = useCallback(
    (event) => {
      dispatch(setInputText(event.target.value));
    },
    [dispatch]
  );

  /** Send message to backend and apply state updates. */
  const handleSendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    // Add user message to UI
    dispatch(addMessage({ role: 'user', content: trimmed }));
    dispatch(setInputText(''));
    dispatch(setIsLoading(true));
    dispatch(setIsTyping(true));
    dispatch(setError(null));

    try {
      // Format history messages for the backend schema [{role, content}]
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Call FastAPI chat assistant
      const response = await sendChatMessage(trimmed, historyPayload);
      const { reply, extracted_data, errors } = response.data;

      // Handle assistant reply
      dispatch(addMessage({ role: 'assistant', content: reply }));

      if (errors && errors.length > 0) {
        console.warn('Errors reported in agent response:', errors);
      }

      // Check if LLM extracted structured data
      if (extracted_data && Object.keys(extracted_data).length > 0) {
        const camelCaseData = {};
        const filledKeys = [];

        Object.entries(extracted_data).forEach(([key, val]) => {
          const mappedKey = keyMap[key];
          if (mappedKey && val !== null && val !== undefined) {
            // Normalize dates to YYYY-MM-DD
            if (key === 'date' || key === 'next_follow_up_date') {
              camelCaseData[mappedKey] = formatDateVal(val);
            } else {
              camelCaseData[mappedKey] = val;
            }
            filledKeys.push(mappedKey);
          }
        });

        if (filledKeys.length > 0) {
          // Update Redux form state
          dispatch(updateMultipleFields(camelCaseData));
          dispatch(setAiFilledFields(filledKeys));
          dispatch(
            showSnackbar({
              message: `AI filled ${filledKeys.length} fields!`,
              severity: 'info',
            })
          );
        }
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail || err.message || 'Failed to connect to AI Assistant';
      dispatch(setError(errorMsg));
      dispatch(
        addMessage({
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorMsg}. Please ensure the backend server is running and configured correctly.`,
        })
      );
      dispatch(
        showSnackbar({
          message: 'Error communicating with AI Assistant',
          severity: 'error',
        })
      );
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setIsTyping(false));
    }
  }, [dispatch, inputText, messages, isLoading]);

  /** Handle suggestion chip click. */
  const handleSuggestionClick = useCallback(
    (suggestion) => {
      dispatch(setInputText(suggestion));
    },
    [dispatch]
  );

  /** Clear all messages. */
  const handleClearChat = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  /** Full reset. */
  const handleResetChat = useCallback(() => {
    dispatch(resetChat());
  }, [dispatch]);

  return {
    messages,
    inputText,
    isTyping,
    isLoading,
    error,
    suggestions,
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick,
    handleClearChat,
    handleResetChat,
  };
};

export default useChat;
