/**
 * Interaction API Service
 * -----------------------
 * API functions for HCP Interaction CRUD operations.
 * All functions return Axios promise responses.
 *
 * TODO: Implement when backend CRUD is ready.
 */

import apiClient from './client';

const INTERACTIONS_PATH = '/interactions';

/**
 * Fetch all interactions with optional pagination.
 * @param {Object} params - { skip, limit }
 * @returns {Promise} Axios response
 */
export const getInteractions = (params = {}) =>
  apiClient.get(INTERACTIONS_PATH, { params });

/**
 * Fetch a single interaction by ID.
 * @param {number} id - Interaction ID
 * @returns {Promise} Axios response
 */
export const getInteractionById = (id) =>
  apiClient.get(`${INTERACTIONS_PATH}/${id}`);

/**
 * Create a new interaction.
 * @param {Object} data - Interaction form data
 * @returns {Promise} Axios response
 */
export const createInteraction = (data) =>
  apiClient.post(INTERACTIONS_PATH, data);

/**
 * Update an existing interaction.
 * @param {number} id - Interaction ID
 * @param {Object} data - Updated fields
 * @returns {Promise} Axios response
 */
export const updateInteraction = (id, data) =>
  apiClient.put(`${INTERACTIONS_PATH}/${id}`, data);

/**
 * Delete an interaction.
 * @param {number} id - Interaction ID
 * @returns {Promise} Axios response
 */
export const deleteInteraction = (id) =>
  apiClient.delete(`${INTERACTIONS_PATH}/${id}`);
