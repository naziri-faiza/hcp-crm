/**
 * ChatPanel Component
 * -------------------
 * Complete AI assistant panel with chat history,
 * empty state, typing indicator, and input box.
 * Assembles all chat sub-components.
 */

import { useRef, useEffect } from 'react';
import { Box, Card, Typography, IconButton, Tooltip } from '@mui/material';
import {
  AutoAwesome as AiIcon,
  DeleteSweep as ClearIcon,
} from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatEmptyState from './ChatEmptyState';
import TypingIndicator from './TypingIndicator';
import useChat from '../../hooks/useChat';

/**
 * Enterprise AI assistant chat panel.
 * Displays in the right column of the split layout.
 */
const ChatPanel = () => {
  const messagesEndRef = useRef(null);
  const {
    messages,
    inputText,
    isTyping,
    isLoading,
    suggestions,
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick,
    handleClearChat,
  } = useChat();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const hasMessages = messages.length > 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Panel Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.12) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AiIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}
            >
              AI Assistant
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'success.main',
                fontSize: '0.65rem',
                fontWeight: 500,
              }}
            >
              ● Online
            </Typography>
          </Box>
        </Box>

        {/* Clear Chat */}
        {hasMessages && (
          <Tooltip title="Clear chat">
            <IconButton
              onClick={handleClearChat}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Chat Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            background: '#d1d5db',
            borderRadius: '2px',
          },
        }}
      >
        {hasMessages ? (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <ChatEmptyState
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </Box>

      {/* Chat Input */}
      <ChatInput
        value={inputText}
        onChange={handleInputChange}
        onSend={handleSendMessage}
        disabled={isLoading}
      />
    </Card>
  );
};

export default ChatPanel;
