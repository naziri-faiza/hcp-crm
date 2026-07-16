/**
 * UI Slice
 * --------
 * Redux slice for managing global UI state.
 * Controls theme mode, layout preferences, and notifications.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Theme: 'light' or 'dark'
  themeMode: 'light',

  // Sidebar/panel visibility (for mobile accordion)
  isFormPanelOpen: true,
  isChatPanelOpen: true,

  // Snackbar notifications
  snackbar: {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'error' | 'warning' | 'info'
  },

  // Mobile accordion active panel
  activeAccordionPanel: 'form', // 'form' | 'chat'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /** Toggle between light and dark theme modes. */
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },

    /** Set a specific theme mode. */
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },

    /** Toggle form panel visibility. */
    toggleFormPanel: (state) => {
      state.isFormPanelOpen = !state.isFormPanelOpen;
    },

    /** Toggle chat panel visibility. */
    toggleChatPanel: (state) => {
      state.isChatPanelOpen = !state.isChatPanelOpen;
    },

    /** Set the active accordion panel (mobile layout). */
    setActiveAccordionPanel: (state, action) => {
      state.activeAccordionPanel = action.payload;
    },

    /**
     * Show a snackbar notification.
     * @param {Object} action.payload - { message, severity }
     */
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },

    /** Close the snackbar notification. */
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const {
  toggleTheme,
  setThemeMode,
  toggleFormPanel,
  toggleChatPanel,
  setActiveAccordionPanel,
  showSnackbar,
  closeSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer;
