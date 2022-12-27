import { PropsWithChildren } from 'react';
import { Data, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export type DraggableProps<T> = PropsWithChildren<{ id: string, data?: T }>;

export const Draggable = <T = {}>(props: DraggableProps<T>) => {
  const { id, children, data } = props;
  const { attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({ id, data: data ? data as Data : undefined });

  const style = {
    transform: CSS.Transform.toString(
      transform ? { ...transform, scaleX: 1, scaleY: 1 } : null
    ),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'pointer'
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={() => {}}>
      {children}
    </div>
  );
}
