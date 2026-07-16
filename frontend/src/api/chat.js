/**
 * Chat API Service
 * ----------------
 * API functions for communicating with the assistant chat endpoint.
 */

import apiClient from './client';

const CHAT_PATH = '/chat';

/**
 * Send a chat message with conversation history to the AI Assistant.
 * @param {string} message - User message text
 * @param {Array} history - Previous messages: [{ role, content }]
 * @returns {Promise} Axios response
 */
export const sendChatMessage = (message, history = []) =>
  apiClient.post(CHAT_PATH, { message, history });
