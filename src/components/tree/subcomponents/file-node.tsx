import { ReactElement } from 'react';
import clsx from 'clsx';
import { SvgIcon } from 'components/svg-icon';
import { Draggable } from 'components/dnd';
import { FileType, StyleProps } from 'types';
import { makeClassNameFactory, makeRootClassName } from 'helpers';
import { Document } from 'assets/icons';
import './file-node.scss';

export type FileNodeProps = StyleProps & {
  content: FileType;
  icon?: ReactElement<FileNodeProps['content']>;
};

const DEFAULT_PROPS = {
  icon: <SvgIcon content={<Document />} />
}

const ROOT = makeRootClassName('file');
const elem = makeClassNameFactory(ROOT);

export const FileNode = (props: FileNodeProps) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { className, icon, content } = realProps;

  return (
    <Draggable<FileType> id={content.path} data={content}>
      <div className={clsx(ROOT, className)}>
        {icon}
        <p className={elem`name`}>
          {content.name}
        </p>
      </div>
    </Draggable>
  )
};
