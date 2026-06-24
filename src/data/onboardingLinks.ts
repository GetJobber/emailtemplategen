import type { OnboardingLinksDefinition } from '../types';

export const ONBOARDING_LINKS: OnboardingLinksDefinition = {
  header: 'Book training',
  pills: [
    { id: 'ol-1many-core', label: '1:Many Core', insertText: '!gssnip' },
    { id: 'ol-1many-connect', label: '1:Many Connect', insertText: '!consnip' },
    { id: 'ol-1many-grow', label: '1:Many Grow', insertText: '!growsnip' },
    {
      id: 'ol-1on1-plus',
      label: '1:1 Plus',
      linkUrl: 'https://jobber.chilipiper.com/round-robin/jobber-training-call-45-mins',
    },
    { id: 'ol-1many-mobile', label: '1:Many Mobile App Workshop', insertText: '!appsnip' },
    { id: 'ol-1many-receptionist', label: '1:Many Receptionist', insertText: '!recsnip' },
    { id: 'ol-1many-marketing', label: '1:Many Marketing Suite', insertText: '!marsnip' },
  ],
};
