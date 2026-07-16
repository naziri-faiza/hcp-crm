/**
 * LogInteractionPage Component
 * ----------------------------
 * Main page for logging HCP interactions.
 * Responsive split layout: Form (65%) | Chat (35%).
 * Includes sticky save button wired to the API.
 */

import {
  Box,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Save as SaveIcon,
  ExpandMore as ExpandIcon,
  Description as FormIcon,
  SmartToy as ChatIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveAccordionPanel } from '../features/uiSlice';
import InteractionForm from '../components/Form/InteractionForm';
import ChatPanel from '../components/Chat/ChatPanel';
import useInteractionForm from '../hooks/useInteractionForm';

/**
 * Log HCP Interaction page.
 * Desktop: 65/35 split. Tablet: stacked. Mobile: accordion.
 */
const LogInteractionPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const activePanel = useSelector((state) => state.ui.activeAccordionPanel);

  const { formData, isSubmitting, handleSubmit, handleReset } = useInteractionForm();

  // Enable save button when HCP name is filled
  const canSave = formData.hcpName?.trim()?.length > 0 && !isSubmitting;

  /** Handle accordion panel change (mobile layout). */
  const handleAccordionChange = (panel) => (_, isExpanded) => {
    dispatch(setActiveAccordionPanel(isExpanded ? panel : false));
  };

  /** Shared save button component to avoid duplication. */
  const SaveButton = ({ fullWidth = false }) => (
    <Button
      id="save-interaction-btn"
      variant="contained"
      fullWidth={fullWidth}
      disabled={!canSave}
      onClick={handleSubmit}
      startIcon={
        isSubmitting ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <SaveIcon />
        )
      }
      size="large"
      sx={{
        px: fullWidth ? 2 : 5,
        py: 1.25,
        fontWeight: 600,
        fontSize: '0.9rem',
        borderRadius: '12px',
        minWidth: fullWidth ? 'auto' : 220,
      }}
    >
      {isSubmitting ? 'Saving...' : 'Save Interaction'}
    </Button>
  );

  /** Shared reset button. */
  const ResetButton = () => (
    <Button
      id="reset-form-btn"
      variant="outlined"
      onClick={handleReset}
      startIcon={<ResetIcon />}
      size="large"
      sx={{
        px: 3,
        py: 1.25,
        fontWeight: 600,
        fontSize: '0.9rem',
        borderRadius: '12px',
        color: 'text.secondary',
        borderColor: 'divider',
        '&:hover': { borderColor: 'text.secondary' },
      }}
    >
      Reset
    </Button>
  );

  /** Mobile accordion layout. */
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 2 }}>
        {/* Form Accordion */}
        <Accordion
          expanded={activePanel === 'form'}
          onChange={handleAccordionChange('form')}
          sx={{
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <AccordionSummary expandIcon={<ExpandIcon />} sx={{ px: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormIcon sx={{ color: 'primary.main', fontSize: '1.15rem' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Interaction Form
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <InteractionForm />
          </AccordionDetails>
        </Accordion>

        {/* Chat Accordion */}
        <Accordion
          expanded={activePanel === 'chat'}
          onChange={handleAccordionChange('chat')}
          sx={{
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <AccordionSummary expandIcon={<ExpandIcon />} sx={{ px: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChatIcon sx={{ color: 'primary.main', fontSize: '1.15rem' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                AI Assistant
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, height: 450 }}>
            <ChatPanel />
          </AccordionDetails>
        </Accordion>

        {/* Sticky Save Button (mobile) */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            zIndex: 10,
          }}
        >
          <SaveButton fullWidth />
        </Box>
      </Box>
    );
  }

  /** Desktop / Tablet layout. */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Split Panels */}
      <Grid container spacing={2.5} sx={{ flex: 1, minHeight: 0 }}>
        {/* Left Panel - Form (65% desktop, 100% tablet stacked) */}
        <Grid
          size={{ xs: 12, md: isTablet ? 12 : 7.8 }}
          sx={{
            height: isTablet ? 'auto' : '100%',
            minHeight: isTablet ? 400 : 'auto',
          }}
        >
          <InteractionForm />
        </Grid>

        {/* Right Panel - AI Chat (35% desktop, 100% tablet stacked) */}
        <Grid
          size={{ xs: 12, md: isTablet ? 12 : 4.2 }}
          sx={{ height: isTablet ? 500 : '100%' }}
        >
          <ChatPanel />
        </Grid>
      </Grid>

      {/* Bottom Action Bar */}
      <Box
        sx={{
          mt: 2,
          py: 1.5,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <ResetButton />
        <SaveButton />
      </Box>
    </Box>
  );
};

export default LogInteractionPage;
