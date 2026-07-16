/**
 * Redux Store Configuration
 * -------------------------
 * Central Redux Toolkit store combining all feature slices.
 */

import { configureStore } from '@reduxjs/toolkit';
import interactionReducer from '../features/interactionSlice';
import chatReducer from '../features/chatSlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    interaction: interactionReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
