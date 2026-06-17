import type { Dispatch } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { AppState } from '../../types';
import type { CanvasAction } from '../../store/canvasReducer';
import { EmailHeader } from './EmailHeader';
import { SortableBlock } from './SortableBlock';

interface Props {
  state: AppState;
  dispatch: Dispatch<CanvasAction>;
  insertIndex: number | null;
  isSidebarDrag: boolean;
}

function CanvasEndDropZone() {
  const { setNodeRef } = useDroppable({ id: 'canvas-end' });
  return <div ref={setNodeRef} className="h-8" />;
}

export function Canvas({ state, dispatch, insertIndex, isSidebarDrag }: Props) {
  const { setNodeRef: setEmptyRef } = useDroppable({ id: 'canvas-end' });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <EmailHeader header={state.header} dispatch={dispatch} />

        {state.blocks.length === 0 ? (
          <div ref={setEmptyRef} className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📧</div>
            <p className="font-medium">Your email is empty</p>
            <p className="text-sm mt-1">Click or drag items from the sidebar to add them here</p>
          </div>
        ) : (
          <SortableContext items={state.blocks.map(b => b.instanceId)} strategy={verticalListSortingStrategy}>
            {state.blocks.map((block, blockIndex) => (
              <SortableBlock
                key={block.instanceId}
                block={block}
                dispatch={dispatch}
                showInsertLine={isSidebarDrag && insertIndex === blockIndex}
              />
            ))}
            <CanvasEndDropZone />
          </SortableContext>
        )}
      </div>
    </div>
  );
}
