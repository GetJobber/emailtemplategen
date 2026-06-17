import type { Dispatch } from 'react';
import type { PlanBlock as PlanBlockType } from '../../types';
import { PLANS } from '../../data/plans';
import type { CanvasAction } from '../../store/canvasReducer';

interface Props {
  block: PlanBlockType;
  dispatch: Dispatch<CanvasAction>;
}

const BILLING_LABELS: { key: 'monthlyNoCommitment' | 'monthlyAnnual' | 'annualMonthly' | 'annualTotal'; label: string }[] = [
  { key: 'monthlyNoCommitment', label: 'Monthly, no commitment' },
  { key: 'monthlyAnnual', label: 'Monthly, 1-year commitment' },
  { key: 'annualMonthly', label: 'Annual, paid upfront (mo)' },
  { key: 'annualTotal', label: 'Annual, paid upfront (total)' },
];

export function PlanBlock({ block, dispatch }: Props) {
  const def = PLANS.find(p => p.id === block.definitionId);
  if (!def) return null;

  const selectedTier = def.tiers.find(t => t.seats === block.selectedSeats) ?? def.tiers[0];

  return (
    <div className="p-3">
      <div className="rounded-lg overflow-hidden border" style={{ borderColor: def.color }}>
        {/* Header */}
        <div className="px-4 py-3 text-white" style={{ backgroundColor: def.color }}>
          <div className="font-bold text-lg">{def.title}</div>
          <div className="text-sm opacity-80">{def.tagline}</div>
        </div>

        {/* Seat selector (only shown when plan has multiple tiers) */}
        {def.tiers.length > 1 && (
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">User seats</p>
            <div className="flex gap-1.5 flex-wrap">
              {def.tiers.map(tier => (
                <button
                  key={tier.seats}
                  onClick={() => dispatch({ type: 'SET_PLAN_SEATS', instanceId: block.instanceId, seats: tier.seats })}
                  className="px-3 py-1 rounded-full text-xs font-semibold border transition-colors"
                  style={
                    selectedTier.seats === tier.seats
                      ? { backgroundColor: def.color, borderColor: def.color, color: '#fff' }
                      : { backgroundColor: '#fff', borderColor: def.color + '66', color: def.color }
                  }
                >
                  {tier.seats} {tier.seats === 1 ? 'user' : 'users'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing table */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Pricing</p>
          <div className="space-y-1">
            {BILLING_LABELS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold" style={{ color: def.color }}>{selectedTier[key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature toggles */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Features to include</p>
          <div className="space-y-1">
            {def.features.map(f => (
              <label key={f.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-green-600"
                  checked={block.visibleFeatureIds.includes(f.id)}
                  onChange={() => dispatch({ type: 'TOGGLE_FEATURE', instanceId: block.instanceId, featureId: f.id })}
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{f.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
