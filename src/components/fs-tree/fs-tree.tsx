import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { FileType, StyleProps } from 'types';
import { consolidateTree, disableDrop, makeRootClassName, moveNode } from 'helpers';
import { FolderNode } from './subcomponents';
import './fs-tree.scss';

export type FSTreeProps = StyleProps & {
  content: FileType;
  size?: 'narrow' | 'normal' | 'wide';
}

const DEFAULT_PROPS = {
  size: 'normal'
}

const ROOT = makeRootClassName('fs-tree');

export const FSTree = forwardRef<HTMLDivElement, FSTreeProps>((props, ref) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { className, content, size } = realProps;

  const [data, setData] = useState(consolidateTree(content));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over?.id || disableDrop(active?.data?.current as FileType, over.id)) return;

    moveNode(data, active.data.current as FileType, `${over.id}`);
    setData({ ...data });
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 150, tolerance: 0 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 0 }
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div className={clsx(ROOT, `size-${size}`, className)} ref={ref}>
        <FolderNode {...{ content: data }} root />
      </div>
    </DndContext>
  );
});
