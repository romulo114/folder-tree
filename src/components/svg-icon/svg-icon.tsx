import { forwardRef, cloneElement, ReactElement } from 'react';
import clsx from 'clsx';
import { makeRootClassName } from 'helpers';
import { StyleProps } from 'types';
import './svg-icon.scss';

export type SvgIconProps = StyleProps & {
  content: ReactElement;

  size?: 'small' | 'medium' | 'large';

  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

const ROOT = makeRootClassName('svgIcon');
const DEFAULT_PROPS = {
  size: 'medium',
  viewBoxWidth: 24,
  viewBoxHeight: 24
}

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  const realProps = { ...DEFAULT_PROPS, ...props };
  const { size, content, viewBoxWidth, viewBoxHeight, className } = realProps;

  return cloneElement(content, {
    ref,
    className: clsx(`${ROOT} size-${size}`, className),
    viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    fill: 'none'
  });
})