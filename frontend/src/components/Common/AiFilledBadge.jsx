/**
 * AiFilledBadge Component
 * -----------------------
 * Small visual indicator showing that a form field was auto-filled by AI.
 * Renders as a subtle chip/badge next to field labels.
 */

import { Chip } from '@mui/material';
import { AutoAwesome as AiIcon } from '@mui/icons-material';

/**
 * Badge indicating AI-filled status for a form field.
 * Renders only when `visible` is true.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Whether to show the badge
 */
const AiFilledBadge = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <Chip
      icon={<AiIcon sx={{ fontSize: '0.75rem !important' }} />}
      label="AI Filled"
      size="small"
      sx={{
        ml: 1,
        height: 20,
        fontSize: '0.625rem',
        fontWeight: 600,
        bgcolor: 'rgba(37, 99, 235, 0.08)',
        color: 'primary.main',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        '& .MuiChip-icon': { ml: 0.5 },
        '& .MuiChip-label': { px: 0.75 },
        animation: visible ? 'fadeIn 0.3s ease-in' : 'none',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'scale(0.9)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      }}
    />
  );
};

export default AiFilledBadge;
