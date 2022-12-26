import { forwardRef, ReactElement } from 'react';
import clsx from 'clsx';
import { makeClassNameFactory, makeRootClassName } from 'helpers';
import { FileType, StyleProps } from 'types';
import { SvgIcon } from 'components/svg-icon';
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

export const FileNode = forwardRef<HTMLDivElement, FileNodeProps>((props, ref) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { className, icon, content } = realProps;
  return (
    <div className={clsx(ROOT, className)}>
      {icon}
      <p className={elem`name`}>
        {content.name}
      </p>
    </div>
  )
});
