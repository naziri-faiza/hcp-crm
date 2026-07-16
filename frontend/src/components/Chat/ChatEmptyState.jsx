/**
 * ChatEmptyState Component
 * ------------------------
 * Displayed when the chat has no messages.
 * Shows welcome text and suggestion chips.
 */

import { Box, Typography, Chip, Stack } from '@mui/material';
import {
  AutoAwesome as AiIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';

/**
 * Empty state UI with welcome message and clickable suggestion chips.
 *
 * @param {Object} props
 * @param {string[]} props.suggestions - Suggestion text array
 * @param {Function} props.onSuggestionClick - Handler for chip clicks
 */
const ChatEmptyState = ({ suggestions, onSuggestionClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        px: 3,
        py: 4,
      }}
    >
      {/* AI Icon */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
        }}
      >
        <AiIcon sx={{ fontSize: 28, color: 'primary.main' }} />
      </Box>

      {/* Welcome Text */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '1rem',
          mb: 0.75,
          color: 'text.primary',
        }}
      >
        AI Assistant
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.8rem',
          maxWidth: 260,
          lineHeight: 1.6,
          mb: 3,
        }}
      >
        Describe your HCP interaction in natural language and I&apos;ll help you fill in the form
        automatically.
      </Typography>

      {/* Suggestion Chips */}
      <Stack spacing={1} sx={{ width: '100%', maxWidth: 280 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'text.secondary',
            fontSize: '0.65rem',
            textAlign: 'left',
          }}
        >
          Try saying
        </Typography>
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={suggestion}
            variant="outlined"
            size="small"
            onClick={() => onSuggestionClick(suggestion)}
            deleteIcon={<ArrowIcon sx={{ fontSize: '0.85rem !important' }} />}
            onDelete={() => onSuggestionClick(suggestion)}
            sx={{
              justifyContent: 'space-between',
              height: 36,
              fontSize: '0.76rem',
              fontWeight: 400,
              color: 'text.secondary',
              borderColor: 'divider',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '& .MuiChip-label': {
                textAlign: 'left',
                flex: 1,
              },
              '& .MuiChip-deleteIcon': {
                color: 'text.tertiary',
              },
              '&:hover': {
                bgcolor: 'primary.main',
                color: '#fff',
                borderColor: 'primary.main',
                '& .MuiChip-deleteIcon': {
                  color: '#fff',
                },
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ChatEmptyState;
