/**
 * MainLayout Component
 * --------------------
 * Responsive split layout with Form (65%) and AI Chat (35%).
 * Supports desktop split, tablet stack, and mobile accordion.
 */

import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';

/**
 * Main application layout wrapper.
 * Renders header and content area with responsive behavior.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 */
const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Fixed Header */}
      <Header />

      {/* Spacer for fixed AppBar */}
      <Toolbar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 1.5, sm: 2, md: 2.5 },
          pb: isMobile ? '80px' : { xs: 2, sm: 2, md: 2.5 },
          maxWidth: '1600px',
          width: '100%',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
