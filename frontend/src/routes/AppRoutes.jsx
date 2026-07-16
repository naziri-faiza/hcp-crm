/**
 * Application Routes
 * ------------------
 * React Router configuration for the CRM application.
 * Wraps all routes with the MainLayout component.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import LogInteractionPage from '../pages/LogInteractionPage';

/**
 * App router with layout wrapper.
 * Default route redirects to /log-interaction.
 */
const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        {/* Main interaction logging page */}
        <Route path="/log-interaction" element={<LogInteractionPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/log-interaction" replace />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<Navigate to="/log-interaction" replace />}
        />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
