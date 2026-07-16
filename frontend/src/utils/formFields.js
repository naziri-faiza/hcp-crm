/**
 * Form Field Constants
 * --------------------
 * Configuration for all interaction form fields.
 * Centralizes labels, icons, helper text, and validation rules.
 */

export const FORM_FIELDS = [
  {
    name: 'hcpName',
    label: 'HCP Name',
    icon: 'Person',
    helperText: 'Full name of the healthcare professional',
    required: true,
    type: 'text',
    section: 'hcp',
  },
  {
    name: 'hospitalClinicName',
    label: 'Hospital / Clinic Name',
    icon: 'LocalHospital',
    helperText: 'Name of the facility',
    required: false,
    type: 'text',
    section: 'hcp',
  },
  {
    name: 'hcpSpecialty',
    label: 'HCP Specialty',
    icon: 'MedicalServices',
    helperText: 'Medical specialty of the HCP',
    required: false,
    type: 'select',
    section: 'hcp',
    options: [
      'Cardiology', 'Oncology', 'Neurology', 'Orthopedics',
      'Dermatology', 'Pediatrics', 'Psychiatry', 'General Practice',
      'Internal Medicine', 'Surgery', 'Radiology', 'Endocrinology',
      'Gastroenterology', 'Pulmonology', 'Nephrology', 'Other',
    ],
  },
  {
    name: 'interactionType',
    label: 'Interaction Type',
    icon: 'Handshake',
    helperText: 'How the interaction was conducted',
    required: false,
    type: 'select',
    section: 'details',
    options: ['In-Person', 'Virtual', 'Phone', 'Email', 'Conference'],
  },
  {
    name: 'date',
    label: 'Date',
    icon: 'CalendarToday',
    helperText: 'Date of the interaction',
    required: false,
    type: 'date',
    section: 'details',
  },
  {
    name: 'time',
    label: 'Time',
    icon: 'Schedule',
    helperText: 'Time of the interaction',
    required: false,
    type: 'time',
    section: 'details',
  },
  {
    name: 'interactionDuration',
    label: 'Interaction Duration',
    icon: 'Timer',
    helperText: 'Duration in minutes',
    required: false,
    type: 'number',
    section: 'details',
  },
  {
    name: 'meetingMode',
    label: 'Meeting Mode',
    icon: 'MeetingRoom',
    helperText: 'Venue type for the meeting',
    required: false,
    type: 'select',
    section: 'details',
    options: ['Office', 'Hospital', 'Virtual', 'Conference', 'Dinner', 'Other'],
  },
  {
    name: 'location',
    label: 'Location',
    icon: 'LocationOn',
    helperText: 'Address or location description',
    required: false,
    type: 'text',
    section: 'details',
  },
  {
    name: 'attendees',
    label: 'Attendees',
    icon: 'Group',
    helperText: 'Names of other attendees',
    required: false,
    type: 'text',
    section: 'content',
  },
  {
    name: 'topicsDiscussed',
    label: 'Topics Discussed',
    icon: 'Topic',
    helperText: 'Key topics covered during the interaction',
    required: false,
    type: 'multiline',
    section: 'content',
  },
  {
    name: 'materialsShared',
    label: 'Materials Shared',
    icon: 'Description',
    helperText: 'Documents or materials provided to HCP',
    required: false,
    type: 'multiline',
    section: 'content',
  },
  {
    name: 'samplesDistributed',
    label: 'Samples Distributed',
    icon: 'Inventory2',
    helperText: 'Product samples given to HCP',
    required: false,
    type: 'text',
    section: 'content',
  },
  {
    name: 'productDiscussed',
    label: 'Product Discussed',
    icon: 'Medication',
    helperText: 'Product or therapy discussed',
    required: false,
    type: 'text',
    section: 'content',
  },
  {
    name: 'hcpSentiment',
    label: 'HCP Sentiment',
    icon: 'SentimentSatisfied',
    helperText: 'Overall sentiment of the HCP during the interaction',
    required: false,
    type: 'select',
    section: 'assessment',
    options: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
  },
  {
    name: 'priority',
    label: 'Priority',
    icon: 'Flag',
    helperText: 'Priority level of this interaction',
    required: false,
    type: 'select',
    section: 'assessment',
    options: ['Low', 'Medium', 'High', 'Urgent'],
  },
  {
    name: 'outcomes',
    label: 'Outcomes',
    icon: 'CheckCircle',
    helperText: 'Key outcomes or results from the interaction',
    required: false,
    type: 'multiline',
    section: 'assessment',
  },
  {
    name: 'followUpActions',
    label: 'Follow-up Actions',
    icon: 'PlaylistAddCheck',
    helperText: 'Action items requiring follow-up',
    required: false,
    type: 'multiline',
    section: 'followup',
  },
  {
    name: 'nextFollowUpDate',
    label: 'Next Follow-up Date',
    icon: 'EventRepeat',
    helperText: 'Scheduled date for the next follow-up',
    required: false,
    type: 'date',
    section: 'followup',
  },
];

/**
 * Group fields by their section.
 * @returns {Object} Grouped field configurations
 */
export const FORM_SECTIONS = {
  hcp: { title: 'HCP Information', subtitle: 'Healthcare professional details' },
  details: { title: 'Interaction Details', subtitle: 'When, where, and how' },
  content: { title: 'Interaction Content', subtitle: 'What was discussed and shared' },
  assessment: { title: 'Assessment', subtitle: 'Sentiment, priority, and outcomes' },
  followup: { title: 'Follow-up', subtitle: 'Next steps and actions' },
};

/**
 * Get fields for a given section.
 * @param {string} sectionKey
 * @returns {Array} Field configurations for the section
 */
export const getFieldsBySection = (sectionKey) =>
  FORM_FIELDS.filter((field) => field.section === sectionKey);
