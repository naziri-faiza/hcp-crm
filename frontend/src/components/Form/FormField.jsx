/**
 * FormField Component
 * -------------------
 * Renders a single form field with Material icon, label,
 * AI-filled badge, and appropriate input type.
 * Supports text, select, date, time, number, and multiline types.
 */

import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Typography,
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import AiFilledBadge from '../Common/AiFilledBadge';

/**
 * Dynamic form field that renders the correct input type.
 *
 * @param {Object} props
 * @param {Object} props.fieldConfig - Field configuration from formFields.js
 * @param {string} props.value - Current field value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.error] - Validation error message
 * @param {boolean} [props.isAiFilled] - Whether this field was AI-filled
 */
const FormField = ({ fieldConfig, value, onChange, error, isAiFilled = false }) => {
  const { name, label, icon, helperText, required, type, options } = fieldConfig;

  // Dynamically resolve the Material icon component
  const IconComponent = Icons[icon] || Icons.Edit;

  /** Render the label row with icon and AI badge. */
  const renderLabel = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 0.75,
      }}
    >
      <IconComponent
        sx={{
          fontSize: '1rem',
          color: error ? 'error.main' : 'text.secondary',
          mr: 0.75,
        }}
      />
      <Typography
        component="label"
        htmlFor={`field-${name}`}
        sx={{
          fontSize: '0.8rem',
          fontWeight: 500,
          color: error ? 'error.main' : 'text.primary',
        }}
      >
        {label}
        {required && (
          <Typography component="span" sx={{ color: 'error.main', ml: 0.25 }}>
            *
          </Typography>
        )}
      </Typography>
      <AiFilledBadge visible={isAiFilled} />
    </Box>
  );

  /** Common text field props. */
  const commonProps = {
    id: `field-${name}`,
    value: value || '',
    onChange,
    error: !!error,
    helperText: error || helperText,
    required,
    fullWidth: true,
    size: 'small',
    placeholder: `Enter ${label.toLowerCase()}`,
    sx: {
      '& .MuiOutlinedInput-root': {
        transition: 'all 0.2s ease',
        bgcolor: isAiFilled ? 'rgba(37, 99, 235, 0.03)' : 'transparent',
        '&.Mui-focused': {
          bgcolor: 'transparent',
        },
      },
    },
  };

  /** Render based on field type. */
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <TextField {...commonProps} select>
            <MenuItem value="">
              <em>Select {label.toLowerCase()}</em>
            </MenuItem>
            {(options || []).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        );

      case 'date':
        return (
          <TextField
            {...commonProps}
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            placeholder=""
          />
        );

      case 'time':
        return (
          <TextField
            {...commonProps}
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
            placeholder=""
          />
        );

      case 'number':
        return (
          <TextField
            {...commonProps}
            type="number"
            slotProps={{ htmlInput: { min: 0 } }}
          />
        );

      case 'multiline':
        return (
          <TextField
            {...commonProps}
            multiline
            minRows={2}
            maxRows={4}
          />
        );

      default:
        return <TextField {...commonProps} />;
    }
  };

  return (
    <FormControl fullWidth sx={{ mb: 0 }}>
      {renderLabel()}
      {renderInput()}
    </FormControl>
  );
};

export default FormField;
