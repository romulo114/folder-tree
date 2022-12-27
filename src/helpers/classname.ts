const PREFIX = 'my-';
const ELEMENT_SEPARATOR = '__';

export const makeRootClassName = (name: string): string => {
  return `${PREFIX}${name}-root`
}

export function makeClassNameFactory(root: string) {
  return (strings: TemplateStringsArray): string =>
    `${root}${ELEMENT_SEPARATOR}${strings[0]}`;
}
