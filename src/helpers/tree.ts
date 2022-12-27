import { FileType } from "types";

export const consolidateTree = (tree: FileType, parent: string | null = null): FileType => {
  tree.parent = parent;

  if (tree.type === 'folder' && tree.children) {
    for (const child of tree.children) {
      consolidateTree(child, tree.path);
    }
  }

  return tree;
}

export const findNode = (node: FileType, path: string): FileType | null => {
  if (node.path === path) return node;
  if (node.type === 'file') return null;

  for (const child of (node.children ?? [])) {
    const node = findNode(child, path);
    if (node) return node;
  }

  return null;
}

export const disableDrop = (active: FileType, overId: string | number): boolean => {
  const over = `${overId}`;
  if (active.path === over) return true;
  return active.parent === overId;
}

export const moveNode = (root: FileType, node: FileType, path: string): boolean => {
  const parentNode = findNode(root, node.parent ?? '');
  const targetNode = findNode(root, path);

  if (!targetNode || !parentNode || targetNode.type !== 'folder') {
    return false;
  }

  // add to target
  const children = targetNode.children ?? [];
  children.push(node);
  node.parent = targetNode.path;
  targetNode.children = children;

  // remove from parent
  parentNode.children = parentNode.children?.filter(child => child.path !== node.path);
  return true;
}
