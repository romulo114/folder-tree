import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Draggable, Droppable } from '../../dnd';
import { SvgIcon } from '../../svg-icon';
import { StyleProps, FileType } from 'types';
import { makeClassNameFactory, makeRootClassName, disableDrop } from 'helpers';
import { ChevronRight, ChevronDown, FolderOpen, Folder } from 'assets/icons';
import { FileNode } from './file-node';
import './folder-node.scss';

export type FolderNodeProps = StyleProps & {
  content: FileType;
  root?: boolean;

  folderOpenIcon?: ReactElement<FolderNodeProps['content']>;
  folderIcon?: ReactElement<FolderNodeProps['content']>;
};

const DEFAULT_PROPS = {
  root: false,
  folderOpenIcon: <SvgIcon content={<FolderOpen />} />,
  folderIcon: <SvgIcon content={<Folder />} />
};

const ROOT = makeRootClassName('folder');
const elem = makeClassNameFactory(ROOT);

export const FolderNode = (props: FolderNodeProps) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const {
    content,
    className,
    root,
    folderOpenIcon,
    folderIcon
  } = realProps;
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => setCollapsed(prev => !prev);

  const header = (
    <div className={elem`node`}>
      <div className={elem`icon`} onClick={handleToggle}>
        <SvgIcon content={collapsed ? <ChevronRight /> : <ChevronDown />} />
      </div>

      <div className={elem`content`}>
        {collapsed ? folderIcon : folderOpenIcon}
        <p className={elem`name`}>
          {content.name}
        </p>
      </div>
    </div>
  );

  return (
    <Droppable id={content.path} disableDrop={disableDrop}>
      <div className={clsx(ROOT, className)}>
        {root ? header : (
          <Draggable<FileType> id={content.path} data={content}>
            {header}
          </Draggable>
        )}

        <ul className={clsx(elem`children`, { collapsed })}>
          {content.children?.map(child => child.type === 'file' ? (
            <FileNode key={child.path} content={child} />
          ) : (
            <FolderNode key={child.path} content={child} />
          ))}
        </ul>
      </div>
    </Droppable>
  );
};
