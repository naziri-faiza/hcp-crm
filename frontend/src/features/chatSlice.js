/**
 * Chat Slice
 * ----------
 * Redux slice for managing AI Assistant chat state.
 * Handles message history, typing indicators, and suggestions.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Chat messages: { id, role: 'user'|'assistant', content, timestamp }
  messages: [],

  // Current input text in the chat box
  inputText: '',

  // AI typing indicator
  isTyping: false,

  // Loading state for AI responses
  isLoading: false,

  // Error state
  error: null,

  // Suggestion chips for empty state
  suggestions: [
    'Log a new HCP visit',
    'I met Dr. Smith today at City Hospital',
    'Schedule a follow-up with the oncology team',
    'Summarize my last interaction',
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    /**
     * Add a new message to the chat history.
     * @param {Object} action.payload - { role, content }
     */
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },

    /**
     * Update the current chat input text.
     * @param {string} action.payload - Input text value
     */
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },

    /** Toggle the AI typing indicator. */
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },

    /** Toggle the loading state. */
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    /** Set an error message. */
    setError: (state, action) => {
      state.error = action.payload;
    },

    /** Clear all chat messages. */
    clearMessages: (state) => {
      state.messages = [];
    },

    /** Reset chat to initial state. */
    resetChat: () => initialState,
  },
});

export const {
  addMessage,
  setInputText,
  setIsTyping,
  setIsLoading,
  setError,
  clearMessages,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
