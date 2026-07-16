/**
 * Interaction Slice
 * -----------------
 * Redux slice for managing HCP interaction form state.
 * Holds all form field values and submission state.
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the interaction form.
 * Each field corresponds to a form input in the left panel.
 */
const initialState = {
  // Form data
  formData: {
    hcpName: '',
    hospitalClinicName: '',
    hcpSpecialty: '',
    interactionType: '',
    date: null,
    time: null,
    interactionDuration: '',
    attendees: '',
    topicsDiscussed: '',
    materialsShared: '',
    samplesDistributed: '',
    hcpSentiment: '',
    priority: '',
    outcomes: '',
    followUpActions: '',
    nextFollowUpDate: null,
    location: '',
    meetingMode: '',
    productDiscussed: '',
  },

  // Track which fields were auto-filled by AI
  aiFilledFields: [],

  // Form submission state
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,

  // Validation errors
  validationErrors: {},
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    /**
     * Update a single form field value.
     * @param {Object} action.payload - { field: string, value: any }
     */
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    /**
     * Update multiple form fields at once (e.g., from AI auto-fill).
     * @param {Object} action.payload - Object with field:value pairs
     */
    updateMultipleFields: (state, action) => {
      Object.assign(state.formData, action.payload);
    },

    /**
     * Mark fields as AI-filled (for badge display).
     * @param {string[]} action.payload - Array of field names
     */
    setAiFilledFields: (state, action) => {
      state.aiFilledFields = action.payload;
    },

    /**
     * Set validation errors for form fields.
     * @param {Object} action.payload - { fieldName: errorMessage }
     */
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },

    /**
     * Clear a specific validation error.
     * @param {string} action.payload - Field name to clear
     */
    clearFieldError: (state, action) => {
      delete state.validationErrors[action.payload];
    },

    /** Set form submission loading state. */
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },

    /** Set form submission error. */
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },

    /** Set form submission success. */
    setSubmitSuccess: (state, action) => {
      state.submitSuccess = action.payload;
    },

    /** Reset entire form to initial state. */
    resetForm: () => initialState,
  },
});

export const {
  updateField,
  updateMultipleFields,
  setAiFilledFields,
  setValidationErrors,
  clearFieldError,
  setSubmitting,
  setSubmitError,
  setSubmitSuccess,
  resetForm,
} = interactionSlice.actions;

export default interactionSlice.reducer;
