import { type Dispatch } from 'react';
import type { OnboardingLinksBlock as OnboardingLinksBlockType } from '../../types';
import { useAdminData } from '../../contexts/AdminDataContext';
import type { CanvasAction } from '../../store/canvasReducer';

const ONBOARDING_COLOR = '#1D2D44';

interface Props {
  block: OnboardingLinksBlockType;
  dispatch: Dispatch<CanvasAction>;
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" />
      <line x1="5" y1="1" x2="5" y2="4" />
      <line x1="11" y1="1" x2="11" y2="4" />
      <circle cx="5.5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OnboardingLinksBlock({ block, dispatch }: Props) {
  const { onboardingLinks: def } = useAdminData();

  const selectedPills = def.pills.filter(p => block.selectedPillIds.includes(p.id));

  // Build the preview content shown in the text area
  const previewLines = selectedPills.map(p => {
    if (p.linkUrl) {
      return `• ${p.label} — ${p.linkUrl}`;
    }
    return `• ${p.label} — ${p.insertText ?? ''}`;
  });

  return (
    <div className="p-3">
      <div className="rounded-lg overflow-hidden border border-gray-200 border-l-4" style={{ borderLeftColor: ONBOARDING_COLOR }}>
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 flex items-center gap-2 border-b border-gray-100">
          <span style={{ color: ONBOARDING_COLOR }}>
            <CalendarIcon />
          </span>
          <span className="font-semibold text-gray-800 leading-snug">Onboarding Links</span>
        </div>

        {/* Editable header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Section Header</p>
          <input
            type="text"
            value={block.header}
            onChange={e => dispatch({ type: 'SET_ONBOARDING_HEADER', instanceId: block.instanceId, header: e.target.value })}
            placeholder="e.g. Book training"
            className="w-full text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-jobber focus:border-transparent"
          />
        </div>

        {/* Pill toggles */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Training Sessions</p>
          <div className="flex flex-wrap gap-1.5">
            {def.pills.map(pill => {
              const isSelected = block.selectedPillIds.includes(pill.id);
              return (
                <button
                  key={pill.id}
                  onClick={() => dispatch({ type: 'TOGGLE_ONBOARDING_PILL', instanceId: block.instanceId, pillId: pill.id })}
                  className="px-3 py-1 rounded-full text-xs font-semibold border transition-colors"
                  style={
                    isSelected
                      ? { backgroundColor: ONBOARDING_COLOR, borderColor: ONBOARDING_COLOR, color: '#fff' }
                      : { backgroundColor: '#fff', borderColor: ONBOARDING_COLOR + '66', color: ONBOARDING_COLOR }
                  }
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview of email content */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Email Preview</p>
          {selectedPills.length === 0 ? (
            <p className="text-xs text-gray-300 italic">No sessions selected — toggle pills above to include them</p>
          ) : (
            <div className="bg-gray-50 rounded-md px-3 py-2 space-y-1">
              <p className="text-xs font-bold text-gray-700">{block.header || def.header}</p>
              {previewLines.map((line, i) => (
                <p key={i} className="text-xs text-gray-600 font-mono">{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
