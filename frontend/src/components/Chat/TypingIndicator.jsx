/**
 * TypingIndicator Component
 * -------------------------
 * Animated dots indicator showing the AI is processing/typing.
 */

import { Box } from '@mui/material';

/**
 * Three-dot typing animation for the AI assistant.
 * Shown when isTyping is true in chat state.
 */
const TypingIndicator = () => {
  const dotStyle = {
    width: 7,
    height: 7,
    borderRadius: '50%',
    bgcolor: 'text.secondary',
    opacity: 0.5,
    animation: 'bounce 1.4s infinite ease-in-out both',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 2,
        py: 1.5,
        bgcolor: (theme) =>
          theme.palette.mode === 'light'
            ? '#F1F5F9'
            : 'rgba(255,255,255,0.06)',
        borderRadius: '14px 14px 14px 4px',
        width: 'fit-content',
        ml: 5.5, // Align with message content (past avatar)
        '@keyframes bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.6)' },
          '40%': { transform: 'scale(1)' },
        },
      }}
    >
      <Box sx={{ ...dotStyle, animationDelay: '-0.32s' }} />
      <Box sx={{ ...dotStyle, animationDelay: '-0.16s' }} />
      <Box sx={{ ...dotStyle }} />
    </Box>
  );
};

export default TypingIndicator;
