import { useDraggable } from '@dnd-kit/core';
import type { CanvasBlock } from '../../types';
import { SidebarItem } from './SidebarItem';

interface Props {
  id: string;
  blockFactory: () => CanvasBlock;
  label: string;
  description?: string;
  price?: string;
  color?: string;
  onAdd: () => void;
}

export function DraggableSidebarItem({ id, blockFactory, label, description, price, color, onAdd }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar:${id}`,
    data: { type: 'sidebar', blockFactory, label },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <SidebarItem
        label={label}
        description={description}
        price={price}
        color={color}
        onAdd={onAdd}
      />
    </div>
  );
}
