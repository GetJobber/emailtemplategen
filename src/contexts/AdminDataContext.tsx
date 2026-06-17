import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { PlanDefinition, AddonDefinition } from '../types';
import type { AdminAction } from '../store/adminStore';
import { PLANS } from '../data/plans';
import { ADDONS } from '../data/addons';

interface AdminDataContextValue {
  plans: PlanDefinition[];
  addons: AddonDefinition[];
  adminDispatch: Dispatch<AdminAction>;
  isDirty: boolean;
  save: () => void;
  cancel: () => void;
  resetToDefaults: () => void;
}

export const AdminDataContext = createContext<AdminDataContextValue>({
  plans: PLANS,
  addons: ADDONS,
  adminDispatch: () => {},
  isDirty: false,
  save: () => {},
  cancel: () => {},
  resetToDefaults: () => {},
});

export function useAdminData() {
  return useContext(AdminDataContext);
}
