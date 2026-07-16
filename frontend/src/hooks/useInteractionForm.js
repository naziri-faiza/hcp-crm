/**
 * useInteractionForm Hook
 * -----------------------
 * Custom hook for managing interaction form state via Redux.
 * Provides field update handlers, validation, and API submission.
 */

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateField,
  updateMultipleFields,
  setValidationErrors,
  clearFieldError,
  setSubmitting,
  setSubmitError,
  setSubmitSuccess,
  resetForm,
} from '../features/interactionSlice';
import { showSnackbar } from '../features/uiSlice';
import { createInteraction } from '../api/interactions';

/**
 * Converts camelCase frontend field names to snake_case backend field names.
 * @param {Object} formData - Frontend form data with camelCase keys
 * @returns {Object} Transformed data with snake_case keys
 */
const toSnakeCase = (formData) => ({
  hcp_name: formData.hcpName,
  hospital_clinic_name: formData.hospitalClinicName || null,
  hcp_specialty: formData.hcpSpecialty || null,
  interaction_type: formData.interactionType || null,
  date: formData.date || null,
  time: formData.time || null,
  interaction_duration: formData.interactionDuration
    ? parseFloat(formData.interactionDuration)
    : null,
  meeting_mode: formData.meetingMode || null,
  location: formData.location || null,
  attendees: formData.attendees || null,
  topics_discussed: formData.topicsDiscussed || null,
  materials_shared: formData.materialsShared || null,
  samples_distributed: formData.samplesDistributed || null,
  product_discussed: formData.productDiscussed || null,
  hcp_sentiment: formData.hcpSentiment || null,
  priority: formData.priority || null,
  outcomes: formData.outcomes || null,
  follow_up_actions: formData.followUpActions || null,
  next_follow_up_date: formData.nextFollowUpDate || null,
});

/**
 * Hook that encapsulates interaction form logic.
 * @returns {Object} Form state, handlers, and utilities
 */
const useInteractionForm = () => {
  const dispatch = useDispatch();
  const {
    formData,
    aiFilledFields,
    isSubmitting,
    submitError,
    submitSuccess,
    validationErrors,
  } = useSelector((state) => state.interaction);

  /** Handle a single field change. */
  const handleFieldChange = useCallback(
    (field) => (event) => {
      const value = event?.target?.value ?? event;
      dispatch(updateField({ field, value }));
      // Clear validation error when user edits the field
      if (validationErrors[field]) {
        dispatch(clearFieldError(field));
      }
    },
    [dispatch, validationErrors]
  );

  /** Update multiple fields at once (e.g., from AI). */
  const handleBulkUpdate = useCallback(
    (fields) => {
      dispatch(updateMultipleFields(fields));
    },
    [dispatch]
  );

  /** Validate form and return whether it passes. */
  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.hcpName?.trim()) {
      errors.hcpName = 'HCP Name is required';
    }

    if (
      formData.interactionDuration &&
      (isNaN(formData.interactionDuration) || parseFloat(formData.interactionDuration) < 0)
    ) {
      errors.interactionDuration = 'Duration must be a positive number';
    }

    dispatch(setValidationErrors(errors));
    return Object.keys(errors).length === 0;
  }, [dispatch, formData]);

  /**
   * Submit the interaction form to the backend API.
   * Validates first, then sends a POST request.
   */
  const handleSubmit = useCallback(async () => {
    // Validate before submission
    if (!validateForm()) return false;

    dispatch(setSubmitting(true));
    dispatch(setSubmitError(null));
    dispatch(setSubmitSuccess(false));

    try {
      const payload = toSnakeCase(formData);
      await createInteraction(payload);

      dispatch(setSubmitSuccess(true));
      dispatch(
        showSnackbar({
          message: 'Interaction saved successfully!',
          severity: 'success',
        })
      );

      // Reset form after successful save
      dispatch(resetForm());
      return true;
    } catch (error) {
      const message =
        error.response?.data?.detail || error.message || 'Failed to save interaction';
      dispatch(setSubmitError(message));
      dispatch(
        showSnackbar({
          message: `Error: ${message}`,
          severity: 'error',
        })
      );
      return false;
    } finally {
      dispatch(setSubmitting(false));
    }
  }, [dispatch, formData, validateForm]);

  /** Reset form to defaults. */
  const handleReset = useCallback(() => {
    dispatch(resetForm());
  }, [dispatch]);

  /** Check if a field was auto-filled by AI. */
  const isAiFilled = useCallback(
    (fieldName) => aiFilledFields.includes(fieldName),
    [aiFilledFields]
  );

  return {
    formData,
    aiFilledFields,
    isSubmitting,
    submitError,
    submitSuccess,
    validationErrors,
    handleFieldChange,
    handleBulkUpdate,
    validateForm,
    handleSubmit,
    handleReset,
    isAiFilled,
  };
};

export default useInteractionForm;
