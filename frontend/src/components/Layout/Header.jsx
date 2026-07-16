/**
 * Header Component
 * ----------------
 * Top AppBar with CRM branding, title, theme toggle, and user avatar.
 * Fixed position with enterprise styling.
 */

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  MedicalInformation as CrmIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/uiSlice';

/**
 * Enterprise header with CRM branding and controls.
 * Contains logo, title, theme toggle, and user avatar placeholders.
 */
const Header = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 1.5 }}>
        {/* CRM Logo & Branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
            }}
          >
            <CrmIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.05rem',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              AI-First CRM
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.68rem',
                lineHeight: 1,
              }}
            >
              Healthcare Interactions
            </Typography>
          </Box>
        </Box>

        {/* Center Title */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Chip
            label="Log HCP Interaction"
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.78rem',
              px: 1,
              height: 28,
              '& .MuiChip-label': { px: 1 },
              display: { xs: 'none', sm: 'flex' },
            }}
          />
        </Box>

        {/* Right Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Notifications placeholder */}
          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <NotificationsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              {themeMode === 'light' ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* User Avatar placeholder */}
          <Tooltip title="User profile">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: 'primary.main',
                fontSize: '0.8rem',
                fontWeight: 600,
                ml: 0.5,
                cursor: 'pointer',
              }}
            >
              JD
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
