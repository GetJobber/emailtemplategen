import type { OnboardingLinksDefinition } from '../types';

export const ONBOARDING_LINKS: OnboardingLinksDefinition = {
  header: 'Book training',
  pills: [
    { id: 'ol-1many-core', label: 'Core Workshop', insertText: '!gssnip' },
    { id: 'ol-1many-connect', label: 'Connect Workshop', insertText: '!consnip' },
    { id: 'ol-1many-grow', label: 'Grow Workshop', insertText: '!growsnip' },
    {
      id: 'ol-1on1-plus',
      label: 'Plus One on One Training',
      linkUrl: 'https://jobber.chilipiper.com/round-robin/jobber-training-call-45-mins',
    },
    { id: 'ol-1many-mobile', label: 'Mobile App Workshop', insertText: '!appsnip' },
    { id: 'ol-1many-receptionist', label: 'Receptionist Workshop', insertText: '!recsnip' },
    { id: 'ol-1many-marketing', label: 'Marketing Suite Workshop', insertText: '!marsnip' },
  ],
};
