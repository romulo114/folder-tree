import { forwardRef, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeClassNameFactory, makeRootClassName } from 'helpers';
import { StyleProps, FileType } from 'types';
import { SvgIcon } from 'components/svg-icon';
import { ChevronRight, ChevronDown, FolderOpen, Folder } from 'assets/icons';
import { FileNode } from './file-node';
import './folder-node.scss';

export type FolderNodeProps = StyleProps & {
  content: FileType;
  folderOpenIcon?: ReactElement<FolderNodeProps['content']>;
  folderIcon?: ReactElement<FolderNodeProps['content']>;
};

const DEFAULT_PROPS = {
  folderOpenIcon: <SvgIcon content={<FolderOpen />} />,
  folderIcon: <SvgIcon content={<Folder />} />
};

const ROOT = makeRootClassName('folder');
const elem = makeClassNameFactory(ROOT);

export const FolderNode = forwardRef<HTMLDivElement, FolderNodeProps>((props, ref) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { content, className, folderOpenIcon, folderIcon } = realProps;
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => setCollapsed(prev => !prev);

  return (
    <div className={clsx(ROOT, className)} ref={ref}>
      <div className={elem`node`}>
        <div className={elem`icon`} onClick={handleToggle}>
          <SvgIcon
            content={collapsed ? <ChevronRight /> : <ChevronDown />}
          />
        </div>

        <div className={elem`content`}>
          {collapsed ? folderIcon : folderOpenIcon}
          <p className={elem`text`}>
            {content.name}
          </p>
        </div>
      </div>

      <ul className={clsx(elem`children`, { 'collapsed': collapsed })}>
        {content.children?.map(child => child.type === 'file' ? (
          <FileNode key={child.path} content={child} />
        ) : (
          <FolderNode key={child.path} content={child} />
        ))}
      </ul>
    </div>
  )
});
