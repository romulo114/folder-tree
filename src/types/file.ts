export type FileBaseType = {
  name: string;
  path: string;
}

export type FileType = FileBaseType & {
  type: 'file' | 'folder';

  // For file nodes
  size?: number;

  // For folder nodes
  children?: FileType[];
}
