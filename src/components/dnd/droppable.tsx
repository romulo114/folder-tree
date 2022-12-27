import { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { FileType } from 'types';


export type DroppableProps = {
  id: string;
  disableDrop?: (active: FileType, id: string) => boolean;
}
export const Droppable = (props: PropsWithChildren<DroppableProps>) => {
  const { id, children, disableDrop } = props;
  const { active, isOver, setNodeRef } = useDroppable({ id });

  const isDroppable = (
    !!active?.data?.current &&
    (disableDrop ? !disableDrop(active?.data?.current as FileType, id) : true)
  );

  return (
    <div ref={setNodeRef} className={clsx({ over: isOver && isDroppable })}>
      {children}
    </div>
  );
}
