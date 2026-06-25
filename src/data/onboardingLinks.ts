import type { OnboardingLinksDefinition } from '../types';

export const ONBOARDING_LINKS: OnboardingLinksDefinition = {
  header: 'Book training',
  pills: [
    { id: 'ol-1many-core', label: 'Core Workshop', content: '!gssnip' },
    { id: 'ol-1many-connect', label: 'Connect Workshop', content: '!consnip' },
    { id: 'ol-1many-grow', label: 'Grow Workshop', content: '!growsnip' },
    {
      id: 'ol-1on1-plus',
      label: 'Plus One on One Training',
      content: '<a href="https://jobber.chilipiper.com/round-robin/jobber-training-call-45-mins" target="_blank" style="color:#1F9839;text-decoration:underline;">Plus One on One Training</a>',
    },
    { id: 'ol-1many-mobile', label: 'Mobile App Workshop', content: '!appsnip' },
    { id: 'ol-1many-receptionist', label: 'Receptionist Workshop', content: '!recsnip' },
    { id: 'ol-1many-marketing', label: 'Marketing Suite Workshop', content: '!marsnip' },
  ],
};
