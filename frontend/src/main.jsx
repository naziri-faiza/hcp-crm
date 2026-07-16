/**
 * Application Entry Point
 * -----------------------
 * Renders the React application to the DOM.
 * Imports global CSS and the root App component.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
