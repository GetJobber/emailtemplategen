import { useReducer, useEffect } from 'react';
import { PLANS as DEFAULT_PLANS } from '../data/plans';
import { ADDONS as DEFAULT_ADDONS } from '../data/addons';
import type { PlanDefinition, AddonDefinition, PriceTier } from '../types';

const STORAGE_KEY = 'jobber-email-builder-admin-v1';

export interface AdminState {
  plans: PlanDefinition[];
  addons: AddonDefinition[];
}

export type AdminAction =
  | { type: 'UPDATE_PLAN_META'; planId: string; field: 'title' | 'tagline' | 'color'; value: string }
  | { type: 'UPDATE_TIER_FIELD'; planId: string; tierIndex: number; field: keyof PriceTier; value: string | number }
  | { type: 'ADD_TIER'; planId: string }
  | { type: 'REMOVE_TIER'; planId: string; tierIndex: number }
  | { type: 'ADD_PLAN_FEATURE'; planId: string; label: string }
  | { type: 'UPDATE_PLAN_FEATURE'; planId: string; featureId: string; label: string }
  | { type: 'DELETE_PLAN_FEATURE'; planId: string; featureId: string }
  | { type: 'MOVE_PLAN_FEATURE'; fromPlanId: string; toPlanId: string; featureId: string }
  | { type: 'UPDATE_ADDON_META'; addonId: string; field: 'name' | 'description' | 'price'; value: string }
  | { type: 'ADD_ADDON_FEATURE'; addonId: string; label: string }
  | { type: 'UPDATE_ADDON_FEATURE'; addonId: string; featureId: string; label: string }
  | { type: 'DELETE_ADDON_FEATURE'; addonId: string; featureId: string }
  | { type: 'RESET_TO_DEFAULTS' };

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'UPDATE_PLAN_META':
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : { ...p, [action.field]: action.value }
        ),
      };

    case 'UPDATE_TIER_FIELD': {
      const coerced = action.field === 'seats' ? Number(action.value) : action.value;
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : {
            ...p,
            tiers: p.tiers.map((t, i) =>
              i !== action.tierIndex ? t : { ...t, [action.field]: coerced }
            ),
          }
        ),
      };
    }

    case 'ADD_TIER': {
      const plan = state.plans.find(p => p.id === action.planId);
      if (!plan) return state;
      const maxSeats = Math.max(...plan.tiers.map(t => t.seats));
      const newTier: PriceTier = {
        seats: maxSeats + 5,
        monthlyNoCommitment: '$0/mo',
        monthlyAnnual: '$0/mo',
        annualMonthly: '($0/mo)',
        annualTotal: '$0/yr',
      };
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : { ...p, tiers: [...p.tiers, newTier] }
        ),
      };
    }

    case 'REMOVE_TIER':
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : {
            ...p,
            tiers: p.tiers.filter((_, i) => i !== action.tierIndex),
          }
        ),
      };

    case 'ADD_PLAN_FEATURE': {
      const newId = `${action.planId}-f${Date.now()}`;
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : {
            ...p,
            features: [...p.features, { id: newId, label: action.label }],
          }
        ),
      };
    }

    case 'UPDATE_PLAN_FEATURE':
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : {
            ...p,
            features: p.features.map(f =>
              f.id !== action.featureId ? f : { ...f, label: action.label }
            ),
          }
        ),
      };

    case 'DELETE_PLAN_FEATURE':
      return {
        ...state,
        plans: state.plans.map(p =>
          p.id !== action.planId ? p : {
            ...p,
            features: p.features.filter(f => f.id !== action.featureId),
          }
        ),
      };

    case 'MOVE_PLAN_FEATURE': {
      if (action.fromPlanId === action.toPlanId) return state;
      const fromPlan = state.plans.find(p => p.id === action.fromPlanId);
      const feature = fromPlan?.features.find(f => f.id === action.featureId);
      if (!feature) return state;
      const newId = `${action.toPlanId}-f${Date.now()}`;
      return {
        ...state,
        plans: state.plans.map(p => {
          if (p.id === action.fromPlanId) {
            return { ...p, features: p.features.filter(f => f.id !== action.featureId) };
          }
          if (p.id === action.toPlanId) {
            return { ...p, features: [...p.features, { id: newId, label: feature.label }] };
          }
          return p;
        }),
      };
    }

    case 'UPDATE_ADDON_META':
      return {
        ...state,
        addons: state.addons.map(a =>
          a.id !== action.addonId ? a : { ...a, [action.field]: action.value }
        ),
      };

    case 'ADD_ADDON_FEATURE': {
      const newId = `${action.addonId}-f${Date.now()}`;
      return {
        ...state,
        addons: state.addons.map(a =>
          a.id !== action.addonId ? a : {
            ...a,
            features: [...a.features, { id: newId, label: action.label }],
          }
        ),
      };
    }

    case 'UPDATE_ADDON_FEATURE':
      return {
        ...state,
        addons: state.addons.map(a =>
          a.id !== action.addonId ? a : {
            ...a,
            features: a.features.map(f =>
              f.id !== action.featureId ? f : { ...f, label: action.label }
            ),
          }
        ),
      };

    case 'DELETE_ADDON_FEATURE':
      return {
        ...state,
        addons: state.addons.map(a =>
          a.id !== action.addonId ? a : {
            ...a,
            features: a.features.filter(f => f.id !== action.featureId),
          }
        ),
      };

    case 'RESET_TO_DEFAULTS':
      return { plans: DEFAULT_PLANS, addons: DEFAULT_ADDONS };

    default:
      return state;
  }
}

function loadState(): AdminState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminState;
  } catch {}
  return { plans: DEFAULT_PLANS, addons: DEFAULT_ADDONS };
}

export function useAdminStore() {
  const [adminState, adminDispatch] = useReducer(adminReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminState));
    } catch {}
  }, [adminState]);

  return { adminState, adminDispatch };
}
