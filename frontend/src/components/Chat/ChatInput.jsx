/**
 * ChatInput Component
 * -------------------
 * Input box with send button for the AI assistant chat.
 * Supports Enter key submission and disabled state.
 */

import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

/**
 * Chat input with send button.
 *
 * @param {Object} props
 * @param {string} props.value - Current input text
 * @param {Function} props.onChange - Input change handler
 * @param {Function} props.onSend - Send message handler
 * @param {boolean} [props.disabled] - Disable input and send button
 */
const ChatInput = ({ value, onChange, onSend, disabled = false }) => {
  /** Handle Enter key press to send message. */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        id="chat-input"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Describe your HCP interaction..."
        disabled={disabled}
        fullWidth
        size="small"
        multiline
        maxRows={3}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onSend}
                  disabled={disabled || !value?.trim()}
                  size="small"
                  sx={{
                    bgcolor: value?.trim() ? 'primary.main' : 'transparent',
                    color: value?.trim() ? '#fff' : 'text.secondary',
                    width: 32,
                    height: 32,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: value?.trim() ? 'primary.dark' : 'action.hover',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'transparent',
                      color: 'text.disabled',
                    },
                  }}
                >
                  <SendIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '12px',
              fontSize: '0.85rem',
              pr: 0.5,
            },
          },
        }}
      />
    </Box>
  );
};

export default ChatInput;
