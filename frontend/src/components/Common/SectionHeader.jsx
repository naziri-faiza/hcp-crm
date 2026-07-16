/**
 * SectionHeader Component
 * -----------------------
 * Reusable section header for form field groupings.
 * Provides a title, subtitle, and optional icon.
 */

import { Box, Typography, Divider } from '@mui/material';

/**
 * Section header with title and subtitle for form groupings.
 *
 * @param {Object} props
 * @param {string} props.title - Section heading text
 * @param {string} props.subtitle - Section description text
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 */
const SectionHeader = ({ title, subtitle, icon }) => {
  return (
    <Box sx={{ mb: 2.5, mt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {icon && (
          <Box
            sx={{
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            ml: icon ? 4 : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Divider sx={{ mt: 1.5, opacity: 0.6 }} />
    </Box>
  );
};

export default SectionHeader;
