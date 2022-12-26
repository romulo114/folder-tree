import { forwardRef } from 'react';
import clsx from 'clsx';
import { makeRootClassName } from 'helpers';
import { FileType, StyleProps } from 'types';
import { FolderNode } from './subcomponents';
import './tree.scss';

export type TreeProps = StyleProps & {
  content: FileType;
  size?: 'narrow' | 'normal' | 'wide';
  dnd? : boolean;
}

const DEFAULT_PROPS = {
  size: 'normal',
  dnd: false
}

const ROOT = makeRootClassName('tree');

export const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { className, content, size } = realProps;
  return (
    <div className={clsx(ROOT, `size-${size}`, className)} ref={ref}>
      <FolderNode content={content} />
    </div>
  )
});
