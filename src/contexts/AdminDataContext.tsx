import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { PlanDefinition, AddonDefinition, JobberPaymentsDefinition, OnboardingLinksDefinition } from '../types';
import type { AdminAction } from '../store/adminStore';
import { PLANS } from '../data/plans';
import { ADDONS } from '../data/addons';
import { JOBBER_PAYMENTS } from '../data/jobberPayments';
import { ONBOARDING_LINKS } from '../data/onboardingLinks';

interface AdminDataContextValue {
  plans: PlanDefinition[];
  addons: AddonDefinition[];
  jobberPayments: JobberPaymentsDefinition;
  onboardingLinks: OnboardingLinksDefinition;
  adminDispatch: Dispatch<AdminAction>;
  isDirty: boolean;
  save: () => void;
  cancel: () => void;
  resetToDefaults: () => void;
}

export const AdminDataContext = createContext<AdminDataContextValue>({
  plans: PLANS,
  addons: ADDONS,
  jobberPayments: JOBBER_PAYMENTS,
  onboardingLinks: ONBOARDING_LINKS,
  adminDispatch: () => {},
  isDirty: false,
  save: () => {},
  cancel: () => {},
  resetToDefaults: () => {},
});

export function useAdminData() {
  return useContext(AdminDataContext);
}
