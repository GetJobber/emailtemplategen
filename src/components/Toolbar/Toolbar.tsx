import { useState } from 'react';
import type { AppState } from '../../types';
import { generateEmailHtml, generateEmailText } from '../../utils/generateEmailHtml';
import { copyToClipboard, copyRichTextToClipboard } from '../../utils/clipboard';
import { useAdminData } from '../../contexts/AdminDataContext';
import { PreviewModal } from './PreviewModal';

interface Props {
  state: AppState;
  onOpenAdmin: () => void;
}

export function Toolbar({ state, onOpenAdmin }: Props) {
  const { plans, addons } = useAdminData();
  const [copied, setCopied] = useState(false);
  const [copiedRich, setCopiedRich] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const hasBlocks = state.blocks.length > 0;

  async function handleCopy() {
    const html = generateEmailHtml(state, plans, addons);
    await copyToClipboard(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyRich() {
    const html = generateEmailHtml(state, plans, addons);
    const plain = generateEmailText(state, plans, addons);
    await copyRichTextToClipboard(html, plain);
    setCopiedRich(true);
    setTimeout(() => setCopiedRich(false), 2000);
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Email Template Builder</h1>
            <p className="text-xs text-gray-400">Build and copy email templates for Salesforce</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {state.blocks.length} block{state.blocks.length !== 1 ? 's' : ''}
          </span>

          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition-all"
          >
            Admin
          </button>

          <button
            onClick={() => setPreviewing(true)}
            disabled={!hasBlocks}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              hasBlocks
                ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:scale-95'
                : 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
            }`}
          >
            Preview Email
          </button>

          <button
            onClick={handleCopyRich}
            disabled={!hasBlocks}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              copiedRich
                ? 'bg-green-500 border-green-500 text-white'
                : !hasBlocks
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                : 'border-green-600 text-green-700 bg-white hover:bg-green-50 active:scale-95'
            }`}
          >
            {copiedRich ? '✓ Copied!' : 'Copy Rich Text'}
          </button>

          <button
            onClick={handleCopy}
            disabled={!hasBlocks}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              copied
                ? 'bg-green-500 text-white'
                : !hasBlocks
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy HTML'}
          </button>
        </div>
      </header>

      {previewing && (
        <PreviewModal
          html={generateEmailHtml(state, plans, addons)}
          onClose={() => setPreviewing(false)}
        />
      )}
    </>
  );
}
