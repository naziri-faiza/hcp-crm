/**
 * ChatMessage Component
 * ---------------------
 * Individual chat message bubble for user or assistant.
 * Styled differently based on the message role.
 */

import { Box, Typography, Avatar } from '@mui/material';
import {
  SmartToy as AiIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import { formatChatTime } from '../../utils/helpers';

/**
 * Chat message bubble with avatar, content, and timestamp.
 *
 * @param {Object} props
 * @param {Object} props.message - { id, role, content, timestamp }
 */
const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 1.25,
        mb: 2,
        animation: 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: `translateY(8px) translateX(${isUser ? '8px' : '-8px'})`,
          },
          to: { opacity: 1, transform: 'translateY(0) translateX(0)' },
        },
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'rgba(124, 58, 237, 0.1)',
          color: isUser ? '#fff' : '#7C3AED',
          fontSize: '0.85rem',
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {isUser ? <UserIcon sx={{ fontSize: '1rem' }} /> : <AiIcon sx={{ fontSize: '1rem' }} />}
      </Avatar>

      {/* Message Bubble */}
      <Box
        sx={{
          maxWidth: '82%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.25,
            borderRadius: isUser
              ? '14px 14px 4px 14px'
              : '14px 14px 14px 4px',
            bgcolor: isUser
              ? 'primary.main'
              : (theme) =>
                  theme.palette.mode === 'light'
                    ? '#F1F5F9'
                    : 'rgba(255,255,255,0.06)',
            color: isUser ? '#fff' : 'text.primary',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.835rem',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </Typography>
        </Box>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            mx: 0.5,
            fontSize: '0.65rem',
            color: 'text.secondary',
            opacity: 0.7,
          }}
        >
          {formatChatTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
