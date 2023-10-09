import { ComponentProps, FC } from 'react';

export const SortingIcon: FC<ComponentProps<'svg'>> = (props) => (
  <svg
    fill='currentColor'
    height='15px'
    width='15px'
    version='1.1'
    id='capa-1'
    viewBox='0 0 490 490'
    {...props}
  >
    <g>
      <polygon points='85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 0,194.27 37.087,221.213' />
      <polygon points='404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 490,295.715 452.913,268.802' />
    </g>
  </svg>
);

export default SortingIcon;
