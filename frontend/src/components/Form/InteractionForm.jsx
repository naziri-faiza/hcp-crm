/**
 * InteractionForm Component
 * -------------------------
 * Complete HCP interaction form with all fields organized
 * into logical sections. Uses FormField components for each input.
 */

import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import {
  Person as HcpIcon,
  EventNote as DetailsIcon,
  Chat as ContentIcon,
  Assessment as AssessmentIcon,
  EventRepeat as FollowupIcon,
} from '@mui/icons-material';
import FormField from './FormField';
import SectionHeader from '../Common/SectionHeader';
import useInteractionForm from '../../hooks/useInteractionForm';
import { FORM_SECTIONS, getFieldsBySection } from '../../utils/formFields';

/** Map section keys to their icons. */
const sectionIcons = {
  hcp: <HcpIcon fontSize="small" />,
  details: <DetailsIcon fontSize="small" />,
  content: <ContentIcon fontSize="small" />,
  assessment: <AssessmentIcon fontSize="small" />,
  followup: <FollowupIcon fontSize="small" />,
};

/**
 * Main interaction form with all HCP fields organized by section.
 * Connects to Redux via useInteractionForm hook.
 */
const InteractionForm = () => {
  const { formData, validationErrors, handleFieldChange, isAiFilled } =
    useInteractionForm();

  /**
   * Render all fields within a given section.
   * @param {string} sectionKey - Section identifier
   */
  const renderSection = (sectionKey) => {
    const section = FORM_SECTIONS[sectionKey];
    const fields = getFieldsBySection(sectionKey);

    return (
      <Box key={sectionKey}>
        <SectionHeader
          title={section.title}
          subtitle={section.subtitle}
          icon={sectionIcons[sectionKey]}
        />
        <Grid container spacing={2}>
          {fields.map((fieldConfig) => (
            <Grid
              size={{
                xs: 12,
                sm: fieldConfig.type === 'multiline' ? 12 : 6,
              }}
              key={fieldConfig.name}
            >
              <FormField
                fieldConfig={fieldConfig}
                value={formData[fieldConfig.name]}
                onChange={handleFieldChange(fieldConfig.name)}
                error={validationErrors[fieldConfig.name]}
                isAiFilled={isAiFilled(fieldConfig.name)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Form Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
          Interaction Details
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Fill in the details of your HCP interaction
        </Typography>
      </Box>

      {/* Scrollable Form Content */}
      <CardContent
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-thumb': {
            background: '#d1d5db',
            borderRadius: '3px',
          },
        }}
      >
        {Object.keys(FORM_SECTIONS).map(renderSection)}
      </CardContent>
    </Card>
  );
};

export default InteractionForm;
