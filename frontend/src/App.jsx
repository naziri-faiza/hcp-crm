/**
 * App Component
 * -------------
 * Root application component.
 * Sets up MUI theme provider, Redux store, Router,
 * and global notification snackbar.
 */

import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import store from './app/store';
import { createAppTheme } from './app/theme';
import { closeSnackbar } from './features/uiSlice';
import AppRoutes from './routes/AppRoutes';

/**
 * Inner app wrapper that uses Redux state for theme/snackbar.
 * Separated from Provider to enable useSelector.
 */
const AppContent = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);
  const snackbar = useSelector((state) => state.ui.snackbar);

  // Memoize theme to prevent unnecessary recalculation
  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Application Routes */}
      <AppRoutes />

      {/* Global Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '10px', fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

/**
 * Root App component.
 * Wraps everything with Redux Provider and BrowserRouter.
 */
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
